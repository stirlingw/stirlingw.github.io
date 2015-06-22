
visualization.service('YahooStockQuoteService', ['$http',
    function($http) {
        'use strict';
        var Service = {};

        Service.getYahooStockQuote = function(symbol) {
            var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20in%20(%22"+symbol+"%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK";
            var promise = $http.jsonp(url)
                .success(function(data){
                    return data;
                }).error(function(data, status) {
                    return data;
                });
            return promise;
        };

        return Service;
    }
]);