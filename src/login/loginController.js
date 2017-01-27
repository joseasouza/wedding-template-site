/**
 * Created by victor on 26/01/17.
 */

(function () {
    var app = angular.module('appAdmin');
    app.controller("LoginController", ['$state', '$window', '$scope', 'auth', function($state, $window, $scope, auth) {
        var ctrl = this;
        ctrl.message="Carregando...";
        auth.doLogin("", "").then(function() {
            $state.go('admin');
        }).catch(function(error) {
            ctrl.message = error;
        }).then(function() {
            $scope.$apply();
        });
    }]);

})();
