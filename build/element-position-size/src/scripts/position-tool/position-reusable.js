//change the position-interface display
function changePosIFDisplay(){
    posIF.removeAttribute("block");
    posIF.removeAttribute("inline");
    posIF.removeAttribute("inline-block");
    posIF.removeAttribute("flex");
    posIF.removeAttribute("grid");

    posIF.setAttribute(posSetting.display.display, "");
}

//function to reinitialize style of container 
function reInitContainerStyle(){
    if(posSetting.display.display == "flex"){
        console.log("test1");
        topElemsContainer.style.flexDirection = null;
        topElemsContainer.style.flexWrap = null;
        topElemsContainer.style.justifyContent = null;
        topElemsContainer.style.alignContent = null;
        topElemsContainer.style.alignItems = null;

        elemsContainer.style.flexDirection = null;
        elemsContainer.style.flexWrap = null;
        elemsContainer.style.justifyContent = null;
        elemsContainer.style.alignContent = null;
        elemsContainer.style.alignItems = null;
    }
    else if(posSetting.display.display == "grid"){
        console.log("test2");
        topElemsContainer.style.display = null;
        topElemsContainer.style.gridTemplateColumns = null;
        topElemsContainer.style.gridTemplateRows = null;
        topElemsContainer.style.gridColumnGap = null;
        topElemsContainer.style.gridRowGap = null;

        elemsContainer.style.gridTemplateColumns = null;
        elemsContainer.style.gridTemplateRows = null;
        elemsContainer.style.gridColumnGap = null;
        elemsContainer.style.gridRowGap = null;

        underElemsContainer.style.display = null;
        underElemsContainer.style.gridTemplateColumns = null;
        underElemsContainer.style.gridTemplateRows = null;
        underElemsContainer.style.gridColumnGap = null;
        underElemsContainer.style.gridRowGap = null;

        underElemsContainer.innerHTML = "";
    }
}

//function for size part of the position menu (size, padding and margin) and changing of the
function posIFAutoPlaceAndSize(size, sizeSpe, minIF, range, positionWindow){
    let diffRange = 0;
    console.log("size : " +  size + " sizeSpe : " + sizeSpe + " minIF : " + minIF + " range : " + range.value + " positionWindow : " + positionWindow );
    if(size > minIF){
        console.log("test1");
        if(range.value < minIF-(size-sizeSpe)){
            console.log("test2");
            diffRange = sizeSpe - (minIF-(size-sizeSpe));
            console.log(sizeSpe - (minIF-(size-sizeSpe)));
        }
        else{
            console.log("test3");
            diffRange = sizeSpe - range.value;
        }
    }
    else if((size < minIF)&&(range.value > minIF-(size-sizeSpe))){
        console.log("test4");
            diffRange = (minIF-(size-sizeSpe)) - range.value;  
    }
    leftPosition = Number(leftPosition) + Number(diffRange);
    position.style[positionWindow] = leftPosition + "px";
}
function posIFHeightCSS(size, posIF){
    if(size <= 112){
        posIF.style.height = "152px";
    }
    else{
        posIF.style.height = null;
    }
}
//functions for grid
function addGridCel(column, line, underContainer){
    underContainer.innerHTML = "";
    let numOfCel = column*line;
    for(i=1; i <= numOfCel; i++){
        underContainer.innerHTML += "<div id='cel-" + i + "' class='cel''></div>"
    }
} 
function addGridGap(container, underContainer, topContainer, columnOrLine, gap){
    container.style["grid"+ columnOrLine + "Gap"] = gap + "px";
    underContainer.style["grid"+ columnOrLine + "Gap"] = gap + "px";
    topContainer.style["grid"+ columnOrLine + "Gap"] = gap + "px";
}
function addGridColLine(container, underContainer, topContainer, columnsOrLines, columnOrLine, num){
    let GridTemplateVal = ""; 
    let specificTemplateVal = false;
    let lastSpecificTemplateVal = 0;

    for(i=1; i<=num; i++){
        if(posSetting.display.size[columnOrLine][i] != undefined){
            if(i == 1){
                GridTemplateVal += posSetting.display.size[columnOrLine][i] + "fr";
                specificTemplateVal = true;
                lastSpecificTemplateVal = 1;
            }
            else{    
                if(lastSpecificTemplateVal == (i-1)){
                    GridTemplateVal += " " + posSetting.display.size[columnOrLine][i] + "fr";
                }
                else{
                    GridTemplateVal += " repeat(" + ((i-1)-lastSpecificTemplateVal) + ", " + posSetting.display.size[columnOrLine].default + "fr) " + posSetting.display.size[columnOrLine][i] + "fr";
                }
                specificTemplateVal = true;
                lastSpecificTemplateVal = i;
            }
        }
        if((i == num)&&(lastSpecificTemplateVal != num)){
            if(lastSpecificTemplateVal == (num-1)){
                GridTemplateVal += " " + posSetting.display.size[columnOrLine].default + "fr"
            }
            else{
                GridTemplateVal += " repeat(" + (i-lastSpecificTemplateVal) + ", " + posSetting.display.size[columnOrLine].default + "fr) "
            }
        }
    }
    if(specificTemplateVal == false){
        GridTemplateVal = "repeat("+ num +", 15fr)"
        container.style["gridTemplate" + columnsOrLines] = "repeat("+ num +", 15fr)";
        underContainer.style["gridTemplate" + columnsOrLines] = "repeat("+ num +", 15fr)";
        topContainer.style["gridTemplate" + columnsOrLines] = "repeat("+ num +", 15fr)";
    }
    else{
        container.style["gridTemplate" + columnsOrLines] = GridTemplateVal;
        underContainer.style["gridTemplate" + columnsOrLines] = GridTemplateVal;
        topContainer.style["gridTemplate" + columnsOrLines] = GridTemplateVal;
    }
    console.log(GridTemplateVal);
}