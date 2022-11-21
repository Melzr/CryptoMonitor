import { NextFunction, Request, Response } from "express";
import { getSymbolValue } from "../service/apiListener";
import { Wallet } from "../service/wallet";

const walletController = () => {
    const wallet = Wallet.Instance;
    
    const getBalance = async (req: Request, res: Response, next: NextFunction) => {
        const balance = await wallet.getTotalBalance();
        const response = await Promise.all(balance.map(async (b) => {
            try {
                const value = (b.symbol === "USDT" || b.symbol === "BUSD") ? 1 : await getSymbolValue(b.symbol + 'USDT');
                return {
                    symbol: b.symbol,
                    amount: b.amount,
                    value: value
                };
            } catch {
                return {
                    symbol: b.symbol,
                    amount: b.amount,
                    value: 0
                };
            }
        }));
        res.json(response);
    }

    const getValue = async (req: Request, res: Response, next: NextFunction) => {
        const { symbol } = req.params;
        const amount = await wallet.getBalance(symbol);
        const price = await getSymbolValue(symbol + 'USDT');
        res.json({ symbol, amount, price });
    }

    const buyAmount = async (req: Request, res: Response, next: NextFunction) => {
        const { symbol, amount } = req.body;
        try {
            await wallet.buyAmount(symbol + 'USDT', amount);
            const newAmount = await wallet.getBalance(symbol);
            res.json({ symbol, amount: newAmount });
        } catch (e) {
            const error = e instanceof Error
                ? e.message
                : 'unkwown error';
            return res.status(400).json({ error });
        }
    }

    const sellAmount = async (req: Request, res: Response, next: NextFunction) => {
        const { symbol, amount } = req.body;
        try {
            await wallet.sellAmount(symbol + 'USDT', amount);
            const newAmount = await wallet.getBalance(symbol);
            res.json({ symbol, amount: newAmount });
        } catch (e) {
            const error = e instanceof Error
                ? e.message
                : 'unkwown error';
            return res.status(400).json({ error });
        }
    }

    return {
        getBalance,
        getValue,
        buyAmount,
        sellAmount
    }
}

export default walletController;
