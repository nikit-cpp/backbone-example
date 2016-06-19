requirejs(['../common'], function (common) {
    require(['jquery', 'backbone', 'underscore', 'text!marionette-cats/AngryCatsView.html', 'text!marionette-cats/AngryCatView.html', 'marionette'],
        function   ($, Backbone, _, AngryCatsViewHtml, AngryCatViewHtml) {
            var MyApp = new Backbone.Marionette.Application();

            MyApp.addRegions({
                mainRegion: "#content"
            });

            var AngryCat = Backbone.Model.extend({name: 'Default name'});

            var AngryCats = Backbone.Collection.extend({
                model: AngryCat
            });
            var AngryCatView = Backbone.Marionette.ItemView.extend({
                template: _.template(AngryCatViewHtml),
                tagName: 'tr',
                className: 'angry_cat'
            });
            var AngryCatsView = Backbone.Marionette.CompositeView.extend({
                tagName: "table",
                id: "angry_cats",
                className: "table-striped table-bordered",
                template: _.template(AngryCatsViewHtml),
                childView: AngryCatView
            });
            MyApp.addInitializer(function(options){
                var angryCatsView = new AngryCatsView({
                    collection: options.cats
                });
                MyApp.mainRegion.show(angryCatsView);
            });

            //$(document).ready(function(){
                var cats = new AngryCats([
                    { name: 'Wet Cat' },
                    { name: 'Bitey Cat' },
                    { name: 'Surprised Cat' }
                ]);

                MyApp.start({cats: cats});
            //});
        }
    );
});