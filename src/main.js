"use strict";

if ('function' === typeof importScripts) {
    importScripts("older-browser-support/cache-polyfill/index.js");
}

if ('serviceWorker' in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js")
            .then(reg => {
                console.log("Service worker registrated: ", reg);
            })
            .catch(err => {
                console.log("Service worker registration error: ", err);
            })
    })
} else {
    console.log('Service worker not supported');
}

const addPicButton = document.querySelector("#add-pics");
const fileElem = document.querySelector("#fileElem");
const fullScreenCusParent = document.querySelector("#how-to-use video");
const prevButton = document.querySelector("#previous-button");
const nextButton = document.querySelector("#next-button");
const slideShowMain = document.querySelector(".slide-show-main");
const slideShowImgs = document.querySelector(".slide-show-imgs");
const slideShowPic = document.querySelector(".slide-show-main picture source");
const videoElem = document.querySelector("#main-container video");
const errorMessage = document.querySelector("#error-message");
const startSlideShowBut = document.querySelector("#start-slideshow");
const audioTag = document.querySelector("main #user-audio");
const addAudio = document.querySelector("#add-audio");
const audioFileElem = document.querySelector("#audioFileElem");

function exitHandler(slideShowInterval) {
    if (document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement) {
        clearInterval(slideShowInterval);
    }
}

document.addEventListener('fullscreenchange', exitHandler, false);
document.addEventListener('mozfullscreenchange', exitHandler, false);
document.addEventListener('MSFullscreenChange', exitHandler, false);
document.addEventListener('webkitfullscreenchange', exitHandler, false);



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

const file =


    addPicButton.addEventListener("click", () => {
        fileElem.click();
    })

function AddImgFiles(files) {
    let userImgs = GetUserImages().UserImages();
    let userImageParent = userImgs[0].parentNode;

    if (userImageParent === null) {
        userImageParent = document.querySelector(".slide-show-main .slide-show-imgs");
    }

    if (userImgs[0].alt === "flower") {
        userImageParent.removeChild(userImageParent.children[0]);
    }

    const imageLen = userImageParent.childElementCount;
    const firstImg = userImageParent.children[0];

    for (let i = 0; i < files.length; i++) {
        let cusfile = files[i];

        let reader = new FileReader();

        reader.addEventListener("load", function (event) {
            if (i === 0 && imageLen === 0) {
                slideShowImgs.insertAdjacentHTML("afterbegin", `<img class="user-images" sizes="50vw" src ="${event.target.result}"/>`)
            } else if (i > 0 && imageLen === 0) {
                slideShowImgs.insertAdjacentHTML("afterbegin", `<img class="user-images" sizes="50vw" src ="${event.target.result}" hidden/>`);
            } else if (i === 0 && imageLen > 1) {
                firstImg.insertAdjacentHTML("afterend", `<img class="user-images" sizes="50vw" src ="${event.target.result}" hidden/>`);
            } else if (i > 0 && imageLen > 1) {
                firstImg.insertAdjacentHTML("afterend", `<img class="user-images" sizes="50vw" src ="${event.target.result}" hidden"/>`);
            }
        });

        reader.readAsDataURL(cusfile);
        Imgs();
    }
    errorMessage.textContent = "";
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
addAudio.addEventListener("click", () => {
    audioFileElem.click();
});

function AddAudioFile(audioFile) {
    let userAudioFile = audioFile[0];

    let reader = new FileReader();

    reader.addEventListener("load", function (event) {
        audioTag.src = event.target.result;
    })

    reader.readAsDataURL(userAudioFile);
}

function PreviousImage() {
    let userImgs = Imgs().UserImages();
    let currImgInd = myCounter.CusCounter();
    let prevImgInd = myCounter.DecCounter();

    if (userImgs[currImgInd] !== userImgs[0]) {
        userImgs[currImgInd].setAttribute("style", "animation: 0.4s ease-in 1 forwards remove-left;");
        userImgs[currImgInd].setAttribute("hidden", "true");
        userImgs[prevImgInd].removeAttribute("hidden");
        userImgs[prevImgInd].setAttribute("style", "animation: 0.4s ease-in 1 forwards fade-in-left;");
        errorMessage.textContent = "";
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
        userImgs[currImgInd].setAttribute("hidden", "true");
        userImgs[nextImgInd].removeAttribute("hidden");
        userImgs[nextImgInd].setAttribute("style", "animation: 0.4s ease-in 1 forwards fade-in-right;");
        errorMessage.textContent = "";
    } else {
        nextImgInd = myCounter.DecCounter();
        errorMessage.textContent = "This is the last image!";
        errorMessage.setAttribute("aria-live", "polite");
    }
}

function DeleteImage() {
    let imgElem = document.querySelector(".slide-show-main .slide-show-imgs img[hidden]");

    let imgParent = document.querySelector(".slide-show-main .slide-show-imgs");

    if (imgElem === null) {
        imgElem = document.querySelector(".slide-show-main .slide-show-imgs img");
    }

    if (imgParent.childElementCount === 0) {
        errorMessage.setAttribute("aria-live", "assertive");
        errorMessage.setAttribute("aria-atomic", "true");
        errorMessage.textContent = "Nothing to delete here. Please add an image.";
    } else {
        imgParent.removeChild(imgElem);
    }
}

function ToggleFullScreen() {
    if (videoElem.canPlayType("video/mp4; codecs=avc1.42E01E, mp4a.40.2")) {
        videoElem.requestFullscreen();
    }
}

function ToggleFullScreenSlideShow() {
    if (SupportsFullScreen() === true && prevButton.style.display !== "none") {
        slideShowImgs.requestFullscreen();
        console.log("I reached here.");
    } else {
        console.log("I reached here.");
        prevButton.style.display = "inline";
        nextButton.style.display = "inline";
        document.exitFullscreen();
    }
}

function StartSlideShow() {
    let imgs = document.querySelectorAll(".slide-show-main .slide-show-imgs img");
    let imgsLength = imgs.length;
    let currImgInd = myCounter.CusCounter();

    console.log(imgs[currImgInd]);
    
    let slideShowInterval = setInterval(() => {
        
        if (currImgInd === imgsLength - 1) {
            currImgInd = 0;
        }
        
        if (currImgInd > 0) {
            imgs[currImgInd - 1].setAttribute("hidden", "true");
            imgs[currImgInd].removeAttribute("hidden");
        }
        
        imgs[currImgInd].setAttribute("style", "animation: 8s linear 1 forwards zoom-in");
        currImgInd++;
    }, 8000);

    slideShowInterval;
    // exitHandler(slideShowInterval);

    ToggleFullScreenSlideShow();
}

function SupportsFullScreen() {
    if (document.fullscreenEnabled === false) {
        return "Fullscreen not supported on this browser."
    } else {
        return true;
    }
}