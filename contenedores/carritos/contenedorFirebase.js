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
            carrito.productos = []
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
        if(product.id !== undefined) {
            try{
                console.log(cart)
            const productos = cart.productos
            productos.push(product)
            const addProduct = await this.collection.doc(cartId).update({productos: productos});
            return addProduct
                } catch (error) {
                    throw new Error(`Error al modificar: ${error}`)
        }}
    }
    removeProductFromCart = async(cartId, productId) =>{
        let cart = await this.getById(cartId)
            try{
            const productos = cart.productos
            const index = productos.findIndex((prod)=> prod.id == productId)
            if (index > -1) {
                productos.splice(index, 1);
            }
            const addProduct = await this.collection.doc(cartId).update({productos: productos});
            return addProduct
                } catch (error) {
                    throw new Error(`Error al modificar: ${error}`)
        }
}

}

module.exports = ContenedorFirebaseCarritos