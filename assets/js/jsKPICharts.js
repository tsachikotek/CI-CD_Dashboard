var CSS_COLOR_NAMES = ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', "#0070b7", "#b99cd1", "#ff9900", "#b36b00", "#ffe6bf", "#ffcc80", "#00b366", "#007d48", "#bfffe4", "#80ffc9", "#400099", "#2d006b", "#dabfff", "#b580ff", "Aqua", "Aquamarine", "Beige", "#e30074", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "#006130", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "Azure", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"];

//function to call the API with the query from the QC
function insertChart_DefectFoundByCustomer(targetId, title, subtitle) {

    var that = $(this);
    $.ajax({
        url: '//nexus-server/nexusapi/api/QC/GetStatisticForCustomerDefects',
        type: 'GET',
        context: that,
        cache: false,
        success: function (data) {
            insertChart_Line_DefectFoundByCustomer(targetId, title, subtitle, data);
        },
        error: function () {
            Debug.writeln('error while quering the QC');
        }
    });
}

function insertChart_Line_DefectFoundByCustomer(targetId, title, subtitle, jsonData) {
    createChartForKPI(targetId, title, subtitle, jsonData);
}

function insertChart_DefectRejectedByQA(targetId, title, subtitle) {

    var that = $(this);
    $.ajax({
        url: '//nexus-server/nexusapi/api/QC/GetStatisticForFixedRejected',
        type: 'GET',
        context: that,
        cache: false,
        success: function (data) {
            insertChart_Line_Defects_RejectedByQA(targetId, title, subtitle, data);
            return data;
        },
        error: function () {
            Debug.writeln('error while quering the QC');
            return 'error';
        }
    });

}

function insertChart_Line_Defects_RejectedByQA(targetId, title, subtitle, jsonData) {
    createChartForKPI(targetId, title, subtitle, jsonData);
    insertChart_ReopenFixesByProduct('RejectedDefectsByProduct', title, jsonData);
}

function insertChart_KBS(targetId, title, subtitle, state) {

    var that = $(this);
    $.ajax({
        url: '//nexus-server/nexusapi/api/QC/GetStatisticForAllFixes?state=' + state,
        type: 'GET',
        context: that,
        cache: false,
        success: function (data) {
            var dataByProduct = GetFixesByProduct(targetId, title, subtitle, state, data);
            //insertChart_AllKBS(targetId, title, subtitle, data, dataByProduct);
            //insertChart_FixesByProduct(targetId, title, subtitle, state, data);
            return data;
        },
        error: function () {
            Debug.writeln('error while quering the QC');
        }
    });
}

function insertChart_AllKBS(cardId, targetId, title, subtitle, jsonData, jsonDataByProduct) {
    //createChart(targetId, title, subtitle, jsonData);
    createChartForKPI(cardId, title, subtitle, jsonData);
    insertChart_FixesByProduct(targetId, title, jsonDataByProduct, jsonData);
    //insertChart_FixesByProduct(targetId, title, subtitle, state, jsonData);
}

// function to create yearly data values array
function createChartDataString(queryResults, product) {
    var paesedDate = $.parseJSON(queryResults);
    var resultsArray = [];
    $.each(paesedDate, function (i, item) {
        if (item[product] != null) {
            resultsArray.push(item[product]);
        }
    })
    return resultsArray;
};

//function for creating chart
function createChartForKPI(targetId, title, subtitle, queryResults) {

    var categories = createChartDataString(queryResults, 'MONTH');

    var seriesData = [
        createChartDataString(queryResults, '11SP1'),
        createChartDataString(queryResults, '11_1SP1'),
        createChartDataString(queryResults, '11_2SP0'),
        createChartDataString(queryResults, '15_1FP0'),
        createChartDataString(queryResults, '15_1FP1')
    ];

    var seriesNames = ['V11 SP1', 'V11.1 SP1', 'V11.2 SP0', 'V15.1 FP0', 'V15.2'];

    generateChartLinesRegular(targetId, title, subtitle, categories, seriesData, null, null, seriesNames);
};

