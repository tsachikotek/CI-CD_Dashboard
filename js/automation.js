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
        
    var currentPage = document.location.pathname.substring(document.location.pathname.lastIndexOf('/') + 1);

    try { var defectArray = JSON.parse(GetRestByMethod('Tests', 'GetAutomationTrendALL'));} catch (ex) { alert(ex); }
    try { insertCardChart1Dataset('main-stat', Object.keys(defectArray[0]), Object.values(defectArray[0]), 'Coverage', 'Coverage (All Products)', '*based on QC automated status', 'line', 1.5); } catch (ex) { alert(ex); }
    try { insertChart_AutomationCoverage('coverage', 'Allot', true, false, GetRestByMethod('Tests', 'GetTestsAutoExecStatusByProduct'), 6); } catch (ex) { alert(ex); }
        
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

    try { $('#priorityTable').append(JsonToTableHtml(GetRestByMethod('Tests', 'GetAutomationTrendALL'))); } catch (ex) { alert(ex); }
    try { $('#priorityTable').append(JsonToTableHtml(GetRestByMethod('Tests', 'GetAutomationTrendByProduct'))); } catch (ex) { alert(ex); }
    try { $('#priorityTable').append(JsonToTableHtml(GetRestByMethod('Tests', 'GetTestAutomationStatusByPriorityAll'))); } catch (ex) { alert(ex); }

    function createCategoryArray(currentObject, prefix, suffix) {
        var categories = [];
        for (var i = 1; i <= Object.keys(currentObject).length; i++) {
            categories.push(prefix + i.toString() + suffix);
        }

        return categories;
    }  
})(jQuery);