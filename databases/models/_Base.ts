import {config} from "../../configs/AllConfigs";

export const Sequelize = require('sequelize');
export const Op = Sequelize.Op;
export const sequelize = new Sequelize({
    database: config.DBINFO.dbname,
    username: config.DBINFO.user,
    password: config.DBINFO.pass,
    dialect: 'mysql',
    host: config.DBINFO.host
});
