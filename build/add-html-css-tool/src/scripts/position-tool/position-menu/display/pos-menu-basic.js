function whenBasicIsSelect(){

    //JS representation of the btns of selection of basic display
    let block = document.getElementById("block");
    let inline = document.getElementById("inline");
    let blockInline = document.getElementById("block-inline");

    //init the basic menu in function of selected display in the display object
    function initBasicMenu(){

        reInitContainerStyle();

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

        elemsContainer.style.display = posSetting.display.display;
        topElemsContainer.style.display = posSetting.display.display;
        for(i=0; i<=elemList.length-1; i++){
            size(i);
        }
    }

    //Event in link of each display btn
    function basicDisplaySelection(){
        block.addEventListener("click", function(){
            AddAttributeAndDisplayValue(inline, blockInline, block, "block");
        })
        inline.addEventListener("click", function(){
            AddAttributeAndDisplayValue(block, blockInline, inline, "inline");
        })
        blockInline.addEventListener("click", function(){
            AddAttributeAndDisplayValue(block, inline, blockInline, "inline-block");
        })
    }
    //use in the event above to add/remove graphic attribut for the selected display, and change the display object with his new attribute. PARAMETER :
    // btn1, btn2 : btn unselected // btnSelected : the btn of the selected display // displayVal :the new value of the displayObjct
    function AddAttributeAndDisplayValue(btn1, btn2, btnSelect, displayVal){
        btn1.removeAttribute("selected");
        btn2.removeAttribute("selected");   
        btnSelect.setAttribute("selected", "");
        posSetting.display = {  display : displayVal  };
        elemsContainer.style.display = posSetting.display.display;
        topElemsContainer.style.display = posSetting.display.display;
        changePosIFDisplay();
    }

    //use of all fonction create before for a operationnal basic menu   
    initBasicMenu()
    basicDisplaySelection();
    goToInitialMenu(selectPos);
}