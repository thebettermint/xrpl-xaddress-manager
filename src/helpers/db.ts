import mongoose from 'mongoose';
import { MongoClientOptions } from 'mongodb';
import env from '../helpers/env';

import wallet_model from '../models/wallet.model';

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

const port = env['DB_PORT'];
const container = env['DB_IP_ADDRESS'];
const uri = `mongodb://${container}:${port}`;

const connectionOptions: ConnectOptions = {
  bufferCommands: true,
  autoIndex: true,
  autoCreate: true,
  user: env['DB_ROOT_KEY'],
  pass: env['DB_ROOT_SECRET'],
  dbName: env['DB_NAME'],
};

mongoose.connect(env['MONGODB_URI'] || uri, connectionOptions);
mongoose.Promise = global.Promise;

export default {
  Wallet: wallet_model,
  isValidId,
};

function isValidId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}
