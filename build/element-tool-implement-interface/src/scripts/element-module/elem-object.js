let elementList  = [];
let elementInterfaceList = [];

for (i=0; i<=elements.length-1; i++){
    let elementNumber = i;
    let opacityNumber = elementNumber*4;

    elementList[elementNumber] = 
    {
        id :  nameModuleList[elementNumber],
        color : colorModuleList[elementNumber],
        shader : shaderModList[elementNumber],
        corner : cornerModuleList[elementNumber],
        border : borderModuleList[elementNumber],
        box : boxModuleList[elementNumber]
    }
    elementInterfaceList[elementNumber] = 
    {
        shader : shaderIFList[elementNumber]
    }
}
