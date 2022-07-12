const knex = require('knex')

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
          database.destroy()
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
      console.log('CProducto eliminado')
    } catch (e) {
      console.log(e);
      database.destroy()
    }
  };

}

module.exports =  Productos