function createChartTrend(targetId, data, title, subtitle, yTitle, xTitle, unitsName, chartType) {

    if (chartType == undefined || chartType == null || chartType == '') chartType = 'spline';
    if (unitsName == undefined || unitsName == null || unitsName == '') unitsName = 'days';

    var cardId = insertCard(targetId, title, null, null, null, 12);
    //generateChartLinesRegular(cardId, title, subtitle, null, data, null, null, unitsName);

    //TODO: use my chart function instead of this!!!

    var myChart = Highcharts.chart(cardId, {
        colors: CSS_COLOR_NAMES,
        chart: {
            type: chartType,
            //backgroundColor: 'transparent',
            height: 250,
            marginLeft: 2,
            marginRight: 2,
            marginTop: 0,
            tickAlign: false
        },
        title: { text: '' },
        yAxis: {
            title: {
                text: null
            },
            //startOnTick: false,
            //allowDecimals: false,
            gridLineWidth: 0
        },

        legend: {
            align: 'bottom',
            itemStyle: {
                "color": "white",
                "cursor": "pointer",
                "fontSize": "10px",
                "fontWeight": "normal",
                "textOverflow": "ellipsis"
            }
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { // don't display the dummy year
                month: '%b %Y',
                year: '%Y'
            },
            lineWidth: 0,
            tickWidth: 0,
            labels: {
                enabled: true
            },
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%b %Y}: {point.y:.0f} ' + unitsName,
            stacking: 'normal'
        },
        plotOptions: {
            spline: {
                lineWidth: 2,
                radius: 1,
                symbol: undefined,
                marker: {
                    lineWidth: 1,
                    radius: 1,
                    symbol: undefined,
                }
            },
            series: {
                //pointStart: Date.UTC(2016, 1, 1),
                pointIntervalUnit: 'month'
            }
        },
        series: data,
        exporting: {
            enabled: true,
            buttons: {
                contextButton: {
                    align: "right",
                    enabled: true,
                    menuItems: [{
                        text: 'Select All',
                        onclick: function () {
                            for (i in this.series) {
                                this.series[i].show();
                            }
                        },
                        separator: false
                    }, {
                        text: 'Deselect All',
                        onclick: function () {
                            for (i in this.series) {
                                this.series[i].hide();
                            }
                        },
                        separator: false
                    }, {
                        text: 'Increasing Trends',
                        onclick: function () {
                            for (var i = 0; i < this.series.length; i++) {
                                var seria = this.series[i].data;
                                var len = seria.length;

                                if (seria[len - 2] && (seria[len - 1].y > seria[len - 2].y)) {
                                    this.series[i].show();
                                } else {
                                    this.series[i].hide();
                                }
                            }
                        },
                        separator: false
                    }, {
                        text: 'Decreasing Trends',
                        onclick: function () {

                            for (var i = 0; i < this.series.length; i++) {
                                var seria = this.series[i].data;
                                var len = seria.length;

                                if (seria[len - 2] && (seria[len - 1].y < seria[len - 2].y)) {
                                    this.series[i].show();
                                } else {
                                    this.series[i].hide();
                                }
                            }
                        },
                        separator: false
                    }],
                }
            }
        }
    });
};

function createChartTrendByProduct(targetId, data, title, subtitle, yTitle, xTitle, unitsName, chartType, colSize) {
    if (chartType == undefined || chartType == null || chartType == '') chartType = 'spline';
    if (unitsName == undefined || unitsName == null || unitsName == '') unitsName = 'days';
    if (colSize == undefined || colSize == null || colSize == '') colSize = 12;

    var cardId = insertCard(targetId, null, null, null, null, colSize);

    //var myChart = Highcharts.chart(targetId, {

    var myChart = Highcharts.chart(cardId, {
        colors: CSS_COLOR_NAMES,
        chart: {
            type: 'column', //'spline',
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
                stops: [
                    [0, '#2a2a2b'],
                    [1, '#3e3e40']
                ]
            },
            style: {
                fontFamily: '\'Unica One\', sans-serif'
            },
            plotBorderColor: '#606063'
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
            text: subtitle,
            style: {
                color: '#E0E0E3',
                textTransform: 'uppercase'
            }
        },

        yAxis: {
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
                text: yTitle,
                style: {
                    color: '#A0A0A3'
                }
            },
            startOnTick: false,
            allowDecimals: false,
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    fontSize: '15px',
                    shadow: false,
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'yellow'
                }
            }
        },

        legend: {
            //layout: 'vertical',
            //align: 'right',
            //align: 'bottom',
            //verticalAlign: 'middle',
            itemStyle: {
                color: '#FFFFFF'
            },
            itemHoverStyle: {
                color: '#FFF'
            },
            itemHiddenStyle: {
                color: '#606063'
            }
        },
        xAxis: {
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
                text: xTitle,
                style: {
                    color: '#A0A0A3'

                }
            },
            type: 'datetime',
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                }
            },
            series: {
                pointStart: Date.UTC(2015, 1, 12),
                pointIntervalUnit: 'month',
                dataLabels: {
                    color: '#B0B0B3'
                },
                marker: {
                    lineColor: '#333'
                }
            }
        },
        series: data
    })
};