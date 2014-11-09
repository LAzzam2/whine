define(function(require, exports, module) {
    var View       = require('famous/core/View');
    var Surface    = require("famous/core/Surface");
    var Scrollview = require("famous/views/Scrollview");
    var ScrollSync = require("famous/inputs/ScrollSync");

    var scrollview = new Scrollview();
    var surfaces = [];

    function AppView(SiteData) {
        View.apply(this, arguments);

        _createSections.call(this);
    }

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    scrollview.sequenceFrom(surfaces);
    function _createSections() {
        
            Section1 = new Surface({
                 content:  'Unique Content 1',
                 size: [undefined, undefined],
                 properties: {
                    backgroundPositionY: '0px'
                 },
            });
            Section1.pipe(scrollview);
            surfaces.push(Section1);
            
            Section2 = new Surface({
                 content:  'Unique Content 2',
                 size: [undefined, undefined],
                 properties: {
                    backgroundPositionY: '0px'
                 },
            });
            Section2.pipe(scrollview);
            surfaces.push(Section2);

            Section3 = new Surface({
                 content:  'Unique Content 3',
                 size: [undefined, undefined],
                 properties: {
                    backgroundPositionY: '0px'
                 },
            });
            Section3.pipe(scrollview);
            surfaces.push(Section3);

        this.add(scrollview)
    };
    
    module.exports = AppView;
});