describe("Collection Tests", function () {

    var collection;
    var model1, model2;

    beforeEach(function () {

        var model1 = new Model({
            id: 1,
            author: 'test',
            title: 'test'
        });

        var model2 = new Model({
            id: 2,
            author: 'test2',
            title: 'test2'
        });

        collection = new Collection([model1, model2]);
    });

    afterEach(function () {

        collection.reset();
    });

    it("Has mixin Events object", function () {

        expect(collection.on instanceof Function).toBeTruthy();
        expect(collection.off instanceof Function).toBeTruthy();
        expect(collection.emit instanceof Function).toBeTruthy();
    });

    it("Has initialized models", function () {

        expect(collection.at(0).get('id')).toEqual(1);
        expect(collection.at(0).get('author')).toEqual('test');
        expect(collection.at(0).get('title')).toEqual('test');

        expect(collection.length).toEqual(2);
    });

    it("Has working reset method", function () {

        collection.reset();

        expect(collection.at(0)).toEqual(undefined);
        expect(collection.length).toEqual(0);
    });
});

