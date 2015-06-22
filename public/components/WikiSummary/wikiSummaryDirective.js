visualization.directive('wikiSummaryDirective',['$http', 'WikiSummaryService', 'SuperModelService',function($http, WikiSummaryService, SuperModelService) {
    'use strict';
    return {
        restrict: 'E',
        templateUrl: './components/WikiSummary/wikiSummaryView.html',
        scope: {},
        replace: true,
        controller: function(){},
        link: function (scope, element, attrs) {
            scope.$watch(function () {
                    return SuperModelService.getStockQuote();
                },
                function (quote) {
                    if (quote !== null && typeof quote !== 'undefined') {
                        WikiSummaryService.getWikiSummary(quote.name)
                            .then(function(data){
                                //Wiki Business Summary
                                var WBS = _.flatten(_.map(data.data.query.pages, _.values));
                                scope.WBS = WBS;
                            });
                    }
                });
        }
    };
}]);