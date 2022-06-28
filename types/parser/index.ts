import { TxResponse } from 'xrpl';
import { TransactionStream } from 'xrpl';
import { TransactionEntryResponse } from 'xrpl';

export type modTxResponse = TxResponse;

export type modTransactionStream = TransactionStream;

export type modTransactionEntryResponse = TransactionEntryResponse;

export type txParserInterface =
  | modTxResponse
  | modTransactionStream
  | modTransactionEntryResponse;
