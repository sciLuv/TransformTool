let idNames = document.getElementsByClassName("text-id");
let colors = document.getElementsByClassName("color-element-input");

colorModuleList = [];

function createColor(){
    for(i=0; i<= idNames.length-1; i++){
        //represente le nombre de modules de corner (1 pour chaque module d'element)
        let idColorModuleNumber = i;
        let opacityNumber = (idColorModuleNumber*4);
    
        colorModuleList[idColorModuleNumber] = {
            hue : "#009DFF",
            opacity : 100
        }
        colors[idColorModuleNumber].addEventListener("input", function(){
            colorModuleList[idColorModuleNumber].hue = colors[idColorModuleNumber].value;
        })
        opacityButtonList[opacityNumber].opacityRange.addEventListener("input", function(){
            colorModuleList[idColorModuleNumber].opacity = opacityButtonList[opacityNumber].opacityRange.value;
        })
    }
}
