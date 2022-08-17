function movingTool(dropToMoveElem, initPlaceX, initPlaceY, placeActive, tool){

dropToMoveElem.addEventListener("mousedown", function(event){
    let mousePlace = event.target.getBoundingClientRect();
    initPlaceX =  event.pageX - (mousePlace.left + (event.pageX - event.clientX));
    initPlaceY =  event.pageY - (mousePlace.top + (event.pageY - event.clientY));
    placeActive = true;

    tool.setAttribute("active","");
})
//Event for beginning the element-window moving,
dropToMoveElem.addEventListener("mouseup", function(event){
    placeActive = false;
    tool.removeAttribute("active");
})
//Event for ending the element-window moving,
body.addEventListener('mouseup', function(event){
    if(placeActive == true){
        body.removeAttribute("active");
        tool.removeAttribute("active");
        placeActive = false;
    }
    if(tool == position){
        inPositionPlacement();
    }
})
//Event for calculate and applicate move
body.addEventListener('mousemove', function(event){
    if(placeActive == true){
        tool.style.top = Math.round(event.pageY - initPlaceY) + "px";
        tool.style.left = Math.round(event.pageX - initPlaceX) + "px";

        if(tool == position){
            topPosition = Math.round(event.pageY - initPlaceY);
            leftPosition = Math.round(event.pageX - initPlaceX);
        }
    }
})
}

//function movingTool(dropToMoveElem, initPlaceX, initPlaceY, placeActive, tool)
movingTool(posPlace, posInitPlaceX, posInitPlaceY, posPlaceActive, position);
movingTool(elemPlace, elemInitPlaceX, elemInitPlaceY, elemPlaceActive, elemContent);
movingTool(codePlace, codeInitPlaceX, codeInitPlaceY, codePlaceActive, codeContent);