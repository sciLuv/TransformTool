let elemList  = [];
let elemIFList = [];

function createElement(){
    for (i=0; i<=elements.length-1; i++){
        let elemNum = i;
        let opaNum = elemNum*4;
    
        elemList[elemNum] = 
        {
            id :  nameModList[elemNum],
            color : colorModList[elemNum],
            shader : shaderModList[elemNum],
            corner : cornerModList[elemNum],
            border : borderModList[elemNum],
            box : boxModList[elemNum]
        }
        elemIFList[elemNum] = 
        {
            shader : shaderIFList[elemNum],
            corner : cornerIFList[elemNum],
            border : borderIFList[elemNum],
            box : boxIFList[elemNum]
        }
    }
}

function createModule(){
    createOpacity();
    createName();
    createColor();
    createBorder();
    createCorner();
    createShader();
    createBox();
    createElement();
}
