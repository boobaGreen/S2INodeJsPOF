//  node dev-data\data\import-dev-data.js --import

const fs = require('fs');

const mongoose = require('mongoose');

const dotenv = require('dotenv');
const Product = require('../../models/productModel');
const Order = require('../../models/orderModel');
const User = require('../../models/userModel');

dotenv.config({ path: './config.env' });

async function dbConnect() {
  await mongoose.connect(process.env.DB);
  console.log('Db successfullt connected !!! 🌐');
}
dbConnect().catch((err) => console.log(err));

// HERE CHANGE THE FILE NAME TO CHOOSE AND IMPORT MANUALLY
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/products.json`, 'utf-8'),
);
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const orders = JSON.parse(fs.readFileSync(`${__dirname}/orders.json`, 'utf-8'));

const importData = async () => {
  try {
    await Product.create(products);
    await User.create(users, { validateBeforeSave: false });
    await Order.create(orders);
    console.log('Data succsefully loaded! ❎ ');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Product.deleteMany();
    await Order.deleteMany();
    await User.deleteMany();
    console.log('Data succsefully deleted! ✅ ');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
