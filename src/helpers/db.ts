import mongoose from 'mongoose';
import { MongoClientOptions } from 'mongodb';
import config from '../../config/config.json';

import wallet_model from '../models/wallet.model';
import balance_model from '../models/balance.model';
import directory_model from '../models/directory.model';

interface ConnectOptions extends MongoClientOptions {
  /** Set to false to [disable buffering](http://mongoosejs.com/docs/faq.html#callback_never_executes) on all models associated with this connection. */
  bufferCommands?: boolean;
  /** The name of the database you want to use. If not provided, Mongoose uses the database name from connection string. */
  dbName?: string;
  /** username for authentication, equivalent to `options.auth.user`. Maintained for backwards compatibility. */
  user?: string;
  /** password for authentication, equivalent to `options.auth.password`. Maintained for backwards compatibility. */
  pass?: string;
  /** Set to false to disable automatic index creation for all models associated with this connection. */
  autoIndex?: boolean;
  /** Set to `true` to make Mongoose automatically call `createCollection()` on every model created on this connection. */
  autoCreate?: boolean;
}

const port = config[0].db.port;
const container = config[0].db.ip;
const uri = `mongodb://${container}:${port}`;

const connectionOptions: ConnectOptions = {
  bufferCommands: true,
  autoIndex: true,
  autoCreate: true,
  user: config[0].db.rootKey || config[0].db.userKey,
  pass: config[0].db.rootSecret || config[0].db.userSecret,
  dbName: config[0].db.name,
};

mongoose.connect(config[0].db.uri || uri, connectionOptions);
mongoose.Promise = global.Promise;

export default {
  Wallet: wallet_model,
  Balance: balance_model,
  Directory: directory_model,
  isValidId,
};

function isValidId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}
