import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";

import {db} from "./config/database";
import products from "./routes/products";

dotenv.config();
const port = process.env.DEV_SERVER_PORT || 5001;
const app = express();

// Тест подключения к БД
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(error => console.log(`Error connections database ${error}`))


// Запуск сервера
app.listen(port, () => {
    console.log(`Server has been started port=${port}...`)
})

// (async function start() {
//     try {
//         db.authenticate()
//             .then(() => console.log('Database connected...'))
//             .catch(error => console.log(`Error connections database ${error}`))
//
//         app.listen(port, () => {
//             console.log(`Server has been started port=${port}...`)
//         })
//     } catch (e) {
//         console.log(e)
//     }
// })()


app.use(bodyParser.json())

// routes products
app.use(products)