class Productos {
    constructor(modelo) {
      this.collection = modelo;
    }
    
    getAll = async () => {
        try {
            const allProducts = await this.collection.find().lean()
            return allProducts   
        } catch (error) {
            return []
        }

    }
    getById = async(id) => {
        const doc = await this.collection.findById(id);
        return doc || { error: 'producto no encontrado' }
    }

    save = async(producto) => {
        try {
            producto.timestamp = Date.now()
            let product = new this.collection(producto).save()
            return product
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
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
}



module.exports =  Productos