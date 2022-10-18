const assert = require("assert");
const { initMonitor } = require("../src/monitor");

describe("monitor", function(){
    it ("should return a monitor when the monitor is initialized", function(){
        const monitor = initMonitor();
        assert.notDeepEqual(monitor, null);
    })

    it ("should return false as hasValue if the monitor has not values yet", function(){
        const monitor = initMonitor();        
        assert.deepEqual(monitor.hasValue(), false);
    })

    it ("should return false as hasValue if the monitor has not values yet", function(){
        const monitor = initMonitor();        
        monitor.addNewValue(19000);
        assert.deepEqual(monitor.hasValue(), true);
    })

    it ("should return 19000 as current value if the monitor has 19000 as unique value", function(){
        const monitor = initMonitor();        
        monitor.addNewValue(19000);
        assert.deepEqual(monitor.getCurrentValue(), 19000);
    })

    it ("should return 19001 as current value if the monitor has 19001 as unique value", function(){
        const monitor = initMonitor();        
        monitor.addNewValue(19001);
        assert.deepEqual(monitor.getCurrentValue(), 19001);
    })


    it ("should return 19001 as current value if the monitor has 19000 as first value then 19001", function(){
        const monitor = initMonitor();        
        monitor.addNewValue(19000);
        monitor.addNewValue(19001);
        assert.deepEqual(monitor.getCurrentValue(), 19001);
    })

    it ("should not add negative value", function(){
        const monitor = initMonitor();        
        monitor.addNewValue(100);
        monitor.addNewValue(-1);
        assert.deepEqual(monitor.getCurrentValue(), 100);
    })

    it ("should not call price drop callback on first value registered", function(){
        const monitor = initMonitor();
        let callbackCalled = false;
        monitor.setOnPriceDrop(() => {
            callbackCalled = true;
        });
        monitor.addNewValue(100);
        assert.deepEqual(callbackCalled, false);
    })

    it ("should call price drop callback when value drops 5% of maximum amount", function(){
        const monitor = initMonitor();
        let callbackCalled = false;
        monitor.setOnPriceDrop(() => {
            callbackCalled = true;
        });
        monitor.addNewValue(100);
        monitor.addNewValue(95);
        assert.deepEqual(callbackCalled, true);
    })

    it ("should not call price drop callback when value drops less than 5% of maximum amount", function(){
        const monitor = initMonitor();
        let callbackCalled = false;
        monitor.setOnPriceDrop(() => {
            callbackCalled = true;
        });
        monitor.addNewValue(100);
        monitor.addNewValue(96);
        assert.deepEqual(callbackCalled, true);
    })

    it ("should not call price drop callback when value increases 5% of maximum amount", function(){
        const monitor = initMonitor();
        let callbackCalled = false;
        monitor.setOnPriceDrop(() => {
            callbackCalled = true;
        });
        monitor.addNewValue(100);
        monitor.addNewValue(105);
        assert.deepEqual(callbackCalled, false);
    })

    it ("should not call price increase callback on first value registered", function(){
        const monitor = initMonitor();
        let callbackCalled = false;
        monitor.setOnPriceIncrease(() => {
            callbackCalled = true;
        });
        monitor.addNewValue(100);
        assert.deepEqual(callbackCalled, false);
    })

    it ("should call price increase callback when value increases 5% of minimum amount", function(){
        const monitor = initMonitor();
        let callbackCalled = false;
        monitor.setOnPriceIncrease(() => {
            callbackCalled = true;
        });
        monitor.addNewValue(100);
        monitor.addNewValue(105);
        assert.deepEqual(callbackCalled, true);
    })

    it ("should not call price drop callback when value increases less than 5% of minimum amount", function(){
        const monitor = initMonitor();
        let callbackCalled = false;
        monitor.setOnPriceIncrease(() => {
            callbackCalled = true;
        });
        monitor.addNewValue(100);
        monitor.addNewValue(104);
        assert.deepEqual(callbackCalled, false);
    })

    it ("should not call price increase callback when value decreases 5% of minimum amount", function(){
        const monitor = initMonitor();
        let callbackCalled = false;
        monitor.setOnPriceIncrease(() => {
            callbackCalled = true;
        });
        monitor.addNewValue(100);
        monitor.addNewValue(95);
        assert.deepEqual(callbackCalled, false);
    })
})