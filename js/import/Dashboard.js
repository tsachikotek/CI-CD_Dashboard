

function getTestsCoverage(targetId) {
    var jsonData = GetRestByMethodForTests('GetTestCoverageByAutomation', null, null, null);
    insertCard_TestsCoverage(targetId, jsonData);
}

function ReadFile(file) {
    try {
        var content = '';

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState > 0 && xhttp.status == 200) {
                content = xhttp.responseText;
                document.getElementById("file-content").innerHTML = content;
                return content;
            }
        };
        xhttp.open("GET", file, true);
        xhttp.send();
    }
    catch (err) {
        console.error(err);
        alert(err.message);
        return err;
    }

    return content;
}

//Page functions
function convertToMonth(jsonArray) {
    var ret = [];
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    $(jsonArray).each(function (index, month) {
        if (typeof month == 'number') {
            ret.push(monthNames[month - 1]);
        } else {
            ret.push(monthNames[month.substr(month.indexOf(".") + 1) - 1]);
        }
    });

    return ret;
}

function createTable(json) {
    var table = $('<table class="table table-hover table-striped">');
    var tblHeader = "<tr>";
    for (var k in json[0]) tblHeader += "<th>" + k + "</th>";
    tblHeader += "</tr>";
    $(tblHeader).appendTo(table);
    $.each(json, function (index, value) {
        var TableRow = "<tr>";
        $.each(value, function (key, val) {
            TableRow += "<td>" + val + "</td>";
        });
        TableRow += "</tr>";
        $(table).append(TableRow);
    });
    return ($(table));
}

function updateProgressBar(controlId, title, status, message, value, activeStatus, progressBarId) {
    var active = '';

    if (progressBarId == null) { progressBarId == Date.now(); }
    if (value == null) value = 100;
    if (activeStatus == true || activeStatus == 'active') { active = 'active'; }

    if (status == null || status == 'info') {
        status = 'info';
        active = 'active';
    } else {
        value = 100;
    }


    if (title != null && status != null && message != null) {
        var prgBar = '<div id=' + progressBarId + ' style="width: 20%; float: left; margin:0 5px 0 5px" class="alert alert-' + status + '"><strong>' + title + '</strong><br>' + message + '<div class="progress"><div class="progress-bar progress-bar-striped progress-bar-' + status + ' ' + active + '" role="progressbar" aria-valuenow="' + value + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + value + '%"><span class="">' + value + '% Complete</span></div></div></div>';
        $(progressBarId).html(prgBar);
    }

}

function removeLoading(parentId) {
    $('#' + parentId).remove('#' + parentId + '_Loading');
}

function insertLoading(parentControl) {
    removeLoading(parentControl);
    var tmplateLoading = '<div id="' + parentControl + '_Loading" class="preloader-wrapper big active"><div class="spinner-layer spinner-blue-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div>';

    if (parentControl == null) {
        return tmplateLoading;
    }
    else {
        $('#' + parentControl).append(tmplateLoading);
    }
}

function insertRowProgressBar(controlId, title, status, message, value, activeStatus, progressBarId) {
    var active = '';

    if (progressBarId == null) { progressBarId == Date.now(); }
    if (value == null) value = 100;
    if (activeStatus == true || activeStatus == 'active') { active = 'active'; }

    if (status == null || status == 'info') {
        status = 'info';
        active = 'active';
    } else {
        value = 100;
    }


    if (title != null && status != null && message != null) {

        var prgBar = '<tr id=' + progressBarId + ' class="' + status + '"><td>' + title + '</td><td>' + message + '</td><td><div class="progress"><div class="progress-bar progress-bar-striped progress-bar-' + status + ' ' + active + '" role="progressbar" aria-valuenow="' + value + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + value + '%"><span class="">' + value + '% Complete</span></div></td></tr>';

        $('#' + controlId).append(prgBar);
    }

}

function insertProgressBar(controlId, title, status, message, value, activeStatus, progressBarId) {
    var active = '';

    if (progressBarId == null) { progressBarId == Date.now(); }
    if (value == null) value = 100;
    if (activeStatus == true || activeStatus == 'active') { active = 'active'; }

    if (status == null || status == 'info') {
        status = 'info';
        active = 'active';
    } else {
        value = 100;
    }


    if (title != null && status != null && message != null) {

        var prgBar = '<div id=' + progressBarId + ' style="width: 20%; float: left; margin:0 5px 0 5px" class="alert alert-' + status + '"><strong>' + title + '</strong><br>' + message + '<div class="progress"><div class="progress-bar progress-bar-striped progress-bar-' + status + ' ' + active + '" role="progressbar" aria-valuenow="' + value + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + value + '%"><span class="">' + value + '% Complete</span></div></div></div>';

        $('#' + controlId).append(prgBar);
    }

}

function drawCountUp(parentId, counterId, message, suffix, value, rcValue) {
    if (rcValue == null) rcValue = 0;
    if (suffix == 'Avg age: NaN Days') suffix = 'No Defects';
    suffix += " [" + rcValue + "]";
    if (value > rcValue) {
        insertPanel(parentId, counterId, '', '', 'red', 12);
        createCountUp(counterId, value, message, suffix);
    } else {
        insertPanel(parentId, counterId, '', '', 'green', 12);
        createCountUp(counterId, value, message, suffix); //'No Defects'
    }
}

function generateId() {
    return Math.floor(Math.random() * 100) + 1;
}

function insertCollapsibleList(parentId, id, title, activatedByElement) {
    var div = '<div class="container">' +
        '<div id="' + id + '" class="collapse in">' +
        '<div class="container">' +
        '<ul class="list-group">' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '</div>';

    $('#' + parentId).append(div);
    $('#' + activatedByElement).attr('data-toggle', 'collapse');
    $('#' + activatedByElement).attr('data-target', '#RAFDefectsList');
}

function insertItemToList(parentListId, name, component, severity, age) {

    var alert = 'primary';
    var alertSeverity = 'primary';
    var alertAge = 'primary';
    var alertComponent = 'primary';

    if (age > 15 && age < 45) {
        alertAge = 'warning';
    }
    else if (age >= 45) {
        alertAge = 'danger';
    }

    if (severity == '1 - Critical') {
        alertSeverity = 'danger';
    }
    else if (severity == '2 - High') {
        alertSeverity = 'warning';
    }
    else if (severity == '3 - Medium') {
        alertSeverity = 'info';
    }
    else if (severity == '1 - Low') {
        alertSeverity = 'primary';
    }

    if (component == 'Workflows & Actions') {
        alertComponent = 'danger';
    }
    else if (component == 'RAF Application') {
        alertComponent = 'warning';
    }
    else if (component == 'Reports') {
        alertComponent = 'info';
    }
    else if (component == '1 - Low') {
        alertComponent = 'primary';
    }

    var li = '<li class="list-group-item list-group-item-' + alertAge + '">' +
        '<div>' +
        '<span class="label label-' + alertComponent + '">' + component + '</span>' +
        '<span class="label label-' + alertAge + '">' + age + ' Days</span>' +
        '<span class="label label-' + alertSeverity + '">' + severity + '</span>' +
        '</div>' +
        '<div>' + name + '</div>' +
        '</li>';

    $('#' + parentListId + ' .list-group').append(li);
}

function insertPanel(parentId, panelId, title, message, type) {
    insertPanel(parentId, panelId, title, message, type, 3);
}

function insertPanel(parentId, panelId, title, message, type, width) {
    if (type == null) { type = 'default' };
    var div = '<div class="col-md-' + width + '"><div class="panel panel-' + type + '"><div class="panel-heading" style="height: 120px"><div class="row"><div class="col-xs-3"><i class="fa fa-line-chart fa-5x"></i></div><div class="col-xs-9 text-right"><div class="huge"><h1 id="' + panelId + '">' + title + '</h1></div></div></div></div></div></div>';
    $('#' + parentId).append(div);
}

