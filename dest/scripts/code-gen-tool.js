let angleCodeOpener = true;

let codeGen = document.getElementById("code-gen");
let codeGenOpener = document.getElementById("code-angle");
let codeGenOpenerImg = document.getElementById("code-angle-img");
let contentCodeGen = document.getElementById("content-code-gen");
let htmlCodePlace = document.getElementById('html');
let cssCodePlace = document.getElementById('css');

let htmlBtn = document.getElementById('html-button');
let cssBtn = document.getElementById('css-button');

htmlBtn.addEventListener("mouseup", selectHtml);
function selectHtml(){
    cssBtn.removeAttribute("selected");
    htmlBtn.setAttribute("selected", "");
}
cssBtn.addEventListener("mouseup", selectCss);
function selectCss(){
    htmlBtn.removeAttribute("selected");
    cssBtn.setAttribute("selected", "");
}

let codeHTML = "";
let codeCSS = ""

codeGenOpener.addEventListener("click", function(){
    if(angleCodeOpener == false){
        codeGen.setAttribute("close","");
        codeGenOpenerImg.setAttribute("close","");
        contentCodeGen.setAttribute("close","");
        htmlBtn.setAttribute("close","");
        cssBtn.setAttribute("close","");
        angleCodeOpener = true;
    }
    else{
        codeGen.removeAttribute("close");
        codeGenOpenerImg.removeAttribute("close");
        contentCodeGen.removeAttribute("close");
        htmlBtn.removeAttribute("close");
        cssBtn.removeAttribute("close");
        angleCodeOpener = false;
    }
})

function htmlGeneration(){
    codeHTML = "";
    if(htmlBtn.hasAttribute("selected")){
        for(i=0; i<=elemList.length-1; i++){
            if(i==0) codeHTML += "<div id='container'>\n"
            let newElem = "\t <div id='" + elemList[i].id.name +"'></div> \n"
            codeHTML += newElem;
            if(i == elemList.length-1) codeHTML += "</div>"
        }
        
    }
    let test = codeHTML.replace(/[<|>|/]/g, '<span class="grey">$&</span>');
    let test2 = test.replace(/div/g, '<span class="blue">$&</span>');
    let test3 = test2.replace(/id/g, '<span class="light-blue">$&</span>');
    let test4 = test3.replace(/'[^']*'/g, '<span class="red">$&</span>')
    htmlCodePlace.innerHTML = test4;
}

function cssGeneration(){
    codeCSS = ""
    if(cssBtn.hasAttribute("selected")){

        let cssRules = "";
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
        if(posSetting.free.position != "initial") codeCSS += "\t position: " + posSetting.free.position + ";\n";
        codeCSS += "\t z-index: " + posSetting.free.zIndex + ";\n";
    
        codeCSS+= "}";
    
        for(i=0; i<=elemList.length-1; i++){
    
            codeCSS += "\n#" + elemList[i].id.name + " {\n"
            
            let width = "\t width: " + elemList[i].size.width + "px;\n";
            let height = "\t height: " + elemList[i].size.height + "px;\n";
            let borderTop = "\t border-top: " + elemList[i].border.top.size + "px " + elemList[i].border.top.style + " " + hexToRGB(elemList[i].border.top.color.hue, elemList[i].border.top.color.opacity) + ";\n";
            let borderRight ="\t border-right: " + elemList[i].border.right.size + "px " + elemList[i].border.right.style + " " + hexToRGB(elemList[i].border.right.color.hue, elemList[i].border.right.color.opacity) + ";\n";
            let borderBottom = "\t border-bottom: " + elemList[i].border.bottom.size + "px " + elemList[i].border.bottom.style + " " + hexToRGB(elemList[i].border.bottom.color.hue, elemList[i].border.bottom.color.opacity) + ";\n";
            let borderLeft = "\t border-left: " + elemList[i].border.left.size + "px " + elemList[i].border.left.style + " " + hexToRGB(elemList[i].border.left.color.hue, elemList[i].border.left.color.opacity) + ";\n";
            let corner = "\t border-radius: " + elemList[i].corner.topLeft + "px " + elemList[i].corner.topRight + "px " + elemList[i].corner.bottomRight + "px " + elemList[i].corner.bottomLeft + "px;\n";
    
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

    let lol = document.getElementsByClassName('orange');
    for(i=0; i<=lol.length-1; i++){
        let bouarf = /<span class="green">/g;
        let bouarf2 = /<\/span>/g;
        let str = lol[i].innerHTML;
        let strFinal = str.replace(bouarf, '');
        let strFinal2 = strFinal.replace(bouarf2, '');
        console.log(str);
        console.log(strFinal2);
        lol[i].innerHTML = strFinal2; 
    }
}

setInterval(htmlGeneration, 1000);
setInterval(cssGeneration, 1000);

let regexEndTag = /<\/[^>]+>/g; //balise fermante
let regexbeginTag = /<[^>]+>/g; //balise ouvrante

let regexId = /#[^\s]+/g;
let regexCssRules = /[^\s]+:/g;
let regexNum = /\d+(?:\.\d+)?/g;
let regexAccolade = /[{|}]/g;
let regexRgbaPx = /rgba|px/g;
let regexparenthese = /[(|)]/g;
let regexTwoDot = /:/g;
let regexWord = /none|visible|block|\sflex|center|row|reverse|column|\swrap|nowrap|initial/g;