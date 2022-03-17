
function whenFlexIsSelect(){
    //elements interaction of flexDirection selection, and boolean to set them
    let selectFlexXY = document.getElementById("interuptor-flex-direction");
    let interuptorFlexRowColumn = document.getElementById("flex-positions");
    let flexXY = true;
    let reverseInteruptor = document.getElementById("flex-reverse");
    let reverseInteruptorImg = document.querySelector("#flex-reverse img");
    let reverseActivator = false;

    //elements interaction of flexWrap    
    let noWrap = document.getElementById("envelop-no");
    let wrap = document.getElementById("envelop-yes");
    let reverseWarp = document.getElementById("envelop-reverse");
    let reverseWarpImg = document.querySelector("#envelop-reverse img");
    let warpReverseActivator = false;

    //elements interaction of justify-content
    let selectFlexAxe1 = document.getElementById("first-axe-interuptor");
    let interuptorFlexStartEnd1 = document.getElementById("first-axe-under-interuptor");
    let flexStartEnd1 = "middle";
    let between1 = document.getElementById("between-1");
    let around1 = document.getElementById("around-1");

    //elements interaction of align-items
    let selectFlexAxe2 = document.getElementById("second-axe-interuptor");
    let interuptorFlexStartEnd2 = document.getElementById("second-axe-under-interuptor");
    let flexStartEnd2 = "middle";
    let between2 = document.getElementById("between-2");
    let around2 = document.getElementById("around-2");

    //elements interaction of align-content
    let selectFlexElem = document.getElementById("element-axe-interuptor");
    let interuptorFlexStartEndElem = document.getElementById("element-axe-under-interuptor");
    let flexStartEndElem = "middle";
    let betweenElem = document.getElementById("between-elem");
    let aroundElem = document.getElementById("around-elem");

    //set visual state of elements interaction in function of the state of the posSetting.display value (in the "if" part)
    //or creation of a posSetting.display.flex object (in the "else" part)
    function initFlexDisplay(){
        if(posSetting.display.display == "flex"){
            if(posSetting.display.flexDirection == "column"){
                interuptorFlexRowColumn.removeAttribute("active");
                flexXY = false;
                interuptorFlexStartEnd1.setAttribute("column", "");
                interuptorFlexStartEnd2.removeAttribute("column");
            }
            if(posSetting.display.directionReverse == true){
                reverseInteruptor.setAttribute("selected", "");
                reverseInteruptorImg.setAttribute("active", "");
                reverseActivator = true;
            }
            
            if(posSetting.display.wrap == "nowrap"){
                wrap.removeAttribute("selected");
                noWrap.setAttribute("selected", "");
                posSetting.display.wrap = "nowrap";
                posSetting.display.wrapReverse = false;
                reverseWarp.removeAttribute("active");
            }
            if(posSetting.display.wrapReverse == true){
                reverseWarp.setAttribute("selected", "");
                reverseWarpImg.setAttribute("active", "");
                warpReverseActivator = true;
            }

            initFlexAxesSelectors(selectFlexAxe1, interuptorFlexStartEnd1, flexStartEnd1, around1, between1, "justifyContent");
            initFlexAxesSelectors(selectFlexAxe2, interuptorFlexStartEnd2, flexStartEnd2, around2, between2, "alignItems");
            initFlexAxesSelectors(selectFlexElem, interuptorFlexStartEndElem, flexStartEndElem, aroundElem, betweenElem, "alignContent");
            
        }
        else{
            posSetting.display = {
                display : "flex",
                flexDirection : "row",
                directionReverse : false,
                wrap : "wrap",
                wrapReverse : false,
                justifyContent : "center",
                alignItems : "center",
                alignContent : "center"
            }
            elemsContainer.style.display = posSetting.display.display;
            elemsContainer.style.flexDirection = posSetting.display.flexDirection;
            elemsContainer.style.flexWrap = posSetting.display.wrap;
            elemsContainer.style.justifyContent = posSetting.display.justifyContent;
            elemsContainer.style.alignItems = posSetting.display.alignItems;
            elemsContainer.style.alignContent = posSetting.display.alignContent;
        }
    }
    //use exclusively in the initFlexDisplay (function just before) to set all the axis part of the flex menu (justifyContent, alignItem, AlignContent)
    function initFlexAxesSelectors(interuptor, underInteruptor, interuptorValRpz, around, between, displayFlexVal){
        if(posSetting.display[displayFlexVal] == "flex-start"){
            underInteruptor.removeAttribute("middle");
            interuptorValRpz = "start";
            console.log(interuptorValRpz);
        }
        else if(posSetting.display[displayFlexVal] == "flex-end"){
            underInteruptor.removeAttribute("middle");
            underInteruptor.setAttribute("end","");
            interuptorValRpz = "end";
            console.log(interuptorValRpz);
        }
        else if(posSetting.display[displayFlexVal] == "space-between"){
            between.setAttribute("selected", "");
            interuptor.removeAttribute("active");
        }
        else if(posSetting.display[displayFlexVal] == "space-around"){
            around.setAttribute("selected", "");
            interuptor.removeAttribute("active");
        }
        giveValAgain(interuptor, interuptorValRpz);
    }

    //Events for interaction element of the flex direction (flex direction and flexReverse)
    //and, in there rules to set flexDirection object and visual value of the interaction element
    function flexDirection(){
        selectFlexXY.addEventListener('click', function(){
            if(flexXY == false){
                interuptorFlexRowColumn.setAttribute("active","");
                flexXY = true;
                posSetting.display.flexDirection = "row";
                interuptorFlexStartEnd2.setAttribute("column", "");
                interuptorFlexStartEnd1.removeAttribute("column");
                elemsContainer.style.flexDirection = posSetting.display.flexDirection;
            }
            else{
                interuptorFlexRowColumn.removeAttribute("active");
                flexXY = false;
                posSetting.display.flexDirection = "column";
                interuptorFlexStartEnd1.setAttribute("column", "");
                interuptorFlexStartEnd2.removeAttribute("column");
                elemsContainer.style.flexDirection = posSetting.display.flexDirection;
            }
        })
        reverseInteruptor.addEventListener("click", function(){
            if(reverseActivator == false){
                posSetting.display.directionReverse = true;
                reverseActivator = true;
                elemsContainer.style.flexDirection = posSetting.display.flexDirection + "-reverse";
            }
            else{
                posSetting.display.directionReverse = false;
                reverseActivator = false;
                elemsContainer.style.flexDirection = posSetting.display.flexDirection;
            }
        })
    }

    //Events for interaction element of the flexWrap (flexWrap and flexWrapReverse)
    //and, in there rules to set flexWrap object and visual value of the interaction element
    function flexEnvelop(){
        noWrap.addEventListener("click", function(){
            wrap.removeAttribute("selected");
            noWrap.setAttribute("selected", "");
            posSetting.display.wrap = "nowrap";
            posSetting.display.wrapReverse = false;
            warpReverseActivator = false;
            reverseWarp.removeAttribute("active");
            elemsContainer.style.flexWrap = posSetting.display.wrap;
        })
        wrap.addEventListener("click", function(){
            noWrap.removeAttribute("selected");
            wrap.setAttribute("selected", "");
            posSetting.display.wrap = "wrap";
            reverseWarp.setAttribute("active", "");
            elemsContainer.style.flexWrap = posSetting.display.wrap;
        })
        reverseWarp.addEventListener("click", function(){ 
                if(warpReverseActivator == false){
                    posSetting.display.wrapReverse = true;
                    posSetting.display.wrap = "wrap";
                    warpReverseActivator = true;
                    reverseWarp.setAttribute("active", "");
                    noWrap.removeAttribute("selected");
                    wrap.setAttribute("selected", "");
                    elemsContainer.style.flexWrap = posSetting.display.wrap + "-reverse";
                }
                else{
                    posSetting.display.wrapReverse = false;
                    warpReverseActivator = false;
                    elemsContainer.style.flexWrap = posSetting.display.wrap;
                }
        })
    }

    //Events for interaction element of the  (justifyContent, alignItem, AlignContent)
    //and, in there rules to set flex Axis object and visual value of the interaction element
    function flexAxesInteruptorBtn(){
        flexAxesSelectorsEvent(selectFlexAxe1, interuptorFlexStartEnd1, flexStartEnd1, around1, between1, "justifyContent");
        flexAxesSelectorsEvent(selectFlexAxe2, interuptorFlexStartEnd2, flexStartEnd2, around2, between2, "alignItems");
        flexAxesSelectorsEvent(selectFlexElem, interuptorFlexStartEndElem, flexStartEndElem, aroundElem, betweenElem, "alignContent");
    }

    //because each element interaction for axis selection work in a same way, a function to set them with less writing code. PARAMETER :
    //interuptor = the JS representation of the HTML interuptor.
    //underInteruptor = the inside part of the interuptor, represent visually the selection of start/middle/end
    //around/between = represent the JS representation of the around and between btn
    //displayFlexVal = represente the posSetting.display["justifyContent"/"alignItem"/"alignContent"]
    function flexAxesSelectorsEvent(interuptor, underInteruptor, interuptorValRpz, around, between, displayFlexVal){
        interuptor.addEventListener('click', function(){

            console.log(interuptorValRpz);
            around.removeAttribute("selected");
            between.removeAttribute("selected");
            if(interuptor.hasAttribute("active")){
                if(interuptorValRpz == "start"){
                    console.log("test1");
                    underInteruptor.setAttribute("middle","");
                    posSetting.display[displayFlexVal] = "center";
                    interuptorValRpz = "middle";
                    elemsContainer.style[displayFlexVal] = posSetting.display[displayFlexVal];
                    
                }
                else if(interuptorValRpz == "middle"){
                    console.log("test2");
                    underInteruptor.removeAttribute("middle");
                    underInteruptor.setAttribute("end","");
                    posSetting.display[displayFlexVal] = "flex-end";
                    interuptorValRpz = "end";
                    elemsContainer.style[displayFlexVal] = posSetting.display[displayFlexVal];
                }
                else if(interuptorValRpz == "end"){
                    console.log("test3");
                    underInteruptor.removeAttribute("end");
                    posSetting.display[displayFlexVal] = "flex-start";
                    interuptorValRpz = "start";
                    elemsContainer.style[displayFlexVal] = posSetting.display[displayFlexVal];
                }

                giveValAgain(interuptor, interuptorValRpz);
            }
            else{
                interuptor.setAttribute("active","");
                if(interuptorValRpz == "start"){
                    posSetting.display[displayFlexVal] = "flex-start";
                    elemsContainer.style[displayFlexVal] = posSetting.display[displayFlexVal];
                }
                else if(interuptorValRpz == "middle"){
                    posSetting.display[displayFlexVal] = "center";
                    elemsContainer.style[displayFlexVal] = posSetting.display[displayFlexVal];
                }
                else if(interuptorValRpz == "end"){
                    posSetting.display[displayFlexVal] = "flex-end";
                    elemsContainer.style[displayFlexVal] = posSetting.display[displayFlexVal];
                }
            }
        })
        
        aroundBetweenBtnEvent(around, between, interuptor, displayFlexVal, "space-around");
        aroundBetweenBtnEvent(between, around, interuptor, displayFlexVal, "space-between");
    }

    function giveValAgain(interuptor, interuptorValRpz){
        if (interuptor.getAttribute("id") == "first-axe-interuptor"){
            flexStartEnd1 = interuptorValRpz;
        }
        else if (interuptor.getAttribute("id") == "second-axe-interuptor"){
            flexStartEnd2 = interuptorValRpz;
        }
        else{
            flexStartEndElem = interuptorValRpz;
        }
    }

    //Event of btn around and between. PARAMETER : (if same name in the parameter of last function, same possibility of value)
    //btn1, btn2 = around or between btn in function of the event create
    //spacingValue = "space-around" or "space-between"
    function aroundBetweenBtnEvent(btn1, btn2, interuptor, displayFlexVal, spacingValue){
        btn1.addEventListener("click", function(){
            btn1.setAttribute("selected", "");
            btn2.removeAttribute("selected");
            interuptor.removeAttribute("active");
            posSetting.display[displayFlexVal] = spacingValue;
            elemsContainer.style[displayFlexVal] = posSetting.display[displayFlexVal];
        })
    }

    //use to put a visual feelback when user click on a reverse btn
    function reverseBtnAnim(reverseBtn, reverseBtnImg, reverseActivator){
            reverseBtn.addEventListener("click", function(){
                if(reverseBtn.hasAttribute("active")){
                    if(reverseActivator == false){
                        reverseBtnImg.setAttribute("active", "");
                        reverseBtn.setAttribute("selected", "");
                        reverseActivator = true;
                    }
                    else{
                        reverseBtnImg.removeAttribute("active");
                        reverseBtn .removeAttribute("selected");
                        reverseActivator = false;
                    }
                }
            })     
    }

    //use of all fonction create before for a operationnal free menu   
    initFlexDisplay();
    reverseBtnAnim(reverseInteruptor, reverseInteruptorImg, reverseActivator);
    reverseBtnAnim(reverseWarp, reverseWarpImg, warpReverseActivator);
    flexDirection();
    flexEnvelop();
    flexAxesInteruptorBtn();
    goToInitialMenu(selectPos);
}