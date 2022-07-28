const admin = require("../../databases/firebase") ;

const db = admin.firestore();

class ContenedorFirebaseCarritos {
    constructor(nombre) {
        this.collection = db.collection(nombre) 
      }

    getAll = async () => {
        try {
            const query = await this.collection.get();
            const response = query.docs.map((doc) => ({
                id:doc.id,
                timestamp :doc.data().timestamp,
            }));
            return response;
        } catch (error) {
            console.log(error)
            return []
        }
    }

    getById = async(id) => {
        const doc = await this.collection.doc(id).get();
        const data = doc.data();    
        return { ...data, id } || { error: 'producto no encontrado' };
    }

    getProductsByCartId = async(cartId) =>{
        const cart = await this.getById(cartId)
        return cart.productos || { error: 'carrito no encontrado' }
        
    }


    save = async(carrito) => {
        try {
            carrito.timestamp = Date.now()
            carrito.productos = {}
            return this.collection.doc().create(carrito)
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }


    deleteById = async(id)  =>{
        try {
            const document = this.collection.doc(id);
            const deleteCart = await document.delete();
            return deleteCart
        } catch (error) {
            throw new Error(`Error al modificar: ${error}`)
        }
    }

    addProductToCart = async(cartId, product) =>{
        let cart = await this.getById(cartId)
        //const carts = await this.getAll()
        if(product.id !== undefined) {
            try{
            const productos = cart.productos
            productos.push(product)
            const addProduct = await cart.update({productos: productos});
            return addProduct
                } catch (error) {
                    throw new Error(`Error al modificar: ${error}`)
        }}
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

module.exports = ContenedorFirebaseCarritos