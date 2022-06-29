import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
  tag: { type: Number, required: true },
  ts_id: { type: String, required: true },
  hash: { type: String, required: true },
  timestamp: Date,
  amount: {
    currency: { type: String, required: true },
    issuer: { type: Number },
    value: { type: Number, default: 0 },
  },
});

export default mongoose.model('Directory', schema);
