const initMonitor = () => {
    return {
        currentValue: undefined,
        max: undefined,
        min: undefined,
        onPriceDrop: undefined,
        onPriceIncrease: undefined,
        hasValue : function() {
            return this.currentValue !== undefined;
        },
        monitorMax : function(value) {
            if(this.max === undefined || value > this.max) {
                this.max = value;
            }
        },
        monitorMin : function(value) {
            if(this.min === undefined || value < this.min) {
                this.min = value;
            }
        },
        monitorPriceIncrease : function(value) {
            if (value - this.currentValue > 0 &&  value - this.currentValue >= this.min * 0.05) {
                if (this.onPriceIncrease !== undefined) {
                    this.onPriceIncrease();
                }
            }
        },
        monitorPriceDecrease : function(value) {
            if (this.currentValue - value > 0 && this.currentValue - value < this.max*0.95) {
                if (this.onPriceDrop !== undefined) {
                    this.onPriceDrop();
                }
            }
        },
        addNewValue : function(value) {
            if (value >= 0) {
                this.monitorMax(value);
                this.monitorMin(value);
                this.monitorPriceIncrease(value);
                this.monitorPriceDecrease(value);
                this.currentValue = value;
            }
        },
        getCurrentValue : function() {
            return this.currentValue;
        },
        setOnPriceDrop : function(callback) {
            this.onPriceDrop = callback;
        },
        setOnPriceIncrease : function(callback) {
            this.onPriceIncrease = callback;
        }
    };
}

module.exports.initMonitor = initMonitor;
