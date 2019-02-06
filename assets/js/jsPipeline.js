String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
};

function CreateHtmlForPipeline(target, name, jsonPipeline) {
    try {

        name = name.replaceAll(' ', '_').replaceAll('/', '_').replaceAll('-', '_');

        if ($('#' + name).length <= 0) {
            $('#' + target).append('<div id="' + name + '"></div>');
        }
        else {
            $('#' + name).empty();
        }
        $('#' + name).append(CreateHtmlForPipelines(jsonPipeline));
    } catch (ex) { console.log(ex); }

}

function CreateHtmlHead() {
    return "<head>" +
        "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">" +
        "<link rel=\"stylesheet\" href=\"http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css\">" +
        "<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js\"></script>" +
        "<script src=\"http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js\"></script>" +
        // " <meta http-equiv=\"refresh\" content=\"10\">"+
        "<style type=\"text/css\"> " +
        "body { background-color: #000000;}" +
        "#SUCCESS .btn-info {background-color: #00CC33; }" +
        "#FAILED .btn-info {background-color: #FF0000 ; }" +
        "#IDLE .btn-info {background-color: #888888; }" +
        "#DISABLED .btn-info {background-color: #888888; }" +
        "#CANCELLED .btn-info {background-color: #FF9933; }" +
        //"#SUCCESS1 {background-color: #99FF66; }" +
        //"#DANGER1 {background-color: #FF3333 ; }" +
        //"#RUNNING1  {background-color: #CCFFFF; }" +
        //"#WARNING1 {background-color: #FFCC33; }" +
        //"#panel-heading {background-color: #A0A0A0; }" +
        "button {width:320px;}" +
        "table, th, td {border: ridge;text-align: center;}" +
        ".carousel-indicators .active {background-color: gray; }" +
        ".carousel-indicators li {background-color: darkgray; }" +
        "   </style>" +
        "</head>";

}

/// <summary>
/// summarizes all pipeline results into a 'pipeResult' class
/// </summary>
function GetPipelineResults(stages) {
    var index = 0;
    var result = ''; // = new PipeResult();
    //foreach(var stage in stages)
    $.each(stages, function (i, stage) {

        index++;
        //foreach(Task job in stage.tasks)
        $.each(stage.tasks, function (i, job) {
            {
                result.PipelineMaxScore += 10;

                if (job.status.type == "FAILED") {
                    result.PipelineResult = "FAILED";
                    result.ProgressBarResult = "DANGER";
                }
                if (job.status.type == "RUNNING") {
                    result.PipelineResult = "RUNNING";
                    result.ProgressBarResult = "RUNNING";
                    result.RuningPercentage = (100 * (index - 1) / stages.length);
                    result.Active = "active";
                    result.CurenRuningJob = "(Current Job: '" + job.name + "')";
                }
                if (job.status.type == "CANCELLED") {
                    result.PipelineResult = "CANCELLED";
                    result.ProgressBarResult = "WARNING";
                }
                if (job.status.type == "SUCCESS") {
                    result.PipelineScore += 10;
                }
            }
        })

    })
    return result;
}

function addCard(title, build, htmlStages, pipe, size) {

    if (typeof (size) == 'undefined') { size = 'col-xs-12 col-sm-6 col-md-2'}
    var state = 'info';

    if (pipe.result == 'FAILED' || pipe.result == 'SUCCESS') {
        pipe.result = pipelineStatus(pipe.stages);
    }

    switch (pipe.result) {
        case "SUCCESS": state = "success"; status = "fa fa-check-circle-o text-success"; break; //glyphicon glyphicon-ok-circle
        case "FAILED": state = "danger"; status = "fa fa-times text-danger"; break; //	glyphicon glyphicon-remove-circle
        case "UNSTABLE": state = "warning"; status =  "fa fa-exclamation-circle text-warning"; break;
        case "RUNNING": state = "primary"; status = "fa fa-spinner fa-pulse"; break;
        case "CANCELLED": state = "warning"; status = "fa fa-ban text-warning"; break; //glyphicon glyphicon-ban-circle
        case "NOT_EXECUTED": state = "warning"; status = "fa fa-ban text-warning"; break; //glyphicon glyphicon-ban-circle
        case "IDLE": state = "info"; status = "fa fa-clock-o text-muted"; break; 
        default: state = "info";  status = "fa fa-clock-o text-muted"; break; 
    }

    //stagesHtml += '<li><i class="glyphicon glyphicon-ok ' + status.toLocaleLowerCase() + '"></i><strong>  ' + stage.name + '</strong></li>';


    var cardHtml = '<div class="alert alert-' + state + ' ' + size + '"> ' +
        '<div class="panel panel-success row">' +
           

            '<div class="panel-body no-padding text-align-center col-md-2">' +
                '<div class="panel-heading">' +
                    '<h3 class="panel-title"><i class="' + status.toLocaleLowerCase() + '"></i> ' + title + '</h3>' +
                '</div>' +
                '<div class="price-features"><strong>Build Number: </strong><span class="" > ' + build + '</span></div>' +
                '<div class="price-features"><strong>Start: </strong><span class="" > ' + pipe.start + '</span></div>' +
                '<div class="price-features"><strong>Duration: </strong><span class="" > ' + millisecondsToTime(pipe.duration) + '</span></div>' + 
            '</div>' +
       
            //'<hr class="style1">' +
            '<div class="panel-body no-padding text-align-center col-md-10">' +
                    //'<ul class="list-unstyled text-left">' +
                    htmlStages +
                    //'</ul>' +
        '</div>' +
        '<hr size="30">' +
        '</div>' +        
        '</div></div></div>'; //</div>

    return cardHtml;
}


function getStatusIcon(pipeResult) {
    switch (pipeResult) {
        case "SUCCESS": status = "fa fa-check-circle-o text-white"; break; //glyphicon glyphicon-ok-circle
        case "FAILED": status = "fa fa-times text-white"; break; //	glyphicon glyphicon-remove-circle
        case "UNSTABLE": status = "fa fa-exclamation-circle text-white"; break;
        case "RUNNING": status = "fa fa-spinner fa-pulse"; break;
        case "CANCELLED": status = "fa fa-ban text-white"; break; //glyphicon glyphicon-ban-circle        
        case "NOT_EXECUTED": status = "fa fa-ban text-dark"; break; //glyphicon glyphicon-ban-circle
        case "IDLE": status = "fa fa-clock-o text-white"; break;
        case "CLONE": status = "fa fa-clone text-white"; break;
        default: status = "fa fa-clock-o text-white"; break;         
    }

    return '<i class="' + status.toLocaleLowerCase() + '"></i>';
}

function getStatusClass(pipeResult) {
    switch (pipeResult) {
        case "SUCCESS": status = "bg-success text-white"; break; //glyphicon glyphicon-ok-circle
        case "FAILED": status = "bg-danger text-white"; break; //	glyphicon glyphicon-remove-circle
        case "UNSTABLE": status = "bg-warning text-white"; break;
        case "RUNNING": status = "bg-primary text-white"; break;
        case "CANCELLED": status = "bg-secondary text-white"; break; //glyphicon glyphicon-ban-circle        
        case "NOT_EXECUTED": status = "bg-white text-dark"; break; //glyphicon glyphicon-ban-circle
        case "IDLE": status = "bg-dark text-white"; break;
        default: status = "bg-dark text-white"; break;
    }

    return status.toLocaleLowerCase();
}

