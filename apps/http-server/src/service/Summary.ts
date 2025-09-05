import { prismaClient } from "@repo/database/client";
import { getSummary } from "../trade.api/History";

export async function GetHistory(symbol:string,userid:string) {
    const history = await getSummary(symbol)
    console.log("at the summary")
      const check = await prismaClient.user.findUnique({
        where:{
          id:userid
        }
      })
      if(!check){
        return
      }

    return history
}