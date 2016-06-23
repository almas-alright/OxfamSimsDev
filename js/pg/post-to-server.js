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

$(document).bind("deviceready", function () {
    populateBeneficiaryList();
    var data = {
        project_id: 1,
        office_id: 2,
        beneficiary_id: "BEN1223",
        group: "Group",
        name: "Shibly",
        father: "Rahim Father",
        mother: "Rahim Mother",
        union: 3,
        ward: "Poba",
        address: "Dhaka Bangladesh",
        mobile_no: "01613404299",
        voter_id: "N82348723642367434",
        nominee_name: "Nur Uddin",
        nominee_relation: "Brother",
        nominee_father: "Sariful Nominee Father",
        nominee_mother: "Sariful Nominee Mother",
        nominee_photo: "beneficiaries\/28498_nid-front.jpg",
        lat: "24.094738167379017",
        lng: "90.0023603439331",
        national_id_image: "beneficiaries\/85814_nid-front.jpg",
        national_id_image_back: "beneficiaries\/77953_nid-back.png",
        beneficiary_photo: "beneficiaries\/22462_rahima.jpg",
        updated_at: "",
        created_at: "",
        id: 10
    };


    $.ajax({
        method: "POST",
        url: "http://dev.testversions.com/oxfam/json-export.php",
        data: data
    }).done(function (msg) {
//    alert( "Data Saved: " + msg );
        $("#result").html(msg);
    });

    $('.list-group-item').on('touchend', function () {        
        alert($(this).attr('data-bid'));
    });

});


