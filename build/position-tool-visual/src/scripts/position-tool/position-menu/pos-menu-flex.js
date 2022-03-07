function whenFlexIsSelect(){
    //elements interaction of flexDirection selection, and boolean to set them
    let selectFlexXY = document.getElementById("interuptor-flex-direction");
    let interuptorFlexRowColumn = document.getElementById("flex-positions");
    let flexXY = true;
    let reverseInteruptor = document.getElementById("flex-reverse");
    let reverseActivator = false;

    //elements interaction of flexWrap    
    let noWrap = document.getElementById("envelop-no");
    let wrap = document.getElementById("envelop-yes");
    let reverseWarp = document.getElementById("envelop-reverse");

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
    let flexStartEndElem = "start";
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
            
            if(posSetting.display.wrap == "nowrap"){
                wrap.removeAttribute("selected");
                noWrap.setAttribute("selected", "");
                posSetting.display.wrap = "nowrap";
                posSetting.display.wrapReverse = false;
                reverseWarp.removeAttribute("active");
            }

            initFlexAxesSelectors(selectFlexAxe1, interuptorFlexStartEnd1, flexStartEnd1, around1, between1, "justifyContent");
            initFlexAxesSelectors(selectFlexAxe2, interuptorFlexStartEnd2, flexStartEnd2, around2, between2, "alignItem");
            initFlexAxesSelectors(selectFlexElem, interuptorFlexStartEndElem, flexStartEndElem, aroundElem, betweenElem, "alignContent");
            
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
                alignContent : "center"
            }
        }
    }
    //use exclusively in the initFlexDisplay (function just before) to set all the axis part of the flex menu (justifyContent, alignItem, AlignContent)
    function initFlexAxesSelectors(interuptor, underInteruptor, interuptorValRpz, around, between, displayFlexVal){
        if(posSetting.display[displayFlexVal] == "flex-start"){
            underInteruptor.removeAttribute("middle");
            underInteruptor.setAttribute("start","");
            interuptorValRpz = "start";
        }
        else if(posSetting.display[displayFlexVal] == "flex-end"){
            underInteruptor.removeAttribute("middle");
            underInteruptor.setAttribute("end","");
            interuptorValRpz = "end";
        }
        else if(posSetting.display[displayFlexVal] == "space-between"){
            between.setAttribute("selected", "");
            interuptor.removeAttribute("active");
        }
        else if(posSetting.display[displayFlexVal] == "space-around"){
            around.setAttribute("selected", "");
            interuptor.removeAttribute("active");
        }
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
    }

    //Events for interaction element of the flexWrap (flexWrap and flexWrapReverse)
    //and, in there rules to set flexWrap object and visual value of the interaction element
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
                if(reverseActivator == false){
                    posSetting.display.wrapReverse = true;
                    posSetting.display.wrap = "wrap";
                    reverseActivator = true;
                    reverseWarp.setAttribute("active", "");
                    noWrap.removeAttribute("selected");
                    wrap.setAttribute("selected", "");
                }
                else{
                    posSetting.display.wrapReverse = false;
                    reverseActivator = false;
                }
        })
    }

    //Events for interaction element of the  (justifyContent, alignItem, AlignContent)
    //and, in there rules to set flex Axis object and visual value of the interaction element
    function flexAxesInteruptorBtn(){
        flexAxesSelectorsEvent(selectFlexAxe1, interuptorFlexStartEnd1, flexStartEnd1, around1, between1, "justifyContent");
        flexAxesSelectorsEvent(selectFlexAxe2, interuptorFlexStartEnd2, flexStartEnd2, around2, between2, "alignItem");
        flexAxesSelectorsEvent(selectFlexElem, interuptorFlexStartEndElem, flexStartEndElem, aroundElem, betweenElem, "alignContent");
    }

    //because each element interaction for axis selection work in a same way, a function to set them with less writing code. PARAMETER :
    //interuptor = the JS representation of the HTML interuptor.
    //underInteruptor = the inside part of the interuptor, represent visually the selection of start/middle/end
    //around/between = represent the JS representation of the around and between btn
    //displayFlexVal = represente the posSetting.display["justifyContent"/"alignItem"/"alignContent"]
    function flexAxesSelectorsEvent(interuptor, underInteruptor, interuptorValRpz, around, between, displayFlexVal){
        interuptor.addEventListener('click', function(){
            around.removeAttribute("selected");
            between.removeAttribute("selected");
            if(interuptor.hasAttribute("active")){
                if(interuptorValRpz == "start"){
                    underInteruptor.setAttribute("middle","");
                    posSetting.display[displayFlexVal] = "center";
                    interuptorValRpz = "middle";
                    
                }
                else if(interuptorValRpz == "middle"){
                    underInteruptor.removeAttribute("middle");
                    underInteruptor.setAttribute("end","");
                    posSetting.display[displayFlexVal] = "flex-end";
                    interuptorValRpz = "end";
                }
                else{
                    underInteruptor.removeAttribute("end");
                    posSetting.display[displayFlexVal] = "flex-start";
                    interuptorValRpz = "start";
                }
            }
            else{
                interuptor.setAttribute("active","");
                if(interuptorValRpz == "start"){
                    posSetting.display[displayFlexVal] = "flex-start";
                }
                else if(interuptorValRpz == "middle"){
                    posSetting.display[displayFlexVal] = "center";
                }
                else if(interuptorValRpz == "end"){
                    posSetting.display[displayFlexVal] = "flex-end";
                }
            }
        })
        
        aroundBetweenBtnEvent(around, between, interuptor, displayFlexVal, "space-around");
        aroundBetweenBtnEvent(between, around, interuptor, displayFlexVal, "space-between");
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
        })
    }

    //use to put a visual feelback when user click on a reverse btn
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

    //use of all fonction create before for a operationnal free menu   
    reverseBtnAnim();
    initFlexDisplay();
    flexDirection();
    flexEnvelop();
    flexAxesInteruptorBtn();
    goToInitialMenu(selectPos);
}