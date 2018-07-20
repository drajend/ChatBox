var currentUser = "dinesh";

$(document).ready(function () {
    $.connection.hub.start().done(function () {
        $('#txtDiv').html("Connected");
    });
});


//Button click
//$.connection.chatHub.server.sendMessage(message);

$("#btnSend").click(function () {
    var message = currentUser + " : " + $('#txtMesg').val();
    $.connection.chatHub.server.sendMessage(message);
});

$.connection.chatHub.client.announce = function (data) {
    $('#txtDiv').append("<br>" + data);
}