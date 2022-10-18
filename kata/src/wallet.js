const initWallet = () => {
    return {
        amount : 0,
        sellAmount : undefined,
        isEmpty : function(){
            return this.amount==0;
        },
        addAmount : function(value){
            if(value>0){
                this.amount += value;
            }
        },
        reduceAmount : function(value){
            if(value> 0 && value <= this.amount){
                this.amount -= value;
            }
        },
        getAmount : function(){
            return this.amount;
        },
        setSellAmount : function(value){
            this.sellAmount = value;
        },
        sell : function(){
            this.reduceAmount(this.sellAmount);
        },
        buy : function(){
            this.addAmount(this.sellAmount);
        }
    };
}

module.exports.initWallet = initWallet;
