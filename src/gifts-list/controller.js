/**
 * Created by victor on 12/01/17.
 */
(function () {
    var app = angular.module('app');
    app.controller("GiftListController", ['$http','$window', '$scope', function($http, $window, $scope) {
        //TODO needs refatoration
        this.products = [];
        this.showFilterButton = false;
        this.search = "";
        this.buyFromInternet = false;
        this.buyLocal = false;
        this.brideFav = false;
        this.groomFav = false;
        this.chipIn = false;
        this.householdAppliance = false;
        this.furnitures = false;
        this.kitchen = false;
        this.livingRoom = false;
        this.room = false;
        this.costRange = [0, 1000];
        this.filterByCategory = filterByCategory;
        this.filterByPrice = filterByPrice;
        this.showModal = false;
        this.clickItem = clickItem;
        this.containsTag = containsTag;
        this.categories = Categories;
        this.selectedProduct = {tags: []};
        var ctrl = this;

        $http.get("/products.json").then(function(data) {
            ctrl.products = data.data;
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
                $scope.$apply();
            }
        });

        function filterByCategory(product) {
            return isFilteredByCategory(product, Categories.BUY_FROM_INTERNET, ctrl.buyFromInternet)
                || isFilteredByCategory(product, Categories.BUY_LOCAL, ctrl.buyLocal)
                || isFilteredByCategory(product, Categories.BRIDE_FAV, ctrl.brideFav)
                || isFilteredByCategory(product, Categories.GROOM_FAV, ctrl.groomFav)
                || isFilteredByCategory(product, Categories.CHIP_IN, ctrl.chipIn)
                || isFilteredByCategory(product, Categories.HOUSEHOLD_APPLIANCE, ctrl.householdAppliance)
                || isFilteredByCategory(product, Categories.FURNITURES, ctrl.furnitures)
                || isFilteredByCategory(product, Categories.KITCHEN, ctrl.kitchen)
                || isFilteredByCategory(product, Categories.LIVING_ROOM, ctrl.livingRoom)
                || isFilteredByCategory(product, Categories.ROOM, ctrl.room)
                || !ctrl.buyLocal && !ctrl.buyFromInternet && !ctrl.brideFav
                    && !ctrl.groomFav && !ctrl.chipIn && !ctrl.householdAppliance
                    && !ctrl.furnitures && !ctrl.kitchen && !ctrl.livingRoom
                    && !ctrl.room;
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
            $scope.$apply();
        });

        $('.modal').modal();
        $('.collapsible').collapsible();

    }]);

})();
