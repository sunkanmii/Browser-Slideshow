const addPicButton = document.querySelector("#add-pics");
const fileElem = document.querySelector("#fileElem");
const fullScreenCusParent = document.querySelector("#how-to-use video");
const img = document.querySelector("header img");
const prevButton = document.querySelector("#previous-button");
const slideShowMain = document.querySelector(".slide-show-main");
const slideShowPic = document.querySelector(".slide-show-main picture source");
const videoElem = document.querySelector("#main-container video");
const error_message = document.querySelector(".slide-show-main picture + p")
if(videoElem.canPlayType("video/mp4; codecs=avc1.42E01E, mp4a.40.2")){
    console.log("Video element of type mp4 is supported.");
}
const pics = [];

addPicButton.addEventListener("click", () => {
    fileElem.click();
})

function AddImgFiles(files) {
    for (let i = 0; i < files.length; i++) {
        let cusfile = files[i];

        let reader = new FileReader();
        
        reader.addEventListener("load", function (event) {
            if(i == 0){
                slideShowPic.srcset = event.target.result;
            }
            
            slideShowMain.innerHTML += "<img src ='" + event.target.result + "'/>"; 
        });

        reader.readAsDataURL(cusfile);
    }
}

// if(window.PointerEvent){
//     addPicButton.addEventListener("pointerdown", this.handleGestureStart, true);
//     addPicButton.addEventListener("pointermove", this.handleGestureMove, true);
//     addPicButton.addEventListener("pointerup", this.handleGestureEnd, true);
//     addPicButton.addEventListener("pointercancel", this.handleGestureEnd, true);
// }else{

//     addPicButton.addEventListener("touchstart", this.handleGestureStart, true);
//     addPicButton.addEventListener("touchmove", this.handleGestureMove, true);
//     addPicButton.addEventListener("touchend", this.handleGestureEnd, true);
//     addPicButton.addEventListener("touchcancel", this.handleGestureEnd, true);

//     addPicButton.addEventListener("mousedown", this.handleGestureStart, true);
// }

// this.handleGestureEnd = function(event){
//     event.preventDefault();

//     if(event.touches && event.touches.length > 0){
//         return;
//     }

//     rafPending = false;

//     // Remove Event Listeners
//     if(this.window.PointerEvent){
//         event.target.releasePointerCapture(eve)
//     }else{
//         this.document.removeEventListener("mousemove", this.handleGestureMove, true);
//         this.document.removeEventListener("mouseup", this.handleGestureEnd, true);
//     }

//     updateSwipeRestPosition();

//     initialTouchPos = null;
// }.bind(this);
// s
// function getGesturePointerFromEvent(event){
//     var point = {};

//     if(event.targetTouches){
//         point.x = event.targetTouches[0].clientX;
//         point.y = event.targetTouces[0].clientY;
//     }
//     else{
//         point.x = event.clientX;
//         point.y = event.clientY;
//     }

//     return point;
// }

// function onAnimFrame() {
//     if(!rafPending) {
//       return;
//     }

//     var differenceInX = initialTouchPos.x - lastTouchPos.x;

//     var newXTransform = (currentXPosition - differenceInX)+'px';
//     var transformStyle = 'translateX('+newXTransform+')';
//     addPicButton.style.webkitTransform = transformStyle;
//     addPicButton.style.MozTransform = transformStyle;
//     addPicButton.style.msTransform = transformStyle;
//     addPicButton.style.transform = transformStyle;

//     rafPending = false;
//   }

function PreviousImage(){
    if(slideShowPic.srcset === pics[0]){
        error_message.textContent = "This is the first image!";
        error_message.setAttribute("aria-live", "polite");
    }
    else if(slideShowPic.srcset === pics[pics.length - 1]){
        error_message.textContent = "This is the last image!";
        error_message.setAttribute("aria-live", "polite");
    }
    else{
        console.table(pics);
        console.log(pics[pics.indexOf(slideShowPic.srcset) - 1]);
        
        const imgUrl = URL.createObjectURL(pics[pics.indexOf(slideShowPic.srcset) - 1]);

        slideShowPic.srcset = imgUrl;
    }
}

function NextImage(){
    if(slideShowPic.srcset === pics[0]){
        error_message.textContent = "This is the first image!";
        error_message.setAttribute("aria-live", "polite");
    }
    else if(slideShowPic.srcset === pics[pics.length - 1]){
        error_message.textContent = "This is the last image!";
        error_message.setAttribute("aria-live", "polite");
    }
    else{
        window.
        slideShowPic.srcset = pics[pics.indexOf(slideShowPic.srcset) + 1];
    }
}

function ToggleFullScreen() {
    if(videoElem.canPlayType("video/mp4; codecs=avc1.42E01E, mp4a.40.2")){
        videoElem.requestFullscreen();
    }
}