const { Router, express } = require('express');
const daos = require("../daos/index.js");
const router = Router()
const Productos =require('../contenedores/productos/contenedorFirebase');
const productosApi = new Productos('productos')
const admin = true
const Carritos =require('../contenedores/carritos/contenedorFirebase');
const carritosApi = new Carritos('carritos')



/*----------------------PRODUCTOS-------------------------- */
router.get('/api/productos', async function (req, res) {
  res.json(await productosApi.getAll())
})

router.get('/api/productos/:id', async function (req, res) {
  res.json(await productosApi.getById(req.params.id))
})

router.post('/api/productos', async function(req, res) {
  if (admin){
    res.json(await productosApi.save(req.body))}
  else{
    res.json({ error : -1, descripcion: "ruta no autorizada" })}
})

router.put('/api/productos/:id', async function (req, res) {
  if (admin){
    res.json(await productosApi.updateProducts(req.body, req.params.id))}
  else{
    res.json({ error : -1, descripcion: "ruta no autorizada" })} 
})

router.delete('/api/productos/:id', async function (req, res) {
  if (admin){
    res.json(await productosApi.deleteById(req.params.id))}
  else{
    res.json({ error : -1, descripcion: "ruta no autorizada" })
  }
})

/*----------------------CARRITO-------------------------- */

router.post('/api/carrito', async function (req, res) {
  res.json(await carritosApi.save(req.body))
})

router.delete('/api/carrito/:id', async function (req, res) {
  res.json(await carritosApi.deleteById(req.params.id))     
})

router.get('/api/carrito/:id/productos', async function (req, res){
  res.json(await daos.CarritoDao.getProductsByCartId(req.params.id))
})

router.post('/api/carrito/:id/productos', async function(req, res){
  const product = await productosApi.getById(req.body.productId)
  res.json(await carritosApi.addProductToCart(req.params.id, product))
})

router.delete('/api/carrito/:id/productos/:id_prod', async function(req, res) {
  res.json(await daos.CarritoDao.removeProductFromCart(req.params.id, req.params.id_prod))     
})



module.exports = router;