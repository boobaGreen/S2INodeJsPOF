const Product = require('../models/productModel');
const factory = require('./handlerFactory');

// new version with factory file
exports.getAllProducts = factory.getAll(Product);
exports.getProduct = factory.getOne(Product); //--------------da capire!!!!!!!
exports.createProduct = factory.createOne(Product);
// ps DONT update passwords with this
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
