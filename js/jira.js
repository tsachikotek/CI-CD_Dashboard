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

  

    var currentPage = document.location.pathname.substring(document.location.pathname.lastIndexOf('/') + 1);
      
    try {


        var jiraIssue = JSON.parse(GetRestByMethod('KPI', 'GetKPIData', { 'KPIName': 'GetIssuesAUT' }));
        var data = JSON.parse(jiraIssue.Table[0].data.replace("\"Resolution Accuracy\"", "'Resolution Accuracy'").replace("\\", "\\\\"));
        var byMonthData = getValuesFromArray(data.ByMonth, "TotalIssues");
        var byEpicData = getValuesFromArray(data.ByEpic, "TotalIssues");
        var bySprintData = getValuesFromArray(data.BySprint, "TotalIssues");
        var byMonthQualificationTime = getDaysFromTimeSpanArray(data.ByMonth, "AvgQualificationTime");

        insertCardChart1Dataset('coverage', Object.keys(data.ByMonth).reverse(), byMonthData.reverse(), 'Stories', 'Automation Team: Stories Done (Total By Month)', '*Jira AUT done issues', 'line');
        insertCardChart1Dataset('coverage', Object.keys(data.ByMonth).reverse(), byMonthQualificationTime.reverse(), 'Stories', 'Automation Team: Stories Qualification Time', '*Avg per Month (in hours)', 'line');
        insertCardChart1Dataset('coverage', createCategoryArray(data.BySprint, 'Sprint', ''), bySprintData.reverse(), 'Stories', 'Automation Team: Stories Done', '*Total per Sprint (Jira AUT done issues)', 'line');

        $('#priorityTable').append(JsonToTableHtml(JsonDictToTableHtml(data.ByEpic)));

    } catch (ex) { alert('jiraIssue: ' + ex); }


    try {

        //var jsonString = '{"ByMonth":{"2018_11":{"TotalIssues":3,"AvgQualificationTime":"14.06:08:35.8723333","AvgWaitingInBacklogTime":"1.22:01:39.6696667","MinQualificationTime":"1.00:00:00","MaxQualificationTime":"3.18:04:59.0090000","MaxQualificationIssueName":"Globalpipeline-Report"},"2018_10":{"TotalIssues":14,"AvgQualificationTime":"14.20:42:10.8801429","AvgWaitingInBacklogTime":"7.12:53:30.1030000","MinQualificationTime":"1.00:00:00","MaxQualificationTime":"27.02:49:25.3460000","MaxQualificationIssueName":"ACPPipeline-Integration"},"2018_09":{"TotalIssues":9,"AvgQualificationTime":"13.01:43:35.7652222","AvgWaitingInBacklogTime":"22.16:24:42.3137778","MinQualificationTime":"1.00:00:00","MaxQualificationTime":"127.05:26:51.2060000","MaxQualificationIssueName":"Artifactorylib"},"2018_08":{"TotalIssues":17,"AvgQualificationTime":"7.17:57:27.5412353","AvgWaitingInBacklogTime":"20.20:34:51.1938824","MinQualificationTime":"1.00:00:00","MaxQualificationTime":"110.10:40:31.1170000","MaxQualificationIssueName":"Lablectures"},"2018_07":{"TotalIssues":1,"AvgQualificationTime":"1.06:47:44.1940000","AvgWaitingInBacklogTime":"1.00:21:00.1780000","MinQualificationTime":"1.00:21:00.1780000","MaxQualificationTime":"1.00:21:00.1780000","MaxQualificationIssueName":"PhabricatorDocumentation"}},"BySprint":{"Sprint12":{"TotalIssues":1,"AvgQualificationTime":"1.05:45:59.3590000","AvgWaitingInBacklogTime":"3.18:04:59.0090000","MinQualificationTime":"3.18:04:59.0090000","MaxQualificationTime":"3.18:04:59.0090000","MaxQualificationIssueName":"RemoveextratarpackagingofVideoQOE"},"Sprint11":{"TotalIssues":8,"AvgQualificationTime":"12.02:20:12.6593750","AvgWaitingInBacklogTime":"4.21:52:13.2868750","MinQualificationTime":"1.00:00:00","MaxQualificationTime":"27.02:49:25.3460000","MaxQualificationIssueName":"Artifactorycleanup"},"Sprint9":{"TotalIssues":7,"AvgQualificationTime":"14.15:52:11.8487143","AvgWaitingInBacklogTime":"31.05:37:47.4528571","MinQualificationTime":"1.00:00:00","MaxQualificationTime":"127.05:26:51.2060000","MaxQualificationIssueName":"BuildscriptforDM"},"Sprint10":{"TotalIssues":9,"AvgQualificationTime":"13.21:15:14.4630000","AvgWaitingInBacklogTime":"5.20:38:47.0890000","MinQualificationTime":"1.00:00:00","MaxQualificationTime":"21.00:01:14.8570000","MaxQualificationIssueName":"ACPPipeline-Integration"},"Sprint7":{"TotalIssues":13,"AvgQualificationTime":"8.04:42:22.9170000","AvgWaitingInBacklogTime":"10.05:39:19.7050769","MinQualificationTime":"1.00:00:00","MaxQualificationTime":"110.10:36:47.0100000","MaxQualificationIssueName":"Lablectures"},"Sprint8":{"TotalIssues":6,"AvgQualificationTime":"11.13:18:40.4263333","AvgWaitingInBacklogTime":"37.06:07:02.3846667","MinQualificationTime":"1.00:00:00","MaxQualificationTime":"110.10:40:31.1170000","MaxQualificationIssueName":"ACP-Tests"}},"ByEpic":{"NotincludedinCImaintasks":{"TotalIssues":3,"AvgQualificationTime":"3.10:22:46.3073333","AvgWaitingInBacklogTime":"10.14:58:08.1183333","MinQualificationTime":"1.00:00:00","MaxQualificationTime":"27.02:49:25.3460000","MaxQualificationIssueName":"Lablectures"},"CDPipelineforGlobal":{"TotalIssues":5,"AvgQualificationTime":"16.07:23:56.6802000","AvgWaitingInBacklogTime":"1.00:20:10.3346000","MinQualificationTime":"1.00:00:00","MaxQualificationTime":"1.01:40:51.6730000","MaxQualificationIssueName":"Globalpipeline-Artifactory"},"CIPipelineforACP":{"TotalIssues":12,"AvgQualificationTime":"13.06:37:27.1644167","AvgWaitingInBacklogTime":"4.15:30:54.5065000","MinQualificationTime":"1.00:00:00","MaxQualificationTime":"21.00:01:14.8570000","MaxQualificationIssueName":"ACPPipeline-Integration"},"Devtools":{"TotalIssues":2,"AvgQualificationTime":"24.05:15:05.3295000","AvgWaitingInBacklogTime":"11.12:45:39.4355000","MinQualificationTime":"1.00:00:00","MaxQualificationTime":"22.01:31:18.8710000","MaxQualificationIssueName":"ConfigureGitlabascodereviewtool"},"CIPipelineforAOS":{"TotalIssues":1,"AvgQualificationTime":"12.14:53:50.7080000","AvgWaitingInBacklogTime":"6.04:06:50.2800000","MinQualificationTime":"6.04:06:50.2800000","MaxQualificationTime":"6.04:06:50.2800000","MaxQualificationIssueName":"MoveSVNtoGIT"},"Pipeline":{"TotalIssues":10,"AvgQualificationTime":"11.10:54:33.8745000","AvgWaitingInBacklogTime":"34.17:58:13.3153000","MinQualificationTime":"1.00:00:00","MaxQualificationTime":"110.10:40:31.1170000","MaxQualificationIssueName":"ACP-Tests"},"DevOpsasaService":{"TotalIssues":2,"AvgQualificationTime":"11.20:14:20.5925000","AvgWaitingInBacklogTime":"1.00:00:00","MinQualificationTime":"1.00:00:00","MaxQualificationTime":"1.00:00:00","MaxQualificationIssueName":"Createbuildmachine(static)"},"CIPipelineforDM":{"TotalIssues":3,"AvgQualificationTime":"7.18:18:20.4556667","AvgWaitingInBacklogTime":"55.01:40:47.4176667","MinQualificationTime":"5.03:40:17.2460000","MaxQualificationTime":"127.05:26:51.2060000","MaxQualificationIssueName":"BuildscriptforDM"},"TransitiontoGit":{"TotalIssues":1,"AvgQualificationTime":"12.21:10:27.0880000","AvgWaitingInBacklogTime":"29.08:50:51.0460000","MinQualificationTime":"29.08:50:51.0460000","MaxQualificationTime":"29.08:50:51.0460000","MaxQualificationIssueName":"MigrationtoGit-NMS-DM"},"CI":{"TotalIssues":1,"AvgQualificationTime":"4.00:01:06.2830000","AvgWaitingInBacklogTime":"1.00:00:00","MinQualificationTime":"1.00:00:00","MaxQualificationTime":"1.00:00:00","MaxQualificationIssueName":"CIpipeline-Integration"},"Training":{"TotalIssues":4,"AvgQualificationTime":"2.17:17:42.4725000","AvgWaitingInBacklogTime":"1.00:07:31.5100000","MinQualificationTime":"1.00:00:33.7350000","MaxQualificationTime":"1.00:21:00.1780000","MaxQualificationIssueName":"Builddevelopmentenvironment"}}}';
        //var jiraIssue2 = JSON.parse(jsonString);

        //var retJson = GetRestByMethod('Jira', 'GetIssuesCI');
        //var jiraIssue2 = JSON.parse(JSON.parse(GetRestByMethod('KPI', 'GetKPIData', { 'KPIName': 'GetIssuesCI' })).Table[0].data);; // JSON.parse(GetRestByMethod('Jira', 'GetIssuesCI')); //, 'Project=CI&Board=38'

        var jiraIssue2 = JSON.parse(GetRestByMethod('KPI', 'GetKPIData', { 'KPIName': 'GetIssuesCI' }));
        var data = JSON.parse(jiraIssue2.Table[0].data.replace("\"Resolution Accuracy\"", "'Resolution Accuracy'").replace("\\", "\\\\"));

        var byMonthData2 = getValuesFromArray(data.ByMonth, "TotalIssues");
        var byEpicData2 = getValuesFromArray(data.ByEpic, "TotalIssues");
        var bySprintData2 = getValuesFromArray(data.BySprint, "TotalIssues");
        var byMonthQualificationTime2 = getDaysFromTimeSpanArray(data.ByMonth, "AvgQualificationTime");

        insertCardChart1Dataset('coverage', Object.keys(data.ByMonth).reverse(), byMonthData2.reverse(), 'Stories', 'CI Team: Stories Done (Total By Month)', '*Jira CI done issues', 'line');
        insertCardChart1Dataset('coverage', Object.keys(data.ByMonth).reverse(), byMonthQualificationTime2.reverse(), 'Stories', 'CI Team: Stories Qualification Time (Avg By Month)', '*in hours', 'line');
        insertCardChart1Dataset('coverage', createCategoryArray(data.BySprint, 'Sprint', ''), bySprintData2.reverse(), 'Stories', 'CI Team: Stories Done (By Sprint)', '*Jira CI done issues', 'line');

        $('#priorityTable').append(JsonToTableHtml(JsonDictToTableHtml(data.ByEpic)));
    } catch (ex) {
        alert('jiraIssue2: ' + ex);
    }

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
})(jQuery);