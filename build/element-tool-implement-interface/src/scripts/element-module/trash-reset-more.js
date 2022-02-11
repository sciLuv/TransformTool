let resetBtns = document.getElementsByClassName("element-bar-reset");
let trashBtns = document.getElementsByClassName("element-bar-trash")

function createTrashBtn(){
    for(i=0; i<= elements.length-1; i++){
        let trashNum = i;
        trashBtns[trashNum].addEventListener("click", function(){
            fetch('data/element-module.txt')
            .then(response => response.text())
            .then(data => {
                elementModulesContainer.innerHTML = "";

                let saveElemList = [];
                let saveNameModList = [];
                let saveColorModList = [];
                let saveShaderModList = [];
                let saveCornerModList = [];
                let saveBorderModList = [];
                let saveBoxModList = []
                
        
                let saveElemIFList = [];
                let saveShaderIFList = [];
                let saveCornerIFList = [];
                let saveBorderIFList = [];
                let saveBoxIFList = []
    
                elemList.splice(trashNum, 1);
                nameModList.splice(trashNum, 1);
                colorModList.splice(trashNum, 1);
                shaderModList.splice(trashNum, 1);
                cornerModList.splice(trashNum, 1);
                borderModList.splice(trashNum, 1);
                boxModList.splice(trashNum, 1);
    
                elemIFList.splice(trashNum, 1);
                shaderIFList.splice(trashNum, 1);
                cornerIFList.splice(trashNum, 1);
                borderIFList.splice(trashNum, 1);
                boxIFList.splice(trashNum, 1);
    
                for(j=0; j<=elemList.length-1; j++){
                    saveElemList.push(elemList[j]);
                    saveNameModList.push(nameModList[j]);
                    saveColorModList.push(colorModList[j]);
                    saveShaderModList.push(shaderModList[j]);
                    saveCornerModList.push(cornerModList[j]);
                    saveBorderModList.push(borderModList[j]);
                    saveBoxModList.push(boxModList[j]);
        
                    saveElemIFList.push(elemIFList[j]);
                    saveShaderIFList.push(shaderIFList[j]);
                    saveCornerIFList.push(cornerIFList[j]);
                    saveBorderIFList.push(borderIFList[j]);
                    saveBoxIFList.push(boxIFList[j]);
                }

                for (k=0; k<=elemList.length-1; k++){
                elementModulesContainer.innerHTML += data;
                }
                createModule();
    
                for (k=0; k<=elements.length-1; k++){
                    elemList.splice(k, 1, saveElemList[k]);
                    nameModList.splice(k, 1, saveNameModList[k]);
                    colorModList.splice(k, 1, saveColorModList[k]);
                    shaderModList.splice(k, 1, saveShaderModList[k]);
                    cornerModList.splice(k, 1, saveCornerModList[k]);
                    borderModList.splice(k, 1, saveBorderModList[k]);
                    boxModList.splice(k, 1, saveBoxModList[k]);
        
                    elemIFList.splice(k, 1, saveElemIFList[k]);
                    shaderIFList.splice(k, 1, saveShaderIFList[k]);
                    cornerIFList.splice(k, 1, saveCornerIFList[k]);
                    borderIFList.splice(k, 1, saveBorderIFList[k]);
                    boxIFList.splice(k, 1, saveBoxIFList[k]);
                }
    
                for (o=0; o<=elemList.length-1; o++){
                    let num = o;
                    //name
                    idNames[num].value = nameModList[num].name;
                    //color
                    colors[num].value = colorModList[num].hue;
                    opaVisualChgt(colorModList[num].opacity, (num*4));
                    //shader
                    opaVisualChgt(elemList[num].shader[elemIFList[num].shader.shaderSelectNum-1].color.opacity, 1+(num*4))
                    colorVisualChgt(shaderColors[num],elemList[num].shader[elemIFList[num].shader.shaderSelectNum-1]);
                    rangeVisualChgt(shaderRanges[num], elemList[num].shader[elemIFList[num].shader.shaderSelectNum-1]);
                    //corner
                    visualChgtCorner(
                        elemIFList[num].corner.CornerInteruptorTL, elemIFList[num].corner.CornerInteruptorTR, 
                        elemIFList[num].corner.CornerInteruptorBR, elemIFList[num].corner.CornerInteruptorBL, 
        
                        elemList[num].corner.topLeft, elemList[num].corner.topRight, 
                        elemList[num].corner.bottomRight, elemList[num].corner.bottomLeft, 
        
                        radiusRanges[num])
                    //border
                    visualChgtBorder(
                        elemIFList[num].border.interuptorTB, elemIFList[num].border.interuptorLB, 
                        elemIFList[num].border.interuptorRB, elemIFList[num].border.interuptorBB, 
                        elemList[num].border.top, elemList[num].border.left, 
                        elemList[num].border.right, elemList[num].border.bottom, 
                        borderRanges[num], 
                        borderColors[num], 
                        2+(num*4),
                        borderStyles[num].options[borderStyles[num].selectedIndex], borderStyles[num])
                    //box
                    visualChgtBox(
                        elemList[num].box[elemIFList[num].box.boxSelectNum-1], 
                        elemIFList[num].box, 
                        boxInsetCheckBoxs[num], 
                        boxRangeXYs[num], 
                        boxRangeBSs[num], 
                        boxColors[num], 
                        elemList[num].box[elemIFList[num].box.boxSelectNum-1], 3+(num*4))
                }
                for(j=trashNum; j<=elements.length-1; j++){
                    //shader
                    for(k=2; k<=shaderIFList[j].shaderNum; k++){
                        shaderSelectors[j].innerHTML += '<option value="' + k + '">' + k + '</option>';
                        if(k == shaderIFList[j].shaderSelectNum){
                            shaderSelectors[j].children[k-1].setAttribute("selected", "");
                            shaderSelectors[j].selectedIndex = k-1;
                        }
                    }
                    if(shaderIFList[j].interuptor == true){
                        btnSelectGradients[j].setAttribute("active", "");
                        degreeButtons[j].removeAttribute("active");
                    }
                    degreeButtons[j].style.transform = "rotate(" + shaderModList[j][0].degree + "deg)";
                    shaderIFList[j].degreeBtn.btnNum--;
                    //corner
                    if(cornerIFList[j].CornerInteruptorTL == true){
                        topLefts[j].setAttribute("active","")
                    }
                    if(cornerIFList[j].CornerInteruptorTR == true){
                        topRights[j].setAttribute("active","")
                    }
                    if(cornerIFList[j].CornerInteruptorBL == true){
                        bottomLefts[j].setAttribute("active","")
                    }
                    if(cornerIFList[j].CornerInteruptorBR == true){
                        bottomRights[j].setAttribute("active","")
                    }
                    //border
                    if(borderIFList[j].interuptorTB == true){
                        topBorderSelectors[j].setAttribute("active","")
                    }
                    if(borderIFList[j].interuptorRB == true){
                        rightBorderSelectors[j].setAttribute("active","")
                    }
                    if(borderIFList[j].nteruptorLB == true){
                        leftBorderSelectors[j].setAttribute("active","")
                    }
                    if(borderIFList[j].interuptorBB == true){
                        bottomBorderSelectors[j].setAttribute("active","")
                    }
                    //box
                    let boxNum;
                    for(k=2; k<=boxIFList[j].boxNum; k++){
                        boxSelectors[j].innerHTML += '<option value="' + k + '">' + k + '</option>';
                        if(k == boxIFList[j].boxSelectNum){
                            boxSelectors[j].children[k-1].setAttribute("selected", "");
                            boxSelectors[j].selectedIndex = k-1;
                            boxNum = k-1;
                        }
                    }
                    if(boxIFList[j].interuptorXY == true){
                        interuptorSelectsXYs[j].setAttribute("active", "");
                        boxRangeXYs[j].value = boxModList[j][boxNum].offset.x;
                    }
                    else{
                        boxRangeXYs[j].value = boxModList[j][boxNum].offset.y;
                    }
                    if(boxIFList[j].interuptorBS == true){
                        interuptorSpreadBlurs[j].setAttribute("active", "");
                        boxRangeBSs[j] = boxModList[j][boxNum].radius.blur;
                        boxRangeBSs[j].setAttribute("min", "0");
                    }
                    else{
                        boxRangeBSs[j] = boxModList[j][boxNum].radius.spread;
                        boxRangeBSs[j].setAttribute("min", "-100");
                    }
                }
            })
        })
    }
}

