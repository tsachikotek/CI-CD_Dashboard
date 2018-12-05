function GetRestByMethod(componentName, methodName, reqData) {
    try {
        ////nexus-server/nexusapi/api/Tests/GetTestsAutoExecStatus?FolderName=.Regression&ParentFolderName=15.1%20FP1
        //var params = scriptParametersStr = '{"FolderName": ' + FolderName + ', "ParentFolderName": ' + ParentFolderName + '}';
        FolderName = null;
        ParentFolderName = null;
        FolderComment = null;
        var defectArray = '';

        var reqUrl = '//10.50.227.34/DevOpsAPI/api/' + componentName + '/' + methodName;
        //if (typeof (reqData) != 'undefined') { reqUrl = reqUrl + "?" + reqData; }

        $.ajax({
            url: reqUrl, //'//10.50.227.34/DevOpsAPI/api/' + componentName + '/' + methodName, // + "?FolderName=.Regression&ParentFolderName=15.1%20FP1", //GetRAFDefects', 
            //url: '//localhost:62156/api/Tests/' + GetMethodName,
            useDefaultXhrHeader: false,
            crossDomain: true,
            async: false,
            data: reqData,
            dataType: 'text',
            method: 'GET',
            success: function (data) {
                data = data.replace('\"', '"');
                data = data.replace('\r\n', '');
                defectArray = JSON.parse(data);
            },
            error: function (data, textStatus, jqXHR) {
                defectArray = textStatus + " => " + data.statusText; //+ " => " + r.message + " => " + r.StackTrace;
                return defectArray;
            }
        })
    }
    catch (err) {
        console.error(err);
        return err;
    }

    return defectArray;
}