function createCountUp(target, endValue, prefix, suffix) {
    //alert("CountUp!!!");
    var startVal = 0;

    var endVal = endValue;

    var decimals = 0,
        duration = 2;

    options = {
        useEasing: true,
        useGrouping: true,
        separator: "",
        decimal: ".",
        prefix: prefix,
        suffix: "<h5>" + suffix + "</h5>"
    }

    // you don't have to create a new instance of CountUp every time you start an animation,
    // you can just change the properties individually. But I do here in case user changes values in demo.
    //$('#' + target).append('<div id="1"></div>')
    demo = new CountUp(target, startVal, endVal, decimals, duration, options);
    demo.start();
}

//Chart functions
function createRunsChart(parentId, jsonContent) {

    for (var x = 0; x < jsonContent.length; x++) {

        var xGreenAxisArray = [];
        var xGrayAxisArray = [];
        var yGreenAxisArray = [];
        var yGrayAxisArray = [];
        var yChangesArray = [];
        var yGreenChangesArray = [];
        var yGrayChangesArray = [];
        var xGreenColumnsColorsArray = [];
        var xGrayColumnsColorsArray = [];

        var grayCount = 0;
        var greenCount = 0;

        try {
            var jenkinsIP = jsonContent[x].Jenkins.IP;

            for (var run = 0; run < jsonContent[x].Jenkins.Runs.length; run++) {
                if (jsonContent[x].Jenkins.Runs[run].Date != null && jsonContent[x].Jenkins.Runs[run].Date != "") {
                    grayCount++;
                    var yValue = parseInt(jsonContent[x].Jenkins.Runs[run].Total);
                    xGrayAxisArray.push(jsonContent[x].Jenkins.Runs[run].Date);
                    yGrayAxisArray.push(yValue); //parseInt(jsonContent[x].score));
                }
            }

            //yGrayChangesArray = yGrayAxisArray;

            var chartId = parentId + jenkinsIP.replace(/\D/g, '');
            $("#" + parentId).append("<div id='" + chartId + "' style='width: 25%; height: 50%; margin: 0 auto;  float: left'></div>");
            //alert(chartId + " element was created");
            updateChart(chartId, xGrayAxisArray, "CRe", yGrayAxisArray, "", yGrayChangesArray, "", 20, 10, jenkinsIP);
            //alert(chartId + " chart was created");

        }
        catch (err) {
            alert(err.message)
        }
    }
}

function createChartForCReBuilds(jsonContent, green_or_gray) {
    var xGreenAxisArray = [];
    var xGrayAxisArray = [];
    var yGreenAxisArray = [];
    var yGrayAxisArray = [];
    var yChangesArray = [];
    var yGreenChangesArray = [];
    var yGrayChangesArray = [];
    var yGreenRunsCountArray = [];
    var yGrayRunsCountArray = [];
    var xGreenColumnsColorsArray = [];
    var xGrayColumnsColorsArray = [];

    var grayCount = 0;
    var greenCount = 0;

    var grayPattern = "15.1.1.6";
    var greenPattern = "15.1.1.2";

    for (var x = 0; x <= jsonContent.length; x++) {
        try {
            if (jsonContent[x].build != null && jsonContent[x].build != "") {
                if (jsonContent[x].build.indexOf(grayPattern) > -1) {
                    //gray
                    grayCount++;
                    var yValue = { y: parseInt(jsonContent[x].score), marker: { symbol: 'url(//www.highcharts.com/demo/gfx/sun.png)' } }; //parseInt(jsonContent[x].score);

                    switch (jsonContent[x].result.toLowerCase()) {
                        case null: yValue = { y: parseInt(jsonContent[x].score), marker: { symbol: 'url(Images/chartMarkers/grey.png)' } }; break;
                        case "failed": yValue = { y: parseInt(jsonContent[x].score), marker: { symbol: 'url(Images/chartMarkers/red.png)' } }; break;
                        case "go": yValue = { y: parseInt(jsonContent[x].score), marker: { symbol: 'url(Images/chartMarkers/green.gif)' } }; break;
                        case "good": yValue = { y: parseInt(jsonContent[x].score), marker: { symbol: 'url(Images/chartMarkers/green.gif)' } }; break;
                        case "pass": yValue = { y: parseInt(jsonContent[x].score), marker: { symbol: 'url(Images/chartMarkers/green.gif)' } }; break;
                        case "success": yValue = { y: parseInt(jsonContent[x].score), marker: { symbol: 'url(Images/chartMarkers/green.gif)' } }; break;
                        case "partial": yValue = { y: parseInt(jsonContent[x].score), marker: { symbol: 'url(Images/chartMarkers/yellow.png)' } }; break;
                        case "medium": yValue = { y: parseInt(jsonContent[x].score), marker: { symbol: 'url(Images/chartMarkers/yellow.png)' } }; break;
                        case "medium": yValue = { y: parseInt(jsonContent[x].score), marker: { symbol: 'url(Images/chartMarkers/yellow.png)' } }; break;
                        default: yValue = { y: parseInt(jsonContent[x].score), marker: { symbol: 'url(Images/chartMarkers/grey.png)' } }; break;
                    }

                    xGrayAxisArray.push(jsonContent[x].build);
                    //alert(yValue);
                    yGrayAxisArray.push(yValue); //parseInt(jsonContent[x].score));
                    yGrayChangesArray.push(parseInt(jsonContent[x].changes));
                    yGrayRunsCountArray.push(parseInt(jsonContent[x].Runs));

                    switch (jsonContent[x].result.toLowerCase()) {
                        case null: xGrayColumnsColorsArray.push('gray'); break;
                        case "failed": xGrayColumnsColorsArray.push('red'); break;
                        case "go": xGrayColumnsColorsArray.push('green'); break;
                        case "good": xGrayColumnsColorsArray.push('green'); break;
                        case "pass": xGrayColumnsColorsArray.push('green'); break;
                        case "success": xGrayColumnsColorsArray.push('green'); break;
                        case "partial": xGrayColumnsColorsArray.push('orange'); break;
                        case "medium": xGrayColumnsColorsArray.push('orange'); break;
                        case "medium": xGrayColumnsColorsArray.push('orange'); break;
                        default: xGrayColumnsColorsArray.push('gray'); break;
                    }
                }
                else if (jsonContent[x].build.indexOf(greenPattern) > -1) {
                    //green
                    greenCount++;
                    var yValue = { y: parseInt(jsonContent[x].score), marker: { symbol: 'url(//www.highcharts.com/demo/gfx/sun.png)' } }; //parseInt(jsonContent[x].score);

                    switch (jsonContent[x].result.toLowerCase()) {
                        case null: yValue = { y: parseInt(jsonContent[x].score), marker: { symbol: 'url(Images/chartMarkers/grey.png)' } }; break;
                        case "failed": yValue = { y: parseInt(jsonContent[x].score), marker: { symbol: 'url(Images/chartMarkers/red.png)' } }; break;
                        case "go": yValue = { y: parseInt(jsonContent[x].score), marker: { symbol: 'url(Images/chartMarkers/green.gif)' } }; break;
                        case "good": yValue = { y: parseInt(jsonContent[x].score), marker: { symbol: 'url(Images/chartMarkers/green.gif)' } }; break;
                        case "pass": yValue = { y: parseInt(jsonContent[x].score), marker: { symbol: 'url(Images/chartMarkers/green.gif)' } }; break;
                        case "success": yValue = { y: parseInt(jsonContent[x].score), marker: { symbol: 'url(Images/chartMarkers/green.gif)' } }; break;
                        case "partial": yValue = { y: parseInt(jsonContent[x].score), marker: { symbol: 'url(Images/chartMarkers/yellow.png)' } }; break;
                        case "medium": yValue = { y: parseInt(jsonContent[x].score), marker: { symbol: 'url(Images/chartMarkers/yellow.png)' } }; break;
                        case "medium": yValue = { y: parseInt(jsonContent[x].score), marker: { symbol: 'url(Images/chartMarkers/yellow.png)' } }; break;
                        default: yValue = { y: parseInt(jsonContent[x].score), marker: { symbol: 'url(Images/chartMarkers/grey.png)' } }; break;
                    }

                    xGreenAxisArray.push(jsonContent[x].build);
                    yGreenAxisArray.push(yValue); //yGreenAxisArray.push(parseInt(jsonContent[x].score));
                    yGreenChangesArray.push(parseInt(jsonContent[x].changes));
                    yGreenRunsCountArray.push(parseInt(jsonContent[x].Runs));

                    switch (jsonContent[x].result.toLowerCase()) {
                        case null: xGreenColumnsColorsArray.push('gray'); break;
                        case "failed": xGreenColumnsColorsArray.push('red'); break;
                        case "go": xGreenColumnsColorsArray.push('green'); break;
                        case "good": xGreenColumnsColorsArray.push('green'); break;
                        case "pass": xGreenColumnsColorsArray.push('green'); break;
                        case "success": xGreenColumnsColorsArray.push('green'); break;
                        case "partial": xGreenColumnsColorsArray.push('orange'); break;
                        case "medium": xGreenColumnsColorsArray.push('orange'); break;
                        case "medium": xGreenColumnsColorsArray.push('orange'); break;
                        default: xGreenColumnsColorsArray.push('gray'); break;
                    }
                }

            }
        }
        catch (err) {
            //alert(err.message)
        }
    }

    //alert(yGrayAxisArray);
    updateChart("green", xGreenAxisArray, "Green", yGreenAxisArray, xGreenColumnsColorsArray, yGreenChangesArray, yGreenRunsCountArray, 10);
    updateChart("gray", xGrayAxisArray, "Gray", yGrayAxisArray, xGrayColumnsColorsArray, yGrayChangesArray, yGrayRunsCountArray, 10);

    var greenScore = parseInt(yGreenAxisArray[yGreenAxisArray.length - 1].y);
    var grayScore = parseInt(yGrayAxisArray[yGrayAxisArray.length - 1].y);

    var typeGreen = 'default';
    var typeGray = 'default';

    if (greenScore >= 90) { typeGreen = 'green'; }
    else if (greenScore >= 80) { typeGreen = 'yellow'; }
    else if (greenScore < 80) { typeGreen = 'red'; }

    if (grayScore >= 90) { typeGray = 'green'; }
    else if (grayScore >= 80) { typeGray = 'yellow'; }
    else if (grayScore < 80) { typeGray = 'red'; }

    insertPanel('meterContainer', 'GreenScore', greenScore, parseInt(yGreenAxisArray[yGreenAxisArray.length - 1].y), typeGreen, 3);
    insertPanel('meterContainer', 'green-odometer', 0, 0, 'primary', 3);

    insertPanel('meterContainer', 'GrayScore', grayScore, parseInt(yGrayAxisArray[yGrayAxisArray.length - 1].y), typeGray, 3);
    insertPanel('meterContainer', 'gray-odometer', 0, 0, 'primary', 3);
    createCountUp('green-odometer', xGreenAxisArray.length, "Tested: ", " Green Builds");
    createCountUp('gray-odometer', xGrayAxisArray.length, "Tested: ", " Gray Builds");
    createCountUp('GreenScore', greenScore, "Score: ", 'Last Tested Build (Green): ' + xGreenAxisArray[xGreenAxisArray.length - 1]);
    createCountUp('GrayScore', grayScore, "Score: ", 'Last Tested Build (Gray): ' + xGrayAxisArray[xGrayAxisArray.length - 1]);
};

