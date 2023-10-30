const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    // 1 to MANY - CHILD REFERENCING
    buyers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Order must contain one or more buyers.'],
      },
    ],
    // 1 to MANY - CHILD REFERENCING
    products: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'Order must contain one or more products.'],
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  // {
  //   toJSON: { virtuals: true },
  //   toObject: { virtuals: true },
  // },
);

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'buyers',
    select: 'name',
  });
  this.populate({
    path: 'products',
    select: 'name',
  });
  next();
});

const Orders = mongoose.model('Order', orderSchema);

module.exports = Orders;
