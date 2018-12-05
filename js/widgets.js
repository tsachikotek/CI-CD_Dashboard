(function ($) {
    "use strict";

    // Counter Number
    $('.count').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
                duration: 3000,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
    });

    var jenkinCIServersList = [];
    var jenkinCDServersList = [];
    var numberOfExecutions = [];

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
            var jsonPipelinesInfo = GetPipelineInfo(jenkinsServer, jenkinsPipelineJob);
            //jenkinCIServersList[pipeName]['info'][CIorCD] = jsonPipelinesInfo;
            jenkinCIServersList[pipeId]['Info'] = jsonPipelinesInfo;
        } catch (ex) { }
    }

    var currentPage = document.location.pathname.substring(document.location.pathname.lastIndexOf('/') + 1);

    function getValuesFromArray(inputArray, propertyName) {

        var retArray = [];

        $.each(inputArray, function (i, month) {
            var value = Math.round(month[propertyName]);
            if (!isNaN(value)) {
                retArray.push(value);
            }
        });

        return retArray;
    }

    function getDaysFromTimeSpanArray(inputArray, propertyName) {

        var retArray = [];

        $.each(inputArray, function (i, month) {
            var value = TimespanToHours(month[propertyName]);
            if (!isNaN(value)) {
                retArray.push(value);
            }
        });

        return retArray;
    }

    //6.20:09:34.8587297
    function TimespanToHours(timeSpan) {
        var elements = timeSpan.split(".");
        var days = elements[0];
        var Time = elements[1].split(":");
        var hh = Time[0];
        var mm = Time[1];
        var ss = Time[2];
        var milli = elements[2];

        var hours = (days * 24) + (1 * hh) + (mm / 60) + (ss / 3600) //+ (milli/3600000)
        return hours;
    }

    function createCategoryArray(currentObject, prefix, suffix) {
        var categories = [];
        for (var i = 1; i <= Object.keys(currentObject).length; i++) {
            categories.push(prefix + i.toString() + suffix);
        }

        return categories;
    }

    function startMonitorPipeline(serverAddress, job, productName) {
        try {
            updatePipelineInfo(serverAddress, job, job, productName);
            setInterval(function () { updatePipelineInfo(serverAddress, job, job, productName) }, 1000);

            updatePipelineExecution(serverAddress, job, job, productName);
            setInterval(function () { updatePipelineExecution(serverAddress, job, job, productName) }, 1000);
        } catch (ex) { console.log('startMonitorPipeline: ' + ex); }
    }

    //creating pipeline card
    function updatePipelineExecution(jenkinsServer, jenkinsPipelineJob, subTitle, pipeName) {

        var jsonPipelines = '[]';

        try { jsonPipelines = GetPipeline(jenkinsServer, jenkinsPipelineJob); } catch (ex) {
            console.log('updatePipelineExecution: ' + ex);
        }

        var pipe = jsonPipelines[0];

        if (typeof (pipeName) != 'undefined') {
            pipe.name = pipeName + '-jenkins';
            jenkinsServer = pipeName;
        }

        try { addAlert("msg", 'Product: ' + pipe.name.replace('-jenkins', '').toUpperCase() + ' Build #' + pipe.id + ': ' + pipe.result + ' Start: ' + pipe.start + ' Duration: ' + millisecondsToTime(pipe.duration) + '', 'success'); } catch (ex) { } //+ '<br>Link: ' + pipe.pipeline_link

        try {
            if (pipeName.indexOf('Global') >= 0) { //location.hash == '#index' ||
                CreateHtmlForPipeline('main-global', pipeName + '_' + subTitle, pipe); //main-global
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

    var imgJenkins = '//png.icons8.com/color/50/000000/jenkins.png';
    var imgDefects = '//www.practicalrecovery.com/wp-content/uploads/2016/12/character-defects-in-recovery-300x300.png';


    //undate pipeline information
    startMonitorPipeline('10.110.4.129', 'Install', 'Global1');
    //startMonitorPipeline('10.150.103.23', 'Global', 'Global2');

    startMonitorPipeline('10.150.101.130', 'WorkFlows_PipeLine', 'Automation');
    startMonitorPipeline('10.150.101.130', 'CI_Automation', 'Automation');


    startMonitorPipeline('10.150.103.24', 'ACP_ISO_Testing', 'ACP');
    startMonitorPipeline('10.150.103.24', 'ACP_Build_ISO', 'ACP');

    startMonitorPipeline('10.150.103.24', 'MediationDevice_Build', 'MD');

    startMonitorPipeline('10.150.103.24', 'AOS-CI', 'AOS');
    startMonitorPipeline('10.150.103.24', 'AOS-CI-downstream', 'AOS');


    //startMonitorPipeline('10.150.103.23', 'DM-Maven', '10.150.103.23', 'DM-Maven', 'DM-Maven');
    //startMonitorPipeline('10.150.103.23', 'ACP_Update_RPM', '10.150.103.23',  'ACP_Build_ISO', 'ACP');
    //startMonitorPipeline('10.150.103.23', 'Global', 'Global', 'Global');

    //startMonitorPipeline('10.150.103.18', 'Video_Qoe_SG9K', '10.150.103.18', 'Video_Qoe_Tag', 'vQoE_SG9K');
    startMonitorPipeline('10.150.103.18', 'Video_Qoe_SGVE', 'vQoE_SGVE');
    startMonitorPipeline('10.150.103.18', 'Video_Qoe_Tag', 'vQoE_Tag');
    startMonitorPipeline('10.150.103.18', 'Video_Qoe_TERA', 'vQoE_TERA');
    startMonitorPipeline('10.150.103.18', 'Video_Qoe_DayBuild', 'vQoE_Daily');

    updatePipelineExecution('10.150.103.23', 'Global', "CD");
    setInterval(function () { updatePipelineExecution('10.150.103.23', 'Global', "CD") }, 1000);

    //Creating CI\CD status list card
    updateCardWithMultipleValues('cicd_status', 'CI', 'Status', jenkinCIServersList, numberOfExecutions, 'CI_Servers', imgJenkins);
    setInterval(function () { updateCardWithMultipleValues('cicd_status', 'CI', 'Status', jenkinCIServersList, numberOfExecutions, 'CI_Servers', imgJenkins); }, 1000);





})(jQuery);