describe("Dom Tests", function () {

    var newBlock;
    var parent;

    beforeEach(function () {

        parent = document.getElementsByTagName('body');

        newBlock = document.createElement('div');
        newBlock.id = 'new-block';
        newBlock.innerHTML = 'New Block';
        newBlock.style.display = 'none';

        parent[0].appendChild(newBlock);
    });

    afterEach(function() {

        parent[0].removeChild(newBlock);
    });

    it("Dom get method is working properly", function () {

        var element = $('#new-block');

        expect(element.length).toEqual(1);
    });

    it("Dom text method is working properly", function () {

        var element = $('#new-block');
        element.text('new value');

        expect(element.text()).toEqual('new value');
    });

    it("Dom text method is chainable", function () {

        var element = $('#new-block');
        element.text('new value').text('new value again');

        expect(element.text()).toEqual('new value again');
    });

    it("Dom html method is working properly", function () {

        var element = $('#new-block');
        element.html('<span>new value</span>');

        expect(element.html()).toEqual('<span>new value</span>');
    });

    it("Dom html method is chainable", function () {

        var element = $('#new-block');
        element.html('<span>new value</span>').html('<span>new value again</span>');

        expect(element.html()).toEqual('<span>new value again</span>');
    });

    it("Dom val method is working properly", function () {

        var element = $('#new-block');
        element.val('new value');

        expect(element.val()).toEqual('new value');
    });

    it("Dom attr method is working properly", function () {

        var element = $('#new-block');
        element.attr('class', 'test');

        expect(element.attr('class')).toEqual('test');
    });

    it("Dom removeAttr method is working properly", function () {

        var element = $('#new-block');
        element.attr('class', 'test');
        element.removeAttr('class');

        expect(element.attr('class')).toEqual(undefined);
    });

    it("Dom css method is working properly", function () {

        var element = $('#new-block');
        element.css('color', 'red');

        expect(element.css('color')).toEqual('red');
    });

    it("Dom addClass method is working properly", function () {

        var element = $('#new-block');
        element.addClass('test1 test2');

        expect(element.attr('class')).toEqual('test1 test2');

        element.attr('class', '');
        element.addClass(['test1', 'test2']);

        expect(element.attr('class')).toEqual('test1 test2');
    });

    it("Dom removeClass method is working properly", function () {

        var element = $('#new-block');
        element.addClass('test1 test2');

        expect(element.attr('class')).toEqual('test1 test2');

        element.removeClass('test2');
        expect(element.attr('class')).toEqual('test1');

        element.removeClass('test1');
        expect(element.attr('class')).toEqual('');
    });

    it("Dom check ready event", function () {

        $(document).ready(function() {

            var element = $('#new-block');
            element.text('test text');

            expect(element.text()).toEqual('test text');
        });
    });
});