function pipelineStatus(stages) {

    var status = ''; //pipe.status;

    $.each(stages, function (i, stage) {
        if (stage.status == 'FAILED') {
            status = 'FAILED';
        }
        else if (stage.status == 'UNSTABLE') {
            if (status != 'FAILED') {
                status = 'UNSTABLE';
            }
        }
        else if (stage.status == 'SUCCESS') {
            if (status != 'FAILED' && status != 'UNSTABLE') {
                status = 'SUCCESS';
            }
        }
        else {
            //status = stage.status;
        }
    });

    return status;
}

function addStages(pipe) {
    stages = pipe.stages;

    var stagesHtml = '';
    var stagesIconsHtml = '';
    var stagesDurationHtml = '';

    var tbl = '<Table class="container-fluid">'

    var numberOfStages = 0;

    $.each(stages, function (i, stage) {
        if (stage.name != 'Declarative: Checkout SCM' && stage.name != 'Declarative: Post Actions') {
            numberOfStages++;
        }
    });
        
    var width4Stage = 98 / numberOfStages;

    $.each(stages, function (i, stage) {
        var status = '';
        var stage_message = stage.name;

        if (stage_message == 'Declarative: Checkout SCM' || stage_message == 'Declarative: Post Actions') {

        } else {

            switch (stage.status) {
                case "SUCCESS": status = "fa fa-check-circle-o text-success"; break; //glyphicon glyphicon-ok-circle
                case "FAILED": status = "fa fa-times text-danger"; break; //	glyphicon glyphicon-remove-circle
                case "UNSTABLE": status = "fa fa-exclamation-circle text-warning"; break;
                case "RUNNING": status = "fa fa-spinner fa-pulse"; break;
                case "CANCELLED": status = "fa fa-ban text-warning"; break; //glyphicon glyphicon-ban-circle            
                case "NOT_EXECUTED": status = "fa fa-ban text-warning"; break; //glyphicon glyphicon-ban-circle
                case "IDLE": status = "fa fa-clock-o text-muted"; break;
                default: status = "fa fa-clock-o text-muted"; break;
            }

            if (stage.duration.indexOf('-') >= 0) { status = "fa fa-spinner fa-pulse";}

            var tooltip = '';
            if (stage.status == 'SUCCESS' || stage.status == 'FAILED' || stage.status == 'UNSTABLE') { tooltip = stage.duration; }
            if (stage.status == 'RUNNING') { tooltip = stage.start_time; }

            //stagesHtml += '<li data-toggle="tooltip" data-placement="right" title="' + tooltip + '"><i class="glyphicon glyphicon-ok ' + status.toLocaleLowerCase() + '"></i><strong>  ' + stage_message + '</strong></li>';

            //if (stage.status != 'IDLE') {
            stagesIconsHtml += '<td class="d-inline text-center" style="width: ' + width4Stage + '%"><div class="glyphicon glyphicon-ok ' + status.toLocaleLowerCase() + ' fa-2x text-center" /><div class="left d-inline"></div></td>';
            //stagesIconsHtml += '<div class="connection col-md-1"><div id="tab' + tabId + '" class="glyphicon glyphicon-ok ' + status.toLocaleLowerCase() + ' fa-2x col-md-1 text-center"></div></div>';
            //stagesHtml += '<div class="col-md-1 text-center"><strong>  ' + stage_message + '</strong><br>' + tooltip + '</div>';
            stagesHtml += '<td class="text-center" style="width: ' + width4Stage + '%;"><p class="">' + stage_message + '</p>';
            stagesDurationHtml += '<td class="text-center" style="width: ' + width4Stage + '%">' + tooltip + '</td>';
        }

        //}
    });   
        
    tbl += '<tr class="row">' + stagesIconsHtml + '</tr>';
    tbl += '<tr class="row">' + stagesHtml + '</tr>';
    tbl += '<tr class="row">' + stagesDurationHtml + '</tr>';
    tbl += '</Table>';

    //for (var x = 0; x < $('td').length; x++) { ($('td')[x]).connect({to: $('td')[x + 1]}); }

    return tbl;
    //return '<li>' + stagesIconsHtml + '</li><li>' + stagesHtml + '</li>';
}

function addStages2(pipe) {
    stages = pipe.stages;

    var stagesHtml = '';
    $.each(stages, function (i, stage) {
        var status = '';

        switch (stage.status) {
            case "SUCCESS": status = "fa fa-check-circle-o text-success"; break; //glyphicon glyphicon-ok-circle
            case "FAILED": status = "fa fa-times text-danger"; break; //	glyphicon glyphicon-remove-circle
            case "UNSTABLE": status = "fa fa-exclamation-circle text-warning"; break;
            case "RUNNING": status = "fa fa-spinner fa-pulse"; break;
            case "CANCELLED": status = "fa fa-ban text-warning"; break; //glyphicon glyphicon-ban-circle
            case "NOT_EXECUTED": status = "fa fa-ban text-warning"; break; //glyphicon glyphicon-ban-circle
            case "IDLE": status = "fa fa-clock-o text-muted"; break;
            default: status = "fa fa-clock-o text-muted"; break; 
                
        }

        var stage_message = stage.name;
        var tooltip = '';
        if (stage.status == 'SUCCESS' || stage.status == 'FAILED' || stage.status == 'UNSTABLE') { tooltip = stage.duration; }
        if (stage.status == 'RUNNING') { tooltip = stage.start_time; }

        stagesHtml += '<li data-toggle="tooltip" data-placement="right" title="' + tooltip + '"><i class="glyphicon glyphicon-ok ' + status.toLocaleLowerCase() + '"></i><strong>  ' + stage_message + '</strong></li>';
    });

    //var stages = '<li><i class="fa fa-check text-success"></i> 2 years access <strong> to all storage locations</strong></li>' +
    //    '<li><i class="fa fa-check text-success"></i> <strong>Unlimited</strong> storage</li>' +
    //    '<li><i class="fa fa-check text-success"></i> Limited <strong> download quota</strong></li>' +
    //    '<li><i class="fa fa-check text-success"></i> <strong>Cash on Delivery</strong></li>' +
    //    '<li><i class="fa fa-check text-success"></i> All time <strong> updates</strong></li>' +
    //    '<li><i class="fa fa-times text-danger"></i> <strong>Unlimited</strong> access to all files</li>' +
    //    '<li><i class="fa fa-times text-danger"></i> <strong>Allowed</strong> to be exclusing per sale</li>' 

    return stagesHtml;
}

