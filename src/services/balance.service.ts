import db from '../helpers/db';
import { PaymentInterface } from '../../types/parser/payment';
import config from '../../config.json';

const parse = (tx: PaymentInterface, side: string): any => {
  return {
    tag: tx[`${side}Tag`] || 0,
    change: tx[`${side}_balance_changes`].value,
    timestamp: tx.time,
    data: {
      amount: {
        currency: tx[`${side}_balance_changes`].currency,
        issuer: tx[`${side}_balance_changes`].counterparty,
        amount: tx[`${side}_balance_changes`].value,
      },
      hash: tx.tx_hash,
    },
  };
};

const determineSides = (tx: PaymentInterface): Array<any> => {
  const types: string[] = [];
  if (tx.source && tx.destination) {
    if (config[0].registry.includes(tx.source)) types.push('source');
    if (config[0].registry.includes(tx.destination)) types.push('destination');
  }
  return types;
};

const process = async (tx: PaymentInterface) => {
  const sides = determineSides(tx);
  sides.forEach(async (side: string) => {
    let param = parse(tx, side);
    create(param);
  });
};

const create = async (param: any) => {
  const balance = new db.Balance(param);
  await balance.save();
  return details(balance);
};

const update = async (
  hash: string,
  params: { tag?: number; change?: number; timestamp?: Date; data?: any }
) => {
  const balance: any = await db.Balance.findOne({ data: { hash: hash } });
  if (!balance) throw 'Balance change not found';

  // copy params to account and save
  Object.assign(balance, params);
  await balance.save();
  return details(balance);
};

const _delete = async (param: any) => {
  const balance = new db.Balance(param);
  await balance.save();
  return details(balance);
};

const getChangeByHash = async (hash: string) => {
  const balance: any = await db.Balance.findOne({ data: { hash: hash } });
  if (!balance) throw 'Balance change not found';
  return details(balance);
};

const details = async (balance: {
  tag: any;
  change: any;
  timestamp: any;
  data: any;
}) => {
  const { tag, change, timestamp, data } = balance;
  return { tag, change, timestamp, data };
};

export default {
  process,
  create,
  update,
  _delete,
  getChangeByHash,
};
