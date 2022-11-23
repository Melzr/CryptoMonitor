import { describe, it } from "mocha";
import assert from "assert";
import { DataManager } from "../service/dataManager";


describe('dataManager', function () {
    it('should be not null after initialize it', function(){
        const dataManager = DataManager.Instance;
        assert.notDeepEqual(dataManager, null);
    });

    it('should be able to insert a value', function () {
        DataManager.Instance.insertData('BTC/USDT', 100, Math.floor((new Date().getTime() / 1000)));
        assert.equal(DataManager.Instance.getLastValue('BTC/USDT'), 100);

    });
    
    it('should be able to get data', function () {
        DataManager.Instance.insertData('BTC/USDT', 100, Math.floor((new Date().getTime() / 1000)-100));
        DataManager.Instance.getData('BTC/USDT', 100, 100);
        assert.equal(DataManager.Instance.getLastValue('BTC/USDT'), 100);
    });

    it('should be able to get last value', function () {
        DataManager.Instance.insertData('BTC/USDT', 250, Math.floor((new Date().getTime() / 1000)));
        assert.deepEqual(DataManager.Instance.getLastValue('BTC/USDT'), 250);
    });

    it('should be able to monitor two or more symbols', function () {
        DataManager.Instance.insertData('BTC/USDT', 200, Math.floor((new Date().getTime() / 1000)));
        DataManager.Instance.insertData('ETH/USDT', 300, Math.floor((new Date().getTime() / 1000)));
        assert.equal(DataManager.Instance.getLastValue('BTC/USDT'), 200);
        assert.equal(DataManager.Instance.getLastValue('ETH/USDT'), 300);
    });

    it('should be able to get data from a specific time', function () {
        DataManager.Instance.insertData('ADA/USDT', 200, Math.floor(((new Date().getTime() / 1000) - 10)));
        DataManager.Instance.insertData('ADA/USDT', 300, Math.floor((new Date().getTime() / 1000)));
        assert.deepEqual(DataManager.Instance.getData('ADA/USDT', 3600, 0), [200, 300]);
    });

    it('last value of unknown symbol should be null', function () {
        assert.equal(DataManager.Instance.getLastValue('DOGE/USDT'), null);
    });
});

