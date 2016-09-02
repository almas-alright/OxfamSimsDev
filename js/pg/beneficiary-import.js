/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {

    populateBeneficiaryList();

    var tv = "http://dev.testversions.com/devels/oxfam/sims/public/site/requestSingleBenInfo";
    $.getJSON(tv, function (data) {
        var select_id = data.beneficiary_id;
        var project_id = data.project_id;
        var office_id = data.office_id;
        var group = data.group;
        var benificiary_name = data.name;
        var benificiary_img = "";
        var voter_id = data.voter_id;
        var nid_front_img = ""; //img
        var nid_back_img = ""; //img
        var fathers_name = data.father;
        var mothers_name = data.mother;
        var union_name = data.union;
        var word_name = data.ward;
        var address = data.address;
        var gender = "n/a";
        var age = "n/a";
        var mobile_no = data.mobile_no;
        var nominee_name = data.nominee_name;
        var nominee_father = data.nominee_father;
        var nominee_mother = data.nominee_mother;
        var relation_with_nom = data.nominee_relation;
        var nominee_img = ""; //img
        var marital_status = "n/a";
        var occupation_main = "n/a";
        var occupation_2 = "n/a";
        var occupation_3 = "n/a";
        var location_gps = "n/a";
        
        var db = window.openDatabase("oxfam_sims_dev", "1.0", "OxfamSIMS", 1000000);
        db.transaction(function (tx) {
            tx.executeSql('INSERT INTO beneficiary_info (select_id,project_id,office_id,group_name,benificiary_name,benificiary_img,voter_id,nid_img_front,nid_img_back,fathers_name, mothers_name,union_name,word,address,grnder,age,mobile,nominee_name,nominee_father,nominee_mother,relation,nominee_img,marital_sts,occupation,occupation_1,occupation_2,location_gps,status) VALUES ("' + select_id + '","' + project_id + '","' + office_id + '", "' + group + '", "' + benificiary_name + '", "' + benificiary_img + '", "' + voter_id + '","' + nid_front_img + '","' + nid_back_img + '", "' + fathers_name + '", "' + mothers_name + '", "' + union_name + '", "' + word_name + '", "' + address + '", "' + gender + '", "' + age + '", "' + mobile_no + '", "' + nominee_name + '", "' + nominee_father + '", "' + nominee_mother + '", "' + relation_with_nom + '", "' + nominee_img + '", "' + marital_status + '", "' + occupation_main + '", "' + occupation_2 + '", "' + occupation_3 + '", "' + location_gps + '", "0")');
        }, errorCB, successCB);
        
    }).done(function (data) {
        if (data.beneficiary_id != "" && data.beneficiary_id != "undefined")
        {
            location.reload();
        } else
        {
            alert("field value missing..");
        }
    });


});

function errorCB(tx, err) {

}

function successCB() {

}

function benificiaryList(tx, results) {
    var benf_single = '';
    var len = results.rows.length;
    for (var i = 0; i < len; i++) {
        benf_single += '<li class="list-group-item"> B.ID' + results.rows.item(i).select_id +
                '<a href="#" data-bid="' + results.rows.item(i).b_id + '"><span class="ben-name">Name: ' + results.rows.item(i).benificiary_name + '</span>' +
                '</a>' +
                '</li>';
    }
    $('#beneficiary-list').html(benf_single);
}

function populateBeneficiaryList() {
    var db = window.openDatabase("oxfam_sims_dev", "1.0", "OxfamSIMS", 1000000);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM beneficiary_info ORDER BY b_id DESC', [], benificiaryList, errorCB);
    }, errorCB, successCB);

}


// "id":280,
//   "project_id":1,
//   "office_id":1,
//   "beneficiary_id":"1273",
//   "group":"1",
//   "name":"Morjina",
//   "bng_name":"??????",
//   "father":"Ismail",
//   "bng_father":"??????",
//   "mother":"Moiful",
//   "bng_mother":"?????",
//   "union":"Fulchuri",
//   "bng_union":"??????",
//   "ward":"7",
//   "bng_ward":"?",
//   "address":"Purbo gabgachi",
//   "bng_address":"???? ???????",
//   "mobile_no":"",
//   "voter_id":"",
//   "bng_voter_id":"",
//   "bng_nominee_voter_id":"",
//   "nominee_voter_id":"",
//   "national_id_image":null,
//   "national_id_image_back":null,
//   "nominee_name":"",
//   "bng_nominee_name":"",
//   "nominee_relation":"",
//   "bng_nominee_relation":"",
//   "nominee_father":"",
//   "bng_nominee_father":"",
//   "nominee_mother":"",
//   "bng_nominee_mother":"",
//   "nominee_photo":null,
//   "beneficiary_photo":null,
//   "lat":0,
//   "lng":0,
//   "created_at":"2016-08-25 08:42:11",
//   "updated_at":"2016-08-26 10:20:23",
//   "export_status":1