/// <summary>
/// Create the pipeline progrees bar based on the tasks reults
/// </summary>
function CreateJobProgressBar(stages) {
    var status = "SUCCESS";
    var result = ''; //new StringBuilder("");
    var active = "", background = "";
    var taskStatus = "";
    var runing = false;
    var jobPrecent = 100 / stages.length;
    //foreach(Stage stage in stages)

    //taskStatus = GetStageResult(stages);

    $.each(stages, function (i, stage) {
        {
            taskStatus = stage.status; //GetStageResult(stage);

            if (taskStatus == "SUCCESS") {
                status = "SUCCESS";
            }
            if (taskStatus == "FAILED") {
                status = "DANGER";

            }
            if (taskStatus == "UNSTABLE") {
                status = "WARNING";

            }
            if (taskStatus == "RUNNING") {
                runing = true;
                status = "";
                active = "active";
            }
            if (taskStatus == "CANCELLED") {
                status = "WARNING";
            }
            if (taskStatus == "IDLE") {
                background = "background-color:#A0A0A0;";
            }

            if (runing && taskStatus != "RUNNING") {
                background = "background-color:#fff;";
            }

            //result.append('<div class="progress skill-bar"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"><span class="skill">' + stage.name + '<i class="val">100%</i></span></div></div>');
            if (active == "active") {
                result += ("<div class=\"progress-bar bg-" + status.toLocaleLowerCase() + " progress-bar-striped " + active + "\" role=\"progressbar\" style=\"width:" + jobPrecent + "%; border-color:white; border-style:solid; border-width:thin; " + background + "\"> <span class=\"skill\"><font size=\"1\" color=\"black\">" + stage.name + "</font></span></div>");
            }
            else {
                result += ("<div class=\"progress-bar bg-" + status.toLocaleLowerCase() + " progress-bar\" role=\"progressbar\" style=\"width:" + jobPrecent + "%; border-color:white; border-style:solid; border-width:thin; " + background + "\"> <span class=\"skill\"><font size=\"1\" color=\"black\">" + stage.name + "</font></span></div>");
            }
            background = "";
            active = "";
        }


    });
    return result.toString();
}

/// <summary>
/// summarizes all pipeline results into a 'pipeResult' class
/// </summary>
function GetStageResult(stages) {
    var result = "IDLE";
    //foreach(Task job in stage.tasks)
    //$.each(stage.tasks, function (i, job) {
    $.each(stages, function (i, job) {
        {
            if (job.status == "RUNNING".toLowerCase()) {
                result = "RUNNING";
                return "RUNNING";
                //break;
            }
            if (job.status == "CANCELLED".toLowerCase()) {
                result = "CANCELLED";
                return "CANCELLED";
                //break;
            }
            if (job.status == "FAILED".toLowerCase()) {
                result = "FAILED";
            }

            if (job.status == "SUCCESS".toLowerCase() && result != "FAILED".toLowerCase()) {
                result = "SUCCESS";
            }
        }

    });
    return result;
}

/// <summary>
/// This fuction retrives an environment varaible from the Json api of the build
/// </summary>
function GetENVParams(json, parameters) {
    var result = new StringBuilder("");
    //foreach(string str in parameters)
    $.each(parameters, function (i, str) {

        var r = Regex.Match(json, string.Format("\"({0})\":\"(.*?)\"", str));
        if (r.Groups.length != 1) {
            result.append("<li>" + r.Groups[1] + " : " + r.Groups[2] + "</li>");
        }
    })
    return result.toString();
}


/// <summary>
/// reterive a specific build paramter by name from a 'buildObject'
/// </summary>
function GetBuildParamter(buildObject, paramName) {
    if (buildObject.actions[0].parameters != null) {
        //foreach(Parameter par in buildObject.actions[0].parameters)
        $.each(buildObject.actions[0].parameters, function (i, par) {
            if (par.name.ToLower().Contains(paramName)) {
                return par.name + ": " + par.value;
            }
        })
    }

    return "";

}

/// <summary>
/// Creates the Carousel base
/// </summary>
function CreateCarouselBase(length, tag) {
    var result = ("<div id=\"myCarousel" + tag + "\" class=\"carousel slide\" data-ride=\"carousel\" data-interval=\"false\" data-wrap=\"false\">" + "<!-- Indicators -->");
    result += ("<ol class=\"carousel-indicators\" style=\"bottom: -5px;\">" +
        "<li data-target=\"#myCarousel" + tag + "\" data-slide-to=\"0\" class=\"active\"></li>");
    for (i = 1; i < length; i++) {
        result.append("<li data-target=\"#myCarousel" + tag + "\" data-slide-to=\"" + i + "\"></li>");
    }
    result += ("</ol>");
    result += ("<!-- Wrapper for slides -->");
    result += ("<div class=\"carousel-inner\" role=\"listbox\">");
    return result.toString();
}

/// <summary>
/// Creates the Carousel end
/// </summary>
function CreateCarouselEnd(tag) {
    var result = "</div> " +
        "<!-- Left and right controls -->" +
        "<a class=\"left carousel-control\" href=\"#myCarousel" + tag + "\" role=\"button\" data-slide=\"prev\" style=\"width: 30;\">" +
        "<span class=\"glyphicon glyphicon-chevron-left\" aria-hidden=\"true\" style=\"margin-left: -50px;\"></span>" +
        "<span class=\"sr-only\">Previous</span>" +
        "</a>" +
        "<a class=\"right carousel-control\" href=\"#myCarousel" + tag + "\" role=\"button\" data-slide=\"next\" style=\"width: 30;\">" +
        "<span class=\"glyphicon glyphicon-chevron-right\" aria-hidden=\"true\" style=\"margin-right: -50px;\"></span>" +
        "<span class=\"sr-only\">Next</span>" +
        "</a>" +
        "</div>";
    return result;
}

function CreateHtmlForPipelines2(pipelines) {
    var score = 0;
    var json = "";
    var index = 0, pipeindex = 0;
    var pipeResult;
    var viewObject;
    var buildObject;
    var pipeObject;

    // get information from every pipeline
    var htmlForPipelines = ("<div class=\"panel-group\" id=\"accordion\">");
    var pipeNum = 0;

    htmlForPipelines += (CreateCarouselBase(0, 'all'));

    $.each(pipelines, function (i, pipe) {

        pipeNum++;


        score = 100; // (int)Math.Round((float)pipeResult.PipelineScore * 100 / (float)pipeResult.PipelineMaxScore);

        //start carousel item
        if (i == 0) {
            htmlForPipelines += ("<div class=\"item active\">");
        }
        else {
            htmlForPipelines += ("<div class=\"item\">");
        }

        // write pipeline information
        htmlForPipelines += ("<div class=\"panel panel-default\" style=\"margin-top: 0px;\">" +
            // "<div id=\"{2}1\" class=\"panel-heading\">" +
            "<div id=\"panel-heading\" class=\"panel-heading\" style=\"padding: 3px 15px;\">" +
            //"<h5 class=\"panel-title\">" +
            "<a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse" + pipe.id + 'all' + pipe.id + "\">" +
            "<strong>" + pipe.name + "</strong>" +
            "<font size=\"2\">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + "THE VERSION" + "</font></a>" +
            "<span><font size=\"1\" color=\"#B0B0B0\">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + "100" + "% Complete &nbsp</font></span>" +
            "<span><font size=\"1\" color=\"#B0B0B0\">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspScore: " + score + "% (100:100)</font></span>" +
            "<div class=\"progress mb-2\" style=\"height: 5px;\">" +
            CreateJobProgressBar(pipe.stages) +
            "</div>" +
            //"</h5>" +
            "</div>" +
            "<div id=\"collapse" + pipe.id + 'all' + pipe.id + "\" class=\"panel-collapse collapse\">" +
            "<div class=\"panel-body\">");

        // write pipeline data
        htmlForPipelines += ("<h3>" + pipe.name + "</h3>");
        htmlForPipelines += ("<div>Status: " + pipe.result + "</div>" +
            "<div>Started: " + pipe.start + "</div>" +
            "<div>Built on: " + pipe.builtOn + "</div>" +
            "<a href=\"http://" + pipe.url + "\"target=\"_blank\">Link in Jenkins</a>");

        //// write pipeline paramters
        //htmlForPipelines.append("<h3>Parameters</h3>");
        //htmlForPipelines.append("<ul>");
        //if (buildObject.actions[0].parameters != null) {
        //    foreach(Parameter par in buildObject.actions[0].parameters)
        //    {
        //        htmlForPipelines.append("<li>" + par.name + " : " + par.value + "</li>");
        //    }
        //}

        //htmlForPipelines.append("</ul>");


        // write all Jobs in pipeline
        //htmlForPipelines.append("<h3>Jobs</h3>");
        //htmlForPipelines.append("<table>");        

        //$.each(pipe.stages, function (i, stage) {
        //    var reportFolder = '';
        //    htmlForPipelines.append("<tr><td>" + stage.name + "&nbsp&nbsp</td><td>");


        //    //foreach(Task job in stage.tasks)

        //    //$.each(stage.tasks, function (i, task) {
        //    //    if (reportFolder == string.Empty && job.status.type != "IDLE") {
        //    //        reportFolder = getJobReportFolder(job, JenkinsIP);
        //    //    }               

        //    //    htmlForPipelines.append(CreateHtmlForJob(job, index, tab, JenkinsIP, reportFolder));
        //    //    index++;
        //    //});
        //    htmlForPipelines.append("</td></tr>");
        //});

        //htmlForPipelines.append("</table>");

        // close pipeline section
        htmlForPipelines += ("</div></div></div></div>");
        pipeindex++;

    });
    //end Carousel
    htmlForPipelines += (CreateCarouselEnd('all'));

    htmlForPipelines += ("</div>");

    return htmlForPipelines.toString();
}

