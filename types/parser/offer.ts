import { IssuedCurrencyAmount } from "xrpl/dist/npm/models/common"; 

export interface Currency {
    amount?: string
    currency?: string 
    issuer?: string
    value?: string
  }
  
export interface OfferInterface {
    base? : Currency,
    counter? : Currency,
    rate? : any,
    buyer? : Object,
    seller? : string,
    taker? : string,
    provider? : String,
    sequence? : String,
    time? : number,
    tx_type? : string,
    tx_index? : number,
    ledger_index? : number,
    node_index? : number,
    tx_hash? : string,
    autobridged? : Currency
    node_type? : string
    account? : string
    offer_sequence? : string | number
    expiration? : number
    book_directory? : string
    next_offer_sequence? : number
    prev_offer_sequence? : number
    taker_pays? : IssuedCurrencyAmount | Currency
    taker_gets? : IssuedCurrencyAmount | Currency
    pays_change? : string
    gets_change? : string 
    change_type? : string 
    executed_time? : number
  }
  
  