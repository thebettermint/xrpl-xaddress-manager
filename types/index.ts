export interface ProcessEnvType {
    NODE_ENV: 'development' | 'production';
    PORT?: string;
    API_PORT?: string;
    PWD: string;
}

export interface tempFilterExchange {
    [index: string]:any
    exchange?: string
    active?:boolean
    pairs?: string[] | undefined[]
}