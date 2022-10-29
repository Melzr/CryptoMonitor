import { describe, it } from "mocha";
import assert from "assert";
import { DataManager } from "../dataManager";


describe('dataManager', function () {
    it('should be able to insert a value', function () {
        DataManager.Instance.insertData('BTC/USDT', 100, Math.floor((new Date().getTime() / 1000)));
        assert.equal(DataManager.Instance.getLastValue('BTC/USDT')?.value, 100);

    });
    
    it('should be able to get data', function () {
        DataManager.Instance.insertData('BTC/USDT', 100, Math.floor((new Date().getTime() / 1000)-100));
        DataManager.Instance.getData('BTC/USDT', 100, 100);
        assert.equal(DataManager.Instance.getLastValue('BTC/USDT')?.value, 100);
    });

    it('should be able to get last value', function () {
        DataManager.Instance.insertData('BTC/USDT', 250, Math.floor((new Date().getTime() / 1000)));
        assert.deepEqual(DataManager.Instance.getLastValue('BTC/USDT')?.value, 250);
    });

    it('should be able to monitor two or more symbols', function () {
        DataManager.Instance.insertData('BTC/USDT', 200, Math.floor((new Date().getTime() / 1000)));
        DataManager.Instance.insertData('ETH/USDT', 300, Math.floor((new Date().getTime() / 1000)));
        assert.equal(DataManager.Instance.getLastValue('BTC/USDT')?.value, 200);
        assert.equal(DataManager.Instance.getLastValue('ETH/USDT')?.value, 300);
    });

    it('last value of unknown symbol should be null', function () {
        assert.equal(DataManager.Instance.getLastValue('DOGE/USDT'), null);
    });
});

