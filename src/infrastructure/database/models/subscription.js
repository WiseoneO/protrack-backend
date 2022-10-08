const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: 'User',
      required: true,
    },
    invoiceNumber: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    amount: {
      type: String,
      required: true,
      default: 'free',
    },
    plan: {
      type: String,
      required: true,
      enum: ['individual', 'team', 'organization'],
    },
    payment_status: {
      type: String,
      required: true,
      enum: ['null', 'paid', 'pending'],
      default: null,
    },
    start_date: {
      type: Date,
      default: Date.now,
    },
    end_date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const SubscriptionModel = mongoose.model('Subscription', subscriptionSchema);

module.exports = SubscriptionModel;
