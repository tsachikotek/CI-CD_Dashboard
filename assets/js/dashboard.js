( function ( $ ) {
    "use strict";

    AddServer();
    UpdateServers();
    //var servers = GetMonitoringServers();

})(jQuery);

function DeactiveMonitorServer(jenkinsServer, jobName) {
    //RemoveMonitorServer([FromUri]string ip, [FromUri]string job_to_monitor)
    var jenkins_url = 'http://10.50.227.34/DevOpsAPI/api/dashboard/DeactiveMonitorServer?ip=' + jenkinsServer + '&job_to_monitor=' + jobName;
    var pipelines = '';
    var result = '';

    if (typeof (async) == 'undefined') {
        async = false;
    }

    if (typeof (oldPipeline) == 'undefined') {
        oldPipeline = false;
    }

    $.ajax({
        url: jenkins_url, // + "?FolderName=.Regression&ParentFolderName=15.1%20FP1", //GetRAFDefects', 
        //url:         '//localhost:62156/api/QC/GetStatisticForKBs', //' + GetMethodName,
        useDefaultXhrHeader: false,
        crossDomain: true,
        async: async,
        dataType: 'text',
        method: 'GET',
        success: function (data) {
            pipelines = 'Succeeded'; //JSON.parse(data);
            //result = parsePipelineInfo(pipelines, pipeline_url, jenkins_url, jenkinsServer);
        },
        error: function (data, textStatus, jqXHR) {
            pipelines = "ERROR: " + textStatus + " => " + data.statusText; //+ " => " + r.message + " => " + r.StackTrace;            
        }
    });

    //var jsonPipelines = [{ 'id': '1', 'name': 'demo1', 'start': 'few minutes ago...', 'builtOn': 'demoMachine', 'url': 'http://google.com', 'result': 'success', 'stages': [{ 'name': 'stage01', 'tasks': [{ 'name': 'job01', 'status': 'success' }, { 'name': 'job02', 'status': 'success' }, { 'name': 'job03', 'status': 'success' }, { 'name': 'job04', 'status': 'success' }] }, { 'name': 'stage02', 'tasks': [{ 'name': 'job01', 'status': 'cancelled' }, { 'name': 'job02', 'status': 'cancelled' }, { 'name': 'job03', 'status': 'cancelled' }, { 'name': 'job04', 'status': 'cancelled' }] }, { 'name': 'stage03', 'tasks': [{ 'name': 'job01', 'status': 'failed' }, { 'name': 'job02', 'status': 'failed' }, { 'name': 'job03', 'status': 'failed' }, { 'name': 'job04', 'status': 'failed' }] }, { 'name': 'stage04', 'tasks': [{ 'name': 'job01', 'status': 'success' }, { 'name': 'job02', 'status': 'success' }, { 'name': 'job03', 'status': 'success' }, { 'name': 'job04', 'status': 'running' }] }, { 'name': 'stage05', 'tasks': [{ 'name': 'job01', 'status': 'success' }, { 'name': 'job02', 'status': 'cancelled' }, { 'name': 'job03', 'status': 'success' }, { 'name': 'job04', 'status': 'running' }] }], 'score': '90' }];

    return pipelines; //result; //parsePipeli
}

