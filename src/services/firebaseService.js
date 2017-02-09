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
        this.saveProduct = saveProduct;
        this.onAuthStateChanged = onAuthStateChanged;

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

        function saveProduct(product, id) {
            var isEdit = id != null && id !== "";

            if (isEdit) {
                database.ref("/products/" + id).set(product);
            } else {
                var id = database.ref().child('/products/').push().key;
                var newProduct = {};
                newProduct[id] = product;
                database.ref("/products/").update(newProduct);
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

    });
})();