import db from '../helpers/db';

const getBalanceByTag = (tag: number) => {
  let wallet = db.Wallet.findOne({ tag: tag });
  return wallet;
};

export default {
  getBalanceByTag,
};
