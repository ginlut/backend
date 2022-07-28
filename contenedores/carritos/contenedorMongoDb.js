

class ContenedorMongoDbCarrito {
    constructor(nombre) {
      this.nombre = nombre
    }

    getAll = async () => {
        try {
            const allCarts = await fs.readFile(this.nombre, 'utf-8')
            return JSON.parse(allCarts)   
        } catch (error) {
            return []
        }
    }

    getById = async(id) => {
        const carts = await this.getAll()
        const foundCart = carts.find(cart => cart.id === Number(id))
        return foundCart || { error: 'producto no encontrado' }
    }

    getProductsByCartId = async(cartId) =>{
        const cart = await this.getById(cartId)
        return cart.productos || { error: 'carrito no encontrado' }
    }


    save = async(carrito) => {
        let cartsList = await this.getAll()
        let id = cartsList.length > 0 ? cartsList[cartsList.length - 1].id : 0
        carrito.id = id + 1
        carrito.timestamp = Date.now()
        carrito.productos = []
        cartsList.push(carrito)
        try {
            await fs.writeFile(this.nombre, JSON.stringify(cartsList, null, 2))
            return {id:carrito.id}
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }


    deleteById = async(id)  =>{
        let carts = await this.getAll()
        const index = carts.findIndex(cart => cart.id === Number(id))
        if (index !== -1) {
            carts = carts.filter(cart => cart.id !== Number(id))
            await fs.writeFile(this.nombre, JSON.stringify(carts))
        } else {
            return { error: 'carrito no encontrado' }
        } 
    }

    addProductToCart = async(cartId, product) =>{
        let cart = await this.getById(cartId)
        const carts = await this.getAll()
        if(product.id !== undefined) {
            cart.productos.push(product)
            const index = carts.findIndex(cart => cart.id === Number(cartId))
                if (index !== -1) {
                carts[index] = cart
                try {
                    await fs.writeFile(this.nombre, JSON.stringify(carts, null, 2))
                    return cart
                } catch (error) {
                    throw new Error(`Error al modificar: ${error}`)
                    }
                } else{
                    return { error: 'carrito no encontrado' }
                } 
        }
        else {
            return { error: 'producto no encontrado' }
        }

    }
    removeProductFromCart = async(cartId, productId) =>{
        let cart = await this.getById(cartId)
        if (cart.id !== undefined){
            let index = cart.productos.findIndex(product => product.id === Number(productId))
            if (index !== -1) {
                try {
                    cart.productos.splice(index, 1)
                    let carts = await this.getAll()
                    let indexCart = carts.findIndex(cart => cart.id === Number(cartId))
                    carts[indexCart] = cart
                    await fs.writeFile(this.nombre, JSON.stringify(carts))
                } catch (error) {
                    throw new Error(`Error al modificar: ${error}`)}
            } else{
                return { error: 'producto no encontrado en el carrito' }
            } 
        }else{
            return { error: 'carrito no encontrado' }
        }
}

}

module.exports =  ContenedorMongoDbCarrito