visualization.service('GoogleStockQuoteService', ['$http',
    function($http) {
        'use strict';
        var Service = {};

        Service.getGoogleStockQuote = function(exchange, symbol) {
            if(exchange !== undefined){
                var url = "http://finance.google.com/finance/info?client=ig&q="+ exchange +":"+ symbol +"&callback=JSON_CALLBACK";
                var callback = $http.jsonp(url);
                return callback;
            }
        };

        return Service;
    }
]);