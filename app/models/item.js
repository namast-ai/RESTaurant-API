const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  // category: {
  //   type: String,
  //   required: true
  // },
  // department: {
  //   type: String,
  //   required: true
  // },
  limit: {
    type: Number
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
})

itemSchema.virtual('reorderStatus').get(function () {
  if (this.quantity <= 5) {
    return 'danger'
  } else if (this.quantity > 5 && this.quantity <= 10) {
    return 'warning'
  } else {
    return 'success'
  }
})

const Item = mongoose.model('Item', itemSchema)

module.exports = mongoose.model('Item', itemSchema)
