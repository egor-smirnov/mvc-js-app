describe("Class Tests", function () {

    var Instance;

    beforeEach(function () {

        Instance = new Class();
    });

    it("Could be included", function () {

        Instance.include({newProperty:'test'});

        expect(Instance.prototype.newProperty).toEqual('test');
        expect((new Instance()).newProperty).toEqual('test');
    });

    it("Could be extended", function () {

        Instance.extend({newProperty: 'test'});

        expect(Instance.newProperty).toEqual('test');
    });

    it("Could be included via constructor", function () {

        var NewInstance = new Class({newProperty:'test'});

        expect(NewInstance.prototype.newProperty).toEqual('test');
    });

    it("Could be extended via constructor", function () {

        var NewInstance = new Class({}, {newProperty:'test'});

        expect(NewInstance.newProperty).toEqual('test');
    });

    it("Has possibility to redefine init method by including", function() {

        Instance.include({

            init: function(atts){
                if (atts) {
                    for (var name in atts) {
                        this[name] = atts[name];
                    }
                }
            }
        });

        var NewInstance = new Instance({newProperty:'test'});

        expect(NewInstance.newProperty).toEqual('test');
    });

    it("Has appropriate proxy function", function () {

        var func = function () {
            return this;
        };

        expect(Instance.proxy(func)()).toBe(Instance);
    });
});

