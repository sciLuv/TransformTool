function createColor(){
    for(i=0; i<= elements.length-1; i++){
        //represente le nombre de modules de corner (1 pour chaque module d'element)
        let ColorModNum = i;
        let opaNum = (ColorModNum*4);
    
        let beforColor = Math.floor(Math.random() * 16777215).toString(16);
        let colorElem = "#" + ("000000" + beforColor).slice(-6);

        colorModList[ColorModNum] = {
            hue : colorElem,
            opacity : 100
        }
        colors[ColorModNum].addEventListener("input", function(){
            colorModList[ColorModNum].hue = colors[ColorModNum].value;
            color(ColorModNum);
        })
        opacityButtonList[opaNum].opacityRange.addEventListener("input", function(){
        colorModList[ColorModNum].opacity = opacityButtonList[opaNum].opacityRange.value;
        color(ColorModNum);
        })
    }
}
