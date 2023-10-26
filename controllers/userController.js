const User = require('../models/userModel');

const factory = require('./handlerFactory');

// NEW VERSION WITH FACTORY FILE
exports.getAllUser = factory.getAll(User);
exports.createUser = factory.createOne(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
