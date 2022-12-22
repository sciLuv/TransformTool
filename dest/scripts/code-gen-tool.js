document.addEventListener("mousedown", function(event){
    if ((!codeGen.contains(event.target))&&(angleCodeOpener == false)){
        closeCodeGenTool();
    }

    if (!codeGen.contains(event.target)){
        closeCodeGenTool();
        codeGen.style.zIndex = '20';
        console.log("test");
    }
    else{
        codeGen.style.zIndex = '30';
    }
})

copyBtn.addEventListener("mouseup", codeCopy)
function codeCopy(){

    if(htmlBtn.hasAttribute("selected"))navigator.clipboard.writeText(codeHTML);
    else{navigator.clipboard.writeText(codeCSS);}
    

    copyBtn.setAttribute("clicked","");
    setTimeout(function(){
        copyBtn.removeAttribute("clicked");
        copyBtn.setAttribute("afterclick","");
        setTimeout(function(){
            copyBtn.removeAttribute("afterclick");
        }, 500);
    }, 500);
}

codeGenOpener.addEventListener("click", openCloseCodeGenTool)
function openCloseCodeGenTool(){
    if(angleCodeOpener == false)closeCodeGenTool();
    else{openCodeGenTool();}
}

function closeCodeGenTool(){
        codeGen.setAttribute("close","");
        codeGenOpenerImg.setAttribute("close","");
        contentCodeGen.setAttribute("close","");
        htmlBtn.setAttribute("close","");
        cssBtn.setAttribute("close","");
        angleCodeOpener = true;
        copyBtn.style.position = "relative";
        htmlCodePlace.style.transform = "translateY(-25px)";
        cssCodePlace.style.transform = "translateY(-25px)";

        setTimeout(function(){
            htmlBtn.setAttribute("nonedisplaying","");
            cssBtn.setAttribute("nonedisplaying","");
        }, 200);
}
function openCodeGenTool(){
    codeGen.removeAttribute("close");
    codeGenOpenerImg.removeAttribute("close");
    contentCodeGen.removeAttribute("close");
    htmlBtn.removeAttribute("close");
    cssBtn.removeAttribute("close");
    angleCodeOpener = false;
    setTimeout(function(){
        copyBtn.style.position = "absolute";
        copyBtn.style.left = "600px";
        htmlCodePlace.style.transform = "translateY(0px)";
        cssCodePlace.style.transform = "translateY(0px)";
    }, 350);
    setTimeout(function(){
        htmlBtn.removeAttribute("nonedisplaying");
        cssBtn.removeAttribute("nonedisplaying");
    }, 200);

    if(htmlBtn.hasAttribute("selected"))selectHtml();
    else{selectCss();}
}

htmlBtn.addEventListener("mouseup", selectHtml);
function selectHtml(){
    cssBtn.removeAttribute("selected");
    htmlBtn.setAttribute("selected", "");
    cssCodePlace.style.display = "none";
    htmlCodePlace.style.display = "block";
    htmlGeneration();
}
cssBtn.addEventListener("mouseup", selectCss);
function selectCss(){
    htmlBtn.removeAttribute("selected");
    cssBtn.setAttribute("selected", "");
    cssCodePlace.style.display = "block";
    htmlCodePlace.style.display = "none";
    cssGeneration();
}

function htmlGeneration(){
    codeCSS = "";
    codeHTML = "";
    codeHTML += "<div id='container'>\n";
    for(i=0; i<=elemList.length-1; i++){
        let newElem = "\t <div id='" + elemList[i].id.name +"'></div> \n"
        codeHTML += newElem;
    }
        codeHTML += "</div>"
    let test = codeHTML.replace(/[<|>|/]/g, '<span class="grey">$&</span>');
    let test2 = test.replace(/div/g, '<span class="blue">$&</span>');
    let test3 = test2.replace(/id/g, '<span class="light-blue">$&</span>');
    let test4 = test3.replace(/'[^']*'/g, '<span class="red">$&</span>')
    htmlCodePlace.innerHTML = test4;
}

