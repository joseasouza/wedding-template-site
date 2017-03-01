/**
 * Created by victor on 17/01/17.
 */
var categories = require("Categories");
module.exports = Object.keys(categories).map(function(key) {
    return categories[key];
});