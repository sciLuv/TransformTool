let posAngle = document.getElementById("pos-tool-angle");
let posOpener = document.getElementById("position-tool-opener");
let posTool = document.getElementById("position-tool");

let posToolContent = document.getElementById("pos-tool-content");

let posToolOpen = false;

posAngle.addEventListener("click", function(){
    if(posToolOpen == false){
        posToolOpen = true;
        posOpener.setAttribute("active", ""); 
        posTool.setAttribute("active", ""); 
        posToolContent.removeAttribute("inactive");
    }
    else{
        posToolOpen = false;
        posOpener.removeAttribute("active");
        posTool.removeAttribute("active");
        let inativePosToolContent = window.setTimeout(inativationContent, 300);
    }
})

function inativationContent(){
    posToolContent.setAttribute("inactive", "");
}