
    $(document).ready(
        function () {

            var modalHtml = '<div class="modal fade" id="exampleModalCenter" tabindex="- 1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">' +
                '<div class="modal-dialog modal-dialog-centered" role= "document" >' +
            '<div class="modal-content">' +
                    '<div class="modal-header">' +
                '<h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>' +
                '<div id="modal"></div>' +
                            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                            '<span aria-hidden="true">&times;</span>' +
                                '</button>' +
                            '</div>' +
                        '<div class="modal-body">' +
                            
                            '</div>' +
                        
                    '</div>' +
                  '</div >' +
                '</div >';

            $('body').append(modalHtml)
            $.each($('[id^=widgetChart]'), function (i, element) {
                element.onclick = function (evt) {
                    //alert(this.id);                    

                    //alert(this.chart.data);
                    //exportJSON(this);

                    this.setAttribute("data-toggle", "modal");
                    this.setAttribute("data-target", "#exampleModalCenter");
                    this.parentElement.parentElement.height = 1000;
                    $("#exampleModalLongTitle").text("XXX");
                    //$("#modal").html(this.parentElement.html());
                    $("#modal").html(cloneCanvas(this));;
                    //var activePoints = myNewChart.getElementsAtEvent(evt);
                    //if (activePoints[0]) {
                    //    var chartData = activePoints[0]['_chart'].config.data;
                    //    var idx = activePoints[0]['_index'];

                    //    var label = chartData.labels[idx];
                    //    var value = chartData.datasets[0].data[idx];

                    //    var url = "http://example.com/?label=" + label + "&value=" + value;
                    //    console.log(url);
                    //    alert(url);
                    //}
                };
            });
        });

function cloneCanvas(oldCanvas) {

    //create a new canvas
    var newCanvas = document.createElement('canvas');
    var context = newCanvas.getContext('2d');

    //set dimensions
    newCanvas.width = oldCanvas.width*5;
    newCanvas.height = oldCanvas.height*5;
    var img = oldCanvas.toDataURL("image/jpeg", 1.0);

    //apply the old canvas to the new one
    context.drawImage(oldCanvas, 0, 0); //, 500, 250);
    //context.drawImage(img, 0, 0); 

    //return the new canvas
    return  newCanvas;
}

function GetDataForDefects() {
    var defects = '';
    $.ajax({
        //url: '//localhost:12345/api/QC/GetDefectsStatistic', // + "?FolderName=.Regression&ParentFolderName=15.1%20FP1", //GetRAFDefects', 
        url: '//10.50.227.34/DevOpsAPI/API/QC/GetDefectsStatistic', // + "?FolderName=.Regression&ParentFolderName=15.1%20FP1", //GetRAFDefects', 
        //url:         '//localhost:62156/api/QC/GetStatisticForKBs', //' + GetMethodName,
        useDefaultXhrHeader: false,
        crossDomain: true,
        async: false,
        dataType: 'text',
        method: 'GET',
        success: function (data) {
            defects = JSON.parse(data);
        },
        error: function (data, textStatus, jqXHR) {
            defects = "ERROR: " + textStatus + " => " + data.statusText; //+ " => " + r.message + " => " + r.StackTrace;            
        }
    });
    
    return defects;
}

function GetDataForDefectsKPI() {
    var defects = '';
    $.ajax({
        url: '//10.50.227.34/DevOpsAPI/API/KPI/GetDefectsStatusAll', // + "?FolderName=.Regression&ParentFolderName=15.1%20FP1", //GetRAFDefects', 
        //url:         '//localhost:62156/api/QC/GetStatisticForKBs', //' + GetMethodName,
        useDefaultXhrHeader: false,
        crossDomain: true,
        async: false,
        dataType: 'text',
        method: 'GET',
        success: function (data) {
            defects = JSON.parse(data);
        },
        error: function (data, textStatus, jqXHR) {
            defects = "ERROR: " + textStatus + " => " + data.statusText; //+ " => " + r.message + " => " + r.StackTrace;            
        }
    });

    return defects;
}

