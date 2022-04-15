let elements = document.getElementsByClassName("html-element");

let elementList  = [];

function createElement(){
    for (i=0; i<=elements.length-1; i++){
        let elementNumber = i;
        let opacityNumber = elementNumber*4;
    
        elementList[elementNumber] = 
        {
            id : idNames[elementNumber].value,
            color : colorModuleList[elementNumber],
            shader : shaderModuleList[elementNumber],
            corner : cornerModuleList[elementNumber],
            border : borderModuleList[elementNumber],
            box : boxModuleList[elementNumber]
        }
    
        idNames[elementNumber].addEventListener("input", function(){
            idNames[elementNumber].setAttribute("value", idNames[elementNumber].value);
            elementList[elementNumber].id = idNames[elementNumber].value;
        })
    }
}

function createModule(){
    createOpacity();
    createColor();
    createBorder();
    createCorner();
    createShader();
    createBox();
    createElement();
}