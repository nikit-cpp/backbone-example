define('ItemView', ['jquery', 'backbone', 'underscore', 'text!ItemView.html'],
    function   ($, Backbone, _, ItemViewHtml) {

        var ItemView = Backbone.View.extend({
            template: _.template(ItemViewHtml),
            initialize: function(){
                _.bindAll(this, 'render'); // every function that uses 'this' as the current object should be in here
            },
            render: function(){
                this.$el.html(this.template(this.model.toJSON()));
                return this; // for chainable calls, like .render().el
            }
        });

        return {
            create: function (options) {
                return new ItemView(options);
            },

            Class: ItemView
        }
    }
);