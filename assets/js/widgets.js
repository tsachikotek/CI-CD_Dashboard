//import { totalmem } from "os";

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


    //updateBuildTrend();
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
            var jsonPipelinesInfo = collectBuildPipelineInfo(jenkinsServer, jenkinsPipelineJob, 'lastBuild'); // GetPipelineInfo(jenkinsServer, jenkinsPipelineJob); //GetBuildInfo
            //jenkinCIServersList[pipeName]['info'][CIorCD] = jsonPipelinesInfo;
            jenkinCIServersList[pipeId]['Info'] = jsonPipelinesInfo;
        } catch (ex) { }
    }

    function updateBuildTrend(target) {

        try {

            var builds = JSON.parse(GetRestByMethod('Jenkins', 'GetBuildsWeeklyStatus', ''));
            //var data = JSON.parse(builds);
            
            //var start = new Date('2018-10-01');;
            var now = Date.now();

            //var weeks = generateWeekNumList(start, now) 
            var products = {};


            $.each(builds, function (index, build) {

                var bYear = parseInt(build.bYEAR);
                var bMonth = parseInt(build.bMONTH);

                if (bYear >= 2019) {
                    build.bWEEK = parseInt(build.bWEEK) +  1;
                }

                var bWeek = build.bWEEK;
                //var bDay = build.bDay;
                var weekId = bYear + "-" + pad(build.bWEEK, 2); //build.weekId;
                var build_duration = parseInt(build.build_duration);
                var product = build.product;
                var changes = parseInt(build.changes);
                var SUCCESS = parseInt(build.SUCCESS);
                var UNSTABLE = parseInt(build.UNSTABLE);
                var FAILURE = parseInt(build.FAILURE);
                var TOTAL = parseInt(build.TOTAL);

                if (["AOS"].includes(product)) {
                    product = "AOS_ALL";
                }

                if (["BGP", "CDC", "CS", "MD", "NMSInfra", "NX", "SPC"].includes(product)) {
                    product = "NMS_ALL";
                }


                if (products[product] == undefined) {
                
                    products[product] = {};
                
                    addWeekNumsToProduct(products[product], new Date('2018-10-01'), now);
                }
                                             
                products[product][weekId].TOTAL += TOTAL;
                products[product][weekId].SUCCESS += SUCCESS;
                products[product][weekId].NOTSUCCESS += (TOTAL - SUCCESS);
                products[product][weekId].changes += changes;
                products[product][weekId].duration += build_duration;

            });            

            
            var weeksIds = Object.keys(products["ENV"]).slice(-12);
            
            
            insertCardChart3Datasets(target, weeksIds, getValuesFromArray(products["AOS_ALL"], "TOTAL").slice(-12), getValuesFromArray(products["AOS_ALL"], "SUCCESS").slice(-12), getValuesFromArray(products["AOS_ALL"], "changes").slice(-12), 'Builds', 'AOS (CI) WEEKLY STATUS', 'Total Builds vs Success Builds',70,70);
            insertCardChart3Datasets(target, weeksIds, getValuesFromArray(products["NMS_ALL"], "TOTAL").slice(-12), getValuesFromArray(products["NMS_ALL"], "SUCCESS").slice(-12), getValuesFromArray(products["NMS_ALL"], "changes").slice(-12), 'Builds', 'NMS (CI) WEEKLY STATUS', 'Total Builds vs Success Builds', 70, 70);
            insertCardChart3Datasets(target, weeksIds, getValuesFromArray(products["ACP"], "TOTAL").slice(-12), getValuesFromArray(products["ACP"], "SUCCESS").slice(-12), getValuesFromArray(products["ACP"], "changes").slice(-12), 'Builds', 'ACP (CI) WEEKLY STATUS', 'Total Builds vs Success Builds', 20, 20);

            insertCardChart2Datasets(target, weeksIds, getValuesFromArray(products["ENV"], "TOTAL").slice(-12), getValuesFromArray(products["ENV"], "SUCCESS").slice(-12), 'Builds', 'GLOBAL WEEKLY STATUS', 'Total Builds vs Success Builds', 45, 45);

            //insertCardChart2Datasets(target, weeksIds, getValuesFromArray(products["ACP"], "SUCCESS"), getValuesFromArray(products["ENV"], "changes"), 'Builds', 'Total Success Builds vs Changes', 'GLOBAL WEEKLY STATUS', 45, 45);
            //insertCardChart2Datasets(target, weeksIds, getValuesFromArray(products["AOS_ALL"], "SUCCESS"), getValuesFromArray(products["AOS_ALL"], "changes"), 'Builds', 'Total Success Builds vs Changes', 'AOS WEEKLY STATUS', 100, 100);
            //insertCardChart2Datasets(target, weeksIds, getValuesFromArray(products["NMS_ALL"], "SUCCESS"), getValuesFromArray(products["NMS_ALL"], "changes"), 'Builds', 'Total Success Builds vs Changes', 'NMS WEEKLY STATUS', 100, 100);
            
            //insertCardChart1Dataset(target, weeksIds, byWeekTotal, 'Stories', 'Automation Team: Stories Done (Total By Month)', '*Jira AUT done issues', 'line');
            //insertCardChart1Dataset(target, weeksIds, byWeekSuccess, 'Stories', 'Automation Team: Stories Done (Total By Month)', '*Jira AUT done issues', 'line');

            //insertCardChart1Dataset('coverage', Object.keys(data.ByMonth).reverse(), byMonthData.reverse(), 'Stories', 'Automation Team: Stories Done (Total By Month)', '*Jira AUT done issues', 'line');
            //insertCardChart1Dataset('coverage', Object.keys(data.ByMonth).reverse(), byMonthQualificationTime.reverse(), 'Stories', 'Automation Team: Stories Qualification Time', '*Avg per Month (in hours)', 'line');
            //insertCardChart1Dataset('coverage', createCategoryArray(data.BySprint, 'Sprint', ''), bySprintData.reverse(), 'Stories', 'Automation Team: Stories Done', '*Total per Sprint (Jira AUT done issues)', 'line');

            //$('#priorityTable').append(JsonToTableHtml(JsonDictToTableHtml(data.ByEpic)));

        } catch (ex) {
            alert('jiraIssue: ' + ex);
        }
    }

    function addWeekNumsToProduct(product, start, end) {

        var retWeeks = {};

        //var yearAndWeek = getWeekNumber(start);

        //var currentWeek = yearAndWeek[1];
        //var currentYear = yearAndWeek[0];

        while (end > start) {
            //getWeekNumber(start);
            //var weekNumber = getWeekNumber(start); //start.getWeekNumber();
            var yearAndWeek = getWeekNumber(start);

            var currentWeek = yearAndWeek[1];
            var currentYear = yearAndWeek[0];

            var weekNumber = currentYear + "-" + pad(currentWeek, 2);

            product[weekNumber] = {};

            product[weekNumber].TOTAL = 0;
            product[weekNumber].SUCCESS = 0;
            product[weekNumber].NOTSUCCESS = 0;
            product[weekNumber].changes = 0;
            product[weekNumber].duration = 0;

            //retWeeks[weekNumber] = {"TOTAL": 0, "SUCCESS": 0, "NOTSUCCESS": 0, "changes": 0, "duration":0 };

            start.setDate(start.getDate() + 7); //add week to start          
        }

        return retWeeks
    }

    function pad(str, max) {
        str = str.toString();
        return str.length < max ? pad("0" + str, max) : str;
    }

    function getWeekNumber(d) {
        // Copy date so don't modify original
        d = new Date(d); //Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        // Get first day of year
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        // Calculate full weeks to nearest Thursday
        var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        // Return array of year and week number
        return [d.getUTCFullYear(), weekNo];
    }

    function updateBuildStat() {

        var buildStat = getBuildStatus();
        //{            'globalBuild_total_weekly': '50', 'globalBuild_total_monthly': '40', 'globalBuild_successRate_weekly': '90', 'globalBuild_successRate_monthly': '90'        };
        //periods[""7_DAY""].pipelines.GLOBAL.versions[""15.3.10""].products.ENV.total_builds

        if (buildStat != '') {
            $('#globalStat').html('');

            updateBuildTrend('globalCharts');

            try {

                //buildStat["daysSinceLastSuccess"] = 7;
                //buildStat["daysOfSuccessBuilds"] = 3;

                var lastSuccessBuild = buildStat.periods["30_DAY"].pipelines.GLOBAL.versions["15.3.10"].products.ENV.last_success.build_num; 
                var totalBuilds30all = buildStat.periods["30_DAY"].pipelines.GLOBAL.versions["15.3.10"].total_builds;
                var totalBuilds30success = buildStat.periods["30_DAY"].pipelines.GLOBAL.versions["15.3.10"].products.ENV.success_stats.num_of_builds;
                var totalBuilds30failed = buildStat.periods["30_DAY"].pipelines.GLOBAL.versions["15.3.10"].products.ENV.failure_stats.num_of_builds;
                var totalBuilds30unstaled = buildStat.periods["30_DAY"].pipelines.GLOBAL.versions["15.3.10"].products.ENV.unstable_stats.num_of_builds;
                var totalBuilds30successRate = buildStat.periods["30_DAY"].pipelines.GLOBAL.versions["15.3.10"].products.ENV.success_stats.rate;

                var totalBuilds7all = buildStat.periods["7_DAY"].pipelines.GLOBAL.versions["15.3.10"].total_builds;
                var totalBuilds7success = buildStat.periods["7_DAY"].pipelines.GLOBAL.versions["15.3.10"].products.ENV.success_stats.num_of_builds;
                var totalBuilds7failed = buildStat.periods["7_DAY"].pipelines.GLOBAL.versions["15.3.10"].products.ENV.failure_stats.num_of_builds;
                var totalBuilds7unstaled = buildStat.periods["7_DAY"].pipelines.GLOBAL.versions["15.3.10"].products.ENV.unstable_stats.num_of_builds;
                var totalBuilds7successRate = buildStat.periods["7_DAY"].pipelines.GLOBAL.versions["15.3.10"].products.ENV.success_stats.rate;

                var daysSinceLastSuccess = buildStat.periods["30_DAY"].pipelines.GLOBAL.versions["15.3.10"].products.ENV.last_success.days_since;
                var LastSuccessDate = buildStat.periods["30_DAY"].pipelines.GLOBAL.versions["15.3.10"].products.ENV.last_success.started_at_u;
                var daysSeqSuccess = buildStat.periods["30_DAY"].pipelines.GLOBAL.versions["15.3.10"].products.ENV.last_unsuccess.days_since;


                var minLast7DaysBuild = 7;
                var minLast30DaysBuild = 30;

                var maxLast7DaysBuild = 7;
                var maxLast30DaysBuild = 30;

                var maxLast7DaysRate = 90;
                var maxLast30DaysRate = 90;

                if (totalBuilds30success > minLast30DaysBuild) {
                    maxLast30DaysBuild = totalBuilds30success;
                }

                if (totalBuilds7success > minLast7DaysBuild) {
                    maxLast7DaysBuild = totalBuilds7success;
                }


                if (totalBuilds30successRate > maxLast30DaysRate) {
                    maxLast30DaysRate = totalBuilds30successRate;
                }

                if (totalBuilds7successRate > maxLast7DaysRate) {
                    maxLast7DaysRate = totalBuilds7successRate;
                }

                var buildState = 'SUCCESS';

                if (daysSinceLastSuccess == 1) {
                    buildState = 'UNSTABLE';
                } else if (daysSinceLastSuccess > 1) {
                    buildState = 'FAILED';
                }

                //if (daysSinceLastSuccess != 3) {
                
                

                $('#globalStat').append(CardHtml('Last Success Build', lastSuccessBuild, buildState));
                $('#globalStat').append(CardHtml('Last Success Date', LastSuccessDate, buildState));
                $('#globalStat').append(CardHtml('Days since Last Success', daysSinceLastSuccess, buildState));

                $('#globalStat').append(CardHtml('Success Builds (Last 7 Days)', totalBuilds7success + ' Builds', buildState));

                var buildRateStat = 'SUCCESS'

                if (totalBuilds7successRate < maxLast7DaysRate && totalBuilds7successRate > 30) {
                    buildRateStat = 'UNSTABLE'
                }
                else {
                    buildRateStat = 'FAILED'
                }

                $('#globalStat').append(CardHtml('Success rate (Last 7 Days)', totalBuilds7successRate + ' %', buildRateStat));

                var unSuccessBuilds = parseInt(totalBuilds7unstaled) + parseInt(totalBuilds7failed);

                $('#globalStat').append(CardHtml('Unsuccess (Last 7 Days)', unSuccessBuilds + ' Builds', buildRateStat));

                
                //createGaugeChart('globalCharts', 'Success (Last 7 Days)', totalBuilds7success, '.', 'Total: ' + totalBuilds7all + ' builds', 1, 0, 0, ' builds', maxLast7DaysBuild,2);
                //var subTitleWeek = 'Success: ' + totalBuilds7success + ' Unstable: ' + totalBuilds7unstaled + ' Failed: ' + totalBuilds7failed;
                //createGaugeChart('globalCharts', 'Success Rate (Last 7 Days)', totalBuilds7successRate, '.', subTitleWeek, 1, 0, 0, ' %', maxLast7DaysRate, 2);

                //createGaugeChart('globalCharts', 'Success (Last 30 Days)', totalBuilds30success, '.', 'Total: ' + totalBuilds30all + ' builds', 1, 0, 0, ' builds', maxLast30DaysBuild, 2);
                //var subTitleMonth = 'Success: ' + totalBuilds30success + ' Unstable: ' + totalBuilds30unstaled + ' Failed: ' + totalBuilds30failed;
                //createGaugeChart('globalCharts', 'Success Rate (Last 30 Days)', totalBuilds30successRate, '.', subTitleMonth, 1, 0, 0, ' %', maxLast30DaysRate);
            } catch (ex) { console.log('updateBuildStat: ' + ex); }
        }
        else {
            $('#globalStat').html('<h1>No Data Received!!!</h1>');
        }
    }

    function updateTrend() {
        createGaugeChart('main-global', 'Number of Builds', '20', '(This Week)', 0.1, 0.2, 0.3);
        createGaugeChart('main-global', 'Number of Builds (This Month)', '40', '(This Week)');
        createGaugeChart('main-global', 'Success rate (%)', '40', '(This Week)', 0.9, 0.89, 0.5);
        createGaugeChart('main-global', 'Success rate (%)', '90', '(This Month)', 0.9, 0.89, 0.5);
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
            setInterval(function () { updatePipelineInfo(serverAddress, job, job, productName) }, 10000);

            updatePipelineExecution(serverAddress, job, job, productName);
            setInterval(function () { updatePipelineExecution(serverAddress, job, job, productName) }, 10000);
        } catch (ex) { console.log('startMonitorPipeline: ' + ex); }
    }

    //creating pipeline card
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

        //try { addAlert("msg", 'Product: ' + pipe.name.replace('-jenkins', '').toUpperCase() + ' Build #' + pipe.id + ': ' + pipe.result + ' Start: ' + pipe.start + ' Duration: ' + millisecondsToTime(pipe.duration) + '', 'success'); } catch (ex) { } //+ '<br>Link: ' + pipe.pipeline_link

        try {

            if (pipe.result == 'FAILED' || pipe.result == 'SUCCESS') {
                pipe.result = pipelineStatus(pipe.stages);
            }

            //if (pipeName.indexOf('Global') >= 0) { //location.hash == '#index' ||
            //    CreateHtmlForPipeline('main-global', pipeName + '_' + subTitle.substring(subTitle.lastIndexOf("/")+1), pipe); //main-global
            if (pipe.result == 'RUNNING') { //location.hash == '#index' ||
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


    function updatePipelineCards() {
        $(GetMonitoringServers()).each(function (index, server) {
            if (server.active) {
                startMonitorPipeline(server.ip, server.job_to_monitor, server.name);
            }
        });
    }
    

    AddServer();
    updateBuildStat();
    updatePipelineCards();

    //setInterval(function () { updateBuildStat(); }, 60000);   
    setInterval(function () { updatePipelineCards(); }, 60000);   
     
    //Creating CI\CD status list card
    updateCardWithMultipleValues('cicd_status', 'CI', 'Status', jenkinCIServersList, numberOfExecutions, 'CI_Servers', imgJenkins);
    setInterval(function () { updateCardWithMultipleValues('cicd_status', 'CI', 'Status', jenkinCIServersList, numberOfExecutions, 'CI_Servers', imgJenkins); }, 10000);    

    try { addAlert('Last Success Build', 'CI and CD Dashboard...', 'success'); } catch (exAlert) { console.log('updateBuildStat: ' + exAlert); }
    //setInterval(function () { updateBuildStat(); }, 10000); 
})(jQuery);