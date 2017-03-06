/**
 * Created by victor on 02/03/17.
 */

import "src/services/filterProductService.js";

(function () {

    'use strict';
    var app = angular.module('appGiftList');
    app.controller("FilterNavController", FilterNavController);
    FilterNavController.$inject = ['$window', '$scope', 'filterProductService'];
    function FilterNavController($window, $scope, filterProductService) {
        this.showFilterButton = false;
        this.filterService = filterProductService;
        this.categoriesArray = CategoriesArray;
        this.costRange = [0, 2000];
        var ctrl = this;

        angular.element($window).bind("scroll", function () {
            var navWrap = $('#search').offset().top;
            var result = this.pageYOffset >= navWrap - 300;
            if (ctrl.showFilterButton != result) {
                ctrl.showFilterButton = result;
                $scope.$digest();
            }
        });

        $("#filterGiftsBtn").sideNav({
            menuWidth: 300,
            edge: 'right',
            draggable: false,
            closeOnClick: false
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
        slider.noUiSlider.on("update", function () {
            var valor = "From $" + slider.noUiSlider.get()[0] + ".00 to R$" + slider.noUiSlider.get()[1] + ".00";
            $("#valor-range").html(valor);
        });
        slider.noUiSlider.on("change", function () {
            ctrl.costRange = slider.noUiSlider.get();
            $scope.$apply();
        });
    }
})();