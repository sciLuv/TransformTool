/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ELEMENT-MODULE-ADDING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

//represent more-btn of the element-window
let moreElementBtn = document.getElementById("btn-more-tool");

//Event of the more-btn of the element-window
moreElementBtn.addEventListener("click", function(){
    fetch('data/element-module.txt')
    .then(response => response.text())
    .then(data => {
        //variables of "old" version of Elem/mod list, for after array manipulation and update of elem
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

        //adding of "old" element information in the savelist create before
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

        //adding of HTML of module element
        elementModulesContainer.innerHTML += data;
        createModule();

        //loop for adding last save information in the "new" array representing actual modules elem
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
        //visual change for the new element list
        for (i=0; i<=elemList.length-1; i++){
           allVisualChange(i); 
        }
    })
})

