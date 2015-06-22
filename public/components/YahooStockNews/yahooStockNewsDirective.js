visualization.directive('yahooStockNewsDirective',['$http', 'YahooStockNewsService', 'SuperModelService',function($http, YahooStockNewsService, SuperModelService) {
    'use strict';
    return {
        restrict: 'E',
        templateUrl: './components/YahooStockNews/yahooStockNewsView.html',
        scope: {},
        replace: true,
        controller: function(){},
        link: function (scope, element, attrs) {
            scope.$watch(function () {
                return SuperModelService.getStockQuote();
            },
            function (quote) {
                if (quote !== null && typeof quote !== 'undefined') {
                    YahooStockNewsService.getYahooStockNews(quote.symbol)
                        .then(function(data){
                            scope.YSN = data.data.query.results.a;
                        });
                }
            });
        }
    };
}]);