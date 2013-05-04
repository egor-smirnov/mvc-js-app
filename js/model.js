define([
    'class',
    'events',
    'ajax'
], function(Class, Events, Ajax) {

    var Model = new Class();

    Model.include(Events);

    Model.include({

        isNewRecord: true,

        init: function (atts) {

            this.reset();

            atts && this.set(atts);
        },

        reset: function() {

            this._data = {};
            this.length = 0;

            this.emit('reset');
        },

        get: function(key) {

            return this._data[key];
        },

        set: function(key, value) {

            var self = this;

            if(arguments.length == 1 && key === Object(key)) {

                Object.keys(key).forEach(function(index) {

                    self.set(index, key[index]);
                });

                return;
            }

            if(!this._data.hasOwnProperty(key)) {

                ++this.length;
            }

            this._data[key] = value;

            this.emit('add', key, value, this);
        },

        has: function(key) {

            return this._data.hasOwnProperty(key);
        },

        remove: function (key) {

            this._data.hasOwnProperty(key) && this.length--;
            delete this._data[key];

            this.emit('remove', key, undefined, this);
        },

        save: function(afterSuccess) {

            if(!this.RESTurl) {

                afterSuccess();
            }
            else {

                if(this.isNewRecord) {

                    var self = this;

                    this.createRemote(

                        function (response) {

                            if (response.status == 'ok') {

                                self.set(response);

                                afterSuccess();
                            }
                            else {

                                self.errorFunc({

                                    status: response.status,
                                    code: response.code,
                                    msg: response.msg
                                });
                            }
                        },
                        self.errorFunc
                    );
                }
                else {

                    this.updateRemote(

                        function (response) {

                            if (response.status == 'ok') {

                                self.set(response);

                                afterSuccess();
                            }
                            else {

                                self.errorFunc({

                                    status: response.status,
                                    code: response.code,
                                    msg: response.msg
                                });
                            }
                        },
                        self.errorFunc
                    );
                }
            }
        },

        createRemote: function (success, error) {

            Ajax({
                url: this.RESTurl + 'create',
                data: this.toQueryString(),
                type: 'POST',
                success: success,
                error: error
            });
        },

        updateRemote: function (success, error) {

            Ajax({
                url: this.RESTurl + 'update',
                data: this.toQueryString(),
                type: 'POST',
                success: success,
                error: error
            });
        },

        errorFunc: function (response) {

            alert('Sorry, but your action failed. Try again please. Message from server was: ' + response.msg + '.' + (response.code ? ' Response Code: ' + response.code : ''));
            return false;
        },

        useREST: function(url) {

            this.RESTurl = url;
        },

        toJSON: function () {

            return this._data;
        },

        toQueryString: function() {

            var queryString = '';

            for (var key in this._data) {

                queryString = queryString + '&' + key + '=' + this._data[key];
            }

            queryString = encodeURI(queryString.substring(1));

            return queryString;
        }
    });

    return Model;
});