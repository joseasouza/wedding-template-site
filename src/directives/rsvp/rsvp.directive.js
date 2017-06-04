(() => {
    var app = angular.module("appGiftList");

    var RSVPController = function(firebaseService) {
        $('#modal-rsvp').modal();
        this.name = "";
        this.loading = false;
        var _this = this;
        this.submit = () => {
            _this.loading = true;
            firebaseService.confirmGuest(_this.name, () => {
                localStorage.setItem("convidado", _this.name);
                $("#modal-rsvp").modal("close");
                Materialize.toast("'" + this.name + "' presence was successfully confirmed!", 30000);
                $("#rsvpConfirm").addClass("disabled");
                $("#rsvpConfirm span").html("Confirmed Presence!");
                _this.loading = false;

            });

        };

        if (localStorage.getItem("convidado")) {
            $("#rsvpConfirm").addClass("disabled");
            $("#rsvpConfirm span").html("Confirmed Presence!");
        }
    };

    app.controller("RSVPController", ['firebaseService', RSVPController]);
    app.directive("rsvp", () => {
        return {
            restrict: 'E',
            templateUrl: "/src/directives/rsvp/",
            controllerAs: "ctrl",
            controller: "RSVPController"
        };
    });

})();