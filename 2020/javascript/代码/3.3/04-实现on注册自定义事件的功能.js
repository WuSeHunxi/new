jQuery.prototype.on = function (type, handle) {
    for (var i = 0; i < this.length; i++) {
        if (!this[i].cacheEvent) {
            this[i].cacheEvent = {};
        }
        if (!this[i].cacheEvent[type]) {                        
            this[i].cacheEvent[type] = [handle];
        }else {
            this[i].cacheEvent[type].push(handle);
        }
    }

}

jQuery.prototype.trigger = function (type) {
    var params = arguments.length > 1 ? [].slice.call(arguments, 1) : [];
    var self = this;
    for (var i = 0; i < this.length; i++) {
        if( this[i].cacheEvent[type] ) {                        
            this[i].cacheEvent[type].forEach(function (ele, index) {
                ele.apply(self, params);
            });
        }
    }
}
