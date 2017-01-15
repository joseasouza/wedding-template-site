/**
 * Created by victor on 12/01/17.
 */
(function () {
    var app = angular.module('app');
    app.controller("GiftListController", ['$http','$window', '$scope', function($http, $window, $scope) {
        this.products = [];
        this.showFilterButton = false;
        this.search = "";
        this.buyFromInternet = false;
        this.buyLocal = false;
        this.costRange = [0, 1000];
        this.filterByCategory = filterByCategory;
        this.filterByPrice = filterByPrice;
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
            var result = this.pageYOffset >= navWrap - 160;
            if($scope.giftListCtrl.showFilterButton != result) {
                $scope.giftListCtrl.showFilterButton = result;
                $scope.$apply();
            }
        });

        function filterByCategory(product) {
            return product.tags.indexOf("buy-from-internet") >= 0 && ctrl.buyFromInternet
                || product.tags.indexOf("buy-local") >= 0 && ctrl.buyLocal
                || !ctrl.buyLocal && !ctrl.buyFromInternet;
        }

        function filterByPrice(product) {
            var priceRange = slider.noUiSlider.get();
            var productCost = Number(product.cost);
            return productCost >= Number(priceRange[0])&& productCost < Number(priceRange[1]);

        }

        $("#filterGiftsBtn").sideNav({
            menuWidth: 300,
            edge: 'right',
            draggable: false,
            closeOnClick: false
        });

        slider.noUiSlider.on("update", function() {
            var valor = "R$" + slider.noUiSlider.get()[0] + ",00 até R$" + slider.noUiSlider.get()[1] + ",00";
            $("#valor-range").html(valor);
        });
        slider.noUiSlider.on("change", function() {
            ctrl.costRange = slider.noUiSlider.get();
            $scope.$apply();
        });

    }]);

})();
