
function errorCB(tx, err) {
    alert("Error processing SQL: " + err);
}

// Transaction success callback
//
function successCB() {
    alert("success!");
}


    
    $('#save').on('click', function () {
        var select_id = get_input_value_of("#select_id"); 
        var response_by = get_input_value_of("#response_by"); 
        var benificiary_name = get_input_value_of("#beneficiary_name");
        var benificiary_img = $("#benificiaryPhoto").attr("src");
        var fathers_name = get_input_value_of("#fathers_name");
        var mothers_name = get_input_value_of("#mothers_name");
        var union_name = get_input_value_of("#union_name");
        var word_name = get_input_value_of("#word_name");
        var address = get_input_value_of("#address");
        var gender = get_input_value_of("#gender");
        var age = get_input_value_of("#age");
        var mobile_no = get_input_value_of("#mobile_no");
        var nominee_name = get_input_value_of("#nominee_name");
        var relation_with_nom = get_input_value_of("#relation_with_nom");
        var nominee_img = $("#nominee_img").attr("src");
        var marital_status = $("input:radio[name=married]").val();
        var occupation_main = get_input_value_of("#occupation_main");
        var occupation_2 = get_input_value_of("#occupation_2");
        var occupation_3 = get_input_value_of("#occupation_3");
        var location_gps = get_input_value_of("#lat")+","+get_input_value_of("#lon");

        //word, address, grnder, age, mobile, nominee_name, relation, nominee_img, marital_sts, occupation, occupation_1, occupation_2, location_gps
        var db = window.openDatabase("oxfam_sims_dev", "1.0", "OxfamSIMS", 1000000);
        db.transaction(function (tx) {
            tx.executeSql('INSERT INTO beneficiary_info (select_id, response_by, benificiary_name, benificiary_img, fathers_name, mothers_name, union_name, word, address, grnder, age, mobile, nominee_name, relation, nominee_img, marital_sts, occupation, occupation_1, occupation_2, location_gps) VALUES ("'+select_id+'", "'+response_by+'", "'+benificiary_name+'", "'+benificiary_img+'", "'+fathers_name+'", "'+mothers_name+'", "'+union_name+'", "'+union_name+'", "'+address+'", "'+gender+'", "'+age+'", "'+mobile_no+'", "'+nominee_name+'", "'+relation_with_nom+'", "'+nominee_img+'", "'+marital_status+'", "'+occupation_main+'", "'+occupation_2+'", "'+occupation_3+'", "'+location_gps+'")');
        }, errorCB, successCB);
    });


function get_input_value_of(inputID)
{
    return $(inputID).val();
}

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