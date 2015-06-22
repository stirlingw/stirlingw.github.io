module.exports = function(app) {

    app.get('/', function(req, res) {
        res.sendfile('./public/index.html');
    });

    app.get('/stockQuoteView.html', function(req, res) {
        res.sendfile('./public/states/StockQuote/stockQuoteView.html');
    });

    app.get('/stockPortfolioView.html', function(req, res) {
        res.sendfile('./public/states/StockPortfolio/stockPortfolioView.html');
    });

    app.get('/googleStockQuoteView.html', function(req, res) {
        res.sendfile('./public/components/GoogleStockQuote/googleStockQuoteView.html');
    });

    app.get('/markItStockQuoteView.html', function(req, res) {
        res.sendfile('./public/components/MarkItStockQuote/markItStockQuoteView.html');
    });

    app.get('/yahooStockQuoteView.html', function(req, res) {
        res.sendfile('./public/components/YahooStockQuote/yahooStockQuoteView.html');
    });

    app.get('/yahooStockNewsView.html', function(req, res) {
        res.sendfile('./public/components/YahooStockNews/yahooStockNewsView.html');
    });

    app.get('/wikiSummaryView.html', function(req, res) {
        res.sendfile('./public/components/WikiSummary/wikiSummaryView.html');
    });


};
