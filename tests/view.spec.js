describe("View Tests", function () {

    var UserView;
    var User;
    var spy;

    beforeEach(function () {

        User = new Model({
            id: 1,
            name: 'John',
            surname: 'Smith'
        });

        UserView = new View({

            template: $('#test-template'),

            useTag: 'li',

            error: function(error) {

                alert('error!');
            },

            events: {
                'click #user-create-button': 'createNewUser'
            },

            createNewUser: function() {

                $('#user-list').append(this.render());
            }
        });

        UserView.useModel(User);
    });

    afterEach(function () {

        UserView = {};
    });

    it("Has working binding of user defined events", function () {

        expect(UserView.createNewUser instanceof Function).toBeTruthy();

        var elem = document.getElementById('user-create-button');
        elem.click();

        expect($('#user-list').html()).toEqual('<li><div><h2>1</h2><span class="name">John</span><span class="surname">Smith</span></div></li>');
    });

    it("Has working binding of model events", function () {

        var newUser = new Model({
            id: 2,
            name: 'Egor',
            surname: 'Smirnov'
        });

        UserView.useModel(newUser);

        var elem = document.getElementById('user-create-button');
        elem.click();

        expect($('#user-list').html()).toEqual('<li><div><h2>1</h2><span class="name">John</span><span class="surname">Smith</span></div></li><li><div><h2>1</h2><span class="name">John</span><span class="surname">Smith</span></div></li><li><div><h2>2</h2><span class="name">Egor</span><span class="surname">Smirnov</span></div></li>');
    });

    it("Has mixin Events object", function () {

        expect(UserView.on instanceof Function).toBeTruthy();
        expect(UserView.off instanceof Function).toBeTruthy();
        expect(UserView.emit instanceof Function).toBeTruthy();
    });

    it("Could be initialized with model instance", function () {

        expect(UserView.model instanceof Model).toBeTruthy();
        expect(UserView.model.get('id')).toEqual(1);
        expect(UserView.model.get('name')).toEqual('John');
        expect(UserView.model.get('surname')).toEqual('Smith');
        expect(UserView.model.get('test')).toEqual(undefined);
    });

    it("Could properly work with templates and has properly initialized useTag property", function () {

        var template = UserView.compileTemplate({id: 20, name: 'Egor', surname: 'Smirnov'});

        expect(template).toEqual('<li><div><h2>20</h2><span class="name">Egor</span><span class="surname">Smirnov</span></div></li>');

        UserView.useTag = '';
        template = UserView.compileTemplate({id: 40, name: 'John', surname: 'Smith'});

        expect(template).toEqual('<div><h2>40</h2><span class="name">John</span><span class="surname">Smith</span></div>');
    });

    it("Was properly initialized", function () {

        expect(UserView.error instanceof Function).toBeTruthy();
        expect(UserView.useTag).toEqual('li');
        expect(UserView.events).toEqual({'click #user-create-button': 'createNewUser'});
        expect(UserView.render instanceof Function).toBeTruthy();
    });
});

