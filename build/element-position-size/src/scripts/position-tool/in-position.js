let widthBtns = document.getElementsByClassName("size-col");
let heightBtns = document.getElementsByClassName("size-line");

let sizeIFList = [];
let gridIFList = [];

//use to do all thing in link with sizing and his modifications
function createSize(){
    for(l=0; l<=elemList.length-1; l++){ 
        let elemNum = l;
        //here conditions to define in sizeIfList[elem] informations relative to the size, to work with after. 
        //if the sizeIFList[elem] doesn't exist
        if(sizeIFList[elemNum] == undefined){
            sizeIFList[elemNum] = {
                existing : false,
                height : {
                    num : elemNum,
                    interuptor1 : false,
                    interuptor2 : false
                },
                width : {
                    num : elemNum,
                    interuptor1 : false,
                    interuptor2 : false
                }
            }
        }
        //if the sizeIFList[elem] already exist, just put some information in there default value
        else{
            sizeIFList[elemNum]["height"] = {
                num : elemNum,
                interuptor1 : false,
                interuptor2 : false
            }
            sizeIFList[elemNum]["width"] = {
                num : elemNum,
                interuptor1 : false,
                interuptor2 : false
            }
        }

        //here conditions to define in gridIFList[elem] informations relative to the grid displaying, to work with after. 
        //if the gridIFList[elem] doesn't exist
        if(gridIFList[elemNum] == undefined){
            gridIFList[elemNum] = {
                use : false
            }
        }
        //if the gridIFList[elem] exist but the elem in link not (delete) 
        if(sizeIFList[elemNum].existing == false){
            let initialHeight1Placement;
            let initialHeight2Placement;
            
            let initialWidth1Placement;
            let initialWidth2Placement;
        }
        
        //Event in link of interaction under-elem of each elems to sizing them. init their required value and begin the sizing process
        //there are 4, 2 for height, 2 for width
        heightBtns[(sizeIFList[elemNum].height.num*2)].addEventListener("mousedown",function(event){
            initialHeight1Placement = event.clientY; 
            sizeIFList[elemNum].height.interuptor1 = true;
        });
        heightBtns[(sizeIFList[elemNum].height.num*2)+1].addEventListener("mousedown",function(event){
            initialHeight2Placement = event.clientY; 
            sizeIFList[elemNum].height.interuptor2 = true;
        });

        widthBtns[(sizeIFList[elemNum].width.num*2)].addEventListener("mousedown",function(event){
            initialWidth1Placement = event.clientX; 
            sizeIFList[elemNum].width.interuptor1 = true; 
        });
        widthBtns[(sizeIFList[elemNum].width.num*2)+1].addEventListener("mousedown",function(event){
            initialWidth2Placement = event.clientX; 
            sizeIFList[elemNum].width.interuptor2 = true;
        });

        //part of the program doing the sizing of elem.
        //first a condition before creation of some event, to avoid that, if the elem doesn't exist
        if(sizeIFList[elemNum].existing == false){
            //event for the middle part of the sizing process, it's here where the size is modified, with a moving of the mouse
            body.addEventListener("mousemove", sizeMove);
            function sizeMove(event){
                if(elemList[elemNum] != undefined){
                    //part of sizeMove for none grid Display (flex, block)
                    if(posSetting.display.display != "grid"){
                        if(sizeIFList[elemNum].width.interuptor2 == true){
                            NoGridSizingCalc(elemNum, event.clientX, "width", initialWidth2Placement);
                            initialWidth2Placement = event.clientX;
                        }
                        if(sizeIFList[elemNum].width.interuptor1 == true){
                            NoGridSizingCalc(elemNum, event.clientX, "width", initialWidth1Placement);
                            initialWidth1Placement = event.clientX;
                        }
                        if(sizeIFList[elemNum].height.interuptor2 == true){
                            NoGridSizingCalc(elemNum, event.clientY, "height", initialHeight2Placement);
                            initialHeight2Placement = event.clientY;
                        }
                        if(sizeIFList[elemNum].height.interuptor1 == true){
                            NoGridSizingCalc(elemNum, event.clientY, "height", initialHeight1Placement);
                            initialHeight1Placement = event.clientY;
                        }
                        
                    }
                    //part of sizeMove for grid Display
                    else{
                        let rowsPlaces = [];
                        let columnsPlaces = [];

                        for(i=0; i<=posSetting.display.menu.top.length-1; i++){
                            let rowPlace = posSetting.display.menu.top[i] + posSetting.display.menu.clientTop;
                            rowsPlaces.push(rowPlace);
                        }
                        for(i=0; i<=posSetting.display.menu.left.length-1; i++){
                            let columnPlace = posSetting.display.menu.left[i] + posSetting.display.menu.clientLeft;
                            columnsPlaces.push(columnPlace);
                        }

                        if(sizeIFList[elemNum].width.interuptor2 == true){
                            gridSizingCalc(elemNum, "width", event.clientX, columnsPlaces, "right");
                        }
                        if(sizeIFList[elemNum].width.interuptor1 == true){
                            gridSizingCalc(elemNum, "width", event.clientX, columnsPlaces, "left");
                        }

                        if(sizeIFList[elemNum].height.interuptor2 == true){
                            gridSizingCalc(elemNum, "height", event.clientY, rowsPlaces, "bottom");
                        }
                        if(sizeIFList[elemNum].height.interuptor1 == true){
                            gridSizingCalc(elemNum, "height", event.clientY, rowsPlaces, "top");
                        }

                        let elem = elemList[sizeIFList[elemNum].width.num];
                        document.getElementById(elem.id.name).style.gridArea = elem.grid.top + "/" + elem.grid.left + "/" + elem.grid.bottom + "/" + elem.grid.right;
                        document.getElementById("if-" + elem.id.name).style.gridArea = elem.grid.top + "/" + elem.grid.left + "/" + elem.grid.bottom + "/" + elem.grid.right;

                    }
                }
            }
            body.addEventListener("mouseup", sizeEndMove);
            function sizeEndMove(){
                if(elemList[elemNum] != undefined){
                    if(sizeIFList[elemNum].width.interuptor1 == true){
                        sizeIFList[elemNum].width.interuptor1 = false;
                    }
                    if(sizeIFList[elemNum].width.interuptor2 == true){
                        sizeIFList[elemNum].width.interuptor2 = false;
                    }
                    if(sizeIFList[elemNum].height.interuptor1 == true){
                        sizeIFList[elemNum].height.interuptor1 = false;
                    }
                    if(sizeIFList[elemNum].height.interuptor2 == true){
                        sizeIFList[elemNum].height.interuptor2 = false;
                    }
                }
            }
            sizeIFList[elemNum].existing = true;
        }
    }
}

