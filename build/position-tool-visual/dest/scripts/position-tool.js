let beforeBody = document.getElementsByTagName("body");
let body = beforeBody[0];

let position = document.getElementById("position");
let elemsContainer = document.getElementById("position-elems-container");
let positionMove = document.getElementById("position-move");

let moreBtn2 = document.getElementById("btn-more-tool");
let lessBtns = document.getElementsByClassName("element-bar-trash")


//let applyDesign = setInterval(updatePos,70);

function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha/100 + ")";
}

/*
function updatePos(){
    elemsContainer.innerHTML = ""
    if(elemList.length > 0){
        for(i=0; i<=elemList.length-1; i++){
            let box = "";
            let shader = "";
            elemsContainer.innerHTML += "<div class='in-position' id=" + elemList[i].id.name + "></div>";
            let elem = document.getElementById(elemList[i].id.name);
            //color
            elem.style.backgroundColor =  hexToRGB(elemList[i].color.hue, elemList[i].color.opacity);
            //shader
            if(elemList[i].shader.length >= 2){
                for(j=0; j<= elemList[i].shader.length-1; j++){
                    if(j == 0){
                        if(elemIFList[i].shader.interuptor == true){
                            shader += elemList[i].shader[j].gradient + "-gradient(circle, ";
                        }
                        else{
                            shader += elemList[i].shader[j].gradient + "-gradient(" + elemList[i].shader[j].degree + "deg, ";
                        }
                        shader += hexToRGB(elemList[i].shader[j].color.hue, elemList[i].shader[j].color.opacity) + " " + elemList[i].shader[j].placement + "%, ";
                    }
                    else if(j == elemList[i].shader.length-1){
                        shader += hexToRGB(elemList[i].shader[j].color.hue, elemList[i].shader[j].color.opacity) + " " + elemList[i].shader[j].placement + "%)";
                    }
                    else{
                        shader += hexToRGB(elemList[i].shader[j].color.hue, elemList[i].shader[j].color.opacity) + " " + elemList[i].shader[j].placement + "%, ";
                    } 
                }
                elem.style.background = shader;
            }
            //corner
            elem.style.borderRadius = elemList[i].corner.topLeft + "% " + elemList[i].corner.topRight + "% " + elemList[i].corner.bottomRight + "% " + elemList[i].corner.bottomLeft + "%";
            //border
            elem.style.borderTop = hexToRGB(elemList[i].border.top.color.hue, elemList[i].border.top.color.opacity) + " " + elemList[i].border.top.style + " " + elemList[i].border.top.size + "px";
            elem.style.borderLeft = hexToRGB(elemList[i].border.left.color.hue, elemList[i].border.left.color.opacity) + " " + elemList[i].border.left.style + " " + elemList[i].border.left.size + "px";
            elem.style.borderRight = hexToRGB(elemList[i].border.right.color.hue, elemList[i].border.right.color.opacity) + " " + elemList[i].border.right.style + " " + elemList[i].border.right.size + "px";
            elem.style.borderBottom = hexToRGB(elemList[i].border.bottom.color.hue, elemList[i].border.bottom.color.opacity) + " " + elemList[i].border.bottom.style + " " + elemList[i].border.bottom.size + "px";
            //box
            for(j=0; j<= elemList[i].box.length-1; j++){
                let inset = ""
                if(elemList[i].box[j].inset){
                    inset = "inset ";
                }
                if(j == 0){
                   box += inset + elemList[i].box[j].offset.x + "px " + elemList[i].box[j].offset.y + "px " + elemList[i].box[j].radius.blur + "px " + elemList[i].box[j].radius.spread + "px " + hexToRGB(elemList[i].box[j].color.hue, elemList[i].box[j].color.opacity);
                }
                else{
                    box += ", " + inset + elemList[i].box[j].offset.x + "px " + elemList[i].box[j].offset.y + "px " + elemList[i].box[j].radius.blur + "px " + elemList[i].box[j].radius.spread + "px " + hexToRGB(elemList[i].box[j].color.hue, elemList[i].box[j].color.opacity);
                }
            }
            elem.style.boxShadow = box;
        }
    }
}
*/

