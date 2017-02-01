/**
 * Created by victor on 26/01/17.
 */

(function () {
    var app = angular.module('appAdmin');
    app.controller("AdminController", ['$http', 'firebaseService', '$scope', '$state', function($http, firebaseService,
                                                                                                $scope, $state) {
        var ctrl = this;
        this.showModal = false;
        this.loading = true;
        this.search = "";
        this.clickItem = clickItem;
        this.submit = submit;
        this.selectedProduct = { tags: []};
        this.products = [];

        firebaseService.onAuthStateChanged(function() {
            if (firebaseService.isLogged()) {
                firebaseService.select("/products/").then(function(snapshot) {
                    ctrl.products = snapshot.val();
                    ctrl.loading = false;
                    $scope.$digest();
                    loadProductImages();
                });
                $scope.$digest();


            } else {
                $state.go('login');
            }

        });

        function submit() {

        }

        function loadProductImages() {
            ctrl.products.forEach(function(product) {
                firebaseService.downloadUrl("/products/", product.image).then(function(url) {
                    product.image_url = url;
                    $scope.$digest();
                });
            });
        }

        function clickItem(product) {
            ctrl.selectedProduct = product;
            ctrl.showModal = true;
        }

        $('.modal').modal();

    }]);

})();
