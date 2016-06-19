MODE = 'dev';
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
        'jquery': MODE == 'min' ? '../libs/jquery/dist/jquery.min' : '../libs/jquery/dist/jquery',
        underscore: MODE == 'min' ? '../libs/underscore/underscore-min' : '../libs/underscore/underscore',
        backbone: MODE == 'min' ? '../libs/backbone/backbone-min' : '../libs/backbone/backbone',
        epoxy: '../libs/backbone.epoxy/backbone.epoxy',
        validation: MODE == 'min' ? '../libs/backbone.validation/dist/backbone-validation-amd-min' : '../libs/backbone.validation/dist/backbone-validation-amd',
        json2: '../libs/json2/json2',
        marionette: MODE == 'min' ? '../libs/backbone.marionette/lib/backbone.marionette.min' :'../libs/backbone.marionette/lib/backbone.marionette'
    },
    shim: {}
});