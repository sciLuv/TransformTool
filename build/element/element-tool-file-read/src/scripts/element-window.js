let moreElementBtn = document.getElementById("btn-more-tool");
let elementModulesContainer = document.getElementById("all-elements");

moreElementBtn.addEventListener("click", function(){
    fetch('data/element-module.txt')
    .then(response => response.text())
    .then(data => {

        let saveElementList = [];
        //let saveOpacityButtonList = [];
        let saveColorModuleList = [];
        let saveShaderModuleList = [];
        let saveCornerModuleList = [];
        let saveBorderModuleList = [];
        let saveBoxModuleList = []

        for (i=0; i<=elementList.length-1; i++){
            saveElementList.push(elementList[i]);
            /*for(j=0; j<=4; j++){
                console.log("test");
                console.log(opacityButtonList[i*j]);
                saveOpacityButtonList.push(opacityButtonList[i*j])
            }*/
            saveColorModuleList.push(colorModuleList[i]);
            saveShaderModuleList.push(shaderModuleList[i]);
            saveCornerModuleList.push(cornerModuleList[i]);
            saveBorderModuleList.push(borderModuleList[i]);
            saveBoxModuleList.push(boxModuleList[i]);
        }
        elementModulesContainer.innerHTML += data;
        createModule();

        console.log(saveElementList);

        for (i=0; i<=saveElementList.length-1; i++){
            elementList.splice(i, 1, saveElementList[i]);
            /*for(j=0; j<=3; j++){
                opacityButtonList.splice(i*j, 1, saveOpacityButtonList[i*j]);
            }*/
            colorModuleList.splice(i, 1, saveColorModuleList[i]);
            shaderModuleList.splice(i, 1, saveShaderModuleList[i]);
            cornerModuleList.splice(i, 1, saveCornerModuleList[i]);
            borderModuleList.splice(i, 1, saveBorderModuleList[i]);
            boxModuleList.splice(i, 1, saveBoxModuleList[i]);
        }

        //mise a jours visuel
        for (i=0; i<=elementList.length-1; i++){

            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~maj-color~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
            colors[i].value = elementList[i].color.hue;
            opacityButtonList[i*4].opacityRange.value = elementList[i].color.opacity;

            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~maj-shader~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
            let shaderSelectNumber;
            let shaderSelected = shaderSelectors[i].children;
            for(j=0; j<=shaderSelected.length-1; j++){
                if(shaderSelected[j].hasAttribute("selected")){
                    console.log(shaderSelected[j].value);
                    shaderSelectNumber = shaderSelected[j].value;
                }
            }
            shaderRanges[i].value = shaderModuleList[i][shaderSelectNumber-1].placement;
            shaderColors[i].value = shaderModuleList[i][shaderSelectNumber-1].color.hue;
            degreeButtons[i].style.transform = "rotate(" + shaderModuleList[i][0].degree + "deg)";
            opacityButtonList[1+(i*4)].opacityRange.value = shaderModuleList[i][shaderSelectNumber-1].color.opacity;

            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~maj-corner~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
            //permet la mise à jour visuel du range de selection de la valeur de la courbure, en fonctions des coins séléctionné
            //tableau qui contiendra les valeurs des coins séléctionné pour la mise à jour visuel
            selectedCorner = [];
            //les 4 conditions suivante permettent d'ajouté ou non les valeurs des différentes coins.
            if(topLefts[i].hasAttribute("active")){
                selectedCorner.push(cornerModuleList[i].topLeft);
            }
            if(topRights[i].hasAttribute("active")){
                selectedCorner.push(cornerModuleList[i].topRight);
            }
            if(bottomRights[i].hasAttribute("active")){
                selectedCorner.push(cornerModuleList[i].bottomRight);
            }
            if(bottomLefts[i].hasAttribute("active")){
                selectedCorner.push(cornerModuleList[i].bottomLeft);
            }

            for(k=0; k<=selectedCorner.length-1; k++){
                //selection de la valeur de range commune aux coins séléctionné
                cornerSelectedValueTest = selectedCorner[0];
                if(selectedCorner[k] == selectedCorner[0]){
                    radiusRanges[i].value = selectedCorner[0];
                }
                //valeur de courbure représenté par défaut si pas de correspondance entre les elements sélectionné
                else{
                    radiusRanges[i].value = 0;
                    break;
                }
            }

            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~maj-border~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
            selectedBorder = [];
            if(topBorderSelectors[i].hasAttribute("active")){
                selectedBorder.push(borderModuleList[i].top)
            }
            if(leftBorderSelectors[i].hasAttribute("active")){
                selectedBorder.push(borderModuleList[i].left)
            }
            if(rightBorderSelectors[i].hasAttribute("active")){
                selectedBorder.push(borderModuleList[i].right)
            }
            if(bottomBorderSelectors[i].hasAttribute("active")){
                selectedBorder.push(borderModuleList[i].bottom)
            }
            
            //boucle permettant mise a jour de l'input d'attribution de couleur
            for(l=0; l<=selectedBorder.length-1; l++){
                //selection de la couleur commune
                if(selectedBorder[l].color.hue == selectedBorder[0].color.hue){
                        borderColors[i].value = selectedBorder[0].color.hue;
                }
                //couleur représenté par défault si pas de correspondance entre les elements sélectionné
                else{
                        borderColors[i].value = "#000000";
                }
            }
            //boucle permettant la mise a jours du range de la taille des bordures
            for(l=0; l<=selectedBorder.length-1; l++){
                //selection de la taille de bordure commune
                if(selectedBorder[l].size == selectedBorder[0].size){
                        borderRanges[i].value = selectedBorder[0].size;
                }
                //taille représenté par défault si pas de correspondance entre les bordures sélectionné
                else{
                        borderRanges[i].value = 0;
                }
            }
            //boucle permettant la mise a jour de l'input d'opacité (la couleur du bouton, et le placement du range)
            for(l=0; l<=selectedBorder.length-1; l++){
                //selection de l'opacité de bordure commune
                if(selectedBorder[l].color.opacity == selectedBorder[0].color.opacity){
                        opacityButtonList[2+(i*4)].opacityRange.value = selectedBorder[0].color.opacity;
                        let opacityRepre = Math.abs(Math.trunc((selectedBorder[0].color.opacity/100)*255)-255);
                        opacityButtonList[2+(i*4)].opacityInsideButton.style.backgroundColor = "rgb(" + opacityRepre + ", " + opacityRepre + ", " + opacityRepre + ")";
                }
                //opacité par défault si pas de correspondance entre les bordures selectionné
                else{
                        opacityButtonList[2+(i*4)].opacityRange.value = 100;
                        opacityButtonList[2+(i*4)].opacityInsideButton.style.backgroundColor = "black";
                    }
            }

            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~maj-box~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
            console.log(boxModuleList[i][0].offset);
            let boxSelectNumber;
            let boxSelected = boxSelectors[i].children;
            for(j=0; j<=boxSelected.length-1; j++){
                if(boxSelected[j].hasAttribute("selected")){
                    boxSelectNumber = boxSelected[j].value;
                    console.log(boxSelected[j].value);
                    console.log(boxSelectNumber);
                }
            }
            if(interuptorSelectsXYs[i].hasAttribute("active")){
                console.log(boxModuleList[i][boxSelectNumber-1]);
                boxRangeXYs[i].value = boxModuleList[i][boxSelectNumber-1].offset.x;
            }
            else{
                console.log(boxModuleList[i][boxSelectNumber-1]);
                boxRangeXYs[i].value = boxModuleList[i][boxSelectNumber-1].offset.y;
            }
            if(interuptorSpreadBlurs[i].hasAttribute("active")){
                boxRangeBSs[i].value = boxModuleList[i][boxSelectNumber-1].radius.blur;
            }
            else{
                boxRangeBSs[i].value = boxModuleList[i][boxSelectNumber-1].radius.spread;
            }
            boxInsetCheckBoxs[i].checked = boxModuleList[i][boxSelectNumber-1].inset;
            boxColors[i].value = boxModuleList[i][boxSelectNumber-1].color.hue;
            opacityButtonList[3+(i*4)].opacityRange.value = boxModuleList[i][boxSelectNumber-1].color.opacity;

        }
    });
})