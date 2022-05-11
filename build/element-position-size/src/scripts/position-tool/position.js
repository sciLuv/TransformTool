//updatePos is used in element code for creation/deletion of html/css part of the element 
function updatePos(){
    elemsContainer.innerHTML = ""
    topElemsContainer.innerHTML = "";
    if(elemList.length > 0){
        for(i=0; i<=elemList.length-1; i++){
            topElemsContainer.innerHTML += 
            "<div class='if-in-position' id='if-" + elemList[i].id.name + "'>" + 
                "<div class='size-col'></div>" + 
                    "<div class='middle-sizing'>" + 
                            "<div class='size-line'></div>" + 
                            "<div class='pos-grab'></div>" + 
                            "<div class='size-line'></div>" + 
                    "</div>" +
                "<div class='size-col'></div>" + 
            "</div>";
            elemsContainer.innerHTML += "<div class='in-position' id=" + elemList[i].id.name + "></div>";
            //color
            color(i);
            //shader
            shader(i)
            //corner
            corner(i);
            //border
            border(i);
            //box
            box(i);
            //size
            size(i);
        }
        //calcElemCelPlace();
    }
}
//similar of updatePos but only for MaJ of the graphism of elements
function updateGraphicPos(){
    if(elemList.length > 0){
        for(i=0; i<=elemList.length-1; i++){
            //color
            color(i);
            //shader
            shader(i)
            //corner
            corner(i);
            //border
            border(i);
            //box
            box(i);
            //size
            size(i);
        }
        //calcElemCelPlace();
    }
}

//here, each function (color, shader, ect...) update the graphism of elem, with using elemList
function color(i){
    let elem = document.getElementById(elemList[i].id.name);
    elem.style.background =  hexToRGB(elemList[i].color.hue, elemList[i].color.opacity);
}

function shader(i){
    let shader = "";
    let elem = document.getElementById(elemList[i].id.name);
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
}

function corner(i){
    let elem = document.getElementById(elemList[i].id.name);
    elem.style.borderRadius = elemList[i].corner.topLeft + "% " + elemList[i].corner.topRight + "% " + elemList[i].corner.bottomRight + "% " + elemList[i].corner.bottomLeft + "%";

}

function border(i){
    let elem = document.getElementById(elemList[i].id.name);
    let ifElem = document.getElementById("if-" + elemList[i].id.name);
    elem.style.borderTop = hexToRGB(elemList[i].border.top.color.hue, elemList[i].border.top.color.opacity) + " " + elemList[i].border.top.style + " " + elemList[i].border.top.size + "px";
    elem.style.borderLeft = hexToRGB(elemList[i].border.left.color.hue, elemList[i].border.left.color.opacity) + " " + elemList[i].border.left.style + " " + elemList[i].border.left.size + "px";
    elem.style.borderRight = hexToRGB(elemList[i].border.right.color.hue, elemList[i].border.right.color.opacity) + " " + elemList[i].border.right.style + " " + elemList[i].border.right.size + "px";
    elem.style.borderBottom = hexToRGB(elemList[i].border.bottom.color.hue, elemList[i].border.bottom.color.opacity) + " " + elemList[i].border.bottom.style + " " + elemList[i].border.bottom.size + "px";

    ifElem.style.borderTop = "solid #ffffff00 " + elemList[i].border.top.size + "px";
    ifElem.style.borderLeft = "solid #ffffff00 " + elemList[i].border.left.size + "px";
    ifElem.style.borderRight = "solid #ffffff00 " + elemList[i].border.right.size + "px";
    ifElem.style.borderBottom = "solid #ffffff00 " + elemList[i].border.bottom.size + "px";

}

function box(i){
    let box = "";
    let elem = document.getElementById(elemList[i].id.name);
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

function size(i){
    let elem = document.getElementById(elemList[i].id.name);
    let ifElem = document.getElementById("if-" + elemList[i].id.name);

    if((posSetting.display.display == undefined)||(posSetting.display.display != "grid")){
        elem.style.width = elemList[i].size.width + "px";
        elem.style.height = elemList[i].size.height + "px";
        elem.style.removeProperty("grid-area");
    
        ifElem.style.width = elemList[i].size.width + "px";
        ifElem.style.height = elemList[i].size.height + "px";
        ifElem.style.removeProperty("grid-area");
    }
    else{
        elem.style.gridArea = elemList[i].grid.top + "/" + elemList[i].grid.left + "/" + elemList[i].grid.bottom + "/" + elemList[i].grid.right;
        elem.style.width = "auto";
        elem.style.height = "auto";
    
        ifElem.style.gridArea = elemList[i].grid.top + "/" + elemList[i].grid.left + "/" + elemList[i].grid.bottom + "/" + elemList[i].grid.right;
        ifElem.style.width = "auto";
        ifElem.style.height = "auto";
    }

}