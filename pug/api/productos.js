class Productos {
    constructor() {
      this.productos = []
    }
    getAll () {
        return this.productos
    }

    getById (id) {
      const products = this.getAll()
      const foundProduct = products.find(product => product.id === Number(id))
      return foundProduct || { error: 'producto no encontrado' }
    }

    save(producto) {
        let productList = this.getAll()
        let id = productList.length > 0 ? productList[productList.length - 1].id : 0
        producto.id = id + 1
        productList.push(producto)
        return producto
    }

    update(product, id) {
        const modifiedProduct = { id: Number(id), ...product }
        const index = this.productos.findIndex(product => product.id === Number(id))
        if (index !== -1) {
            this.productos[index] = modifiedProduct
            return modifiedProduct
        } else {
            return { error: 'producto no encontrado' }
        }
    }
  deleteById(id) {
    const index = this.productos.findIndex(product => product.id === Number(id))
    if (index !== -1) {
        return this.productos.splice(index, 1)
    } else {
        return { error: 'producto no encontrado' }
    }
}

}

module.exports =  Productos