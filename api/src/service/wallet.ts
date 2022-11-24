import { symbol } from "joi";
import { buy, getAllBalance, getSymbolBalance, sell } from "./apiListener";

const buyAmount = async (symbol: string, amount: number) => {
    return buy(symbol, amount);
}

const sellAmount = async (symbol: string, amount: number) => {
    return sell(symbol, amount);
}

const getBalance = async (symbol: string): Promise<number> => {
    return getSymbolBalance(symbol);
}

const getTotalBalance = async (): Promise<[{ symbol: string; amount: number }]> => {
    return getAllBalance();
}

export { buyAmount, sellAmount, getBalance, getTotalBalance };