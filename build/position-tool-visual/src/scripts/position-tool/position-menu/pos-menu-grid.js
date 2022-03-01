function whenGridIsSelect(){


    let numColumn = document.getElementById("num-column");
    let numLine = document.getElementById("num-line");
    let numRange = document.getElementById("num-range");

    let margeColumn = document.getElementById("marge-column");
    let margeLine = document.getElementById("marge-line");
    let margeRange = document.getElementById("marge-range");

    let sizeColumn = document.getElementById("size-column");
    let sizeLine = document.getElementById("size-line");
    let gridSizeSelect = document.getElementById("size-select")
    let sizeRange = document.getElementById("size-range");

    function initGridDisplay(){
        if(posSetting.display.menu != undefined){
            if(posSetting.display.display == "grid"){
                if(posSetting.display.menu.num == "column"){
                    numRange.value = posSetting.display.columns;
                }
                else{
                    numColumn.removeAttribute("selected");
                    numLine.setAttribute("selected", "");
                    numRange.value = posSetting.display.lines;
                }
                if(posSetting.display.menu.marge == "column"){
                    margeRange.value = posSetting.display.margeColumns;
                }
                else{
                    margeColumn.removeAttribute("selected");
                    margeLine.setAttribute("selected", "");
                    margeRange.value = posSetting.display.margeLines;
                }
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
                    column : {
                        default : 15
                    },
                    line : {
                        default : 15
                    }
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

    function gridNum(){
        numColumn.addEventListener("click", function(){
            numLine.removeAttribute("selected")
            numColumn.setAttribute("selected", "");
            numRange.value = posSetting.display.columns;
            posSetting.display.menu.num = "column";
            if(sizeColumn.hasAttribute("selected")){
                gridSelectModif("columns");
            }
        })
        numLine.addEventListener("click", function(){
            numColumn.removeAttribute("selected")
            numLine.setAttribute("selected", "");
            numRange.value = posSetting.display.lines;
            posSetting.display.menu.num = "line";
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
    function gridMarge(){
        margeColumn.addEventListener("click", function(){
            margeLine.removeAttribute("selected");
            margeColumn.setAttribute("selected", "");
            margeRange.value = posSetting.display.margeColumns;
            posSetting.display.menu.marge = "column";
        })
        margeLine.addEventListener("click", function(){
            margeColumn.removeAttribute("selected");
            margeLine.setAttribute("selected", "");
            margeRange.value = posSetting.display.lines;
            posSetting.display.menu.marge = "line";
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

    function gridSize(){
        sizeColumn.addEventListener("click", function(){
            sizeLine.removeAttribute("selected");
            sizeColumn.setAttribute("selected", "");
            gridSelectModif("columns");
            changeSizeRange();
            posSetting.display.menu.size = "column";
        })
        sizeLine.addEventListener("click", function(){
            sizeColumn.removeAttribute("selected");
            sizeLine.setAttribute("selected", "");
            gridSelectModif("lines");
            changeSizeRange();
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
            changeSizeRange(); 
        })
    }

    function gridSelectModif(columnOrLine){
        gridSizeSelect.innerHTML = "";
        for(i=1; i<=posSetting.display[columnOrLine]; i++){
            let opt = document.createElement("option");
            opt.value = i;
            opt.innerHTML = i;
            gridSizeSelect.appendChild(opt);
        }
    }

    function changeSizeRange(){
        let selectedOption = 1 + (gridSizeSelect.selectedIndex);
        gridSizeSelectSetting = gridSizeSelect.selectedIndex;
        if(sizeColumn.hasAttribute("selected")){
            if(posSetting.display.size.column[selectedOption] != undefined){
                sizeRange.value = posSetting.display.size.column[selectedOption];
            }
            else{
                sizeRange.value = 15;
            }
        }
        else{
            if(posSetting.display.size.line[selectedOption] != undefined){
                sizeRange.value = posSetting.display.size.line[selectedOption];
            }
            else{
                sizeRange.value = 15;
            }
        }
    }

    initGridDisplay();
    gridNum();
    gridMarge();
    gridSize();
    goToInitialMenu(selectPos);
}