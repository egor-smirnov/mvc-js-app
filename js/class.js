define(function() {

    var Class = function(includeObj, extendObj) {

        var _class = function() {

            this.init.apply(this, arguments);
        };

        _class.prototype.init = function(){};

        _class.include = function (obj) {

            for (var i in obj) {
                _class.prototype[i] = obj[i];
            }
        };

        _class.extend = function (obj) {

            for (var i in obj) {
                _class[i] = obj[i];
            }
        };

        _class.proxy = _class.prototype.proxy = function (func) {

            var self = this;

            return(function () {
                return func.apply(self, arguments);
            });
        };

        if (includeObj) {
            _class.include(includeObj);
        }

        if (extendObj) {
            _class.extend(extendObj);
        }

        return _class;
    };

    return Class;

});