function updateChart(containerId, xAxisArray, yAxisDataName, yAxisDataArray, xColumnsColorsArray, yChangesDataArray, yRunsDataArray, numberOfElements, max, title) {
    //alert(yAxisDataArray);
    if (max == null) max = 100;
    if (title == null) title = 'Builds\' Score (' + containerId.toUpperCase() + ')';

    if (numberOfElements != null) {
        xAxisArray = xAxisArray.slice(-numberOfElements);
        yAxisDataName = yAxisDataName.slice(-numberOfElements);
        yAxisDataArray = yAxisDataArray.slice(-numberOfElements);
        xColumnsColorsArray = xColumnsColorsArray.slice(-numberOfElements);
        yChangesDataArray = yChangesDataArray.slice(-numberOfElements);
        yRunsDataArray = yRunsDataArray.slice(-numberOfElements);
    }

    $('#' + containerId).highcharts({
        chart: {
            backgroundColor: null,
            type: 'spline'
        },
        credits: {
            enabled: false
        },
        title: {
            text: title // 'Builds\' Score (' + containerId.toUpperCase() + ')'
        },
        subtitle: {
            text: '<a href="//nexus-server/CRe.aspx">Source: Nexus CRe</a><br><a href="//nexus-server/main.aspx">Nexus CRe Dashboard</a>'
        },
        xAxis: {
            categories: xAxisArray,
            crosshair: true
        },
        yAxis: [{ //primary
            minColor: '#FFFFFF',
            maxColor: '#000000',
            min: 0,
            max: max,
            title: {
                text: 'Score (%)'
            },
            opposite: true
        }, { //secondary
            minColor: '#FFFFFF',
            maxColor: '#000000',
            min: 0,
            max: 15,
            title: {
                text: 'Changes'
            }
        }],
        tooltip: {

            shared: true,
            useHTML: true
        },
        series: [{
            type: 'spline',
            name: yAxisDataName + " (Automation score)",
            color: 'black', //'Score',
            data: yAxisDataArray,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{x.name}' + '{point.y}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{series.name}: {point.key}</span><table>',
                pointFormat: '<tr><td style="color:white;padding:0">Score: </td>' +
                '<td style="padding:0"><b>{point.y:.0f} %</b></td></tr>',
                footerFormat: '</table>',
                valueSuffix: '' //' %'
            }
        }, {
            type: 'spline',
            name: yAxisDataName + " (Runs)",
            //yAxis: 0,
            color: 'grey', //'Score',
            data: yRunsDataArray,
            yAxis: 1,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{x.name}' + '{point.y}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{series.name}: {point.key}</span><table>',
                pointFormat: '<tr><td style="color:white;padding:0">Runs: </td>' +
                '<td style="padding:0"><b>{point.y:.0f}</b></td></tr>',
                footerFormat: '</table>',
                valueSuffix: '' //' %'
            }
        }, {
            type: 'column',
            name: 'Changes in build (msi)',
            //yAxis: 1,
            color: 'blue',
            data: yChangesDataArray,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{x.name}' + '{point.y}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{series.name}: {point.key}</span><table>',
                pointFormat: '<tr><td style="color:white;padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.0f} </b></td></tr>',
                footerFormat: '</table>',
                valueSuffix: '' //' %'
            }

        }]
    });
};

function createChart(containerId, jsonData, jsonCategories, xColumn, maxNumberOfElements, max, title, subTitle, chartType, chartStacking) { //jsonTotalTests
    if (max == null) max = 100;
    if (title == null) title = 'Builds\' Score (' + containerId.toUpperCase() + ')';
    if (chartType == null) chartType = 'column';
    if (chartStacking == null) chartStacking = 'percent';

    if (numberOfElements != null) {
        jsonTestsPerType = jsonTestsPerType.slice(-numberOfElements);
        jsonCategories = jsonCategories.slice(-numberOfElements);
    }

    var id = 'chart' + Math.round(Math.random() * 100);

    $('#' + containerId).prepend('<div id="' + id + '"></div>');
    //$('#' + containerId).append('<div class="col-md-12" id="' + id + '"></div>');

    $('#' + id).highcharts({
        chart: {
            type: chartType, //'column'
            width: null,
            height: 250
        },
        credits: {
            enabled: false
        },
        title: {
            text: title
        },
        subtitle: {
            text: subTitle
        },
        xAxis: {
            categories: jsonCategories,
            crosshair: true
        },
        yAxis: [{ //primary
            minColor: '#FFFFFF',
            maxColor: '#000000',
            min: 0,
            max: max,
            title: {
                text: 'Tests Coverage (%)'
            },
            opposite: true
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
                    format: "{y} %"
                }
            }
        },
        series: jsonTestsPerType,
        colors: ['#00cc00', 'gray', '#4d4dff', '#ff3333']
    });
}