function GetDefectsOpenVsClosed() {
    var defects = '';
    $.ajax({
        url: '//10.50.227.34/DevOpsAPI/API/KPI/GetDefectsOpenVsClosed', // + "?FolderName=.Regression&ParentFolderName=15.1%20FP1", //GetRAFDefects', 
        //url:         '//localhost:62156/api/QC/GetStatisticForKBs', //' + GetMethodName,
        useDefaultXhrHeader: false,
        crossDomain: true,
        async: false,
        dataType: 'text',
        method: 'GET',
        success: function (data) {
            defects = JSON.parse(data);
        },
        error: function (data, textStatus, jqXHR) {
            defects = "ERROR: " + textStatus + " => " + data.statusText; //+ " => " + r.message + " => " + r.StackTrace;            
        }
    });

    return defects;
}


function GetDefectsStatusByProduct() {
    var defects = '';
    $.ajax({
        url: '//10.50.227.34/DevOpsAPI/API/KPI/GetDefectsStatusByProduct', // + "?FolderName=.Regression&ParentFolderName=15.1%20FP1", //GetRAFDefects', 
        //url:         '//localhost:62156/api/QC/GetStatisticForKBs', //' + GetMethodName,
        useDefaultXhrHeader: false,
        crossDomain: true,
        async: false,
        dataType: 'text',
        method: 'GET',
        success: function (data) {
            defects = JSON.parse(data);
        },
        error: function (data, textStatus, jqXHR) {
            defects = "ERROR: " + textStatus + " => " + data.statusText; //+ " => " + r.message + " => " + r.StackTrace;            
        }
    });

    return defects;
}

function insertCardWithSingleValue(target, value, comment) {
    var cardHtml = '<div class="card col-lg-2 col-md-12 no-padding no-shadow"><div class="card-body bg-flat-color-1"><div class="h1 text-light text-right mb-4"><i class="fa fa-comments-o"></i></div>' +
        '<div class="h4 mb-0 text-light"><span class="count">'+value+'</span></div>' +
        '<small class="text-light text-uppercase font-weight-bold">' + comment + '</small><div class="progress progress-xs mt-3 mb-0 bg-light" style="width: 40%; height: 5px;">' +
        '</div></div></div>';

    var cardHtml2 = '<div class="col-md-1 col-sm-4 col-xs-12 tile_stats_count"><span class="count_top"><i class="fa fa-bug"></i> ' + comment +'</span >' +
            '<div class="count">' + value + '</div>' +
            //'<span class="count_bottom"><i class="green">4% </i> From last Week</span>' +
            '</div>';

    $('#' + target).append(cardHtml);
}

function updateCardWithMultipleValues(target, title, comment, messages, values, containerId, img) {

    if ($('#' + containerId).length <= 0) {
        $('#' + target).append('<div id="' + containerId + '"></div>');
    }
    else {
        $('#' + containerId).empty();
    }

    inserCardWithMultipleValues(containerId, title, comment, messages, values, img)
    //inserCardWithMultipleValues(containerId, title, comment, messages, values, img)
    //insertCard(containerId, title, comment, 10, 50, img, 4);
}

