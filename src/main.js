const addPicButton = document.querySelector("#add-pics");
const fileElem = document.querySelector("#fileElem");
const fullScreenCusParent = document.querySelector("#how-to-use video");
const img = document.querySelector("header img");
const pics = [];

addPicButton.addEventListener("click", () => {
    fileElem.click();
})

function AddImgFiles(files) {
    for (obj in files) {
        console.log(obj);
        let allfiles = files[obj];

        let reader = new FileReader();
        reader.onload = function (event) {
            img.src = event.target.result;
        }

        reader.readAsDataURL(allfiles);
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

function toggleFullScreen() {
    document.body.requestFullscreen();
}