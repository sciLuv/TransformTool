//hexToRGB is used in all updatePos(position file in gulp mode) inside function to associate value of color and value of opacity
function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha/100 + ")";
}

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
        underContainer.innerHTML += "<div id='cel-" + i + "' class='cel'></div>"
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

let gridRowCelSizeList;
let gridColumnCelSizeList;

let rowNumb;
let columnNumb;

function calcGrid(){
    gridRowCelSizeList = [];
    gridColumnCelSizeList = [];

    posSetting.display.menu.top = [];
    posSetting.display.menu.left = [];

    rowNumb = window.getComputedStyle(underElemsContainer).getPropertyValue("grid-template-rows").split(" ").length;
    columnNumb = window.getComputedStyle(underElemsContainer).getPropertyValue("grid-template-columns").split(" ").length;

    for(i=1; i<=rowNumb; i++){
        let cel = (columnNumb*(i-1))+1;
        let celDom = document.getElementById("cel-" + cel);
        gridRowCelSizeList.push(celDom);
    } 
    for(i=1; i<=columnNumb; i++){
        let celDom = document.getElementById("cel-" + i);
        gridColumnCelSizeList.push(celDom)
    }

    for(i=1; i<=gridRowCelSizeList.length; i++){
        let cel = window.getComputedStyle(gridRowCelSizeList[i-1]).getPropertyValue("height");
        let celSize = Number(cel.split("px").shift())+2;
        if(i>1){
            celSize += posSetting.display.menu.top[i-2];
            celSize += Number(posSetting.display.margeLines);
            celSize = Math.round(celSize*100)/100;
        }
        posSetting.display.menu.top.push(celSize);
    }
    posSetting.display.menu.top.unshift(0)

    for(i=1; i<=gridColumnCelSizeList.length; i++){
        let cel = window.getComputedStyle(gridColumnCelSizeList[i-1]).getPropertyValue("width");
        let celSize = Number(cel.split("px").shift())+2;
        if(i>1){
            celSize += posSetting.display.menu.left[i-2];
            celSize += Number(posSetting.display.margeColumns);
            celSize = Math.round(celSize*100)/100;
        }
        posSetting.display.menu.left.push(celSize);
    }
    posSetting.display.menu.left.unshift(0);
    calcElemCelPlace();
}

function calcElemCelPlace(){
    if(elemList.length <= (columnNumb*rowNumb)){
        
        let leftCel = 1;
        let rightCel = 2;

        let topCel = 1;
        let bottomCel = 2;

        for(i=0; i<=elemList.length-1; i++){
            console.log(gridIFList[i]);
            console.log(i + "elem");
            /*if(gridIFList[i] != undefined){
                if((gridIFList[i].use == false)){*/
                    elemList[i].grid.left = leftCel; 
                    elemList[i].grid.right = rightCel;
        
                    elemList[i].grid.top = topCel;
                    elemList[i].grid.bottom = bottomCel;
        
                    if(leftCel == columnNumb){ leftCel = 1; rightCel = 2; topCel++; bottomCel++}
                    else{ leftCel++; rightCel ++;}
        
                    document.getElementById(elemList[i].id.name).style.gridArea = elemList[i].grid.top + "/" + elemList[i].grid.left + "/" + elemList[i].grid.bottom + "/" + elemList[i].grid.right;
                    document.getElementById(elemList[i].id.name).style.width = "auto";
                    document.getElementById(elemList[i].id.name).style.height = "auto";
                
                    document.getElementById("if-" + elemList[i].id.name).style.gridArea = elemList[i].grid.top + "/" + elemList[i].grid.left + "/" + elemList[i].grid.bottom + "/" + elemList[i].grid.right;
                    document.getElementById("if-" + elemList[i].id.name).style.width = "auto";
                    document.getElementById("if-" + elemList[i].id.name).style.height = "auto";
                    /*
                }
            }*/
        }
    }
}

let inPositionPaddingTop = document.getElementsByClassName("horizon-padding");
let inPositionPaddingLeft = document.getElementsByClassName("vertical-padding");
function inPositionPlacement(){
    if(posSetting.display.display == "grid"){
        let inPositionPaddingTopHeight = Number(window.getComputedStyle(inPositionPaddingTop[0]).getPropertyValue("height").replace("px",""));
        let inPositionPaddingTopBorderHeight = Number(window.getComputedStyle(posIF).getPropertyValue("border-top").split(" ")[0].replace("px",""));
        let posToolTitleHeight = Number(window.getComputedStyle(posToolTitle).getPropertyValue("height").replace("px",""));
        let posToolTitleBorderHeight = Number(window.getComputedStyle(posToolTitle).getPropertyValue("border-top").split(" ")[0].replace("px",""));
        posSetting.display.menu.clientTop = topPosition + inPositionPaddingTopHeight + inPositionPaddingTopBorderHeight + posToolTitleHeight + posToolTitleBorderHeight + Number(posSetting.size.margin.top) + Number(posSetting.size.padding.top);
    
    
        let inPositionPaddingLeftWidth = Number(window.getComputedStyle(inPositionPaddingLeft[0]).getPropertyValue("width").replace("px",""));
        let inPositionPaddingLeftBorderWidth = Number(window.getComputedStyle(posIF).getPropertyValue("border-left").split(" ")[0].replace("px",""));
        posSetting.display.menu.clientLeft = leftPosition + inPositionPaddingLeftWidth + inPositionPaddingLeftBorderWidth + Number(posSetting.size.margin.left) + Number(posSetting.size.padding.left);
    }
}
