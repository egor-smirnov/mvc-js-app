define([
    'class',
    'events'
], function(Class, Events) {

    var Collection = new Class();

    Collection.include(Events);

    Collection.include({

        init: function (models) {

            this.reset();

            models && this.add(models);
        },

        reset: function() {

            this._items = [];
            this.length = 0;

            this.emit('reset');
        },

        add: function(model, at) {

            var self = this;

            if(Array.isArray(model)) {

                model.forEach(function(m) {
                    self.add(m, at);
                });

                return;
            }

            this._items.splice(at || this._items.length, 0, model);
            this.length = this._items.length;

            this.emit('add', model, this);
        },

        remove: function(model) {

            var index = this._items.indexOf(model);

            if(index < -1) {
                this._items.splice(index, 1);
                this.length = this._items.length;
                this.emit('remove', model, this);
            }
        },

        at: function(index) {

            return this._items[index];
        },

        all: function() {

           return this._items;
        }
    });

    return Collection;
});