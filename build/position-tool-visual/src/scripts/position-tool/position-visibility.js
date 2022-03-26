function posIsVisibleOrNot(){
    position.addEventListener("mouseover", function(){
        position.style.opacity = "1";
    })
    position.addEventListener("mouseleave", function(){
        position.style.opacity = "0";
    })
}
posIsVisibleOrNot();
