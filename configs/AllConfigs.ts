export const isWin = process.platform === "win32";
var fs = require('fs');
try {
    var dataConfig = JSON.parse(fs.readFileSync('./fb.config.json'));
    fs.watchFile('./fb.config.json', function () {
        try {
            var dataConfig = JSON.parse(fs.readFileSync('./fb.config.json'));
            config = dataConfig || defaultConfig;
        } catch (e) {

        }
    });
} catch (e) {

}
var defaultConfig = {
    NUMBER_OF_FILES_ON_FACEBOOK: 2,
    NUMBER_OF_FILES_ON_TOKEN: 200,
    TOKEN_FILE_PATH: (isWin) ? 'D:\\Freelancer\\FB.Upload-Getlink\\configs\\tokens' : '/root/tokens.txt',
    ROOT_FOLDER_PATH: (isWin) ? 'C://videos//' : '/root/videos/',
    DBINFO: {
        dbname: 'fb',
        user: 'root',
        pass: null,
        host: '127.0.0.1'
    }
};
export var config = dataConfig || defaultConfig;