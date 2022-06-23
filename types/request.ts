export interface Request {
    "type": string,
    "apikey": string,
    "heartbeat": boolean,
    "subscribe_data_type": string[],
    "subscribe_filter_symbol_id": string[]
}

export interface GrossPriceArrayType {
    price: number
    amount: number
    weight:number
}

export interface PriceArrayType {
    price: number,
    amount: number
}