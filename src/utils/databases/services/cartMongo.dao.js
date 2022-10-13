const Cart = require("../models/carrito.model");
const CustomError = require("../../CustomError")
const {sendWhatsApp }=require('../../../twilio')


let instance;

class CartMongoDAO {
  constructor() {
    this.collection = Cart;
  }

  addProductToCart = async(username, product) =>{
    let cart = await this.getByUsername(username)
    if(product.id !== undefined) {
        try{
        let productos = cart.productos
        productos.push(product)
        const addProduct = await cart.updateOne({productos: productos});
        return addProduct
            } catch (error) {
                throw new Error(`Error al modificar: ${error}`)
    }}
  } 

 
  getAll = async () => {
    try {
        const allCarts = await this.collection.find()
        return allCarts   
    } catch (error) {
        return []
    }
  }

  getByUsername = async(username) => {
      const cart = await this.collection.findOne({ username: username });
      return cart || { error: 'carrito no encontrado' }
  }

  getProductsInCart = async(username) =>{
    try {
        const cart = await this.getByUsername(username)
        if (!cart) {
          cart = new this.collection({
            username: username,
            products: [],
          }).save()
        }
        return cart.productos
      } catch (error) {
        logger.info('error', error)
        throw new CustomError(500, "Error with cart ID")
      }
  }

  deleteCartById = async(id)  =>{
      try {
          const document = this.collection.findById(id);
          const deleteCart = await document.deleteOne();
          return deleteCart
      } catch (error) {
          throw new Error(`Error al modificar: ${error}`)
      }
  } 

  removeProductFromCart = async(username, productId) =>{
    try{
      let cart = await this.getByUsername(username)
      let productos = cart.productos
      const index = productos.findIndex((prod)=> prod._id == productId)
      if (index > -1) {
          productos.splice(index, 1);}
      const updatedCart = await cart.updateOne({productos: productos});
      console.log(productId)
      return updatedCart
    } catch (error) {
      throw new Error(`Error al modificar: ${error}`)
    } 
  }

  buyCart = async (user) => {
      let cart = await this.collection.findOne({username: user.username})
      try{
          const orderArray = cart.productos
          const order = JSON.stringify(orderArray);
          await sendWhatsApp(order, user)
          await cart.updateOne({ $set: { productos: [] } })
      }catch (error) {
          throw new Error(`${error}`)
      }
  }

  static getInstance() {
    if (!instance) {
      instance = new CartMongoDAO();
    }
    return instance;
  }
}

module.exports = CartMongoDAO;
