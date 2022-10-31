import { NextFunction, Request, Response } from "express";
import { Wallet } from "../wallet";

const walletController = () => {
    const wallet = Wallet.Instance;
    
    const getBalance = async (req: Request, res: Response, next: NextFunction) => {
        const balance = wallet.getTotalBalance();

        res.json({ balance });
    }

    const getValue = async (req: Request, res: Response, next: NextFunction) => {
        const { symbol } = req.params;
        const value = wallet.getBalance(symbol);

        res.json({ [symbol]: value });
    }

    const buyAmount = async (req: Request, res: Response, next: NextFunction) => {
        const { symbol, amount } = req.body;
        try {
            wallet.buyAmount(symbol, amount);
        } catch (e) {
            const error = e instanceof Error
                ? e.message
                : 'unkwown error';
            return res.status(400).json({ error });
        }
        
        res.json({ [symbol]: wallet.getBalance(symbol) });
    }

    const sellAmount = async (req: Request, res: Response, next: NextFunction) => {
        const { symbol, amount } = req.body;
        try {
            wallet.sellAmount(symbol, amount);
        } catch (e) {
            const error = e instanceof Error
                ? e.message
                : 'unkwown error';
            return res.status(400).json({ error });
        }
        
        res.json({ [symbol]: wallet.getBalance(symbol) });
    }

    return {
        getBalance,
        getValue,
        buyAmount,
        sellAmount
    }
}

export default walletController;
