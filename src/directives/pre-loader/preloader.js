(function () {
    var app = angular.module("app");

    var PreLoaderController = function($scope) {
        $scope.size = "big";
    };
    app.controller("PreLoaderController", ['$scope', PreLoaderController]);

    app.directive("preLoader", function () {
        return {
            restrict: 'E',
            templateUrl: "/src/directives/pre-loader/",
            scope: {
                show: '=show',
                size: '@?size'
            },
            controller: "PreLoaderController"
        };
    });
})();