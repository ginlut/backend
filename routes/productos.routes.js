const { Router, express } = require('express');
//const {productosApi} = require("../src/utils/databases/daos/index.daos");
const path = require("path");
const router = Router()
const { auth} = require("../src/middlewares")
const util = require("util");
const {getAll, getById, createProduct, updateProducts, deleteById} =require("../controllers/productos.controller")
const compression = require('compression')
router.use(compression())
 

router.get('/', auth, async function (req, res) {
  const products = await getAll()
  res.render('products', { products })
})

router.post('/', async function(req, res) {
  res.json(await createProduct(req.body))
})

router.put('/:id', async function (req, res) {
  res.json(await updateProducts(req.body, req.params.id))
})

router.get('/:id', async function (req, res) {
  res.json(await getById(req.params.id))
})

router.delete('/:id', async function (req, res) {
  res.json(await deleteById(req.params.id))
})

module.exports = router;
  