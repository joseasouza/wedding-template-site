(function () {

    angular.module("app")
        .directive("imageOnload", function () {
            return {
                restrict: 'E',
                templateUrl: "src/directives/image-onload/",
                scope: {
                    src: "=src",
                    classes: "=?classes",
                    classesText: "=?classesText"
                },
                link: function(scope, element) {
                    scope.load = false;
                    scope.$watch('src', function() {
                        scope.load = false;
                    });
                    element.find("img").bind('load', function() {
                        scope.$apply(function() {
                            scope.load = true;
                        });
                    });
                }
            };
    });
})();