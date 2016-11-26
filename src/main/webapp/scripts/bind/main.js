requirejs(['../common'], function (common) {
    require(['jquery', 'backbone', 'underscore', 'epoxy', 'validation'],
        function   ($, Backbone, _) {
            Backbone.Validation.configure({
                forceUpdate: true
            });

            // globally set validation callback
            /*
            _.extend(Backbone.Validation.callbacks, {
                valid: function (view, attr, selector) {
                    var $el = view.$('[name=' + attr + ']'),
                        $group = $el.closest('.form-group');

                    $group.removeClass('has-error');
                    $group.find('.help-block').html('').addClass('hidden');
                },
                invalid: function (view, attr, error, selector) {
                    var $el = view.$('[name=' + attr + ']'),
                        $group = $el.closest('.form-group');

                    $group.addClass('has-error');
                    $group.find('.help-block').html(error).removeClass('hidden');
                }
            });
            */

            var bindClass = Backbone.Model.extend({
                defaults: {
                    firstName: "Luke",
                    lastName: "Skywalker"
                },
                validation: {
                    firstName: {
                        required: true
                    },
                    lastName: {
                        equalTo: 'firstName'
                    }
                }
            });

            var bindModel = new bindClass();

            var BindingView = Backbone.Epoxy.View.extend({
                el: "#app-luke",
                bindings: {
                    "input.firstName": "value:firstName,events:['keyup']",
                    "input.lastName": "value:lastName,events:['keyup']",
                    "span.firstName": "text:firstName",
                    "span.lastName": "text:lastName"
                },

                initialize: function(){
                    Backbone.Validation.bind(this);
                },

                render: function(){
                    // set validation per view
                    Backbone.Validation.bind(this, {
                        valid: function(view, attr) {
                            var $el = view.$('[name=' + attr + ']'),
                                $group = $el.closest('.form-group');

                            $group.removeClass('has-error');
                            $group.find('.help-block').html('').addClass('hidden');
                        },
                        invalid: function(view, attr, error) {
                            var $el = view.$('[name=' + attr + ']'),
                                $group = $el.closest('.form-group');

                            $group.addClass('has-error');
                            $group.find('.help-block').html(error).removeClass('hidden');
                        }
                    });
                },
                setterOptions:{validate:true} // root cause
            });

            var view = new BindingView({model: bindModel});
            view.render();
        }
    );
});