function CreateHtmlForPipelines(pipelines) {
    var score = 0;
    var json = "";
    var index = 0, pipeindex = 0;
    var pipeResult;
    var viewObject;
    var buildObject;
    var pipeObject;

    // get information from every pipeline
    var htmlForPipelines = '';

    //htmlForPipelines += "<div class=\"panel panel-default\" style=\"margin-top: 0px;\"><div id=\"panel-heading\" class=\"panel-heading\" style=\"padding: 3px 15px;\">";        

    //var pipelineKeys = Object.keys(pipelines).reverse();
    //var pipelineNames = [];

    //$.each(Object.keys(pipelines), function (i, pipeKey) {

        //var pipe = pipelines[pipeKey]

        //if (!pipelineNames.includes(pipe.name)) {

    var htmlProgressBar = addStages(pipelines); // CreateJobProgressBar(pipe.stages);            
            //var msgs = ["Duration: " + millisecondsToTime(pipe.duration), "Status: " + pipe.result, "Started: " + pipe.start, "<div class=\"collapse\" id = \"" + "collapseChanges" + pipe.id.replace('#', '') + "\">" + pipe.changes + "</div>", htmlProgressBar]

    htmlForPipelines += addCard(pipelines.name, pipelines.id, htmlProgressBar, pipelines, 'row'); //'col-md-24');
            //pipelineNames.push(pipe.name);
        //}
    //});

    return htmlForPipelines;
}

function stages_pipeline_contol(pipe) {

}

function CreateHtmlForPipelines3(pipelines) {
    var score = 0;
    var json = "";
    var index = 0, pipeindex = 0;
    var pipeResult;
    var viewObject;
    var buildObject;
    var pipeObject;

    // get information from every pipeline
    var htmlForPipelines = '<div>';

    //htmlForPipelines += "<div class=\"panel panel-default\" style=\"margin-top: 0px;\"><div id=\"panel-heading\" class=\"panel-heading\" style=\"padding: 3px 15px;\">";        

    //var pipelineKeys = Object.keys(pipelines).reverse();
    $.each(Object.keys(pipelines), function (i, pipeKey) {

        var pipe = pipelines[pipeKey]
        var htmlPipeline = "<div id=\"panel-heading\" class=\"panel-heading\" style=\"padding: 3px 15px;\">";
        htmlPipeline += "<div id=\"accordion" + i + "\">";
        htmlPipeline += "<div class=\"card\"><h3 class=\"panel-title\">";
        htmlPipeline += "<a data-toggle=\"collapse\" data-parent=\"#accordion" + i + "\" href=\"#collapse" + pipe.id.replace('#', '') + "\" aria-controls=\"collapse" + pipe.id.replace('#', '') + "\"><strong>" + pipe.name + " [" + pipe.id + "] Duration: " + millisecondsToTime(pipe.duration) + "</strong></a>";

        // write pipeline information
        htmlPipeline += "<div class=\"progress\">";
        var htmlProgressBar = CreateJobProgressBar(pipe.stages);
        //console.info(htmlProgressBar);
        htmlPipeline += htmlProgressBar;
        htmlPipeline += "</div>";
        htmlPipeline += "</h3>";


        // write pipeline data
        htmlPipeline += "<div class=\"collapse\" id=\"" + "collapse" + pipe.id.replace('#', '') + "\" style=\"\">";
        htmlPipeline += "<div class=\"card card-body\">";
        htmlPipeline += "<h3>" + pipe.name + "</h3>";
        htmlPipeline += "<div>Status: " + pipe.result + "</div>";
        htmlPipeline += "<div>Started: " + pipe.start + "</div>";
        htmlPipeline += "<div>Duration: " + millisecondsToTime(pipe.duration) + "</div>";

        //htmlPipeline += "<div>Built on: " + pipe.builtOn + "</div>";
        htmlPipeline += "<div><h5><a data-toggle=\"collapse\" data-parent=\"#accordion" + i + "\" href=\"#collapseChanges" + pipe.id.replace('#', '') + "\" aria-controls=\"collapse" + pipe.id.replace('#', '') + "\">Changes:</h5></a></div >";
        htmlPipeline += "<br><div class=\"collapse\" id = \"" + "collapseChanges" + pipe.id.replace('#', '') + "\">" + pipe.changes + "</div>";
        htmlPipeline += "<a href=\"" + pipe.url + "\"target=\"_blank\">Link in Jenkins</a>";
        htmlPipeline += "</div>";
        htmlPipeline += "</div>";
        htmlPipeline += "</div>";
        // close pipeline section
        //htmlForPipelines += ("</div></div></div></div>");
        //pipeindex++;
        htmlPipeline += "</div>";
        htmlPipeline += "</div>";
        console.info("pipeline: " + pipe.id);
        console.info(htmlPipeline);
        htmlForPipelines += htmlPipeline;
        //console.info("in side the pipelines loop");
        //console.info(htmlForPipelines);
    });

    //console.info("out of the pipelines loop");
    //console.info(htmlForPipelines);

    //htmlForPipelines += "</div>";
    //end Carousel
    //htmlForPipelines += (CreateCarouselEnd('all'));
    htmlForPipelines += "</div>";
    htmlForPipelines += "</div>";

    console.info(htmlForPipelines);
    return htmlForPipelines.toString();
}

function s(x) { return x.charCodeAt(0); }

