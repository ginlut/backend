const crypto =require ("crypto");
const Producto =require ("./product.class");

const productsMap = {};

const createProduct = ({ datos }) => {
  const id = crypto.randomBytes(10).toString("hex");
  const newProduct = new Producto(id, datos);

  productsMap[id] = newProduct;

  return newProduct;
};

const getById = ({ id }) => {
  if (!productsMap[id]) throw new Error("Producto no existe");

  return productsMap[id];
};

const getAll = ({ campo, valor }) => {
  const productos = Object.values(productsMap);

  if (campo && valor) {
    return productos.filter((producto) => producto[campo] == valor);
  } else {
    return productos;
  }
};

const updateProducts = ({ id, datos }) => {
  if (!productsMap[id]) throw new Error("Producto no existe");

  const updatedProduct = new Producto(id, datos);

  personasMap[id] = updatedProduct;

  return updatedProduct;
};

const deleteById = ({ id }) => {
  if (!productsMap[id]) throw new Error("Producto no existe");

  const deletedProduct = personasMap[id];

  delete productsMap[id];

  return deletedProduct;
};

module.exports = {
  getById,
  getAll,
  createProduct,
  updateProducts,
  deleteById,
};

