import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    tag: Number,
    change: Number,
    timestamp: Date,
    data: {
      currency: { type: String, required: true },
      issuer: { type: Number },
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
