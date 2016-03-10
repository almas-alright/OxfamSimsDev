/* 
 * syurvey data processing
 */



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


$(document).bind('deviceready', function(){
    getCameraCapturePhoto("#benificiaryPhotoBtn", "#benificiaryPhoto");
    $("#benificiarySDcardBtn").bind('touchstart', function(){
        alert("working");
    })
});


function getCameraCapturePhoto(buttonID, imgID)
{
    $(buttonID).bind('touchstart', function(){
        navigator.camera.getPicture(
                function(data){
                    $(imgID).attr('src', "data:image/jpeg;base64," + data).css("visibility", "visible");
                },
                onCaptureFail,
                {
                    quality: 50,
                    destinationType: Camera.destinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    mediaType: Camera.MediaType.PICTURE
                }
                );
    });
}

function onCaptureFail(message) {
                alert('Failed because: ' + message);
            }
