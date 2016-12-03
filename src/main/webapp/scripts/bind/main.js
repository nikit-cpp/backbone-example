requirejs(['../common'], function (common) {
    require(['jquery', 'backbone', 'underscore', 'epoxy', 'validation'],
        function   ($, Backbone, _) {
            // allow to set invalid values in model
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
                    lastName: "Skywalker",
                    sex: 1,
                    starship: [3]
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
                bindings: /*{
                    "[name=firstName]": "value:firstName,events:['keyup']",
                    "[name=lastName]": "value:lastName,events:['keyup']",
                    "span.firstName": "text:firstName",
                    "span.lastName": "text:lastName"
                }*/"data-bind",

                initialize: function(){
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

                setterOptions: {validate: true} // root cause: force validation on setting
            });

            var view = new BindingView({model: bindModel});













            var ListItemView = Backbone.View.extend({
                //tagName: "select",
                initialize: function() {
                    var html =  "<option value='" + this.model.get("heroId") + "'>" +  this.model.get("label")+ "</option>" ;
                    this.setElement(html);
                }
            });

            var ListCollection = Backbone.Collection.extend({
                model: Backbone.Model
            });

            var ListView = Backbone.Epoxy.View.extend({
                el: "#bind-collection",
                itemView: ListItemView,
                model: Backbone.Model, // для того чтобы положить сюда выбранное значение

                initialize: function() {
                    var arr = [{label: "Luke Skywalker", heroId: 1}, {label: "Han Solo", heroId: 2}];

                    this.collection = new ListCollection();
                    this.collection.reset(arr);

                    this.model = new Backbone.Model({selectedHero: 1});
                }
            });

            var view = new ListView();
        }
    );
});
