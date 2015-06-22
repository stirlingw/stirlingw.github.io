
visualization.config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/stock-quote");
    //
    // Now set up the states
    $stateProvider
        .state('stockquote', {
            url: "/stock-quote",
            templateUrl: "states/StockQuote/stockQuoteView.html",
            controller: 'StockQuoteController'
        })
        .state('stockportfolio', {
            url: "/stock-portfolio",
            templateUrl: "states/StockPortfolio/stockPortfolioView.html",
            controller: 'StockPortfolioController'
        });
    //$stateProvider.html5Mode(true);
});