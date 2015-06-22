visualization.service('SuperModelService', ['$http','$q',
    function( $http, $q) {
        'use strict';
        var Service = {};
        var stockQuote = null;

        Service.setStockQuote = function(stock){
            stockQuote = stock;
        };

        Service.getStockQuote = function(){
            return stockQuote;
        };

        return Service;
    }
]);