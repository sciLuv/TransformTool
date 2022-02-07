let allElem = document.getElementById("all-elements");
let beforeElemTool = document.getElementsByClassName("element-tool");
let elemTool = beforeElemTool[0]; 
let beforeTitleSeparation = document.getElementsByClassName("element-title-separation");
let titleSeparation = beforeTitleSeparation[0];
let angle = document.getElementById("angle");
let moreBtn = document.getElementById("btn-more-tool");

let moduleCounter = 0;
moreBtn.addEventListener("click", function(){

    angle.removeAttribute("close");
    elemTool.removeAttribute("close");

    removeAllEllAttr();
    angleInteruptor = false;
    moduleCounter++;
    selectAllEllAttr();
})

let angleInteruptor = false;
angle.addEventListener("click", function(){

    removeAllEllAttr();

    if(angleInteruptor == false){
        angle.setAttribute("close","");
        elemTool.setAttribute("close","");
        allElem.setAttribute("close","");
        titleSeparation.setAttribute("close","");
        angleInteruptor = true;
    }
    else{
        angle.removeAttribute("close");
        elemTool.removeAttribute("close");
        allElem.removeAttribute("close");
        titleSeparation.removeAttribute("close");
        selectAllEllAttr();
        angleInteruptor = false;
    }
})

function removeAllEllAttr(){
    for(attrNum = 0; attrNum <= allElem.attributes.length-1; attrNum++){
        if(allElem.attributes[attrNum].name != "id"){
            allElem.removeAttribute(allElem.attributes[attrNum].name);
        }
    }
}
function selectAllEllAttr(){
    if(moduleCounter == 1){
        elemTool.removeAttribute("begin");
        angle.removeAttribute("begin");
        allElem.setAttribute("one","");
    }
    else if (moduleCounter == 2){
        allElem.setAttribute("two","");
    }
    else if (moduleCounter == 3){
        allElem.setAttribute("three","");
    }
    else if (moduleCounter >= 1){
        allElem.setAttribute("four","");
    }
}

////////////////////////////////////////////////////////////////////////////

let elemPlace = document.getElementById("element-placement");

let elemPlaceActive = false;
let initPlaceX, initPlaceY;

elemPlace.addEventListener("mousedown", function(event){
    elemMousePlace = event.target.getBoundingClientRect();
    initPlaceX = event.clientX - elemMousePlace.left;
    initPlaceY = event.clientY - elemMousePlace.top;
    body.setAttribute("active","");
    elemPlace.setAttribute("active","");
    elemPlaceActive = true;

})

elemPlace.addEventListener("mouseup", function(event){
    body.removeAttribute("active");
    elemPlace.removeAttribute("active");
    elemPlaceActive = false;
})
body.addEventListener('mouseup', function(event){
    if(elemPlaceActive == true){
        body.removeAttribute("active");
        elemPlace.removeAttribute("active");
        console.log(event.clientY);
        elemPlaceActive = false;
    }
})

body.addEventListener('mousemove', function(event){
    if(elemPlaceActive == true){
        elemTool.style.left = Math.round((event.clientX - initPlaceX)/50)*50 + "px";
        elemTool.style.top = Math.round((event.clientY - initPlaceY)/50)*50 + "px";
    }
})