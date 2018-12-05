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

 
    var currentPage = 'defects.html'; //document.location.pathname.substring(document.location.pathname.lastIndexOf('/') + 1);
     
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
    
    var imgJenkins = '//png.icons8.com/color/50/000000/jenkins.png';
    var imgDefects = '//www.practicalrecovery.com/wp-content/uploads/2016/12/character-defects-in-recovery-300x300.png';

    if (currentPage == "index.html" || currentPage == "defects.html") {
        try {
            var defectsDataSummary = JSON.parse(GetDataForDefects());

            var messages = [];
            var values = [];

            $.each(defectsDataSummary.Table, function (i, month) {
                for (var propertyName in month) {
                    // propertyName is what you want
                    // you can get the value like this: myObject[propertyName]
                    var value = Math.round(month[propertyName]);
                    if (!isNaN(value)) {
                        //insertCardWithSingleValue('topRightCard', value, propertyName);
                        //insertCardWithCloseAndCollapse('topLeftCard', value, propertyName);
                        messages.push(propertyName);
                        values.push(value);
                    }
                }

            });

            updateCardWithMultipleValues('defects_status', 'Defects', 'All Products & Versions', messages, values, 'defects_all', imgDefects);
            setInterval(function () { updateCardWithMultipleValues('defects_status', 'Defects', 'All Products & Versions', messages, values, 'defects_all', imgDefects); }, 3600000);
        } catch (ex) { }
    }

    if (currentPage == "index.html" || currentPage == "defects.html") {
        try {
            var defects = JSON.parse(GetDefectsOpenVsClosed());

            var months = [];
            var valuesCreated = [];
            var valuesClosed = [];

            $.each(defects.Table, function (i, month) {
                months.push(month.YEAR + '.' + month.MONTH);
                valuesCreated.push(month.CREATED_COUNT);
                valuesClosed.push(month.CLOSED_COUNT);
            });

            //insertCardChart2Datasets("topRightCard", months.slice(0, -1), valuesCreated.slice(0, -1), valuesClosed.slice(0, -1), "valuesCreated", valuesCreated[valuesCreated.length - 1] + " Open Defects", "Current Month: " + months[months.length - 1]);
            //insertCardChart2Datasets("topRightCard", months.slice(0, -1), valuesClosed.slice(0, -1), valuesCreated.slice(0, -1), "valuesClosed", valuesClosed[valuesClosed.length - 1] + " Closed Defects", "Current Month: " + months[months.length - 1]);

            var products = [];
            var totalDefects = [];
            var openDefected = [];
            var avgTimeInDev = [];
            var avgTimeInQA = [];
            var avgTimeInDev_Case = [];
            var avgTimeInQA_Case = [];
            var foundOnSite = [];
            var reopenCount = [];
            var closedNoQA = [];
            var resolvedNotClosed = [];
            var foundInDev = [];
            var foundInQA = [];

            defects = JSON.parse(GetDefectsStatusByProduct());
            $.each(defects.Table, function (i, product) {
                products.push(product.PRODUCT);
                totalDefects.push(product.Total);
                openDefected.push(product.Not_Resolved);
                avgTimeInDev.push(product.AVG_IN_DEV);
                avgTimeInQA.push(product.AVG_IN_QA);
                avgTimeInDev_Case.push(product.AVG_IN_DEV_CASE);
                avgTimeInQA_Case.push(product.AVG_IN_QA_CASE);
                foundOnSite.push(product.FOUND_IN_FIELD);
                foundInDev.push(product.FOUND_IN_DEV);
                foundInQA.push(product.FOUND_IN_QA);
                reopenCount.push(product.REOPENED_COUNT);
                closedNoQA.push(product.CLOSED_NO_QA);
                resolvedNotClosed.push(product.RESOLVED_NOT_CLOSED);
            });

            updateCardWithMultipleValues('defects_status', 'Open Defects', 'Status', products, openDefected, 'defects', imgDefects);
            setInterval(function () { updateCardWithMultipleValues('defects_status', 'Open Defects', 'Status', products, openDefected, 'defects', imgDefects); }, 3600000);

            insertCardChart2Datasets("defects_status", products, avgTimeInDev, avgTimeInQA, "defects", "Avg In QA vs Dev", "All Products");
            insertCardChart2Datasets("defects_status", products, foundInQA, foundInDev, "defects", "Found In QA vs Dev", "All Products");

            insertCardChart1Dataset("defects_status", products, foundOnSite, "defects", "Found on Site", "Total: " + defectsDataSummary.Table[0]["FOUND_IN_FIELD"]);
            insertCardChart1Dataset("defects_status", products, openDefected, "defects", "Defects not closed", "Total: " + defectsDataSummary.Table[0]["Not_Resolved"]);
            insertCardChart1Dataset("defects_status", products, avgTimeInDev, "defects", "Average time in Dev", "Total: " + Math.round(defectsDataSummary.Table[0]["AVG_IN_DEV"]) + " days");
            insertCardChart1Dataset("defects_status", products, avgTimeInQA, "defects", "Avg Time In QA", "Total: " + Math.round(defectsDataSummary.Table[0]["AVG_IN_QA"]) + " days");
            insertCardChart1Dataset("defects_status", products, reopenCount, "defects", "Reopened Count", "Total: " + defectsDataSummary.Table[0]["REOPENED_COUNT"]);

            insertCardChart1Dataset("defects_status", products, avgTimeInDev_Case, "defects", "Avg Time In Dev (Cases)", "Total: " + defectsDataSummary.Table[0]["AVG_IN_DEV_CASE"]);
            insertCardChart1Dataset("defects_status", products, avgTimeInQA_Case, "defects", "Avg Time In QA (Cases)", "Total: " + defectsDataSummary.Table[0]["AVG_IN_QA_CASE"]);
            insertCardChart1Dataset("defects_status", products, closedNoQA, "defects", "closedNoQA", "Total: " + defectsDataSummary.Table[0]["CLOSED_NO_QA"]);
            insertCardChart1Dataset("defects_status", products, resolvedNotClosed, "defects", "resolvedNotClosed", "Total: " + defectsDataSummary.Table[0]["RESOLVED_NOT_CLOSED"]);

            insertCardChart1Dataset("defects_status", products, totalDefects, "defects", "Total Defects", defectsDataSummary.Table[0]["Not_Resolved"]);

        } catch (ex) { }
    }



})(jQuery);