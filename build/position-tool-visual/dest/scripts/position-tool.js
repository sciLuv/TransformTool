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
        overflow : {
            x : "visible",
            y : "visible",
            interuptor : "xy" 
        }
    },
    size : {
        width : 100, height : 100,
        padding : {
            top : 0, bottom : 0, left : 0, right : 0
        },
        margin : {
            top : 0, bottom : 0, left : 0, right : 0
        },
        menu : {
            size : "width",
            margin : {
                top : false, left : false, right : false, bottom : false
            },
            padding : {
                top : false, left : false, right : false, bottom : false
            }
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

    //here after deselection of all btn
    //this function define the way to select new html for the content of the menu delete the actual
    //and define global style for each html selected (under menu)
    function posSelection(posSelect){
        if (selectPos != posSelect.getAttribute("pos")){

            basicSelect.removeAttribute("selected");
            flexSelect.removeAttribute("selected");
            gridSelect.removeAttribute("selected");

            //the line just after is to get the exact name of the futur html file load after
            //use an attribute in the btn associate to do that
            selectPos = posSelect.getAttribute("pos");
        }
        //here the specific code to delete old html and select and add new html
        posMenu.removeAttribute("base");
        posMenu.innerHTML = "";
        posMenu.setAttribute(selectPos, "");
        fetch('data/position/' + selectPos + '.html')
        .then(response => response.text())
        .then(data => {
            posMenu.innerHTML = data;
            posMenuContent = document.getElementById("pos-menu-content");
            //here trigger the function contain all specific rules of each under-menu
            switch(selectPos){
                case "basic" : whenBasicIsSelect(); break;
                case "flex" : whenFlexIsSelect(); break;
                case "grid" : whenGridIsSelect(); break;

                case "free" : whenFreeIsSelect(); break;
                case "size" : whenSizeIsSelect();break;
            }
        })
    }
    //here event use last function posSelection to access to each under menu
    basicSelect.addEventListener("mousedown", function(){posSelection(basicSelect);});
    flexSelect.addEventListener("mousedown", function(){posSelection(flexSelect);});
    gridSelect.addEventListener("mousedown", function(){posSelection(gridSelect);});

    freeSelect.addEventListener("mousedown", function(){posSelection(freeSelect);});
    sizeSelect.addEventListener("mousedown", function(){posSelection(sizeSelect);});
}

baseMenu();
let goBackMenu;

//for all under menu, there are a event associate to the btn to go back to the base menu
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
            baseMenu();
            selectAttributeIfItsDisplay();
        })
    })
}