//boolean : false = moving is inactivate
let posPlaceActive = false;
let posInitPlaceX, posInitPlaceY;

positionMove.addEventListener("mousedown", function(event){
    posMousePlace = event.target.getBoundingClientRect();
    posInitPlaceX =  event.pageX - (posMousePlace.left + (event.pageX - event.clientX));
    posInitPlaceY =  event.pageY - (posMousePlace.top + (event.pageY - event.clientY));
    posPlaceActive = true;

    position.setAttribute("active","");
})
//Event for beginning the element-window moving,
positionMove.addEventListener("mouseup", function(event){
    posPlaceActive = false;
    position.removeAttribute("active");
})

//Event for ending the element-window moving,
body.addEventListener('mouseup', function(event){
    if(posPlaceActive == true){
        body.removeAttribute("active");
        position.removeAttribute("active");
        posPlaceActive = false;
    }
})
//Event for calculate and applicate move
body.addEventListener('mousemove', function(event){
    if(posPlaceActive == true){
        position.style.left = Math.round(event.pageX - posInitPlaceX) + "px";
        //console.log(Math.round((event.clientX - posInitPlaceX)/10)*10 + "px");
        position.style.top = Math.round(event.pageY - posInitPlaceY) + "px";
    }
})

//JS representation of the opener btn of the position menu
let posOpener = document.getElementById("pos-angle");
//JS representation of the tool position title container (contain "position tool title" and the opener menu btn)
let posToolTitle = document.getElementById("position-menu-opener");
//JS representation of the position menu container
let posMenu = document.getElementById("position-menu");
//JS representation of the position menu content
let posMenuContent = document.getElementById("pos-menu-content");

//if menu is open this variable is true
let posToolOpen = false;

//Event for give specific attribut to the opener and the tool title 
//in function of there opening and closing 
posOpener.addEventListener("click", function(){
    if(posToolOpen == false){
        posToolOpen = true;
        posToolTitle.setAttribute("active", ""); 
        posMenu.setAttribute("active", ""); 
        posMenuContent.removeAttribute("inactive");
    }
    else{
        posToolOpen = false;
        posToolTitle.removeAttribute("active");
        posMenu.removeAttribute("active");
        let inativeposMenuContent = window.setTimeout(inativationContent, 300);
    }
})
//exclusively use in the Event just before 
//for give specific attribut for few ms to the position menu content
function inativationContent(){
    posMenuContent.setAttribute("inactive", "");
}

//variable for the position tool menu change innerHTML and associate css 
//in function of selection (flex basic ect) 
let selectPos = "none";

let lastSelectPosMenu;
let lastSelectPosMenuDisplay;

//object contain all variable set in the menu for application on the element's container
let posSetting = {
    free : {
        position: "none",
        zIndex : 0,
        overflow : "visible"
    },
    size : {
        width : 100,
        height : 100,
        padding : {
            top : 0, bottom : 0,
            left : 0, right : 0
        },
        margin : {
            top : 0, bottom : 0,
            left : 0, right : 0
        }
    },
    display : { display : "block"}
}

//next 5variables declare in global scope to be accessible for all function 
//variables represent futur HTML btn to access to different display menu
let basicSelect;
let flexSelect;
let gridSelect;
//variables represent futur HTML btn to access to position (relative, abs) and size menu
let freeSelect;
let sizeSelect;

