function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
var currentUser = getUrlParameter('user');
var count = 0;
$.connection.hub.start().done(function () {
    $.connection.chatHub.server.connect(currentUser);
});



//$("#btnSend").click(function () {
//    currentUser = $("#txtUser").val();
//    var message = currentUser + " : " + $('#mytext').val();
//    $("#mytext").val("");
//    $.connection.chatHub.server.sendMessage(message);
//});

$.connection.chatHub.client.announce = function (data) {
    count++;
    //var message = "";
    //if (count == 1)
    //    message = data;
    //else
    //    message = data;
    if (count != 1) {
        console.log(data);
        var _Message = JSON.parse(data);
        if (_Message.From != currentUser)
            insertChat("me", _Message.Message);
        else
            insertChat("you", _Message.Message);
    } else {        
        insertChat("me", data);
    }
    //$('#msgDiv').append(message);
}

var oResponce;

var From = "";
var To = "DEEPU";

var me = {};
me.avatar = "https://lh6.googleusercontent.com/-lr2nyjhhjXw/AAAAAAAAAAI/AAAAAAAARmE/MdtfUmC0M4s/photo.jpg?sz=48";

var you = {};
you.avatar = "https://a11.t26.net/taringa/avatares/9/1/2/F/7/8/Demon_King1/48x48_5C5.jpg";

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

//-- No use time. It is a javaScript effect.
function insertChat(who, text, time) {
    if (time === undefined) {
        time = 0;
    }
    var control = "";
    var date = formatAMPM(new Date());

    if (who == "me") {

        control = '<li style="width:100%">' +
            '<div class="msj macro">' +
            '<div class="avatar"><img class="img-circle" style="width:100%;" src="' + me.avatar + '" /></div>' +
            '<div class="text text-l">' +
            '<p>' + text + '</p>' +
            '<p><small>' + date + '</small></p>' +
            '</div>' +
            '</div>' +
            '</li>';
    } else {
        control = '<li style="width:100%;">' +
            '<div class="msj-rta macro">' +
            '<div class="text text-r">' +
            '<p>' + text + '</p>' +
            '<p><small>' + date + '</small></p>' +
            '</div>' +
            '<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:100%;" src="' + you.avatar + '" /></div>' +
            '</li>';
    }
    setTimeout(
        function () {
            $("ul").append(control);

        }, time);

}

function resetChat() {
    $("ul").empty();
}

$(".mytext").keyup(function (e) {
    if (e.which == 13) {
        var text = $(this).val();
        if (text !== "") {
            From = currentUser;
            var objMsg = { "Message": text, "From": From, "To": To };
            $.connection.chatHub.server.sendMessage(JSON.stringify(objMsg));
            //insertChat("me", text);
            $(this).val('');
        }
    }
});


resetChat();


//insertChat("me", "Hello Guys...", 0);
