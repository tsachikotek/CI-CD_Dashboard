//import { debug } from "util";
function insertChart_AutomationCoverage(targetId, version, showCoverage, showExecution, jsonData, colSpan) {
    try {
        if (showCoverage == null || typeof showCoverage == 'undefined') { showCoverage = true };
        if (showExecution == null || typeof showExecution == 'undefined') { showExecution = true };
        if (!showExecution && !showCoverage) { return };

        var folder;
        try {
            folder = eval(jsonData);
        }
        catch (err) {
            folder = jsonData;
        }

        var sProducts = [];//  '';
        var sTestsAutomated = [];//'';
        var sTestsToBe = [];//'';
        var sTestsUnkown = [];//'';
        var sTestsManual = [];//'';
        var sTestsTotal = [];

        var sumTestsAutomated = [];//'';
        var sumTestsToBe = [];//'';
        var sumTestsUnkown = [];//'';
        var sumTestsManual = [];//'';
        var sumTestsTotal = [];

        var totalTestsCount = 0;
        var totalTestsAutomated = 0;
        var totalTestsToBe = 0;
        var totalTestsUnkown = 0;
        var totalTestsManual = 0;

        $(folder).each(function (index, element) {
            var product = element['Product'];
            var testsCount = element['TOTAL'];
            var testsAutomated = element['AUTOMATED'];
            var testsToBe = element['TO BE AUTOMATED'];
            var testsUnkown = element['UNKNOWN'];
            var testsManual = element['MANUAL'];
            var path = element['QC_PATH'];

            sProducts.push('"' + product + '"');

            sTestsAutomated.push(~~(100 * testsAutomated / testsCount));
            sTestsToBe.push(~~(100 * testsToBe / testsCount));
            sTestsUnkown.push(~~(100 * testsUnkown / testsCount));
            sTestsManual.push(~~(100 * testsManual / testsCount));

            sumTestsAutomated.push(testsAutomated);
            sumTestsToBe.push(testsToBe);
            sumTestsUnkown.push(testsUnkown);
            sumTestsManual.push(testsManual);

            sTestsTotal.push(testsCount);

            totalTestsCount += parseInt(testsCount, '10');
            totalTestsAutomated += parseInt(testsAutomated, '10');
            totalTestsToBe += parseInt(testsToBe, '10');
            totalTestsUnkown += parseInt(testsUnkown, '10');
            totalTestsManual += parseInt(testsManual, '10');

            if (testsAutomated > 0) {
                var productAutoPercentage = ~~(100 * testsAutomated / testsCount);
                //[TODO] undo comment to bring product coverage state charts
                //createGaugeChart('main-stat', product, productAutoPercentage);
            }            

            if (showExecution) {
                $('#' + targetId).append('<div id=' + targetId + '_RegressionExecution' + '><div>');
                ExecutionInformationByQCFolder(targetId + '_RegressionExecution', defects, product, version);
            }
        })

        if (showCoverage) {
            //$('#' + targetId).append('<div id="qaGlobalKPI"><div>');
            //createDoughnutChartForRegression('qaGlobalKPI', version, totalTestsAutomated, totalTestsManual, totalTestsToBe, totalTestsUnkown);
            //var chartId = insertCard(targetId, null, null, null, null, colSpan);
            //createDoughnutChartForRegression(chartId, version, totalTestsAutomated, totalTestsManual, totalTestsToBe, totalTestsUnkown);
        }

        var jsonProductColumns = '[' + sProducts + ']'; // '["QM","Speech","Playback","Platform","Mobile", "XXX"]';
        //var jsonPercentageOfAutomatedTests = '[{"name":"Automated","data":[' + sTestsAutomated + ']},{"name":"Not Automated Yet","data":[' + sTestsToBe + ']},{"name":"Manual","data":[' + sTestsManual + ']},{"name":"Unknown","data":[' + sTestsUnkown + ']}]';
        var jsonPercentageOfAutomatedTests = '[{"name":"Automated","data":[' + sTestsAutomated + ']}]';
        var jsonNumberOfAutomatedTests = '[{"name":"Automated","data":[' + sumTestsAutomated + ']},{"name":"Not Automated Yet","data":[' + sumTestsToBe + ']},{"name":"Manual","data":[' + sumTestsManual + ']},{"name":"Unknown","data":[' + sumTestsUnkown + ']}]';
        var jsonTotalTests = '[{"name":"TotalTests","data":[' + sTestsTotal + ']}]';

        var autoPercentage = (100 * totalTestsAutomated / (totalTestsAutomated + totalTestsManual + totalTestsToBe + totalTestsUnkown)).toFixed(2);

        //var dataAutomationVsTotal = '[{"name":"Automated", "type": "column", "yAxis": "1","data":[' + sTestsAutomated + ']},{"name":"TotalTests","type": "spline", "data":[' + sTestsTotal + ']}]';
        var dataAutomationVsTotal = '[{"name":"Automated", "type": "bar",  "data":[' + sTestsAutomated + ']},{"name":"TotalTests","type": "bar", "opposite": "true", "yAxis": 1, "data":[' + sTestsTotal + ']}]';

        if (showCoverage) {            

            createChartTestsVsAutomationPerProduct(targetId + '_RegressionCoverage_percent',
                JSON.parse(jsonPercentageOfAutomatedTests),
                JSON.parse(jsonProductColumns),
                'Tests',
                50,
                100,
                'Coverage by Product (%)',
                'Total Coverage: ' + autoPercentage + '%', 'bar', 'normal');

            createChartTestsVsAutomationPerProduct(targetId + '_RegressionCoverage_percent',
                JSON.parse(jsonTotalTests),
                JSON.parse(jsonProductColumns),
                'Tests',
                50,
                Math.max.apply(0, JSON.parse(jsonTotalTests)[0].data),
                'Total Tests in QC (#)',
                'Total Tests: ' + JSON.parse(jsonTotalTests)[0].data.reduce((a, b) => a + b, 0), 'bar', 'normal');

            createGaugeChart('main-stat', 'All Products', autoPercentage, colSpan);
            //createDoughnutChart(targetId + '_RegressionCoverage_percent_2', 'XXXX', 'xxxxxxx', 'automtion', '[1,2,3,4,5]', false);
            
            //createChartTestsPerProduct(targetId + '_RegressionCoverage_count',
            //    JSON.parse(jsonNumberOfAutomatedTests),
            //    JSON.parse(jsonProductColumns),
            //    'Tests',
            //    50,
            //    4000,
            //    'Coverage by Product (#)',
            //    'Total Coverage: ' + autoPercentage + '%', 'column', 'normal');
        }
    }
    catch (err) {
        console.error(err);
        return err;
    }

}

