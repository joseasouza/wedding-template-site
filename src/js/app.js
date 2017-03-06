/**
 * Created by victor on 05/01/17.
 */
import "angular";
import "angular-ui-router";
import "angular-animate";
import "angular-materialize";

(() => {
    $('.slider').slider({height:"100%",interval:8e3});
    $('.button-collapse').sideNav({menuWidth: 300, closeOnClick: true});


    angular.module('app', ['ui.router', 'ngAnimate']);
    require("src/services/firebaseService.js");
    require("src/directives/image-onload/image-onload.js");
    require("src/directives/pre-loader/preloader.js");
})();
