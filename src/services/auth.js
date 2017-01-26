/**
 * Created by victor on 26/01/17.
 */
(function() {
    var app = angular.module("app");
    app.service("auth", function() {

        this.isLogged = isLogged;

        function isLogged() {
            return false;
        }

    });
})();