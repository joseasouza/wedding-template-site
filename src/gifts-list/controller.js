/**
 * Created by victor on 12/01/17.
 */
(function () {
    var app = angular.module('app');
    app.controller("GiftListController", ['$http', function($http) {
        this.products = [];
        this.search = "";
        var ctrl = this;

        $http.get("/products.json").then(function(data) {
            ctrl.products = data.data;
        });

    }]);
})();
