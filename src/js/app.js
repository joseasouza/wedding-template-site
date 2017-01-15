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

    app.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('gifts-list', {
                url: '/',
                templateUrl: "/src/gifts-list/",
                controller:  "GiftListController",
                controllerAs: "giftListCtrl"
            })
            .state('how-to-get-there', {
                url: '/how-to-get-there',
                templateUrl: "/src/how-to-get-there/",
                controller:  "HowToGetThereController",
                controllerAs: "howToGetThereCtrl"
            });

    });
})();
