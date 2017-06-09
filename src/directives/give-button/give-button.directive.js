(() => {
    var app = angular.module("appGiftList");

    var GiveButtonController = function(firebaseService, $scope) {
        $('#modal-rsvp').modal();
        this.name = "";
        $scope.show = false;
        this.loading = false;
        var _this = this;
        this.submit = () => {
            _this.loading = true;
            $scope.show = false;
            Materialize.toast("'" + this.name + "' confirm gift!", 30000);
        };
    };

    app.controller("GiveButtonController", ['firebaseService', '$scope', GiveButtonController]);
    app.directive("giveButton", () => {
        return {
            restrict: 'E',
            templateUrl: "/src/directives/give-button/",
            controllerAs: "ctrl",
            scope: {
                show: '=show'
            },
            controller: "GiveButtonController"
        };
    });

})();