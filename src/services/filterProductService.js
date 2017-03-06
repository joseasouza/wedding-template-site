/**
 * Created by victor on 02/03/17.
 */
(() => {

    function isFilteredByCategory(product, category, model) {
        return containsTag(product, category) && model;
    }

    function containsTag(product, tag) {
        return product.tags.indexOf(tag) >= 0;
    }

    var app = angular.module("app");
    app.service("filterProductService", FilterProductService);

    function FilterProductService() {
        this.containsTag = containsTag;
        this.search = "";
        this.filterTags = {
            buyFromInternet: false,
            buyLocal: false,
            brideFav: false,
            groomFav: false,
            chipIn: false,
            householdAppliance: false,
            furnitures: false,
            kitchen: false,
            livingRoom: false,
            room: false
        };

    }

    function filterByCategory(filterProductService) {
        return (values) =>  values.filter((product) => {
                return isFilteredByCategory(product, Categories.BUY_FROM_INTERNET.id, filterProductService.filterTags.buyFromInternet)
                    || isFilteredByCategory(product, Categories.BUY_LOCAL.id, filterProductService.filterTags.buyLocal)
                    || isFilteredByCategory(product, Categories.BRIDE_FAV.id, filterProductService.filterTags.brideFav)
                    || isFilteredByCategory(product, Categories.GROOM_FAV.id, filterProductService.filterTags.groomFav)
                    || isFilteredByCategory(product, Categories.CHIP_IN.id, filterProductService.filterTags.chipIn)
                    || isFilteredByCategory(product, Categories.HOUSEHOLD_APPLIANCE.id, filterProductService.filterTags.householdAppliance)
                    || isFilteredByCategory(product, Categories.FURNITURES.id, filterProductService.filterTags.furnitures)
                    || isFilteredByCategory(product, Categories.KITCHEN.id, filterProductService.filterTags.kitchen)
                    || isFilteredByCategory(product, Categories.LIVING_ROOM.id, filterProductService.filterTags.livingRoom)
                    || isFilteredByCategory(product, Categories.ROOM.id, filterProductService.filterTags.room)
                    || !filterProductService.filterTags.buyLocal && !filterProductService.filterTags.buyFromInternet && !filterProductService.filterTags.brideFav
                    && !filterProductService.filterTags.groomFav && !filterProductService.filterTags.chipIn && !filterProductService.filterTags.householdAppliance
                    && !filterProductService.filterTags.furnitures && !filterProductService.filterTags.kitchen && !filterProductService.filterTags.livingRoom
                    && !filterProductService.filterTags.room;
            });
    }
    filterByCategory.$inject = ['filterProductService'];

    function filterByPrice() {
        function filterFn(values) {
            return values.filter((product) => {
                var slider = document.getElementById('range');
                var priceRange = slider.noUiSlider.get();
                var productCost = Number(product.cost);
                return productCost >= Number(priceRange[0]) && productCost < Number(priceRange[1]);
            });
        }
        return filterFn;
    }
    app.filter("filterByCategory", filterByCategory);
    app.filter("filterByPrice", filterByPrice);
})();