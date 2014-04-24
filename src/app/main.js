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
        var listeners = {};
        var data = {};

        var notifiyListeners = function (name, prev, curr) {
            if (! listeners.hasOwnProperty(name)) {
                return false;
            }

            listeners[name].forEach(function (callback) {
                callback(prev, curr);
            })

            return true;
        }

        this.registerChangeListener = function (name, callback) {
            if (! this.hasOwnProperty(name)) {
                return false;
            }

            if (! listeners.hasOwnProperty(name)) {
                listeners[name] = [];
            }

            listeners[name].push(callback);

            return true;
        }

        function getValue (name) {
            return data[name];
        }
        function setValue (name, newValue) {
            var oldValue = data[name];
            data[name] = newValue;
            notifiyListeners(name, oldValue, newValue);
        }

        this.addAttribute = function (name) {
            var attr_name = name;

            if (this.hasOwnProperty(attr_name)) {
                return false;
            }

            data[attr_name] = "null";
            this.__defineGetter__(attr_name, function() {
                return getValue(attr_name);
            });
            this.__defineSetter__(attr_name, function (value) {
                setValue(attr_name, value);
            });

            return true;
        }
    }

    this.Schorle = {};
    this.Schorle.View = View;
    this.Schorle.Model = Model;
})();
/*MODULE: schorle*/

$(function () {
    /*
    var v = new Schorle.View('#joe_tpl', '#output');
    v.render({
      repo: [
        { name: "resque" },
        { name: "hub" },
        { name: "asdf" }
      ]
    });    
    */

    /*
    name_list_model = new Schorle.Model();
    name_list_model.addAttribute('name_list');
    name_list_model.name_list = [
        { name: "der große", surname: "karl" },
        { name: "becker", surname: "heinz" },
        { name: "bismark", surname: "otto" }
    ];

    var name_view = new Schorle.View('#carl_tpl', '#name-list');
    name_view.render(name_list_model);

    name_list_model.registerChangeListener('name_list', function (ov, nv) {
        name_view.render(name_list_model);
    });
    */
    
    /*var output = Mustache.render($('#joe_tpl').html(), model);
    $('#output').html(output);*/
    /*
    st = "";
    $('script[type="x-tmpl-mustache"]').each(function (n) {
        st += $(this).attr('id');
    });
    $('#output').text(st);
    */
});
