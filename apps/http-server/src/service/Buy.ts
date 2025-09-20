import { prismaClient } from "@repo/database/client";
import { getPrice } from "../trade.api/checkPrice";
import { PriceData } from "../types";

export async function BuyStock(
  symbol: string,
  quantity: number,
  userid: string
) {
  const price:PriceData = await getPrice(symbol);

  return prismaClient.$transaction(async (tx) => {
    const user = await tx.user.findUnique({
      where: {
        id: userid,
      },
      select: {
        balance: true,
      },
    });
    if (!user) {
      throw new Error("user not found");
    }

    const cost = price.close * quantity;

    const currentbalance = user.balance.toNumber();

    if (currentbalance < cost) {
      throw new Error("insufficient balance to make the trade");
    }

    await tx.user.update({
      where: {
        id: userid,
      },
      data: {
        balance: currentbalance - cost,
      },
    });

    await tx.trade.create({
      data: {
        userId: userid,
        symbol: symbol,
        side: "BUY",
        price: price.close,
        quantity: quantity,
      },
    });

    const portfolio = await tx.position.findUnique({
      where: {
        userId_symbol: {
          userId: userid,
          symbol: symbol,
        },
      },
    });
    if (!portfolio) {
      await tx.position.create({
        data: {
          userId: userid,
          symbol: symbol,
          quantity: quantity,
          avgPrice: price.close,
        },
      });
    } else {
      const newQuantity = portfolio.quantity + quantity;
      const newAvg =
        (portfolio.avgPrice.toNumber() * portfolio.quantity +
          price.close * quantity) /
        newQuantity;
      await tx.position.update({
        where: {
          userId_symbol: {
            userId: userid,
            symbol: symbol,
          },
        },
        data: {
          quantity: newQuantity,
          avgPrice: newAvg,
        },
      });
    }
    return { success: true, symbol, quantity, price };
  });
}
