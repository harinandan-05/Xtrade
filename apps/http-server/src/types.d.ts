import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: string ;
    }
  }
}

export interface PriceData {
      high:number | any,
      close:number| any,
      open:number | any,
      low:number  |any
}