function createChartTestsPerProduct(containerId, jsonTestsPerType, jsonCategories, xColumn, numberOfElements, max, title, subTitle, chartType, chartStacking, extraData) { //jsonTotalTests

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

function createBuildoMeter(parentId, id, name, meterTitle, value, min, max) {
    $(function () {
        if (parentId == null) parentId = 'meterContainer';
        $('#' + parentId).append('<div id=' + id + ' style="width: 300px; height: 200px; float: left"></div>');
        var gaugeOptions = {

            chart: {
                type: 'solidgauge'
            },

            title: null,

            pane: {
                center: ['50%', '85%'],
                size: '140%',
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
                    [0.1, '#DF5353'], // red
                    [0.5, '#DDDF0D'], // yellow
                    [0.9, '#55BF3B'] // green
                ],
                lineWidth: 0,
                minorTickInterval: null,
                tickPixelInterval: 400,
                tickWidth: 0,
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

        // The speed gauge
        $('#' + id).highcharts(Highcharts.merge(gaugeOptions, {
            yAxis: {
                min: min,
                max: max,
                title: {
                    text: name
                }
            },

            credits: {
                enabled: false
            },

            series: [{
                name: name,
                data: [value],
                dataLabels: {
                    format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                    '<span style="font-size:12px;color:black">' + meterTitle + '</span></div>'
                },
                tooltip: {
                    valueSuffix: ' builds'
                }
            }]
        }));
    });
}

function insertChart(chartId, chartTitle, chartSubtitle, serieName, dataArray) {
    try {
        $('#defectsRow').after('<div id="' + chartId + '" style="width: 400px; height: 300px; margin: 0;  float: left"></div>');
        createDoughnutChart(chartId, chartTitle, chartSubtitle, serieName, dataArray);
    }
    catch (err) {
        alert(err);
    }
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
        alert(err);
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
                colors: ["#70A35E", "#416D9C", "#EBB056", "#C74243", "#83548B", "#909291", "#557EAA"],
                data: eval(dataArray)
            }]
        });
    }

    catch (err) {
        console.error(err);
        alert(err);
    }
}

function createAutomationDefectChart() {
    var NexusDefects = GetRestByMethod('GetDefectsAssignedToNexusByOwner');
    var categories = [];
    var user = []
    var defects = eval(NexusDefects);

    $.each(defects), function (index, value) {
        alert(value);
    }

    var critial = [];
    var high = [];
    var medium = [];
    var low = [];

    $.each(defects, function (index, value) {
        categories.push(value);
    })
}

function createStacketColumnChart(parentId, xAxisCategoriesArray, dataNameValueArray) {

    dataNameValueArray = eval(dataNameValueArray); //"[{name: 'John', data: [5, 3, 4, 7, 2]}, {name: 'Jane', data: [2, 2, 3, 2, 1]}, {name: 'Joe', data: [3, 4, 4, 2, 5]}]");
    xAxisCategoriesArray = eval(xAxisCategoriesArray); //['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']);

    $(function () {
        $('#' + parentId).append('<div></div>').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Stacked column chart'
            },
            xAxis: {
                categories: xAxisCategoriesArray //['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 25,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                        style: {
                            textShadow: '0 0 3px black'
                        }
                    }
                }
            },
            series: dataNameValueArray
        });
    });
}

function createNexusDefectsAssignTable(parentId) {
    var nexusDefects = GetRestByMethod('GetDefectsAssignedToNexusByOwner');
    if (parentId == null || parentId == '') parentId = 'nexusDefects';
    var header = ''
    var odd_even = 'odd';
    $.each(eval(nexusDefects), function (index, value) {
        var user = value['ASSIGNED_TO'];
        var critical = value['Critical'];
        var high = value['High'];
        var medium = value['Medium'];
        var low = value['Low'];
        var total = value['Total'];

        var tr = '<ul class="' + odd_even + '"><li class="sorting_1">' + user + '</li><li>' + critical + '</li><li>' + high + '</li><li>' + medium + '</li><li>' + low + '</li><li>' + total + '</li></ul>';

        $('#' + parentId).after(tr);

        if (odd_even == 'odd') {
            odd_even = 'even';
        }
        else {
            odd_even = 'odd';
        }
    });
}

function createNexusDefectsAssignMeters(chartName, queryName, categoryValueName, valueFieldName) {
    createNexusDefectsAssignMeters(chartName, queryName, categoryValueName, valueFieldName, false);
}

function createNexusDefectsAssignMeters(chartName, queryName, categoryValueName, valueFieldName, isActive, parentId) {
    var nexusDefects = GetRestByMethod(queryName);
    if (parentId == null || parentId == '') parentId = 'carousel-inner';
    var data = '';
    var header = '';
    var odd_even = 'odd';
    var user = ''
    $.each(eval(nexusDefects), function (index, value) {

        user = value[categoryValueName];
        var critical = value['Critical'];
        var high = value['High'];
        var medium = value['Medium'];
        var low = value['Low'];
        var total = value['Total'];

        var val = value[valueFieldName];

        if (val != '0') {

            if (data != '') data += ",";
            data += "['" + user + " (" + val + ") '," + val + "]";
        }
    });

    //downstream
    createDoughnutChart(parentId, 'Defects', chartName, 'Defects', '[' + data + ']', isActive);
}

function createPrizmaDefectsAlerts(idSLA, idRC, idUsers) {
    createProductDefectsAlerts(idSLA, idRC, idUsers, 'GetDefectsByAgePrizma', 0, 0, 39, 52);
}

function createPlaybackDefectsAlerts(idSLA, idRC, idUsers) {
    createProductDefectsAlerts(idSLA, idRC, idUsers, 'GetDefectsByAgePlayback', 0, 0, 9, 16);
}

function createAutonDefectsAlerts(idSLA, idRC, idUsers) {
    createProductDefectsAlerts(idSLA, idRC, idUsers, 'GetDefectsByAgeAuton', 0, 0, 9, 16);
}

