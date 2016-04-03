define('ListView',
    ['jquery', 'backbone', 'underscore', 'Item', 'List', 'ItemView', 'text!ListView.html'],
function($, Backbone, _, Item, List, ItemView, ListViewHtml){
        var ListView = Backbone.View.extend({
            template: _.template(ListViewHtml),
            el: $('#appendToMe'), // el attaches to existing element
            events: {
                'click button#next': 'next'
            },

            users: [],

            offset: 0,

            limit: 2,

            initialize: function(){
                _.bindAll(this, 'render', 'appendItem', 'setToCollection'); // every function that uses 'this' as the current object should be in here

                this.collection = List.create();
                //this.collection.fetch();
                this.collection.bind('add', this.appendItem); // collection event binder
                this.collection.bind('reset', this.resetView); // collection event binder

                this.render();

                var self = this;
                $.getJSON( "/users", function( data ) {
                    $.each( data, function( key, val ) {
                        self.addToArray(val);
                        //console.log(val);
                    });
                    console.log("loading completed");
                    console.log(self.users);

                    // начальная инициализация
                    self.setToCollection(self.users, self.offset, self.limit);
                });
            },

            setToCollection: function(array, offset, limit) {
                this.collection.reset();

                var models = _.first( _.rest(array, offset), limit);

                console.log("setting");
                this.collection.set(models);
            },

            next: function(e) {
                e.preventDefault();
                var step = this.limit;
                this.offset += step;
                if (this.offset > this.users.length-1) {this.offset = 0;}
                if (this.offset + step > this.users.length) {
                    var back = this.offset + step - this.users.length;
                    this.offset -= back;
                }
                this.setToCollection(this.users, this.offset, this.limit);
            },

            addToArray: function(item) {
                this.users.push(item);
            },

            render: function(){
                this.$el.html(this.template());
            },

            resetView: function() {
                console.log('resetting view');
                $('ul', this.el).empty();
            },

            appendItem: function(item){
                var itemView = ItemView.create({
                    model: item
                });
                $('ul', this.el).append(itemView.render().el);
            }
        });

        return {
            create: function(options){
                return new ListView(options);
            },
            Class: ListView
        }
    }
);