function createChartTestsPerProduct2(containerId, jsonTestsPerType, jsonCategories, xColumn, numberOfElements, max, title, subTitle, chartType, chartStacking) { //jsonTotalTests

    var suffix = '%';
    if (max == null) max = 100;
    if (title == null) title = 'Builds\' Score (' + containerId.toUpperCase() + ')';
    if (chartType == null) chartType = 'column';
    if (chartStacking == null) chartStacking = 'percent';

    if (chartStacking != 'percent') suffix = '';

    if (numberOfElements != null) {
        jsonTestsPerType = jsonTestsPerType.slice(-numberOfElements);
        jsonCategories = jsonCategories.slice(-numberOfElements);
    }

    var chartId = insertCard(containerId, null, null, null, null, 12);

    var theChart = $('#' + chartId).highcharts({
        chart: {
            type: chartType, //'column'
            height: 350,
            zoomType: 'xy',
            backgroundColor: 'transparent',
            style: {
                fontFamily: '\'Unica One\', sans-serif'
            },
            plotBorderColor: '#606063'
        },
        credits: {
            enabled: false
        },
        title: {
            text: title,
            style: {
                color: '#E0E0E3',
                textTransform: 'uppercase',
                fontSize: '20px'
            }
        },
        subtitle: {
            text: subTitle,
            style: {
                color: '#E0E0E3',
                textTransform: 'uppercase'
            }
        },
        xAxis: {
            categories: jsonCategories,
            crosshair: true,
            gridLineColor: '#707073',
            labels: {
                style: {
                    color: '#E0E0E3'
                }
            },
            lineColor: '#707073',
            minorGridLineColor: '#505053',
            tickColor: '#707073',
            title: {
                style: {
                    color: '#A0A0A3'

                }
            }
        },
        yAxis: [{ //primary
            minColor: '#FFFFFF',
            maxColor: '#000000',
            min: 0,
            max: max,
            title: {
                text: '# of Tests'
            },
            opposite: true,
            gridLineColor: '#707073',
            labels: {
                style: {
                    color: '#E0E0E3'
                }
            },
            lineColor: '#707073',
            minorGridLineColor: '#505053',
            tickColor: '#707073',
            tickWidth: 1,
            title: {
                style: {
                    color: '#A0A0A3'
                }
            }
        }],
        tooltip: {

            shared: true,
            useHTML: true
        },
        plotOptions: {
            series: {
                stacking: chartStacking, //'percent', //'normal', //'percent'
                colorByPoint: false,
                dataLabels: {
                    enabled: true,
                    format: "{y} " + suffix,
                    color: '#B0B0B3'
                },
                marker: {
                    lineColor: '#333'
                }
            },
            boxplot: {
                fillColor: '#505053'
            },
            candlestick: {
                lineColor: 'white'
            },
            errorbar: {
                color: 'white'
            },
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            style: {
                color: '#F0F0F0'
            }
        },
        legend: {
            floating: true,
            itemStyle: {
                color: '#E0E0E3'
            },
            itemHoverStyle: {
                color: '#FFF'
            },
            itemHiddenStyle: {
                color: '#606063'
            }
        },
        series: jsonTestsPerType,
        colors: ["#70A35E", "#416D9C", "#EBB056", "#C74243", "#83548B", "#909291", "#557EAA"] //, colors: ['#00cc00', 'gray', '#4d4dff', '#ff3333']
    });
}