function GetLastBuilds() {
    try {
        var jobName = '';
        var filter = '';
        var count = 1;
        var defectArray = '';
        if (jobName == null) { jobName = 'ExecuteRAFScript'; }
        if (filter == null) { filter = ''; }

        var request = $.ajax({
            url: '//10.150.101.130:8080/' + 'view/Delivery%20Pipeline%20View%20for%20Jenkins%20Pipelines' + '/api/json', // + XML, //GetRAFDefects', $('.GreenOrGray a.active').html()
            //url: '//localhost:62156/api/QC/' + GetMethodName,
            useDefaultXhrHeader: false,
            crossDomain: true,
            //async: false,
            //username: "tkotek", // Most SAP web services require credentials
            //password: "f0eac7135c275ee6683a44716dfe9300",
            //jsonpCallback: "callBack",
            //dataType: "jsonp",            
            dataType: "json",
            beforeSend: function (xhr) {
                //var authEncododed = new Blob("tkotek:f0eac7135c275ee6683a44716dfe9300".split('').map(s)); //"test.message".split('').map(s);
                var authEncododed = btoa("tkotek:f0eac7135c275ee6683a44716dfe9300"); //.split('').map(s)); //"test.message".split('').map(s);
                //xhr.setRequestHeader("AUTH-KEY", "f0eac7135c275ee6683a44716dfe9300");
                //xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.95 Safari/537.11");
                xhr.withCredentials = true;
                xhr.setRequestHeader("Authorization", "Basic " + authEncododed);
                xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
                xhr.setRequestHeader("Host", "10.150.101.130:8080");
                xhr.setRequestHeader("Connection", "keep - alive");
                xhr.setRequestHeader("Cache-Control", "max - age=0");
                xhr.setRequestHeader("Upgrade-Insecure-Requests", "1");
                xhr.setRequestHeader("User-Agent", "Mozilla / 5.0(Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36");
                xhr.setRequestHeader("Accept", "text/html, application/xhtml + xml, application/xml; q = 0.9, image/webp, image/apng,*/*;q=0.8");
                xhr.setRequestHeader("Accept-Encoding", "gzip, deflate");
                xhr.setRequestHeader("Accept-Language", "en-US,en;q=0.9,he-IL;q=0.8,he;q=0.7");
            },
            //data: "depth=1&jsonp=callBack", //&tree=builds[number,status,displayName,timestamp,id,result,estimatedDuration,builtOn]
            //data: jsonParams, //{ jsonParams },
            //dataType: 'text/xml',
            method: "GET",
            complete: function (data) {

                alert("(completed) statusText: " + data.statusText);

                defectArray = data;
                //defectArray = JSON.parse(data); // 'Done!!!'; // JSON.parse(data);                
            },
            success: function (data) {
                //$.each(data.builds, function (id, build) { $("#alert").append("BuildNumber: " + build.number); });
                //$('#builds').empty();
                alert("(success) pipelines: " + data.pipelines.length);

                defectArray = data.pipelines.length;
                //defectArray = JSON.parse(data); // 'Done!!!'; // JSON.parse(data);                
            },
            error: function (data, textStatus, jqXHR) {
                alert('error!: ' + textStatus);
                alert('error!: ' + data.statusText);
                defectArray = textStatus + " => " + data.statusText; //+ " => " + r.message + " => " + r.StackTrace;
                return defectArray;
            }
        });
    }
    catch (err) {
        //$("#alert").append("CATCH: ");
        //console.error(err);
        alert("err:" + err);
        return err;
    }

    //$("#alert").append("OUT: ");
    return defectArray;
}

function GetPipelines() {

    var jenkinsServer = 'cd-jenkins';
    var jenkinsPipelineJob = 'CD%20Main%20Pipeline';

    return GetPipeline(jenkinsServer, jenkinsPipelineJob);
}

async function asyncCall_GetPipeline(jenkinsServer, jenkinsPipelineJob, async) {
    console.log('calling');
    var result = GetPipeline(jenkinsServer, jenkinsPipelineJob, async);
    console.log(result);
    return result;
    // expected output: "resolved"
}


function GetPipeline(jenkinsServer, jenkinsPipelineJob, async) {

    if (typeof (async) == 'undefined') {
        async = false;
    }
    //http://smp-jenkins:8080/job/SMP%20CI%20Pipeline/job/master/wfapi/runs
    //http://cs-jenkins:8080/job/CS%20CI%20Main%20Pipeline/job/master/lastBuild/wfapi/
    //var pipeline_url = '//' + jenkinsServer + ':8080/job/' + jenkinsPipelineJob + '/job/master/lastBuild/wfapi/';
    //var pipeline_url = '//' + jenkinsServer + ':8080/job/' + jenkinsPipelineJob + '/job/master/lastBuild/wfapi/';
    var pipeline_url = '//' + jenkinsServer + ':8080/job/' + jenkinsPipelineJob + '/lastBuild/wfapi/';
    //var jenkins_url = '//localhost:12345/api/Jenkins/GetPipelines?jenkinsServer=' + jenkinsServer + '&jobName=' + jenkinsPipelineJob ;
    var jenkins_url = '//10.50.227.34/DevOpsAPI/api/Jenkins/GetPipelines?jenkinsServer=' + jenkinsServer + '&jobName=' + jenkinsPipelineJob;
    //'http://localhost:12345/api/Jenkins/GetPipelines?jenkinsServer=cd-jenkins&jobName=CD%20Main%20Pipeline';
    //'http://localhost:12345/api/Jenkins/GetPipelines?jenkinsServer=dm-jenkins&jobName=CI%20Main%20Pipeline';

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
            pipelines = JSON.parse(data);
            result = parsePipeline(pipelines, pipeline_url, jenkins_url, jenkinsServer);
        },
        error: function (data, textStatus, jqXHR) {
            pipelines = "ERROR: " + textStatus + " => " + data.statusText; //+ " => " + r.message + " => " + r.StackTrace;            
        }
    });

    //var jsonPipelines = [{ 'id': '1', 'name': 'demo1', 'start': 'few minutes ago...', 'builtOn': 'demoMachine', 'url': 'http://google.com', 'result': 'success', 'stages': [{ 'name': 'stage01', 'tasks': [{ 'name': 'job01', 'status': 'success' }, { 'name': 'job02', 'status': 'success' }, { 'name': 'job03', 'status': 'success' }, { 'name': 'job04', 'status': 'success' }] }, { 'name': 'stage02', 'tasks': [{ 'name': 'job01', 'status': 'cancelled' }, { 'name': 'job02', 'status': 'cancelled' }, { 'name': 'job03', 'status': 'cancelled' }, { 'name': 'job04', 'status': 'cancelled' }] }, { 'name': 'stage03', 'tasks': [{ 'name': 'job01', 'status': 'failed' }, { 'name': 'job02', 'status': 'failed' }, { 'name': 'job03', 'status': 'failed' }, { 'name': 'job04', 'status': 'failed' }] }, { 'name': 'stage04', 'tasks': [{ 'name': 'job01', 'status': 'success' }, { 'name': 'job02', 'status': 'success' }, { 'name': 'job03', 'status': 'success' }, { 'name': 'job04', 'status': 'running' }] }, { 'name': 'stage05', 'tasks': [{ 'name': 'job01', 'status': 'success' }, { 'name': 'job02', 'status': 'cancelled' }, { 'name': 'job03', 'status': 'success' }, { 'name': 'job04', 'status': 'running' }] }], 'score': '90' }];
    return result; //parsePipeline(pipelines, pipeline_url, jenkins_url, jenkinsServer);

}

