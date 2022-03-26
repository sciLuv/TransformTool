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
    
        positionOfChildOfContainer();
        elemsContainer.style.zIndex = posSetting.free.zIndex;

    }

    //contain all event in link with element interaction of position selection value
    function freePositionSelection(){
        noFree.addEventListener("click", function(){
            removeAndSetAttribute(relative, absolute, noFree);
            posSetting.free.position = "initial";
            positionOfChildOfContainer()
        })
        relative.addEventListener("click", function(){
            removeAndSetAttribute(noFree, absolute, relative);
            posSetting.free.position = "relative";
            positionOfChildOfContainer()
        })
        absolute.addEventListener("click", function(){
            removeAndSetAttribute(noFree, relative, absolute);
            posSetting.free.position = "absolute";
            positionOfChildOfContainer()
        })
    }
    //contain all event in link with element interaction of Z-index selection value
    function zIndexAssignValue(){
        zIndexMore.addEventListener("click", function(){
            if(posSetting.free.zIndex <= 49){
                posSetting.free.zIndex ++;
                zIndex.value = posSetting.free.zIndex;
                elemsContainer.style.zIndex = posSetting.free.zIndex;
            }
        })
        zIndexLess.addEventListener("click", function(){
            if(posSetting.free.zIndex >= -49){
            posSetting.free.zIndex --;
            zIndex.value = posSetting.free.zIndex;
            elemsContainer.style.zIndex = posSetting.free.zIndex;
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
            elemsContainer.style.zIndex = posSetting.free.zIndex;
            setOverflow();
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
            setOverflow();
        })
        hiddenOF.addEventListener("click", function(){
            removeAndSetAttribute(visibleOF, scrollOF, hiddenOF);
            axeOF("hidden");
            setOverflow();
        })
        scrollOF.addEventListener("click", function(){
            removeAndSetAttribute(visibleOF, hiddenOF, scrollOF);
            axeOF("scroll");
            setOverflow();
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

    function positionOfChildOfContainer(){
        for(i=0; i<= elemsContainer.children.length-1; i++){
            elemsContainer.children[i].style.position = posSetting.free.position
        }
    }
    function setOverflow(){
        elemsContainer.style.overflowX = posSetting.free.overflow.x;
        elemsContainer.style.overflowY = posSetting.free.overflow.y;
    }

    //use of all fonction create before for a operationnal free menu   
    initFree() 
    freePositionSelection();
    zIndexAssignValue();
    overflowInteruptor();
    overflowSelection();
    goToInitialMenu(selectPos);
}