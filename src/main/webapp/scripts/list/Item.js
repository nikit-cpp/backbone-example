define('list/Item', ['jquery', 'backbone', 'underscore'],
    function   ($, Backbone, _) {
        //jQuery, canvas and the app/sub module are all
        //loaded and can be used here now.
        var Item = Backbone.Model.extend({
            defaults: {
                firstName: 'hello',
                lastName: 'world'
            }
        });

        return {
            create: function (options) {
                return new Item(options);
            },

            Class: Item
        }
    }
);