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
                posIFAutoPlaceAndSize(calcWidth(), posSetting.size.width, posIFWidthMin, sizeRange, "left");
                elemsContainer.style.width = sizeRange.value + "px";
                underElemsContainer.style.width = sizeRange.value + "px";
                topElemsContainer.style.width = sizeRange.value + "px";
                posSetting.size.width = sizeRange.value;
            }
            else{
                posIFHeightCSS(calcHeight(), posIF);
                posSetting.size.height = sizeRange.value;
                elemsContainer.style.height = sizeRange.value + "px";
                underElemsContainer.style.height = sizeRange.value + "px";
                topElemsContainer.style.height = sizeRange.value + "px";
            }
            calcGrid();
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
            posIFHeightCSS(calcHeight(), posIF);
            margPadSizeAssign(margePad, "top", range, margePad + "Top");
            margPadSizeAssign(margePad, "bottom", range, margePad + "Bottom");
            margPadSizeAssign(margePad, "left", range, margePad + "Left"); 
            margPadSizeAssign(margePad, "right", range, margePad + "Right");
            inPositionPlacement();
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
    function margPadSizeAssign(margePad, border, range, margePadStyle){
        if(posSetting.size.menu[margePad][border] == true){
            if(border == "left"){
                posIFAutoPlaceAndSize(calcWidth(), posSetting.size[margePad].left, posIFWidthMin, range, "left");
            }
            if(border == "right"){
                posIFAutoPlaceAndSize(calcWidth(), posSetting.size[margePad].right, posIFWidthMin, range, "left");
            }
            posSetting.size[margePad][border] = range.value;
            elemsContainer.style[margePadStyle] = range.value + "px";
            underElemsContainer.style[margePadStyle] = range.value + "px";
            topElemsContainer.style[margePadStyle] = range.value + "px";
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