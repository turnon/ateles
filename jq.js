Ateles(async function () {
    var cdn = 'https://code.jquery.com/jquery-3.3.1.min.js';
    var code = await fetch(cdn).then(resp => resp.text());
    eval(code);

    var jq = window.jQuery;
    jq.noConflict(true);
    return jq;
})