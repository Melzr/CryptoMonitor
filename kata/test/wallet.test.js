const { describe } = require("mocha");

const assert = require("assert");
const { initWallet } = require("../src/wallet");


describe('wallet', function () {
    it('should be not null after initialize it', function(){
        const wallet = initWallet();
        assert.notDeepEqual(wallet, null);
    });

    it('should be empty after initialize it', function(){
        const wallet = initWallet();        
        assert.deepEqual(wallet.isEmpty(), true);
    });

    it('should be not empty after initialize it and add amount of currency', function(){
        const wallet = initWallet();     
        wallet.addAmount(1);   
        assert.deepEqual(wallet.isEmpty(), false);
    });

    it('should be empty again after initialize it and add amount of currency and remove the same amount', function(){
        const wallet = initWallet();     
        wallet.addAmount(1);   
        wallet.reduceAmount(1);   
        assert.deepEqual(wallet.isEmpty(), true);
    });

    it('should not be empty after initialize it and add amount of currency and remove the less amount', function(){
        const wallet = initWallet();
        wallet.addAmount(2);   
        wallet.reduceAmount(1);   
        assert.deepEqual(wallet.isEmpty(), false);
    });

    it('should be zero amount after initialize it', function(){
        const wallet = initWallet();        
        assert.deepEqual(wallet.getAmount(), 0);
    });

    it('should have 1 amount after initialize it and add 2 amount of currency and remove 1 amount', function(){
        const wallet = initWallet();
        wallet.addAmount(2);   
        wallet.reduceAmount(1);   
        assert.deepEqual(wallet.getAmount(), 1);
    });

    it('should not be able to add negative amount', function() {
        const wallet = initWallet();
        wallet.addAmount(-1);
        assert.deepEqual(wallet.getAmount(), 0);
    });

    it('should not be able to reduce negative amount', function() {
        const wallet = initWallet();
        wallet.reduceAmount(-1);
        assert.deepEqual(wallet.getAmount(), 0);
    });

    it('should not be able to reduce more than current balance', function() {
        const wallet = initWallet();
        wallet.reduceAmount(1);
        assert.deepEqual(wallet.getAmount(), 0);
    });

    it('should not sell if not sellAmount set', function() {
        const wallet = initWallet();
        wallet.addAmount(10);
        wallet.sell();
        assert.deepEqual(wallet.getAmount(), 10);
    });

    it('should sell if sellAmount set', function() {
        const wallet = initWallet();
        wallet.addAmount(10);
        wallet.setSellAmount(2);
        wallet.sell();
        assert.deepEqual(wallet.getAmount(), 8);
    });

    it('should not sell if not enough amount', function() {
        const wallet = initWallet();
        wallet.addAmount(5);
        wallet.setSellAmount(10);
        wallet.sell();
        assert.deepEqual(wallet.getAmount(), 5);
    });

    it('should not buy if not sellAmount set', function() {
        const wallet = initWallet();
        wallet.addAmount(10);
        wallet.buy();
        assert.deepEqual(wallet.getAmount(), 10);
    });

    it('should buy if sellAmount set', function() {
        const wallet = initWallet();
        wallet.addAmount(10);
        wallet.setSellAmount(2);
        wallet.buy();
        assert.deepEqual(wallet.getAmount(), 12);
    });
})
