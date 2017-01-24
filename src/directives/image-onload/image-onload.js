(function () {

    angular.module("app")
        .directive("imageOnload", function () {
            return {
                restrict: 'A',
                link: function(scope, element) {
                    scope.load = false;
                    element.bind('load', function() {
                        scope.$apply(function() {
                            scope.load = true;
                        });
                    });
                }
            };
    });
})();