function inserCardWithMultipleValues(target, title, comment, dicElementInList, values, img) {
    if (typeof (img) == 'undefined') {
        img = 'https://www.practicalrecovery.com/wp-content/uploads/2016/12/character-defects-in-recovery-300x300.png'
    }
    try {
        var cardHtml = '';
        $.each(Object.keys(dicElementInList), function (i, element) {
            cardHtml += '<div class="col-lg-2"><aside class="profile-nav alt"><section class="card"><ul class="list-group list-group-flush">';

            var pipeTitle = dicElementInList[element]["Title"];
            var pipeSubTitle = dicElementInList[element]["SubTitle"];
            var pipeCI = dicElementInList[element]["Data"]; //["CI"][0];
            //var pipeCD = dicElementInList[element]["CD"][0];
            var pipeInfoCI = dicElementInList[element]["Info"]; //["CI"];
            //var pipeInfoCD = dicElementInList[element]["info"]["CD"];

            if (typeof (pipeCI) === 'undefined' || typeof (pipeCI.name) === 'undefined' || typeof (pipeInfoCI['health']) == 'undefined') { //for defects
                //cardHtml += '<li class="list-group-item"><a href="#"><i class="fa fa-bug"></i> ' + dicElementInList[element] + ' <span class="badge badge-success pull-right">' + values[element] + '</span></a></li>';
            }
            else { //for pipelines
                var product = element; //pipeCI.name.replace('-jenkins', '').toUpperCase();
                cardHtml += '<li class="list-group-item ' + getStatusClass(pipeCI.result) + '">' +
                    //'<div class="' + getStatusClass(pipeCI.result) + '">' +
                    '<a href="' + pipeCI.pipeline_link.replace('/wfapi', '') + '" target="_blank">' +
                    '<h1>' +
                    '<span class="pull-right ' + getStatusClass(pipeCI.result) + '"> ' + getStatusIcon(pipeCI.result) + '</span>' +
                    '<span class="pull-left ' + getStatusClass(pipeCI.result) + ' w-75 pull-left text-truncate"> ' + pipeTitle + '   </span>' +
                    '</h1>' +
                    '</a>';
                    //'</div>';

                if (typeof (pipeInfoCI['health']['score']) == 'undefined') { pipeInfoCI['health']['score'] = 0 }

                cardHtml += '<li class="list-group-item">' +
                    //'<a href="#' + pipeCI.name.replace('-jenkins', '-CI').toUpperCase() + '">' +
                    //'<a href="#' + pipeTitle + '">' +
                    //'<h5>' +
                    //'<span class="w-75 pull-left text-truncate" data-toggle="tooltip" data-placement="right" title="Job: ' + pipeSubTitle + '">' + pipeSubTitle + '     </span>' +
                    //    '<span class="pull-right">' +
                    //'<a href="' + pipeCI.pipeline_link.replace('wfapi/', '/consoleFull') + '" target="_blank" class="fa fa-play-circle text-success"></a>' +
                    //    '</span>' +
                    //    //'<span class="pull-right">' + getStatusIcon(pipeCI.result) + '</span>' +
                    //'</h5>' +
                    //'</a>' +
                    //pull-left
                    //'<h5><span class="badge badge-light">Job:</span>' +
                    
                    //'<hr></hr>' +

                    
                    
                    //'<br><span class="badge badge-light  pull-left">Builds: </span><span class="badge badge-light  pull-right">' + pipeCI.id + '</span>' +
                    
                    //'<hr></hr>' +
                    //'<div class="row"></div> ' +
                    //'<p>' +
                    '<h3><span class="badge badge-light pull-left">Last Build: ' + pipeCI.id + '</span>' +
                    '<span class="badge badge-light pull-right"><a href="' + pipeCI.pipeline_link.replace('wfapi/', '/consoleFull') + '" target="_blank" class="fa fa-file-text-o text-success"> </a></span></h3>' +
                    
                    '<p>' +
                    
                    '<div>' +
                    //'<hr>' +
                    '<br><span class="badge badge-light pull-left">Started: </span><span class="badge badge-light pull-right">' + pipeCI.start + '</span>' +
                    '<br><span class="badge badge-light pull-left">Duration: </span><span class="badge badge-light pull-right">' + millisecondsToTime(pipeCI.duration) + '</span>' +
                    '<br><span class="badge badge-light pull-left">Score: </span><span class="badge badge-light pull-right">' + pipeInfoCI['health'].score + '</span>' +
                    '<br><span class="badge badge-light pull-left">Job: </span><span class="badge badge-light pull-right">' + pipeSubTitle + '</span>' +
                    //'<br><div class="accordion" id="accordionChanges"><div class="card"><div class="card-header" id="headingOne"><h5 class="mb-0"><button class="btn btn-link" type="button" data-toggle="collapse" data-target="#' + element+ 'collapseOne" aria-expanded="false" aria-controls="collapseOne">Collapsible Group Item #1</button></h5></div>' +
                    //'<div id="' + element +'collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionChanges"><div class="card-body">' + pipeInfoCI['changes'] + '</div></div></div>' +


                    //'<br><span class="badge badge-light  pull-left">Commiters: </span><span class="badge badge-light pull-left w-75 text-truncate">' + (pipeInfoCI['changes']['userMeassage'] || '-') + '</span>' + 
                    '<br><span class="badge badge-light">' + pipeInfoCI['changes']['message'] + '</span>' + 

                    '<hr />' +
                    '</div>' +
                    '<p>' +

                    '<div>' +

                    '<div class="pull-left">' +
                    '<h5><span class="badge badge-light">Last Success: </span></h5>' +
                    '<h3><span class="badge badge-light">' + pipeInfoCI['lastSuccessfulBuild'] + '</span></h3>' +

                    '</div>' +


                    '<div class="pull-right">' +
                    '<h5><span class="badge badge-light">Last Failed: </span></h5>' +
                    '<h3><span class="badge badge-light">' + pipeInfoCI['lastUnsuccessfulBuild'] + '</span></h3>' +
                    '</div>' +

                    '</div>' +

                    //'<p>' +
                    //'<hr></hr>' +
                    //'<h5>' +
                    //'<span class="badge badge-light text-truncate w-75" style="white-space: nowrap;">' + pipeSubTitle + '</span>' +
                    //'<span><a href="' + pipeCI.pipeline_link.replace('wfapi/', '/consoleFull') + '" target="_blank" class="fa fa-file-text-o text-success"> </a>' +
                    //'</span></h5>' +

                    
                    '</li>';
                //try {
                //    cardHtml += '<li class="list-group-item"><a href="#' + pipeCD.name.replace('-jenkins', '-CD').toUpperCase() + '"><h3>CD   <span class="pull-right">' +
                //        '<a href="' + pipeCD.pipeline_link.replace('lastBuild/wfapi/', 'build?delay=0sec') + '" target="_blank" class="fa fa-play-circle text-success"></a></span>' + '<span class="pull-right">' + getStatusIcon(pipeCD.result) + '</span></h3></a>' +
                //        '<a href="' + pipeCD.pipeline_link.replace('/wfapi', '') + '" target="_blank">Builds: <span class="badge badge-light  pull-right">' + pipeCD.id + '</span></a><br>Start: <span class="badge badge-light  pull-right">' + pipeCD.start + '</span><br>Duration: <span class="badge badge-light  pull-right">' + millisecondsToTime(pipeCD.duration) + '</span>' +
                //        '<br>Score: <span class="badge badge-light  pull-right">' + pipeInfoCD['health'].score + '</span>' +
                //        '<br>Last Success: <span class="badge badge-light  pull-right">' + pipeInfoCD['lastSuccessfulBuild'] + '</span>' +
                //        '<br>Last Failed: <span class="badge badge-light  pull-right">' + pipeInfoCD['lastFailedBuild'] + '</span>' +
                //        '</li>';
                //} catch (e) {
                //    console.log(e);
                //}
            }

            cardHtml += '</ul></section></aside></div>';
        });
    } catch (ex) {
        alert(ex);
    }
    //'<li class="list-group-item"><a href="#"> <i class="fa fa-comments-o"></i> Message <span class="badge badge-warning pull-right r-activity">03</span></a></li>' +
    //cardHtml += '</ul></section></aside></div>';

    $('#' + target).append(cardHtml);
}


