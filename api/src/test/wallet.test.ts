import { describe, it } from "mocha";
import assert from "assert";

class Wallet {
    balance: number;

    constructor() {
        this.balance = 0;
    }

    isEmpty() {
        return this.balance === 0;
    }

    buyAmount(amount: number) {
        this.balance += amount;
    }

    sellAmount(amount: number) {
        this.balance -= amount;
    }
}

describe('wallet', function () {
    it('should be not null after initialize it', function(){
        const wallet = new Wallet();
        assert.notDeepEqual(wallet, null);
    });

    it('should be empty after initialize it', function(){
        const wallet = new Wallet();        
        assert.deepEqual(wallet.isEmpty(), true);
    });

    it('should be not empty after initialize it and add amount of currency', function(){
        const wallet = new Wallet();     
        wallet.buyAmount(1);   
        assert.deepEqual(wallet.isEmpty(), false);
    });

    it('should be empty again after initialize it and add amount of currency and remove the same amount', function(){
        const wallet = new Wallet();  
        wallet.buyAmount(1);
        wallet.sellAmount(1);   
        assert.deepEqual(wallet.isEmpty(), true);
    });
})
