declare global {
    namespace NodeJS {
      export interface ProcessEnv {
        API_PORT: string;
        OKEX_KEY: string;
        OKEX_SECRET: string;
        OKEX_PASS: string;
        XAPP_SECRET:string;
        API_KEY:string;
        API_SECRET:string
      }
    }
  }


interface UserPayload {
  id: string
  email: string
  role:string
  ownsToken: (token: any) => boolean
}

declare global {
  namespace Express {
    export interface Request {
      xummAuthHeaders: any 
      user:UserPayload
    }
  }
} 

export {}