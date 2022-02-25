function whenFlexIsSelect(){
    
    reverseBtnAnim();
    initFlexDisplay();
    flexEnvelop();
    flexBtns();
    goToInitialMenu(selectPos);
}

function initFlexDisplay(){
    //if(posSetting.display.display == "flex"){}
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

function flexBtns(){
    let selectFlexXY = document.getElementById("interuptor-flex-direction");
    let interuptorFlexRowColumn = document.getElementById("flex-positions");
    let flexXY = true;
    
    selectFlexXY.addEventListener('click', function(){
        if(flexXY == false){
            interuptorFlexRowColumn.setAttribute("active","");
            flexXY = true;
            posSetting.display.flexDirection = "row";
            posSetting.display.flexDirection = "column";
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

    let reverseInteruptor = document.getElementById("flex-reverse");
    let reverseActivator = false;
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


    let selectFlexAxe1 = document.getElementById("first-axe-interuptor");
    let interuptorFlexStartEnd1 = document.getElementById("first-axe-under-interuptor");
    
    let flexStartEnd1 = "middle";
    
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

    let between1 = document.getElementById("between-1");
    let around1 = document.getElementById("around-1");

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

    let selectFlexAxe2 = document.getElementById("second-axe-interuptor");
    let interuptorFlexStartEnd2 = document.getElementById("second-axe-under-interuptor");
    
    let flexStartEnd2 = "middle";
    
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

    let between2 = document.getElementById("between-2");
    let around2 = document.getElementById("around-2");

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

    let selectFlexElem = document.getElementById("element-axe-interuptor");
    let interuptorFlexStartEndElem = document.getElementById("element-axe-under-interuptor");
    
    let flexStartEndElem = "start";
    
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

    let betweenElem = document.getElementById("between-elem");
    let aroundElem = document.getElementById("around-elem");

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
    let noWrap = document.getElementById("envelop-no");
    let wrap = document.getElementById("envelop-yes");
    let reverseWarp = document.getElementById("envelop-reverse");
    
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
    let reverseActivator = false;
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