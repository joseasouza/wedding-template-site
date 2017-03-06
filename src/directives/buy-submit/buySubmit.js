(() => {
    var app = angular.module("appGiftList");
    app.directive("buySubmit", () => {
        return {
            restrict: 'E',
            templateUrl: "/src/directives/buy-submit/",
            scope: {
                price: '=price',
                productName: '=productName',
                amount: '=amount',
                form: '@form'
            }
        };
    });

    var SubmitController = function($scope, $element) {
        $element.bind('click',() => {
            $("#" + $scope.form).submit();
        });
    };

    //todo retirar submit
    app.controller("SubmitController", ['$scope', '$element', SubmitController]);
    app.directive("submit", () => {
        return {
            restrict: 'A',
            scope: {
                form: '@form'
            },
            controller: 'SubmitController'
        }
    });
})();