/**
 * Created by victor on 26/01/17.
 */

(function () {
    var app = angular.module('appAdmin');
    app.controller("LoginController", LoginController);
    LoginController.$inject = ['$state', '$window', '$scope', 'firebaseService'];
    function LoginController($state, $window, $scope, firebaseService) {
        var ctrl = this;
        this.loading = false;
        this.email = "";
        this.password = "";
        this.message = "";
        this.doLogin = doLogin;

        firebaseService.onAuthStateChanged(function() {
           if (firebaseService.isLogged()) {
               $state.go('admin');
           }
        });

        function doLogin() {
            ctrl.loading = true;
            firebaseService.doLogin(ctrl.email, ctrl.password).then(function() {
                $state.go('admin');
            }).catch(function(error) {
                ctrl.message = error.message;
            }).then(function() {
                ctrl.loading = false;
                $scope.$digest();
            });
        }

    };

})();
