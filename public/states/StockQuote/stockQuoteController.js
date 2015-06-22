visualization.controller('StockQuoteController', ['$scope', '$rootScope', 'SuperModelService', 'StockQuoteService', '$http', '$q', '$timeout',
    function($scope, $rootScope, SuperModelService, StockQuoteService, $http, $q, $timeout) {
        'use strict';
        //Google Stock Quote
        $scope.GSQ = null;
        $scope.YSQ = null;
        $scope.YSN = null;
        $scope.symbolQuote = null;
        $scope.stockInfo = undefined;

        var Stocks = [];
        $scope.getStock = function(val) {
            var url = [
                "http://d.yimg.com/autoc.finance.yahoo.com/autoc?",
                "query=" + val,
                "&callback=YAHOO.Finance.SymbolSuggest.ssCallback"];
            var YAHOO = window.YAHOO = {Finance: {SymbolSuggest: {}}};
            YAHOO.Finance.SymbolSuggest.ssCallback = function(response) {
                function returnMap(item) {
                    return {
                        label: item.name + " - " + item.symbol + " (" + item.exchDisp + ")",
                        name: item.name,
                        symbol: item.symbol,
                        exchange: item.exch
                    };
                }
                Stocks = response.ResultSet.Result.map(returnMap);
            };
            $http.jsonp(url.join(""));

            return Stocks;
        };

        $scope.selectedStock = function(model){
            $scope.stockInfo = model;
            SuperModelService.setStockQuote(model);
        };
    }
]);