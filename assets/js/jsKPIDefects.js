
//function to call the API with the query from the QC
function GetClosedVsOpenedDefects(targetId, title, subtitle, status, dataAll) {
    var result = '';
    var that = $(this);
    $.ajax({
        //url: '//nexus-server/NexusAPI/api/QC/GetStatisticForAllKBsByProduct?status=' + status, 
        //'//nexus-server/NexusAPI/api/QC/GetStatisticForAllFixesByProduct?version='+version+'&status='+status,
        url: '//localhost:65126/api/QC/GetClosedVSOpenDefects',
        type: 'GET',
        context: that,
        cache: false,
        success: function (dataByProduct) {
            insertChart_AllKBS(targetId, title, subtitle, dataAll, dataByProduct);
            result = dataByProduct;
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.responseText);
        }
    });

    return result;
}