define([
    'dom',
    'model',
    'view'
], function ($, Model, View) {

    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////

    var threadViewSettings = {

        template: $('#thread-single-template'),

        useTag: 'li'
    };

    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////

    var postViewSettings = {

        template: $('#post-single-template'),

        useTag: 'li'
    };


    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////


    var AppView = new View({

        threadAuthor: '',

        threadId: undefined,

        events: {
            'click #thread-create-button': 'createNewThread',
            'click #post-create-button': 'createNewPost'
        },

        createNewThread: function () {

            var message = $('#thread-message').val();
            var author = $('#thread-author').val();

            if (message && author) {

                var self = this;

                var thread = new Model({

                    message: message,
                    author: author
                });

                thread.useREST('http://blog.gface.com/frontend-dev-test/thread/');

                var view = new View(threadViewSettings);
                view.useModel(thread);

                thread.save(function () {

                    thread.set('date', helper.timeConverter(thread.get('date')));

                    self.threadAuthor = thread.get('author');
                    self.threadId = thread.get('id');

                    $('.thread-block').css('display', 'block');
                    $('#thread-list').append(view.render());
                    $('#thread-form').css('display', 'none');

                    $('#post-form').css('display', 'block');
                    $('#post-author-label').html(self.threadAuthor);
                    $('#post-list').css('display', 'block');
                });
            }
            else {
                alert('Please provide thread author and / or thread message.');
            }
        },

        createNewPost: function () {

            var message = $('#post-message').val();

            if (message) {

                var post = new Model({
                    author: this.threadAuthor,
                    threadid: this.threadId,
                    message: message
                });

                post.useREST('http://blog.gface.com/frontend-dev-test/post/');

                var view = new View(postViewSettings);
                view.useModel(post);

                post.save(function () {

                    post.set('date', helper.timeConverter(post.get('date')));

                    $('#post-list').append(view.render());
                    $('#post-message').val('');
                });
            }
            else {
                alert('Please provide post message.');
            }
        }
    });

    var helper = {};

    helper.timeConverter = function (UNIX_timestamp) {

        var a = new Date(UNIX_timestamp * 1000);

        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = month + ' ' + date + ', ' + year + ' ' + hour + ':' + min + ':' + sec;

        return time;
    }
});