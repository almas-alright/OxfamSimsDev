

$(document).ready(function () {
        populateBeneficiaryList();
    $('#save').on('click', function () {
        var db = window.openDatabase("oxfam_sims_dev", "1.0", "OxfamSIMS", 1000000);
        db.transaction(function (tx) {
           tx.executeSql('INSERT INTO beneficiary_info (select_id, response_by, benificiary_name, benificiary_img, fathers_name, mothers_name, union_name, word, address, grnder, age, mobile, nominee_name, relation, nominee_img, marital_sts, occupation, occupation_1, occupation_2, location_gps) VALUES ("1234", "response by people", "benificiary had name", "img/img/img/benf.jpg", "father", "mother", "union intersect", "word no 152", "no address", "female", "16 yrs", "01678591535", "nominee has name", "boy friend", "img/img/img/nominee.jpg", "unmaried", "hair dresser", "begger", "sex worker", "23.737785, 90.395173")');
        }, errorCB, successCB);
    });
});


function getLocationPos() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}
// onSuccess Geolocation  
function onSuccess(position) {
    document.getElementById('lat').value = position.coords.latitude;
    document.getElementById('lon').value = position.coords.longitude;
}
function onError(error) {
    alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
}

function errorCB(tx, err) {
    alert("Error processing SQL: " + err);
}

// Transaction success callback
//
function successCB() {
    alert("success!");
}


function benificiaryList(tx, results) {
    var benf_single = '';
    var len = results.rows.length;
    for (var i = 0; i < len; i++) {
        benf_single += '<li><img class="text-center" src="'+results.rows.item(i).benificiary_img+'" alt=""> <span>Name: '+results.rows.item(i).benificiary_name +'</span></li>';
    }   
    $('#beneficiary-list').html(benf_single);
}
function populateBeneficiaryList() {
    var db = window.openDatabase("oxfam_sims_dev", "1.0", "OxfamSIMS", 1000000);
        db.transaction(function(tx) {
            tx.executeSql('SELECT * FROM beneficiary_info ORDER BY b_id DESC', [], benificiaryList, errorCB);
        }, errorCB, successCB);
    	
}