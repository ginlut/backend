const ProductMongoDAO =require("../src/utils/databases/daos/productMongo.dao")
const Product = new ProductMongoDAO()

const getAll = async () => {
    try {
        const products = await Product.getAll()
        res.render('products', { products })
      } catch (error) {
        logger.error(`No estás autenticado: ${error}`)}
    }


const getById = async () => {
    res.json(await Product.getById(req.params.id))
}

const createProduct = async () => {
    res.json(await Product.createProduct(req.body))
}

const updateProducts = async () => {
    res.json(await Product.updateProducts(req.body, req.params.id))
}

const deleteProducts = async () => {
    res.json(await productosApi.deleteById(req.params.id))
}

module.exports =  {getAll, getById, createProduct, updateProducts, deleteProducts}