function View(name, tag) {
    var tpl = $(name).html();
    var dest = $(tag);

    this.render = function (data) {
        var out = Mustache.render(tpl, data);
        dest.html(out);
    }
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