function createDoughnutChartForRegression(parentId, product, automated, manual, not_automated, unknown) {
    try {
        createDoughnutChart(parentId,
            'Total Regression Tests',
            product, // + '<br>Regression',
            'Coverage',
            '[["Automated", ' + automated + '],["To be Automated", ' + not_automated + '],["Manual", ' + manual + '],["Unknown (not specified)", ' + unknown + ']]',
            true);
    } catch (err) {
        //alert(err);
    }
}

function createDoughnutChart(parentId, chartTitle, chartSubtitle, serieName, dataArray, isActive) {
    try {
        Math.easeOutBounce = function (pos) {
            if ((pos) < (1 / 2.75)) {
                return (7.5625 * pos * pos);
            }
            if (pos < (2 / 2.75)) {
                return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
            }
            if (pos < (2.5 / 2.75)) {
                return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
            }
            return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
        };

        $('#' + parentId).highcharts({
            chart: {
                style: {
                    fontFamily: '\'Unica One\', sans-serif'
                },
                height: 250,
                type: 'pie',
                zoomType: 'xy',
                backgroundColor: 'transparent',
                plotBorderColor: '#606063'
            },
            credits: {
                enabled: false
            },
            exporting: { enabled: false },
            title: {
                text: chartTitle,
                style: {
                    color: "#fff"
                }
            },

            subtitle: {
                text: chartSubtitle,
                style: {
                    color: "#fff"
                }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    slicedOffset: 0,
                    //size: '100%',
                    dataLabels: {

                        enabled: true,
                        format: '{point.name}: <h3>{point.percentage:.1f}%</h3>',
                        distance: -50,
                        style: {
                            fontSize: '10px',
                            color: '#E0E0E3'
                        }
                    },
                    startAngle: -90,
                    endAngle: 270,
                    center: ['50%', '50%']
                }
            },
            series: [{
                type: 'pie',
                name: serieName,
                innerSize: '50%',
                colors: ["#70A35E", "#416D9C", "#C74243", "#EBB056", "#83548B", "#909291", "#557EAA"],
                data: eval(dataArray)
            }]
        });
    }

    catch (err) {
        console.error(err);
        //alert(err);
    }
}

