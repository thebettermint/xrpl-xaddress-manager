import db from '../helpers/db';
import { PaymentInterface } from '../../types/parser/payment';
import config from '../../config/config.json';
import directoryService from './directory.service';
import { rippleTimeToISOTime } from 'xrpl';

const parse = (tx: PaymentInterface, side: string): any => {
  return {
    tag: tx[`${side}_tag`] || 0,
    change: tx[`${side}_balance_changes`][0].value,
    timestamp: tx.time ? rippleTimeToISOTime(Number(tx.time)) : null,
    data: {
      currency: tx[`${side}_balance_changes`][0].currency,
      issuer: tx[`${side}_balance_changes`][0].counterparty,
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
    create(param, tx, side);
  });
};

const create = async (param: any, tx: PaymentInterface, side: string) => {
  const balance = new db.Balance(param);
  await balance.save();
  directoryService.process(balance._id.toString(), tx, side);
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
