import { GlobalFlags } from 'xrpl/dist/npm/models/transactions/common';
import { NewFields, PreviousFields, FinalFields } from '../common';

export interface PayChanInterface {
  fee?: string;
  flags?: number | GlobalFlags;
  tx_hash?: string;
  tx_type?: string;
  channel?: string;
  signature?: string;
  pubkey?: string;
  settle?: number;
  account?: string;
  source?: string | unknown;
  destination?: string;
  destination_tag?: string;
  source_tag?: string;
  amount?: string;
  balance?: string;
  cancel_after?: string;
  expiration?: string;
  ledger_index?: number;
  time?: number;
}

export interface NodeInterface {
  fields: NewFields | PreviousFields | FinalFields;
}
