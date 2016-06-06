/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




$(document).bind("deviceready", function () {

    var w_width = $(window).width();
    var w_height = $(window).height();

    var user = "oxfam";
    var pass = "oxfam123";

    $("#not-logged").width(w_width).height(w_height);
    checkLog();
    $("#log-click").on('touchend', function () {
        var user_field = $("#user").val();
        var pass_field = $("#pass").val();

        if ((user_field === user) && (pass_field === pass))
        {
            window.localStorage.setItem("logged", "yes");
            checkLog();
        } else {
            alert("Invalid Username or Password");
            window.localStorage.setItem("logged", "no");
            checkLog();
        }

    });

    $("#log-out").on('touchend', function () {
        window.localStorage.setItem("logged", "no");
        checkLog();
        location.reload();
    });

});
function checkLog()
{
    var flag = localStorage.getItem("logged");
    if (flag === "no")
    {
        $("#logged").hide();
    } else if (flag === "yes")
    {
        $("#not-logged").hide();
        $("#logged").show();
    }
}


