/*~~~~~~~~~~~~~~~~~~~~~~~~~~testing transform tool~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

//here place the element you want test


let body = document.getElementById('body');
let fonctionning = document.getElementById('fonctionning');

let btnScaleX = document.getElementById('scale-x');
let btnScaleY = document.getElementById('scale-y');
let btnScaleZ = document.getElementById('scale-z');
let btnRotateX = document.getElementById('rotate-x');
let btnRotateY = document.getElementById('rotate-y');
let btnRotateZ = document.getElementById('rotate-z');
let btnTranslateX = document.getElementById('translate-x');
let btnTranslateY = document.getElementById('translate-y');
let btnTranslateZ = document.getElementById('translate-z');
let btnSkewX = document.getElementById('skew-x');
let btnSkewY = document.getElementById('skew-y');

let arrowUp = document.getElementById('arrow-up');
let arrowDown = document.getElementById('arrow-down');

let addingHTML = document.getElementById("adding-HTML");
let controlSpace = document.getElementById("control-space");
let selectedHTML = document.getElementById('selected-HTML');
let addingCSS = document.getElementById('adding-CSS');
let toAddedCSS = document.getElementById('CSS-to-added');
let selectedCSS = document.getElementById('selected-CSS');

let selectedID = document.getElementById('selected-ID');
let goToSelectID = document.getElementById('selected-ID-after'); 

let reset = document.getElementById('reset');
let saveList = [];

controlSpace.innerHTML = addingHTML.value;

let actualID = "element";
element = document.getElementById(actualID);


function addHTMLSelect(){
    controlSpace.innerHTML = addingHTML.value;
}
addHTMLSelect();
selectedHTML.addEventListener('mousedown', goToSelectHTMLFunction);
function goToSelectHTMLFunction (){
    addHTMLSelect();
}

function addSelectCSS(){
    toAddedCSS.innerHTML = addingCSS.value 
}
addSelectCSS();
selectedCSS.addEventListener('mousedown', goToSelectCSSFunction);
function goToSelectCSSFunction (){
    addSelectCSS();
}

function addAIDSelect(){

    console.log(actualID);
    let stateNewID = false;
    let stateActualID = false;
    let infoNewID;
    let infoActualID;

    if(saveList.length > 0){
        for(i=0; i <= saveList.length-1; i++){
            if(saveList[i].elementid == actualID){
                stateActualID = true;
                saveList[i].elementSX = scaleX;
                saveList[i].elementSY = scaleY;
                saveList[i].elementSZ = scaleZ;
                saveList[i].elementRX = rotationX;
                saveList[i].elementRY = rotationY;
                saveList[i].elementRZ = rotationZ;
                saveList[i].elementTX = translationX;
                saveList[i].elementTX = translationX;
                saveList[i].elementTZ = translationZ;
                saveList[i].elementSKX = skewX;
                saveList[i].elementSKY = skewY;
                break;
            }
            else{
                console.log('test2');
                stateActualID = false;
            }
        }
    }
    if(stateActualID == false){
        saveList.push(
            {
                elementid : actualID,
                elementSX : scaleX,
                elementSY : scaleY,
                elementSZ : scaleZ,
                elementRX : rotationX,
                elementRY : rotationY,
                elementRZ : rotationZ,
                elementTX : translationX,
                elementTX : translationX,
                elementTZ : translationZ,
                elementSKX : skewX,
                elementSKY : skewY
            }
        )
    }

    actualID = selectedID.value;
    console.log(actualID);

    for(i=0; i <= saveList.length-1; i++){
        if(saveList[i].elementid == actualID){
            scaleX = saveList[i].elementSX;
            scaleY = saveList[i].elementSY;
            scaleZ = saveList[i].elementSZ;
            rotationX = saveList[i].elementRX;
            rotationY = saveList[i].elementRY;
            rotationZ = saveList[i].elementRZ;
            translationX = saveList[i].elementTX;
            translationX = saveList[i].elementTX;
            translationZ = saveList[i].elementTZ;
            skewX = saveList[i].elementSKX;
            skewY = saveList[i].elementSKY;
            break;
        }
        else{
            scaleX=1, scaleY=1, scaleZ=1, rotationX=0, rotationY=0, rotationZ=0, translationX=0, translationY=0, translationZ=0, skewX=0, skewY=0; 
        }
    }

    element = document.getElementById(actualID);
    console.log(actualID);
    

}
goToSelectID.addEventListener('mousedown', goToSelectIDFunction);
function goToSelectIDFunction (){
    addAIDSelect();
}

reset.addEventListener('mousedown', resetFunction);
function resetFunction (){
    scaleX=1, scaleY=1, scaleZ=1, rotationX=0, rotationY=0, rotationZ=0, translationX=0, translationY=0, translationZ=0, skewX=0, skewY=0; 
}



//write in HTML the CSS propriertranslationY and his rule, to copy them
let writingTransformCSSPropriety = document.getElementById('writing-transform-css-propriety');

writingTransformCSSPropriety.innerHTML = "transform : scaleX(1) scaleY(1) scaleZ(1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateX(0px) translateY(0px) translateZ(0px) skewX(0deg) skewY(0deg);";

btnNeutralColor = "rgba(255, 255, 255, 0.267)";
btnSelectedColor = "rgb(253, 107, 107)";

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

let scaleX=1, scaleY=1, scaleZ=1, rotationX=0, rotationY=0, rotationZ=0, translationX=0, translationY=0, translationZ=0, skewX=0, skewY=0; 
let testing = "scaleX";
let activation;
let selected = btnScaleX;
selected.style.backgroundColor = btnSelectedColor;

let selectionList = [
    {t :"scaleX", s : btnScaleX},
    {t :"scaleY", s : btnScaleY},
    {t :"scaleZ", s : btnScaleZ},
    {t :"rotationX", s : btnRotateX},
    {t :"rotationY", s : btnRotateY},
    {t :"rotationZ", s : btnRotateZ},
    {t :"translationX", s : btnTranslateX},
    {t :"translationY", s : btnTranslateY},
    {t :"translationZ", s : btnTranslateZ},
    {t :"skewX", s : btnSkewX},
    {t :"skewY", s : btnSkewY}
]
let selectionListNumber = 0;

btnScaleX.addEventListener('click', btnScaleXAction);
function btnScaleXAction (){
    selected.style.backgroundColor = btnNeutralColor;
    testing = "scaleX";
    selected = btnScaleX;
}
btnScaleY.addEventListener('click', btnScaleYAction);
function btnScaleYAction (){
    selected.style.backgroundColor = btnNeutralColor;
    testing = "scaleY";
    selected = btnScaleY;
}
btnScaleZ.addEventListener('click', btnScaleZAction);
function btnScaleZAction (){
    selected.style.backgroundColor = btnNeutralColor;
    testing = "scaleZ";
    selected = btnScaleZ;
}

btnRotateX.addEventListener('click', btnRotateXAction);
function btnRotateXAction (){
    selected.style.backgroundColor = btnNeutralColor;
    testing = "rotationX";
    selected = btnRotateX;
}
btnRotateY.addEventListener('click', btnRotateYAction);
function btnRotateYAction (){
    selected.style.backgroundColor = btnNeutralColor;
    testing = "rotationY";
    selected = btnRotateY;
}
btnRotateZ.addEventListener('click', btnRotateZAction);
function btnRotateZAction (){
    selected.style.backgroundColor = btnNeutralColor;
    testing = "rotationZ";
    selected = btnRotateZ;
}

btnTranslateX.addEventListener('click', btnTranslateXAction);
function btnTranslateXAction (){
    selected.style.backgroundColor = btnNeutralColor;
    testing = "translationX";
    selected = btnTranslateX;
}
btnTranslateY.addEventListener('click',btnTranslateYAction);
function btnTranslateYAction (){
    selected.style.backgroundColor = btnNeutralColor;
    testing = "translationY";
    selected = btnTranslateY;
}
btnTranslateZ.addEventListener('click', btnTranslateZAction);
function btnTranslateZAction (){
    selected.style.backgroundColor = btnNeutralColor;
    testing = "translationZ";
    selected = btnTranslateZ;
}

btnSkewX.addEventListener('click', btnSkewXAction);
function btnSkewXAction (){
    selected.style.backgroundColor = btnNeutralColor;
    testing = "skewX";
    selected = btnSkewX;
}
btnSkewY.addEventListener('click', btnSkewYAction);
function btnSkewYAction (){
    selected.style.backgroundColor = btnNeutralColor;
    testing = "skewY";
    selected = btnSkewY;
}

body.addEventListener('keydown', test);
function test (event){
    let key = event.key;
        if (key == ("8")){
            activation ="more";
        }
        if (key == ("5")){
            activation ="less";
    }
    if(key == ("4")){
        selected.style.backgroundColor = btnNeutralColor;
        if(selectionListNumber <= 0){ selectionListNumber = 10}
        else{
            selectionListNumber --;
        }
        testing = selectionList[selectionListNumber].t;
        selected = selectionList[selectionListNumber].s;
    }
    if(key == ("6")){
        selected.style.backgroundColor = btnNeutralColor;
        if(selectionListNumber >= 10){ selectionListNumber = 0}
        else{
            selectionListNumber ++;
        }
        testing = selectionList[selectionListNumber].t;
        selected = selectionList[selectionListNumber].s;
    }
}

body.addEventListener('keyup', stop);
function stop (event){
    let key = event.key;
    if (key == ("8")){
        activation ="";
    }
    if (key == ("5")){
        activation ="";
    }
}

arrowUp.addEventListener('mousedown', arrow1);
function arrow1 (){
    activation ="more";
}
arrowDown.addEventListener('mousedown', arrow2);
function arrow2 (){
    activation ="less";
}
body.addEventListener('mouseup', stopArrow);
function stopArrow (){
    activation ="";
}


function active(){
    if( activation == "more"){
        switch (testing){
            case "scaleX": scaleX += 0.025; break;
            case "scaleY": scaleY += 0.025; break;
            case "scaleZ": scaleZ += 0.025; break;
            case "rotationX": rotationX += 1.25; break;
            case "rotationY": rotationY += 1.25; break;
            case "rotationZ": rotationZ += 1.25; break;
            case "translationX": translationX += 1.25; break;
            case "translationY": translationY += 1.25; break;
            case "translationZ": translationZ += 1.25; break;
            case "skewX": skewX += 1.25; break;
            case "skewY": skewY += 1.25; break;
        }
    }
    else if(activation == "less"){
        switch (testing){
            case "scaleX": scaleX -= 0.025; break;
            case "scaleY": scaleY -= 0.025; break;
            case "scaleZ": scaleZ -= 0.025; break;
            case "rotationX": rotationX -= 1.25; break;
            case "rotationY": rotationY -= 1.25; break;
            case "rotationZ": rotationZ -= 1.25; break;
            case "translationX": translationX -= 1.25; break;
            case "translationY": translationY -= 1.25; break;
            case "translationZ": translationZ -= 1.25; break;
            case "skewX": skewX -= 1.25; break;
            case "skewY": skewY -= 1.25; break;
        }
    }
}

function testverif(){
    element = document.getElementById(actualID);
    element.style.transform = "scaleX(" + scaleX + ") scaleY(" + scaleY + ") scaleZ(" + scaleZ + ") rotateX(" + rotationX + "deg) rotateY(" + rotationY + "deg) rotateZ(" + rotationZ + "deg) translateX(" + translationX + "px) translateY(" + translationY + "px) translateZ(" + translationZ + "px) skewX(" + skewX + "deg) skewY(" + skewY + "deg)";
    writingTransformCSSPropriety.innerHTML = "transform : scaleX(" + scaleX + ") scaleY(" + scaleY + ") scaleZ(" + scaleZ + ") rotateX(" + rotationX + "deg) rotateY(" + rotationY + "deg) rotateZ(" + rotationZ + "deg) translateX(" + translationX + "px) translateY(" + translationY + "px) translateZ(" + translationZ + "px) skewX(" + skewX + "deg) skewY(" + skewY + "deg);";
    selected.style.backgroundColor = btnSelectedColor;
}

let testor = setInterval(testverif, 20);
let activator = setInterval(active, 20);



let idList =[]
let searchInHTML = addingHTML.value;
let searchID = /(id=")[a-zA-Z1-9-_]+(")/;

console.log(searchInHTML);

let result1 = searchID[Symbol.match](searchInHTML);
let result2 = searchID.test(searchInHTML);
console.log(result1);
console.log(result2);

console.log(result1[0]);


/*
prendre le searchInHTML = addingHTML.value;
chercher dedans une expression réguliere
enlevé de addingHTML l'expréssion réguliere
enlevé les bout inutile de l'expression réguliere
garder ce qui reste dans un tableau
refaire ca tant qu'il reste des expression réguliere

*/