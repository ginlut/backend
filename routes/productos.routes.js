const { Router, express } = require('express');
const {productosApi} = require("../src/utils/databases/daos/ProductosDaoMongoDb");
const path = require("path");
const router = Router()
const { login, auth, checkAuth } = require("../src/middlewares")
const util = require("util");
const compression = require('compression')
router.use(compression())



router.get('/', async function (req, res) {
  if(req.isAuthenticated()){
    try {
      const products = await productosApi.getAll()
      res.render('products', { products })
    } catch (error) {
      logger.error(`No estás autenticado: ${error}`)}
    }
  else{
    res.sendFile(path.join(__dirname, "../public/plantillas/login.html"))}   
})

router.get('/:id', async function (req, res) {
  res.json(await productosApi.getById(req.params.id))
})

router.post('/', async function(req, res) {
  res.json(await productosApi.save(req.body))
})


router.put('/:id', async function (req, res) {
  res.json(await productosApi.updateProducts(req.body, req.params.id))
})


router.delete('/:id', async function (req, res) {
  res.json(await productosApi.deleteById(req.params.id))
})

module.exports = router;
  