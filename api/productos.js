const knex = require('knex')

const { faker } =require('@faker-js/faker');
const config = require("../databases/config");
const mongoose = require('mongoose')

class Productos {
    constructor(modelo) {
      this.collection = modelo;
    }
    
    getAll = async () => {
        try {
            const allProducts = await this.collection.find()
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
  saveFaker = async (n) => {
    try {
      for  (let i = 1; i <= n; i++){
      const product = {
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        thumbnail: faker.image.imageUrl(),
        description: faker.commerce.productDescription(),
        code: faker.random.alphaNumeric(5),
        stock: faker.random.numeric()
      }
    const result = await this.collection.save(product)
    console.log('Producto insertado en la tabla')
    return result
  }
  
    } catch(err) {
        console.log(err)
        this.collection.destroy()
    }
}


module.exports =  Productos