function getBuildStatus() {
    var buildsObj;

    var builds = GetRestByMethod('jenkins', 'GetBuildsInfo');

    try {
        buildsObj = eval(builds);
    }
    catch (err) {
        buildsObj = JSON.parse(builds);
    }

    //var jsonPipelines = [{ 'id': '1', 'name': 'demo1', 'start': 'few minutes ago...', 'builtOn': 'demoMachine', 'url': 'http://google.com', 'result': 'success', 'stages': [{ 'name': 'stage01', 'tasks': [{ 'name': 'job01', 'status': 'success' }, { 'name': 'job02', 'status': 'success' }, { 'name': 'job03', 'status': 'success' }, { 'name': 'job04', 'status': 'success' }] }, { 'name': 'stage02', 'tasks': [{ 'name': 'job01', 'status': 'cancelled' }, { 'name': 'job02', 'status': 'cancelled' }, { 'name': 'job03', 'status': 'cancelled' }, { 'name': 'job04', 'status': 'cancelled' }] }, { 'name': 'stage03', 'tasks': [{ 'name': 'job01', 'status': 'failed' }, { 'name': 'job02', 'status': 'failed' }, { 'name': 'job03', 'status': 'failed' }, { 'name': 'job04', 'status': 'failed' }] }, { 'name': 'stage04', 'tasks': [{ 'name': 'job01', 'status': 'success' }, { 'name': 'job02', 'status': 'success' }, { 'name': 'job03', 'status': 'success' }, { 'name': 'job04', 'status': 'running' }] }, { 'name': 'stage05', 'tasks': [{ 'name': 'job01', 'status': 'success' }, { 'name': 'job02', 'status': 'cancelled' }, { 'name': 'job03', 'status': 'success' }, { 'name': 'job04', 'status': 'running' }] }], 'score': '90' }];
    return buildsObj; //result; //parsePipeli

}

function GetBuildInfo(jenkinsServer, jenkinsPipelineJob, buildId) {
    //api/Jenkins/GetBuildInfo?jenkinsServer=10.110.4.129&jobName=Install&buildId=lastSuccessfulBuild
    if (typeof (async) == 'undefined') {
        async = false;
    }

    if (typeof (oldPipeline) == 'undefined') {
        oldPipeline = false;
    }
    
    //var jenkins_url = '//localhost:12345/api/Jenkins/GetPipelinesInfo?jenkinsServer=' + jenkinsServer + '&jobName=' + jenkinsPipelineJob ;
    var pipeline_url = '//' + jenkinsServer + ':8080/job/' + jenkinsPipelineJob + '/' + buildId + '/api/json';
    var jenkins_url = '//10.50.227.34/DevOpsAPI/api/Jenkins/GetBuildInfo?jenkinsServer=' + jenkinsServer + '&jobName=' + jenkinsPipelineJob + '&buildId=' + buildId;
    //'http://localhost:12345/api/Jenkins/GetPipelines?jenkinsServer=cd-jenkins&jobName=CD%20Main%20Pipeline';
    //'http://localhost:12345/api/Jenkins/GetPipelines?jenkinsServer=dm-jenkins&jobName=CI%20Main%20Pipeline';

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
            pipelines = JSON.parse(data);
            //result = parsePipelineInfo(pipelines, pipeline_url, jenkins_url, jenkinsServer);
        },
        error: function (data, textStatus, jqXHR) {
            pipelines = "ERROR: " + textStatus + " => " + data.statusText; //+ " => " + r.message + " => " + r.StackTrace;            
        }
    });

    //var jsonPipelines = [{ 'id': '1', 'name': 'demo1', 'start': 'few minutes ago...', 'builtOn': 'demoMachine', 'url': 'http://google.com', 'result': 'success', 'stages': [{ 'name': 'stage01', 'tasks': [{ 'name': 'job01', 'status': 'success' }, { 'name': 'job02', 'status': 'success' }, { 'name': 'job03', 'status': 'success' }, { 'name': 'job04', 'status': 'success' }] }, { 'name': 'stage02', 'tasks': [{ 'name': 'job01', 'status': 'cancelled' }, { 'name': 'job02', 'status': 'cancelled' }, { 'name': 'job03', 'status': 'cancelled' }, { 'name': 'job04', 'status': 'cancelled' }] }, { 'name': 'stage03', 'tasks': [{ 'name': 'job01', 'status': 'failed' }, { 'name': 'job02', 'status': 'failed' }, { 'name': 'job03', 'status': 'failed' }, { 'name': 'job04', 'status': 'failed' }] }, { 'name': 'stage04', 'tasks': [{ 'name': 'job01', 'status': 'success' }, { 'name': 'job02', 'status': 'success' }, { 'name': 'job03', 'status': 'success' }, { 'name': 'job04', 'status': 'running' }] }, { 'name': 'stage05', 'tasks': [{ 'name': 'job01', 'status': 'success' }, { 'name': 'job02', 'status': 'cancelled' }, { 'name': 'job03', 'status': 'success' }, { 'name': 'job04', 'status': 'running' }] }], 'score': '90' }];
    return pipelines; //result; //parsePipeli

}

function GetPipelineInfo(jenkinsServer, jenkinsPipelineJob, async, oldPipeline) {

    if (typeof (async) == 'undefined') {
        async = false;
    }

    if (typeof (oldPipeline) == 'undefined') {
        oldPipeline = false;
    }

    //http://smp-jenkins:8080/job/SMP%20CI%20Pipeline/job/master/wfapi/runs
    //http://cs-jenkins:8080/job/CS%20CI%20Main%20Pipeline/job/master/lastBuild/wfapi/
    //var pipeline_url = '//' + jenkinsServer + ':8080/job/' + jenkinsPipelineJob + '/job/master/lastBuild/wfapi/';
    var pipeline_url = '//' + jenkinsServer + ':8080/job/' + jenkinsPipelineJob + '/lastBuild/wfapi/';
    if (oldPipeline) {
        pipeline_url = '//' + jenkinsServer + ':8080/job/' + jenkinsPipelineJob + '/job/master/lastBuild/wfapi/';
    } 
    //var jenkins_url = '//localhost:12345/api/Jenkins/GetPipelinesInfo?jenkinsServer=' + jenkinsServer + '&jobName=' + jenkinsPipelineJob ;
    var jenkins_url = '//10.50.227.34/DevOpsAPI/api/Jenkins/GetPipelinesInfo?jenkinsServer=' + jenkinsServer + '&jobName=' + jenkinsPipelineJob;
    //'http://localhost:12345/api/Jenkins/GetPipelines?jenkinsServer=cd-jenkins&jobName=CD%20Main%20Pipeline';
    //'http://localhost:12345/api/Jenkins/GetPipelines?jenkinsServer=dm-jenkins&jobName=CI%20Main%20Pipeline';

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
            pipelines = JSON.parse(data);
            //result = parsePipelineInfo(pipelines, pipeline_url, jenkins_url, jenkinsServer);
        },
        error: function (data, textStatus, jqXHR) {
            pipelines = "ERROR: " + textStatus + " => " + data.statusText; //+ " => " + r.message + " => " + r.StackTrace;            
        }
    });

    //var jsonPipelines = [{ 'id': '1', 'name': 'demo1', 'start': 'few minutes ago...', 'builtOn': 'demoMachine', 'url': 'http://google.com', 'result': 'success', 'stages': [{ 'name': 'stage01', 'tasks': [{ 'name': 'job01', 'status': 'success' }, { 'name': 'job02', 'status': 'success' }, { 'name': 'job03', 'status': 'success' }, { 'name': 'job04', 'status': 'success' }] }, { 'name': 'stage02', 'tasks': [{ 'name': 'job01', 'status': 'cancelled' }, { 'name': 'job02', 'status': 'cancelled' }, { 'name': 'job03', 'status': 'cancelled' }, { 'name': 'job04', 'status': 'cancelled' }] }, { 'name': 'stage03', 'tasks': [{ 'name': 'job01', 'status': 'failed' }, { 'name': 'job02', 'status': 'failed' }, { 'name': 'job03', 'status': 'failed' }, { 'name': 'job04', 'status': 'failed' }] }, { 'name': 'stage04', 'tasks': [{ 'name': 'job01', 'status': 'success' }, { 'name': 'job02', 'status': 'success' }, { 'name': 'job03', 'status': 'success' }, { 'name': 'job04', 'status': 'running' }] }, { 'name': 'stage05', 'tasks': [{ 'name': 'job01', 'status': 'success' }, { 'name': 'job02', 'status': 'cancelled' }, { 'name': 'job03', 'status': 'success' }, { 'name': 'job04', 'status': 'running' }] }], 'score': '90' }];
    return pipelines; //result; //parsePipeline(pipelines, pipeline_url, jenkins_url, jenkinsServer);

}

