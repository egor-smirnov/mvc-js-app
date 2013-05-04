describe("Model Tests", function () {

    var model;

    beforeEach(function () {

        model = new Model({
            id: 15,
            author: 'John',
            message: 'Message from John'
        });
    });

    afterEach(function () {

        model.reset();
    });

    it("Has mixin Events object", function () {

        expect(model.on instanceof Function).toBeTruthy();
        expect(model.off instanceof Function).toBeTruthy();
        expect(model.emit instanceof Function).toBeTruthy();
    });

    it("Has initialized attributes", function () {

        expect(model.get('id')).toEqual(15);
        expect(model.get('author')).toEqual('John');
        expect(model.get('message')).toEqual('Message from John');
        expect(model.length).toEqual(3);
    });

    it("Has working set method", function () {

        model.set({id: 20, title: 'title', prop: undefined});

        expect(model.get('id')).toEqual(20);
        expect(model.get('title')).toEqual('title');
        expect(model.get('prop')).toEqual(undefined);
        expect(model.length).toEqual(5);

        model.set('id', 100);

        expect(model.get('id')).toEqual(100);
        expect(model.length).toEqual(5);
    });

    it("Has working reset method", function () {

        model.reset();

        expect(model.get('id')).toEqual(undefined);
        expect(model.length).toEqual(0);
    });

    it("Has working has method", function () {

        expect(model.has('id')).toEqual(true);
        expect(model.has('property')).toEqual(false);
    });

    it("Has working remove method", function () {

        model.remove('id');

        expect(model.get('id')).toEqual(undefined);
        expect(model.get('author')).toEqual('John');
    });

    it("Has working toJSON method", function () {

        expect(model.toJSON()).toEqual({
            id:15,
            author:'John',
            message:'Message from John'
        });
    });
});