function inserCardWithMultipleValues_Orig(target, title, comment, dicElementInList, values, img) {
    if (typeof (img) == 'undefined') {
        img = 'https://www.practicalrecovery.com/wp-content/uploads/2016/12/character-defects-in-recovery-300x300.png'
    }

    var cardHtml = '<div class="col-md-3"><aside class="profile-nav alt"><section class="card">' +
        '<div class="card-header user-header alt bg-dark"><div class="media"><a href="#">' +
        '<img class="align-self-center rounded-circle mr-3" style="width:85px; height:85px;" alt="" src="' + img +'"></a>' +
        '<div class="media-body"><h2 class="text-light display-6">' + title + '</h2><p>' + comment + '</p></div></div></div>';
        //'<ul class="list-group list-group-flush"><li class="list-group-item"><a href="#"> <i class="fa fa-envelope-o"></i> Mail Inbox <span class="badge badge-primary pull-right">10</span></a></li>' +
        //'<li class="list-group-item"><a href="#"> <i class="fa fa-tasks"></i> Recent Activity <span class="badge badge-danger pull-right">15</span></a></li>' +
    $.each(Object.keys(dicElementInList), function (i, element) {
        var pipe = dicElementInList[element][0];
        if (typeof (pipe.name) === 'undefined' ) { //for defects
            cardHtml += '<li class="list-group-item"><a href="#"><i class="fa fa-bug"></i> ' + dicElementInList[element] + ' <span class="badge badge-success pull-right">' + values[element] + '</span></a></li>';
        }
        else { //for pipelines
            cardHtml += '<li class="list-group-item"><a href="#' + pipe.name.replace('-jenkins', '').toUpperCase() + '"><h3><i class="fa fa-code-fork"></i> ' + pipe.name.replace('-jenkins', '').toUpperCase() + '   <span class="pull-right">' +
                '<a href="' + pipe.pipeline_link.replace('lastBuild/wfapi/', 'build?delay=0sec') + '" target="_blank" class="fa fa-play-circle text-success"></a></span>' + '<span class="pull-right">' + getStatusIcon(pipe.result) + '</span></h3></a>' +
                '<a href="' + pipe.pipeline_link.replace('/wfapi', '') + '" target="_blank">Builds: <span class="badge badge-light  pull-right">' + pipe.id + '</span></a><br>Last run: <span class="badge badge-light  pull-right">' + pipe.start + '</span><br>Duration: <span class="badge badge-light  pull-right">' + millisecondsToTime(pipe.duration) + '</span></li>';
        }
        });
        
        //'<li class="list-group-item"><a href="#"> <i class="fa fa-comments-o"></i> Message <span class="badge badge-warning pull-right r-activity">03</span></a></li>' +
        cardHtml += '</ul></section></aside></div>';

        $('#' + target).append(cardHtml);
}

