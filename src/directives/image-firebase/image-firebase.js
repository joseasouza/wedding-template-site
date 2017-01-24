(function () {
    var app = angular.module("app");

    var ImageFireBaseController = function($scope) {
        var storage = firebase.storage();

        storage.ref("/products/").child($scope.url).getDownloadURL().then(function(url) {
            $scope.src = url;
            $scope.$digest();
        });

    };
    app.controller("ImageFireBaseController", ['$scope', ImageFireBaseController]);

    app.directive("imageFirebase", function () {
        return {
            restrict: 'E',
            templateUrl: "/src/directives/image-firebase/",
            scope: {
                url: '=url',
                classes: '=?classes'
            },
            link: function(scope, element) {
                scope.load = false;
                $(element).find("img").bind('load', function() {
                    scope.$apply(function() {
                        scope.load = true;
                    });
                })
            },
            controller: "ImageFireBaseController"
        };
    });
})();