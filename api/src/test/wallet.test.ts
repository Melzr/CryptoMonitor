import { describe, it } from "mocha";
import assert from "assert";
import { Wallet } from "../wallet";

describe('wallet', function () {
    const wallet = Wallet.Instance;

    it('should be not null after initialize it', function(){
        assert.notDeepEqual(wallet, null);
    });

    it('should be zero amount after initialize it', function(){
        assert.deepEqual(wallet.getBalance('ETH'), 0);
    });

    it('should have 1 amount after initialize it and add 2 amount of currency and remove 1 amount', function(){
        wallet.buyAmount('USDT', 2);   
        wallet.sellAmount('USDT', 1);   
        assert.deepEqual(wallet.getBalance('USDT'), 1);
    });

    it('should not be able to add negative amount', function() {
        assert.throws(
            () => wallet.buyAmount('BTC', -1),
            Error
        );
        assert.deepEqual(wallet.getBalance('BTC'), 0);
    });

    it('should not be able to sell negative amount', function() {
        assert.throws(
            () => wallet.sellAmount('ADA', -1),
            Error
        );
        assert.deepEqual(wallet.getBalance('ADA'), 0);
    });

    it('should not be able to sell more than current balance', function() {
        assert.throws(
            () => wallet.sellAmount('DOGE', 1),
            Error
        );
        assert.deepEqual(wallet.getBalance('DOGE'), 0);
    });
})
