/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function errorCB(tx, err) {
    alert("Error processing SQL: " + err);
}

function successCB() {
//    alert("success!");
}

function benificiaryList(tx, results) {
    var benf_single = '';
    var len = results.rows.length;
    for (var i = 0; i < len; i++) {
//        benf_single += '<li class="list-group-item" data-bid="' + results.rows.item(i).b_id + '">' + results.rows.item(i).b_id + '<img class="text-center list-img" src="' + results.rows.item(i).benificiary_img + '" alt=""> <span class="ben-name">Name: ' + results.rows.item(i).benificiary_name + '</span><span class="ben-name">N-Id: ' + results.rows.item(i).voter_id + '</span>'+showStatus(results.rows.item(i).status)+'</li>';
        benf_single += '<li class="list-group-item" data-bid="' + results.rows.item(i).b_id + '">' + results.rows.item(i).b_id + '<span class="ben-name">Name: ' + results.rows.item(i).benificiary_name + '</span><span class="ben-name">N-Id: ' + results.rows.item(i).voter_id + '</span>' + showStatus(results.rows.item(i).status) + '</li>';
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

function populateBeneficiaryList() {
    var db = window.openDatabase("oxfam_sims_dev", "1.0", "OxfamSIMS", 1000000);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM beneficiary_info ORDER BY b_id DESC', [], benificiaryList, errorCB);
    }, errorCB, successCB);
}

// list end



$(document).bind("deviceready", function () {
    populateBeneficiaryList();

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
    var serverUrl = localStorage.getItem("server-url")
    if (serverUrl != null) {
        retriveSingle();
    } else
    {
        $('#myModal').modal({ show:true });
    }


});


function retriveSingle() {
    var db = window.openDatabase("oxfam_sims_dev", "1.0", "OxfamSIMS", 1000000);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM beneficiary_info WHERE status=0 LIMIT 1', [], seeSingle, alertDownQ);
    }, alertDownQ, alertDownUpdate);
}

function seeSingle(tx, results) {
    
    var serverUrl = localStorage.getItem("server-url")
    var url = 'dev.testversions.com';
    
    if(serverUrl != null)
    {
        url = serverUrl;
    }
    
    var len = results.rows.length;
//    for (var i = 0; i < len; i++) {
//        $("#json").html(results.rows.item(i).b_id + "  " + results.rows.item(i).benificiary_name + "   " + results.rows.item(i).mothers_name);
    uploadPhoto(results.rows.item(0).benificiary_img, results.rows.item(0).select_id, "own");
    uploadPhoto(results.rows.item(0).nid_img_back, results.rows.item(0).select_id, "nid_back");
    uploadPhoto(results.rows.item(0).nid_img_front, results.rows.item(0).select_id, "nid_front");
    uploadPhoto(results.rows.item(0).nominee_img, results.rows.item(0).select_id, "nominee");

    $.ajax({
        method: "POST",
        url: "http://"+url+"/devels/oxfam/sims/public/site/requestBenInfo",
        data: {
            project_id: results.rows.item(0).project_id,
            office_id: results.rows.item(0).office_id,
            beneficiary_id: results.rows.item(0).select_id,
            group: results.rows.item(0).group_name,
            name: results.rows.item(0).benificiary_name,
            father: results.rows.item(0).fathers_name,
            mother: results.rows.item(0).mothers_name,
            union: results.rows.item(0).union_name,
            ward: results.rows.item(0).word,
            address: results.rows.item(0).address,
            mobile_no: results.rows.item(0).mobile,
            voter_id: results.rows.item(0).voter_id,
            nominee_name: results.rows.item(0).nominee_name,
            nominee_relation: results.rows.item(0).relation,
            nominee_father: results.rows.item(0).nominee_father,
            nominee_mother: results.rows.item(0).nominee_mother,
            nominee_photo: results.rows.item(0).select_id + "_nominee.jpg",
            lat: results.rows.item(0).location_gps,
            lng: results.rows.item(0).location_gps,
            national_id_image: results.rows.item(0).select_id + "_nid_front.jpg",
            national_id_image_back: results.rows.item(0).select_id + "_nid_back.jpg",
            beneficiary_photo: results.rows.item(0).select_id + "_own.jpg",
            updated_at: "",
            created_at: "",
            id: ""
        }
    }).done(function (msg) {
        sendUpdate(results.rows.item(0).b_id);
        $("#result3").append(results.rows.item(0).b_id + " updated");
        $("#result").html(msg);
        window.location.reload();
    });
//    }

}

function alertDownQ()
{
//    alert("Export Query Fail");
}

function alertDownUpdate()
{
    //alert("Update Query Fail");

    var total = parseInt($(".list-group-item").length);
    var red = parseInt($(".red").length);
    var green = parseInt($(".green").length);
    $("#result3").html("left:" + red + "   uploaded :" + green + "  total:" + total);
    var percentageUp = (green / total) * 100;
    $("#pb").width(percentageUp + "%");
    $("#ttp").html("Uploading... " + percentageUp + "% Complete")
}

function sendUpdate(bnf_id) {
    var db = window.openDatabase("oxfam_sims_dev", "1.0", "OxfamSIMS", 1000000);
    db.transaction(
            function (tx) {
                console.log(bnf_id);
                tx.executeSql('UPDATE beneficiary_info SET status=1 WHERE b_id=' + bnf_id);
            }, alertDownUpdate, function () {
        alert('status updated' + bnf_id);
    });
}


//uploadonly--------------------------------------------------------------------------------

function uploadPhoto(imageURI, bid, imgtype) {
    var serverUrl = localStorage.getItem("server-url")
    var url = 'dev.testversions.com';
    
    if(serverUrl != null)
    {
        url = serverUrl;
    }
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
    ft.upload(imageURI, "http://"+url+"/devels/oxfam/img-upload/img_upload.php", win, fail, options);
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
