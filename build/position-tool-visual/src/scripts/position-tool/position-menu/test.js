numColumn.addEventListener("click", function(){
    numLine.removeAttribute("selected")
    numColumn.setAttribute("selected", "");
    numRange.value = posSetting.display.columns;
    posSetting.display.menu.num = "column";

    if(sizeColumn.hasAttribute("selected")){
        gridSelectModif("columns");
    }
})
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
numLine.addEventListener("click", function(){
    numColumn.removeAttribute("selected")
    numLine.setAttribute("selected", "");
    numRange.value = posSetting.display.lines;
    posSetting.display.menu.num = "line";

    if(sizeLine.hasAttribute("selected")){
        gridSelectModif("lines");
    }
})
///////////////////////////////////////////////////////////
margeColumn.addEventListener("click", function(){
    margeLine.removeAttribute("selected");
    margeColumn.setAttribute("selected", "");
    margeRange.value = posSetting.display.margeColumns;
    posSetting.display.menu.marge = "column";
})
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
margeLine.addEventListener("click", function(){
    margeColumn.removeAttribute("selected");
    margeLine.setAttribute("selected", "");
    margeRange.value = posSetting.display.lines;
    posSetting.display.menu.marge = "line";
})
///////////////////////////////////////////////////////////
sizeColumn.addEventListener("click", function(){
    sizeLine.removeAttribute("selected");
    sizeColumn.setAttribute("selected", "");
    gridSelectModif("columns");
    changeSizeRange();
    posSetting.display.menu.size = "column";
})
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
sizeLine.addEventListener("click", function(){
    sizeColumn.removeAttribute("selected");
    sizeLine.setAttribute("selected", "");
    gridSelectModif("lines");
    changeSizeRange();
    posSetting.display.menu.size = "line";
})

function columnOrLineSelect(axisBtnRemove, axisBtnSet){
    axisBtnRemove.removeAttribute("selected");
    axisBtnSet.setAttribute("selected", "");
};

function chgtRangeAndMenu(axisBtnRemove, axisBtnSet, range, axisObject, menuPart, lineOrColumn){
    columnOrLineSelect(axisBtnRemove, axisBtnSet);
    range.value = posSetting.display[axisObject];
    posSetting.display.menu[menuPart] = lineOrColumn;
}

chgtRangeAndMenu(numColumn, numLine, numRange, "columns", "num", "column");
chgtRangeAndMenu(numLine, numColumn, numRange, "lines", "num", "line");
chgtRangeAndMenu(margeColumn, margeLine, margeRange, "margeColumns", "marge", "column");
chgtRangeAndMenu(margeLine, margeColumn, margeRange, "margeLines", "marge", "line");

columnOrLineSelect(sizeLine, sizeColumn);
columnOrLineSelect(sizeColumn, sizeLine);
