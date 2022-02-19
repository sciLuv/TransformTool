/*
let selectXYs = document.getElementsByClassName("select-x-y-btn");
let interuptorSelectsXYs = document.getElementsByClassName("x-y-interuptor");

for(i=0; i<=selectXYs.length-1; i++){
    let interuptor = false;
    let buttonNumber = i;
    selectXYs[buttonNumber].addEventListener('click', function(){
        if(interuptor == false){
            interuptorSelectsXYs[buttonNumber].setAttribute("active","");
            interuptor = true;
        }
        else{
            interuptorSelectsXYs[buttonNumber].removeAttribute("active");
            interuptor = false;
        }
    })
}
*/




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

let posAngle = document.getElementById("pos-angle");
let posOpener = document.getElementById("position-menu-opener");
let posMenu = document.getElementById("position-menu");

let posMenuContent; 
posMenuContent = document.getElementById("pos-menu-content");

let posToolOpen = false;

posAngle.addEventListener("click", function(){
    if(posToolOpen == false){
        posToolOpen = true;
        posOpener.setAttribute("active", ""); 
        posMenu.setAttribute("active", ""); 
        posMenuContent.removeAttribute("inactive");
    }
    else{
        posToolOpen = false;
        posOpener.removeAttribute("active");
        posMenu.removeAttribute("active");
        let inativeposMenuContent = window.setTimeout(inativationContent, 300);
    }
})

function inativationContent(){
    posMenuContent.setAttribute("inactive", "");
}

let posContainerSetting = {
    selectPos : "none",
    posMenuOpen : false,
    settingPos : {}
}

let freeSelect;
let flexSelect;
let gridSelect;

function baseMenu(){
    freeSelect = document.getElementById("free-pos-select");
    flexSelect = document.getElementById("flex-pos-select");
    gridSelect = document.getElementById("grid-pos-select");

    function posSelection(posSelect){
        console.log("test");
        if (posContainerSetting.selectPos != posSelect.getAttribute("pos")){

            freeSelect.removeAttribute("selected");
            flexSelect.removeAttribute("selected");
            gridSelect.removeAttribute("selected");

            posContainerSetting.selectPos = posSelect.getAttribute("pos");
            posSelect.setAttribute("selected", "");
        }

        posMenu.removeAttribute("base");
        posMenu.setAttribute(posContainerSetting.selectPos, "");
        fetch('data/position/' + posContainerSetting.selectPos + '.txt')
        .then(response => response.text())
        .then(data => {
            posMenu.innerHTML = data;
            posMenuContent = document.getElementById("pos-menu-content");
            if(posContainerSetting.selectPos == "free"){
                whenFreeIsSelect();
            }
            else if (posContainerSetting.selectPos == "flex"){
                whenFlexIsSelect();
                flexBtns();
            }
            else if (posContainerSetting.selectPos == "grid"){

            }
    })
    }

    freeSelect.addEventListener("mousedown", function(){posSelection(freeSelect);});
    flexSelect.addEventListener("mousedown", function(){posSelection(flexSelect);});
    gridSelect.addEventListener("mousedown", function(){posSelection(gridSelect);});
}
baseMenu();


function whenFreeIsSelect(){
    let goBefore = document.getElementById("go-before");
    goBefore.addEventListener("mousedown", function(){
        posMenu.setAttribute("base", "");
        posMenu.innerHTML = "";
        posMenu.removeAttribute("free");
        fetch('data/position/base.txt')
        .then(response => response.text())
        .then(data => {
            posMenu.innerHTML = data;
            posMenuContent = document.getElementById("pos-menu-content");
            baseMenu();
            freeSelect.setAttribute("selected", "");
    })
    })
}

function whenFlexIsSelect(){
    let goBefore = document.getElementById("go-before");
    goBefore.addEventListener("mousedown", function(){
        posMenu.setAttribute("base", "");
        posMenu.innerHTML = "";
        posMenu.removeAttribute("flex");
        fetch('data/position/base.txt')
        .then(response => response.text())
        .then(data => {
            posMenu.innerHTML = data;
            posMenuContent = document.getElementById("pos-menu-content");
            baseMenu();
            flexSelect.setAttribute("selected", "");
    })
    })
}

function flexBtns(){
    let selectFlexXY = document.getElementById("interuptor-flex-xy");
    let interuptorFlexXY = document.getElementById("flex-axes");
    
    let flexXY = false;
    
    selectFlexXY.addEventListener('click', function(){
        if(flexXY == false){
            interuptorFlexXY.setAttribute("active","");
            flexXY = true;
        }
        else{
            interuptorFlexXY.removeAttribute("active");
            flexXY = false;
        }
    })
}