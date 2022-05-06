//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~POSITION-VISIBILITY~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

//few function for activate/disable position menu visibility
//
//
function posIsVisibleOrNot(){
    position.addEventListener("mouseover", function(){
        posToolTitle.style.transition = null;
        posMenu.style.transition = null;
        posMenuContent.style.transition = null;
        posOpener.style.transition = null;
        openClosePosArrow.style.transition = null;
        mouseIsOnPos = true;

        position.removeAttribute("invisible");
    })
    position.addEventListener("mouseleave", function(){
        mouseIsOnPos = false;
        position.setAttribute("invisible", "");
        let closing = window.setTimeout(closePosMenuWhenMouseLeave, 1500);

    })
}

function closePosMenuWhenMouseLeave(){
    if(mouseIsOnPos == false){
        posToolTitle.removeAttribute("active");
        posMenu.removeAttribute("active");
        posMenuContent.setAttribute("inactive", "");

        posToolTitle.style.transition = "all 0s";
        posMenu.style.transition = "all 0s";
        posMenuContent.style.transition = "all 0s";
        posOpener.style.transition = "all 0s";
        openClosePosArrow.style.transition = "all 0s";
        posToolOpen = false;
    }

}

posIsVisibleOrNot();

//few function for position menu placement and moving
//
//
positionMove.addEventListener("mousedown", function(event){
    posMousePlace = event.target.getBoundingClientRect();
    posInitPlaceX =  event.pageX - (posMousePlace.left + (event.pageX - event.clientX));
    posInitPlaceY =  event.pageY - (posMousePlace.top + (event.pageY - event.clientY));
    posPlaceActive = true;

    position.setAttribute("active","");
})
//Event for beginning the element-window moving,
positionMove.addEventListener("mouseup", function(event){
    posPlaceActive = false;
    position.removeAttribute("active");
})
//Event for ending the element-window moving,
body.addEventListener('mouseup', function(event){
    if(posPlaceActive == true){
        body.removeAttribute("active");
        position.removeAttribute("active");
        posPlaceActive = false;
    }
    inPositionPlacement();
})
//Event for calculate and applicate move
body.addEventListener('mousemove', function(event){
    if(posPlaceActive == true){
        position.style.top = Math.round(event.pageY - posInitPlaceY) + "px";
        position.style.left = Math.round(event.pageX - posInitPlaceX) + "px";

        topPosition = Math.round(event.pageY - posInitPlaceY);
        leftPosition = Math.round(event.pageX - posInitPlaceX);
    }
})