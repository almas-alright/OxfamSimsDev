// Wait for Cordova to load

document.addEventListener("deviceready", db_init, false);

function db_init() {
    var db = window.openDatabase("oxfam_sims_dev", "2.0", "OxfamSIMS", 1000000);
    db.transaction(populateDB, errorCB, successCB);
}
// Populate the database 
//
function populateDB(tx) {
    tx.executeSql('DROP TABLE IF EXISTS beneficiary_info');
    tx.executeSql('CREATE TABLE IF NOT EXISTS beneficiary_info(b_id INT PRIMARY KEY,select_id INT,project_id INT,office_id INT,group TEXT,benificiary_name TEXT,benificiary_img TEXT,nid_img_front TEXT,nid_img_back TEXT,fathers_name TEXT,mothers_name TEXT,union_name TEXT,word TEXT,address TEXT,grnder TEXT,age TEXT,mobile TEXT,nominee_name TEXT,relation TEXT,nominee_img TEXT,marital_sts TEXT,occupation TEXT,occupation_1 TEXT,occupation_2 TEXT,location_gps TEXT, status INT)');
    tx.executeSql('INSERT INTO beneficiary_info (select_id, project_id, office_id, group, benificiary_name, benificiary_img, nid_img_front, nid_img_back, fathers_name, mothers_name, union_name, word, address, grnder, age, mobile, nominee_name, relation, nominee_img, marital_sts, occupation, occupation_1, occupation_2, location_gps, status) VALUES ("1234", "112", "144", "group of people", "benificiary had name", "img/img/img/benf.jpg", "img/img/img/nid_f.jpg", "img/img/img/nid_b.jpg" "father", "mother", "union intersect", "word no 152", "no address", "female", "16 yrs", "01678591535", "nominee has name", "boy friend", "img/img/img/nominee.jpg", "unmaried", "hair dresser", "begger", "sex worker", "23.737785, 90.395173", "1")');
}

// Transaction error callback
function errorCB(tx, err) {
    alert("Error processing SQL: " + err);
}

// Transaction success callback
function successCB() {
    alert("success!");
}