//function to change the begin of the position menu to an specific part of it
//this function is call each time we enter in the begin of the menu and be call in function of all part of the menu
//this function call data content the HTML of the other part of the menu to rewrite the content of the position menu
function baseMenu(){
    //assign the HTML btn for other part of the menu each time, avoid "undefined", that why this variable are declar in global scope
    basicSelect = document.getElementById("basic-pos-select");
    flexSelect = document.getElementById("flex-pos-select");
    gridSelect = document.getElementById("grid-pos-select");

    freeSelect = document.getElementById("free-pos-select");
    sizeSelect = document.getElementById("size-pos-select");

    function posSelection(posSelect){
        if (selectPos != posSelect.getAttribute("pos")){

            basicSelect.removeAttribute("selected");
            flexSelect.removeAttribute("selected");
            gridSelect.removeAttribute("selected");

            selectPos = posSelect.getAttribute("pos");
        }
        //
        posMenu.removeAttribute("base");
        posMenu.innerHTML = "";
        posMenu.setAttribute(selectPos, "");
        fetch('data/position/' + selectPos + '.html')
        .then(response => response.text())
        .then(data => {
            posMenu.innerHTML = data;
            posMenuContent = document.getElementById("pos-menu-content");
            switch(selectPos){
                case "basic" : whenBasicIsSelect(); break;
                case "flex" : whenFlexIsSelect(); break;
                case "grid" : whenGridIsSelect(); break;

                case "free" : whenFreeIsSelect(); break;
                case "size" : whenSizeIsSelect();break;
            }
        })
    }

    basicSelect.addEventListener("mousedown", function(){posSelection(basicSelect);});
    flexSelect.addEventListener("mousedown", function(){posSelection(flexSelect);});
    gridSelect.addEventListener("mousedown", function(){posSelection(gridSelect);});

    freeSelect.addEventListener("mousedown", function(){posSelection(freeSelect);});
    sizeSelect.addEventListener("mousedown", function(){posSelection(sizeSelect);});
}

baseMenu();
let goBackMenu;

//fonction goBack
function goToInitialMenu(posMenuSectionName){
    goBackMenu = document.getElementById("go-before");
    goBackMenu.addEventListener("mousedown", function(){
        posMenu.setAttribute("base", "");
        posMenu.innerHTML = "";
        posMenu.removeAttribute(posMenuSectionName);
        fetch('data/position/base.html')
        .then(response => response.text())
        .then(data => {
            posMenu.innerHTML = data;
            posMenuContent = document.getElementById("pos-menu-content");
            baseMenu();
            selectAttributeIfItsDisplay(posMenuSectionName);
        })
    })
}

function selectAttributeIfItsDisplay(posMenuSectionName){
    switch(posMenuSectionName){
        case "basic" : basicSelect.setAttribute("selected", ""); break;
        case "flex" : flexSelect.setAttribute("selected", ""); break;
        case "grid" : gridSelect.setAttribute("selected", ""); break;
    }
}