function ReactiveMonitorServer(jenkinsServer, jobName) {
    //RemoveMonitorServer([FromUri]string ip, [FromUri]string job_to_monitor)
    var jenkins_url = 'http://10.50.227.34/DevOpsAPI/api/dashboard/ReactiveMonitorServer?ip=' + jenkinsServer + '&job_to_monitor=' + jobName;
    var pipelines = '';
    var result = '';

    if (typeof (async) == 'undefined') {
        async = false;
    }

    if (typeof (oldPipeline) == 'undefined') {
        oldPipeline = false;
    }

    $.ajax({
        url: jenkins_url, // + "?FolderName=.Regression&ParentFolderName=15.1%20FP1", //GetRAFDefects', 
        //url:         '//localhost:62156/api/QC/GetStatisticForKBs', //' + GetMethodName,
        useDefaultXhrHeader: false,
        crossDomain: true,
        async: async,
        dataType: 'text',
        method: 'GET',
        success: function (data) {
            pipelines = 'Succeeded'; //JSON.parse(data);
            //result = parsePipelineInfo(pipelines, pipeline_url, jenkins_url, jenkinsServer);
        },
        error: function (data, textStatus, jqXHR) {
            pipelines = "ERROR: " + textStatus + " => " + data.statusText; //+ " => " + r.message + " => " + r.StackTrace;            
        }
    });

    //var jsonPipelines = [{ 'id': '1', 'name': 'demo1', 'start': 'few minutes ago...', 'builtOn': 'demoMachine', 'url': 'http://google.com', 'result': 'success', 'stages': [{ 'name': 'stage01', 'tasks': [{ 'name': 'job01', 'status': 'success' }, { 'name': 'job02', 'status': 'success' }, { 'name': 'job03', 'status': 'success' }, { 'name': 'job04', 'status': 'success' }] }, { 'name': 'stage02', 'tasks': [{ 'name': 'job01', 'status': 'cancelled' }, { 'name': 'job02', 'status': 'cancelled' }, { 'name': 'job03', 'status': 'cancelled' }, { 'name': 'job04', 'status': 'cancelled' }] }, { 'name': 'stage03', 'tasks': [{ 'name': 'job01', 'status': 'failed' }, { 'name': 'job02', 'status': 'failed' }, { 'name': 'job03', 'status': 'failed' }, { 'name': 'job04', 'status': 'failed' }] }, { 'name': 'stage04', 'tasks': [{ 'name': 'job01', 'status': 'success' }, { 'name': 'job02', 'status': 'success' }, { 'name': 'job03', 'status': 'success' }, { 'name': 'job04', 'status': 'running' }] }, { 'name': 'stage05', 'tasks': [{ 'name': 'job01', 'status': 'success' }, { 'name': 'job02', 'status': 'cancelled' }, { 'name': 'job03', 'status': 'success' }, { 'name': 'job04', 'status': 'running' }] }], 'score': '90' }];

    return pipelines; //result; //parsePipeli
}