function cssGeneration(){
    codeHTML = "";
    codeCSS = ""
    codeCSS += "#container {\n";

    codeCSS += "\t display: " + posSetting.display.display + ";\n";
    if(posSetting.display.display == "flex"){
        codeCSS += "\t align-content: " + posSetting.display.alignContent + ";\n";
        codeCSS += "\t align-items: " + posSetting.display.alignContent + ";\n";

        let reverse = ""
        if(posSetting.display.directionReverse == true) reverse = "-reverse"
        codeCSS += "\t flex-direction: " + posSetting.display.flexDirection + reverse + ";\n";

        codeCSS += "\t justify-content: " + posSetting.display.justifyContent + ";\n";

        let reverseWrap = ""
        if((posSetting.display.wrapReverse == true)&&(posSetting.display.wrap == "wrap")) reverseWrap = "-reverse"
        codeCSS += "\t flex-wrap: " + posSetting.display.wrap + reverseWrap + ";\n";
    }
    if(posSetting.display.display == "grid"){
        let gridStyle = elemsContainer.getAttribute("style");
        let gridStylePageLayoutBegin = gridStyle.match(/[^;]+;/g);
        let gridStylePageLayoutEnd = "";
        for(j=1; j<=gridStylePageLayoutBegin.length-1; j++){
            console.log(gridStylePageLayoutBegin);
            console.log(gridStylePageLayoutBegin[j]);
            gridStylePageLayoutEnd += "\t" + gridStylePageLayoutBegin[j] + "\n";
        }
        codeCSS += gridStylePageLayoutEnd;
    }

    codeCSS += "\t width: " + posSetting.size.width + "px;\n";
    codeCSS += "\t height: " + posSetting.size.height + "px;\n";

    codeCSS += "\t padding-top: " + posSetting.size.padding.top + "px;\n";
    codeCSS += "\t padding-right: " + posSetting.size.padding.right + "px;\n";
    codeCSS += "\t padding-bottom: " + posSetting.size.padding.bottom + "px;\n";
    codeCSS += "\t padding-left: " + posSetting.size.padding.left + "px;\n";

    codeCSS += "\t margin-top: " + posSetting.size.margin.top + "px;\n";
    codeCSS += "\t margin-right: " + posSetting.size.margin.right + "px;\n";
    codeCSS += "\t margin-bottom: " + posSetting.size.margin.bottom + "px;\n";
    codeCSS += "\t margin-left: " + posSetting.size.margin.left + "px;\n";
    
    codeCSS += "\t overflow-x: " + posSetting.free.overflow.x + ";\n";
    codeCSS += "\t overflow-y: " + posSetting.free.overflow.y + ";\n";
    codeCSS += "\t z-index: " + posSetting.free.zIndex + ";\n";

    codeCSS+= "}";

    for(i=0; i<=elemList.length-1; i++){

        codeCSS += "\n#" + elemList[i].id.name + " {\n"

        if(posSetting.free.position != "intial") codeCSS += "\t position: " + posSetting.free.position + ";\n";

        let width, height;
        if(posSetting.display.display == "grid"){
            codeCSS += "\t grid-area: " + elemList[i].grid.top + "/" + elemList[i].grid.left + "/" + elemList[i].grid.bottom + "/" + elemList[i].grid.right + ";\n";
            width = " \t width: auto;\n";
            height = " \t height: auto;\n";
        } else {
            width = "\t width: " + elemList[i].size.width + "px;\n";
            height = "\t height: " + elemList[i].size.height + "px;\n";
        }
        let borderTop = "\t border-top: " + elemList[i].border.top.size + "px " + elemList[i].border.top.style + " " + hexToRGB(elemList[i].border.top.color.hue, elemList[i].border.top.color.opacity) + ";\n";
        let borderRight ="\t border-right: " + elemList[i].border.right.size + "px " + elemList[i].border.right.style + " " + hexToRGB(elemList[i].border.right.color.hue, elemList[i].border.right.color.opacity) + ";\n";
        let borderBottom = "\t border-bottom: " + elemList[i].border.bottom.size + "px " + elemList[i].border.bottom.style + " " + hexToRGB(elemList[i].border.bottom.color.hue, elemList[i].border.bottom.color.opacity) + ";\n";
        let borderLeft = "\t border-left: " + elemList[i].border.left.size + "px " + elemList[i].border.left.style + " " + hexToRGB(elemList[i].border.left.color.hue, elemList[i].border.left.color.opacity) + ";\n";
        let corner = "\t border-radius: " + elemList[i].corner.topLeft + "% " + elemList[i].corner.topRight + "% " + elemList[i].corner.bottomRight + "% " + elemList[i].corner.bottomLeft + "%;\n";

        codeCSS += width + height + borderTop + borderRight + borderBottom + borderLeft + corner;

        let box = "\t box-shadow: ";
        for(j=0; j<=elemList[i].box.length-1; j++){
            if(j>0) box += "\t\t"
            box += elemList[i].box[j].offset.x + "px " + elemList[i].box[j].offset.y + "px " + elemList[i].box[j].radius.blur + "px " + elemList[i].box[j].radius.spread + "px " + hexToRGB(elemList[i].box[j].color.hue, elemList[i].box[j].color.opacity);
            if(elemList[i].box[j].inset) box+= " inset";
            if (j==elemList[i].box.length-1) box += ";\n";
            else{box += ",\n"}
        }
        codeCSS += box;

        let background = "\t background: ";
        if (elemList[i].shader.length == 1) background+= hexToRGB(elemList[i].color.hue, elemList[i].color.opacity) + ";\n"
        else{
            background += elemList[i].shader[0].gradient + "-gradient("
            if(elemList[i].shader[0].gradient == "radial") background += "circle, ";
            else{background += elemList[i].shader[0].degree + "deg,\n"}
            for(j=0; j<=elemList[i].shader.length-1; j++){
                background += "\t\t\t";
                background += hexToRGB(elemList[i].shader[j].color.hue, elemList[i].shader[j].color.opacity) + " " + elemList[i].shader[j].placement + "%";
                if (j==elemList[i].shader.length-1) background += ");\n";
                else{background += ",\n"}
            }

        }
        codeCSS += background;

        codeCSS += "\t top: " + elemList[i].place.top + "px;\n" 
        codeCSS += "\t left: " + elemList[i].place.left + "px;\n"
        codeCSS += "}"
    }
    let test = codeCSS.replace(regexId, '<span class="orange">$&</span>')
    let test2 = test.replace(regexAccolade, '<span class="orange-fluo">$&</span>')
    let test4 = test2.replace(regexCssRules, '<span class="blue">$&</span>')
    let test5 = test4.replace(regexNum, '<span class="green">$&</span>');
    let test6 = test5.replace(regexRgbaPx,'<span class="green">$&</span>');
    let test7 = test6.replace(regexparenthese,'<span class="yellow">$&</span>');
    let test8 = test7.replace(regexTwoDot,'<span class="white">$&</span>');
    let test9 = test8.replace(regexWord,'<span class="red">$&</span>');
    cssCodePlace.innerHTML = test9;

    let cssSelectors = document.getElementsByClassName('orange');
    for(i=0; i<=cssSelectors.length-1; i++){
        let regexTagBegin = /<span class="green">/g;
        let regexTagEnd = /<\/span>/g;
        let str = cssSelectors[i].innerHTML;
        let strFinal = str.replace(regexTagBegin, '');
        let strFinal2 = strFinal.replace(regexTagEnd, '');
        cssSelectors[i].innerHTML = strFinal2; 
    }
    let cssRules = document.getElementsByClassName('blue');
    for(i=0; i<=cssRules.length-1; i++){
        let regexTagBegin = /<span class="red">/g;
        let regexTagEnd = /<\/span>/g;
        let str = cssRules[i].innerHTML;
        let strFinal = str.replace(regexTagBegin, '');
        let strFinal2 = strFinal.replace(regexTagEnd, '');
        cssRules[i].innerHTML = strFinal2; 
    }
}


let regexEndTag = /<\/[^>]+>/g; //balise fermante
let regexbeginTag = /<[^>]+>/g; //balise ouvrante

let regexId = /#[^\s]+/g;
let regexCssRules = /[^\s]+:/g;
let regexNum = /\d+(?:\.\d+)?/g;
let regexAccolade = /[{|}]/g;
let regexRgbaPx = /rgba|px|%|fr/g;
let regexparenthese = /[(|)]/g;
let regexTwoDot = /:/g;
let regexWord = /none|visible|block|\sflex|center|row|reverse|column|\swrap|nowrap|grid|auto|repeat/g;


