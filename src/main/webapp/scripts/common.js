requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'scripts',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        text: '../libs/text/text',
        jquery: '../libs/jquery/dist/jquery',
        underscore: '../libs/underscore/underscore',
        backbone: '../libs/backbone/backbone',
        epoxy: '../libs/backbone.epoxy/backbone.epoxy',
        validation: '../libs/backbone.validation/dist/backbone-validation-amd',
        json2: '../libs/json2/json2',
        marionette: '../libs/backbone.marionette/lib/backbone.marionette'
    },
    shim: {}
});