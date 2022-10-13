const axios = require("axios");
const instance = axios.create({ baseURL: "http://localhost:8080" });

const getProducts = async () => {
  try {
    const response = await instance.get(`/api/productos`);
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
};

const createProducts = async () => {
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

const deleteProducts = async (id) => {
  try {
    const response = await instance.delete(`/api/productos/${id}`);
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
};

const updateProducts = async (id) => {
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

const getProductById = async (id) => {
  try {
    const response = await instance.get(`/api/productos/${id}`);
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
};


//createProducts()
//getProducts();
//deleteProducts("6347798c05d833a7d6a4cdb1")  
//updateProducts("6347797f5fdcd2ab7d68ff30")
getProductById("6347797f5fdcd2ab7d68ff30")


