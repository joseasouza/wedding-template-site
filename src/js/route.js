/**
 * Created by victor on 26/01/17.
 */
(function() {

    var app = angular.module('app');
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