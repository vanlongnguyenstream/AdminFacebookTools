import {sequelize} from "./_Base";
import {DataTypes} from 'sequelize';

export const TokenFields = {
    storeId: 'storeId',
    token: 'token',
    appId: 'appId',
    id: 'id',
    numberOfFiles: 'numberOfFiles'
};
export const Token = sequelize.define('token',
    {
        [TokenFields.id]: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        [TokenFields.storeId]: {
            type: DataTypes.CHAR(50)
        },
        [TokenFields.token]: {
            type: DataTypes.TEXT
        },
        [TokenFields.appId]: {
            type: DataTypes.CHAR(50)
        },
        [TokenFields.numberOfFiles]: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }
);
