import {FileVideo, FileVideoFields} from "../databases/models/FileVideo";
import {RedisCache, RKEYS} from "../cache/RedisCache";

var request = require('request');
var express = require('express');
var router = express.Router();

async function getLink(videoId, token) {
    return new Promise((rs, rj) => {
        var url = 'https://graph.facebook.com/v2.12/' + videoId + '?access_token=' + token + '&debug=all&fields=source&format=json&method=get&pretty=0&suppress_http_code=1';
        request(url, function (err, res, body) {
            if (body) {
                var json = JSON.parse(body);
                rs([{
                    "type": "mp4",
                    "file": json['source']
                }]);
            } else {
                rj(err);
            }
        });
    })
}

/* GET home page. */
router.get('/list', async function (req, res, next) {
    var allFiles = await FileVideo.findAll({
        attributes: [FileVideoFields.file, 'createdAt'],
        order: [['createdAt', 'DESC']]
    });
    var counter = {};
    allFiles.map(file => {
        if (!counter[file.file]) {
            counter[file.file] = 1;
        } else {
            counter[file.file] += 1;
        }
    });
    var exists = {};
    var tmp = [];
    for (var file of allFiles) {
        if (!exists[file.file]) {
            file['numOfFiles'] = counter[file.file];
            exists[file.file] = true;
            tmp.push(file);
        }
    }
    res.render('index', {allFiles: tmp});
});
router.get('/getLinkSimple', async function (req, res, next) {
    var file = req.query.file;
    var data = await RedisCache.getAsync(RKEYS.linkstream + '.' + file);
    if (data) {
        return res.redirect(JSON.parse(data)[0].file);
    }
    var r = await FileVideo.findAll({
        where: {
            [FileVideoFields.file]: file
        }
    });
    console.log('KKKKKKKKKKKKKKK ', r, r.length);
    if (r.length == 0) {
        return res.json([]);
    }
    for (var item of r) {
        var result = await getLink(item[FileVideoFields.videoId], item[FileVideoFields.token]);
        if (result[0].file) {
            await RedisCache.setAsync(RKEYS.linkstream + '.' + file, JSON.stringify(result), 'EX', 3600 * 1);
            return res.redirect(result[0].file);
        } else {
            console.log('AAAAAAAAAAAAAAAAAAAAA BBBBBBBBBBBBBBBBBB');
            await RedisCache.rpushAsync(RKEYS.dieTokens, item[FileVideoFields.token]);
        }
    }
    res.json([]);
});
module.exports = router;