function insertCardWithCloseAndCollapse(target, value, title) {
    var cardHtml = '<div class="col-md-3 col-xs-12 widget widget_tally_box">' +
        '<div class="x_panel">' +
        '<div class="x_title">' +
        '<h2>' + title + '</h2>' +
        '<ul class="nav navbar-right panel_toolbox">' +
        '<li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a></li>' +
        '<li><a class="close-link"><i class="fa fa-close"></i></a></li>' +
        '</ul><div class="clearfix"></div>' +
        '</div>' +
        '<div class="x_content">' +
        '<div style="text-align: center; margin-bottom: 17px">' +
        '<span class="chart" data-percent="' + value + '">' +
        '<span class="percent">' + value + '</span><canvas height="110" width="110"></canvas>' +
        '</span>' +
        '</div>' +
        '<div class="pie_bg" style="text-align: center; display: none; margin-bottom: 17px"><canvas id="canvas_doughnut" height="130"></canvas></div>' +
        '</div>' +
        '</div>';

    $('#' + target).append(cardHtml);
}

function createCardHtml(cardId, title, subtitle, colSpan) {
    if (typeof (colSpan) != 'undefined') { colSpan = 4 * colSpan; }
    else { colSpan = 3; }

    var cardHtml = '<div class="col-sm-' + colSpan + ' col-lg-' + colSpan + '"><h4 class="mb-0"><span class="count">' + title + '</span></h4><p>' + subtitle + '</p><div class="card text-black bg-white"><div class="card-body pb-0"><div class="dropdown float-right"></div><div class="chart-wrapper px-0" style="height:250px;"><canvas id="' + cardId + '"></canvas></div></div></div></div>';
    return cardHtml;
}

