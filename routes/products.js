import {Router} from "express";
import {Product} from "../models/Product";

const router = Router();

// GET: Получение всех продуктов
router.get('/products', (req, res) => {
    Product.findAll()
        .then(products => {
            res.send({data: products})
        })
        .catch(error => {
            console.log('error', error);
        })
})

// GET: Получение продукта по ID
router.get('/product', (req, res) => {
    const {id} = req.query;
    Product.findOne({where: {id}})
        .then(product => {
            res.send({data: product})
        })
        .catch(error => {
            console.log('error', error);
        })
})

// POST: Создание продукта
router.post('/product', (req, res) => {
    let {name, description, price} = req.body;
    let errors = [];

    if (!name) {
        errors.push({text: 'Please add a name'});
    }
    if (!description) {
        errors.push({text: 'Please add a description'});
    }
    if (!price || price === 0) {
        errors.push({text: 'Please add a price'});
    }

    if (errors.length === 0) {
        Product.create({
            name,
            description,
            price,
        })
            .then(product => {
                res.sendStatus(200);
                res.send(product)
            })
            .catch(err => res.send({error: err.message}))
    } else {
        res.send(errors)
    }
});

// PUT: Изменение продукта
router.put('/product/:id', (req, res) => {
    let {name, description, price} = req.body;
    const {id} = req.params;
    let errors = [];

    if (!name) {
        errors.push({text: 'Please add a name'});
    }
    if (!description) {
        errors.push({text: 'Please add a description'});
    }
    if (!price || price === 0) {
        errors.push({text: 'Please add a price'});
    }

    if (errors.length === 0) {
        Product.update({
            name,
            description,
            price
        }, {where: {id}})
            .then(product => res.send({data: product}))
            .catch(error => res.send(error))
    } else {
        res.send(errors)
    }
})

// DELETE: Изменение продукта
router.delete('/product/:id', (req, res) => {
    const {id} = req.params;
    Product.destroy({where: {id}})
        .then(() => res.sendStatus(200))
        .catch(error => res.send({error}))
});

export default router;