function whenSizeIsSelect(){
    goToInitialMenu(selectPos);
}
function whenBasicIsSelect(){

    let block = document.getElementById("block");
    let inline = document.getElementById("inline");
    let blockInline = document.getElementById("block-inline");

    initBasicMenu()
    basicDisplaySelection();
    goToInitialMenu(selectPos);


    function initBasicMenu(){

        block.removeAttribute("selected");
        inline.removeAttribute("selected");
        blockInline.removeAttribute("selected");

        switch(posSetting.display.display){
            case "block" : block.setAttribute("selected", ""); break;
            case "inline" : inline.setAttribute("selected", ""); break;
            case "block-inline" : blockInline.setAttribute("selected", ""); break;
            default : block.setAttribute("selected", "");
            posSetting.display = {  display : "block"  }; break;
        }
    }

    function basicDisplaySelection(){
        block.addEventListener("click", function(){
            inline.removeAttribute("selected");
            blockInline.removeAttribute("selected");
            posSetting.display = {  display : "block"  };
            block.setAttribute("selected", "");
            console.log("test");
        })
        inline.addEventListener("click", function(){
            block.removeAttribute("selected");
            blockInline.removeAttribute("selected");
            posSetting.display = {  display : "inline"  };
            inline.setAttribute("selected", "");
        })
        blockInline.addEventListener("click", function(){
            block.removeAttribute("selected");
            inline.removeAttribute("selected");   
            posSetting.display = {  display : "block-inline"  };
            blockInline.setAttribute("selected", "");
        })
    }
}
function whenFlexIsSelect(){
    
    let selectFlexXY = document.getElementById("interuptor-flex-direction");
    let interuptorFlexRowColumn = document.getElementById("flex-positions");
    let flexXY = true;
    let reverseInteruptor = document.getElementById("flex-reverse");
    let reverseActivator = false;
    let selectFlexAxe1 = document.getElementById("first-axe-interuptor");
    let interuptorFlexStartEnd1 = document.getElementById("first-axe-under-interuptor");
    let flexStartEnd1 = "middle";
    let between1 = document.getElementById("between-1");
    let around1 = document.getElementById("around-1");
    let selectFlexAxe2 = document.getElementById("second-axe-interuptor");
    let interuptorFlexStartEnd2 = document.getElementById("second-axe-under-interuptor");
    let flexStartEnd2 = "middle";
    let between2 = document.getElementById("between-2");
    let around2 = document.getElementById("around-2");
    let selectFlexElem = document.getElementById("element-axe-interuptor");
    let interuptorFlexStartEndElem = document.getElementById("element-axe-under-interuptor");
    let flexStartEndElem = "start";
    let betweenElem = document.getElementById("between-elem");
    let aroundElem = document.getElementById("around-elem");
    let noWrap = document.getElementById("envelop-no");
    let wrap = document.getElementById("envelop-yes");
    let reverseWarp = document.getElementById("envelop-reverse");

    function initFlexDisplay(){
        if(posSetting.display.display == "flex"){
            if(posSetting.display.flexDirection == "column"){
                interuptorFlexRowColumn.removeAttribute("active");
                flexXY = false;
                interuptorFlexStartEnd1.setAttribute("column", "");
                interuptorFlexStartEnd2.removeAttribute("column");
            }

            if(posSetting.display.wrap == "nowrap"){
                wrap.removeAttribute("selected");
                noWrap.setAttribute("selected", "");
                posSetting.display.wrap = "nowrap";
                posSetting.display.wrapReverse = false;
                reverseWarp.removeAttribute("active");
            }
            
            if(posSetting.display.justifyContent == "flex-start"){
                interuptorFlexStartEnd1.removeAttribute("middle");
                interuptorFlexStartEnd1.setAttribute("start","");
                flexStartEnd1 = "start";
            }
            else if(posSetting.display.justifyContent == "flex-end"){
                interuptorFlexStartEnd1.removeAttribute("middle");
                interuptorFlexStartEnd1.setAttribute("end","");
                flexStartEnd1 = "end";
            }
            else if(posSetting.display.justifyContent == "space-between"){
                between1.setAttribute("selected", "");
                selectFlexAxe1.removeAttribute("active");
            }
            else if(posSetting.display.justifyContent == "space-around"){
                around1.setAttribute("selected", "");
                selectFlexAxe1.removeAttribute("active");
            }

            if(posSetting.display.alignItem == "flex-start"){
                interuptorFlexStartEnd2.removeAttribute("middle");
                interuptorFlexStartEnd2.setAttribute("start","");
                flexStartEnd2 = "start";
            }
            else if(posSetting.display.alignItem == "flex-end"){
                interuptorFlexStartEnd2.removeAttribute("middle");
                interuptorFlexStartEnd2.setAttribute("end","");
                flexStartEnd2 = "end";
            }
            else if(posSetting.display.alignItem == "space-between"){
                between2.setAttribute("selected", "");
                selectFlexAxe2.removeAttribute("active");
            }
            else if(posSetting.display.alignItem == "space-around"){
                around2.setAttribute("selected", "");
                selectFlexAxe2.removeAttribute("active");
            }

            if(posSetting.display.alignContent == "flex-start"){
                interuptorFlexStartEndElem.removeAttribute("middle");
                interuptorFlexStartEndElem.setAttribute("start","");
                flexStartEndElem = "start";
            }
            else if(posSetting.display.alignContent == "flex-end"){
                interuptorFlexStartEndElem.removeAttribute("middle");
                interuptorFlexStartEndElem.setAttribute("end","");
                flexStartEndElem = "end";
            }
            else if(posSetting.display.alignContent == "space-between"){
                betweenElem.setAttribute("selected", "");
                selectFlexElem.removeAttribute("active");
            }
            else if(posSetting.display.alignContent == "space-around"){
                aroundElem.setAttribute("selected", "");
                selectFlexElem.removeAttribute("active");
            }
        }
        else{
            posSetting.display = {
                display : "flex",
                flexDirection : "row",
                directionReverse : false,
                wrap : "warp",
                wrapReverse : false,
                justifyContent : "center",
                alignItem : "center",
                alignContent : "jesaispas"
            }
        }
    }

    function flexBtns(){
        selectFlexXY.addEventListener('click', function(){
            if(flexXY == false){
                interuptorFlexRowColumn.setAttribute("active","");
                flexXY = true;
                posSetting.display.flexDirection = "row";
                interuptorFlexStartEnd2.setAttribute("column", "");
                interuptorFlexStartEnd1.removeAttribute("column");
            }
            else{
                interuptorFlexRowColumn.removeAttribute("active");
                flexXY = false;
                posSetting.display.flexDirection = "column";
                interuptorFlexStartEnd1.setAttribute("column", "");
                interuptorFlexStartEnd2.removeAttribute("column");

            }
        })
        reverseInteruptor.addEventListener("click", function(){
            if(reverseActivator == false){
                posSetting.display.directionReverse = true;
                reverseActivator = true;
            }
            else{
                posSetting.display.directionReverse = false;
                reverseActivator = false;
            }
        })
        
        selectFlexAxe1.addEventListener('click', function(){
            around1.removeAttribute("selected");
            between1.removeAttribute("selected");
            if(selectFlexAxe1.hasAttribute("active")){
                if(flexStartEnd1 == "start"){
                    interuptorFlexStartEnd1.setAttribute("middle","");
                    posSetting.display.justifyContent = "center";
                    flexStartEnd1 = "middle";
                    
                }
                else if(flexStartEnd1 == "middle"){
                    interuptorFlexStartEnd1.removeAttribute("middle");
                    interuptorFlexStartEnd1.setAttribute("end","");
                    posSetting.display.justifyContent = "flex-end";
                    flexStartEnd1 = "end";
                }
                else{
                    interuptorFlexStartEnd1.removeAttribute("end");
                    posSetting.display.justifyContent = "flex-start";
                    flexStartEnd1 = "start";
                }
            }
            else{
                selectFlexAxe1.setAttribute("active","");
                if(flexStartEnd1 == "start"){
                    posSetting.display.justifyContent = "flex-start";
                }
                else if(flexStartEnd1 == "middle"){
                    posSetting.display.justifyContent = "center";
                }
                else if(flexStartEnd1 == "end"){
                    posSetting.display.justifyContent = "flex-end";
                }
            }
        })

        between1.addEventListener("click", function(){
            between1.setAttribute("selected", "");
            around1.removeAttribute("selected");
            selectFlexAxe1.removeAttribute("active");
            posSetting.display.justifyContent = "space-between";
        })
        around1.addEventListener("click", function(){
            around1.setAttribute("selected", "");
            between1.removeAttribute("selected");
            selectFlexAxe1.removeAttribute("active");
            posSetting.display.justifyContent = "space-around";
        })
        
        selectFlexAxe2.addEventListener('click', function(){
            around2.removeAttribute("selected");
            between2.removeAttribute("selected");
            if(selectFlexAxe2.hasAttribute("active")){
                if(flexStartEnd2 == "start"){
                    interuptorFlexStartEnd2.setAttribute("middle","");
                    posSetting.display.alignItem = "center";
                    flexStartEnd2 = "middle";
                }
                else if(flexStartEnd2 == "middle"){
                    interuptorFlexStartEnd2.removeAttribute("middle");
                    interuptorFlexStartEnd2.setAttribute("end","");
                    posSetting.display.alignItem = "flex-end";
                    flexStartEnd2 = "end";
                }
                else{
                    interuptorFlexStartEnd2.removeAttribute("end");
                    posSetting.display.alignItem = "flex-start";
                    flexStartEnd2 = "start";
                }
            }
            else{
                selectFlexAxe2.setAttribute("active","");
                if(flexStartEnd2 == "start"){
                    posSetting.display.alignItem = "flex-start";
                }
                else if(flexStartEnd2 == "middle"){
                    posSetting.display.alignItem = "center";
                }
                else if(flexStartEnd2 == "end"){
                    posSetting.display.alignItem = "flex-end";
                }
            }
        })

        between2.addEventListener("click", function(){
            between2.setAttribute("selected", "");
            around2.removeAttribute("selected");
            selectFlexAxe2.removeAttribute("active");
            posSetting.display.alignItem = "space-between";
        })
        around2.addEventListener("click", function(){
            around2.setAttribute("selected", "");
            between2.removeAttribute("selected");
            selectFlexAxe2.removeAttribute("active");
            posSetting.display.alignItem = "space-around";
        })
        
        selectFlexElem.addEventListener('click', function(){
            aroundElem.removeAttribute("selected");
            betweenElem.removeAttribute("selected");
            if(selectFlexElem.hasAttribute("active")){
                if(flexStartEndElem == "start"){
                    interuptorFlexStartEndElem.setAttribute("middle","");
                    posSetting.display.alignContent = "center";
                    flexStartEndElem = "middle";
                }
                else if(flexStartEndElem == "middle"){
                    interuptorFlexStartEndElem.removeAttribute("middle");
                    interuptorFlexStartEndElem.setAttribute("end","");
                    posSetting.display.alignContent = "flex-end";
                    flexStartEndElem = "end";
                }
                else{
                    interuptorFlexStartEndElem.removeAttribute("end");
                    posSetting.display.alignContent = "flex-start";
                    flexStartEndElem = "start";
                }
            }
            else{
                selectFlexElem.setAttribute("active","");
                if(flexStartEndElem == "start"){
                    posSetting.display.alignContent = "flex-start";
                }
                else if(flexStartEndElem == "middle"){
                    posSetting.display.alignContent = "center";
                }
                else if(flexStartEndElem == "end"){
                    posSetting.display.alignContent = "flex-end";
                }
            }
        })

        betweenElem.addEventListener("click", function(){
            betweenElem.setAttribute("selected", "");
            aroundElem.removeAttribute("selected");
            selectFlexElem.removeAttribute("active");
            posSetting.display.alignContent = "space-between";
        })
        aroundElem.addEventListener("click", function(){
            aroundElem.setAttribute("selected", "");
            betweenElem.removeAttribute("selected");
            selectFlexElem.removeAttribute("active");
            posSetting.display.alignContent = "space-around";
        })
    }

    function flexEnvelop(){
        noWrap.addEventListener("click", function(){
            wrap.removeAttribute("selected");
            noWrap.setAttribute("selected", "");
            posSetting.display.wrap = "nowrap";
            posSetting.display.wrapReverse = false;
            reverseActivator = false;
            reverseWarp.removeAttribute("active");
        })
        wrap.addEventListener("click", function(){
            noWrap.removeAttribute("selected");
            wrap.setAttribute("selected", "");
            posSetting.display.wrap = "wrap";
            reverseWarp.setAttribute("active", "");
        })
        reverseWarp.addEventListener("click", function(){ 
            if(reverseWarp.hasAttribute("active")){
                if(reverseActivator == false){
                    posSetting.display.wrapReverse = true;
                    reverseActivator = true;
                }
                else{
                    posSetting.display.wrapReverse = false;
                    reverseActivator = false;
                }
            } 
        })
    }

    function reverseBtnAnim(){
        let reverseBtnImgs = document.getElementsByClassName("reverse-img");
        let reverseBtns = document.getElementsByClassName("pos-reverse-btn");
        for(i=0; i<=reverseBtnImgs.length-1; i++){
            let reverseBtnImg = reverseBtnImgs[i];
            let reverseBtn = reverseBtns[i];
            let reverseActivator = false 
            reverseBtn.addEventListener("click", function(){
                if(reverseBtn.hasAttribute("active")){
                    if(reverseActivator == false){
                        reverseBtnImg.setAttribute("active", "");
                        reverseActivator = true;
                    }
                    else{
                        reverseBtnImg.removeAttribute("active");
                        reverseActivator = false;
                    }
                }
            })     
        }
    }

    reverseBtnAnim();
    initFlexDisplay();
    flexEnvelop();
    flexBtns();
    goToInitialMenu(selectPos);
}
function whenGridIsSelect(){

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
        }
    }
    let numColumn = document.getElementById("num-column");
    let numLine = document.getElementById("num-line");
    let numRange = document.getElementById("num-range");

    let margeColumn = document.getElementById("marge-column");
    let margeLine = document.getElementById("marge-line");
    let margeRange = document.getElementById("marge-range");

    function gridNum(){
        numColumn.addEventListener("click", function(){
            numLine.removeAttribute("selected")
            numColumn.setAttribute("selected", "");
            numRange.value = posSetting.display.columns;
            gridSelectModif("columns");
        })
        numLine.addEventListener("click", function(){
            numColumn.removeAttribute("selected")
            numLine.setAttribute("selected", "");
            numRange.value = posSetting.display.lines;
            gridSelectModif("lines");
        })
        numRange.addEventListener("input", function(){
            if(numColumn.hasAttribute("selected")){
                posSetting.display.columns = numRange.value;
                gridSelectModif("columns");
            }
            else{
                posSetting.display.lines = numRange.value;
                gridSelectModif("lines");
            }
        })
    }
    function gridMarge(){
        margeColumn.addEventListener("click", function(){
            margeLine.removeAttribute("selected");
            margeColumn.setAttribute("selected", "");
            margeRange.value = posSetting.display.margeColumns;
        })
        margeLine.addEventListener("click", function(){
            margeColumn.removeAttribute("selected");
            margeLine.setAttribute("selected", "");
            margeRange.value = posSetting.display.lines;
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

    let sizeColumn = document.getElementById("size-column");
    let sizeLine = document.getElementById("size-line");
    let gridSizeSelect = document.getElementById("size-select")
    let sizeRange = document.getElementById("size-range");

    function gridSize(){
        sizeColumn.addEventListener("click", function(){
            sizeLine.removeAttribute("selected");
            sizeColumn.setAttribute("selected", "");
            gridSelectModif("columns");
            changeSizeRange();
        })
        sizeLine.addEventListener("click", function(){
            sizeColumn.removeAttribute("selected");
            sizeLine.setAttribute("selected", "");
            gridSelectModif("lines");
            changeSizeRange();
        })
        sizeRange.addEventListener("input",function(){
            if(sizeColumn.hasAttribute("selected")){
                let sizeSelected = sizeRange.value;
                let columnSelected = 1 + (gridSizeSelect.selectedIndex);
                posSetting.display.size.column[columnSelected] = sizeSelected;
            }
            else{
                let sizeSelected = sizeRange.value;
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
        console.log(selectedOption);
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
    gridNum();
    gridMarge();
    gridSize();
    goToInitialMenu(selectPos);
}
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