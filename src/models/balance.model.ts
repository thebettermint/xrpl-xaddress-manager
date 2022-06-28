import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    tag: String,
    change: Number,
    timestamp: Date,
    data: {
      amount: {
        currency: { type: String, required: true },
        issuer: { type: Number },
        amount: { type: Number, default: 0 },
      },
      hash: { type: String, required: true },
    },
  },
  {
    timeseries: {
      timeField: 'timestamp',
      metaField: 'data',
      granularity: 'seconds',
    },
  }
);

export default mongoose.model('Balance', schema);
