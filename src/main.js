"use strict";

const addPicButton = document.querySelector("#add-pics");
const fileElem = document.querySelector("#fileElem");
const fullScreenCusParent = document.querySelector("#how-to-use video");
const prevButton = document.querySelector("#previous-button");
const nextButton = document.querySelector("#next-button");
const slideShowMain = document.querySelector(".slide-show-main");
const slideShowPic = document.querySelector(".slide-show-main picture source");
const videoElem = document.querySelector("#main-container video");
const errorMessage = document.querySelector("#error-message");
const Counter = () => {
    let counter = 0;

    return {
        CusCounter: () => {
            return counter;
        },
        IncrCounter: () => {
            return ++counter;
        },
        DecCounter: () => {
            return --counter;
        }
    }
}
const myCounter = Counter();

const GetUserImages = () => {
    let userImgs = document.querySelectorAll(".user-images");

    return {
        UserImages: () => {
            return userImgs;
        }
    }
}

const Imgs = GetUserImages;

if (videoElem.canPlayType("video/mp4; codecs=avc1.42E01E, mp4a.40.2")) {
    console.log("Video element of type mp4 is supported.");
}
const pics = [];

addPicButton.addEventListener("click", () => {
    fileElem.click();
})

function AddImgFiles(files) {
    let userImgs = GetUserImages().UserImages();
    let userImageParent = userImgs[0].parentNode;
    
    if (userImgs[0].alt === "flower") {
        userImageParent.removeChild(userImageParent.children[1]);
    }

    const imageLen = userImageParent.childElementCount;
    const firstImg = userImageParent.children[1];

    for (let i = 0; i < files.length; i++) {
        let cusfile = files[i];

        let reader = new FileReader();

        reader.addEventListener("load", function (event) {
            if (i === 0 && imageLen === 2) {
                nextButton.insertAdjacentHTML("beforebegin", `<img class="user-images" sizes="50vw" src ="${event.target.result}"/>`)
            } else if (i > 0 && imageLen === 2) {
                nextButton.insertAdjacentHTML("beforebegin", `<img class="user-images" sizes="50vw" src ="${event.target.result}" style="display: none"/>`);
            }else if (i === 0 && imageLen > 2) {
                firstImg.setAttribute("style", "display: none; opaque: 0");
                firstImg.insertAdjacentHTML("afterend", `<img class="user-images" sizes="50vw" src ="${event.target.result}" />`);
            }
            else if(i > 0 && imageLen > 2){
                firstImg.insertAdjacentHTML("afterend", `<img class="user-images" sizes="50vw" src ="${event.target.result}" style="display: none; opaque: 0"/>`);    
            }
        });

        reader.readAsDataURL(cusfile);
        Imgs();
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

function PreviousImage() {
    let userImgs = Imgs().UserImages();
    let currImgInd = myCounter.CusCounter();
    let prevImgInd = myCounter.DecCounter();

    if (userImgs[currImgInd] !== userImgs[0]) {
        userImgs[currImgInd].setAttribute("style", "animation: 0.4s ease-in 1 forwards fade-in-left;");
        userImgs[prevImgInd].setAttribute("style", "animation: 0.4s ease-in 1 forwards remove-left;");
    } else {
        prevImgInd = myCounter.IncrCounter();
        errorMessage.textContent = "This is the first image!";
        errorMessage.setAttribute("aria-live", "polite");
    }
}

function NextImage() {
    let userImgs = Imgs().UserImages();
    let currImgInd = myCounter.CusCounter();
    let nextImgInd = myCounter.IncrCounter();

    if (userImgs[currImgInd] !== userImgs[userImgs.length - 1]) {
        userImgs[currImgInd].setAttribute("style", "animation: 0.4s ease-in 1 forwards remove-right;");
        userImgs[nextImgInd].setAttribute("style", "animation: 0.4s ease-in 1 forwards fade-in-left;");
    } else {
        nextImgInd = myCounter.DecCounter();
        errorMessage.textContent = "This is the last image!";
        errorMessage.setAttribute("aria-live", "polite");
    }
}

function DeleteImage(){
    let imgElem = document.querySelector(".slide-show-main img[hidden]");
    let imgParent = document.querySelector(".slide-show-main");
    
    if(imgElem === null){
        imgElem = document.querySelector(".slide-show-main img");
    }
    
    if(imgParent.childElementCount === 2){
        errorMessage.setAttribute("aria-live", "assertive");
        errorMessage.setAttribute("aria-atomic", "true");
        errorMessage.textContent = "Nothing to delete here. Please add an image.";
    }
    else{
        imgParent.removeChild(imgElem);
    }
}

function ToggleFullScreen() {
    if (videoElem.canPlayType("video/mp4; codecs=avc1.42E01E, mp4a.40.2")) {
        videoElem.requestFullscreen();
    }
}

function ToggleFullScreenSlideShow(){
       
}

function StartSlideShow(){
    ToggleFullScreenSlideShow();

}
