const admin = require('../database/firebase')

const db = admin.firestore();

const { normalize, schema, denormalize } =require("normalizr")
;
const util = require("util");
const { time } = require('console');

class ContenedorMensajes {
    constructor(nombre) {
      this.collection = db.collection(nombre) 
    }
    getAll = async () => {
        try {
            const query = await this.collection.get();
            const response = await query.docs.map((doc) => ({
                id:doc.id,
                autor:doc.data().autor,
                texto:doc.data().texto,
                time:doc.data().time,
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
        return { ...data, id } || { error: 'mensaje no encontrado' };
    }

    save = async(mensaje) => {

        try {
          mensaje.timestamp = Date.now()
            console.log(this.collection.doc())
            return this.collection.doc().create(mensaje)
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    normalize = async() =>{

         const dataMensajes = {grupo: await this.getAll()}

         //console.log(dataMensajes)
         
         const autor = new schema.Entity("autores", {}, {idAttribute: "mail"});

         const mensaje = new schema.Entity("mensaje", {
            autor: autor
         });

        const mensajes = new schema.Entity("mensajes", {
            autor: [autor],
            grupo: [mensaje]
        });
        function print(objeto) {
            console.log(util.inspect(objeto, false, 12, true));
        }
        //console.log(dataMensajes)
         //console.log(mensaje)
        const normalizedData = normalize(dataMensajes, mensajes);

        //print(normalizedData)
         //console.log(normalizedData);
          
        //   const logitudNormalized = JSON.stringify(normalizedData).length;
        //   const longitudOriginal = JSON.stringify(grupo).length;
          
        //   console.log("Longitud original: ", longitudOriginal);
        //   console.log("Longitud normalizado: ", logitudNormalized);
          
        //   const porcentaje = (logitudNormalized * 100) / longitudOriginal;
          
        //   console.log(`Porcentaje de optimizacion ${(100 - porcentaje).toFixed(2)}%`);
    }

  }

module.exports =  ContenedorMensajes