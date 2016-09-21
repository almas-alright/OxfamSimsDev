/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function errorCB(tx, err) {
    alert("Error processing SQL: " + err);
}

function successCB() {
    alert("success!");
}

function intervention_list(tx, results) {
    var benf_single = '';
    var len = results.rows.length;
    for (var i = 0; i < len; i++) {
//        benf_single += '<li class="list-group-item" data-bid="' + results.rows.item(i).b_id + '">' + results.rows.item(i).b_id + '<img class="text-center list-img" src="' + results.rows.item(i).benificiary_img + '" alt=""> <span class="ben-name">Name: ' + results.rows.item(i).benificiary_name + '</span><span class="ben-name">N-Id: ' + results.rows.item(i).voter_id + '</span>'+showStatus(results.rows.item(i).status)+'</li>';
        benf_single += '<li class="list-group-item" data-bid="' + results.rows.item(i).intervention_id + '">' + results.rows.item(i).intervention_id + '<span class="ben-name">Name: ' + results.rows.item(i).intervention_name + '</span><span class="ben-name">N-Id: ' + results.rows.item(i).word + '</span>' + showStatus(results.rows.item(i).status) + '</li>';
    }
    $('#beneficiary-list').html(benf_single);
}

function showStatus(flag)
{
    if (flag == "0")
    {
        return '<hr><strong class="red" style="color:#EE2D24">Not Done</strong>';
    } else
    {
        return '<hr><strong class="green" style="color:#63D414">Done</strong>';
    }
}

function populate_intervention_list() {
    var db = window.openDatabase("oxfam_sims_dev", "1.0", "OxfamSIMS", 1000000);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM intervention_list', [], intervention_list, errorCB);
    }, errorCB, successCB);
}

// list end



$(document).bind("deviceready", function () {
    populate_intervention_list();
    retriveSingle();
    $("#btn-csv").click(function () {
//        retriveAndPost();
        alert("Wait");
    });
    $("#btn-siz").on('touchend', function () {
        alert($('li.list-group-item').length);
    });
    $('li.list-group-item').click(function () {
        alert($(this).attr('data-bid'));
    });
    
});
function retriveSingle() {
    var db = window.openDatabase("oxfam_sims_dev", "1.0", "OxfamSIMS", 1000000);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM intervention_list WHERE status=0 LIMIT 1', [], seeSingle, alertDownQ);
    }, alertDownQ, alertDownUpdate);
}

function seeSingle(tx, results) {
    var len = results.rows.length;
//    for (var i = 0; i < len; i++) {
//        $("#json").html(results.rows.item(i).b_id + "  " + results.rows.item(i).benificiary_name + "   " + results.rows.item(i).mothers_name);
    uploadPhoto(results.rows.item(0).intervention_photo, results.rows.item(0).intervention_txt_id, "intervention");
    $.ajax({
        method: "POST",
        url: "http://192.168.0.50/SIMS/public/site/requestInterventionInfo",
        data: {
            intervention_type_id: results.rows.item(0).intervention_type,
            intervention_id: results.rows.item(0).intervention_txt_id,
            project_id: results.rows.item(0).project_id,
            office_id: results.rows.item(0).office_id,
            intervention_name: results.rows.item(0).intervention_name,
            ward: results.rows.item(0).word,
            upazilla: results.rows.item(0).upazilla,
            address: results.rows.item(0).address,
            description: results.rows.item(0).descriptoin,
            intervention_photo: results.rows.item(0).intervention_txt_id+"_intervention.jpg",
            lat: results.rows.item(0).location_gps,
            lng: results.rows.item(0).location_gps
        }
    }).done(function (msg) {
        sendUpdate(results.rows.item(0).intervention_id);
        $("#result3").append(results.rows.item(0).intervention_id + " updated");
        $("#result").html(msg);
        window.location.reload();
    });
//    }

}

function alertDownQ()
{
    alert("Export Query Fail");
}

function alertDownUpdate()
{
//alert("Update Query Fail");

    var total = parseInt($(".list-group-item").length);
    var red = parseInt($(".red").length);
    var green = parseInt($(".green").length);
    $("#result3").html("left:" + red + "   uploaded :" + green + "  total:" + total);
    var percentageUp = (green / total) * 100;
    $("#pb").width(parseInt(percentageUp) + "%");
    $("#ttp").html("Uploading... " + parseInt(percentageUp) + "% Complete")
}

function sendUpdate(intervention_id) {
    var db = window.openDatabase("oxfam_sims_dev", "1.0", "OxfamSIMS", 1000000);
    db.transaction(
            function (tx) {
                console.log(intervention_id);
                tx.executeSql('UPDATE intervention_list SET status=1 WHERE intervention_id=' + intervention_id);
            }, alertDownUpdate, function () {
        alert('status updated' + intervention_id);
    });
}


//uploadonly--------------------------------------------------------------------------------

function uploadPhoto(imageURI, bid, imgtype) {
    var preValF = localStorage.getItem("file-url");
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    var headers = {'headerParam': 'headerValue'};
    options.headers = headers;
    var params = new Object();
    params.value1 = bid;
    params.value2 = imgtype;
    options.params = params;
    options.chunkedMode = false;
    var ft = new FileTransfer();
    ft.upload(imageURI, preValF, win, fail, options);
}

function win(r) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
//    alert(r.response);
}

function fail(error) {
    alert("An error has occurred: Code = " + error.code);
}
