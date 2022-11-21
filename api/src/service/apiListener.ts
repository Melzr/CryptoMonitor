import { WebSocket } from "ws";
import crypto from "crypto";
import axios, { Axios, AxiosError } from "axios";

const apiSecret = 'hgJJM0BJ3JeMpr5FPmJDL3r88nn0wMNEA7kQYvQ4nLJzug1YMmy4E6QZb0y6pow9';
const apiKey = 'YA0C7YXHvOpwvjD1s559rI3FLZN6RDYvo45sQ7gxrkbcYu0DZF2VlddYKuf0Mjmh';

class ApiListener {
    private _webSocket: WebSocket | null = null;

    public constructor(
        onNewValue: (symbol: any, price: number, time: number) => void
    ) {
        const ws = new WebSocket("wss://testnet.binance.vision/ws");
        ws.on("open", function open() {
        console.log("Conectado con Binance WebSocket API");
        ws.send(`{"method":"SUBSCRIBE","params":["btcusdt@trade"],"id":1}`); //testing
        ws.send(`{"method":"SUBSCRIBE","params":["ethusdt@trade"],"id":1}`); //testing
        });

        ws.on("message", (data) => {
        if (data) {
            const trade = JSON.parse(data.toString());
            if (trade.e !== "trade") return;
            const { s: symbol, p: price } = trade;
            const time = Math.floor(new Date().getTime() / 1000);
            onNewValue(symbol, price, time);
        }
        });

        ws.on("error", (error) => {
        console.log("Error: " + error);
        });
    }

    public suscribe(symbol: string) {
        this._webSocket?.send( `{"method":"SUBSCRIBE","params":["${symbol}@trade"],"id":1}`);
    }

    public unsuscribe(symbol: string) {
        this._webSocket?.send(`{"method":"UNSUBSCRIBE","params":["${symbol}@trade"],"id":1}`);
    }

    public close() {
        this._webSocket?.close();
    }
}

const _signature = (query_string: string) => {
    return crypto
        .createHmac("sha256", apiSecret)
        .update(query_string)
        .digest("hex");
}

const buy = async (symbol: string, quantity: number) => {
    let timestamp = new Date().getTime();
    let query_string = `quantity=${quantity}&symbol=${symbol}&side=BUY&type=MARKET&timestamp=${timestamp}`;
    let config = {
        method: 'post',
        url: 'https://testnet.binance.vision/api/v3/order?' + query_string + '&signature=' + _signature(query_string),
        headers: {
        'X-MBX-APIKEY': apiKey
        },
    }
    try {
        let response = await axios(config);
        return response.data;
    } catch (error) {
        const err = error as AxiosError<{ msg: string }>
        let msg = err.response?.data.msg;
        if (msg) {
            throw new Error(msg);
        } else {
            throw error;
        }
    }
}

const sell = async (symbol: string, quantity: number) => {
    let timestamp = new Date().getTime();
    let query_string = `quantity=${quantity}&symbol=${symbol}&side=SELL&type=MARKET&timestamp=${timestamp}`;
    let config = {
        method: 'post',
        url: 'https://testnet.binance.vision/api/v3/order?' + query_string + '&signature=' + _signature(query_string),
        headers: {
        'X-MBX-APIKEY': apiKey
        },
    }
    try {
        let response = await axios(config);
        return response.data;
    } catch (error) {
        const err = error as AxiosError<{ msg: string }>
        let msg = err.response?.data.msg;
        if (msg) {
            throw new Error(msg);
        } else {
            throw error;
        }
    }
}

const getBalance = async (symbol: string) => {
    const allBalance = await getAllBalance();
    const balance = allBalance.find((balance) => balance.symbol === symbol);
    return balance ? balance.amount : 0;
}

const getAllBalance = async (): Promise<[{symbol: string, amount: number}]> => {
    let timestamp = new Date().getTime();
    let query_string = `timestamp=${timestamp}`;
    let config = {
        method: 'get',
        url: 'https://testnet.binance.vision/api/v3/account?' + query_string + '&signature=' + _signature(query_string),
        headers: {
        'X-MBX-APIKEY': apiKey
        },
    }
    try {
        let response = await axios(config);
        return response.data.balances.map((balance: { asset: string, free: string}) => {
            return {
                symbol: balance.asset,
                amount: parseFloat(balance.free)
            };
        });
    } catch (error) {
        const err = error as AxiosError<{ msg: string }>
        let msg = err.response?.data.msg;
        if (msg) {
            throw new Error(msg);
        } else {
            throw error;
        }
    }
}

const getSymbolValue = async (symbol: string): Promise<number> => {
    let query_string = `symbol=${symbol}`;
    let config = {
      method: 'get',
      url: 'https://testnet.binance.vision/api/v3/ticker/price?' + query_string,
      headers: {
        'X-MBX-APIKEY': apiKey
      },
    }
    try {
        let response = await axios(config);
        return parseFloat(response.data.price);
    } catch (error) {
        const err = error as AxiosError<{ msg: string }>
        let msg = err.response?.data.msg;
        if (msg) {
            throw new Error(msg);
        } else {
            throw error;
        }
    }
  };

export { ApiListener, buy, sell, getBalance, getAllBalance, getSymbolValue };
