#include('jquery-2.1.0.js');
#include('mustache.js');
#include('schorle.js');

$(function () {
    var v = new Schorle.View('#joe_tpl', '#output');
    v.render({
      repo: [
        { name: "resque" },
        { name: "hub" },
        { name: "asdf" }
      ]
    });
});
