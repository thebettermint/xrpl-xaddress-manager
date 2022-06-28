import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const balanceSchema = new mongoose.Schema({
  currency: { type: String, required: true },
  issuer: { type: String },
  amount: { type: Number, default: 0 },
});

const schema = new Schema({
  tag: { type: Number, required: true },
  id: { type: Number },
  created: { type: Date, default: Date.now },
  lastTx: Date,
  balance: [balanceSchema],
});

export default mongoose.model('Wallet', schema);
