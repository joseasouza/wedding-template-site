/**
 * Created by victor on 12/01/17.
 */
(function () {
    var app = angular.module('app');
    app.controller("GiftListController", ['$http','$window', '$scope', 'firebaseService', function($http, $window, $scope,
        firebaseService) {
        //TODO needs refatoration
        this.loading = true;
        this.products = [];
        this.showFilterButton = false;
        this.search = "";
        this.filterTags = {
            buyFromInternet : false,
            buyLocal : false,
            brideFav : false,
            groomFav : false,
            chipIn : false,
            householdAppliance : false,
            furnitures : false,
            kitchen : false,
            livingRoom : false,
            room : false
        };
        this.costRange = [0, 1000];
        this.orderByBridGroomFav = orderByBridGroomFav;
        this.filterByCategory = filterByCategory;
        this.filterByPrice = filterByPrice;
        this.showModal = false;
        this.clickItem = clickItem;
        this.containsTag = containsTag;
        this.categories = Categories;
        this.categoriesArray = CategoriesArray;
        this.selectedProduct = {tags: []};
        var ctrl = this;

        firebaseService.onSelect("/products/", function(products) {
            ctrl.products = products;
            ctrl.loading = false;
            loadProductImages();
        });

        $scope.$watch('giftListCtrl.loading', function(newValue) {
            ctrl.loading = newValue;
        });

        $scope.$watch('giftListCtrl.products', function(newValue) {
            ctrl.products = newValue;
        });

        var slider = document.getElementById('range');
        noUiSlider.create(slider, {
            start: ctrl.costRange,
            connect: true,
            step: 1,
            range: {
                'min': ctrl.costRange[0],
                'max': ctrl.costRange[1]
            },
            format: wNumb({
                decimals: 0
            })
        });

        angular.element($window).bind("scroll", function() {
            var navWrap = $('#search').offset().top;
            var result = this.pageYOffset >= navWrap - 300;
            if($scope.giftListCtrl.showFilterButton != result) {
                $scope.giftListCtrl.showFilterButton = result;
                $scope.$digest();
            }
        });

        function filterByCategory(product) {
            return isFilteredByCategory(product, Categories.BUY_FROM_INTERNET.id, ctrl.filterTags.buyFromInternet)
                || isFilteredByCategory(product, Categories.BUY_LOCAL.id, ctrl.filterTags.buyLocal)
                || isFilteredByCategory(product, Categories.BRIDE_FAV.id, ctrl.filterTags.brideFav)
                || isFilteredByCategory(product, Categories.GROOM_FAV.id, ctrl.filterTags.groomFav)
                || isFilteredByCategory(product, Categories.CHIP_IN.id, ctrl.filterTags.chipIn)
                || isFilteredByCategory(product, Categories.HOUSEHOLD_APPLIANCE.id, ctrl.filterTags.householdAppliance)
                || isFilteredByCategory(product, Categories.FURNITURES.id, ctrl.filterTags.furnitures)
                || isFilteredByCategory(product, Categories.KITCHEN.id, ctrl.filterTags.kitchen)
                || isFilteredByCategory(product, Categories.LIVING_ROOM.id, ctrl.filterTags.livingRoom)
                || isFilteredByCategory(product, Categories.ROOM.id, ctrl.filterTags.room)
                || !ctrl.filterTags.buyLocal && !ctrl.filterTags.buyFromInternet && !ctrl.filterTags.brideFav
                    && !ctrl.filterTags.groomFav && !ctrl.filterTags.chipIn && !ctrl.filterTags.householdAppliance
                    && !ctrl.filterTags.furnitures && !ctrl.filterTags.kitchen && !ctrl.filterTags.livingRoom
                    && !ctrl.filterTags.room;
        }

        function containsTag(product, tag) {
            return product.tags.indexOf(tag) >= 0;
        }

        function isFilteredByCategory(product, category, model) {
            return containsTag(product, category) && model;
        }

        function filterByPrice(product) {
            var priceRange = slider.noUiSlider.get();
            var productCost = Number(product.cost);
            return productCost >= Number(priceRange[0])&& productCost < Number(priceRange[1]);

        }

        function orderByBridGroomFav(product) {
            var order = 0;
            if (containsTag(product, Categories.BRIDE_FAV.id)) {
                order += 2;
            }

            if (containsTag(product, Categories.GROOM_FAV.id)) {
                order++;
            }

            return -order;
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

        $("#filterGiftsBtn").sideNav({
            menuWidth: 300,
            edge: 'right',
            draggable: false,
            closeOnClick: false
        });

        slider.noUiSlider.on("update", function() {
            var valor = "De R$" + slider.noUiSlider.get()[0] + ",00 até R$" + slider.noUiSlider.get()[1] + ",00";
            $("#valor-range").html(valor);
        });
        slider.noUiSlider.on("change", function() {
            ctrl.costRange = slider.noUiSlider.get();
            $scope.$digest();
        });

        $('.modal').modal();
        $('.collapsible').collapsible();

    }]);

})();
