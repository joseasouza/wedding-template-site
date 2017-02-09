/**
 * Created by victor on 17/01/17.
 */
var Categories = {
    HOUSEHOLD_APPLIANCE: {id: "household-appliance", name: "Household Appliance", showInAdminModal: true},
    KITCHEN: {id: "kitchen", name: "Kitchen", showInAdminModal: true},
    FURNITURES: {id: "furnitures", name: "Furnitures", showInAdminModal: true},
    BRIDE_FAV: {id: "bride-favorites", name: "Bride Favs", showInAdminModal: true},
    GROOM_FAV: {id: "groom-favorites", name: "Groom Favs", showInAdminModal: true},
    BUY_FROM_INTERNET: {id: "buy-from-internet", name: "Buy From Internet", showInAdminModal: false},
    BUY_LOCAL: {id: "buy-local", name: "Buy in City", showInAdminModal: false},
    LIVING_ROOM: {id: "living-rooom", name: "Living Room", showInAdminModal: true},
    ROOM: {id: "room", name: "Room", showInAdminModal: true},
    CHIP_IN: {id: "CHIP_IN", name: "Chip in", showInAdminModal: false},
};

var CategoriesArray = Object.keys(Categories).map(function(key) {
    return Categories[key];
});