visualization.
    directive('yahooStockLineChartDirective', function ($http, YahooStockLineChartService, SuperModelService) {
        return {
            restrict: 'EA',
            template: "<div id='chart'></div>",
            link: function (scope, element, attrs) {

                // Chart taken from
                // http://codepen.io/stirlingw/pen/gpxdmy?editors=100
                var stockQuote = null;
                var handleThen = function(newData, status) {
                    if(newData.data.query.results !== null) {
                        var data = newData.data.query.results.quote;
                        var stock = stockQuote.name;
                        var parseDate = d3.time.format("%Y-%m-%d").parse,
                            formatDate = d3.time.format("%d-%b"),
                            bisectDate = d3.bisector(function (d) { return d.date; }).left;

                        function initStockCloseChart(chartProperties) {
                            var margin = chartProperties.margins,
                                width = chartProperties.width - margin.left - margin.right,
                                height = chartProperties.height - margin.top - margin.bottom,
                                x = d3.time.scale().range([0, width]),
                                y = d3.scale.linear().range([height, 0]),
                                xAxis = d3.svg.axis().scale(x)
                                    .orient("bottom").ticks(chartProperties.xticks),//xticks
                                yAxis = d3.svg.axis().scale(y)
                                    .orient("left").ticks(chartProperties.yticks),
                                valueline = d3.svg.line()
                                    .x(function (d) { return x(d.date); })
                                    .y(function (d) { return y(d.close); });

                            var svgtest = d3.select('#chart'+" > svg");
                            if(!svgtest.empty())
                            {
                                $('#chart'+" > svg").remove();
                            }

                            var svg = d3.select("#chart")
                                .append("svg")
                                .attr("id", chartProperties.chartId)
                                .attr("width", width + margin.left + margin.right)
                                .attr("height", height + margin.top + margin.bottom)
                                .append("g")
                                .attr("transform", "translate("
                                + margin.left
                                + "," + margin.top + ")");

                            _d = data;
                            _D = [];
                            _d.forEach(function (d) {
                                d.date = parseDate(d.Date);
                                d.close = parseFloat(d.Close);
                                _D.push({date: d.date, close: d.close});
                            });
                            _D.sort(function (a, b) {
                                return a.date - b.date;
                            });

                            var focus = svg.append("g").style("display", "none");
                            // Scale
                            x.domain(d3.extent(_D, function (d) {
                                return d.date;
                            }));
                            y.domain(d3.extent(_D, function (d) {
                                return d.close;
                            }));

                            svg.append("path")// valueline
                                .attr("class", "line")
                                .attr("d", valueline(_D));
                            svg.append("g")//X Axis
                                .attr("class", "x axis")
                                .attr("transform", "translate(0," + height + ")")
                                .call(xAxis);
                            svg.append("g")//Y Axis
                                .attr("class", "y axis")
                                .call(yAxis);


                            svg.append("text")//title shadow
                                .attr("x", (width / 2))
                                .attr("y", margin.top / 2)
                                .attr("text-anchor", "middle")
                                .attr("class", "shadow")
                                .style("font-size", "16px")
                                .text(stock);

                            svg.append("text")//title
                                .attr("class", "stock")
                                .attr("x", (width / 2))
                                .attr("y", margin.top / 2)
                                .attr("text-anchor", "middle")
                                .style("font-size", "16px")
                                .text(stock);

                            /*hover elements*/

                            focus.append("line")
                                .attr("class", "x")
                                .style("stroke", "blue")
                                .style("stroke-dasharray", "3,3")
                                .style("opacity", 0.5)
                                .attr("y1", 0)
                                .attr("y2", height);
                            focus.append("line")
                                .attr("class", "y")
                                .style("stroke", "blue")
                                .style("stroke-dasharray", "3,3")
                                .style("opacity", 0.5)
                                .attr("x1", width)
                                .attr("x2", width);
                            focus.append("circle")
                                .attr("class", "y")
                                .style("fill", "none")
                                .style("stroke", "blue")
                                .attr("r", 4);
                            focus.append("text")
                                .attr("class", "y1")
                                .style("stroke", "white")
                                .style("stroke-width", "3.5px")
                                .style("opacity", 0.8)
                                .attr("dx", 8)
                                .attr("dy", "-.3em");
                            focus.append("text")
                                .attr("class", "y2")
                                .attr("dx", 8)
                                .attr("dy", "-.3em");
                            focus.append("text")
                                .attr("class", "y3")
                                .style("stroke", "white")
                                .style("stroke-width", "3.5px")
                                .style("opacity", 0.8)
                                .attr("dx", 8)
                                .attr("dy", "1em");
                            focus.append("text")
                                .attr("class", "y4")
                                .attr("dx", 8)
                                .attr("dy", "1em");

                            svg.append("rect")
                                .attr("width", width + 1)
                                .attr("height", height)
                                .style("fill", "none")
                                .style("pointer-events", "all")
                                .on("mouseover", function () {
                                    focus.style("display", null);
                                })
                                .on("mouseout", function () {
                                    focus.style("display", "none");
                                })
                                .on("mousemove", mousemove);

                            function mousemove() {
                                var x0 = x.invert(d3.mouse(this)[0]);
                                var i = bisectDate(_D, x0, 1, _D.length - 1);
                                var d0 = _D[i - 1];
                                var d1 = _D[i];
                                var d = x0 - d0.date > d1.date - x0 ? d1 : d0;

                                focus.select("circle.y")
                                    .attr("transform",
                                    "translate(" + x(d.date) + "," +
                                    y(d.close) + ")");
                                focus.select("text.y1")
                                    .attr("transform",
                                    "translate(" + x(d.date) + "," +
                                    y(d.close) + ")")
                                    .text(d.close);
                                focus.select("text.y2")
                                    .attr("transform",
                                    "translate(" + x(d.date) + "," +
                                    y(d.close) + ")")
                                    .text(d.close);
                                focus.select("text.y3")
                                    .attr("transform",
                                    "translate(" + x(d.date) + "," +
                                    y(d.close) + ")")
                                    .text(formatDate(d.date));
                                focus.select("text.y4")
                                    .attr("transform",
                                    "translate(" + x(d.date) + "," +
                                    y(d.close) + ")")
                                    .text(formatDate(d.date));
                                focus.select(".x")
                                    .attr("transform",
                                    "translate(" + x(d.date) + "," +
                                    y(d.close) + ")")
                                    .attr("y2", height - y(d.close));
                                focus.select(".y")
                                    .attr("transform",
                                    "translate(" + width * -1 + "," +
                                    y(d.close) + ")")
                                    .attr("x2", width + width);
                            }
                        }

                        function svgExists(chartId) {
                            if(document.getElementById(chartId)){
                                return true
                            }else{
                                return false
                            }
                        }

                        function createGraph(ifCreate) {
                            if (ifCreate) {
                                var chartProperties = {
                                    width: 550,
                                    height: 270,
                                    margins: {
                                        top: 15,
                                        right: 20,
                                        bottom: 30,
                                        left: 30
                                    },
                                    xticks: 5,
                                    yticks: 5,
                                    chartId: "StockChart"
                                };
                                initStockCloseChart(chartProperties);
                            }
                        }
                        createGraph(true);
                    }
                };

                scope.$watch(function () {
                    return SuperModelService.getStockQuote();
                },
                function (quote) {
                    if (quote !== null && typeof quote !== 'undefined') {

                        var range = '1w';
                        var today = moment().format('YYYY-MM-DD');
                        var history = null;
                        stockQuote = quote;

                        if (range === '1w')
                            history = moment().subtract(7, 'days').format('YYYY-MM-DD');

                        if (range === '1m')
                            history = moment().subtract(1, 'month').format('YYYY-MM-DD');

                        if (range === '3m')
                            history = moment().subtract(3, 'months').format('YYYY-MM-DD');

                        if (range === '6m')
                            history = moment().subtract(6, 'months').format('YYYY-MM-DD');

                        if (range === '1y')
                            history = moment().subtract(1, 'years').format('YYYY-MM-DD');

                        if (range === '5y')
                            history = moment().subtract(5, 'years').format('YYYY-MM-DD');

                        YahooStockLineChartService.getYahooStockChart(quote.symbol, history, today).then(handleThen);
                    }
                });
            }
        };
    });