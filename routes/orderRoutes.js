const express = require('express');
const orderProductController = require('../controllers/orderProductController'); // Importa il nuovo controller
const orderController = require('../controllers/orderController');

const router = express.Router({ mergeParams: true }); // mergeparams?? -------------

router
  .route('/')
  .get(orderController.getAllOrders)
  .post(orderController.createOrder);

router
  .route('/getOrdersByProductName')
  .get(orderProductController.getOrdersByProductNames);
router
  .route('/:id')
  .get(orderController.getOrder)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

module.exports = router;
