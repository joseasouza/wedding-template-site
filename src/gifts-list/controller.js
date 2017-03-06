/**
 * Created by victor on 12/01/17.
 */
import "src/services/filterProductService";
import "src/directives/buy-submit/buySubmit.js";

(function () {

    'use strict';
    var app = angular.module('appGiftList');
    app.controller("GiftListController", GiftListController);
    GiftListController.$inject = ['$window', '$scope', 'firebaseService', 'filterProductService'];

    function GiftListController($window, $scope, firebaseService, filterProductService) {
        //TODO needs refatoration
        this.loading = true;
        this.products = [];
        this.orderByBridGroomFav = orderByBridGroomFav;
        this.showModal = false;
        this.clickItem = clickItem;
        this.categories = Categories;
        this.selectedProduct = {tags: []};
        this.filterProductService = filterProductService;
        var ctrl = this;

        firebaseService.getProducts().then((products) => {
            ctrl.products = products;
            ctrl.loading = false;
            loadProductImages();
        });

        $scope.$watch('giftListCtrl.loading', function (newValue) {
            ctrl.loading = newValue;
        });

        $scope.$watch('giftListCtrl.products', function (newValue) {
            ctrl.products = newValue;
        });


        function orderByBridGroomFav(product) {
            var order = 0;
            if (filterProductService.containsTag(product, Categories.BRIDE_FAV.id)) {
                order += 2;
            }

            if (filterProductService.containsTag(product, Categories.GROOM_FAV.id)) {
                order++;
            }

            return -order;
        }

        function loadProductImages() {
            ctrl.products.forEach(function (product) {
                firebaseService.getProductImageUrl(product.image).then(function (url) {
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
        $('.collapsible').collapsible();

    };

})();
