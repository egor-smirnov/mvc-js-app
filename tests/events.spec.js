describe("Event Tests", function () {

    var EventTest;
    var spy;

    beforeEach(function () {

        EventTest = new Class();
        EventTest.extend(Events);

        var noop = {spy:function () {}};
        spyOn(noop, "spy");

        spy = noop.spy;
    });

    it("can bind / emit events", function () {

        EventTest.on("event", spy);
        EventTest.emit("event");

        expect(spy).toHaveBeenCalled();
    });

    it("should emit correct events", function () {

        EventTest.on("event", spy);
        EventTest.emit("event-not-exist");

        expect(spy).not.toHaveBeenCalled();
    });

    it("can bind / emit multiple events", function () {

        EventTest.on("event1 event2 event3", spy);
        EventTest.emit("event2");

        expect(spy).toHaveBeenCalled();
    });

    it("can pass data to emitted events", function () {

        EventTest.on("event", spy);
        EventTest.emit("event", 5, 10);

        expect(spy).toHaveBeenCalledWith(5, 10);
    });

    it("can unbind events", function () {

        EventTest.on("event", spy);
        EventTest.off("event");
        EventTest.emit("event");

        expect(spy).not.toHaveBeenCalled();
    });
});

