// Wait for Cordova to load


document.addEventListener("deviceready", db_init, false);

function db_init() {
    var db = window.openDatabase("oxfam_sims_dev", "1.0", "OxfamSIMS", 1000000);
    db.transaction(populateDB, errorCB, successCB_blank);
}

// Populate the database 
//
function populateDB(tx) {
//    tx.executeSql('DROP TABLE IF EXISTS beneficiary_info');
//    tx.executeSql('DROP TABLE IF EXISTS intervention_list');

    tx.executeSql('CREATE TABLE IF NOT EXISTS beneficiary_info(b_id INTEGER PRIMARY KEY AUTOINCREMENT,select_id TEXT,project_id INT, office_id INT,group_name TEXT,benificiary_name TEXT,benificiary_img TEXT,voter_id TEXT,nid_img_front TEXT,nid_img_back TEXT,fathers_name TEXT,mothers_name TEXT,union_name TEXT,word TEXT,address TEXT,grnder TEXT,age TEXT,mobile TEXT,nominee_name TEXT,nominee_father TEXT,nominee_mother TEXT,relation TEXT,nominee_img TEXT,marital_sts TEXT,occupation TEXT,occupation_1 TEXT,occupation_2 TEXT,location_gps TEXT,status INT)');
//    tx.executeSql('INSERT INTO beneficiary_info (select_id,project_id,office_id,group_name,benificiary_name,benificiary_img,voter_id,nid_img_front,nid_img_back,fathers_name, mothers_name,union_name,word,address,grnder,age,mobile,nominee_name,nominee_father,nominee_mother,relation,nominee_img,marital_sts,occupation,occupation_1,occupation_2,location_gps,status) VALUES ("BEN234","25","265","group of people","BEN Name 188","img/img/img/benf.jpg","54353natid4554","img/img/img/nidf.jpg","img/img/img/nidb.jpg","father","mother","union intersect","word no 152","no address","female","16 yrs","01678591535","nominee has name","nominee Father","nominee Mother","boy friend","img/img/img/nominee.jpg","unmaried","hair dresser","begger","sex worker","23.737785,90.395173","0")');
//    tx.executeSql('INSERT INTO beneficiary_info (select_id,project_id,office_id,group_name,benificiary_name,benificiary_img,voter_id,nid_img_front,nid_img_back,fathers_name, mothers_name,union_name,word,address,grnder,age,mobile,nominee_name,nominee_father,nominee_mother,relation,nominee_img,marital_sts,occupation,occupation_1,occupation_2,location_gps,status) VALUES ("BEN235","25","265","group of people","BEN Name 188","img/img/img/benf.jpg","54353natid4554","img/img/img/nidf.jpg","img/img/img/nidb.jpg","father","mother","union intersect","word no 152","no address","female","16 yrs","01678591535","nominee has name","nominee Father","nominee Mother","boy friend","img/img/img/nominee.jpg","unmaried","hair dresser","begger","sex worker","23.737785,90.395173","0")');
//    tx.executeSql('INSERT INTO beneficiary_info (select_id,project_id,office_id,group_name,benificiary_name,benificiary_img,voter_id,nid_img_front,nid_img_back,fathers_name, mothers_name,union_name,word,address,grnder,age,mobile,nominee_name,nominee_father,nominee_mother,relation,nominee_img,marital_sts,occupation,occupation_1,occupation_2,location_gps,status) VALUES ("BEN236","25","265","group of people","BEN Name 188","img/img/img/benf.jpg","54353natid4554","img/img/img/nidf.jpg","img/img/img/nidb.jpg","father","mother","union intersect","word no 152","no address","female","16 yrs","01678591535","nominee has name","nominee Father","nominee Mother","boy friend","img/img/img/nominee.jpg","unmaried","hair dresser","begger","sex worker","23.737785,90.395173","0")');
//      
    
    
    tx.executeSql('CREATE TABLE IF NOT EXISTS intervention_list(intervention_id INTEGER PRIMARY KEY AUTOINCREMENT,project_id INTEGER,office_id INTEGER,intervention_type INTEGER,union_name TEXT,word TEXT,address TEXT,descriptoin TEXT,intervention_photo TEXT,location_gps TEXT)');
//    tx.executeSql('INSERT INTO intervention_list (project_id,office_id,intervention_type,union_name,word,address,descriptoin,intervention_photo,location_gps) VALUES ("12","34","2","unionname D","word45","Abcd 1234 c4","river cleaning","imahes/photo.jpg","23.737785, 90.395173")');
}

// Transaction error callback
//
function errorCB(tx, err) {
    alert("Error processing SQL: " + err);
}

// Transaction success callback
//
function successCB() {
    alert("success!");
}

function successCB_blank() {
    console.log("done");
}



/*
project_id,
office_id,
intervention_type,
union_name,
word,
address,
descriptoin,
intervention_photo 
*/





