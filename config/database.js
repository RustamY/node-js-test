import {Sequelize} from "sequelize";

export const db = new Sequelize('nodejs', 'postgres', '123456', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: 0,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
})