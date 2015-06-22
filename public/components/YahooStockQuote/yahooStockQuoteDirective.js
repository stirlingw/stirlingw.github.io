
visualization.directive('yahooStockQuoteDirective',['$http', 'YahooStockQuoteService', 'SuperModelService',function($http, YahooStockQuoteService, SuperModelService) {
    'use strict';
    return {
        restrict: 'E',
        templateUrl: './components/YahooStockQuote/yahooStockQuoteView.html',
        scope: {},
        replace: true,
        controller: function(){},
        link: function (scope, element, attrs) {
            scope.$watch(function () {
                return SuperModelService.getStockQuote();
            },
            function (quote) {
                if (quote !== null && typeof quote !== 'undefined') {
                    YahooStockQuoteService.getYahooStockQuote(quote.symbol)
                        .then(function(data){
                            scope.YSQ = data.data.query.results.quote;
                            ///console.log(data.data.query.results.quote);
                        });
                }
            });
        }
    };
}]);