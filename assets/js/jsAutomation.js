//http://10.50.227.34/DevOpsAPI/API/Tests/GetTestAutomationStatusByPriorityAll

function GetTestAutomationStatusByPriorityAll() {
    var defects = '';
    $.ajax({
        url: '//10.50.227.34/DevOpsAPI/API/Tests/GetTestAutomationStatusByPriorityAll', // + "?FolderName=.Regression&ParentFolderName=15.1%20FP1", //GetRAFDefects', 
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

function JsonDictToTableHtml(jsonData) {
    var dic;
    var table = [];

    try {
        dic = eval(jsonData);
    }
    catch (err) {
        dic = jsonData;
    }

//    //var column = ['Column0'];
    var elementsNames = Object.keys(dic);
    var rows = [];
    var rowId = 0;
    $(Object.values(dic)).each(function (index, element) {
        var row = {};
        
        //row[rowId] = {};
        row["id"] = rowId + 1;
        row["Name"] = elementsNames[rowId];
        
        //row[rowId] = element; 
        rows.push(Object.assign(row, element));
        rowId++;
//        for (var elementId = 0; elementId < Object.keys(element).length; elementId) {
//            var key = Object.values(element)[elementId];
//            var value = element[Object.keys(element)[elementId]];
//            row[rowId][key] = value
//        }
        
        //rows.push(row);

    });
    return rows;
}
        
 
function JsonToTableHtml(jsonData) {
    var tbl = '';
    try {

        var folder;
        try {
            productsAutomation = eval(jsonData);
        }
        catch (err) {
            productsAutomation = jsonData;
        }       

        //tbl += '<div class="content mt-3">' + 
        //            '<div class="animated fadeIn">' +
        //                '<div class="row">' +
        //                    '<div class="col-md-12">' +
        //                        '<div class="card">' +
        //                            '<div class="card-header"><strong class="card-title">Automation by Priority</strong></div>' +
        //                            '<div class="card-body">' +
        //                                '<table id="bootstrap-data-table" class="table table-striped table-bordered">' +
        //                                    '<thead>' +
        //                                        '<tr role="row">' +
        //                                            '<th class="sorting_asc" tabindex="0" aria-controls="bootstrap-data-table" rowspan="1" colspan="1" aria-label="Product: activate to sort column descending" aria-sort="ascending" style="width: 336px;">Product</th>' +
        //                                            '<th class="sorting" tabindex="0" aria-controls="bootstrap-data-table" rowspan="1" colspan="1" aria-label="Automated: activate to sort column ascending" style="width: 204px;">Automated</th>' +
        //                                            '<th class="sorting" tabindex="0" aria-controls="bootstrap-data-table" rowspan="1" colspan="1" aria-label="Priority 0: activate to sort column ascending" style="width: 204px;">Priority 0</th>' +
        //                                            '<th class="sorting" tabindex="0" aria-controls="bootstrap-data-table" rowspan="1" colspan="1" aria-label="Office: activate to sort column ascending" style="width: 204px;">Priority 1</th>' +
        //                                            '<th class="sorting" tabindex="0" aria-controls="bootstrap-data-table" rowspan="1" colspan="1" aria-label="Salary: activate to sort column ascending" style="width: 204px;">Priority 2</th>' +
        //                                            '<th class="sorting" tabindex="0" aria-controls="bootstrap-data-table" rowspan="1" colspan="1" aria-label="Salary: activate to sort column ascending" style="width: 204px;">Priority 3</th>' +
        //                                            '<th class="sorting" tabindex="0" aria-controls="bootstrap-data-table" rowspan="1" colspan="1" aria-label="Salary: activate to sort column ascending" style="width: 204px;">No Priority</th>' +
        //                                            '<th class="sorting" tabindex="0" aria-controls="bootstrap-data-table" rowspan="1" colspan="1" aria-label="Salary: activate to sort column ascending" style="width: 204px;">Total</th>' +
        //                                        '</tr>' +
        //                                    '</thead>' +
        //                                    '<tbody>';

        var rowId = 0;

        $(productsAutomation).each(function (index, element) {

            //Obsolete
            var columns = '';
            var cells = '';

            var numberOfKeysInRow = Object.keys(element).length;

            if (rowId == 0) { //need to create TableHeader columns
                for (var cellId = 0; cellId < numberOfKeysInRow; cellId++) {                    
                    columns += '<th class="sorting_asc" tabindex="0" aria-controls="bootstrap-data-table" rowspan="1" colspan="1" aria-label="Product: activate to sort column descending" aria-sort="ascending">' + Object.keys(element)[cellId] + '</th>';
                }

                tbl += '<div class="content mt-3">' +
                    '<div class="animated fadeIn">' +
                    '<div class="row">' +
                    '<div class="col-md-12">' +
                    '<div class="card">' +
                    '<div class="card-header"><strong class="card-title">Automation by Priority</strong></div>' +
                    '<div class="card-body">' +
                    '<table id="bootstrap-data-table" class="table table-striped table-bordered">' +
                    '<thead>' +
                    '<tr role="row">' +
                    columns +
                    '</tr>' +
                    '</thead>' +
                    '<tbody>';
            }

            

            for (var cellId = 0; cellId < numberOfKeysInRow; cellId++) {
                var val = element[Object.keys(element)[cellId]];
                cells += '<td class="sorting_1">' + val + '</td>';
            }           

                tbl += '<tr role="row">' + cells + '</tr>';
            

            //var product = element['Product'];
            //var total = element['TOTAL'];
            //var AutomatedStatus = element['Automated'];
            //var p0 = element['Priority0'];
            //var p1 = element['Priority1'];
            //var p2 = element['Priority2'];
            //var p3 = element['Priority3'];
            //var noPriority = element['NoPriority'];
            //var path = element['QC_PATH'];
         
            //if (AutomatedStatus != 'Obsolete') {

            //    tbl += '<tr role="row">' +
            //                    '<td class="sorting_1">' + product + '</td>' +
            //                    '<td class="sorting_1">' + AutomatedStatus + '</td>' +
            //                    '<td class="sorting_1">' + p0 + '</td>' +
            //                    '<td class="sorting_1">' + p1 + '</td>' +
            //                    '<td class="sorting_1">' + p2 + '</td>' +
            //                    '<td class="sorting_1">' + p3 + '</td>' +
            //                    '<td class="sorting_1">' + noPriority + '</td>' +
            //                    '<td class="sorting_1">' + total + '</td>' +
            //            '</tr>';
            //}
            rowId++;

        });
    


        tbl +=                             '</tbody>' +
                                        '</table>' +                 
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
            '</div>';

        

    } catch (e) {
        alert(e);
    }

    return tbl;
}