function createChartTestsPerProduct(containerId, jsonTestsPerType, jsonCategories, xColumn, numberOfElements, max, title, subTitle, chartType, chartStacking, extraData) { //jsonTotalTests

    var suffix1 = '%';
    var suffix2 = 'Tests';
    if (max == null) max = 100;
    if (title == null) title = 'Builds\' Score (' + containerId.toUpperCase() + ')';
    if (chartType == null) chartType = 'column';
    if (chartStacking == null) chartStacking = 'percent';

    if (chartStacking != 'percent') suffix = '';

    if (numberOfElements != null) {
        jsonTestsPerType = jsonTestsPerType.slice(-numberOfElements);
        jsonCategories = jsonCategories.slice(-numberOfElements);
    }

    var max1 = 100; // Math.max.apply(0, jsonTestsPerType[0].data)
    var max2 = Math.max.apply(0, jsonTestsPerType[1].data);

    var chartId = insertCard(containerId, null, null, null, null, 12);
    //alert(chartId);
    var theChart = $('#' + chartId).highcharts({
        chart: {
            type: chartType, //'column'
            height: 350,
            zoomType: 'xy',
            backgroundColor: 'transparent',
            style: {
                fontFamily: '\'Unica One\', sans-serif'
            },
            plotBorderColor: 'black'
        },
        credits: {
            enabled: false
        },
        title: {
            text: title,
            style: {
                color: 'black',
                textTransform: 'uppercase',
                fontSize: '20px'
            }
        },
        subtitle: {
            text: subTitle,
            style: {
                color: 'black',
                textTransform: 'uppercase'
            }
        },
        xAxis: {
            categories: jsonCategories,
            crosshair: true,
            gridLineColor: '#707073',
            labels: {
                style: {
                    color: 'black'
                }
            },
            lineColor: '#707073',
            minorGridLineColor: '#505053',
            tickColor: '#707073',
            title: {
                style: {
                    color: 'black'

                }
            }
        },
        yAxis: [{ //primary
            minColor: '#FFFFFF',
            maxColor: '#000000',
            min: 0,
            max: max1,
            title: {
                text: '# of Tests'
            },
            opposite: true,
            gridLineColor: '#707073',
            labels: {
                style: {
                    color: 'black'
                }
            },
            lineColor: '#707073',
            minorGridLineColor: '#505053',
            tickColor: '#707073',
            tickWidth: 1,
            title: {
                style: {
                    color: 'black'
                }
            }
        }, { //secondary
                minColor: '#FFFFFF',
                maxColor: '#000000',
                min: 0,
                max: max2,
                title: {
                    text: '# of Tests'
                },
                opposite: false,
                gridLineColor: '#707073',
                labels: {
                    style: {
                        color: 'black'
                    }
                },
                lineColor: '#707073',
                minorGridLineColor: '#505053',
                tickColor: '#707073',
                tickWidth: 1,
                title: {
                    style: {
                        color: 'black'
                    }
                }
            }],
        tooltip: {

            shared: true,
            useHTML: true
        },
        plotOptions: {
            series: [{
                stacking: chartStacking, //'percent', //'normal', //'percent'
                colorByPoint: false,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}', //format: "{y} " + suffix1,
                    color: '#B0B0B3'
                },
                marker: {
                    lineColor: '#333'
                }
            }, {
                    stacking: chartStacking, //'percent', //'normal', //'percent'
                    colorByPoint: false,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.1f}', //format: "{y} " + suffix2,
                        color: '#B0B0B3'
                    },
                    marker: {
                        lineColor: '#333'
                    }
                }],
            boxplot: {
                fillColor: '#505053'
            },
            candlestick: {
                lineColor: 'black'
            },
            errorbar: {
                color: 'black'
            },
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            style: {
                color: '#F0F0F0'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            floating: true,
            itemStyle: {
                color: 'black'
            },
            itemHoverStyle: {
                color: '#E0E0E3'
            },
            itemHiddenStyle: {
                color: '#606063'
            }
        },
        series: jsonTestsPerType,
        colors: ["#70A35E", "#416D9C", "#C74243", "#EBB056", "#83548B", "#909291", "#557EAA"] //, colors: ['#00cc00', 'gray', '#4d4dff', '#ff3333']
    });
}

function createChartTestsVsAutomationPerProduct(containerId, jsonTestsPerType, jsonCategories, xColumn, numberOfElements, max, title, subTitle, chartType, chartStacking, extraData) { //jsonTotalTests

    var suffix1 = '%';
    var suffix2 = 'Tests';
    if (max == null) max = 100;
    if (title == null) title = 'Builds\' Score (' + containerId.toUpperCase() + ')';
    if (chartType == null) chartType = 'column';
    if (chartStacking == null) chartStacking = 'percent';

    if (chartStacking != 'percent') suffix = '';

    if (numberOfElements != null) {
        jsonTestsPerType = jsonTestsPerType.slice(-numberOfElements);
        jsonCategories = jsonCategories.slice(-numberOfElements);
    }

    var max1 = 100; // Math.max.apply(0, jsonTestsPerType[0].data)
    var max2 = 4000; //Math.max.apply(0, jsonTestsPerType[1].data);

    var chartId = insertCard(containerId, null, null, null, null, 6);
    //alert(chartId);
    var theChart = $('#' + chartId).highcharts({
        chart: {
            type: chartType, //'column'
            height: 350,
            zoomType: 'xy',
            backgroundColor: 'transparent',
            style: {
                fontFamily: '\'Unica One\', sans-serif'
            },
            plotBorderColor: 'black'
        },
        credits: {
            enabled: false
        },
        title: {
            text: title,
            style: {
                color: 'black',
                textTransform: 'uppercase',
                fontSize: '20px'
            }
        },
        subtitle: {
            text: subTitle,
            style: {
                color: 'black',
                textTransform: 'uppercase'
            }
        },
        xAxis: {
            categories: jsonCategories,
            crosshair: true,
            gridLineColor: '#707073',
            labels: {
                style: {
                    color: 'black'
                }
            },
            lineColor: '#707073',
            minorGridLineColor: '#505053',
            tickColor: '#707073',
            title: {
                style: {
                    color: 'black'

                }
            }
        },
        yAxis: { //primary
            minColor: '#FFFFFF',
            maxColor: '#000000',
            min: 0,
            max: max,
            title: {
                text: '# of Tests'
            },
            opposite: true,
            gridLineColor: '#707073',
            labels: {
                style: {
                    color: 'black'
                }
            },
            lineColor: '#707073',
            minorGridLineColor: '#505053',
            tickColor: '#707073',
            tickWidth: 1,
            title: {
                style: {
                    color: 'black'
                }
            }
        },
        tooltip: {

            shared: true,
            useHTML: true
        },
        plotOptions: {
            series: {
                stacking: chartStacking, //'percent', //'normal', //'percent'
                colorByPoint: false,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}', //format: "{y} " + suffix1,
                    color: '#B0B0B3'
                },
                marker: {
                    lineColor: '#333'
                }
            },
            boxplot: {
                fillColor: '#505053'
            },
            candlestick: {
                lineColor: 'black'
            },
            errorbar: {
                color: 'black'
            },
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            style: {
                color: '#F0F0F0'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            floating: true,
            itemStyle: {
                color: 'black'
            },
            itemHoverStyle: {
                color: '#E0E0E3'
            },
            itemHiddenStyle: {
                color: '#606063'
            }
        },
        series: jsonTestsPerType,
        colors: ["#70A35E", "#416D9C", "#C74243", "#EBB056", "#83548B", "#909291", "#557EAA"] //, colors: ['#00cc00', 'gray', '#4d4dff', '#ff3333']
    });
}


