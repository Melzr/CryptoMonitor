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
        if (amount < 0) {
            throw new Error("Amount must be positive");
        }
        this.balance += amount;
    }

    sellAmount(amount: number) {
        if (amount < 0) {
            throw new Error("Amount must be positive");
        }
        if (amount > this.balance) {
            throw new Error("Amount must be lower than balance");
        }
        this.balance -= amount;
    }

    getBalance() {
        return this.balance;
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

    it('should not be empty after initialize it and add amount of currency and remove the less amount', function(){
        const wallet = new Wallet();
        wallet.buyAmount(2);   
        wallet.sellAmount(1);   
        assert.deepEqual(wallet.isEmpty(), false);
    });

    it('should be zero amount after initialize it', function(){
        const wallet = new Wallet();        
        assert.deepEqual(wallet.getBalance(), 0);
    });

    it('should have 1 amount after initialize it and add 2 amount of currency and remove 1 amount', function(){
        const wallet = new Wallet();
        wallet.buyAmount(2);   
        wallet.sellAmount(1);   
        assert.deepEqual(wallet.getBalance(), 1);
    });

    it('should not be able to add negative amount', function() {
        const wallet = new Wallet();
        assert.throws(
            () => wallet.buyAmount(-1),
            Error
        );
        assert.deepEqual(wallet.getBalance(), 0);
    });

    it('should not be able to sell negative amount', function() {
        const wallet = new Wallet();
        assert.throws(
            () => wallet.sellAmount(-1),
            Error
        );
        assert.deepEqual(wallet.getBalance(), 0);
    });

    it('should not be able to sell more than current balance', function() {
        const wallet = new Wallet();
        assert.throws(
            () => wallet.sellAmount(1),
            Error
        );
        assert.deepEqual(wallet.getBalance(), 0);
    });
})
