/**
 * Created by victor on 05/01/17.
 */
(function () {
    $('.slider').slider({height:"100%",interval:8e3});
    $('.button-collapse').sideNav({
        menuWidth: 300,
        closeOnClick: true
    });

    var app = angular.module('app', ['ui.router', 'ngAnimate']);
})();
