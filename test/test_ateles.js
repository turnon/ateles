/**
 * Created by turnon on 2018/9/14.
 */
// ==UserScript==
// @name         test_ateles
// @namespace    https://github.com/turnon/test_ateles
// @version      0.0.6
// @description  test ateles
// @author       block24block@gmail.com
// @match       *://movie.douban.com/*/photos*
// @grant        none
// @require https://greasyfork.org/scripts/372188-ateles/code/ateles.js?version=628799
// ==/UserScript==
Ateles(['test/t1', 'test/t3'], function (t1, t3) {
    console.log(t1.minus3(7) * t3.plus3(2))
})