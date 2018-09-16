Ateles(['synq'], function (synq) {
    var code = synq('https://code.jquery.com/jquery-3.3.1.min.js');
    eval(code);
    jQuery.noConflict();
    var jq = window.jQuery;
    delete window.jQuery;
    return jq;
})