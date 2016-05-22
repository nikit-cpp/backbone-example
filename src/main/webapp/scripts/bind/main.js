requirejs(['../common'], function (common) {
    require(['jquery', 'backbone', 'underscore', 'epoxy'],
        function   ($, Backbone, _) {
            var bindModel = new Backbone.Model({
                firstName: "Luke",
                lastName: "Skywalker"
            });

            var BindingView = Backbone.Epoxy.View.extend({
                el: "#app-luke",
                bindings: {
                    "input.first-name": "value:firstName,events:['keyup']",
                    "input.last-name": "value:lastName,events:['keyup']",
                    "span.first-name": "text:firstName",
                    "span.last-name": "text:lastName"
                }
            });

            var view = new BindingView({model: bindModel});
        }
    );
});