let grabPosBtns = document.getElementsByClassName("pos-grab");
let placeIFList = [];

//do all things in link with placement of elements and their modifications
function createPlacement(){
    for(l=0; l<=elemList.length-1; l++){
        
        let elemNum = l;
        let elem = document.getElementById(elemList[elemNum].id.name);
        let topElem = document.getElementById("if-" + elemList[elemNum].id.name);
        console.log(topElem);
        let initialPlaceX, initialPlaceY;
        
        if(placeIFList[elemNum] == undefined){
            placeIFList[elemNum] = {
                existing : false,
                exist : false
            } 
        }

        grabPosBtns[elemNum].addEventListener("mousedown",function(event){
            placeIFList[elemNum].exist = true;
            initialPlaceX = event.clientX; 
            initialPlaceY = event.clientY;
        });
        
        body.addEventListener("mousemove", placeMove);
        function placeMove(event){
            if(placeIFList[elemNum].exist == true){
                if((posSetting.free.position == "relative")||(posSetting.free.position == "absolute")){
                    let placementX = event.clientX;
                    let placementY = event.clientY;
                    if(placementX > initialPlaceX){
                        elemList[elemNum].place.left += (placementX - initialPlaceX);
                    }
                    if(placementX < initialPlaceX){
                        elemList[elemNum].place.left -= (initialPlaceX - placementX);
                    }
                    initialPlaceX = placementX;
    
                    if(placementY > initialPlaceY){
                        elemList[elemNum].place.top += (placementY - initialPlaceY);
                    }
                    if(placementY < initialPlaceY){
                        elemList[elemNum].place.top -= (initialPlaceY - placementY);
                    }
                    initialPlaceY = placementY;
                    
                    elem.style.top = elemList[elemNum].place.top + "px";
                    topElem.style.top = elemList[elemNum].place.top + "px";
                    
                    elem.style.left = elemList[elemNum].place.left + "px";
                    topElem.style.left = elemList[elemNum].place.left + "px";
                }
            }
        }

        body.addEventListener("mouseup", placeEndMove);
        function placeEndMove(){
            if(elemList[elemNum] != undefined){
                if(placeIFList[elemNum].exist == true){
                    placeIFList[elemNum].exist = false;
                }
            }
        }
        placeIFList[elemNum].existing = true;
    }
}