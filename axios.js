const axios = require("axios");
const instance = axios.create({ baseURL: "http://localhost:8080" });

class pruebasAxios {
  async getProducts() {
    try {
      const response = await instance.get(`/api/productos`);
      return response.data
    } catch (err) {
      console.log(err);
    }
  };

  async createProducts() {
    try {
      const response = await instance.post(`/api/productos`, {
        nombre: "Frutos Rojos",
        foto: "https://i.ibb.co/qn6BB6D/frutos-rojos.jpg",
        precio: 2000,
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  async deleteProducts(id){
    try {
      const response = await instance.delete(`/api/productos/${id}`);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  async updateProducts(id){
    try {
      const response = await instance.put(`/api/productos/${id}`, {
        nombre: "Frutos Rojos",
        foto: "https://i.ibb.co/qn6BB6D/frutos-rojos.jpg",
        precio: 3000,
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  async getProductById(id){
    try {
      const response = await instance.get(`/api/productos/${id}`);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = pruebasAxios