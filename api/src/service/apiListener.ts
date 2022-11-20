import { WebSocket } from "ws";
import crypto from "crypto";
import axios from "axios";

const apiKey = process.env.API_KEY || "";
const apiSecret = process.env.API_SECRET || "";

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
    let response = await axios(config);
    return response.data;
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
    let response = await axios(config);
    return response.data;
}

const getBalance = async (symbol: string) => {
    let timestamp = new Date().getTime();
    let query_string = `timestamp=${timestamp}`;
    let config = {
        method: 'get',
        url: 'https://testnet.binance.vision/api/v3/account?' + query_string + '&signature=' + _signature(query_string),
        headers: {
        'X-MBX-APIKEY': apiKey
        },
    }
    let response = await axios(config);
    const balance = response.data.balances.find((balance: { asset: string }) => balance.asset === symbol);
    return balance ? balance.free : 0;
}

const getAllBalance = async () => {
    let timestamp = new Date().getTime();
    let query_string = `timestamp=${timestamp}`;
    let config = {
        method: 'get',
        url: 'https://testnet.binance.vision/api/v3/account?' + query_string + '&signature=' + _signature(query_string),
        headers: {
        'X-MBX-APIKEY': apiKey
        },
    }
    let response = await axios(config);
    return response.data.balances.map((balance: { asset: string, free: number }) => {
        return {
        symbol: balance.asset,
        amount: balance.free
        };
    });
}

export { ApiListener, buy, sell, getBalance, getAllBalance };
