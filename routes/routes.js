const { Router, express } = require('express');
const {productosApi} = require("../databases/daos/ProductosDaoMongoDb");
const router = Router()

const admin = true

/*----------------------PRODUCTOS-------------------------- */



router.get('/api/productos-test', async function(req, res) {
  res.json(await productosApi.saveFaker(5))
})


router.get('/api/productos', async function (req, res) {
    res.json(await productosApi.getAll())
  })

  router.get('/api/productos/:id', async function (req, res) {
    res.json(await productosApi.getById(req.params.id))
  })

  router.post('/api/productos', async function(req, res) {
      res.json(await productosApi.save(req.body))
  })


  router.put('/api/productos/:id', async function (req, res) {
      res.json(await productosApi.updateProducts(req.body, req.params.id))
  })


  router.delete('/api/productos/:id', async function (req, res) {
   res.json(await productosApi.deleteById(req.params.id))
  })

  router.get('/api/mensajes-test', async function (req, res) {
    res.json(await mensajesApi.getAll())
  })




module.exports = router;