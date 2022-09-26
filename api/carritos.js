const { sendNewOrder, sendWhatsApp }=require('../src/twilio')

class ContenedorMongoDbCarrito {
    constructor(modelo) {
      this.collection = modelo
    }

    getAll = async () => {
        try {
            const allCarts = await this.collection.find()
            return allCarts   
        } catch (error) {
            return []
        }
    }

    getById = async(id) => {
        const carts = await this.collection.findById(id);
        return carts || { error: 'carrito no encontrado' }
    }

    getProductsByCartId = async(cartId) =>{
        const cart = await this.getById(cartId)
        return cart.productos || { error: 'carrito no encontrado' }
    }


    save = async(carrito) => {
        try {
            carrito.timestamp = Date.now()
            carrito.productos = []
            let cart = new this.collection(carrito).save()
            return cart
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }


    deleteById = async(id)  =>{
        try {
            const document = this.collection.findById(id);
            const deleteCart = await document.deleteOne();
            return deleteCart
        } catch (error) {
            throw new Error(`Error al modificar: ${error}`)
        }
    } 
    

    addProductToCart = async(cartId, product) =>{
        let cart = await this.getById(cartId)
        if(product.id !== undefined) {
            try{
            console.log(cart)
            const productos = cart.productos
            productos.push(product)
            const addProduct = await this.collection.findById(cartId).updateOne({productos: productos});
            return addProduct
                } catch (error) {
                    throw new Error(`Error al modificar: ${error}`)
        }}

    }
    removeProductFromCart = async(cartId, productId) =>{
        let cart = await this.getById(cartId)
            try{
            const productos = cart.productos
            const index = productos.findIndex((prod)=> prod._id == productId)
            if (index > -1) {
                productos.splice(index, 1);
            }
            const addProduct = await this.collection.findById(cartId).updateOne({productos: productos});
            return addProduct
                } catch (error) {
                    throw new Error(`Error al modificar: ${error}`)
        }
    }
    buyCart = async (cartId) => {
        let cart = await this.getById(cartId)
        try{
            const order = cart.products
            await sendNewOrder(order, user)
            await sendWhatsApp(order, user)
        }catch (error) {
        }
    }
}

module.exports =  ContenedorMongoDbCarrito