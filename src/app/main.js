function View(name, tag) {
    var tpl = $(name).html();
    var dest = $(tag);

    this.render = function (data) {
        var out = Mustache.render(tpl, data);
        dest.html(out);
    }
}

function Model() {
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


function Field(val){
    var value = val;
   
    this.__defineGetter__("value", function(){
        return value;
    });
   
    this.__defineSetter__("value", function(val){
        value = val;
    });
}



$(function () {
    
    var model = {
      repo: [
        { name: "resque" },
        { name: "hub" },
        { name: "asdf" }
      ]
    };

    var v = new View('#joe_tpl', '#output');
    v.render(model);
    
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
