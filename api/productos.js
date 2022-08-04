const knex = require('knex')

const { faker } =require('@faker-js/faker');


class Productos {
    constructor(config, nombreTabla) {
      this.productos = []
      this.nombreTabla = nombreTabla
      this.dbproductos = knex(config)
      this.createTable();
    }

    createTable = async () => {
        try {
          const exists = await this.dbproductos.schema.hasTable(this.nombreTabla)
          if (!exists) {
              await this.dbproductos.schema.createTable(this.nombreTabla, (table) => {
              table.increments("id").primary();
              table.string("title", 50).notNullable();
              table.integer("price");
              table.string("thumbnail");     
              table.string("description");   
              table.string("code");     
              table.integer("stock");    
            });
          console.log(`Tabla ${this.nombreTabla} creada`);
        } else{
          console.log(`La tabla ${this.nombreTabla} ya existe`)
        }          
      } catch (error) {
          console.log(error);
          this.dbproductos.destroy();
        }
      };
      
    getAll = async () => {
      try {
        const products = await this.dbproductos.from(this.nombreTabla).select('*');
        return products
      } catch (e) {
        console.log(e);
        this.dbproductos.destroy();    
      }
    };

    getById = async (id) => {
      try {
        const product = await this.dbproductos.from(this.nombreTabla).select('*').where("id", "=", Number(id))    
        return product
      } catch (e) {
        console.log(e);
        this.dbproductos.destroy();
        return { error: 'producto no encontrado' }
      }
    };

    save = async (producto) => {
      try {
    
      const result = await this.dbproductos(this.nombreTabla).insert(producto)
      console.log('Producto insertado en la tabla')
      return result

      } catch(err) {
          console.log(err)
      }
  }

  saveFaker = async (producto) => {
    try {
      for  (let i = 0; i<6; i++){
      const product = {
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        thumbnail: faker.image.imageUrl(),
        description: faker.commerce.productDescription(),
        code: faker.random.alphaNumeric(5),
        stock: faker.random.numeric()
      }
    const result = await this.dbproductos(this.nombreTabla).insert(product)
    console.log('Producto insertado en la tabla')
    return result
  }
  
    } catch(err) {
        console.log(err)
        this.dbproductos.destroy()
    }
}

  
    updateProducts = async (product, id) => {
      try {
        await this.dbproductos.from(this.nombreTabla).where("id", "=", Number(id)).update(product)
        console.log('Producto actualizado')
      } catch (e) {
        console.log(e);
        database.destroy()
      }
    };

  deleteById = async (id) => {
    try {
      await this.dbproductos.from(this.nombreTabla).where("id", "=", Number(id)).del()
      console.log('Producto eliminado')
    } catch (e) {
      console.log(e);
      database.destroy()
    }
  };

}

module.exports =  Productos