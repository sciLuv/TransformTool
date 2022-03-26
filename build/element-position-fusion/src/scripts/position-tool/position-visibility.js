let openClosePosArrow = document.getElementById("pos-angle-img");
let mouseIsOnPos = false;

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
