
export interface MemoInterface {
    account?:string
    memo_data?:string
    decoded_data?:string
    data_encoding?: string
    memo_format?:string
    decoded_format?:string
    format_encoding?:string
    memo_type?:string
    decoded_type?:string
    type_encoding?:string
    destination?:string
    destination_tag?:Number
    source_tag?:Number
    executed_time?:Number
    ledger_index?:Number
    tx_index?:Number
    memo_index?:Number
    tx_hash?:string
  }