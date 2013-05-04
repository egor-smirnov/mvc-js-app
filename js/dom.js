define(function() {

    var $ = function(selector) {

        function DomElements(els) {

            for (var i = 0; i < els.length; i++) {
                this[i] = els[i];
            }

            this.length = els.length;
        }

        DomElements.prototype.text = function (text) { // works like jQuery 'text'

            if (typeof text !== "undefined") {

                return this.each(function (el) {
                    el.innerText = text;
                });
            }
            else {

                return this.mapOne(function (el) {
                    return el.innerText;
                });
            }
        };

        DomElements.prototype.html = function (html) { // works like jQuery 'html'

            if (typeof html !== "undefined") {

                return this.each(function (el) {
                    el.innerHTML = html;
                });

            }
            else {

                return this.mapOne(function (el) {
                    return el.innerHTML;
                });
            }
        };

        DomElements.prototype.val = function (val) {  // works like jQuery 'val'

            if (typeof val !== "undefined") {

                return this.each(function (el) {
                    el.value = val;
                });

            }
            else {

                return this.mapOne(function (el) {
                    return el.value;
                });
            }
        };

        DomElements.prototype.attr = function (attr, val) { // works like jQuery 'attr'

            if (typeof val !== "undefined") {

                return this.each(function (el) {
                    el.setAttribute(attr, val);
                });

            }
            else {

                return this.mapOne(function (el) {
                    return el.getAttribute(attr);
                });
            }
        };

        DomElements.prototype.removeAttr = function (attr) {

            return this.mapOne(function (el) {
                return el.removeAttribute(attr);
            });
        };

        DomElements.prototype.css = function (attr, val) { // works like jQuery 'css'

            if (typeof val !== "undefined") {

                return this.each(function (el) {
                    el.style[attr] = val;
                });

            }
            else {

                return this.mapOne(function (el) {
                    return el.style[attr];
                });
            }
        };

        DomElements.prototype.addClass = function (classes) {

            var className = "";

            if (typeof classes !== "string") {

                for (var i = 0; i < classes.length; i++) {
                    className += " " + classes[i];
                }
            }
            else {
                className = " " + classes;
            }

            className = className.substring(1);

            return this.each(function (el) {

                el.className += className;
            });
        };

        DomElements.prototype.removeClass = function (_class) {

            return this.each(function (el) {

                var cs = el.className.split(" "), i;

                while ((i = cs.indexOf(_class)) > -1) {
                    cs = cs.slice(0, i).concat(cs.slice(++i));
                }

                el.className = cs.join(" ");
            });
        };

        DomElements.prototype.on = (function () {

            return function (evt, fn) {

                return this.each(function (el) {
                    el.addEventListener(evt, fn, false);
                });
            };
        }());

        DomElements.prototype.off = (function () {

            return function (evt, fn) {

                return this.each(function (el) {
                    el.removeEventListener(evt, fn, false);
                });
            };
        }());

        DomElements.prototype.ready = function(fun) {
            document.addEventListener('DOMContentLoaded', function() {
                fun();
            });
        };

        DomElements.prototype.append = function (str) {

            if(typeof str === 'string') {

                this.html(this.html() + str);
            }
        };

        DomElements.prototype.each = function (callback) { // works like jQuery 'each'

            this.map(callback);

            return this;
        };

        DomElements.prototype.map = function (callback) { // helper method

            var results = [], i = 0;

            for (; i < this.length; i++) {
                results.push(callback.call(this, this[i], i)); // applying the callback sending context(this) and index as param
            }

            return results;
        };

        DomElements.prototype.mapOne = function (callback) { // helper method

            var m = this.map(callback);
            return m.length > 1 ? m : m[0];
        };

        var els;

        if (typeof selector === "string") {
            els = document.querySelectorAll(selector);
        }
        else if (selector.length) {
            els = selector;
        }
        else {
            els = [selector];
        }

        return new DomElements(els);
    };

    return $;
});