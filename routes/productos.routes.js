const { Router, express } = require('express');
const {productosApi} = require("../src/utils/databases/daos/index.daos");
const path = require("path");
const router = Router()
const { auth} = require("../src/middlewares")
const util = require("util");
const DaoFactory =require("../src/utils/databases/daos/daoFactory")
const compression = require('compression')
router.use(compression())
const daoFactory = new DaoFactory();
const productDao = daoFactory.createDao();



router.route("/").get(productDao.getAll).post(productDao.createProduct)

router.route('/:id').get(productDao.getById).put(productDao.updateProducts).delete(productDao.deleteById)

module.exports = router;
  