let allElem = document.getElementById("all-elements");
let beforeElemTool = document.getElementsByClassName("element-tool");
let elemTool = beforeElemTool[0];
let angle = document.getElementById("angle");
let moreBtn = document.getElementById("btn-more-tool");

moreBtn.addEventListener("click", function(){

    angle.removeAttribute("close");
    elemTool.removeAttribute("close");
    angleInteruptor = false;

    console.log(allElem.children);
    console.log(allElem.children.length);
    if(allElem.children.length == 0){
        allElem.setAttribute("one","");
    }
    else if (allElem.children.length == 1){
        allElem.removeAttribute("one");
        allElem.setAttribute("two","");
    }
    else if (allElem.children.length == 2){
        allElem.removeAttribute("two");
        allElem.setAttribute("three","");
        allElem.style.overflowY = "hidden"
    }
    else if (allElem.children.length == 3){
        allElem.style.overflowY = "scroll"
    }
})

let angleInteruptor = false;
angle.addEventListener("click", function(){
    if(angleInteruptor == false){
        angle.setAttribute("close","");
        elemTool.setAttribute("close","");
        angleInteruptor = true;
    }
    else{
        angle.removeAttribute("close");
        elemTool.removeAttribute("close");
        //if(){}
        //else if(){}
        angleInteruptor = false;
    }
})

