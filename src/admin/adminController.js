/**
 * Created by victor on 26/01/17.
 */

(function () {
    var app = angular.module('appAdmin');
    app.controller("AdminController", ['$http', 'firebaseService', '$scope', '$state' , '$timeout',
    function($http, firebaseService, $scope, $state, $timeout) {
        var ctrl = this;
        this.showModal = false;
        this.categoriesList = CategoriesArray;
        this.loading = true;
        this.search = "";
        this.clickItem = clickItem;
        this.submit = submit;
        this.selectedProductContainsCategory = selectedProductContainsCategory;
        this.newProduct = newProduct;
        this.selectedProduct = new Product();
        this.selectedId = "";
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
            firebaseService.saveProduct(ctrl.selectedProduct, ctrl.selectedProductId);
            ctrl.showModal = false;
        }

        function newProduct() {
            ctrl.selectedProduct = new Product();
            ctrl.selectedProductId = null;
            ctrl.showModal = true;
        }

        function selectedProductContainsCategory(category) {
            return ctrl.selectedProduct.tags.indexOf(category.id) > -1;
        }

        function loadProductImages() {
            ctrl.products.forEach(function(product) {
                firebaseService.downloadUrl("/products/", product.image).then(function(url) {
                    product.image_url = url;
                    $scope.$digest();
                });
            });
        }

        function clickItem(product, id) {
            ctrl.selectedProduct = product;
            ctrl.selectedProductId = id;
            ctrl.showModal = true;
            $timeout(function() {
                Materialize.updateTextFields();
            });

        }

        $('.modal').modal();

    }]);

    var Product = function() {
        this.tags = [];
        this.whereBuy =[];
        this.name = "";
        this.image = "";
        this.amount = 1;
        this.cost = 0.0;
    }

})();
