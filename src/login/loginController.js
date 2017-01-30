/**
 * Created by victor on 26/01/17.
 */

(function () {
    var app = angular.module('appAdmin');
    app.controller("LoginController", ['$state', '$window', '$scope', 'auth', function($state, $window, $scope, auth) {
        var ctrl = this;
        this.loading = false;
        this.email = "";
        this.password = "";
        this.message = "";
        this.doLogin = doLogin;

        function doLogin() {
            ctrl.loading = true;
            auth.doLogin(ctrl.email, ctrl.password).then(function() {
                $state.go('admin');
            }).catch(function(error) {
                ctrl.message = error.message;
            }).then(function() {
                ctrl.loading = false;
                $scope.$digest();
            });
        }

    }]);

})();
