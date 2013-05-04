define(function() {

    var makeArray = function (args) {

        return Array.prototype.slice.call(args, 0);
    };

    var Events = {

        on: function (ev, callback) {

            var evs = ev.split(" ");

            this._callbacks || (this._callbacks = {});

            for (var i = 0; i < evs.length; i++) {

                (this._callbacks[evs[i]] || (this._callbacks[evs[i]] = [])).push(callback);
            }

            return this;
        },

        off: function (ev, callback) {

            if (!ev) {
                this._callbacks = {};
                return this;
            }

            var list, calls, i, l;

            if (!(calls = this._callbacks)) return this;
            if (!(list = this._callbacks[ev])) return this;

            for (i = 0, l = list.length; i < l; i++) {
                if (callback === list[i]) {
                    list.splice(i, 1);
                    break;
                }
            }

            this._callbacks = list;

            return this;
        },

        emit: function () {

            var args = makeArray(arguments);
            var ev = args.shift();

            var list, calls, i, l;

            if (!(calls = this._callbacks)) return this;
            if (!(list = this._callbacks[ev])) return this;

            for (i = 0, l = list.length; i < l; i++) {
                if (list[i].apply(this, args) === false) {
                    return false;
                }
            }

            return this;
        }
    };

    return Events;
});