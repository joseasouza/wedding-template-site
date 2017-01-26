/**
 * Created by victor on 26/01/17.
 */

(function () {
    var app = angular.module('appAdmin');
    app.controller("AdminController", ['$http', 'auth', '$scope', '$state', function($http, auth, $scope, $state) {
        if (!auth.isLogged()) {
            $state.go('login');
        }
    }]);

})();
