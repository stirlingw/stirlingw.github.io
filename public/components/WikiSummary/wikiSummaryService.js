visualization.service('WikiSummaryService', ['$http',
    function($http) {
        'use strict';
        var Service = {};

        Service.getWikiSummary = function(name){
            var replacedName = name.replace(/[^\w\s]/gi, '');
            var removeInc = replacedName.replace('Inc','');
            var summaryName = encodeURIComponent(removeInc.trim());
            var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles="+summaryName+"&callback=JSON_CALLBACK";
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