const { promises: fs } = require('fs')

class ContenedorMensajes {
    constructor(nombre) {
        this.nombre = nombre
    }
    getAll = async () => {
        try {
            const allProducts = await fs.readFile(this.nombre, 'utf-8')
            return JSON.parse(allProducts)   
        } catch (error) {
            return []
        }
    }
    save = async(producto) => {
        let productList = await this.getAll()
        let id = productList.length > 0 ? productList[productList.length - 1].id : 0
        producto.id = id + 1
        productList.push(producto)

        try {
            await fs.writeFile(this.nombre, JSON.stringify(productList, null, 2))
            return producto.id
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    getById = async(id) => {
        const products = await this.getAll()
        const foundProduct = products.find(product => product.id === Number(id))
        return foundProduct || { error: 'producto no encontrado' }
    }
}
module.exports =  ContenedorMensajes