/**
 * Created by victor on 26/01/17.
 */

//todo refatorar. Colocar o fomrulario para ser em um controller diferente
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
        this.categoryCheckedChange = categoryCheckedChange;
        this.selectedProduct = new Product();
        this.selectedId = "";
        this.products = [];
        firebaseService.onAuthStateChanged(function() {
            if (firebaseService.isLogged()) {
                firebaseService.onSelect("/products/", function(snapshot) {
                    ctrl.products = snapshot.val();
                    ctrl.loading = false;
                    loadProductImages();
                });
                $scope.$digest();


            } else {
                $state.go('login');
            }

        });

        $scope.$watch('adminCtrl.loading', function(newValue) {
            ctrl.loading = newValue;
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

        function categoryCheckedChange(category) {
            var isSelectedProductContainsCategory = selectedProductContainsCategory(category);
            var isChecking = $("#" + category.id).attr("checked") !== "checked";
            if (isChecking && !isSelectedProductContainsCategory) {
                ctrl.selectedProduct.tags.push(category.id);
            } else {
                var index = ctrl.selectedProduct.tags.indexOf(category.id);
                if (index > -1) {
                    ctrl.selectedProduct.tags.splice(index, 1);
                }
            }

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


    //Refatorar colocar product para ser em um outro javascript
    var Product = function() {
        this.tags = [];
        this.whereBuy =[];
        this.name = "";
        this.image = "";
        this.amount = 1;
        this.cost = 0.0;
    }

})();
