import Sequelize from "sequelize";

import {db} from "../config/database";

export const Product = db.define('product', {
    name: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING,
    },
    price: {
        type: Sequelize.INTEGER,
    }
})

Product.sync().then(() => {
    console.log('table created');
});