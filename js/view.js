define([
    'class',
    'events',
    'dom',
    'model'
], function(Class, Events, $, Model) {

    var View = new Class();

    View.include(Events);

    View.include({

        init: function(params) {

            this.template = params.template || '';
            this.useTag = params.useTag || 'div';

            this.error = params.error || function(error) {

                console.log('Error with code ' + error + ' occured!');
            };

            this.events = params.events || {};

            this.render = params.render || function() {

                if (this.model instanceof Model) {

                    return this.compileTemplate(this.model.toJSON());
                }

                return this.compileTemplate({});
            };

            for(var key in params) {

                var notUserDefinedMethods = ['template', 'useTag', 'error', 'events', 'render'];

                var index = notUserDefinedMethods.indexOf(key);

                if(index <= -1) {

                    this[key] = params[key];
                }
            }

            this.bindUserDefinedEvents();
            this.bindModelEvents();
        },

        useModel: function (model) {

            this.model = model;
        },

        bindUserDefinedEvents: function () {

            for (var key in this.events) {

                var methodName = this.events[key];
                var method = this.proxy(this[methodName]);

                var match = key.match(/^(\w+)\s*(.*)$/);
                var eventName = match[1], selector = match[2];

                $(selector).on(eventName, method);
            }
        },

        bindModelEvents: function () {

            if(this.model instanceof Model) {

                this.model.on('add', this.render());
            }
        },

        compileTemplate: function (data) {

            var templateText = this.template.html();

            return (this.useTag !== '' ? '<' + this.useTag + '>' : '') + templateText.replace(/{([^{}]*)}/g,
                function (a, b) {
                    var r = data[b];
                    return typeof r === 'string' || typeof r === 'number' ? r : a;
                }
            ) + (this.useTag !== '' ? '</' + this.useTag + '>' : '');
        }
    });

    return View;
});