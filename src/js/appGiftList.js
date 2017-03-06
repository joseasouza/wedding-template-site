/**
 * Created by victor on 05/01/17.
 */
import "src/js/app.js"

(() => {
    $('.slider').slider({height:"100%",interval:8e3});
    $('.button-collapse').sideNav({menuWidth: 300, closeOnClick: true});

    angular.module('appGiftList', ['app']);
    require("src/js/route.js");
    require("src/gifts-list/controller.js");
    require("src/gifts-list/filter-nav/controller.js");
    require("src/how-to-get-there/controller.js");

})();
