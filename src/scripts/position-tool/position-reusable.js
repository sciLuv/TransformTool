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
    if(size > minIF){
        if(range.value < minIF-(size-sizeSpe)){
            diffRange = sizeSpe - (minIF-(size-sizeSpe));
            console.log(sizeSpe - (minIF-(size-sizeSpe)));
        }
        else{
            diffRange = sizeSpe - range.value;
        }
    }
    else if((size < minIF)&&(range.value > minIF-(size-sizeSpe))){
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
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~ IN LINK WITH GRID DISPLAYING ~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
//to put/add cel in underContainer 
function addGridCel(column, line, underContainer){
    underContainer.innerHTML = "";
    let numOfCel = column*line;
    for(i=1; i <= numOfCel; i++){
        underContainer.innerHTML += "<div id='cel-" + i + "' class='cel'></div>"
    }
} 
//to apply style of grid gap to all in-position elem container
function addGridGap(container, underContainer, topContainer, columnOrLine, gap){
    container.style["grid"+ columnOrLine + "Gap"] = gap + "px";
    underContainer.style["grid"+ columnOrLine + "Gap"] = gap + "px";
    topContainer.style["grid"+ columnOrLine + "Gap"] = gap + "px";
}
//in function of the value in posSetting.display, organise the grid with CSS rules
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
}
//this function give to the object posSetting.Display.menu[left|top] information about placement and size of each cel of grid 
function insideCalcGrid(rowOrColNumb, celSizeList, placeTopOrLeft, heightOrWidth, lineOrColumn){
    celSizeList = []; //asign to variable array type or/and emptying arrays of variables to recalculate their content
    
    //global variable use specificly in this function to define DOM element of first row or column of the grid of under-position-elem
    posSetting.display.menu[placeTopOrLeft] = [];


    //this loop select first cel of each row or col an put it on celSizeList array
    for(i=1; i<=rowOrColNumb; i++){
        if(posSetting.display[lineOrColumn] != posSetting.display.margeLines){
            let cel = (columnNumb*(i-1))+1;
            let celDom = document.getElementById("cel-" + cel);
        }
        else{
            let celDom = document.getElementById("cel-" + i);
            celSizeList.push(celDom)
        }
    }
    //this loop find the size of cels and put the information in an array in posSetting.display.menu[left|top]
    for(i=1; i<=celSizeList.length; i++){
        let cel = window.getComputedStyle(celSizeList[i-1]).getPropertyValue(heightOrWidth);
        let celSize = Number(cel.split("px").shift())+2;
        if(i>1){
            celSize += posSetting.display.menu[placeTopOrLeft][i-2];
            celSize += Number(posSetting.display[lineOrColumn]);
            celSize = Math.round(celSize*100)/100;
        }
        posSetting.display.menu[placeTopOrLeft].push(celSize);
    }
    posSetting.display.menu[placeTopOrLeft].unshift(0);
}
//calcGrid exe insideCalcGrid twice, (for line and column), and calcElemPlace. use to place less code in other part of the program
function calcGrid(){
    rowNumb = window.getComputedStyle(underElemsContainer).getPropertyValue("grid-template-rows").split(" ").length;
    columnNumb = window.getComputedStyle(underElemsContainer).getPropertyValue("grid-template-columns").split(" ").length;
    insideCalcGrid(rowNumb, gridRowCelSizeList, "top", "height", "margeLines");
    insideCalcGrid(columnNumb, gridColumnCelSizeList, "left" , "width", "margeColumns");
    calcElemCelPlace();
}
//calcElemCelPlace is use in calcGrid and the click event of the more btn of the element tool.
//use for find place of new elem in a grid display, in function of the place of other element already here.
function calcElemCelPlace(){
    if(posSetting.display.display == "grid"){ 
        //loop of all element for select specificly the last element, with the next condition 
        for(i=0; i<=elemList.length-1; i++){
            if(i+1==elemList.length){
                //this condition is here for when this function is use in link of function of redefining the display place,
                //in this way, once the elem has is place it can't be change again. in end of the loop .use is true
                if(gridIFList[i].use == false){
                    //variables for representation of differentes part of the css rule "grid-area"
                    topCel = 1;
                    bottomCel = 2;
                    leftCel = 1;
                    rightCel = 2;
                    //array to push futur variable of elem take place for the new elem's already selected place
                    let isTopEmpty = [];
                    //this loop is for select all elem except the last one (the elem for which we search now the place)
                    for(j=0; j<=elemList.length-2; j++){
                        //if the left side of the item we are comparing have the same value of the left actual value of assigniation
                        if(elemList[j].grid.left == leftCel){
                            //if top and bottom side of item we are comparing have the same value of the top and bottom actual value of assigniation
                            if((elemList[j].grid.top == topCel)||((elemList[j].grid.top < topCel)&&(elemList[j].grid.bottom >= bottomCel))){
                                //add to the isTopEmpty array the Right Side of the elem Selected in lasts conditions
                                isTopEmpty.push(elemList[j].grid.right);
                            }
                        }
                        //this is selected the second to last elem before to process the rest of place selection of the last elem 
                        //in this way the array isTopEmpty is completed
                        if(j == elemList.length-2){
                            //if the place is already take (if isTopEmpty is not empty)
                            if(isTopEmpty.length > 0){
                                //if the empty value is superior of the number of column, change value of top/left/bottom/right 
                                //in this way change the row selected 
                                if(isTopEmpty == columnNumb+1){
                                    console.log(isTopEmpty);
                                    topCel++;
                                    bottomCel++;
                                    leftCel = 1;
                                    rightCel = 2;
                                }
                                //if the value is different but not superior of the number of column change just left and right 
                                //in this way change to the next cel not test in the same row.
                                else{
                                    let newLeft = Math.max(...isTopEmpty);
                                    leftCel = newLeft;
                                    rightCel = newLeft+1;
                                }
                                //this two new value give to go back in beginning of the loop
                                j = -1;
                                isTopEmpty = [];
                            }
                            //condition when elem take already all places in the grid, place the elem by default in 1/1/2/2
                            else if((bottomCel > rowNumb+1)||(rightCel > columnNumb+1)){
                                topCel = 1;
                                bottomCel = 2;
                                 leftCel = 1;
                                rightCel = 2;  
                                console.log("prout");  
                            }
                        }
                    }
                    //this apply change selected before to elem object
                    elemList[i].grid.left = leftCel; 
                    elemList[i].grid.right = rightCel;
        
                    elemList[i].grid.top = topCel;
                    elemList[i].grid.bottom = bottomCel;

                    gridIFList[i].use = true;   
                }
            }
            //give to sizing and placing html elem caracteristic selected before
            document.getElementById(elemList[i].id.name).style.gridArea = elemList[i].grid.top + "/" + elemList[i].grid.left + "/" + elemList[i].grid.bottom + "/" + elemList[i].grid.right;
            document.getElementById(elemList[i].id.name).style.width = "auto";
            document.getElementById(elemList[i].id.name).style.height = "auto";
            //give to html elem caracteristic selected before
            document.getElementById("if-" + elemList[i].id.name).style.gridArea = elemList[i].grid.top + "/" + elemList[i].grid.left + "/" + elemList[i].grid.bottom + "/" + elemList[i].grid.right;
            document.getElementById("if-" + elemList[i].id.name).style.width = "auto";
            document.getElementById("if-" + elemList[i].id.name).style.height = "auto";
        }
    }
}
//use to calculate the place of the position-elem-container to the top and the left, in a grid displaying context
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

