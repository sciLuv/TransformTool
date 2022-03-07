function whenGridIsSelect(){
    //element interaction of the number of lines or column in a grid display 
    let numColumn = document.getElementById("num-column");
    let numLine = document.getElementById("num-line");
    let numRange = document.getElementById("num-range");

    //element interaction of the size of the marges of lines or column in a grid display 
    let margeColumn = document.getElementById("marge-column");
    let margeLine = document.getElementById("marge-line");
    let margeRange = document.getElementById("marge-range");

    //element interaction of the size of each lines or column in a grid display 
    let sizeColumn = document.getElementById("size-column");
    let sizeLine = document.getElementById("size-line");
    let gridSizeSelect = document.getElementById("size-select")
    let sizeRange = document.getElementById("size-range");

    //to init the grid menu and its selectio in function of object of grid value
    function initGridDisplay(){
        if(posSetting.display.menu != undefined){
            if(posSetting.display.display == "grid"){
                initNumAndColumn("num", numColumn, numLine, numRange, "columns", "lines");
                initNumAndColumn("marge", margeColumn, margeLine, margeRange, "margeColumns", "margeLines");
                if(posSetting.display.menu.size == "line"){
                    sizeColumn.removeAttribute("selected");
                    sizeLine.setAttribute("selected", "");
                    gridSelectModif("lines");
                } 
                else{
                    gridSelectModif("columns");
                }
            }
        }
        else{
            posSetting.display = {
                display : "grid",
                columns : 4, 
                lines : 4, 
                margeColumns : 0, 
                margeLines : 0,
                size : {
                    column : {  default : 15  },
                    line :   {  default : 15  }
                },
                menu : {
                    num : "column",
                    marge : "column",
                    size: "column",
                    sizeSelect : 1
                } 
            }
        }
    }
    //init num and marge section of the grid menu is relatively similar, so a function to reduce code. PARAMETER : 
    //menu = menu "num" or "marge" //column, line, range = selection element of the part of the grid menu (ex : margeColumn)
    //displayColumn, displayLine to give to the range the actual value of the column or the line
    function initNumAndColumn(menu, column, line, range, displayColumn, displayLine){
        if(posSetting.display.menu[menu] == "column"){
            range.value = posSetting.display[displayColumn];
        }
        else{
            column.removeAttribute("selected");
            line.setAttribute("selected", "");
            range.value = posSetting.display[displayLine];
        }
    }

    //event to remove/add select attribut to the btn column/line num, and the range , change value of the num of column and line
    function gridNum(){
        numColumn.addEventListener("click", function(){
            chgtRangeAndMenu(numLine, numColumn, numRange, "columns", "num", "column");
            if(sizeColumn.hasAttribute("selected")){
                gridSelectModif("columns");
            }
        })
        numLine.addEventListener("click", function(){
            chgtRangeAndMenu(numColumn, numLine, numRange, "lines", "num", "line");
            if(sizeLine.hasAttribute("selected")){
                gridSelectModif("lines");
            }
        })
        numRange.addEventListener("input", function(){
            if(numColumn.hasAttribute("selected")){
                posSetting.display.columns = numRange.value;
                if(sizeColumn.hasAttribute("selected")){
                    gridSelectModif("columns");
                }
            }
            else{
                posSetting.display.lines = numRange.value;
                if(sizeLine.hasAttribute("selected")){
                    gridSelectModif("lines");
                }
            }
        })
    }
    //event to remove/add select attribut to the btn column/line marge, and the range, change value of the marge of column and line
    function gridMarge(){
        margeColumn.addEventListener("click", function(){
            chgtRangeAndMenu(margeLine, margeColumn, margeRange, "margeColumns", "marge", "column");
        })
        margeLine.addEventListener("click", function(){
            chgtRangeAndMenu(margeColumn, margeLine, margeRange, "margeLines", "marge", "line");
        })
        margeRange.addEventListener("input", function(){
            if(margeColumn.hasAttribute("selected")){
                posSetting.display.margeColumns = margeRange.value;
            }
            else{
                posSetting.display.margeLines = margeRange.value;
            }
        })
    }
    //event to remove/add select attribut to the btn column/line size, and the range, change value of the size of column and line
    function gridSize(){
        sizeColumn.addEventListener("click", function(){
            columnOrLineSelect(sizeLine, sizeColumn);
            gridSelectModif("columns");
            chgtSizeRange();
            posSetting.display.menu.size = "column";
        })
        sizeLine.addEventListener("click", function(){
            columnOrLineSelect(sizeColumn, sizeLine);
            gridSelectModif("lines");
            chgtSizeRange();
            posSetting.display.menu.size = "line";
        })
        sizeRange.addEventListener("input",function(){
            let sizeSelected = sizeRange.value;
            if(sizeColumn.hasAttribute("selected")){
                let columnSelected = 1 + (gridSizeSelect.selectedIndex);
                posSetting.display.size.column[columnSelected] = sizeSelected;
            }
            else{
                let lineSelected = 1 + (gridSizeSelect.selectedIndex);
                posSetting.display.size.line[lineSelected] = sizeSelected;
            }
        })
        gridSizeSelect.addEventListener("change", function(){
            chgtSizeRange(); 
        })
    }
    //in link with the size part of the menu. allow to add or remove option in the select element in function of the number of column or line
    function gridSelectModif(columnOrLine){
        gridSizeSelect.innerHTML = "";
        for(i=1; i<=posSetting.display[columnOrLine]; i++){
            let opt = document.createElement("option");
            opt.value = i;
            opt.innerHTML = i;
            gridSizeSelect.appendChild(opt);
        }
    }

    //use in gridSelectModif and gridSize, to add and remove select graphic attribut to btn if user select "column" or "line" btn
    function columnOrLineSelect(axisBtnRemove, axisBtnSet){
        axisBtnRemove.removeAttribute("selected");
        axisBtnSet.setAttribute("selected", "");
    };
    //une in gridNum and gridMarge, in their part of remove/set select graphic attribut of btn, change value of range in function of btn line/column select
    //use columnOrLineSelect too. PARAMETER : 
    //axisBtnRemove, axisBtnSet, range = represent part of interaction element of the part of menu (ex : margeColumn)
    //axisObject = "columns" or "lines", represent the part of the display object of the selected axis
    //menuPart = "num" or "marge" selection in the menu representation object/ lineOrColumn represente the value of the menu object (column, or line)
    function chgtRangeAndMenu(axisBtnRemove, axisBtnSet, range, axisObject, menuPart, lineOrColumn){
        columnOrLineSelect(axisBtnRemove, axisBtnSet);
        range.value = posSetting.display[axisObject];
        posSetting.display.menu[menuPart] = lineOrColumn;
    }

    //change the value of the size range in function of the column or the line selected in the select element and his option (ex line 3)
    function chgtSizeRange(){
        let selectedOption = 1 + (gridSizeSelect.selectedIndex);
        gridSizeSelectSetting = gridSizeSelect.selectedIndex;
        if(sizeColumn.hasAttribute("selected")){
            chgtSizeColumnLine("column");
        }
        else{
            chgtSizeColumnLine("line");
        }
    }
    //for less code, function for avoid repeating code in chgtSizeRange()
    function chgtSizeColumnLine(columnOrLine){
        if(posSetting.display.size[columnOrLine][selectedOption] != undefined){
            sizeRange.value = posSetting.display.size[columnOrLine][selectedOption];
        }
        else{
            sizeRange.value = 15;
        }
    }

    //use of all fonction create before for a operationnal free menu
    initGridDisplay();
    gridNum();
    gridMarge();
    gridSize();
    goToInitialMenu(selectPos);
}