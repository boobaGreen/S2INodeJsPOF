const Order = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOrdersByProductNames = catchAsync(async (req, res, next) => {
  const productNames = req.query.productNames.split(',');

  // Cerca ordini che contengono **tutti** i nomi dei prodotti forniti
  const orders = await Order.find({});
  if (!orders) {
    return next(new AppError('Error getting Orders Document', 404));
  }

  const filteredOrders = orders.filter((order) =>
    productNames.every((productName) =>
      order.products.some((product) => product.name === productName),
    ),
  );

  return res.status(200).json({
    status: 'success',
    results: filteredOrders.length,
    data: {
      data: filteredOrders,
    },
  });
});