function AddMonitorServer(jenkinsServer, jobName, name, category) {
    //api/Jenkins/GetBuildInfo?jenkinsServer=10.110.4.129&jobName=Install&buildId=lastSuccessfulBuild
    if ((typeof (jenkinsServer) == 'undefined') || (typeof (jobName) == 'undefined') || (typeof (name) == 'undefined') || jenkinsServer == '' || jobName == '' || name == '') {
        alert('Missing or Invalid parameter(s): Jenkins Name' + name + ' Jenkins Server' + jenkinsServer + ' Jenkins Job' + jobName);
        return '';
    }
    //

    if (typeof (async) == 'undefined') {
        async = false;
    }

    if (typeof (oldPipeline) == 'undefined') {
        oldPipeline = false;
    }

    //var jenkins_url = '//localhost:12345/api/Jenkins/GetPipelinesInfo?jenkinsServer=' + jenkinsServer + '&jobName=' + jenkinsPipelineJob ;
    //var pipeline_url = '//' + jenkinsServer + ':8080/job/' + jenkinsPipelineJob + '/' + buildId + '/api/json';
    var jenkins_url = 'http://10.50.227.34/DevOpsAPI/api/dashboard/AddMonitorServer?ip=' + jenkinsServer + '&job_to_monitor=' + jobName + '&name=' + name + '&category=' + category + '&refresh_rate=1000';
    
    var pipelines = '';
    var result = '';
    $.ajax({
        url: jenkins_url, // + "?FolderName=.Regression&ParentFolderName=15.1%20FP1", //GetRAFDefects', 
        //url:         '//localhost:62156/api/QC/GetStatisticForKBs', //' + GetMethodName,
        useDefaultXhrHeader: false,
        crossDomain: true,
        async: async,
        dataType: 'text',
        method: 'GET',
        success: function (data) {
            pipelines = 'Succeeded'; //JSON.parse(data);
            //result = parsePipelineInfo(pipelines, pipeline_url, jenkins_url, jenkinsServer);
        },
        error: function (data, textStatus, jqXHR) {
            pipelines = "ERROR: " + textStatus + " => " + data.statusText; //+ " => " + r.message + " => " + r.StackTrace;            
        }
    });

    //var jsonPipelines = [{ 'id': '1', 'name': 'demo1', 'start': 'few minutes ago...', 'builtOn': 'demoMachine', 'url': 'http://google.com', 'result': 'success', 'stages': [{ 'name': 'stage01', 'tasks': [{ 'name': 'job01', 'status': 'success' }, { 'name': 'job02', 'status': 'success' }, { 'name': 'job03', 'status': 'success' }, { 'name': 'job04', 'status': 'success' }] }, { 'name': 'stage02', 'tasks': [{ 'name': 'job01', 'status': 'cancelled' }, { 'name': 'job02', 'status': 'cancelled' }, { 'name': 'job03', 'status': 'cancelled' }, { 'name': 'job04', 'status': 'cancelled' }] }, { 'name': 'stage03', 'tasks': [{ 'name': 'job01', 'status': 'failed' }, { 'name': 'job02', 'status': 'failed' }, { 'name': 'job03', 'status': 'failed' }, { 'name': 'job04', 'status': 'failed' }] }, { 'name': 'stage04', 'tasks': [{ 'name': 'job01', 'status': 'success' }, { 'name': 'job02', 'status': 'success' }, { 'name': 'job03', 'status': 'success' }, { 'name': 'job04', 'status': 'running' }] }, { 'name': 'stage05', 'tasks': [{ 'name': 'job01', 'status': 'success' }, { 'name': 'job02', 'status': 'cancelled' }, { 'name': 'job03', 'status': 'success' }, { 'name': 'job04', 'status': 'running' }] }], 'score': '90' }];

    return pipelines; //result; //parsePipeli

}

function AddServer() {
    AddServerLink();
}

function AddServerLink() {
    $.each($('[id^=addServer]'), function (i, element) {
        element.onclick = function (evt) {
            this.setAttribute("href", "jenkinsServers.html");
            this.setAttribute("target", "_blank");
            //target="_blank"
            //href = "where-you-want-to-go"
        }
    });

    //addServerAction
}

