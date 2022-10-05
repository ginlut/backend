const ProductMongoDAO =require("../src/utils/databases/daos/productMongo.dao")
const DaoFactory =require("../src/utils/databases/daos/daoFactory")
const daoFactory = new DaoFactory();
const Product = daoFactory.createDao();
const logger = require("../src/utils/logs/logger")


const getAll = async () => {
    try {
        console.log("Hola3")
        const products = await Product.getAll()
        return products
    } catch (error) {
        console.log(error)
        logger.error(`No estás autenticado: ${error}`)}
}


const getById = async () => {
    res.json(await Product.getById(req.params.id))
}

const createProduct = async (product) => {
    return await Product.createProduct(product)
}

const updateProducts = async (product, productID) => {
    return await Product.updateProducts(product, productID)
}

const deleteById = async (productID) => {
    return await Product.deleteById(productID)
}

module.exports =  {getAll, getById, createProduct, updateProducts, deleteById}