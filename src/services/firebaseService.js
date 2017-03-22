/**
 * Created by victor on 31/01/17.
 */
(() => {
    var app = angular.module("app");
    app.service("firebaseService", FirebaseService);

    FirebaseService.$inject = ['$q'];
    function FirebaseService($q) {

        var config = {
            apiKey: "AIzaSyBnqUxDr7mWiE632cUyT7X9OKQ5hXiLrdM",
            authDomain: "casamento-dayana-victor.firebaseapp.com",
            databaseURL: "https://casamento-dayana-victor.firebaseio.com",
            storageBucket: "casamento-dayana-victor.appspot.com",
            messagingSenderId: "348646068907"
        };

        firebase.initializeApp(config);
        var auth = firebase.auth();
        var database = firebase.database();
        var storage = firebase.storage();

        this.saveProduct = saveProduct;
        this.getProducts = getProducts;

        this.isLogged = () => auth.currentUser != null;
        this.doLogin = (email, password) => auth.signInWithEmailAndPassword(email, password);
        this.doLogout = () => auth.signOut();
        this.onAuthStateChanged = (fn) => auth.onAuthStateChanged(fn);
        this.getProductImageUrl = (productImageName) => storage.ref("/products/").child(productImageName).getDownloadURL();


        function getProducts() {
            var productsRef = database.ref("/products/");
            var deferred = $q.defer();
            productsRef.on("value", (snapshot) => {
                var products = [];
                var snapshotValue = snapshot.val();
                Object.keys(snapshotValue).forEach((key) => {
                    var product = snapshotValue[key];
                    product.id = key;
                    products.push(product);
                });
                deferred.resolve(products);
            });

            return deferred.promise;
        }

        function saveProduct(product, newImage, fnOnFinish) {
            var key = product.id;
            var isEdit = key != null && key !== "";
            var valueToBeSaved = angular.copy(product);
            delete valueToBeSaved.id;

            if (isEdit) {
                uploadProductImage(product, newImage, (error) => {
                    console.log(error);
                }, (image) => {
                    valueToBeSaved.image = image;
                    database.ref("/products/" + key).set(valueToBeSaved, fnOnFinish);
                });
            } else {
                key = database.ref().child('/products/').push().key;
                uploadProductImage(product, newImage, (error) => console.log(error), (image) => {
                    valueToBeSaved.image = image;
                    var newProduct = {};
                    newProduct[key] = valueToBeSaved;
                    database.ref("/products/").update(newProduct, fnOnFinish);
                });

            }

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

                var afterTryDelete = () => {
                    imageProductRef.put(newImage)
                        .on('state_changed', () => {
                        }, fnError, () => fnSuccess(fileName));
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

    }

})();