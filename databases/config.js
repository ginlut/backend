module.exports = {
mongodbProducts: {
  connectionString: "mongodb://localhost:27017/productos",
},
mongodbUsers: {
  connectionString: "mongodb://localhost:27017/usuarios",
},
puerto: process.env.PUERTO || 8081,
}
