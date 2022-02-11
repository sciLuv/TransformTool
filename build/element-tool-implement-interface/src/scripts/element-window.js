/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Element-Window (bar?)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
//Element module creation, in element windows

let moreElementBtn = document.getElementById("btn-more-tool");

moreElementBtn.addEventListener("click", function(){
    fetch('data/element-module.txt')
    .then(response => response.text())
    .then(data => {

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


        for (i=0; i<=elemList.length-1; i++){
            saveElemList.push(elemList[i]);
            saveNameModList.push(nameModList[i]);
            saveColorModList.push(colorModList[i]);
            saveShaderModList.push(shaderModList[i]);
            saveCornerModList.push(cornerModList[i]);
            saveBorderModList.push(borderModList[i]);
            saveBoxModList.push(boxModList[i]);

            saveElemIFList.push(elemIFList[i]);
            saveShaderIFList.push(shaderIFList[i]);
            saveCornerIFList.push(cornerIFList[i]);
            saveBorderIFList.push(borderIFList[i]);
            saveBoxIFList.push(boxIFList[i]);
        }

        elementModulesContainer.innerHTML += data;
        createModule();

        for (i=0; i<=saveElemList.length-1; i++){
            elemList.splice(i, 1, saveElemList[i]);
            nameModList.splice(i, 1, saveNameModList[i]);
            colorModList.splice(i, 1, saveColorModList[i]);
            shaderModList.splice(i, 1, saveShaderModList[i]);
            cornerModList.splice(i, 1, saveCornerModList[i]);
            borderModList.splice(i, 1, saveBorderModList[i]);
            boxModList.splice(i, 1, saveBoxModList[i]);

            elemIFList.splice(i, 1, saveElemIFList[i]);
            shaderIFList.splice(i, 1, saveShaderIFList[i]);
            cornerIFList.splice(i, 1, saveCornerIFList[i]);
            borderIFList.splice(i, 1, saveBorderIFList[i]);
            boxIFList.splice(i, 1, saveBoxIFList[i]);
        }

        for (i=0; i<=elemList.length-1; i++){
            let num = i;
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
    })
})