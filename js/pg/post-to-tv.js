$(document).ready(function(){

var data ={  
   project_id:1,
   office_id:2,
   beneficiary_id:"BEN1223",
   group:"Group",
   name:"Shibly",
   father:"Rahim Father",
   mother:"Rahim Mother",
   union:3,
   ward:"Poba",
   address:"Dhaka Bangladesh",
   mobile_no:"01613404299",
   voter_id:"N82348723642367434",
   nominee_name:"Nur Uddin",
   nominee_relation:"Brother",
   nominee_father:"Sariful Nominee Father",
   nominee_mother:"Sariful Nominee Mother",
   nominee_photo:"beneficiaries\/28498_nid-front.jpg",
   lat:"24.094738167379017",
   lng:"90.0023603439331",
   national_id_image:"beneficiaries\/85814_nid-front.jpg",
   national_id_image_back:"beneficiaries\/77953_nid-back.png",
   beneficiary_photo:"beneficiaries\/22462_rahima.jpg",
   updated_at:"2016-06-23 07:36:31",
   created_at:"2016-06-23 07:36:31",
   id:10
};


$.ajax({
  method: "POST",
  url: "http://dev.testversions.com/devels/oxfam/sims/public/site/requestBenInfo",
  data: data,
  crossDomain: true,
}).done(function( msg ) {
//    alert( "Data Saved: " + msg );
$("#result").html(msg);
});
});