function AddServerModal () {

    var modalHtml = '<div class="modal fade" id="exampleModalCenter" tabindex="- 1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">' +
        '<div class="modal-dialog modal-dialog-centered" role= "document" >' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<h5 class="modal-title" id="exampleModalLongTitle">Add Jenkins Job to Monitoring</h5>' +
        '<div id="modal"></div>' +
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
        '<button type="button" class="btn btn-primary">Add</button>' + 
        '<span aria-hidden="true">&times;</span>' +
        '</button>' +
        '</div>' +
        '<div class="modal-body">' +

        '</div>' +

        '</div>' +
        '</div >' +
        '</div >';

    $('body').append(modalHtml)

    $.each($('[id^=addServer]'), function (i, element) {
        element.onclick = function (evt) {
            //alert(this.id);                    

            //alert(this.chart.data);
            //exportJSON(this);

            this.setAttribute("data-toggle", "modal");
            this.setAttribute("data-target", "#exampleModalCenter");
            this.parentElement.parentElement.height = 1000;
            $("#exampleModalLongTitle").text("XXX");
            //$("#modal").html(this.parentElement.html());

            var formHtml =
            '<form> ' +
                '<div class="form-group">' +
                    '<label for="recipient-name" class="col-form-label">Recipient:</label>' +
                    '<input type="text" class="form-control" id="recipient-name">' +
                '</div>' +
                '<div class="form-group">' +
                    '<label for="message-text" class="col-form-label">Message:</label>' +
                    '<textarea class="form-control" id="message-text"></textarea>' +
                '</div>' +
            '</form>';

            $("#modal").html(formHtml);
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
}

function deactiveMonitorServerSubmit(jenkinsServer, jobName) {
    try {

        var ret = DeactiveMonitorServer(jenkinsServer, jobName);

        if (ret != 'Succeeded') {
            try { addAlert("msg", ret, 'danger'); } catch (ex) { }
        } else {
            try { addAlert("msg", ret, 'success'); } catch (ex) { }
        }
    }
    catch (ex2) { }

    UpdateServers();
    //e.preventDefault();
    //e.stopPropagation();
}

function reactiveMonitorServerSubmit(jenkinsServer, jobName) {
    try {

        var ret = ReactiveMonitorServer(jenkinsServer, jobName);

        if (ret != 'Succeeded') {
            try { addAlert("msg", ret, 'danger'); } catch (ex) { }
        } else {
            try { addAlert("msg", ret, 'success'); } catch (ex) { }
        }
    }
    catch (ex2) { }

    UpdateServers();
    //e.preventDefault();
    //e.stopPropagation();
}

function addServerSubmit() {
    try {     

        var serverName = $("#serverName").val().trim();
        var serverAddress = $("#serverAddress").val().trim();
        var serverJob = $("#serverJob").val().trim();

        //alert(serverName + ' ' + serverAddress + ' ' + serverJob);
        if (ValidateIPaddress(serverAddress)) {
            var ret = AddMonitorServer(serverAddress, serverJob, serverName, 'All');
            if (ret != 'Succeeded') { try { addAlert("msg", ret, 'danger'); } catch (ex) { } } else {
                try { addAlert("msg", ret, 'success'); } catch (ex) { }
            }
        }
        else {
            try { addAlert("msg", 'Invalid IP address', 'danger'); } catch (ex) { } //+ '<br>Link: ' + pipe.pipeline_link
        }
    }
    catch (ex2) { }

    UpdateServers();
    //e.preventDefault();
    //e.stopPropagation();
}

function ValidateIPaddress(ipaddress) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
        return (true)
    }
    //alert("You have entered an invalid IP address!")
    return (false)
} 

function GetMonitoringServers() {
    var serversToMonitor = [];
    var jServersToMonitor = GetRestByMethod('Dashboard', 'GetMonitorServers');

    try {
        serversToMonitor = eval(jServersToMonitor).Table;
    }
    catch (err) {
        serversToMonitor = JSON.parse(jServersToMonitor).Table;
    }

    

    return serversToMonitor;
}

function UpdateServers() {

    //monitorServers
    $('#monitorServers').empty();

    var servers = GetMonitoringServers();

    $(servers).each(function (index, server) {
        //startMonitorPipeline(server.ip, server.job_to_monitor, server.name);
        var cardHtml = AddCard(server);

        $('#monitorServers').append(cardHtml);
        
    });
}

function CardHtml(title, value, status) {
    //serverInfo.result = '';
    //serverInfo.name = server.name;
    //serverInfo.subTitle = server.job_to_monitor;
    var cardHtml = '';
    var btn = '';
    

    cardHtml += '<div class="col-lg-2"><aside class="profile-nav alt"><section class="card"><ul class="list-group list-group-flush">';
    cardHtml += '<li class="list-group-item ' + getStatusClass(status) + '">' +

        //'<a href="' + pipeCI.pipeline_link.replace('/wfapi', '') + '" target="_blank">' +
        '<h3>' +
        '<span class="pull-right ' + getStatusClass(status) + '"> ' + getStatusIcon('CLONE') + '</span>' + //<i class="fa fa-times text-white"</i>
        '<span class="pull-left ' + getStatusClass(status) + ' w-75 pull-left text-truncate"> ' + title + '   </span>' +
        '</h3>' +
        '</a>';

    cardHtml += '<li class="list-group-item">' +
        '<h1>' +
        value + 
        '</h1>' +
        '</li>';



    cardHtml += '</ul></section></aside></div>';

    return cardHtml;

}

function AddCard(serverInfo) {
    serverInfo.result = '';
    //serverInfo.name = server.name;
    //serverInfo.subTitle = server.job_to_monitor;
    var cardHtml = '';
    var btn = '';
    if (serverInfo.active == true) {
        serverInfo.result = 'RUNNING'
        btn = '<button id="addServer-button" class="btn btn-lg btn-dark btn-block" onclick="deactiveMonitorServerSubmit(\'' + serverInfo.ip + '\', \'' + serverInfo.job_to_monitor + '\')">' +
            '<i class="fa fa-times fa-lg"></i>&nbsp;<span>Deactive Monitor Server</span>' +
            '</button>';
    } else { //bg-primary
        btn = '<button id="addServer-button" class="btn btn-lg btn-primary btn-block" onclick="reactiveMonitorServerSubmit(\'' + serverInfo.ip + '\', \'' + serverInfo.job_to_monitor + '\')">' +
            '<i class="fa fa-plus fa-lg"></i>&nbsp;<span>Reactive Monitor Server</span>' +
            '</button>';
    }

    cardHtml += '<div class="col-lg-2"><aside class="profile-nav alt"><section class="card"><ul class="list-group list-group-flush">';
    cardHtml += '<li class="list-group-item ' + getStatusClass(serverInfo.result) + '">' +

        //'<a href="' + pipeCI.pipeline_link.replace('/wfapi', '') + '" target="_blank">' +
        '<h3>' +
        '<span class="pull-right ' + getStatusClass(serverInfo.result) + '"> ' + getStatusIcon('FAILED') + '</span>' +
        '<span class="pull-left ' + getStatusClass(serverInfo.result) + ' w-75 pull-left text-truncate"> ' + serverInfo.name + '   </span>' +
        '</h3>' +
        '</a>';

    cardHtml += '<li class="list-group-item">' +
        '<h3>' +
        '<span class="w-75 pull-left text-truncate" data-toggle="tooltip" data-placement="right" title="Job: ' + serverInfo.job_to_monitor + '">' + serverInfo.job_to_monitor + '     </span>' +
        '<span class="pull-right">' +
        //'<a href="' + pipeCI.pipeline_link.replace('lastBuild/wfapi/', 'build?delay=0sec') + '" target="_blank" class="fa fa-play-circle text-success"></a>' +
        '</span>' +
        '</h3>' +

        '<br>' +
        '<br><span class="badge badge-light  pull-left">IP Address: </span><span class="badge badge-light  pull-right">' + serverInfo.ip + '</span>' +
        '<br><span class="badge badge-light  pull-left">Monitored Job: </span><span class="badge badge-light pull-right">' + serverInfo.job_to_monitor + '</span>' +
        '<br>' +
        btn +        

        //'<br><span class="badge badge-light  pull-left">Last Failed: </span><span class="badge badge-light pull-right">' + pipeInfoCI['lastFailedBuild'] + '</span>' +
        //'<br><span class="badge badge-light  pull-left">Started: </span><span class="badge badge-light pull-right">' + pipeCI.start + '</span>' +
        //'<br><span class="badge badge-light  pull-left">Duration: </span><span class="badge badge-light pull-right">' + millisecondsToTime(pipeCI.duration) + '</span>' +
        //'<br><span class="badge badge-light  pull-left">Score: </span><span class="badge badge-light pull-right">' + pipeInfoCI['health'].score + '</span>' +

        //'<br><span class="badge badge-light  pull-left">' + pipeInfoCI['changes']['message'] + '</span><span class="badge badge-light pull-right"></span>' +
        //'<br><span class="badge badge-light  pull-left">Commiters: </span><span class="badge badge-light pull-right w-75 text-truncate">' + pipeInfoCI['changes']['userMeassage'] + '</span>' +
        '</li>';



    cardHtml += '</ul></section></aside></div>';

    return cardHtml;

}