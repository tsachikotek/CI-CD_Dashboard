(function ($) {
    "use strict";

    //alert("Hello");
    Refresh();
        
    
})(jQuery);

var jenkinCIServersList = [];
var numberOfExecutions = [];

function Refresh() {
    var Templates = [{ 'Name': 'Global-AI', 'Description': 'Environment after Install', 'Update': '07/01/2019' },
        { 'Name': 'Global-AC', 'Description': 'Environment after Configuration', 'Update': '07/01/2019' },
        { 'Name': 'Global-AG', 'Description': 'Environment after Go-No-Go', 'Update': '07/01/2019' }];

    AddTemplates(Templates);

    jenkinCIServersList = [];
    numberOfExecutions = [];

    var serverAddress = "10.110.4.129";
    var job = "GetEaaS";
    var productName = "GetEaaS";

    startMonitorPipeline(serverAddress, job, productName);

    var imgJenkins = '//png.icons8.com/color/50/000000/jenkins.png';
    var imgDefects = '//www.practicalrecovery.com/wp-content/uploads/2016/12/character-defects-in-recovery-300x300.png';

    //Creating CI\CD status list card
    updateCardWithMultipleValues('cicd_status', 'CI', 'Status', jenkinCIServersList, numberOfExecutions, 'CI_Servers', imgJenkins);
    setInterval(function () { updateCardWithMultipleValues('cicd_status', 'CI', 'Status', jenkinCIServersList, numberOfExecutions, 'CI_Servers', imgJenkins); }, 1000);
}

function AddTemplates(templates) {

    //monitorServers
    $('#monitorServers').empty();

    //var servers = GetMonitoringServers();

    $(templates).each(function (index, template) {
        //startMonitorPipeline(server.ip, server.job_to_monitor, server.name);
        var cardHtml = AddCard(template);

        $('#monitorServers').append(cardHtml);

    });
}

function AddCard(templateInfo) {
    //serverInfo.result = '';
    //serverInfo.name = server.name;
    //serverInfo.subTitle = server.job_to_monitor;
    var cardHtml = '';
    var btn = '';
    btn = '<button id="addServer-button" class="btn btn-lg btn-dark btn-block" onclick="getEaaS(\'' + templateInfo.Name + '\')">' +
            '<i class="	fa fa-check-square-o fa-lg"></i>&nbsp;<span>Get EaaS</span>' +
            '</button>';
    
    

    cardHtml += '<div class="col-lg-2"><aside class="profile-nav alt"><section class="card"><ul class="list-group list-group-flush">';
    cardHtml += '<li class="list-group-item ' + getStatusClass('RUNNING') + '">' +

        //'<a href="' + pipeCI.pipeline_link.replace('/wfapi', '') + '" target="_blank">' +
        '<h3>' +
        '<span class="pull-right ' + getStatusClass('RUNNING') + '"> ' + getStatusIcon('CLONE') + '</span>' + //<i class="fa fa-times text-white"</i>
        '<span class="pull-left ' + getStatusClass('RUNNING') + ' w-75 pull-left text-truncate"> ' + templateInfo.Name + '   </span>' +
        '</h3>' +
        '</a>';

    cardHtml += '<li class="list-group-item">' +
        '<h3>' +
        '<span class="w-75 pull-left text-truncate" data-toggle="tooltip" data-placement="right" title="Job: ' + templateInfo.Name + '">' + templateInfo.Name + '     </span>' +
        '<span class="pull-right">' +
        //'<a href="' + pipeCI.pipeline_link.replace('lastBuild/wfapi/', 'build?delay=0sec') + '" target="_blank" class="fa fa-play-circle text-success"></a>' +
        '</span>' +
        '</h3>' +

        '<br>' +
        '<br><span class="badge badge-light  pull-left">Description: </span><span class="badge badge-light  pull-right">' + templateInfo.Description + '</span>' +
        '<br><span class="badge badge-light  pull-left">Update: </span><span class="badge badge-light pull-right">' + templateInfo.Update + '</span>' +
        '<br>' +
        btn +
        '</li>';



    cardHtml += '</ul></section></aside></div>';

    return cardHtml;

}

function getEaaS(vcdTemplate) {
    //http://10.110.4.129:8080/job/GetEaaS/buildWithParameters?vcdTemplate=Global-AG&srccatalog=CD_Catalog&runtimelease=2&emailAddress=tkotek@allot.com

    var emailAddress = $('#emailAddress').val().trim();
    var runtimelease = '2';
    var srccatalog = 'CD_Catalog';

    getEaaSCommand(vcdTemplate, srccatalog, runtimelease, emailAddress);
}

