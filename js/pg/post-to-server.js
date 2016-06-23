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

function benificiaryList(tx, results) {
    var benf_single = '';
    var len = results.rows.length;
    for (var i = 0; i < len; i++) {
        benf_single += '<li class="list-group-item" data-bid="' + results.rows.item(i).b_id + '">' + results.rows.item(i).b_id + '<img class="text-center list-img" src="' + results.rows.item(i).benificiary_img + '" alt=""> <span class="ben-name">Name: ' + results.rows.item(i).benificiary_name + '</span><span class="ben-name">N-Id: ' + results.rows.item(i).voter_id + '</span></li>';
    }
    $('#beneficiary-list').html(benf_single);
}

function populateBeneficiaryList() {
    var db = window.openDatabase("oxfam_sims_dev", "1.0", "OxfamSIMS", 1000000);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM beneficiary_info ORDER BY b_id DESC', [], benificiaryList, errorCB);
    }, errorCB, successCB);
}

// list end






function exportAll(tx, results) {
    var benf_single = '';
    var len = results.rows.length;
    for (var i = 0; i < len; i++) {
        $.ajax({
            method: "POST",
            url: "http://dev.testversions.com/oxfam/json-export.php",
            data: {
                project_id: results.rows.item(i).project_id,
                office_id: results.rows.item(i).office_id,
                beneficiary_id: results.rows.item(i).b_id,
                group: results.rows.item(i).group_name,
                name: results.rows.item(i).benificiary_name,
                father: results.rows.item(i).fathers_name,
                mother: results.rows.item(i).mothers_name,
                union: results.rows.item(i).union_name,
                ward: results.rows.item(i).word,
                address: results.rows.item(i).address,
                mobile_no: results.rows.item(i).mobile,
                voter_id: results.rows.item(i).voter_id,
                nominee_name: results.rows.item(i).nominee_name,
                nominee_relation: results.rows.item(i).relation,
                nominee_father: "Sariful Nominee Father",
                nominee_mother: "Sariful Nominee Mother",
                nominee_photo: results.rows.item(i).nominee_img,
                lat: results.rows.item(i).location_gps,
                lng: results.rows.item(i).location_gps,
                national_id_image: "beneficiaries\/85814_nid-front.jpg",
                national_id_image_back: "beneficiaries\/77953_nid-back.png",
                beneficiary_photo: "beneficiaries\/22462_rahima.jpg",
                updated_at: "",
                created_at: "",
                id: ""
            }
        }).done(function (msg) {

            $("#result3").append(results.rows.item(i).b_id + '||');
            $("#result").html(msg);
        });
    }
}

function retriveAndPost() {
    var db = window.openDatabase("oxfam_sims_dev", "1.0", "OxfamSIMS", 1000000);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM beneficiary_info ORDER BY b_id DESC', [], exportAll, errorCB);
    }, errorCB, successCB);

}

$(document).bind("deviceready", function () {
    populateBeneficiaryList();

    $("#btn-csv").click(function () {
        retriveAndPost();
    });
    
    $("#btn-siz").on('touchend',function () {
       alert($('li.list-group-item').length);
    });
    
    $('li.list-group-item').click(function () {
        alert($(this).attr('data-bid'));
    });

});


