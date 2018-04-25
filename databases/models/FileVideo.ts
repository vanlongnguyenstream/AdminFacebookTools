import {sequelize} from "./_Base";
import {DataTypes} from 'sequelize';

export const FileVideoFields = {
    file: 'file',
    videoId: 'videoId',
    storeId: 'storeId',
    token: 'token'
};
export const FileVideo = sequelize.define('fileVideo',
    {
        [FileVideoFields.videoId]: {
            type: DataTypes.CHAR(50),
            primaryKey: true
        },
        [FileVideoFields.storeId]: {
            type: DataTypes.CHAR(50)
        },
        [FileVideoFields.file]: {
            type: DataTypes.CHAR(225)
        },
        [FileVideoFields.token]: {
            type: DataTypes.TEXT
        }
    },
    {
        indexes: [
            {
                unique: true,
                fields: [
                    FileVideoFields.videoId
                ]
            },
            {
                unique: false,
                fields: [
                    FileVideoFields.file
                ]
            },
        ]
    }
);
