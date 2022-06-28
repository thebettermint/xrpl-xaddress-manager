import { GlobalFlags } from 'xrpl/dist/npm/models/transactions/common';

export interface EscrowInterface {
    fee?:string
    flags?:GlobalFlags
    ledger_index?:Number
    tx_index?:string
    time?:Number
    tx_hash?:string
    tx_type?:string
    client?:string
    amount?:string
    account?:string
    owner?:string
    destination?:string | unknown
    destination_tag?:string | unknown
    source_tag?:string | unknown
    create_tx_seq?:Number
    create_tx?: string | Number | unknown
    condition?:string
    fulfillment?:string
    cancel_after?:Number
    finish_after?:Number
  }