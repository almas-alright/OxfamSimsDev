/* 
 * syurvey data processing
 */



//function getLocationPos() {
//    navigator.geolocation.getCurrentPosition(onSuccess, onError);
//}
//// onSuccess Geolocation  
//function onSuccess(position) {
//    document.getElementById('lat').value = position.coords.latitude;
//    document.getElementById('lon').value = position.coords.longitude;
//}
//function onError(error) {
//    alert('code: ' + error.code + '\n' +
//            'message: ' + error.message + '\n');
//}


//$(document).bind('deviceready', function () {
//    
//    $("#benificiarySDcardBtn").bind('touchstart', function () {
//        alert("working");
//    })
//   
//        $("#benificiaryPhotoBtn").bind('touchstart', function () {
//            navigator.camera.getPicture(
//                    function (data) {
//                        $("#benificiaryPhoto").attr('src', "data:image/jpeg;base64," + data).css("visibility", "visible");
//                    },
//                    onCaptureFail,
//                    {                        
//                        destinationType: destinationType.DATA_URL,
//                        sourceType: PictureSourceType.PHOTOLIBRARY,                       
//                        mediaType: MediaType.PICTURE
//                    }
//            );
//        });   
//
//    function onCaptureFail(message) {
//        alert('Failed because: ' + message);
//    }
//});


var pictureSource;   // picture source
var destinationType; // sets the format of returned value

// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
//
function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
}

// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
    // Uncomment to view the base64-encoded image data
    // console.log(imageData);

    // Get image handle
    //
    var smallImage = document.getElementById('benificiaryPhoto');

    // Unhide image elements
    //
    smallImage.style.display = 'block';

    // Show the captured photo
    // The in-line CSS rules are used to resize the image
    //
    smallImage.src = "data:image/jpeg;base64," + imageData;
}

// Called when a photo is successfully retrieved
//
function onPhotoURISuccess(imageURI) {
    // Uncomment to view the image file URI
    // console.log(imageURI);

    // Get image handle
    //
    var largeImage = document.getElementById('benificiaryPhoto');

    // Unhide image elements
    //
    largeImage.style.display = 'block';

    // Show the captured photo
    // The in-line CSS rules are used to resize the image
    //
    largeImage.src = imageURI;
}

// A button will call this function
//
function capturePhoto() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {quality: 50,
        destinationType: destinationType.DATA_URL});
}

// A button will call this function
//
function capturePhotoEdit() {
    // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL});
}

// A button will call this function
//
function getPhoto(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source});
}

// Called if something bad happens.
//
function onFail(message) {
    alert('Failed because: ' + message);
}