function createProductDefectsAlerts(idSLA, idRC, idUsers, restMethodName, maxCritical, maxHigh, maxMedium, maxLow) {
    var nexusDefects = nexusDefects = GetRestByMethod(restMethodName);
    var maxTotal = maxCritical + maxHigh + maxMedium + maxLow;
    insertCollapsibleList('defectsList', 'RAFDefectsList', 'RAF Application Defects', 'defectsUsers');

    var header = ''
    var odd_even = 'odd';
    var Users = [];
    var userCount = [];
    var userAge = [];
    var p0 = 0;
    var p1 = 0;
    var p2 = 0;
    var p3 = 0;
    var p4 = 0;
    var noPriority = 0;

    var critical = 0;
    var high = 0;
    var medium = 0;
    var low = 0;
    var noSeverity = 0;

    var ageCritical = 0;
    var ageHigh = 0;
    var ageMedium = 0;
    var ageLow = 0;
    var ageNoSeverity = 0;

    var age0 = 0;
    var age1 = 0;
    var age2 = 0;
    var age3 = 0;
    var age4 = 0;
    var ageNoPriority = 0;

    $.each(eval(nexusDefects), function (index, value) {
        var id = value['BugID'];
        var Summary = value['Summary'];
        var Severity = value['Severity'];
        var CurrentState = value['CurrentState'];
        var StateAge = value['StateAge'];
        var Tags = value['Tags'];
        var Priority = value['Priority'];
        var AgeTotal = value['AgeTotal'];
        var User = value['AssignTo'];
        var SubSystem = value['SubSystem'];


        if (Users.lastIndexOf(User) < 0) {
            Users.push(User);
            userCount.push({ Key: User, Value: 0 });
            userAge.push({ Key: User, Value: 0 });
        }


        userCount[Users.indexOf(User)].Value++;
        userAge[Users.indexOf(User)].Value = userAge[Users.indexOf(User)].Value + AgeTotal;

        switch (Priority) {
            case 'Priority 0': age0 += AgeTotal; p0++; break;
            case 'Priority 1': age1 += AgeTotal; p1++; break;
            case 'Priority 2': age2 += AgeTotal; p2++; break;
            case 'Priority 3': age3 += AgeTotal; p3++; break;
            case 'Priority 4': age4 += AgeTotal; p4++; break;
            default: ageNoPriority += AgeTotal; noPriority++;
        }
        switch (Severity) {
            case '1 - Critical': ageCritical += AgeTotal; critical++; break;
            case '2 - High': ageHigh += AgeTotal; high++; break;
            case '3 - Medium': ageMedium += AgeTotal; medium++; break;
            case '4 - Low': ageLow += AgeTotal; low++; break;
            default: ageNoPriority += AgeTotal; noSeverity++;
        }

        if (Severity == '1 - Critical' || Severity == '2 - High') {
            insertItemToList('RAFDefectsList', Summary, SubSystem, Severity, StateAge);
        }
    });

    var total = critical + high + medium + low + noSeverity;
    var avgAge = (ageCritical + ageHigh + ageMedium + ageLow + ageNoSeverity) / total;

    drawCountUp(idSLA, 'p0', "P0: ", "Avg age: " + parseInt(age0 / p0) + " Days", p0, 0);
    drawCountUp(idSLA, 'p1', "P1: ", "Avg age: " + parseInt(age1 / p1) + " Days", p1, 20);
    drawCountUp(idSLA, 'p2', "P2: ", "Avg age: " + parseInt(age2 / p2) + " Days", p2, 30);
    drawCountUp(idSLA, 'p3', "P3: ", "Avg age: " + parseInt(age3 / p3) + " Days", p3, 40);
    drawCountUp(idSLA, 'p4', "No Priority: ", "Avg age: " + parseInt((age4 + ageNoPriority) / (p4 + noPriority)) + " Days", p4 + noPriority, 15);

    drawCountUp(idRC, 'd0', "Critical: ", "Avg age: " + parseInt(ageCritical / critical) + " Days", critical, maxCritical);
    drawCountUp(idRC, 'd1', "High: ", "Avg age: " + parseInt(ageHigh / high) + " Days", high, maxHigh);
    drawCountUp(idRC, 'd2', "Medium: ", "Avg age: " + parseInt(ageMedium / medium) + " Days", medium, maxMedium);
    drawCountUp(idRC, 'd3', "Low: ", "Avg age: " + parseInt(ageLow / low) + " Days", low, maxLow);
    drawCountUp(idRC, 'd4', "Total: ", "Avg age: " + parseInt(avgAge) + " Days", total, maxTotal);

    for (var i = 0; i < userCount.length; i++) {
        var user = userCount[i].Key;
        var total = parseInt(userCount[i].Value);
        var age = parseInt(userAge[i].Value);
        if (user == 'automation_pool') { user = 'Nexus'; }
        drawCountUp(idUsers, user, user + ": ", "Avg age: " + parseInt(age / total) + " Days", total, 25);
    }
}

function createNexusDefectsAlerts(idSLA, idRC, idUsers, QCRequest) {
    var nexusDefects = '';

    if (QCRequest == null) {
        nexusDefects = GetRestByMethod('GetDefectsByAge');
    }
    else {
        nexusDefects = GetRestByMethod(QCRequest);
    }

    insertCollapsibleList('defectsList', 'RAFDefectsList', 'RAF Application Defects', 'defectsUsers');

    var header = ''
    var odd_even = 'odd';

    var Users = [];
    var userCount = [];
    var userAge = [];

    var p0 = 0;
    var p1 = 0;
    var p2 = 0;
    var p3 = 0;
    var p4 = 0;
    var noPriority = 0;

    var critical = 0;
    var high = 0;
    var medium = 0;
    var low = 0;
    var noSeverity = 0;

    var ageCritical = 0;
    var ageHigh = 0;
    var ageMedium = 0;
    var ageLow = 0;
    var ageNoSeverity = 0;

    var age0 = 0;
    var age1 = 0;
    var age2 = 0;
    var age3 = 0;
    var age4 = 0;
    var ageNoPriority = 0;

    $.each(eval(nexusDefects), function (index, value) {
        var id = value['BugID'];
        var Summary = value['Summary'];
        var Severity = value['Severity'];
        var CurrentState = value['CurrentState'];
        var StateAge = value['StateAge'];
        var Tags = value['Tags'];
        var Priority = value['Priority'];
        var AgeTotal = value['AgeTotal'];
        var User = value['AssignTo'];
        var SubSystem = value['SubSystem'];


        if (Users.lastIndexOf(User) < 0) {
            Users.push(User);
            userCount.push({ Key: User, Value: 0 });
            userAge.push({ Key: User, Value: 0 });
        }


        userCount[Users.indexOf(User)].Value++;
        userAge[Users.indexOf(User)].Value = userAge[Users.indexOf(User)].Value + AgeTotal;

        if (SubSystem != 'RAF Application' && SubSystem != 'Reports') {
            switch (Priority) {
                case 'Priority 0': age0 += AgeTotal; p0++; break;
                case 'Priority 1': age1 += AgeTotal; p1++; break;
                case 'Priority 2': age2 += AgeTotal; p2++; break;
                case 'Priority 3': age3 += AgeTotal; p3++; break;
                case 'Priority 4': age4 += AgeTotal; p4++; break;
                default: ageNoPriority += AgeTotal; noPriority++;
            }
        }
        else {
            switch (Severity) {
                case '1 - Critical': ageCritical += AgeTotal; critical++; break;
                case '2 - High': ageHigh += AgeTotal; high++; break;
                case '3 - Medium': ageMedium += AgeTotal; medium++; break;
                case '4 - Low': ageLow += AgeTotal; low++; break;
                default: ageNoPriority += AgeTotal; noSeverity++;
            }
        }

        insertItemToList('RAFDefectsList', Summary, SubSystem, Severity, StateAge);

    });

    var total = critical + high + medium + low + noSeverity;
    var avgAge = (ageCritical + ageHigh + ageMedium + ageLow + ageNoSeverity) / total;

    drawCountUp(idSLA, 'p0', "P0: ", "Avg age: " + parseInt(age0 / p0) + " Days", p0, 0);
    drawCountUp(idSLA, 'p1', "P1: ", "Avg age: " + parseInt(age1 / p1) + " Days", p1, 0);
    drawCountUp(idSLA, 'p2', "P2: ", "Avg age: " + parseInt(age2 / p2) + " Days", p2, 5);
    drawCountUp(idSLA, 'p3', "P3: ", "Avg age: " + parseInt(age3 / p3) + " Days", p3, 10);
    drawCountUp(idSLA, 'p4', "No Priority: ", "Avg age: " + parseInt((age4 + ageNoPriority) / (p4 + noPriority)) + " Days", p4 + noPriority, 15);

    drawCountUp(idRC, 'd0', "Critical: ", "Avg age: " + parseInt(ageCritical / critical) + " Days", critical, 0);
    drawCountUp(idRC, 'd1', "High: ", "Avg age: " + parseInt(ageHigh / high) + " Days", high, 0);
    drawCountUp(idRC, 'd2', "Medium: ", "Avg age: " + parseInt(ageMedium / medium) + " Days", medium, 10);
    drawCountUp(idRC, 'd3', "Low: ", "Avg age: " + parseInt(ageLow / low) + " Days", low, 15);
    drawCountUp(idRC, 'd4', "Total: ", "Avg age: " + parseInt(avgAge) + " Days", total, 15);

    for (var i = 0; i < userCount.length; i++) {
        var user = userCount[i].Key;
        var total = parseInt(userCount[i].Value);
        var age = parseInt(userAge[i].Value);

        if (user == 'automation_pool') { user = 'Nexus'; }
        drawCountUp(idUsers, user, user + ": ", "Avg age: " + parseInt(age / total) + " Days", total, 15);
    }
}