function insertCardChart1Dataset(target, labelsArray, dataArray1, dataLabel, title, subtitle, chartType, colSpan) {
    var rndID = 'widgetChart' + Math.floor(Math.random() * 1000) + 1;

    var cardHtml = createCardHtml(rndID, title, subtitle, colSpan);    
    $('#' + target).append(cardHtml);
    insertChart1Dataset(rndID, labelsArray, dataArray1, dataLabel, chartType);
}

function insertCardChart2Datasets(target, labelsArray, dataArray1, dataArray2, dataLabel, title, subtitle, max1, max2) {
    var rndID = 'widgetChart' + Math.floor(Math.random() * 1000) + 1; 

            /*.bg-primary            .bg-secondary            .bg-success            .bg-danger            .bg-warning            .bg-info            .bg-light            .bg-dark            .bg-white*/

    var cardHtml = createCardHtml(rndID, title, subtitle);
    //var cardHtml = '<div class="col-sm-6 col-lg-3"><div class="card text-white bg-primary"><div class="card-body pb-0"><div class="dropdown float-right"></div><h4 class="mb-0"><span class="count">' + title + '</span></h4><p class="text-light">' + subtitle + '</p><div class="chart-wrapper px-0" style="height:70px;" height="70"><canvas id="' + rndID + '"></canvas></div></div></div></div>';
    $('#' + target).append(cardHtml);
    insertChart2Datasets(rndID, labelsArray, dataArray1, dataArray2, dataLabel, max1, max2);
}

function insertCardChart3Datasets(target, labelsArray, dataArray1, dataArray2, dataArray3, dataLabel, title, subtitle, max1, max2) {
    var rndID = 'widgetChart' + Math.floor(Math.random() * 1000) + 1;

    /*.bg-primary            .bg-secondary            .bg-success            .bg-danger            .bg-warning            .bg-info            .bg-light            .bg-dark            .bg-white*/

    var cardHtml = createCardHtml(rndID, title, subtitle);
    //var cardHtml = '<div class="col-sm-6 col-lg-3"><div class="card text-white bg-primary"><div class="card-body pb-0"><div class="dropdown float-right"></div><h4 class="mb-0"><span class="count">' + title + '</span></h4><p class="text-light">' + subtitle + '</p><div class="chart-wrapper px-0" style="height:70px;" height="70"><canvas id="' + rndID + '"></canvas></div></div></div></div>';
    $('#' + target).append(cardHtml);
    insertChart3Datasets(rndID, labelsArray, dataArray1, dataArray2, dataArray3, dataLabel, max1, max2);
}

function insertChart1Dataset(target, labelsArray, dataArray1, dataLabel, chartType = 'bar') {
    var chartDatasets = [{ type: chartType, data: dataArray1, label: dataLabel, backgroundColor: 'rgba(255,255,255,.3)', borderColor: 'blue' }];

    //insertChart(target, labelsArray, chartDatasets, dataLabel);
    //insertChart(target, labelsArray, chartDatasets, dataLabel);
    insertChartBar(target, labelsArray, chartDatasets, dataLabel);
}

function insertChart2Datasets(target, labelsArray, dataArray1, dataArray2, dataLabel, max1, max2) {
    var chartDatasets = [{ type: 'line', data: dataArray1, label: dataLabel, backgroundColor: 'rrgba(131, 201, 143, 1)', borderColor: 'black', yAxisID: 'left-y-axis' },
        { type: 'line', data: dataArray2, label: dataLabel, backgroundColor: 'rgba(255,255,255,.3)', borderColor: 'green', borderWidth: 3, yAxisID: 'right-y-axis' }];

    insertChart(target, labelsArray, chartDatasets, dataLabel, max1, max2);
    //insertChartBar(target, labelsArray, chartDatasets, dataLabel);
}