function reSizingGridPlacementElem(){}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~ IN LINK WITH CREATESIZE(), THE IN-POSITION SIZING FUNCTION ~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

//use to change size of elem, in the event in link with interaction's size button in context of NONE grid displaying. parameter : 
//elemNum = elemNum (iteration of inPosition's loop)
//placement = event.clientX or Y/ widthOrHeight = "height" or "width"/ initialPlacement = initialWidth2Placement initialHeight2Placement, ect..
function NoGridSizingCalc(elemNum, placement, widthOrHeight, initialPlacement){
    //condition for size growing 
    if(placement > initialPlacement){
        elemList[elemNum].size[widthOrHeight] += (placement - initialPlacement); 
    }
    //condition for size minimised
    if(placement < initialPlacement){
        elemList[elemNum].size[widthOrHeight] -= (initialPlacement - placement);
    }
    //apply to HTML changement do in representative object
    document.getElementById(elemList[sizeIFList[elemNum][widthOrHeight].num].id.name).style[widthOrHeight] = elemList[sizeIFList[elemNum][widthOrHeight].num].size[widthOrHeight] + "px";
    document.getElementById("if-" + elemList[sizeIFList[elemNum][widthOrHeight].num].id.name).style[widthOrHeight] = elemList[sizeIFList[elemNum][widthOrHeight].num].size[widthOrHeight] + "px";
}

//use to change size of elem, in the event in link with interaction's size button in context of grid displaying. parameter : 
//elemNum = elemNum (iteration of inPosition's loop)
//placement = event.clientX or Y/ widthOrHeight = "height" or "width"/ rowOrColPlaces = rowsPlaces or columnsPlaces (array) / side = "top", "left", ect...
function gridSizingCalc(elemNum, widthOrHeight, placement, rowOrColPlaces, side){
    gridIFList[sizeIFList[elemNum][widthOrHeight].num].use = true;
    for(i=0; i<=rowOrColPlaces.length-1; i++){
        if(placement >= rowOrColPlaces[i]){
            elemList[elemNum].grid[side] = i+1;
        }
    }
}