define('list/List', ['jquery', 'backbone', 'underscore', 'list/Item'],
    function   ($, Backbone, _, Item) {
        var List = Backbone.Collection.extend({
            /*url: function() {
                return '/users';
            },*/
            model: Item.Class
        });

        return {
            create: function (options) {
                return new List(options);
            },

            Class: List
        }
    }
);