function insertCard(targetId, title, value, oldvalue, icon, colSpan) {

    if (colSpan == null || typeof colSpan == 'undefined') {
        colSpan = 4;
    }

    var rndId = generateId();
    var cardId = targetId + '' + rndId;

    var card$ = $('<div class="col-sm-' + colSpan + ' col-lg-' + colSpan + ' chart-wrapper"></div>');

    $('#' + targetId).append(card$);

    var _value$ = null;
    if (value != null) {
        _value$ = $('<p><img src="' + icon + '" alt=""><span>' + value + '</span> |<span> was: ' + oldvalue + '</span></p>');
    }

    var _title$ = null;
    if (title != null) {
        var _dashUnit$ = $('<div class="dash-unit"></div>');
        _title$ = $('<div class="chart-title"><dtitle>' + title + '</dtitle></div>');
        _dashUnit$.append(_title$);

        _dashUnit$.append($('<div id="' + cardId + '"></div>'));

        card$.append(_dashUnit$);
        if (_value$ != null) {
            _title$.append(_value$);
        }

    } else {
        card$.append($('<div id="' + cardId + '"></div>'));
    }

    return cardId;
}

function generateId() {
    return Math.floor(Math.random() * 100) + 1;
}


function createGaugeChart(containerId, product, value, colSpan) {
    try {
        var gaugeOptions = {

            chart: {
                type: 'solidgauge'
            },

            title: null,

            pane: {
                center: ['50%', '85%'],
                size: '100%',
                startAngle: -90,
                endAngle: 90,
                background: {
                    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc'
                }
            },

            tooltip: {
                enabled: false
            },

            // the value axis
            yAxis: {
                stops: [
                    [0.1, '#DF5353'], // green
                    [0.19, '#DDDF0D'], // yellow
                    [0.2, '#55BF3B'] // red
                ],
                lineWidth: 0,
                minorTickInterval: null,
                tickAmount: 2,
                title: {
                    y: -70
                },
                labels: {
                    y: 16
                }
            },

            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        y: 5,
                        borderWidth: 0,
                        useHTML: true
                    }
                }
            }
        };

        if (typeof (colSpan) == 'undefined') { colSpan = 6 };
        var chartId = insertCard(containerId, null, null, null, null, colSpan);

        var chartSpeed = Highcharts.chart(chartId, Highcharts.merge(gaugeOptions, {
            yAxis: {
                min: 0,
                max: 100,
                title: {
                    text: product + '<br>Automation Coverage'
                }
            },

            credits: {
                enabled: false
            },

            series: [{
                name: product,
                data: [eval(value)],
                dataLabels: {
                    format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                        ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y} %</span><br/>' +
                        '<span style="font-size:12px;color:silver">Automated/Tests in QC</span></div>'
                },
                tooltip: {
                    valueSuffix: ' %'
                }
            }]

        }));
    }
    catch (err) {
        alert(err);
    }
}
