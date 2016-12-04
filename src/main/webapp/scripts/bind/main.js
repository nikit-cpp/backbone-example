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








            var searchCriteria = [
                {
                    selectedHero: 2,
                    options: [
                        {label: "Luke Skywalker", heroId: 1},
                        {label: "Han Solo", heroId: 2}
                    ]
                },
                {
                    selectedHero: 1,
                    options: [
                        {label: "Dimmu Borgir", heroId: 1},
                        {label: "Metallica", heroId: 2},
                        {label: "Judas Priest", heroId: 3}
                    ]
                }
            ];

            _.each(searchCriteria, function(
                selectItem, // элемент списка, объект, содержащий selectedHero и options
                index
            ){
                $('#input-elements').append(
                    "<div id='select-item-"+index+"'>"+
                        "<select data-bind=\"collection:$collection,value:selectedHero,events:['change']\"></select>"+
                        "<span data-bind='text:selectedHero'></span>"+
                    "</div>"
                );

                var OptionView = Backbone.View.extend({
                    initialize: function() {
                        var html =  "<option value='" + this.model.get("heroId") + "'>" +  this.model.get("label")+ "</option>" ;
                        this.setElement(html); // http://stackoverflow.com/questions/7894253/backbone-js-turning-off-wrap-by-div-in-render/7894410#7894410
                    }
                });
                var SelectView = Backbone.Epoxy.View.extend({
                    el: "#select-item-"+index,
                    itemView: OptionView,
                    model: Backbone.Model,

                    initialize: function() {
                        this.collection = new (Backbone.Collection.extend({ model: Backbone.Model })) ();
                        this.collection.reset(selectItem.options);

                        this.model = new Backbone.Model(selectItem); // для того чтобы положить сюда выбранное значение
                        this.model.on('change', function(model){
                            selectItem.selectedHero = model.get('selectedHero'); // обновляем в первоначальном объекте
                            //console.debug("model changed ", model);
                        });
                    }
                });
                var view = new SelectView();

                // для отладки
                $( "#select-item-"+index ).change(function() {
                    console.debug( "Handler for .change() called." + JSON.stringify(searchCriteria) );
                });
            });

        }
    );
});
