

function errorCB(tx, err) {
    alert("Error processing SQL: " + err);
}

// Transaction success callback
//
function successCB() {
//    alert("success!");
}


function benificiaryList(tx, results) {
    var benf_single = '';
    var len = results.rows.length;
    for (var i = 0; i < len; i++) {
        benf_single += '<li class="list-group-item">'+results.rows.item(i).b_id+'<img class="text-center list-img" src="' + results.rows.item(i).benificiary_img + '" alt=""> <a href="#" data-bid="'+results.rows.item(i).b_id+'"><span class="ben-name">Name: ' + results.rows.item(i).benificiary_name + '</span></a></li>';
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

function linesForCsv() {


}

function populateCsvFile() {
    var db = window.openDatabase("oxfam_sims_dev", "1.0", "OxfamSIMS", 1000000);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM beneficiary_info ORDER BY b_id DESC', [], linesForCsv, errorCB);
    }, errorCB, successCB);
}


//file generate

function gotFS(fileSystem) {
    fileSystem.root.getFile("hj.csv", {create: true, exclusive: false}, gotFileEntry, fail);
}

function gotFileEntry(fileEntry) {
    fileEntry.createWriter(gotFileWriter, fail);
}

function gotFileWriter(writer) {
    writer.onwriteend = function (evt) {
        console.log("contents of file now 'some sample text'");
        writer.truncate(11);
        writer.onwriteend = function (evt) {
            console.log("contents of file now 'some sample'");
            writer.seek(4);
            writer.write(" different text");
            writer.onwriteend = function (evt) {
                console.log("contents of file now 'some different text'");
            }
        };
    };
    writer.write("some sample text");
}

function fail(error) {
    alert(error.code);
}






//post to stestversion
function allBeneficiary(tx, results) {
    var benf_single = '';
    var len = results.rows.length;
    for (var i = 0; i < len; i++) {
// benf_single += '<li class="list-group-item"><img class="text-center" src="' + results.rows.item(i).benificiary_img + '" alt=""> <span class="ben-name">Name: ' + results.rows.item(i).benificiary_name + '</span></li>';
        $.post("http://dev.testversions.com/oxpham/index.php", results.rows.item(i));
    }

}

function postAllData() {
    var db = window.openDatabase("oxfam_sims_dev", "1.0", "OxfamSIMS", 1000000);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM beneficiary_info ORDER BY b_id DESC', [], allBeneficiary, errorCB);
    }, errorCB, successCB);

}


//// jquery pg

$(document).bind("deviceready", function () {

    populateBeneficiaryList();
    
    $("#beneficiary-list").on('click', "li.list-group-item a", function(){ 
        var ffid = $(this).attr('data-bid');
        alert("dsdsdsd"+ffid); 
    });
    
    $("#btn-csv").click(function () {
        postAllData();
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
    });
});


//http://stackoverflow.com/questions/9583363/get-base64-from-imageuri-with-phonegap