import { prismaClient } from "@repo/database/client";
import { getPrice } from "../trade.api/checkPrice";
import { PriceData } from "../types";

export async function SellStock(symbol: string, quantity: number, userid: string) {
  const price:PriceData = await getPrice(symbol);

  return prismaClient.$transaction(async (tx) => {
    const user = await tx.user.findUnique({
      where: { id: userid },
      select: { balance: true },
    });

    if (!user) {
      throw new Error("user doesnt exist");
    }

    const position = await tx.position.findUnique({
      where: { userId_symbol: { userId: userid, symbol } },
      select: { quantity: true },
    });

    if (!position) {
      throw new Error("no stocks for this symbol");
    }

    if (position.quantity < quantity) {
      throw new Error("not enough stocks");
    }

    const cost = price.close * quantity;

    await tx.user.update({
      where: { id: userid },
      data: { balance: { increment: cost } },
    });

    await tx.position.update({
      where: { userId_symbol: { userId: userid, symbol } },
      data: { quantity: { decrement: quantity } },
    });

    await tx.trade.create({
      data: {
        userId: userid,
        symbol,
        side: "SELL",
        price:price.close,
        quantity,
      },
    });

    const remainingStock = await tx.position.findUnique({
      where: { userId_symbol: { userId: userid, symbol } },
      select: { quantity: true },
    });

    return { success: true, quantity, price, remainingStock };
  });
}