//to put in state of selection btn link of the display of the object of display 
function selectAttributeIfItsDisplay(){
    switch(posSetting.display.display){
        case "block" : basicSelect.setAttribute("selected", ""); break;
        case "inline" : basicSelect.setAttribute("selected", ""); break;
        case "block-inline" : basicSelect.setAttribute("selected", ""); break;
        case "flex" : flexSelect.setAttribute("selected", ""); break;
        case "grid" : gridSelect.setAttribute("selected", ""); break;
    }
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
        
    let noWrap = document.getElementById("envelop-no");
    let wrap = document.getElementById("envelop-yes");
    let reverseWarp = document.getElementById("envelop-reverse");

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
function whenFreeIsSelect(){
    //element interaction of position selection value 
    let noFree = document.getElementById("no-free-btn");
    let relative = document.getElementById("relative-btn");
    let absolute = document.getElementById("absolute-btn");

    //element interaction of z-index value
    let zIndex = document.getElementById("z-index-input");
    let zIndexMore = document.getElementById("z-index-more");
    let zIndexLess = document.getElementById("z-index-less");

    //element interaction of the overflow value
    //interuptor for select the axe of the overflow
    let interuptorOF = document.getElementById("interuptor");
    let underInteruptorOF = document.getElementById("under-interuptor");
    //three button for select intrinsec value of overflow axis
    let visibleOF = document.getElementById("visible-btn-OF");
    let hiddenOF = document.getElementById("hidden-btn-OF");
    let scrollOF = document.getElementById("scroll-btn-OF");

    //to init the free menu and its selection element in function of object of free value
    function initFree(){
        if(posSetting.free.position == "relative"){
            removeAndSetAttribute(noFree, absolute, relative);
        }
        else if(posSetting.free.position == "absolute"){
            removeAndSetAttribute(noFree, relative, absolute);
        }
        zIndex.value = posSetting.free.zIndex;

        if(posSetting.free.overflow.interuptor == "x"){
            underInteruptorOF.removeAttribute("middle");
            underInteruptorOF.setAttribute("end","");
            overflowChgt("x");
        }
        else if(posSetting.free.overflow.interuptor == "y"){
            underInteruptorOF.removeAttribute("middle");
            overflowChgt("y");
        }
        else{
            overflowChgt("xy")
        }
    }

    //contain all event in link with element interaction of position selection value
    function freePositionSelection(){
        noFree.addEventListener("click", function(){
            removeAndSetAttribute(relative, absolute, noFree);
            posSetting.free.position = "none";
        })
        relative.addEventListener("click", function(){
            removeAndSetAttribute(noFree, absolute, relative);
            posSetting.free.position = "relative";
        })
        absolute.addEventListener("click", function(){
            removeAndSetAttribute(noFree, relative, absolute);
            posSetting.free.position = "absolute";
        })
    }
    //contain all event in link with element interaction of Z-index selection value
    function zIndexAssignValue(){
        zIndexMore.addEventListener("click", function(){
            if(posSetting.free.zIndex <= 49){
                posSetting.free.zIndex ++;
                zIndex.value = posSetting.free.zIndex;
            }
        })
        zIndexLess.addEventListener("click", function(){
            if(posSetting.free.zIndex >= -49){
            posSetting.free.zIndex --;
            zIndex.value = posSetting.free.zIndex;
            }
        })
        zIndex.addEventListener("input", function(e){
            if(zIndex.value > 50){
                zIndex.value = 50;
            }
            else if(zIndex.value < -50){
                zIndex.value = -50;
            }
            posSetting.free.zIndex = zIndex.value;
        })
    }

    //for change the overflow interuptor value of axis and visual
    function overflowInteruptor(){
        interuptorOF.addEventListener('click', function(){
            if(posSetting.free.overflow.interuptor == "y"){
                underInteruptorOF.setAttribute("end","");
                posSetting.free.overflow.interuptor = "x";
                overflowChgt("x");
            }
            else if(posSetting.free.overflow.interuptor == "x"){
                underInteruptorOF.removeAttribute("end");
                underInteruptorOF.setAttribute("middle","");
                posSetting.free.overflow.interuptor = "xy";
                overflowChgt("xy");
            }
            else{
                underInteruptorOF.removeAttribute("middle");
                posSetting.free.overflow.interuptor = "y";
                overflowChgt("y");
            }
        })
    }

    //Event for the btn of selection of value of overflow
    function overflowSelection(){
        visibleOF.addEventListener("click", function(){
            removeAndSetAttribute(hiddenOF, scrollOF, visibleOF);
            axeOF("visible");
        })
        hiddenOF.addEventListener("click", function(){
            removeAndSetAttribute(visibleOF, scrollOF, hiddenOF);
            axeOF("hidden");
        })
        scrollOF.addEventListener("click", function(){
            removeAndSetAttribute(visibleOF, hiddenOF, scrollOF);
            axeOF("scroll");
        })
    }

    //use exclusively in the function "overflowSelection" to assign value (visible/hidden/scroll)
    //select by a button in the object representing the overflow
    function axeOF(valueOF){
        switch(posSetting.free.overflow.interuptor){
            case "xy" :
                posSetting.free.overflow.x = valueOF;
                posSetting.free.overflow.y = valueOF;
                break;
            case "x" : posSetting.free.overflow.x = valueOF; break;
            case "y" : posSetting.free.overflow.y = valueOF; break;
        }
    }

    //change the visual selection of the btn of selection value of overflow (visible/hidden/scroll)
    function overflowChgt(axeSelected){
        if(axeSelected == "xy"){
            if(posSetting.free.overflow.x != posSetting.free.overflow.y){
                visibleOF.removeAttribute("selected");
                hiddenOF.removeAttribute("selected");
                scrollOF.removeAttribute("selected");
            }
            else{
                if(posSetting.free.overflow[axeSelected] == "visible"){
                    removeAndSetAttribute(hiddenOF, scrollOF, visibleOF);
                }
                else if(posSetting.free.overflow[axeSelected] == "hidden"){
                    removeAndSetAttribute(visibleOF, scrollOF, hiddenOF);
                }
                else if(posSetting.free.overflow[axeSelected] == "scroll"){
                    removeAndSetAttribute(visibleOF, hiddenOF, scrollOF);
                }
            }
        }
        else{
            if(posSetting.free.overflow[axeSelected] == "visible"){
                removeAndSetAttribute(hiddenOF, scrollOF, visibleOF);
            }
            else if(posSetting.free.overflow[axeSelected] == "hidden"){
                removeAndSetAttribute(visibleOF, scrollOF, hiddenOF);
            }
            else if(posSetting.free.overflow[axeSelected] == "scroll"){
                removeAndSetAttribute(visibleOF, hiddenOF, scrollOF);
            }
        }
    }

    //use in Position and Overflow to set and remove selected attribute from btn
    //seleted attribute is use in the css to visually mark a selected btn
    function removeAndSetAttribute(firstRemove, secondRemove, setAttribute){
        firstRemove.removeAttribute("selected");
        secondRemove.removeAttribute("selected");
        setAttribute.setAttribute("selected","");
    }

    //use of all fonction create before for a free menu operationnal   
    initFree() 
    freePositionSelection();
    zIndexAssignValue();
    overflowInteruptor();
    overflowSelection();
    goToInitialMenu(selectPos);
}
function whenSizeIsSelect(){

    //interaction element link with selection of size (height or width)
    let widthBtn = document.getElementById("pos-menu-size-width");
    let HeightBtn = document.getElementById("pos-menu-size-height");
    let sizeRange = document.getElementById("pos-menu-size-range");

    //interaction element link with selection of margin
    let margeTB = document.getElementById("pos-marge-border-top");
    let margeLB = document.getElementById("pos-marge-border-left");
    let margeRB = document.getElementById("pos-marge-border-right");
    let margeBB = document.getElementById("pos-marge-border-bottom");

    let margeSelector = document.getElementById("pos-marge-all-border");
    let margeRange = document.getElementById("pos-menu-marge-range");

    //interaction element link with selection of padding
    let padTB = document.getElementById("pos-padding-border-top");
    let padLB = document.getElementById("pos-padding-border-left");
    let padRB = document.getElementById("pos-padding-border-right");
    let padBB = document.getElementById("pos-padding-border-bottom");

    let padSelector = document.getElementById("pos-padding-all-border");
    let padRange = document.getElementById("pos-menu-padding-range");

    //PARAMETER NAME FOR ALL THE 7 FUNCTION DECLARE AFTER  : 
    //all parameter "btn" represent the selection border element, if the name is "btnSOMETHING" the parameter taget a spécific btn 
    //margePad = object of margin OR padding content border information : "margin" or "padding"
    //border = side of the padding or margin, "top", "left" ect
    //range = the range of padding or margin : margeRange or padRange 

    //initialize the size menu, and changing the interaction element in function of value in posSetting.Size menu
    function initSize(){
        if(posSetting.size.menu.size == "width"){
            sizeRange.value = posSetting.size.width;
        }
        else{
            sizeRange.value = posSetting.size.height;
            widthBtn.removeAttribute("selected");
            HeightBtn.setAttribute("selected", "");
        }
        initSelectBorder(margeTB, margeLB, margeRB, margeBB, "margin", margeRange)
        initSelectBorder(padTB, padLB, padRB, padBB, "padding", padRange)
    }
    //with a foreach loop apply the initBorder for each border selection of a marging/padding 
    //tb,lb,rb,bb are parameter represent all borders selection of a margin/padding section 
    function initSelectBorder(tB, lB, rB, bB, margePad, range){
        let margePads = [tB, lB, rB, bB]
        let borders = ["top", "left", "right","bottom"];
        let borderCounter = 0;
            margePads.forEach((margeOrPad) => {
                let size = borders[borderCounter];
                initBorder(margePad, size, range, margeOrPad);
                borderCounter++;
            })
    }
    //for a border selection (interaction elem) select his state (true/false//selected/not selected) and apply chgt in rest of interaction element
    function initBorder(margePad, border, range, btn){
        if(posSetting.size.menu[margePad][border] == true){
            margPadTrue(btn, margePad, border);
        }
        RangeVisualChgt(margePad, range);
        margPadRangeActive(margePad, range);
    }

    //Event in link with interaction element of size selection of width or height
    function selectWidthHeight(){
        widthBtn.addEventListener("click", function(){
            HeightBtn.removeAttribute("selected");
            widthBtn.setAttribute("selected", "");
            posSetting.size.menu.size = "width";
            sizeRange.value = posSetting.size.width;
        })
        HeightBtn.addEventListener("click", function(){
            widthBtn.removeAttribute("selected");
            HeightBtn.setAttribute("selected", "");
            posSetting.size.menu.size = "height";
            sizeRange.value = posSetting.size.height;
        })
        sizeRange.addEventListener("input", function(){
            if(widthBtn.hasAttribute("selected")){
                posSetting.size.width = sizeRange.value;
            }
            else{
                posSetting.size.height = sizeRange.value;
            }
        })
    }    

    //contain all function to declare event in link with interaction element (btn, selector, input) in link with marge or padding. 
    function marginPadding(btnTB, btnLB, btnRB, btnBB, btnSelector, margePad, range){

        let btnMargePads = [btnTB, btnLB, btnRB, btnBB]
        let borders = ["top", "left", "right","bottom"];
        let borderCounter = 0;
        btnMargePads.forEach((btnMargePad) => {
            let size = borders[borderCounter];
            btnMargePad.addEventListener("mousedown", function(){
                border(margePad, size, range, this);
            })
            borderCounter++;
        });

        btnSelector.addEventListener("mousedown", function(){
            if((posSetting.size.menu[margePad].top == false)||
            (posSetting.size.menu[margePad].left == false)||
            (posSetting.size.menu[margePad].right == false)||
            (posSetting.size.menu[margePad].bottom == false)){
                margPadTrue(btnTB, margePad, "top"); margPadTrue(btnBB, margePad, "bottom");
                margPadTrue(btnRB, margePad, "right"); margPadTrue(btnLB, margePad, "left");
                range.removeAttribute("inactive");
            }
            else{
                margPadFalse(btnTB, margePad, "top"); margPadFalse(btnBB, margePad, "bottom"); 
                margPadFalse(btnRB, margePad, "right"); margPadFalse(btnLB, margePad, "left");
                range.setAttribute("inactive", "");
            }
            RangeVisualChgt(margePad, range);
        })

        range.addEventListener("input", function(){
            margPadSizeAssign(margePad, "top", range); margPadSizeAssign(margePad, "bottom", range);
            margPadSizeAssign(margePad, "left", range); margPadSizeAssign(margePad, "right", range);
        })
    }
    //contain function margePadTrue, and margePadFalse and active them if border selector in link is selected. PARAMETER :
    function border(margePad, border, range, btn){
        if(posSetting.size.menu[margePad][border] == false){
            margPadTrue(btn, margePad, border);
        }
        else{
            margPadFalse(btn, margePad, border);
        }
        RangeVisualChgt(margePad, range);
        margPadRangeActive(margePad, range);
    }
    //activate a selection of a borderSelection margin or padding. PARAMETER :
    function margPadTrue(btn, margePad, border){
        btn.setAttribute("selected", "");
        posSetting.size.menu[margePad][border] = true;
    }
    //inactivate a selection of a borderSelection margin or padding. PARAMETER : idem of margePadTrue
    function margPadFalse(btn, margePad, border){
        btn.removeAttribute("selected");
        posSetting.size.menu[margePad][border] = false;
    }
    //active range marge/pad if one borderSelection is actif, else inactive the range. PARAMETER :
    function margPadRangeActive(margePad, range){
        if((posSetting.size.menu[margePad].top == false)&&
        (posSetting.size.menu[margePad].left == false)&&
        (posSetting.size.menu[margePad].right == false)&&
        (posSetting.size.menu[margePad].bottom == false)){
            range.setAttribute("inactive", "");
        } 
        else{
            range.removeAttribute("inactive");
        }
    }
    //assign value of the range marge/pad of each side of the element's container if it is selected
    function margPadSizeAssign(margePad ,border, range){
        if(posSetting.size.menu[margePad][border] == true){
            posSetting.size[margePad][border] = range.value;
        }
    }
    //if each selected border of marge/pad have a same value, the range represent this value, else the range represent 0
    function RangeVisualChgt(margePad, range){
        let borders = ["top","left","right","bottom"];
        let borderSelects = [];
        borders.forEach((border) => {
            if(posSetting.size.menu[margePad][border] == true){
                borderSelects.push(posSetting.size[margePad][border]);
            }
        });
        if(borderSelects.length > 0){
            borderSelects.forEach((borderSelect) => {
                if (borderSelect == borderSelects[0]){
                    range.value = borderSelects[0];
                }
                else{
                    range.value = 0; 
                    borderSelects = [];
                }
            })
        }
        else{
            range.value = 0;
        }
    }
    
    //use of all fonction create before for a size menu operationnal
    initSize()
    marginPadding(margeTB, margeLB, margeRB, margeBB, margeSelector, "margin", margeRange);
    marginPadding(padTB, padLB, padRB, padBB, padSelector, "padding", padRange);
    selectWidthHeight()
    goToInitialMenu(selectPos);
}