function insertChart3Datasets(target, labelsArray, dataArray1, dataArray2, dataArray3, dataLabel, max1, max2) {
    var chartDatasets = [{ type: 'line', data: dataArray1, label: dataLabel, backgroundColor: 'rrgba(131, 201, 143, 1)', borderColor: 'black', yAxisID: 'left-y-axis' },
        { type: 'line', data: dataArray2, label: dataLabel, backgroundColor: 'rgba(255,255,255,.3)', borderColor: 'green', borderWidth: 3, yAxisID: 'left-y-axis' },
        { type: 'bar', data: dataArray3, label: dataLabel, backgroundColor: '#36a2eb', borderColor: 'blue', yAxisID: 'right-y-axis' }];

    insertChart(target, labelsArray, chartDatasets, dataLabel, max1, max2);
    //insertChartBar(target, labelsArray, chartDatasets, dataLabel);
}

function insertChartBar(target, labelsArray, chartDatasets, dataLabel) {
    var ctx = document.getElementById(target);
    //ctx.height = 60;
    var myChart = new Chart(ctx, {        
        data: {
            labels: labelsArray, 
            datasets: chartDatasets
        },
        options: {
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 10
                }
            },
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    scaleBeginAtZero: false,
                    display: true,
                    categoryPercentage: 0.5,
                    barPercentage: 0.5
                }],
                yAxes: [{
                    display: true
                }]
            },
            elements: {
                line: {
                    tension: 0.00001,
                    borderWidth: 1
                },
                point: {
                    radius: 2,
                    hitRadius: 10,
                    hoverRadius: 4
                }
            }
        }
    });

    //var original = myChart.onClick;
    //myChart.onClick = function (e) {
    //    // Insert your custom functionality here
    //    alert(myChart.data);
    //};
}

function insertChart(target, labelsArray, chartDatasets, dataLabel, max1, max2) {

    var ctx = document.getElementById(target);
    //ctx.height = 150;
    try {
        var myChart = new Chart(ctx, {
            data: {
                labels: labelsArray,
                datasets: chartDatasets
            },
            options: {
                layout: {
                    padding: {
                        left: 0,
                        right: -10,
                        top: 0,
                        bottom: 10
                    }
                },
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                responsive: true,
                tooltips: {
                    mode: 'index',
                    titleFontSize: 8,
                    titleFontColor: '#000',
                    bodyFontColor: '#000',
                    backgroundColor: '#fff',
                    titleFontFamily: 'Montserrat',
                    bodyFontFamily: 'Montserrat',
                    cornerRadius: 3,
                    intersect: false,
                },
                scales: {
                    xAxes: [{
                        display: true,
                        type: 'category',
                        categoryPercentage: 1,
                        barPercentage: 0.5,
                        gridLines: {
                            color: 'transparent',
                            zeroLineColor: 'transparent'
                        },
                        ticks: {
                            beginAtZero: false//,
                            //fontSize: 2,
                            //fontColor: 'black' //''transparent'
                        }
                    }],
                    yAxes: [{
                        id: 'left-y-axis',
                        type: 'linear',
                        position: 'left',
                        display: true,                        
                        ticks: {
                            beginAtZero: false,
                            display: true,
                            max: max1,
                            min: 0
                        }
                    }, {
                        id: 'right-y-axis',
                        type: 'linear',
                        display: true,
                        position: 'right',                        
                        ticks: {
                            beginAtZero: true,
                            display: true,
                            max: max2,
                            min: 0
                        }
                    }]
                },
                title: {
                    display: false,
                },
                elements: {
                    line: {
                        tension: 0.00001,
                        borderWidth: 1
                    },
                    point: {
                        radius: 2,
                        hitRadius: 10,
                        hoverRadius: 4
                    }
                }
            }
        });
    } catch (ex) {
        alert(ex);
    }
}