function createActionsFailuresTable(parentId, nexusDefects) {
    if (parentId == null || parentId == '') parentId = 'nexusDefects';
    var header = ''
    var odd_even = 'odd';
    $.each(eval(nexusDefects), function (index, value) {
        var date = value['date'];
        var workflowId = value['workflowId'];
        var name = value['name'];
        var averageTime = parseInt(value['avg(steps.duration)']);
        var pass = value['Pass'];
        var failed = value['Failed'];
        var warning = value['Warning'];
        var score = value['score'];

        var tr = '<ul class="' + odd_even + '"><li class="sorting_1">' + name + '</li><li>' + averageTime + '</li><li>' + score + '</li><li>' + pass + '</li><li>' + failed + '</li><li>' + warning + '</li></ul>';

        $('#' + parentId).after(tr);

        if (odd_even == 'odd') {
            odd_even = 'even';
        }
        else {
            odd_even = 'odd';
        }
    });
}

function insertAutomationCoverageChart(targetId, version, showCoverage, showExecution) {
    var jsonData = GetRestByMethodForTests('GetTestsAutoExecStatus1', null, null, 'KPIDashboard');
    insertChart_AutomationCoverage(targetId, version, showCoverage, showExecution, jsonData);
}

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

            if (showExecution) {
                $('#' + targetId).append('<div id=' + targetId + '_RegressionExecution' + '><div>');
                ExecutionInformationByQCFolder(targetId + '_RegressionExecution', defects, product, version);
            }
        })

        if (showCoverage) {
            //$('#' + targetId).append('<div id="qaGlobalKPI"><div>');
            //createDoughnutChartForRegression('qaGlobalKPI', version, totalTestsAutomated, totalTestsManual, totalTestsToBe, totalTestsUnkown);
            //var chartId = insertCard(targetId, null, null, null, null, colSpan);
            //Remove this comment to show DoughnutChartForRegression
            //createDoughnutChartForRegression(chartId, version, totalTestsAutomated, totalTestsManual, totalTestsToBe, totalTestsUnkown);
        }

        var jsonProductColumns = '[' + sProducts + ']'; // '["QM","Speech","Playback","Platform","Mobile", "XXX"]';
        var jsonPercentageOfAutomatedTests = '[{"name":"Automated","data":[' + sTestsAutomated + ']},{"name":"Not Automated Yet","data":[' + sTestsToBe + ']},{"name":"Manual","data":[' + sTestsManual + ']},{"name":"Unknown","data":[' + sTestsUnkown + ']}]';
        var jsonNumberOfAutomatedTests = '[{"name":"Automated","data":[' + sumTestsAutomated + ']},{"name":"Not Automated Yet","data":[' + sumTestsToBe + ']},{"name":"Manual","data":[' + sumTestsManual + ']},{"name":"Unknown","data":[' + sumTestsUnkown + ']}]';
        var jsonTotalTests = '[{"name":"TotalTests","data":[' + sTestsTotal + ']}]';

        if (showCoverage) {
            createChartTestsPerProduct(targetId + '_RegressionCoverage_percent',
                JSON.parse(jsonPercentageOfAutomatedTests),
                JSON.parse(jsonProductColumns),
                'Tests',
                50,
                100,
                'Coverage by Product (#)',
                version, 'column', 'percent');

            createChartTestsPerProduct(targetId + '_RegressionCoverage_count',
                JSON.parse(jsonNumberOfAutomatedTests),
                JSON.parse(jsonProductColumns),
                'Tests',
                50,
                1800,
                'Coverage by Product (%)',
                version, 'column', 'normal');

        }
    }
    catch (err) {
        console.error(err);
        return err;
    }

}

function insertCard_TestsCoverage(targetId, jsonData) {
    var testsCoverage;
    try {
        testsCoverage = JSON.parse(jsonData);
    }
    catch (err) {
        testsCoverage = jsonData;
    }

    var covList = [];
    var totalList = [];
    var monthList = [];

    var thisMonth = '';
    var lastMonth = '';

    $(testsCoverage.Table).each(function (index, month) {
        var coverage = parseFloat(month.TEST_COVERAGE).toFixed(2);
        covList.push(parseFloat(coverage));
        monthList.push(month.MONTH);
        totalList.push(month.AUTOMATED);

        if (thisMonth == '') {
            thisMonth = coverage;
        } else {
            if (thisMonth != '' && lastMonth == '') lastMonth = coverage;
        }
    })

    var title = '# of Tests Automated';
    var value = thisMonth + '%';
    var oldvalue = lastMonth + '%';
    var icon = 'assets/img/up.png';
    var main_color = '#70A35E';

    if (thisMonth < lastMonth) {
        icon = 'assets/img/down.png';
        main_color = '#ff4d4d';
    }

    var seriesData = [covList.reverse(), totalList.reverse()];
    var seriesNames = ['% Coverage', '# of Automated Tests'];
    var categories = monthList.reverse();
    var maxima = null; // [25, 6000];
    var colors = [main_color, 'white'];

    insertCardWithChart(targetId, title, value, oldvalue, icon, categories, seriesData, maxima, colors, seriesNames, 6);
}

