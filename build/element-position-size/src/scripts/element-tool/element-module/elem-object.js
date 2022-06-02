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
            box : boxModList[elemNum],
            size : {
                width : 60,
                height : 60
            },
            grid : {
                left : 1,
                top : 1,
                right : 2,
                bottom : 2
            },
            place : {
                left : 0,
                top : 0
            } 
        }
        elemIFList[elemNum] = 
        {
            shader : shaderIFList[elemNum],
            corner : cornerIFList[elemNum],
            border : borderIFList[elemNum],
            box : boxIFList[elemNum],
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
    createResetBtn();
    createTrashBtn();
    createElement();
}
