let elements = document.getElementsByClassName("html-element");
let idNames = document.getElementsByClassName("text-id");
let colors = document.getElementsByClassName("color-element-input");
let shaders = document.getElementsByClassName("shader");
let radiusS = document.getElementsByClassName("radius");
let borders = document.getElementsByClassName("border");
let boxs = document.getElementsByClassName("box");

let elementList  = [];

for (i=0; i<=elements.length-1; i++){
    let elementNumber = i;
    let opacityNumber = elementNumber*4;

    elementList[elementNumber] = 
    {
        id : idNames[elementNumber].value,
        color : 
        {
            hue : colors[elementNumber].value,
            opacity : opacityButtonList[opacityNumber].opacityRange.value
        },
        shader : shaderModuleList[elementNumber],
        corner : cornerModuleList[elementNumber],
        border : borderModuleList[elementNumber],
        box : boxModuleList[elementNumber]
    }
}