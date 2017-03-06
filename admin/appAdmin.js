/**
 * Created by victor on 26/01/17.
 */
import "src/js/app.js";
import "angular-input-masks";
(function () {

    var appAdmin = angular.module('appAdmin', ['app', 'ui.utils.masks']);
    RouteConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RouteConfig($stateProvider, $urlRouterProvider) {
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
    };
    appAdmin.config(RouteConfig);

    require("src/services/firebaseService.js");
    require("src/admin/adminController.js");
    require("src/login/loginController.js");
    require("src/directives/image-onload/image-onload.js");
    require("src/directives/pre-loader/preloader.js");
})();