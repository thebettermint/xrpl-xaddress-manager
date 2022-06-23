import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const balanceSchema = new mongoose.Schema({
  currency: { type: Number, required: true },
  issuer: { type: Number },
  amount: { type: Number, default: 0 },
});

const historySchema = new mongoose.Schema({
  type: { type: String, required: true },
  amount: balanceSchema,
  date: { type: Number, required: true },
  hash: { type: String, required: true },
});

const schema = new Schema({
  tag: { type: Number, required: true },
  id: { type: Number },
  created: { type: Date, default: Date.now },
  lastTx: Date,
  balance: [balanceSchema],
  history: [historySchema],
});

export default mongoose.model('Wallet', schema);