function collectBuildPipelineInfo(jenkinsServer, jenkinsPipelineJob, buildId) {

    var buildInfo = GetBuildInfo(jenkinsServer, jenkinsPipelineJob, buildId);
    var pipelineInfo = GetPipelineInfo(jenkinsServer, jenkinsPipelineJob);

    return parsePipelineInfo(pipelineInfo, buildInfo);
}

function parsePipelineInfo(pipelines, buildInfo) { //, pipeline_url, jenkins_url, jenkinsServer) {

    var jsonPipelines = {};
    var pipeliesObj = '';
    
    pipeliesObj = JSON.parse(pipelines);
    buildObj = JSON.parse(buildInfo);

    jsonPipelines['url'] = pipeliesObj['url'];

    console.log("parsePipelineInfo: " + jsonPipelines['url']);

    if (typeof (pipeliesObj['healthReport']) == 'undefined' || pipeliesObj['healthReport'] == null) {
        jsonPipelines['health'] = {"score":"Missing"};
    } else {
        jsonPipelines['health'] = pipeliesObj['healthReport'][0];
    }

    if (typeof (pipeliesObj['lastFailedBuild']) == 'undefined' || pipeliesObj['lastFailedBuild'] == null) {
        jsonPipelines['lastFailedBuild'] = '-';
    }
    else {
        jsonPipelines['lastFailedBuild'] = pipeliesObj['lastFailedBuild']['number'];
    }

    if (typeof (pipeliesObj['lastSuccessfulBuild']) == 'undefined' || pipeliesObj['lastSuccessfulBuild'] == null) {
        jsonPipelines['lastSuccessfulBuild'] = '-';
    }
    else {
        jsonPipelines['lastSuccessfulBuild'] = pipeliesObj['lastSuccessfulBuild']['number'];
    }

    if (typeof (pipeliesObj['lastUnsuccessfulBuild']) == 'undefined' || pipeliesObj['lastUnsuccessfulBuild'] == null) {
        jsonPipelines['lastUnsuccessfulBuild'] = '-';
    }
    else {
        jsonPipelines['lastUnsuccessfulBuild'] = pipeliesObj['lastUnsuccessfulBuild']['number'];
    }

    var properties = {};
    //find obj that contains 'parameterDefinitions' attribute
    if (typeof (pipeliesObj['property']) != 'undefined') {
        properties = pipeliesObj['property'].filter(function (obj) {
            return typeof (obj['parameterDefinitions']) != 'undefined';
        });
    }


    if (typeof (properties) == 'undefined' || properties.length <= 0) {
        jsonPipelines['product'] = 'Missing';
        jsonPipelines['version'] = 'Missing';
        jsonPipelines['branch'] = 'Missing';
        jsonPipelines['build'] = 'Missing';
    }
    else {
        try {
            jsonPipelines['product'] = properties[0]['parameterDefinitions'][0]['defaultParameterValue']['value'];
        } catch (ex) {
            jsonPipelines['product'] = 'Missing';
        };
        try { jsonPipelines['version'] = properties[0]['parameterDefinitions'][1]['defaultParameterValue']['value']; } catch (ex) { jsonPipelines['version'] = 'Missing'; };
        try { jsonPipelines['branch'] = properties[0]['parameterDefinitions'][2]['defaultParameterValue']['value']; } catch (ex) { jsonPipelines['branch'] = 'Missing'; };
        try { jsonPipelines['build'] = properties[0]['parameterDefinitions'][3]['defaultParameterValue']['value']; } catch (ex) { jsonPipelines['build'] = 'Missing'; };
    }

    jsonPipelines['changes'] = '';

    var changes = {'message': '', 'userMeassage': '', 'users':[], 'comments': [], 'affectedFiles':[]};

    $.each(buildObj['changeSets'], function (i, changeSet) {
        $.each(changeSet.items, function (i, change) {
            var commitId = change['commitId'];
            var comment = change['comment'];
            var author = change['author']['fullName'];
            var affectedPaths = '';

            if (changes['users'].indexOf(author) < 0) {
                changes['users'].push(author);
                changes['userMeassage'] += author + ';';
            }
            if (changes['comments'].indexOf(comment) < 0) { changes['comments'].push(comment); }
                      

            $.each(change.affectedPaths, function (i, file) {
                if (changes['affectedFiles'].indexOf(file) < 0) { changes['affectedFiles'].push(file); }            
            });           

            //jsonPipelines['changes'] += comment + ' <' + author + '>\r\n' + affectedPaths;
        });
    });

    changes['message'] = 'Commits: ' + changes['comments'].length + ' Commiters:' + changes['users'].length + ' Affected Files: ' + changes['affectedFiles'].length;
        


    jsonPipelines['changes'] = changes;

    //jsonPipelines[0] = {
    //    "id": pipeliesObj[0].id,
    //    "jenkins_ip": jenkins_url,
    //    "view_link": jenkins_url,
    //    "pipeline_link": pipeline_url,
    //    "name": jenkinsServer, //pipe.name,
    //    "start": new Date(pipeliesObj[0].startTimeMillis).toLocaleString("en-UE"),
    //    "builtOn": 'pipe.builtOn',
    //    "url": jenkins_url, //pipe.pipeline_link + pipe.stage_link,
    //    "duration": parseFloat(pipeliesObj[0].durationMillis),
    //    "result": pipeliesObj[0].status,
    //    "changes": 'pipe.changes',
    //    "stages": [],
    //    "builds": pipeliesObj.length
    //};

    return jsonPipelines;
}

