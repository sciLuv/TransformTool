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
    function margPadTrue(border, margePad, object){
        border.setAttribute("selected", "");
        posSetting.size.menu[margePad][object] = true;
    }
    function margPadFalse(border, margePad, object){
        border.removeAttribute("selected");
        posSetting.size.menu[margePad][object] = false;
    }
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
    function margPadSizeAssign(margePad ,border, range){
        if(posSetting.size.menu[margePad][border] == true){
            posSetting.size[margePad][border] = range.value;
        }
    }
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
    
    marginPadding(margeTB, margeLB, margeRB, margeBB, margeSelector, "margin", margeRange);
    marginPadding(padTB, padLB, padRB, padBB, padSelector, "padding", padRange);
    selectWidthHeight()
    goToInitialMenu(selectPos);
}