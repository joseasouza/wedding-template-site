/**
 * Created by victor on 31/01/17.
 */
(function() {
    var app = angular.module("app");
    app.service("firebaseService", function() {

        this.select = select;
        this.downloadUrl = downloadUrl;
        this.isLogged = isLogged;
        this.doLogin = doLogin;
        this.doLogout = doLogout;
        this.saveProduct = saveProduct;
        this.onAuthStateChanged = onAuthStateChanged;
        this.onSelect = onSelect;
        this.uploadProductImage = uploadProductImage;

        var config = {
            apiKey: "AIzaSyAJXzWi0VDsHL5ZgYqcnQ-zBxHjkAFZXAg",
            authDomain: "wedding-list-site.firebaseapp.com",
            databaseURL: "https://wedding-list-site.firebaseio.com",
            storageBucket: "wedding-list-site.appspot.com",
            messagingSenderId: "271294057376"
        };
        firebase.initializeApp(config);
        var auth = firebase.auth();
        var database = firebase.database();
        var storage = firebase.storage();

        function onAuthStateChanged(fn) {
            auth.onAuthStateChanged(fn);
        }

        function select(path) {
            return database.ref(path).once("value");
        }

        function onSelect(path, fnOnSelect) {
            var productsRef = database.ref(path);
            productsRef.on("value", function(snapshot) {
                var products = [];
                $.each(snapshot.val(), function(key, product) {
                    product.id = key;
                    products.push(product);
                });
                fnOnSelect(products);
            });
        }

        function uploadProductImage(product, newImage, fnError, fnSuccess) {

            if (newImage == null) {
                fnSuccess(product.image);
            } else {

                var storageRef = storage.ref("products/");
                var key = database.ref().child('/products/').push().key;
                var fileName = key + newImage.name.substr(newImage.name.indexOf('.'));
                var previousFileName = product.image;
                var imageProductRef = storageRef.child(fileName);
                var previousImageRef = storageRef.child(previousFileName);

                var afterTryDelete = function () {
                    imageProductRef.put(newImage)
                        .on('state_changed', function () {
                            },
                            fnError, function () {
                                fnSuccess(fileName);
                            }
                        )
                };
                if (product.image) {
                    previousImageRef.delete()
                        .then(afterTryDelete)
                        .catch(afterTryDelete);
                } else {
                    afterTryDelete();
                }
            }

        }

        function saveProduct(product, newImage, fnOnFinish) {
            var key = product.id;
            var isEdit = key != null && key !== "";
            //todo needs to be refactored
            var valueToBeSaved = angular.copy(product);
            delete valueToBeSaved.id;
            if (isEdit) {
                uploadProductImage(product, newImage, function(error){
                    console.log(error);
                }, function(image) {
                    valueToBeSaved.image = image;
                    database.ref("/products/" + key).set(valueToBeSaved, fnOnFinish);
                });
            } else {
                key = database.ref().child('/products/').push().key;
                uploadProductImage(product, newImage, function(error){
                    console.log(error);
                }, function(image) {
                    valueToBeSaved.image = image;
                    var newProduct = {};
                    newProduct[key] = valueToBeSaved;
                    database.ref("/products/").update(newProduct, fnOnFinish);
                });

            }

        }

        function downloadUrl(path, child) {
            return storage.ref(path).child(child).getDownloadURL();
        }

        function isLogged() {
            return auth.currentUser != null;
        }

        function doLogin(email, password) {
            return auth.signInWithEmailAndPassword(email, password);
        }

        function doLogout(fnSuccess, fnFail) {
            auth.signOut().then(fnSuccess, fnFail);
        }

    });
})();