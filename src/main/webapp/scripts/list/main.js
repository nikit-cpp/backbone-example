requirejs(['../common'], function (common) {
    require(['jquery', 'backbone', 'underscore', 'list/ListView'],
        function   ($, Backbone, _, ListView) {
            ListView.create();
        }
    );
});
