/**
 * Created by victor on 26/01/17.
 */
(function () {
    var appAdmin = angular.module('appAdmin', ['app']);
    appAdmin.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: "/src/login/",
                controller:  "LoginController",
                controllerAs: "loginCtrl"
            })
            .state('admin', {
                url: '/',
                templateUrl: "/src/admin/",
                controller:  "AdminController",
                controllerAs: "adminCtrl"
            });
    });
})();