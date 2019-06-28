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
    type: Number,
    required: true
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
  if (this.quantity === 0 && this.limit === 0) {
    return 'danger'
  }
  if (this.quantity <= this.limit) {
    return 'danger'
  } else if (this.quantity > this.limit && this.quantity <= this.limit * 1.5) {
    return 'warning'
  } else {
    return 'success'
  }
})

// const Item = mongoose.model('Item', itemSchema)

module.exports = mongoose.model('Item', itemSchema)
