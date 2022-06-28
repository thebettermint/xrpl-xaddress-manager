import Client, { constants } from '@thebettermint/xrpl-tx-parser';
import config from '../config.json';
import walletService from './services/wallet.service';
import balanceService from './services/balance.service';

const main = async () => {
  let api = new Client({
    registry: config[0].registry || undefined,
  });
  let events = constants.wsStatusMessages;

  api.once(events.connected, () => {
    console.log(events.connected);
  });

  api.on(events.tx, (e: any) => {
    balanceService.process(e);
  });

  api.on(events.timeout, () => {
    console.log('timeout');
  });

  api.on(events.reconnect, () => {
    console.log('reconnect');
  });

  api.once(events.closed, () => {
    console.log(events.closed);
  });
};

main();
