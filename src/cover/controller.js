/**
 * Created by victor on 03/06/17.
 */
(function () {

    'use strict';
    var app = angular.module('appGiftList');
    app.controller("CoverController", CoverController);
    CoverController.$inject = ['$interval'];

    function CoverController($interval) {

        var images = [
            

            { "background-image"      : "url(/src/images/cover_0.jpg",
              "background-position-y" : "30%"                    },

            { "background-image"      : "url(/src/images/cover_1.jpg",
              "background-position-y" : "22%"                    },

            { "background-image"      : "url(/src/images/cover_2.jpg",
              "background-position-y" : "0%"                    },

            { "background-image"      : "url(/src/images/cover_3.jpg",
              "background-position-y" : "75%"                    }

        ];

        let pickAnImage = () => {
            let imageChoosen = Math.floor(Math.random() * images.length);
            return images[imageChoosen]
        };
        var ctrl = this;
        this.backgroundImage =  pickAnImage();

        $interval(() => {
            ctrl.backgroundImage = pickAnImage();
        }, 30000);
    };

})();
