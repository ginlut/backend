const {DaoFactoryProduct} =require("../src/utils/databases/services/daoFactory")
const daoFactoryProduct = new DaoFactoryProduct();
const Product = daoFactoryProduct.createDao();
const logger = require("../src/utils/logs/logger")
 
class ProductsController {
    async getAll(req, res) {
    try {
        const products = await Product.getAll()
        res.format({
            html: function () {
                res.render('products', { products })
              },
              json: function () {
                res.json(products)
              }
        })

    } catch (error) {
        logger.error(`No estás autenticado: ${error}`)}
    }

    async getById(req, res) {
        res.json(await Product.getById(req.params.id))
    }

    async createProduct(req, res)  {
        res.json(await Product.createProduct(req.body))
    }

    async updateProducts(req, res) {
        res.json(await Product.updateProducts(req.body, req.params.id))
}

    async deleteById(req, res) {
        res.json(await Product.deleteById(req.params.id))
}
}

module.exports =  ProductsController