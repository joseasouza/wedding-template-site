/**
 * Created by victor on 05/01/17.
 */
(function () {
    $('.slider').slider({height:"100%",interval:8e3});
    $('.button-collapse').sideNav({
        menuWidth: 300,
        closeOnClick: true
    });
    var config = {
        apiKey: "AIzaSyAJXzWi0VDsHL5ZgYqcnQ-zBxHjkAFZXAg",
        authDomain: "wedding-list-site.firebaseapp.com",
        databaseURL: "https://wedding-list-site.firebaseio.com",
        storageBucket: "wedding-list-site.appspot.com",
        messagingSenderId: "271294057376"
    };
    firebase.initializeApp(config);

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
