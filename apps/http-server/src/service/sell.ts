import { prismaClient } from "@repo/database/client";
import { getPrice } from "../trade.api/checkPrice";

export async function BuyStock(symbol:string,quantity:number,userid:string){

    const price:number = await getPrice(symbol)


    return prismaClient.$transaction(async(tx) =>{
        const user = await tx.user.findUnique({
            where:{
                id:userid
            },
            select:{
                balance:true
            }
        })
        if(!user){throw new Error("user not found")}

        const cost = price * quantity

        const currentbalance  = user.balance.toNumber()

        if(currentbalance< cost){
            throw new Error("insufficient balance to make the trade")
        }
        
        await tx.user.update({
            where:{
                id:userid
            },
            data:{
                balance: currentbalance - cost
            }
        })


        await tx.trade.create({
            data: { userId:userid, symbol:symbol, side:"BUY", price:price, quantity:quantity }
        })

        const portfolio = await tx.position.findUnique({
            where:{
                userId:userid
            }
        })
        if(!portfolio){
            await tx.position.create({
                data:{
                    userId:userid,symbol:symbol,quantity:quantity,avgPrice:price
                }
            })
        }
        else{
            const newQuantity = portfolio.quantity + quantity
            const newAvg = (portfolio.avgPrice.toNumber() * portfolio.quantity + price *quantity) / newQuantity
            await tx.position.update({
                where:{
                    userId:userid
                },
                data:{
                    symbol:symbol,
                    quantity:newQuantity,
                    avgPrice:newAvg
                }
            })
        }

        return { success: true, symbol, quantity, price };  
    })
}