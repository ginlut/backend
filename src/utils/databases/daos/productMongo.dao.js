const Product = require("../models/producto.model");
const CustomError = require("../../CustomError")


let instance;

class ProductMongoDAO {
  constructor(modelo) {
    this.collection = modelo;
  }

  async getAll() {
    try {
      const products = await this.collection.find().lean();

      return products;
    } catch (err) {
      return []
    }
  }

  async createProduct(newProduct) {
    try {
      const createdProduct = await this.collection.create(newProduct);

      return createdProduct;
    } catch (err) {
      console.log(err);

      throw new CustomError(500, "Error creating product");
    }
  }
  getById = async(id) => {
    const doc = await this.collection.findById(id);
    return doc || { error: 'producto no encontrado' }
}

  
  updateProducts = async(product, id) => {
    try {
        const document = this.collection.findById(id);
        const updatedProduct = await document.updateOne(product);
        return updatedProduct
    } catch (error) {
        throw new Error(`Error al modificar: ${error}`)
    }

}

deleteById = async(id)  =>{
try {
    const document = this.collection.findById(id);
    const deleteProduct = await document.deleteOne();
    return deleteProduct
} catch (error) {
    throw new Error(`Error al modificar: ${error}`)
}
} 

  static getInstance() {
    if (!instance) {
      instance = new ProductMongoDAO();
    }
    return instance;
  }
}

module.exports = ProductMongoDAO;
