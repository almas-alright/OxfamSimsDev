
function errorCB(tx, err) {
    alert("Error processing SQL: " + err);
}

// Transaction success callback
//
function successCB() {
    alert("success!");
}

function get_input_value_of(inputID)
{
    return $(inputID).val();
}

function getLocationPos() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}
// onSuccess Geolocation  
function onSuccess(position) {
    $("#lat").val(position.coords.latitude);
    $("#lon").val(position.coords.longitude);
    alert("location added..\n"+position.coords.latitude+","+position.coords.latitude);
}
function onError(error) {
    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}


$(document).bind("deviceready", function () {

    $('#save').on('click', function () {
        var select_id = get_input_value_of("#select_id");
        var project_id = get_input_value_of("#select_id");
        var office_id = get_input_value_of("#select_id");
        var group = get_input_value_of("#response_by");
        var benificiary_name = get_input_value_of("#beneficiary_name");
        var benificiary_img = $("#benificiaryPhoto").attr("src");
        var voter_id = get_input_value_of("#nid_num");
        var nid_front_img = $("#benificiaryPhoto").attr("src");
        var nid_back_img = $("#benificiaryPhoto").attr("src");
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
        var location_gps = get_input_value_of("#lat") + "," + get_input_value_of("#lon");

        //word, address, grnder, age, mobile, nominee_name, relation, nominee_img, marital_sts, occupation, occupation_1, occupation_2, location_gps
        var db = window.openDatabase("oxfam_sims_dev", "1.0", "OxfamSIMS", 1000000);
        db.transaction(function (tx) {
            tx.executeSql('INSERT INTO beneficiary_info (select_id,project_id,office_id,group_name,benificiary_name,benificiary_img,voter_id,nid_img_front,nid_img_back,fathers_name, mothers_name,union_name,word,address,grnder,age,mobile,nominee_name,relation,nominee_img,marital_sts,occupation,occupation_1,occupation_2,location_gps,status) VALUES ("' + select_id + '","' + project_id + '","' + office_id + '", "' + group + '", "' + benificiary_name + '", "' + benificiary_img + '", "' + voter_id + '","' + nid_front_img + '","' + nid_back_img + '", "' + fathers_name + '", "' + mothers_name + '", "' + union_name + '", "' + word_name + '", "' + address + '", "' + gender + '", "' + age + '", "' + mobile_no + '", "' + nominee_name + '", "' + relation_with_nom + '", "' + nominee_img + '", "' + marital_status + '", "' + occupation_main + '", "' + occupation_2 + '", "' + occupation_3 + '", "' + location_gps + '", "0")');
        }, errorCB, successCB);
    });

    $('#gps_pos_co').on('click', function () {        
        getLocationPos();        
    });



});