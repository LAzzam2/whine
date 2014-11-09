define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface    = require("famous/core/Surface");
    var Scrollview = require("famous/views/Scrollview");

    var scrollview = new Scrollview();
    var surfaces = [];

    function AppView(SiteData) {
        View.apply(this, arguments);

        _create.call(this);
    }

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    scrollview.sequenceFrom(surfaces);
    function create(){
            temp = new Surface({
                 content: "",
                 size: [undefined, undefined],
                 properties: {
                    backgroundPositionY: '0px',
                    id: '1'
                 },
            });
            temp.pipe(scrollview);
            surfaces.push(temp);
            this.add(scrollview);
    };

    module.exports = AppView;
});