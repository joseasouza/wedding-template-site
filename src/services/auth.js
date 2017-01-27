/**
 * Created by victor on 26/01/17.
 */
(function() {
    var app = angular.module("app");
    app.service("auth", function() {
        var auth = firebase.auth();
        this.isLogged = isLogged;
        this.doLogin = doLogin;

        function isLogged() {
            return auth.currentUser != null;
        }

        function doLogin(email, password) {
            return auth.signInWithEmailAndPassword(email, password);
        }

    });
})();