import db from '../helpers/db';
import { PaymentInterface } from '../../types/parser/payment';
import { rippleTimeToISOTime } from 'xrpl';

const parse = (id: String, tx: PaymentInterface, side: string): any => {
  return {
    tag: tx[`${side}_tag`] || 0,
    ts_id: id,
    hash: tx.tx_hash,
    timestamp: tx.time ? rippleTimeToISOTime(Number(tx.time)) : null,
    amount: {
      currency: tx[`${side}_balance_changes`][0].currency,
      issuer: tx[`${side}_balance_changes`][0].counterparty,
      value: tx[`${side}_balance_changes`][0].value,
    },
  };
};

const process = async (id: String, tx: PaymentInterface, side: string) => {
  let param = parse(id, tx, side);
  create(param);
};

const create = async (param: any) => {
  const directory = new db.Directory(param);
  await directory.save();
  return details(directory);
};

const update = async (
  hash: string,
  params: { tag?: number; change?: number; timestamp?: Date; data?: any }
) => {
  const directory: any = await db.Directory.findOne({ data: { hash: hash } });
  if (!directory) throw 'Balance change not found';

  // copy params to account and save
  Object.assign(directory, params);
  await directory.save();
  return details(directory);
};

const _delete = async (param: any) => {
  const directory = new db.Directory(param);
  await directory.save();
  return details(directory);
};

const getChangeByHash = async (hash: string) => {
  const directory: any = await db.Directory.findOne({ data: { hash: hash } });
  if (!directory) throw 'Balance change not found';
  return details(directory);
};

const details = async (directory: {
  tag: any;
  change: any;
  timestamp: any;
  data: any;
}) => {
  const { tag, change, timestamp, data } = directory;
  return { tag, change, timestamp, data };
};

export default {
  process,
  create,
  update,
  _delete,
  getChangeByHash,
};