function insertCard_withChart(targetId, jsonData, cardTitle, suffix, lessIsBetter, jsonDataTotal, serieName1, serieName2, colSpan) {
    $('#' + targetId).html('');
    if (lessIsBetter == null || typeof lessIsBetter == 'undefined') lessIsBetter = false;
    if (suffix == null || typeof suffix == 'undefined') suffix = '%';
    var testsCoverage;
    try {
        testsCoverage = JSON.parse(jsonData);
    }
    catch (err) {
        testsCoverage = jsonData;
    }

    var covList = [];
    var totalList = [];
    var monthList = [];

    var thisMonth = '';
    var lastMonth = '';
    var max1 = 0;
    var max2 = 0;

    if (typeof testsCoverage.Table != 'undefined') {
        $(testsCoverage.Table).each(function (index, month) {
            var coverage = month.TEST_COVERAGE;
            if (coverage > max1) { max1 = coverage }
            covList.push(coverage);
            monthList.push(month.MONTH);
            totalList.push(month.AUTOMATED);
            if (month.AUTOMATED > max2) { max2 = month.AUTOMATED }

            if (thisMonth == '') {
                thisMonth = coverage;
            } else {
                if (thisMonth != '' && lastMonth == '') lastMonth = coverage;
            }
        });
    } else {
        var inputFormat;
        var totalReversed = testsCoverage.slice(-12).slice(0, -1).reverse();


        function isEqual(a, b) {
            return !(typeof a == 'undefined' || a == null || typeof b == 'undefined' || b == null || a !== b)
        };

        $(totalReversed).each(function (index, month) {
            if (typeof month['15_1FP1'] != 'undefined') { inputFormat = 'DEFECTS'; }
            else if (typeof month['DAYS_TO_DELIVER'] != 'undefined') { inputFormat = 'DELIVERY'; }
            else if (typeof month['CLOSED'] != 'undefined') { inputFormat = 'CLOSED'; }
            else if (typeof month['TOTAL_ESRS'] != 'undefined') { inputFormat = 'ESRS'; }

            var coverage;
            var total;

            switch (inputFormat) {
                case 'DEFECTS':
                    coverage = month['11SP1'] + month['11_1SP1'] + month['11_2SP0'] + month['15_1FP0'] + month['15_1FP1'];
                    total = month['11SP1'] + month['11_1SP1'] + month['11_2SP0'] + month['15_1FP0'] + month['15_1FP1'];
                    break;
                case 'DELIVERY':
                    coverage = month['DAYS_TO_DELIVER'];
                    total = month['DAYS_IN_QA'];
                    break;
                case 'ESRS':
                    coverage = month['DEFECT_COUNT'];
                    total = month['DEFECT_COUNT'];
                    break;
                case 'CLOSED':
                    coverage = month['NEW'];
                    total = month['CLOSED'];
                    break;
            }

            if (coverage > max1) { max1 = coverage }

            monthList.push(month.MONTH);
            covList.push(coverage);

            if (thisMonth == '') {
                thisMonth = coverage;
            } else {
                if (thisMonth != '' && lastMonth == '') lastMonth = coverage;
            }

            if (jsonDataTotal != null && typeof jsonDataTotal != 'undefined') {
                var totalElement = '';
                var totalData = jsonDataTotal.slice(-12).slice(0, -1);
                totalList.push(0);
                $(totalData).each(function (i, thisMonth) {

                    if (isEqual(thisMonth.MONTH, month.MONTH) && isEqual(thisMonth.YEAR, month.YEAR) ||
                        (isEqual(thisMonth.MONTH, month.MONTH) && isEqual(thisMonth.CLOSED, month.CLOSED))) {

                        switch (inputFormat) {
                            case 'DEFECTS':
                                totalElement = thisMonth['11SP1'] + thisMonth['11_1SP1'] + thisMonth['11_2SP0'] + thisMonth['15_1FP0'] + thisMonth['15_1FP1'];
                                break;
                            case 'DELIVERY':
                                totalElement = thisMonth['DAYS_IN_QA'];
                                break;
                            case 'CLOSED':
                                totalElement = thisMonth['CLOSED'];
                                break;
                            case 'ESRS':
                                totalElement = thisMonth['DEFECT_RATIO'];
                                break;
                        }

                        totalList[totalList.length - 1] = totalElement;
                        if (totalElement > max2) { max2 = totalElement }
                        return;
                    }
                });
            }
        });

        var currentMonth = testsCoverage.slice(-1)[0];
        var currentMonthTotal;

        switch (inputFormat) {
            case 'DEFECTS':
                currentMonthTotal = currentMonth['11SP1'] + currentMonth['11_1SP1'] + currentMonth['11_2SP0'] + currentMonth['15_1FP0'] + currentMonth['15_1FP1'];
                break;
            case 'DELIVERY':
                currentMonthTotal = currentMonth['DAYS_TO_DELIVER'];
                break;
            case 'ESRS':
                currentMonthTotal = currentMonth['DEFECT_COUNT'];
                break;
            case 'CLOSED':
                currentMonthTotal = currentMonth['NEW'];
                break;
        }

        if (max2 > max1) max1 = max2;
    }

    var title = cardTitle;
    var value = thisMonth + ' ' + suffix;
    var oldvalue = lastMonth + ' ' + suffix;
    var main_color = '#70A35E';

    if (typeof currentMonth != 'undefined') oldvalue = oldvalue + '\n[This month: ' + currentMonthTotal + ']';

    var icon = 'assets/img/up.png';

    if (lessIsBetter == false && thisMonth < lastMonth) {
        icon = 'assets/img/down.png';
        main_color = '#ff4d4d';
    }

    if (lessIsBetter == true && thisMonth > lastMonth) {
        icon = 'assets/img/down.png'
        main_color = '#ff4d4d';
    }

    var seriesData = [covList.reverse(), totalList.reverse()];
    var seriesNames = [serieName1, serieName2];
    var categories = convertToMonth(monthList.reverse());
    var maxima = [max1, max2];
    //var maxima = [25, 6000];
    var colors = [main_color, 'white'];

    insertCardWithChart(targetId, title, value, oldvalue, icon, categories, seriesData, maxima, colors, seriesNames, 4);
}

function insertCard_Empty(targetId, title, message, icon) {
    var rndId = generateId();
    var chartId = targetId + '' + rndId;

    var divElement = '<div class="col-sm-3 col-lg-3"><div class="dash-unit"><dtitle>' + title + '</dtitle><hr><div class="cont"><p><img src="' + icon + '" style="width: 50%; height: 200px;" alt=""> <bold>' + message + '</bold></div></div></div>';
    $('#' + targetId).append(divElement);

    return chartId;
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

function insertCardWithChart(targetId, title, value, oldvalue, icon, categories, seriesData, maxima, seriesColors, seriesNames, colSpan) {

    //if (main_color == null || typeof main_color == 'undefined') { main_color = '#70A35E' };
    //if (main_color == null || typeof main_color == 'undefined') { main_color = '#70A35E' };

    //categories = ['Categorie 1', 'Categorie 2', 'Categorie 3', 'Categorie 4', 'Categorie 5', 'Categorie 6', 'Categorie 7', 'Categorie 8', 'Categorie 9', 'Categorie 10', 'Categorie 11', 'Categorie 12', 'Categorie 13', 'Categorie 14', 'Categorie 15', 'Categorie 16', 'Categorie 17', 'Categorie 18', 'Categorie 19', 'Categorie 20', 'Categorie 21', 'Categorie 22', 'Categorie 23', 'Categorie 24', 'Categorie 25', 'Categorie 26', 'Categorie 27', 'Categorie 28', 'Categorie 29', 'Categorie 30'];
    //serie1 = [13, 13, 46, 61, 23, 12, 24, 16, 14, 12, 12, 24, 19, 13, 11, 11, 14, 11, 11, 11, 11, 13, 22, 10, 18, 15, 24, 31, 19, 10];
    //serie2 = [52, 41, 58, 63, 55, 46, 45, 41, 38, 54, 50, 39, 48, 70, 63, 60, 58, 63, 83, 89, 83, 79, 83, 100, 104, 108, 52, 46, 83, 89];

    // var chartId = insertCard(targetId, title, value, oldvalue, icon);
    //insertChart(chartId, categories, serie1, serie2, max1, max2, main_color, serieName1, serieName2);
    //var chartId = insertCard(targetId, null, value, oldvalue, icon, 6);
    var chartId = insertCard(targetId, title, value, oldvalue, icon, colSpan);
    generateChartLinesRegular(chartId, null, null, categories, seriesData, maxima, seriesColors, seriesNames);
    //generateChartLinesRegular(chartId, title, '', categories, seriesData, maxima, seriesColors, seriesNames);
}

function insertChart(targetId, categories, serie1, serie2, max1, max2, main_color, serieName1, serieName2) {

    if (serieName1 == null || typeof serieName1 == 'undefined') { serieName1 = 'Main' };
    if (serieName2 == null || typeof serieName2 == 'undefined') { serieName2 = 'Other' };
    if (main_color == null || typeof main_color == 'undefined') { main_color = '#70A35E' };

    Highcharts.setOptions({
        lang: {
            contextButtonTitle: 'Export Chart'
        }
    });

    $('#' + targetId).highcharts({
        chart: {
            type: 'column',
            backgroundColor: 'transparent',
            height: 160,
            marginLeft: 3,
            marginRight: 3,
            marginTop: 0
        },
        exporting: {
            enabled: true,
            buttons: {
                contextButton: {
                    align: "left",
                    enabled: true,
                    menuItems: [{
                        text: 'Export to PNG',
                        onclick: function () {
                            this.exportChart();
                        },
                        separator: false
                    }, {
                        text: 'Export to CSV',
                        onclick: function () {
                            this.downloadCSV();
                        },
                        separator: false
                    }],
                    height: 20,
                    symbol: "menu",
                    symbolFill: "#666666",
                    symbolSize: 14,
                    symbolStroke: "#666666",
                    symbolStrokeWidth: 1,
                    symbolX: 12.5,
                    symbolY: 10.5,
                    verticalAlign: "top",
                    width: 24,
                    x: 0,
                    y: 0
                }
            }
        },
        title: {
            text: ''
        },
        xAxis: {
            lineWidth: 0,
            tickWidth: 0,
            labels: {
                enabled: true
            },
            categories: categories
        },
        yAxis: [{
            min: 0,
            max: max2,
            labels: {
                enabled: true
            },
            gridLineWidth: 0,
            title: {
                text: null,
            },
        }, {
            min: 0,
            max: max1,
            labels: {
                enabled: true
            },
            gridLineWidth: 0,
            title: {
                text: null,
            }
        }],
        series: [{
            //name: 'Awesomness',
            color: '#fff',
            type: 'line',
            name: serieName2,
            data: serie2
        }, {
            //name: 'More Awesomness',
            color: main_color,
            type: 'line',
            yAxis: 1,
            name: serieName1,
            data: serie1
        }],
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            column: {
                dataLabels: {
                    enabled: true
                    //inside: true
                },
                borderWidth: 0,
                color: '#b2c831',
                shadow: false
            },
            line: {
                dataLabels: {
                    enabled: false
                },
                marker: {
                    enabled: true
                },
                lineWidth: 3
            }
        },
        tooltip: {
            enabled: true
        }
    });
}

