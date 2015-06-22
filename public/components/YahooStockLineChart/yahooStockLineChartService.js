visualization.service('YahooStockLineChartService', ['$http',
    function($http) {
        'use strict';
        var Service = {};

        Service.getYahooStockChart = function(symbol, start_date, end_date){
            //var start_date = '2009-09-11';
            //var end_date = '2010-03-10';
            var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22"+symbol+"%22%20and%20startDate%20%3D%20%22"+start_date+"%22%20and%20endDate%20%3D%20%22"+end_date+"%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK";
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