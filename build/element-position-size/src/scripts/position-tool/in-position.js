let widthBtns = document.getElementsByClassName("size-col");
let heightBtns = document.getElementsByClassName("size-line");
let grabPosBtns = document.getElementsByClassName("pos-grab");

let sizeIFList = [];

function createSize(){
    for(l=0; l<=elemList.length-1; l++){ 
        let elemNum = l;

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
        if(sizeIFList[elemNum].existing == false){
            let initialHeight1Placement;
            let initialHeight2Placement;
            
            let initialWidth1Placement;
            let initialWidth2Placement;
        }

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

        if(sizeIFList[elemNum].existing == false){
            body.addEventListener("mousemove", sizeMove);
            function sizeMove(event){
                if(elemList[elemNum] != undefined){
                    if(posSetting.display.display != "grid"){
                        if(sizeIFList[elemNum].width.interuptor2 == true){
                            let placement = event.clientX;
                            if(placement > initialWidth2Placement){
                                elemList[elemNum].size.width += (placement - initialWidth2Placement); 
                            }
                            if(placement < initialWidth2Placement){
                                elemList[elemNum].size.width -= (initialWidth2Placement - placement);
                            }
                            initialWidth2Placement = placement;
                            document.getElementById(elemList[sizeIFList[elemNum].width.num].id.name).style.width = elemList[sizeIFList[elemNum].width.num].size.width + "px";
                            document.getElementById("if-" + elemList[sizeIFList[elemNum].width.num].id.name).style.width = elemList[sizeIFList[elemNum].width.num].size.width + "px";
                        }
                        if(sizeIFList[elemNum].width.interuptor1 == true){
                            let placement = event.clientX;
                            if(placement < initialWidth1Placement){
                                elemList[elemNum].size.width += (placement - initialWidth1Placement);
                            }
                            if(placement > initialWidth1Placement){
                                elemList[elemNum].size.width -= (initialWidth1Placement - placement);
                            }
                            initialWidth1Placement = placement;
                            document.getElementById(elemList[sizeIFList[elemNum].width.num].id.name).style.width = elemList[sizeIFList[elemNum].width.num].size.width + "px";
                            document.getElementById("if-" + elemList[sizeIFList[elemNum].width.num].id.name).style.width = elemList[sizeIFList[elemNum].width.num].size.width + "px";
                        }
            
                        if(sizeIFList[elemNum].height.interuptor2 == true){
                            let placement = event.clientY;
                            if(placement > initialHeight2Placement){
                                elemList[elemNum].size.height += (placement - initialHeight2Placement);
                            
                            }
                            if(placement < initialHeight2Placement){
                                elemList[elemNum].size.height -= (initialHeight2Placement - placement);
                            }
                            initialHeight2Placement = placement;
                            document.getElementById(elemList[sizeIFList[elemNum].height.num].id.name).style.height = elemList[sizeIFList[elemNum].height.num].size.height + "px";
                            document.getElementById("if-" + elemList[sizeIFList[elemNum].height.num].id.name).style.height = elemList[sizeIFList[elemNum].height.num].size.height + "px";
                        }
                        if(sizeIFList[elemNum].height.interuptor1 == true){
                            let placement = event.clientY;
                            if(placement > initialHeight1Placement){
                                elemList[elemNum].size.height += (placement - initialHeight1Placement);
                            
                            }
                            if(placement < initialHeight1Placement){
                                elemList[elemNum].size.height -= (initialHeight1Placement - placement);
                            }
                            initialHeight1Placement = placement;
                            document.getElementById(elemList[sizeIFList[elemNum].height.num].id.name).style.height = elemList[sizeIFList[elemNum].height.num].size.height + "px";
                            document.getElementById("if-" + elemList[sizeIFList[elemNum].height.num].id.name).style.height = elemList[sizeIFList[elemNum].height.num].size.height + "px";
                        }
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
