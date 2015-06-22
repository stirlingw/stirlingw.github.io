visualization.service('MarkItStockQuoteService', ['$http',
    function($http) {
        'use strict';
        var Service = {};

        Service.getMarkItStockQuote = function(symbol) {
            var url = "http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol="+ symbol +"&callback=JSON_CALLBACK";
            var promise = $http.jsonp(url)
                .success(function(data){
                    return data;
                }).error(function(data, status) {
                    console.info(data);
                });
            return promise;
        };

        return Service;
    }
]);