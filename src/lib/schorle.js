/*MODULE: schorle*/
(function () {
    function View (name, tag) {
        var tpl = $(name).html();
        var dest = $(tag);

        this.render = function (data) {
            var out = Mustache.render(tpl, data);
            dest.html(out);
        }
    }

    function Model () {
        
    }

    this.Schorle = {};
    this.Schorle.View = View;
    this.Schorle.Model = Model;
})();
/*MODULE: schorle*/