/**
 * Created by Suzon on 2/19/2016.
 */
    // Initialize collapse button
jQuery(".button-collapse").sideNav();
// Initialize collapsible (uncomment the line below if you use the dropdown variation)
jQuery('.collapsible').collapsible();


//Initialize Select
jQuery(document).ready(function () {
      $('select').material_select();

});


function getImgSrc(id)
{
   return $(id).attr("src");
}

function get_input_value_of(inputID)
{
    return $(inputID).val();
}


//database error handle

function errorCB(tx, err) {
    alert("Error processing SQL: " + err);
}

// Transaction success callback
//
function successCB() {
    alert("success!");
}