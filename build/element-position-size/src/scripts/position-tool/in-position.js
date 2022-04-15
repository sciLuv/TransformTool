let widthBtns = document.getElementsByClassName("size-col");
let heightBtns = document.getElementsByClassName("size-line");
let grabPosBtns = document.getElementsByClassName("pos-grab");

let sizeIFList = [];

function createSize(){
    for(l=0; l<=elemList.length-1; l++){ 

        console.log("test size");
        let elemNum = l;

        if(sizeIFList[elemNum] == undefined){
            sizeIFList[elemNum] = {
                existing : false,
                height : {
                    num : elemNum,
                    interuptor : false
                },
                width : {
                    num : elemNum,
                    interuptor : false,
                }
            }
        }
        else{
            sizeIFList[elemNum]["height"] = {
                num : elemNum,
                interuptor : false
            }
            sizeIFList[elemNum]["width"] = {
                num : elemNum,
                interuptor : false
            }
        }

        let initialHeight1Placement;
        let initialHeight2Placement;
        
        let initialWidth1Placement;
        let initialWidth2Placement;

        heightBtns[(sizeIFList[elemNum].height.num*2)].addEventListener("click",function(){
            elemList[sizeIFList[elemNum].height.num].size.height++;
            document.getElementById(elemList[sizeIFList[elemNum].height.num].id.name).style.height = elemList[sizeIFList[elemNum].height.num].size.height + "px";
            document.getElementById("if-" + elemList[sizeIFList[elemNum].height.num].id.name).style.height = elemList[sizeIFList[elemNum].height.num].size.height + "px";

        });
        widthBtns[(sizeIFList[elemNum].width.num*2)].addEventListener("click",function(){
            elemList[sizeIFList[elemNum].width.num].size.width++;
            document.getElementById(elemList[sizeIFList[elemNum].width.num].id.name).style.width = elemList[sizeIFList[elemNum].width.num].size.width + "px";
            document.getElementById("if-" + elemList[sizeIFList[elemNum].width.num].id.name).style.width = elemList[sizeIFList[elemNum].width.num].size.width + "px";

        });

        heightBtns[(sizeIFList[elemNum].height.num*2)+1].addEventListener("mousedown",function(event){
            initialHeight2Placement = event.clientY; 
            sizeIFList[elemNum].height.interuptor = true;
            console.log(sizeIFList[elemNum].height.interuptor);
        });
        widthBtns[(sizeIFList[elemNum].width.num*2)+1].addEventListener("mousedown",function(event){
            console.log("mouse down " + elemNum);
            initialWidth2Placement = event.clientX; 
            console.log(initialWidth2Placement);
            sizeIFList[elemNum].width.interuptor = true;
            console.log(sizeIFList[elemNum].width.interuptor);
        });
        if(sizeIFList[elemNum].existing == false){
            body.addEventListener("mousemove", sizeMove);
            function sizeMove(event){
                if(elemList[elemNum] != undefined){
                    console.log("test delete size " + elemNum);
                    if(sizeIFList[elemNum].width.interuptor == true){
                        console.log("body miuseMove");
                        let placement = event.clientX;
                        console.log(placement);
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
        
                    if(sizeIFList[elemNum].height.interuptor == true){
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
                }
            }
            body.addEventListener("mouseup", sizeEndMove);
            function sizeEndMove(){
                if(elemList[elemNum] != undefined){
                    console.log("body mouseUp " + elemNum);
                        if(sizeIFList[elemNum].width.interuptor == true){
                            console.log('test');
                            sizeIFList[elemNum].width.interuptor = false;
                        }
                        if(sizeIFList[elemNum].height.interuptor == true){
                            sizeIFList[elemNum].height.interuptor = false;
                        }
                }
            }
            //body.removeEventListener("mousemove", sizeMove);
            //body.removeEventListener("mouseup", sizeEndMove);
            sizeIFList[elemNum].existing = true;
        }
    }
}
