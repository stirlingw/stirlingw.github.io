visualization.controller('StockPortfolioController', ['$scope', '$rootScope', 'StockPortfolioService', 'YahooStockQuoteService', '$http',
    function($scope, $rootScope, StockPortfolioService, YahooStockQuoteService, $http) {
        'use strict';
        //Google Stock Quote
        $scope.GSQ = null;
        $scope.YSQ = null;
        $scope.YSN = null;
        $scope.symbolQuote = null;
        $scope.modalError = null;

        //still to implement (maybe)
        //http://codepen.io/alexerlandsson/pen/YXXzLR

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
            //$scope.stockInfo = model;
            YahooStockQuoteService.getYahooStockQuote(model.symbol)
                .then(function(data){
                    var stock = data.data.query.results.quote;
                    $scope.stockInfo = {
                        name: stock.Name,
                        symbol: stock.Symbol,
                        exchange: stock.StockExchange,
                        purchased_value: stock.LastTradePriceOnly,
                        current_value: stock.LastTradePriceOnly,
                        shares: 0
                    };
                });
        };

        $scope.submitForm = function () {
            if($scope.stockInfo == undefined) {
                $scope.modalError = "You must choose a stock & add shares before adding a stock"
            }else if($scope.stocks.shareSum + $scope.stockInfo.shares >= 100000 && $scope.stocks.stocks.length <= 25 ) {
                $scope.modalError = null;
                $scope.stocks = StockPortfolioService.saveStock($scope.stocks, $scope.stockInfo);
                $('#myModal').modal('toggle');
                $scope.stockInfo = {};
                $scope.stock = {};
            }else if($scope.stocks.shareSum + $scope.stockInfo.shares < 100000){
                $scope.modalError = "Number of total shares allowed will be exceeded with this action."
            }else if($scope.stocks.stocks > 25) {
                $scope.modalError = "Number of total stocks allowed will be exceeded with this action."
            }
        };

        $scope.removeStock = function (stock, index) {
            $scope.stocks = StockPortfolioService.removeStock($scope.stocks, stock, index);
        }

        $scope.stocks = StockPortfolioService.getStockPortfolio();
    }
]);
