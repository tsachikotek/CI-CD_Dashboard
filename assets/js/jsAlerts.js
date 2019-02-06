function addAlert(title, message, severity, e) {
    $('#messagePanel').empty();
    //$('#' + title).empty();
    //$('#messagePanel').append('<div id="' + title + '"></div>');
    //$('#' + title).append(createAlertHtml('Status', message, severity));
    $('#messagePanel').append(createAlertHtml('Status', message, severity));
    e.preventDefault();
}

function createAlertHtml(title, message, severity) {
    var alert = '<div class="alert alert-' + severity + ' alert-dismissible fade show" role="alert"><span class="badge badge-pill badge-' + severity + '">' + title + '</span>    ' + message + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
    return alert;
}