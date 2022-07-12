const knex = require('knex')

class ContenedorMensajes {
    constructor(config, nombreTabla) {
        this.mensajes = []
        this.nombreTabla = nombreTabla
        this.dbmensajes = knex(config)
        this.createTable();
      }
  
      createTable = async () => {
          try {
            const exists = await this.dbmensajes.schema.hasTable(this.nombreTabla)
            if (!exists) {
                await this.dbmensajes.schema.createTable(this.nombreTabla, (table) => {
                table.string("nombre", 50).notNullable();
                table.string("correo", 50);
                table.string("mensaje", 100);
              });
            console.log(`Tabla ${this.nombreTabla} creada`);
          } else{
            console.log(`La tabla ${this.nombreTabla} ya existe`)
          }          
        } catch (error) {
            console.log(error);
            this.dbmensajes.destroy();
          }
        };
        
      getAll = async () => {
        try {
          const messages = await this.dbmensajes.from(this.nombreTabla).select('*');
          return messages
        } catch (e) {
          console.log(e);
          this.dbmensajes.destroy();    
        }
      };
  
      getById = async (id) => {
        try {
          const messages = await this.dbmensajes.from(this.nombreTabla).select('*').where("id", "=", Number(id))    
          return messages
        } catch (e) {
          console.log(e);
          this.dbmensajes.destroy();
          return { error: 'mensaje no encontrado' }
        }
      };
  
      save = async (mensaje) => {
        try {
      
        const result = await this.dbmensajes(this.nombreTabla).insert(mensaje)
        console.log('Mensaje insertado en la tabla')
        return result
  
        } catch(err) {
            console.log(err)
            database.destroy()
        }
    }
}
module.exports =  ContenedorMensajes