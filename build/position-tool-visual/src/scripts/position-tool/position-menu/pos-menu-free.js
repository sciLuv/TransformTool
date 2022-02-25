function whenFreeIsSelect(){
    goToInitialMenu(selectPos);
    overflowInteruptor();
}

function overflowInteruptor(){
    let interuptorOF = document.getElementById("interuptor");
    let underInteruptorOF = document.getElementById("under-interuptor");

    let startMiddleEnd = "start";
    
    interuptorOF.addEventListener('click', function(){
        if(startMiddleEnd == "start"){
            underInteruptorOF.setAttribute("end","");
            startMiddleEnd = "end";
        }
        else if(startMiddleEnd == "end"){
            underInteruptorOF.removeAttribute("end");
            underInteruptorOF.setAttribute("middle","");
            startMiddleEnd = "middle";
        }
        else{
            underInteruptorOF.removeAttribute("middle");
            startMiddleEnd = "start";
        }
    })

}