import {sequelize} from "./_Base";
import {DataTypes} from 'sequelize';

export const CounterFields = {
    file: 'file',
    numberOfOnFacebook: 'numberOfOnFacebook'
};
export const Counter = sequelize.define('counter',
    {
        [CounterFields.file]: {
            type: DataTypes.CHAR(225)
        },
        [CounterFields.numberOfOnFacebook]: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }
);
