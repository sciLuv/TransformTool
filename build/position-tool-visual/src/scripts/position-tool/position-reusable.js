let posIFWidthMin = 244;
let posIFHeightMin = 150;

let topPosition = 200;
let leftPosition = 200;

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

//functions for grid
function addGridCel(column, line, underContainer){
    underContainer.innerHTML = "";
    let numOfCel = column*line;
    for(i=1; i <= numOfCel; i++){
        underContainer.innerHTML += "<div id='cel-" + i + "' class='cel''></div>"
    }
} 
function addGridGap(container, underContainer, columnOrLine, gap){
    container.style["grid"+ columnOrLine + "Gap"] = gap + "px";
    underContainer.style["grid"+ columnOrLine + "Gap"] = gap + "px";
}

function addGridColLine(container, underContainer, columnsOrLines, columnOrLine, num){
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
    }
    else{
        container.style["gridTemplate" + columnsOrLines] = GridTemplateVal;
        underContainer.style["gridTemplate" + columnsOrLines] = GridTemplateVal;
    }
    console.log(GridTemplateVal);
}