function parsePipeline(pipelines, pipeline_url, jenkins_url, jenkinsServer) {
    var jsonPipelines = [];

    //[TODO] create pipeline object and push it into the array
    var pipeliesObj = '';
    if (JSON.parse(pipelines).length > 0) {
        pipeliesObj = JSON.parse(pipelines);

        var lastBuild = pipeliesObj[0].id;

        var all_stages = [];

        var build_status = 'IDLE';
        if (pipeliesObj[0].status == 'IN_PROGRESS') { pipeliesObj[0].status = 'RUNNING' };
        //if (pipe.id == lastBuild) { status = stage.status } 

        jsonPipelines[0] = {
            "id": pipeliesObj[0].id,
            "jenkins_ip": jenkins_url,
            "view_link": jenkins_url,
            "pipeline_link": pipeline_url,
            "name": jenkinsServer, //pipe.name,
            "start": new Date(pipeliesObj[0].startTimeMillis).toLocaleString("en-UE"),
            "builtOn": 'pipe.builtOn',
            "url": jenkins_url, //pipe.pipeline_link + pipe.stage_link,
            "duration": parseFloat(pipeliesObj[0].durationMillis),
            "result": pipeliesObj[0].status,
            "changes": 'pipe.changes',
            "stages": [],
            "builds": pipeliesObj.length
        };

        $.each(pipeliesObj, function (i, pipe) {

            $.each(pipe.stages, function (i, stage) {
                var status = 'IDLE';
                var start_time = '';
                var duration = '';

                if (stage.status == 'IN_PROGRESS') { stage.status = 'RUNNING' };
                if (pipe.id == lastBuild) {
                    status = stage.status;
                }

                var s = {
                    "name": stage.name, // + " (" + pipe.id + ") - " + status ,
                    "duration": millisecondsToTime(parseFloat(stage.durationMillis)),
                    //"link": pipe.stage_link,
                    "start_time": new Date(stage.startTimeMillis).toLocaleTimeString("en-UE"), // (stage.startTimeMillis),
                    "status": status
                };

                //all_stages.push(s);
                if (jsonPipelines[0].stages.filter(s => s.name === stage.name).length <= 0) {
                    jsonPipelines[0].stages.push(s);
                }


            });

            //else {
            //    var s = {
            //        "name": pipe.stage[0].name,
            //        "duration": parseFloat(pipe.stage[0].durationMillis),
            //        //"link": pipe.stage_link,
            //        "start_time": pipe.stage[0].startTimeMillis,
            //        "status": pipe.stage[0].status
            //    };

            //    jsonPipelines[pipe.id].duration += parseFloat(pipe.durationMillis);
            //    jsonPipelines[pipe.id].stages.push(s);
            //}

        });
    }
    else {
        pipe = JSON.parse(pipelines);

        var jenkins_ip = jenkins_url;

        if (jsonPipelines[pipe.id] == null) { //adding new pipeline
            jsonPipelines[pipe.id] = {
                "id": pipe.id,
                "jenkins_ip": jenkins_ip,
                "view_link": jenkins_url,
                "pipeline_link": pipeline_url,
                "name": jenkinsServer, //pipe.name,
                "start": pipe.startTimeMillis,
                "builtOn": 'pipe.builtOn',
                "url": jenkins_url, //pipe.pipeline_link + pipe.stage_link,
                "duration": parseFloat(pipe.durationMillis),
                "result": pipe.status,
                "changes": 'pipe.changes',
                "stages": []
            };
        }

        $.each(pipe[0].stages, function (i, stage) {
            var s = {
                "name": stage.name,
                "duration": parseFloat(stage.durationMillis),
                //"link": pipe.stage_link,
                "start_time": stage.startTimeMillis,
                "status": stage.status
            };

            jsonPipelines[pipe.id].stages.push(s);
        });

        jsonPipelines[pipe.id].duration += parseFloat(pipe.durationMillis);
        //jsonPipelines[pipe.id].stages.push(s);


    }


    return jsonPipelines;
}

function GetPipelines2() {
    var pipelines = '';
    $.ajax({
        url: '//localhost:12345/api/Dashboard/GetPipelines', // + "?FolderName=.Regression&ParentFolderName=15.1%20FP1", //GetRAFDefects', 
        //url:         '//localhost:62156/api/QC/GetStatisticForKBs', //' + GetMethodName,
        useDefaultXhrHeader: false,
        crossDomain: true,
        async: false,
        dataType: 'text',
        method: 'GET',
        success: function (data) {
            pipelines = JSON.parse(data);
        },
        error: function (data, textStatus, jqXHR) {
            pipelines = "ERROR: " + textStatus + " => " + data.statusText; //+ " => " + r.message + " => " + r.StackTrace;            
        }
    });

    //var jsonPipelines = [{ 'id': '1', 'name': 'demo1', 'start': 'few minutes ago...', 'builtOn': 'demoMachine', 'url': 'http://google.com', 'result': 'success', 'stages': [{ 'name': 'stage01', 'tasks': [{ 'name': 'job01', 'status': 'success' }, { 'name': 'job02', 'status': 'success' }, { 'name': 'job03', 'status': 'success' }, { 'name': 'job04', 'status': 'success' }] }, { 'name': 'stage02', 'tasks': [{ 'name': 'job01', 'status': 'cancelled' }, { 'name': 'job02', 'status': 'cancelled' }, { 'name': 'job03', 'status': 'cancelled' }, { 'name': 'job04', 'status': 'cancelled' }] }, { 'name': 'stage03', 'tasks': [{ 'name': 'job01', 'status': 'failed' }, { 'name': 'job02', 'status': 'failed' }, { 'name': 'job03', 'status': 'failed' }, { 'name': 'job04', 'status': 'failed' }] }, { 'name': 'stage04', 'tasks': [{ 'name': 'job01', 'status': 'success' }, { 'name': 'job02', 'status': 'success' }, { 'name': 'job03', 'status': 'success' }, { 'name': 'job04', 'status': 'running' }] }, { 'name': 'stage05', 'tasks': [{ 'name': 'job01', 'status': 'success' }, { 'name': 'job02', 'status': 'cancelled' }, { 'name': 'job03', 'status': 'success' }, { 'name': 'job04', 'status': 'running' }] }], 'score': '90' }];

    var jsonPipelines = [];

    //[TODO] create pipeline object and push it into the array
    $.each(JSON.parse(pipelines).Table, function (i, pipe) {


        if (jsonPipelines[pipe.build_id] == null) { //adding new pipeline
            jsonPipelines[pipe.build_id] = {
                "id": pipe.build_id,
                "jenkins_ip": pipe.jenkins_ip,
                "view_link": pipe.jenkins_view,
                "pipeline_link": pipe.pipeline_link,
                "name": pipe.name,
                "start": pipe.start_time,
                "builtOn": pipe.builtOn,
                "url": pipe.pipeline_link + pipe.stage_link,
                "duration": parseFloat(pipe.stage_duration),
                "result": pipe.status,
                "changes": pipe.changes,
                "stages": [{
                    "name": pipe.stage,
                    "duration": parseFloat(pipe.stage_duration),
                    //"link": pipe.stage_link,
                    "start_time": pipe.start_time,
                    "status": pipe.status
                }]
            };
        }
        else {
            var s = {
                "name": pipe.stage,
                "duration": parseFloat(pipe.stage_duration),
                //"link": pipe.stage_link,
                "start_time": pipe.start_time,
                "status": pipe.status
            };

            jsonPipelines[pipe.build_id].duration += parseFloat(pipe.stage_duration);
            jsonPipelines[pipe.build_id].stages.push(s);
        }

    });

    return jsonPipelines;
}

function millisecondsToTime(millis) {
    var units = "mins"
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    if (minutes == 0) { units = "secs" }
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds + ' ' + units; 
    /*
    var milliseconds = milli % 1000;
    var seconds = Math.floor((milli / 1000) % 60);
    var minutes = Math.floor((milli / (60 * 1000)) % 60);

    var res = '';

    if (minutes == "0") { res = ("0" + seconds).slice(-2) + "." + ("000" + milliseconds).slice(-3) + " sec"; }
    else {
        if (seconds == "0") { res = ("0000" + milliseconds).slice(-4) + " milliseconds"; } else {
            res = minutes + ":" + ("0" + seconds).slice(-2)  + " min";
        }
    }

    return res;
    */
}