visualization.directive('markItStockQuoteDirective',['$http', 'MarkItStockQuoteService','SuperModelService',function($http, MarkItStockQuoteService, SuperModelService) {
    'use strict';
    return {
        restrict: 'E',
        templateUrl: './components/MarkItStockQuote/markItStockQuoteView.html',
        scope: {},
        replace: true,
        controller: function(){},
        link: function (scope, element, attrs) {
            scope.$watch(function () {
                return SuperModelService.getStockQuote();
            },
            function (quote) {
                if (quote !== null && typeof quote !== 'undefined') {
                    MarkItStockQuoteService.getMarkItStockQuote(quote.symbol)
                        .then(function(data){
                            scope.MSQ = data.data;
                            scope.stock = quote;
                        });
                }
            });
        }
    };
}]);