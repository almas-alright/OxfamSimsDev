

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
        benf_single += '<li class="list-group-item"><img class="text-center" src="' + results.rows.item(i).benificiary_img + '" alt=""> <span class="ben-name">Name: ' + results.rows.item(i).benificiary_name + '</span></li>';
    }
    $('#beneficiary-list').html(benf_single);
}

function populateBeneficiaryList() {
    var db = window.openDatabase("oxfam_sims_dev", "1.0", "OxfamSIMS", 1000000);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM beneficiary_info ORDER BY b_id DESC', [], benificiaryList, errorCB);
    }, errorCB, successCB);

}

//document.addEventListener("deviceready", populateBeneficiaryList, false);
//populateBeneficiaryList();


function dateTimeFileName() {
    var d = new Date();
    var str_d = d.getFullYear() + "_" + parseInt(d.getMonth() + 1) + "_" + d.getDate() + "_" + d.getHours() + "_" + d.getMinutes() + "_" + d.getSeconds();
    return str_d;
}

function linesForCsv(tx, results) {
    var data = results.rows;
    var csvContent = "data:text/csv;charset=utf-8,";
    data.forEach(function (infoArray, index) {

        var dataString = infoArray.join(",");
        csvContent += index < data.length ? dataString + "\n" : dataString;

    });

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", dateTimeFileName() + ".csv");

    link.click();

}

function populateCsvFile() {
    var db = window.openDatabase("oxfam_sims_dev", "1.0", "OxfamSIMS", 1000000);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM beneficiary_info ORDER BY b_id DESC', [], linesForCsv, errorCB);
    }, errorCB, successCB);
}

$(document).bind("deviceready",function () {

    $("#btn-csv").click(function () {
//        populateCsvFile();
        populateBeneficiaryList();
    });
});

