module.exports = class Producto {
  constructor(id, { nombre, foto, precio }) {
    this.id = id;
    this.nombre = nombre;
    this.foto = foto;
    this.precio = precio;
  }
}