function createResetBtn(){
    for(i=0; i<= elements.length-1; i++){
        let resetNum = i;
        resetBtns[resetNum].addEventListener("click", function(){
            console.log(resetNum);
            //~~~~~~~~~~~~~~~~~~~~RESET ELEMENT~~~~~~~~~~~~~~~~~~~~~//
            //id
            nameModList[resetNum].name = "element-" + (resetNum+1);
            //color
            colorModList[resetNum].hue = "#009DFF";
            colorModList[resetNum].opacity = 100;
            //shader
            shaderIFList[resetNum].shaderNum = 1;
            shaderIFList[resetNum].shaderSelectNum = 1;
            shaderIFList[resetNum].interuptor = false;
            shaderIFList[resetNum].degreeBtn.btnNum = 0;
            shaderIFList[resetNum].degreeBtn.degree = 0;
            shaderIFList[resetNum].degreeBtn.degreeInteruptor = false;
            shaderIFList[resetNum].degreeBtn.initVal = 0;

            shaderModList[resetNum] = [];
            shaderModList[resetNum][0] = {
                placement : 0, gradient : "linear", degree : 0,
                color : { hue : "#FFA200",opacity : 100 }
            }
            //corner
            cornerIFList[resetNum].cornerSelectorSelectionCounter = 1;
            cornerIFList[resetNum].CornerInteruptorTL = false;
            cornerIFList[resetNum].CornerInteruptorTR = false;
            cornerIFList[resetNum].CornerInteruptorBR = false;
            cornerIFList[resetNum].CornerInteruptorBL = false;

            cornerModList[resetNum].topLeft = 0;
            cornerModList[resetNum].topRight = 0;
            cornerModList[resetNum].bottomRight = 0;
            cornerModList[resetNum].bottomLeft = 0;
            //border
            borderIFList[resetNum].borderSelectorCounter = 1;
            borderIFList[resetNum].interuptorTB = false;
            borderIFList[resetNum].interuptorRB = false;
            borderIFList[resetNum].interuptorLB = false;
            borderIFList[resetNum].interuptorBB = false;

            borderModList[resetNum].top.size = 0;
            borderModList[resetNum].top.style = "none";
            borderModList[resetNum].top.color.hue = "#000000";
            borderModList[resetNum].top.color.opacity = 100;
            borderModList[resetNum].right.size = 0;
            borderModList[resetNum].right.style = "none";
            borderModList[resetNum].right.color.hue = "#000000";
            borderModList[resetNum].right.color.opacity = 100;
            borderModList[resetNum].bottom.size = 0;
            borderModList[resetNum].bottom.style = "none";
            borderModList[resetNum].bottom.color.hue = "#000000";
            borderModList[resetNum].bottom.color.opacity = 100;
            borderModList[resetNum].left.size = 0;
            borderModList[resetNum].left.style = "none";
            borderModList[resetNum].left.color.hue = "#000000";
            borderModList[resetNum].left.color.opacity = 100;
            //box
            boxIFList[resetNum].boxNum = 1;
            boxIFList[resetNum].boxSelectNum = 1;
            boxIFList[resetNum].interuptorXY = false;
            boxIFList[resetNum].interuptorBS = false;

            boxModList[resetNum] = [];
            boxModList[resetNum][0] = {
                inset : false,
                radius : { spread : 0, blur : 0 },
                offset : { x : 0, y : 0 },
                color : { hue : "#969696", opacity : 100 }
            }

            console.log(elemList)
            createElement();
            //~~~~~~~~~~~~~~~~~~~~RESET VISUEL~~~~~~~~~~~~~~~~~~~~~//
            //name
            idNames[resetNum].value = nameModList[resetNum].name;
            //color
            colors[resetNum].value = colorModList[resetNum].hue;
            opaVisualChgt(colorModList[resetNum].opacity, (resetNum*4));
            //shader
            shaderSelectors[resetNum].innerHTML = '<option value="' + 1 + '">' + 1 + '</option>'
            shaderColors[resetNum].value = shaderModList[resetNum][0].color.hue;
            opaVisualChgt(shaderModList[resetNum][0].color.opacity, 1+(resetNum*4));
            btnSelectGradients[resetNum].removeAttribute("active");
            degreeButtons[resetNum].style.transform = "rotate(" + 0 + "deg)";
            degreeButtons[resetNum].setAttribute("active","");
            //corner
            topLefts[resetNum].removeAttribute("active"); 
            topRights[resetNum].removeAttribute("active"); 
            bottomRights[resetNum].removeAttribute("active"); 
            bottomLefts[resetNum].removeAttribute("active"); 
            radiusRanges[resetNum].value = 0;
            //border
            topBorderSelectors[resetNum].removeAttribute("active"); 
            leftBorderSelectors[resetNum].removeAttribute("active"); 
            rightBorderSelectors[resetNum].removeAttribute("active"); 
            bottomBorderSelectors[resetNum].removeAttribute("active"); 

            for(j=0; j<=borderStyles[resetNum].children.length-1; j++){
                if(j==0){
                    borderStyles[resetNum].children[j].setAttribute("selected","");
                    borderStyles[resetNum].selectedIndex = j;
                }
                else{
                    borderStyles[resetNum].children[j].removeAttribute("selected");
                }
            }
            borderColors[resetNum].value = borderModList[resetNum].top.color.hue;
            opaVisualChgt(borderModList[resetNum].top.color.opacity, 2+(resetNum*4));
            borderRanges[resetNum].value = 0;
            //box
            boxSelectors[resetNum].innerHTML = '<option value="' + 1 + '">' + 1 + '</option>'
            boxColors[resetNum].value = boxModList[resetNum][0].color.hue;
            opaVisualChgt(boxModList[resetNum][0].color.opacity, 3+(resetNum*4));
            boxInsetCheckBoxs[resetNum].checked = false;
            interuptorSelectsXYs[resetNum].removeAttribute("active");
            interuptorSpreadBlurs[resetNum].removeAttribute("active");
            boxRangeBSs[resetNum].setAttribute("min", "-100");
            boxRangeXYs[resetNum].value = 0;
            boxRangeBSs[resetNum].value = 0;
        })
    }
}