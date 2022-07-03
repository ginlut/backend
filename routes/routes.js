const { Router } = require('express')
const router = Router()
const express = require('express')
const Productos = require('../api/productos')
const productosApi = new Productos()

router.get('/productos', (req, res) => {
    const products = productosApi.getAll()
    res.render("vista", {
        productos: products,
        existenceTable: products.length
    });
})

router.post('/productos', (req, res) => {
    const producto = req.body
    productosApi.save(producto)
    res.redirect('/')
})

module.exports = router