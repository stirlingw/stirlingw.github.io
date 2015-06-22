visualization.service('StockQuoteService', ['$http','$q',
    function( $http, $q) {
        'use strict';
        var Service = {};

        Service.getStockQuote = function(exchange, symbol) {
            if(exchange !== undefined){
                var input = 'input=' + symbol + '&callback=JSON_CALLBACK';
                var url = 'http://dev.markitondemand.com/api/v2/Lookup/jsonp?' + input;
                return $http.jsonp(url);
            }
        };

        return Service;
    }
]);