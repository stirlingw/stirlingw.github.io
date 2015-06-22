visualization.service('YahooStockNewsService', ['$http',
    function($http) {
        'use strict';
        var Service = {};

        Service.getYahooStockNews = function(symbol){
            var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Ffinance.yahoo.com%2Fq%3Fs%3D"+symbol+"'%20and%20xpath%3D'%2F%2Fdiv%5B%40id%3D%22yfi_headlines%22%5D%2Fdiv%5B2%5D%2Ful%2Fli%2Fa'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK";
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