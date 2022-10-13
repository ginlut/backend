const {DaoFactoryCart, DaoFactoryProduct} =require("../src/utils/databases/services/daoFactory")
const daoFactoryCart = new DaoFactoryCart();
const Cart = daoFactoryCart.createDao();

const daoFactoryProduct = new DaoFactoryProduct();
const Product = daoFactoryProduct.createDao();
const logger = require("../src/utils/logs/logger")

const userController= require("./usuarios.controller")


class CartController {
    async getProductsInCart(req, res) {
        try {
            let productsInCart = await Cart.getProductsInCart(req.user.username)
            let valorInicial= 0
            const total = productsInCart.reduce((sum, product) => sum + product.precio, valorInicial)
            res.render('cart', { productos: productsInCart, total: total })
          } catch (error) {
            logger.error(`Error al iniciar carrito`)
          }
    }

    async addProductToCart(req, res) {
        const product = await Product.getById(req.body.productId)
        await Cart.addProductToCart(req.user.username, product)
    }

    async removeProductFromCart(req, res)  {
        try {
          await Cart.removeProductFromCart(req.user.username, req.params.id_prod)
          res.redirect('/carrito');
        } catch (error) {
            logger.error(`Error al eliminar producto: ${error}`)
        }
    }

    async buyCarrito(req, res)  {
        try {
            const usuario = await userController.getAcount({email: req.username})
            console.log(usuario)
            await Cart.buyCart(usuario)
            res.redirect('/productos');
            }
            catch (error) {
              logger.error(`${error}`)
          }
    }
    
}

module.exports =  CartController