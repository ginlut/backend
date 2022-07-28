const admin = require('../../databases/firebase')


const db = admin.firestore();

class ContenedorFirebase {
    constructor(nombre) {
      this.collection = db.collection(nombre) 
    }
    getAll = async () => {
        try {
            const query = await this.collection.get();
            const response = query.docs.map((doc) => ({
                id:doc.id,
                timestamp :doc.data().timestamp,
                nombre:doc.data().nombre,
                descripcion:doc.data().descripcion,
                codigo:doc.data().codigo,
                foto:doc.data().foto,
                precio:doc.data().precio,
                stock:doc.data().stock
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

    save = async(producto) => {

        try {
            producto.timestamp = Date.now()
            console.log(this.collection.doc())
            return this.collection.doc().create(producto)
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    updateProducts = async(product, id) => {
            try {
                const document = this.collection.doc(id);
                const updatedProduct = await document.update(product);
                return updatedProduct
            } catch (error) {
                throw new Error(`Error al modificar: ${error}`)
            }
    }
    
    deleteById = async(id)  =>{
        try {
            const document = this.collection.doc(id);
            const deleteProduct = await document.delete();
            return deleteProduct
        } catch (error) {
            throw new Error(`Error al modificar: ${error}`)
        }
    }

}

module.exports =  ContenedorFirebase