function insertSparklines(targetId, chartData) {

    $('#' + targetId).highcharts({
        chart: {
            backgroundColor: null,
            //type: 'spline',            
            borderWidth: 0,
            type: 'area',
            margin: [2, 0, 2, 0],
            width: 250,
            height: 50,
            style: {
                overflow: 'visible'
            },

            // small optimalization, saves 1-2 ms each sparkline
            skipClone: true
        },
        exporting: { enabled: false },


        credits: { enabled: false },
        title: {
            text: ''
        },

        xAxis: {

            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            startOnTick: false,
            endOnTick: false,
            tickPositions: []
        },
        yAxis: [{
            endOnTick: false,
            startOnTick: false,
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            tickPositions: [0]

        }],
        tooltip: {
            shared: true,
            useHTML: true,
            backgroundColor: null,
            borderWidth: 0,
            shadow: false,
            hideDelay: 0,
            padding: 0,
            positioner: function (w, h, point) {
                return { x: point.plotX - w / 2, y: point.plotY - h };
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                animation: false,
                lineWidth: 1,
                shadow: false,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                marker: {
                    radius: 1,
                    states: {
                        hover: {
                            radius: 2
                        }
                    }
                },
                fillOpacity: 0.25
            },
            column: {
                negativeColor: '#910000',
                borderColor: 'silver'
            }
        },

        series: [{
            name: 'NAME' + " (Automation score)",
            data: chartData,
            dataLabels: {
                enabled: true,
                color: '#FFFFFF',
                align: 'right',
                format: '{x.name}' + '{point.y}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '5px',
                    fontFamily: 'Verdana, sans-serif'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{series.name}: {point.key}</span><table>',
                pointFormat: '<tr><td style="color:white;padding:0">Score: </td>' +
                '<td style="padding:0"><b>{point.y:.0f} %</b></td></tr>',
                footerFormat: '</table>',
                valueSuffix: ''
            }
        }]
    });
}


/** Salomon's Functions **/

function getMaximaFromSeriesData(seriesData) {
    var maxima = [];

    for (var i = 0; i < seriesData.length; i++) {
        maxima.push(Math.max.apply(Math, seriesData[i].slice(-12)));
    }

    return maxima;
}

function getMinimaFromSeriesData(seriesData) {
    var minima = [];

    for (var i = 0; i < seriesData.length; i++) {
        minima.push(Math.min.apply(Math, seriesData[i].slice(-12)));
    }

    return minima;
}

function getSeriesObjectForChart(seriesData, seriesNames, colors, yAxes) {
    var seriesObj = [];
    for (var i = 0; i < seriesData.length; i++) {
        seriesObj.push({
            name: seriesNames[i],
            data: seriesData[i].slice(-12),
            color: colors[i],
            //type: 'spline',
            //type: 'areaspline',
            yAxis: i //set yAxis config according to yAxisObj configs (by index)
        });
    }

    return seriesObj;
}

function getYAxisObjectForChart(maxima, minima) {

    if (!maxima) return null;
    var yAxis = [];

    for (var i = 0; i < maxima.length; i++) {
        yAxis.push({
            max: maxima[i],
            min: 0,
            labels: {
                enabled: true
            },
            gridLineWidth: 0,
            title: {
                text: null,
            },
            tickInterval: Math.ceil(maxima[i] / maxima.length)
        });
    }

    return yAxis;
}

function generateChartLinesRegular(targetId, title, subtitle, categories, seriesData, maxima, colors, seriesNames) {

    var categoriesObj = categories || [];
    var seriesData = seriesData || [];
    var title = title || '';
    var subtitle = subtitle || '';
    var maxima = maxima || getMaximaFromSeriesData(seriesData);
    var minima = minima || getMinimaFromSeriesData(seriesData);
    var seriesNames = seriesNames || [];
    var colors = Array.isArray(colors) ? colors : CSS_COLOR_NAMES;
    var yAxisObj = getYAxisObjectForChart(maxima, minima);
    var seriesObj = getSeriesObjectForChart(seriesData, seriesNames, colors);

    Highcharts.setOptions({
        lang: {
            contextButtonTitle: 'Export Chart'
        }
    });

    $('#' + targetId).highcharts({
        chart: {
            type: 'spline',
            backgroundColor: 'transparent',
            height: 200,
            marginLeft: 2,
            marginRight: 2,
            marginTop: 0,
            tickAlign: false
        },
        exporting: {
            enabled: true,
            buttons: {
                contextButton: {
                    align: "left",
                    enabled: true,
                    menuItems: [{
                        text: 'Export to PNG',
                        onclick: function () {
                            this.exportChart();
                        },
                        separator: false
                    }, {
                        text: 'Export to CSV',
                        onclick: function () {
                            this.downloadCSV();
                        },
                        separator: false
                    }],
                    height: 20,
                    symbol: "menu",
                    symbolFill: "#666666",
                    symbolSize: 14,
                    symbolStroke: "#666666",
                    symbolStrokeWidth: 1,
                    symbolX: 12.5,
                    symbolY: 10.5,
                    verticalAlign: "top",
                    width: 24,
                    x: 0,
                    y: 0
                }
            }
        },
        title: {
            text: title,
            useHTML: true
        },
        subtitle: {
            text: subtitle
        },
        xAxis: {
            lineWidth: 0,
            tickWidth: 0,
            labels: {
                enabled: true
            },
            categories: categoriesObj.slice(-12)
        },
        yAxis: yAxisObj,

        series: seriesObj,
        credits: {
            enabled: false
        },
        legend: {
            enabled: true,
            itemStyle: {
                "color": "white",
                "cursor": "pointer",
                "fontSize": "10px",
                "fontWeight": "normal",
                "textOverflow": "ellipsis"
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                }
            },
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
                dataLabels: {
                    enabled: true,
                    color: 'white'
                }
            }
        },
        tooltip: {
            enabled: true
        }
    });
}

function generateChartAreaRegular(targetId, title, subtitle, categories, seriesData, maxima, colors, seriesNames) {

    //var categoriesObj = categories || [];
    //var seriesData = seriesData || [];
    //var maxima = maxima || getMaximaFromSeriesData([seriesData]);
    //var seriesNames = seriesNames || [];
    //var colors = Array.isArray(colors) ? colors : CSS_COLOR_NAMES;
    //var yAxisObj = getYAxisObjectForChart(maxima);
    //var seriesObj = getSeriesObjectForChart(seriesData, seriesNames, colors);

    $('#' + targetId).highcharts({
        chart: {
            type: 'areaspline',
            height: 400,
            width: 420,
        },
        exporting: { enabled: false },
        title: {
            text: title
        },
        subtitle: {
            text: subtitle
        },
        xAxis: {
            lineWidth: 0,
            tickWidth: 0,
            labels: { enabled: true },
            categories: categories
        },
        series: {
            name: seriesNames,
            data: seriesData
        },
        credits: { enabled: false },
        legend: { enabled: false },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
        },
        tooltip: {
            enabled: true
        }
    });
}

function generateTitleToModalLink(modalId, title) {
    return '<a data-toggle="modal" data-target="#' + modalId + '">' + title + '</a>';
}