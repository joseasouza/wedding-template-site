(function () {
    var app = angular.module("app");
    app.directive("buySubmit", function () {
        return {
            restrict: 'E',
            templateUrl: "src/directives/buy-submit/",
            scope: {
                price: '=price',
                productName: '=productName',
                amount: '=amount',
                form: '@form'
            }
        };
    });

    var SubmitController = function($scope, $element) {
        $element.bind('click', function() {
            $("#" + $scope.form).submit();
        });
    };

    //todo retirar submit
    app.controller("SubmitController", ['$scope', '$element', SubmitController]);
    app.directive("submit", function () {
        return {
            restrict: 'A',
            scope: {
                form: '@form'
            },
            controller: 'SubmitController'
        }
    });
})();