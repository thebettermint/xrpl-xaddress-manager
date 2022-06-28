export interface PaymentInterface extends Object{
    source?:string
    destination?: string
    source_balance_changes:
      {currency?:string}[]
    destination_balance_changes?:string[]
    currency?:string
    amount?:string
    destination_tag?:number
    source_tag?:number
    invoice_id?:string 
    delivered_amount?:string
    max_amount?:string
    source_currency?:string
    issuer?:string
    fee?:string
    ledger_index?:Number
    tx_index?:Number
    time?:Number
    tx_hash?:string
    client?:string
  }