function getEaaSCommand(vcdTemplate, srccatalog, runtimelease, emailAddress) {   

    if (typeof (async) == 'undefined') {
        async = false;
    }

    if (typeof (oldPipeline) == 'undefined') {
        oldPipeline = false;
    }

    //var jenkins_url = '//localhost:12345/api/Jenkins/GetPipelinesInfo?jenkinsServer=' + jenkinsServer + '&jobName=' + jenkinsPipelineJob ;
    //var pipeline_url = '//' + jenkinsServer + ':8080/job/' + jenkinsPipelineJob + '/' + buildId + '/api/json';
    var jenkins_url = 'http://10.110.4.129:8080/job/GetEaaS/buildWithParameters?vcdTemplate=' + vcdTemplate + '&srccatalog=' + srccatalog + '&runtimelease=' + runtimelease + '&emailAddress=' + emailAddress;

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

function startMonitorPipeline(serverAddress, job, productName) {
    try {
        updatePipelineInfo(serverAddress, job, job, productName);
        setInterval(function () { updatePipelineInfo(serverAddress, job, job, productName) }, 1000);

        updatePipelineExecution(serverAddress, job, job, productName);
        setInterval(function () { updatePipelineExecution(serverAddress, job, job, productName) }, 1000);
    } catch (ex) { console.log('startMonitorPipeline: ' + ex); }
}

function updatePipelineInfo(jenkinsServer, jenkinsPipelineJob, subTitle, pipeName) {

    try {

        if (typeof (pipeName) === 'undefined') {
            pipeName = jenkinsServer;
        }

        var pipeId = pipeName + subTitle;

        //if (typeof (jenkinCIServersList[pipeName]) == 'undefined') { jenkinCIServersList[pipeName] = { "CI": {}, "CD": {}, "info": { "CI": {}, "CD": {} } }; }
        if (typeof (jenkinCIServersList[pipeId]) == 'undefined') {
            jenkinCIServersList[pipeId] = { "Title": pipeName, "SubTitle": subTitle, "Data": {}, "Info": {} };
        }
        var jsonPipelinesInfo = collectBuildPipelineInfo(jenkinsServer, jenkinsPipelineJob, 'lastBuild'); // GetPipelineInfo(jenkinsServer, jenkinsPipelineJob); //GetBuildInfo
        //jenkinCIServersList[pipeName]['info'][CIorCD] = jsonPipelinesInfo;
        jenkinCIServersList[pipeId]['Info'] = jsonPipelinesInfo;
    } catch (ex) { }
}

function updatePipelineExecution(jenkinsServer, jenkinsPipelineJob, subTitle, pipeName) {

    var jsonPipelines = '[]';

    try { jsonPipelines = GetPipeline(jenkinsServer, jenkinsPipelineJob); } catch (ex) { //GetPipeline(jenkinsServer, jenkinsPipelineJob)
        console.log('updatePipelineExecution: ' + ex);
    }

    var pipe = jsonPipelines[0];

    if (typeof (pipeName) != 'undefined') {
        pipe.name = pipeName; // + '-jenkins';
        jenkinsServer = pipeName;
    }

    try { addAlert("msg", 'Product: ' + pipe.name.replace('-jenkins', '').toUpperCase() + ' Build #' + pipe.id + ': ' + pipe.result + ' Start: ' + pipe.start + ' Duration: ' + millisecondsToTime(pipe.duration) + '', 'success'); } catch (ex) { } //+ '<br>Link: ' + pipe.pipeline_link

    try {
        if (pipeName.indexOf('Global') >= 0) { //location.hash == '#index' ||
            CreateHtmlForPipeline('main-global', pipeName + '_' + subTitle.substring(subTitle.lastIndexOf("/") + 1), pipe); //main-global
        } else if (pipe.result == 'RUNNING') { //location.hash == '#index' ||
            CreateHtmlForPipeline('running-pipelines', pipeName + '_' + subTitle, pipe); //main-global
        } else if (pipe.result == 'FAILED') { //location.hash == '#index' ||
            CreateHtmlForPipeline('failed-pipelines', pipeName + '_' + subTitle, pipe); //main-global
        } else if (location.hash == '#pipeline') { //location.hash == '#index' ||
            CreateHtmlForPipeline('running-pipelines', pipeName + '_' + subTitle, pipe); //main-global
        } else if ($('#' + pipeName + '_' + subTitle).length >= 1) {
            $('#' + pipeName + '_' + subTitle).empty();
        }

    } catch (ex) { }

    if (jsonPipelines == "") { jsonPipelines = [{ "name": jenkinsServer, "builds": "0", "result": "CANCELLED" }] };

    //if (typeof (jenkinCIServersList[jenkinsServer]) == 'undefined') {jenkinCIServersList[jenkinsServer] = { "CI": {}, "CD": {} };}

    var pipeId = jenkinsServer + subTitle;

    if (typeof (jenkinCIServersList[pipeId]) == 'undefined') { jenkinCIServersList[pipeId] = { "Title": pipeName, "SubTitle": subTitle, "Data": {}, "Info": {} }; }

    //jenkinCIServersList[jenkinsServer][CIorCD] = jsonPipelines;
    jenkinCIServersList[pipeId]["Data"] = jsonPipelines[0];

}


