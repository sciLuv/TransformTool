//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~OPACITY-BTN-RANGES~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

/** @function createOpacity Create all functionalies in link with a HTML opacity button 
    @param {number} opaBtnNum define by createColor(), ect*/
function createOpacity(opaBtnNum){
    /** @constant @type {Element} HTML opacity button*/
    let opacityButton = opaHTMLBtns[opaBtnNum];
    /** @constant HTML opacity inside part button. @type {Element}*/
    let opacityInsideButton = opaHTMLInsideBtns[opaBtnNum];
    /** @constant HTML opacity container of range. @type {Element}*/
    let opacityContainer = opaHTMLRangeContainers[opaBtnNum];
    /** @constant HTML opacity range. @type {Element}*/
    let opacityRange = opaHTMLRanges[opaBtnNum];
    /** @constant state of the button. @type {boolean} false=close, true=open*/
    let opacityInteruptor = false;

    //event listener to open the opacity button 
    opacityButton.addEventListener("click", function (){
        let btnPlace = opacityButton.getBoundingClientRect();
        let elemPlace = allElement.getBoundingClientRect();
        //openning range
        //specific graphic modulation in function of module's place of btn (color, shader, ect)
        if (opacityInteruptor == false){
            opacityContainer.style.display = "block";
            opacityInteruptor = true;
            opacityContainer.style.top = (btnPlace.top-elemPlace.top+30) +"px";
            opacityContainer.style.left = (btnPlace.left-elemPlace.left-5) + "px";
        }
        //closing range
        else{
            opacityContainer.style.display = "none";
            opacityInteruptor = false;
        }
    });
    //manage opacity value itself and his representation in the inside button
    opacityRange.addEventListener("click", function(){
        let opacityValue = opacityRange.value/100;
        let opacityRepre = Math.abs(Math.trunc(opacityValue*255)-255);
        opacityInsideButton.style.backgroundColor = "rgb(" + opacityRepre + ", " + opacityRepre + ", " + opacityRepre + ")";
    })

    //body listener, if the opacity btn is open, if you click elsewhere of it, close it
    body.addEventListener("click", function(e){
        for(i=0; i<=opaHTMLBtns.length-1; i++){
            if(((e.target != opacityRange)&&(e.target != opacityContainer)&&
            (e.target != opacityInsideButton)&&(e.target != opacityButton))&&
            (opacityInteruptor == true)){
                opacityContainer.style.display = "none";
                opacityInteruptor = false;
                break;
            }
        }
    })
}
function createListPlace(i){
    let listNum = i; //the num of the place of the element in the elemlist

    //variables in link with the interface feature of the 
    let activeListPlaceElem = false; //define state of the event of changement of placement of elem
    let elemListInInterface = []; //define interface place of each elem in element tool
    //contain info use to selected the new place of the element selected. 
    let newPlaceElem = {
        old : undefined,
        realNew : undefined
    };

    //begin the process of the changement place of the selected elem
    listPlaces[listNum].addEventListener('mousedown', beginChangePlaceListElem);
    function beginChangePlaceListElem(event){
        //if the event is not now in work
        if (activeListPlaceElem == false){
            //place of the cursor in the page, to place representation of the temporary elem selected next to it
            let mouseX = event.pageX; 
            let mouseY = event.pageY; 
            
            //creation of the representation of the temporary elem selected 
            let temporaryElem = document.createElement('div');
            let temporaryColor = document.createElement('div');
            //adding it a class 
            temporaryElem.classList.add("temporary-elem");
            temporaryColor.classList.add("temporary-elem-color");
            //adding it in the document and put in some relative information to the element
            body.appendChild(temporaryElem); 
            temporaryElem.innerHTML = elemList[listNum].id.name;
            temporaryElem.appendChild(temporaryColor);
            temporaryColor.style.backgroundColor = elemList[listNum].color.hue;

            //to place it next to the cursor
            temporaryElem.style.left = mouseX + 'px';
            temporaryElem.style.top = mouseY + 'px';
            elements[listNum].style.background = "#00000013";

            //create array of placement of interface representation of elements in elements tool
            elemListInInterface = [];
            for(l = 0; l <= elements.length-1; l++){
                //getBoundingClientRect() + window.scrollY = the place of the elem interface in elem tool in the page (not the window)
                elemListInInterface.push(elements[l].getBoundingClientRect().y + 72 + window.scrollY);
            }
            //to authorize the next step of the event to work
            activeListPlaceElem = true;
        }
    }

    //manage the selection of the new place of the element in the elem list, by the place of other elem in the element tool window
    body.addEventListener('mousemove', inChangePlaceListElem);
    function inChangePlaceListElem(event){
        //if the first step of the event is activate
        if (activeListPlaceElem == true){
            //place of the cursor in the page
            let mouseX = event.pageX; 
            let mouseY = event.pageY; 
            //replace the representation of the temporary elem selected in function of the placement of the cursor
            temporaryElem[0].style.left = mouseX + 'px';
            temporaryElem[0].style.top = mouseY + 'px';

            //change the theme of the cursor for better undestanding of the action
            body.style.cursor = "grabbing";

            //algorythm to manage graphic effect of the changement place
            //realNew et old are two variables represent the actual and the last element where the cursor are placed
            newPlaceElem.realNew = elemListInInterface.findIndex(element => element >= mouseY); 
            if(newPlaceElem.realNew == listNum){
                if((newPlaceElem.realNew != newPlaceElem.old)&&(newPlaceElem.old != listNum)&&(newPlaceElem.old != undefined)){
                    elements[newPlaceElem.old].style.background = "#ffffff";
                }
                } else {
                    if((newPlaceElem.realNew != newPlaceElem.old)&&(newPlaceElem.old != listNum)){
                        elements[newPlaceElem.old].style.background = "#ffffff";
                    }
                    elements[newPlaceElem.realNew].style.background = "linear-gradient(180deg, #ffffff 90%, #00000020 90%)";
            }
            newPlaceElem.old = newPlaceElem.realNew; 
            
        }
    }

    //finish the event
    body.addEventListener('mouseup', endChangePlaceListElem);
    function endChangePlaceListElem(){
        if (activeListPlaceElem == true){
            //to remove effect and html element create to see the element position change
            body.style.cursor = "auto";

            elements[listNum].style.background = "#00000000";
            elements[newPlaceElem.realNew].style.background = "#00000000";
            elements[newPlaceElem.old].style.background = "#00000000";
            
            temporaryElem[0].remove();

            if(newPlaceElem.realNew != listNum){
                
                document.getElementById("if-" + elemList[listNum].id.name).remove();
                document.getElementById(elemList[listNum].id.name).remove();

                let saveElem, saveElemIF;

                saveElem = elemList[listNum];
                saveElemIF = elemIFList[listNum];   


                elemList.splice(listNum, 1);
                elemIFList.splice(listNum, 1);

                elemList.splice(newPlaceElem.realNew, 0, saveElem);
                elemIFList.splice(newPlaceElem.realNew, 0, saveElemIF);
            }

            for (i=listNum; i<=elemList.length-1; i++){
                elements[i].replaceWith(elements[i].cloneNode(true));
                createModule(i)
            }


            //first step of visual change
            for (o=0; o<=elemList.length-1; o++){
                allVisualChange(o);
                //corner
                if(elemIFList[o].corner.btnPxPcSelect == false){
                    btnPxPcs[o].setAttribute("pixel", "");
                    btnPxPcs[o].removeAttribute("max");
                    radiusRanges[o].setAttribute("max", "175");
                } else {
                    btnPxPcs[o].removeAttribute("pixel");
                    btnPxPcs[o].removeAttribute("max");
                    radiusRanges[o].setAttribute("max", "100");
                }
                //shader
                shaderSelectors[o].innerHTML = "";
                for(p=1; p <= elemIFList[o].shader.shaderNum; p++){
                    let option = document.createElement("option");
                    option.innerHTML = p;
                    if(p == elemIFList[o].shader.shaderSelectNum) option.setAttribute("selected", "");
                    shaderSelectors[o].appendChild(option);
                }
                //to change the background diffusion (linear/radial) btn
                if((elemIFList[o].shader.interuptor == false)&&(btnSelectGradients[o].hasAttribute("active"))){
                    //linear
                    btnSelectGradients[o].removeAttribute("active");
                    degreeButtons[o].setAttribute("active", "");
                } 
                else if((elemIFList[o].shader.interuptor == true)&&(btnSelectGradients[o].hasAttribute("active")) == false){
                    //radial
                    btnSelectGradients[o].setAttribute("active", "");
                    degreeButtons[o].removeAttribute("active");
                }
                //visual change of linear background btn degree selection
                //premet le changement visuel du bouton
                degreeButtons[o].style.transform = "rotate(" + elemIFList[o].shader.degreeBtn.degree + "deg)";
                if(o == newPlaceElem.realNew){
                    elemIFList[o].shader.degreeBtn.btnNum = newPlaceElem.realNew;
                }
                if(o == listNum){
                    elemIFList[o].shader.degreeBtn.btnNum = listNum;
                }


                //corner
                let cornerIFArray = [
                    elemIFList[o].corner.CornerInteruptorBL,
                    elemIFList[o].corner.CornerInteruptorBR,
                    elemIFList[o].corner.CornerInteruptorTL,
                    elemIFList[o].corner.CornerInteruptorTR
                ];
                let cornerArray = [ bottomLefts[o], bottomRights[o], topLefts[o], topRights[o] ];
                let cornerCounter = 0;
                cornerIFArray.forEach(element => {
                    if(element == true){
                        cornerArray[cornerCounter].setAttribute("active", "");
                    } else {
                        cornerArray[cornerCounter].removeAttribute("active");
                    }
                    cornerCounter++;
                });

                //border
                let borderIFarray = [
                    elemIFList[o].border.interuptorRB,
                    elemIFList[o].border.interuptorTB,
                    elemIFList[o].border.interuptorBB,
                    elemIFList[o].border.interuptorLB
                ]
                let borderHTMLArray = [
                    rightBorderSelectors[o],
                    topBorderSelectors[o],
                    bottomBorderSelectors[o],
                    leftBorderSelectors[o]
                ]
                let counterBorder = 0;
                borderIFarray.forEach(element => {
                    if(element == true){
                        borderHTMLArray[counterBorder].setAttribute("active", "");
                    } else {
                        borderHTMLArray[counterBorder].removeAttribute("active");
                    }
                    counterBorder++;
                });
                //box
                boxSelectors[o].innerHTML = "";
                for(p=1; p <= elemIFList[o].box.boxNum; p++){
                    let option = document.createElement("option");
                    option.innerHTML = p;
                    if(p == elemIFList[o].box.boxSelectNum) option.setAttribute("selected", "");
                    boxSelectors[o].appendChild(option);
                }


                if((elemIFList[o].box.interuptorXY == false)&&(interuptorSelectsXYs[o].hasAttribute("active"))){
                    //y
                    interuptorSelectsXYs[o].removeAttribute("active");
                } 
                else if((elemIFList[o].box.interuptorXY == true)&&(interuptorSelectsXYs[o].hasAttribute("active")) == false){
                    //x
                    interuptorSelectsXYs[o].setAttribute("active", "");
                }

                if((elemIFList[o].box.interuptorBS == false)&&(interuptorSpreadBlurs[o].hasAttribute("active"))){
                    //y
                    interuptorSpreadBlurs[o].removeAttribute("active");
                } 
                else if((elemIFList[o].box.interuptorBS == true)&&(interuptorSpreadBlurs[o].hasAttribute("active")) == false){
                    //x
                    interuptorSpreadBlurs[o].setAttribute("active", "");
                }
            }
            
            updatePos();

            /* gridIFList[newPlaceElem.realNew].use = false; */

            createSize();
            createPlacement();
            

            activeListPlaceElem = false;
        }
    }
}

/** @function 
 *  if the module is not already create, create an object in elemList[] with caracteristic of name, else create eventListener in link with the name of element. 
 *  @params {number} give by createModule(), the number of the actual generate element
*/
function createName(elementNumber, newSameElem = null, newSameElemName = null){
        let nameNum = elementNumber;
        /**@constant use to generate later name of futur id @type {number} */
        let idNum = 1;

        //condition and loop manage assign predef name doesn't already exist
        //example : "element-3" already exist but is alone. In next creation the id was "element-1" 
        if(newSameElem == null){
            if(elemList[nameNum].id == undefined){
                for(j=0; j<= elements.length-2; j++){
    
                    if(elemList[j].id.name == ("element-" + (idNum))){
                        idNum++;
                        j= -1;
                    }
                }
                elemList[nameNum].id = {
                    name : "element-" + (idNum)
                }
            } 
        } else {
            elemList[nameNum].id = {
                name : elemList[newSameElem].id.name + "_" + newSameElemName
            }
        }
        
        //reattribution of the name, usefull in case of deletion of element with a smaller number
        idNames[nameNum].value = elemList[nameNum].id.name;

        /** When user whant to modify id name, avoid to put an existing id, or empty name 
         *  work with a boolean to do this and show an alert in case of bad modification 
        */
        idNames[nameNum].addEventListener("blur", function(){
            //~~~~~~~~~~~~~~~~~~~~~~~Vérification~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            //boolean : true : name is ok , false : not
            let validName = true;
            //loop for verifying existance of the id name for other element 
            for(j = 0; j <= elemList.length-1; j++){
                if (idNames[nameNum].value == elemList[j].id.name){
                    window.alert("Element name already exist !");
                    validName = false;
                }
            }
            //condition for verifying if ID name is empty
            if(idNames[nameNum].value == ""){
                window.alert("Element name is empty !");
                validName = false;
            }
            //~~~~~~~~~~~~~~~~~~~~~~attribution~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            //if validaName = true, modification of list & array containg ID, for the final HTML element and interface work app
            if(validName == true){
                elem = document.getElementById(elemList[nameNum].id.name);
                ifElem = document.getElementById("if-" + elemList[nameNum].id.name);
                elemList[nameNum].id.name = idNames[nameNum].value;
                elem.setAttribute("id", idNames[nameNum].value);
                ifElem.setAttribute("id", "if-" + idNames[nameNum].value)
            }
            //if validName = false reattubution of the actual name in the input text
            else{
                idNames[nameNum].value = elemList[nameNum].id.name;
            }
        })
}

//ici les fonction de mise a jour visuel de : l'opacité, la couleur, les ranges.
//opacité
//opacity = opacitybtn number
//val = en fonction du module, ou se trouve la valeur de l'opacité (dans un objet)
function opaVisualChgt(val, opacity){
    let opacityRepre = Math.abs(Math.trunc((val/100)*255)-255);
    opaHTMLInsideBtns[opacity].style.backgroundColor = "rgb(" + opacityRepre + ", " + opacityRepre + ", " + opacityRepre + ")";
    opaHTMLRanges[opacity].value = val;
}
//color
//colorInput = la représentation HTML de l'input de couleur ex : shaderColors[shaderModNum].value 
//val = en fonction du module, ou se trouve la valeur de la couleur (dans un objet)
function colorVisualChgt(colorInput,colorVal){
    colorInput.value = colorVal.color.hue;
}
//range
//rangeInput = représentaiton html de l'input de range ex :borderRanges[borderModuleNumber].value
//val = en fonction du module, ou se trouve la valeur de la couleur (dans un objet)
function rangeVisualChgt(rangeInput, rangeVal){
    rangeInput.value = rangeVal.placement;
}

//fonction de mise a jour visuel du range du module corner en fonction des coins qui sont séléctionné
function visualChgtCorner(interuptorTL, interuptorTR, InteruptorBR, interuptorBL, topLeft, topRight, bottomRight, bottomLeft, rangeInput, 
                        buttonPixelOrPercent, pixelOrPercentTL, pixelOrPercentTR, pixelOrPercentBR, pixelOrPercentBL){

    //tableau qui contiendra a chaque itération de la fonction les valeurs des coins séléctionné pour la mise à jour visuel
    let selectedCorner = [];

    let selectCornerPixelOrPercent = [];
    //les 4 conditions suivante permettent d'ajouté ou non les valeurs des différentes coins. 
    //(topLeft/topRight/bottomRight/bottomLeft, dans l'ordre)
    if(selectedCorner.length == 0){
        rangeInput.value = 0;
    }
    let cornerSelectedValueTest;
    if(interuptorTL == true){
        selectedCorner.push(topLeft);
        selectCornerPixelOrPercent.push(pixelOrPercentTL);
    }
    if(interuptorTR == true){
        selectedCorner.push(topRight);
        selectCornerPixelOrPercent.push(pixelOrPercentTR);
    }
    if(InteruptorBR == true){
        selectedCorner.push(bottomRight);
        selectCornerPixelOrPercent.push(pixelOrPercentBR);
    }
    if(interuptorBL == true){
        selectedCorner.push(bottomLeft);
        selectCornerPixelOrPercent.push(pixelOrPercentBL);
    }
    //boucle et condition permettant la mise a jour de l'input range d'attribution de valeur de courbure
    for(m=0; m<=selectedCorner.length-1; m++){
        //selection de la valeur de range commune aux coins séléctionné
        cornerSelectedValueTest = selectedCorner[0];
        if((selectedCorner[m] == selectedCorner[0])&&(selectCornerPixelOrPercent[m] == buttonPixelOrPercent)){
            rangeInput.value = selectedCorner[0];
        }
        //valeur de courbure représenté par défaut si pas de correspondance entre les elements sélectionné
        else{
            rangeInput.value = 0;
            break;
        }
    }
}
//visualChgtBorder :
//fonction permettant la mise à jour visuel des différents élément d'intéraction/sélection de style des bordures, en fonctions des bordures séléctionné
//4 parametre pour les boutons de coins
//4 parametre pour les valeurs qui garde les valeurs des points
//1 parametre qui représente le range selectionné
//1 parametre pour ceux de la fonction de couleur
//1 parametre pour la fonction de l'opacité
//2 parametre pour la selection du style de bordure

//si aucune bordure selectionné les valeurs par défault sont :  opacité:100, couleur:noir, rangetaille:0, style:none
function visualChgtBorder(interuptorTB, interuptorLB, interuptorRB, interuptorBB, top, left, right, bottom, range, colorInput, opacity, selectedStyle, otherStyle){
    //tableau qui contiendra a chaque itération de la fonction les objets des bordures sélectionné pour la mise a jour visuel  
    let modifiedBorder = [];
    //les 4 conditions suivante permettent d'ajouté ou non les objets des différentes bordures. (top/right/bottom/left, dans l'ordre)
    if(interuptorTB == true){
        modifiedBorder.push(top);
    }
    if(interuptorRB == true){
        modifiedBorder.push(right);
    }
    if(interuptorBB == true){
        modifiedBorder.push(bottom);
    }
    if(interuptorLB == true){
        modifiedBorder.push(left);
    }
    //boucle permettant mise a jour de l'input d'attribution de couleur
    if(modifiedBorder.length == 0){
        colorInput.value = "#000000";
        range.value = 0;
        opaHTMLRanges[opacity].value = 100;
        opaHTMLInsideBtns[opacity].style.backgroundColor = "black";
        selectedStyle.removeAttribute("selected");
        
    }
    for(m=0; m<=modifiedBorder.length-1; m++){
        //selection de la couleur commune
        if(modifiedBorder[m].color.hue == modifiedBorder[0].color.hue){
            colorInput.value = modifiedBorder[0].color.hue;
        }
        //couleur représenté par défault si pas de correspondance entre les elements sélectionné
        else{
            colorInput.value = "#000000";
        }
    }
    //boucle permettant la mise a jours du range de la taille des bordures
    for(m=0; m<=modifiedBorder.length-1; m++){
        //selection de la taille de bordure commune
        if(modifiedBorder[m].size == modifiedBorder[0].size){
            range.value = modifiedBorder[0].size;
        }
        //taille représenté par défault si pas de correspondance entre les bordures sélectionné
        else{
            range.value = 0;
        }
    }
    //boucle permettant la mise a jour de l'input d'opacité (la couleur du bouton, et le placement du range)
    for(m=0; m<=modifiedBorder.length-1; m++){
        //selection de l'opacité de bordure commune
        if(modifiedBorder[m].color.opacity == modifiedBorder[0].color.opacity){
            opaVisualChgt(modifiedBorder[0].color.opacity, opacity)
        }
        //opacité par défault si pas de correspondance entre les bordures selectionné
        else{
            opaHTMLRanges[opacity].value = 100;
            opaHTMLInsideBtns[opacity].style.backgroundColor = "black";
        }
    }
    //boucle permettant la mise a jour de la liste de style des bordures
    for(m=0; m<=modifiedBorder.length-1; m++){
        //selection du style de bordure commun 
        if(modifiedBorder[m].style == modifiedBorder[0].style){
            selectedStyle.removeAttribute("selected");
            //boucle+condition permettant, pour chaque style de la liste de la selectionné si elle est correspondante a la 1ere bordure de la liste 
            for(n=0; n<=9; n++){
               if(otherStyle.options[n].value == modifiedBorder[0].style){
                selectedStyle = otherStyle.options[n];
                selectedStyle.setAttribute("selected", "");  
                otherStyle.value = selectedStyle.value;
               } 
            }
            selectedStyle.setAttribute("selected", "");
        }
        //style de bordure par défaut
        else{
            selectedStyle.removeAttribute("selected");
            selectedStyle = otherStyle.options[0];
            selectedStyle.setAttribute("selected", "");
            otherStyle.value = selectedStyle.value;
            break;
        }
    }
}

//fonction de changement visuel des element de selection de la box en fonction de la box du module selectionné dans la liste
//boxModValue represente la box dans la liste des box de l'objet box se trouvant dans la boxModuleList (boxModList[boxModNum][val])
//inset représente l'input checkbox représentant l'inset de la box selectionné boxInsetCheckBoxs[inputNum]
//rangeXY rpz l'input range qui gere le placement X/Y de la box selectionné boxRangeXYs[inputNum]
//idem mais pour rangeBS
//idem mais pour colorInput
function visualChgtBox(boxModValue, boxIFValue, inset, rangeXY, rangeBS, colorInput, opaVal, opacity){
    //chgt visuel de l'input checkbox inset
    if(boxModValue.inset == false){
        inset.checked = false;
    }
    else{
        inset.checked = true;
    }
    //chgt visuel des ranges XY et BS, en fonction de l'état des interupteurs associé
    if(boxIFValue.interuptorXY == false){
        rangeXY.value = boxModValue.offset.y;
    }
    else{
        rangeXY.value = boxModValue.offset.x;
    }
    if(boxIFValue.interuptorBS == false){
        rangeBS.value = boxModValue.radius.spread;
    }
    else{
        rangeBS.value = boxModValue.radius.blur;
    }
    //chgt visuel du btn de couleur
    colorInput.value = boxModValue.color.hue;
    //chgt visuel du range d'opacité et du range de selection d'opacité
    let opacityRepre = Math.abs(Math.trunc((opaVal.color.opacity/100)*255)-255);
    opaHTMLInsideBtns[opacity].style.backgroundColor = "rgb(" + opacityRepre + ", " + opacityRepre + ", " + opacityRepre + ")";
    opaHTMLRanges[opacity].value = opaVal.color.opacity;
}
 
//tout les changement visuel en même temps
//num représente le module/element-bar selectionné
function allVisualChange(number){
    let num = number;
    //name
    idNames[num].value = elemList[num].id.name;
    //color
    colors[num].value = elemList[num].color.hue;
    opaVisualChgt(elemList[num].color.opacity, (num*4));
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

        radiusRanges[num],
        elemIFList[num].corner.btnPxPcSelect,
        elemList[num].corner.pixelOrPercent.topLeft, elemList[num].corner.pixelOrPercent.topRight,
        elemList[num].corner.pixelOrPercent.bottomRight, elemList[num].corner.pixelOrPercent.bottomLeft)
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

function createColor(elementNumber, newSameElem = null){

        let ColorNum = elementNumber;
        let opaNum = (ColorNum*4);
        createOpacity(opaNum);
        
        let beforColor = Math.floor(Math.random() * 16777215).toString(16);
        let colorElem = "#" + ("000000" + beforColor).slice(-6);

        if(newSameElem == null){
            if(elemList[ColorNum].color == undefined){
                elemList[ColorNum].color = {
                    hue : colorElem,
                    opacity : 100
                }
            }
        } else {
            elemList[ColorNum].color = {
                hue : elemList[newSameElem].color.hue,
                opacity : elemList[newSameElem].color.opacity
            }
        }
        
        colors[ColorNum].addEventListener("input", function(){
            elemList[ColorNum].color.hue = colors[ColorNum].value;
            color(ColorNum);
        })
        opaHTMLRanges[opaNum].addEventListener("input", function(){
            elemList[ColorNum].color.opacity = opaHTMLRanges[opaNum].value;
            color(ColorNum);
        })
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~BORDER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
function createBorder(i, newSameElem = null){
//boucle qui contient l'ensemble des regles de l'outil de selection de bordure
    //represente le nombre de modules de border (1 pour chaque module d'element)
    let borderNum = i;
    //permet pour chaque module de border de selectionné le range d'opacité correspondant
    let opaNum = 2+(borderNum*4);
    createOpacity(opaNum);
    if(newSameElem == null){
        if(elemIFList[borderNum].border == undefined){
            elemIFList[borderNum].border = {
                //compteur permettant de selectionné grace au bouton centrale de selection des bordure 
                //une succession de selection des différentes bordures et de leurs représentation graphique. 
                borderSelectorCounter : 1,
    
                //4 variables représentant l'état d'activation des boutons de bordure du selecteur de bordure 
                interuptorTB : false,
                interuptorRB : false,
                interuptorLB : false,
                interuptorBB : false
            }
    
            //objet qui contient l'ensemble des info de style de chacune des bordures.
            elemList[borderNum].border = {
                top :{
                    size : 0,
                    style : "none",
                    color : {
                        hue : "#000000",
                        opacity : 100
                    }
                },
                right :{
                    size : 0,
                    style : "none",
                    color : {
                        hue : "#000000",
                        opacity : 100
                    }
                },
                bottom :{
                    size : 0,
                    style : "none",
                    color : {
                        hue : "#000000",
                        opacity : 100
                    }
                },
                left :{
                    size : 0,
                    style : "none",
                    color : {
                        hue : "#000000",
                        opacity : 100
                    }
                }
            }
        }
    } else {
        elemIFList[borderNum].border = {
            borderSelectorCounter : elemIFList[newSameElem].border.borderSelectorCounter,

            interuptorTB : elemIFList[newSameElem].border.interuptorTB,
            interuptorRB : elemIFList[newSameElem].border.interuptorRB,
            interuptorLB : elemIFList[newSameElem].border.interuptorLB,
            interuptorBB : elemIFList[newSameElem].border.interuptorBB
        }

        elemList[borderNum].border = {
            top :{
                size : elemList[newSameElem].border.top.size,
                style : elemList[newSameElem].border.top.style,
                color : {
                    hue : elemList[newSameElem].border.top.color.hue,
                    opacity : elemList[newSameElem].border.top.color.opacity
                }
            },
            right :{
                size : elemList[newSameElem].border.right.size,
                style : elemList[newSameElem].border.right.style,
                color : {
                    hue : elemList[newSameElem].border.right.color.hue,
                    opacity : elemList[newSameElem].border.right.color.opacity
                }
            },
            bottom :{
                size : elemList[newSameElem].border.bottom.size,
                style : elemList[newSameElem].border.bottom.style,
                color : {
                    hue : elemList[newSameElem].border.bottom.color.hue,
                    opacity : elemList[newSameElem].border.bottom.color.opacity
                }
            },
            left :{
                size : elemList[newSameElem].border.left.size,
                style : elemList[newSameElem].border.left.style,
                color : {
                    hue : elemList[newSameElem].border.left.color.hue,
                    opacity : elemList[newSameElem].border.left.color.opacity
                }
            }
        }
    }

    //représente l'option selectionné du select de style de bordure.
    let selectedStyle = borderStyles[borderNum].options[borderStyles[borderNum].selectedIndex];
    
    //visualChangeBeforeBorderModification :
    //fonction permettant la mise à jour visuel des différents élément d'intéraction/sélection de style des bordures, en fonctions des bordures séléctionné
    //si aucune bordure selectionné les valeurs par défault sont :  opacité:100, couleur:noir, rangetaille:0, style:none
    function visualChangeBeforeBorderModification(){
        visualChgtBorder(
            elemIFList[borderNum].border.interuptorTB, elemIFList[borderNum].border.interuptorLB, 
            elemIFList[borderNum].border.interuptorRB, elemIFList[borderNum].border.interuptorBB,
             
            elemList[borderNum].border.top, elemList[borderNum].border.left, 
            elemList[borderNum].border.right, elemList[borderNum].border.bottom,
            
            borderRanges[borderNum], 
            borderColors[borderNum], 
            opaNum, 
            selectedStyle, borderStyles[borderNum]
            )
    }

    //suite de fonction qui s'activerons dans les différents EVENT qui leurs succede
    //elles permettent +/- l'attribut HTML correspondant a un selecteur de bordure activé ou non 
    //ce sont des fonction permettant un feed-back visuel a l'utilisateur, et non pas de modifié directement les valeurs des bordures
    //neutral = visuel des bords non sélectionné, activate = visuel des bords sélectionné
    function topBorderActivate(){
        topBorderSelectors[borderNum].setAttribute("active","");
    };
    function bottomBorderActivate(){
        bottomBorderSelectors[borderNum].setAttribute("active","");
    };
    function leftBorderActivate(){
        leftBorderSelectors[borderNum].setAttribute("active","");
    };
    function rightBorderActivate(){
        rightBorderSelectors[borderNum].setAttribute("active","");
    }
    function topBorderNeutral(){
        topBorderSelectors[borderNum].removeAttribute("active");
    };
    function bottomBorderNeutral(){
        bottomBorderSelectors[borderNum].removeAttribute("active");
    };
    function leftBorderNeutral(){
        leftBorderSelectors[borderNum].removeAttribute("active");
    };
    function rightBorderNeutral(){
        rightBorderSelectors[borderNum].removeAttribute("active");
    }

    //Evenement lié au bouton de selection des bordures (bouton-central du selecteur de bordure)
    //a chaque nouveau clique une nouvelle selection de bordures modifiable est faite, 
    //il y a 9 selections différentes qui se succede.
    //l'evenement utilise : 
    //les fonction neutral/active pour chgmt grahique et 
    //les variables interuptors (o/i) pour validé ou non la possibilité de modification des bord  
    borderSelects[borderNum].addEventListener("click", function(e){
        //selection de tout les bords
        if(elemIFList[borderNum].border.borderSelectorCounter == 1){
            elemIFList[borderNum].border.borderSelectorCounter++
            topBorderActivate();
            rightBorderActivate();
            bottomBorderActivate();
            leftBorderActivate();
            elemIFList[borderNum].border.interuptorTB = true;
            elemIFList[borderNum].border.interuptorRB = true; 
            elemIFList[borderNum].border.interuptorBB = true;
            elemIFList[borderNum].border.interuptorLB = true;
            visualChangeBeforeBorderModification()
        }
        //selection de la bordure haute
        else if(elemIFList[borderNum].border.borderSelectorCounter == 2){
            elemIFList[borderNum].border.borderSelectorCounter++
            topBorderActivate();
            rightBorderNeutral();
            bottomBorderNeutral();
            leftBorderNeutral();
            elemIFList[borderNum].border.interuptorTB = true;
            elemIFList[borderNum].border.interuptorRB = false; 
            elemIFList[borderNum].border.interuptorBB = false;
            elemIFList[borderNum].border.interuptorLB = false;
            borderSelects[borderNum].style.top = "-0.1px";
            visualChangeBeforeBorderModification()
        }
        //selection de la bordure droite
        else if(elemIFList[borderNum].border.borderSelectorCounter == 3){
            elemIFList[borderNum].border.borderSelectorCounter++
            topBorderNeutral();
            rightBorderActivate();
            bottomBorderNeutral();
            leftBorderNeutral();
            elemIFList[borderNum].border.interuptorTB = false;
            elemIFList[borderNum].border.interuptorRB = true; 
            elemIFList[borderNum].border.interuptorBB = false;
            elemIFList[borderNum].border.interuptorLB = false;
            borderSelects[borderNum].style.top = "0px";
            visualChangeBeforeBorderModification()
        }
        //selection de la bordure basse
        else if(elemIFList[borderNum].border.borderSelectorCounter == 4){
            elemIFList[borderNum].border.borderSelectorCounter++
            topBorderNeutral();
            rightBorderNeutral();
            bottomBorderActivate();
            leftBorderNeutral();
            elemIFList[borderNum].border.interuptorTB = false;
            elemIFList[borderNum].border.interuptorRB = false; 
            elemIFList[borderNum].border.interuptorBB = true;
            elemIFList[borderNum].border.interuptorLB = false;
            borderSelects[borderNum].style.top = "0.1px";
            visualChangeBeforeBorderModification()
        }
        //selection de la bordure gauche
        else if(elemIFList[borderNum].border.borderSelectorCounter == 5){
            elemIFList[borderNum].border.borderSelectorCounter++
            topBorderNeutral();
            rightBorderNeutral();
            bottomBorderNeutral();
            leftBorderActivate();
            elemIFList[borderNum].border.interuptorTB = false;
            elemIFList[borderNum].border.interuptorRB = false; 
            elemIFList[borderNum].border.interuptorBB = false;
            elemIFList[borderNum].border.interuptorLB = true;
            borderSelects[borderNum].style.top = "0px";
            visualChangeBeforeBorderModification()
        }
        //selection des bordure haute et droite
        else if(elemIFList[borderNum].border.borderSelectorCounter == 6){
            elemIFList[borderNum].border.borderSelectorCounter++
            topBorderActivate();
            rightBorderActivate();
            bottomBorderNeutral();
            leftBorderNeutral();
            elemIFList[borderNum].border.interuptorTB = true;
            elemIFList[borderNum].border.interuptorRB = true; 
            elemIFList[borderNum].border.interuptorBB = false;
            elemIFList[borderNum].border.interuptorLB = false;
            borderSelects[borderNum].style.top = "0px";
            visualChangeBeforeBorderModification()
        }
        //selection des bordure basse et gauche
        else if(elemIFList[borderNum].border.borderSelectorCounter == 7){
            elemIFList[borderNum].border.borderSelectorCounter++
            topBorderNeutral();
            rightBorderNeutral();
            bottomBorderActivate();
            leftBorderActivate();
            elemIFList[borderNum].border.interuptorTB = false;
            elemIFList[borderNum].border.interuptorRB = false; 
            elemIFList[borderNum].border.interuptorBB = true;
            elemIFList[borderNum].border.interuptorLB = true;
            borderSelects[borderNum].style.top = "0px";
            visualChangeBeforeBorderModification()
        }
        //selection des bordure haute et basse
        else if(elemIFList[borderNum].border.borderSelectorCounter == 8){
            elemIFList[borderNum].border.borderSelectorCounter++
            topBorderActivate();
            rightBorderNeutral();
            bottomBorderActivate();
            leftBorderNeutral();
            elemIFList[borderNum].border.interuptorTB = true;
            elemIFList[borderNum].border.interuptorRB = false; 
            elemIFList[borderNum].border.interuptorBB = true;
            elemIFList[borderNum].border.interuptorLB = false;
            borderSelects[borderNum].style.top = "0px";
            visualChangeBeforeBorderModification()
        }
        //selection des bordure gauche et droite
        else if(elemIFList[borderNum].border.borderSelectorCounter == 9){
            elemIFList[borderNum].border.borderSelectorCounter = 1;
            topBorderNeutral();
            rightBorderActivate();
            bottomBorderNeutral();
            leftBorderActivate();
            elemIFList[borderNum].border.interuptorTB = false;
            elemIFList[borderNum].border.interuptorRB = true; 
            elemIFList[borderNum].border.interuptorBB = false;
            elemIFList[borderNum].border.interuptorLB = true;
            borderSelects[borderNum].style.top = "0px";
            visualChangeBeforeBorderModification()
        }
    })
    //les 4 Evenements permettant O/I indépendament les différent bords
    //lors d'un clique sur les bouton de bord représentant le bord désiré dans le selecteur
    //cela permet de l'inclure ou l'exclure de la selection de bord que l'on peut modifier (interuptor booleen O/I)
    //et de changer son visuel pour que l'utilisateur ai un feed-back (neutral/activate, +/-) 
    topBorderSelectors[borderNum].addEventListener("click", function(){
        if(elemIFList[borderNum].border.interuptorTB == false){
            topBorderActivate();
            elemIFList[borderNum].border.interuptorTB = true;
            visualChangeBeforeBorderModification()
        }
        else{
            topBorderNeutral();
            elemIFList[borderNum].border.interuptorTB = false;
            visualChangeBeforeBorderModification()
        }
    })
    leftBorderSelectors[borderNum].addEventListener("click", function(){
        if(elemIFList[borderNum].border.interuptorLB == false){
            leftBorderActivate();
            elemIFList[borderNum].border.interuptorLB = true;
            visualChangeBeforeBorderModification()
        }
        else{
            leftBorderNeutral();
            elemIFList[borderNum].border.interuptorLB = false;
            visualChangeBeforeBorderModification()
        }
    })
    rightBorderSelectors[borderNum].addEventListener("click", function(){
        if(elemIFList[borderNum].border.interuptorRB == false){
            rightBorderActivate();
            elemIFList[borderNum].border.interuptorRB = true;
            visualChangeBeforeBorderModification()
        }
        else{
            rightBorderNeutral();
            elemIFList[borderNum].border.interuptorRB = false;
            visualChangeBeforeBorderModification()
        }
    })
    bottomBorderSelectors[borderNum].addEventListener("click", function(){
        if(elemIFList[borderNum].border.interuptorBB == false){
            bottomBorderActivate();
            elemIFList[borderNum].border.interuptorBB = true;
            visualChangeBeforeBorderModification()
        }
        else{
            bottomBorderNeutral();
            elemIFList[borderNum].border.interuptorBB = false;
            visualChangeBeforeBorderModification()
        }
    })
    
    //selectionIfNoBorderIsSelected:
    //permet lors des Event de selection de valeur,btn/input, qui suivent juste en dessous de selectionné tout les bords si aucun ne l'est
    //inclus visualChangeBeforeBorderModification pour activé visuellement le changement.
    function selectionIfNoBorderIsSelected(){
        if((elemIFList[borderNum].border.interuptorTB == false)&&(elemIFList[borderNum].border.interuptorRB == false)&&
        (elemIFList[borderNum].border.interuptorBB == false)&&(elemIFList[borderNum].border.interuptorLB == false)){
            elemIFList[borderNum].border.borderSelectorCounter = 2;
            elemIFList[borderNum].border.interuptorTB = true;
            elemIFList[borderNum].border.interuptorRB = true;
            elemIFList[borderNum].border.interuptorBB = true;
            elemIFList[borderNum].border.interuptorLB = true;
            topBorderActivate();
            rightBorderActivate();
            bottomBorderActivate();
            leftBorderActivate();
            visualChangeBeforeBorderModification()
        }
    }
    //Les 4 Event qui suivents fonctionne en 3 étapes : 
    //1. intrinsequement, l'evenement recupere une valeur lié a l'element HTML d'interaction (input/btn)
    //2. effectue une condition pour chaque bord (4) avec les interuptor O/I associés aux bords pour savoir 
    //   si il est inclus à la selection a modifié. si le booleen est true, on change la valeur désiré dans lobjet représentant le bord 
    //3. Enfin, si aucun bords n'est selectionné la fonction "selectionIfNoBorderIsSelected" incluse selectionnera tout les bords (visuel/valeur)

    //Event du range de selection de la taille des bords 
    borderRanges[borderNum].addEventListener("input", function(){
        if(elemIFList[borderNum].border.interuptorTB == true){
            elemList[borderNum].border.top.size = borderRanges[borderNum].value;
        }
        if(elemIFList[borderNum].border.interuptorRB == true){
            elemList[borderNum].border.right.size = borderRanges[borderNum].value;
        }
        if(elemIFList[borderNum].border.interuptorBB == true){
            elemList[borderNum].border.bottom.size = borderRanges[borderNum].value;
        }
        if(elemIFList[borderNum].border.interuptorLB == true){
            elemList[borderNum].border.left.size = borderRanges[borderNum].value;
        }
        selectionIfNoBorderIsSelected();
        border(borderNum);
    })
    //Event du bouton de couleur des bords
    borderColors[borderNum].addEventListener("input", function(){
        if(elemIFList[borderNum].border.interuptorTB == true){
            elemList[borderNum].border.top.color.hue = borderColors[borderNum].value;
        }
        if(elemIFList[borderNum].border.interuptorRB == true){
            elemList[borderNum].border.right.color.hue = borderColors[borderNum].value;
        }
        if(elemIFList[borderNum].border.interuptorBB == true){
            elemList[borderNum].border.bottom.color.hue = borderColors[borderNum].value;
        }
        if(elemIFList[borderNum].border.interuptorLB == true){
            elemList[borderNum].border.left.color.hue = borderColors[borderNum].value;
        }
        selectionIfNoBorderIsSelected();
        border(borderNum);
    })
    //Event du select de la liste de style des bords 
    borderStyles[borderNum].addEventListener("click", function(){
        if(borderStyles[borderNum].options[borderStyles[borderNum].selectedIndex] != selectedStyle){
            selectedStyle.removeAttribute("selected");
            selectedStyle = borderStyles[borderNum].options[borderStyles[borderNum].selectedIndex];
            selectedStyle.setAttribute("selected", "");
        }
        if(elemIFList[borderNum].border.interuptorTB == true){
            elemList[borderNum].border.top.style = selectedStyle.value;
        }
        if(elemIFList[borderNum].border.interuptorRB == true){
            elemList[borderNum].border.right.style = selectedStyle.value;
        }
        if(elemIFList[borderNum].border.interuptorBB == true){
            elemList[borderNum].border.bottom.style = selectedStyle.value;
        }
        if(elemIFList[borderNum].border.interuptorLB == true){
            elemList[borderNum].border.left.style = selectedStyle.value;
        }
        selectionIfNoBorderIsSelected();
        border(borderNum);
    })
    //Event du bouton d'opacité
    opaHTMLRanges[opaNum].addEventListener("input", function(){
        if(elemIFList[borderNum].border.interuptorTB == true){
            elemList[borderNum].border.top.color.opacity = opaHTMLRanges[opaNum].value;
        }
        if(elemIFList[borderNum].border.interuptorRB == true){
            elemList[borderNum].border.right.color.opacity = opaHTMLRanges[opaNum].value;
        }
        if(elemIFList[borderNum].border.interuptorBB == true){
            elemList[borderNum].border.bottom.color.opacity = opaHTMLRanges[opaNum].value;
        }
        if(elemIFList[borderNum].border.interuptorLB == true){
            elemList[borderNum].border.left.color.opacity = opaHTMLRanges[opaNum].value;
        }
        selectionIfNoBorderIsSelected();
        border(borderNum);
    })

}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CORNER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

function createCorner(i, newSameElem = null){
    //boucle qui contient l'ensemble des regles de représentations graphiques de l'outil de selection de coins
        //represente le nombre de modules de corner (1 pour chaque module d'element)
        let cornerNum = i;
        //objet contenant les informations sur les element de selection du module
        if(newSameElem == null){
            if(elemIFList[cornerNum].corner == undefined){
                elemIFList[cornerNum].corner = {
                    //représente l'état futur de l'element de selection des coins
                    cornerSelectorSelectionCounter : 1,
                    //4 variables représentant l'état d'activation (O/I) des boutons de coin du selecteur de coin
                    CornerInteruptorTL : false,
                    CornerInteruptorTR : false,
                    CornerInteruptorBR : false,
                    CornerInteruptorBL : false,
                    //variable to manage pixel/% button || true = %, false = px
                    btnPxPcSelect : true
                }

                //objet qui contient les valeurs de courbure pour les 4 coins de l'element ciblé
                elemList[cornerNum].corner = {
                    topLeft : 0,
                    topRight : 0,
                    bottomRight : 0,
                    bottomLeft : 0,
                    pixelOrPercent : {
                        //true == percent |false == pixel
                        topLeft : true,
                        topRight : true,
                        bottomRight : true,
                        bottomLeft : true,
                    }
                }
        }
        } else {
            elemIFList[cornerNum].corner = {
                //représente l'état futur de l'element de selection des coins
                cornerSelectorSelectionCounter : elemIFList[newSameElem].corner.cornerSelectorSelectionCounter,
                //4 variables représentant l'état d'activation (O/I) des boutons de coin du selecteur de coin
                CornerInteruptorTL : elemIFList[newSameElem].corner.CornerInteruptorTL,
                CornerInteruptorTR : elemIFList[newSameElem].corner.CornerInteruptorTR,
                CornerInteruptorBR : elemIFList[newSameElem].corner.CornerInteruptorBR,
                CornerInteruptorBL : elemIFList[newSameElem].corner.CornerInteruptorBL,
                //variable to manage pixel/% button || true = %, false = px
                btnPxPcSelect : elemIFList[newSameElem].corner.btnPxPcSelect
            }

            //objet qui contient les valeurs de courbure pour les 4 coins de l'element ciblé
            elemList[cornerNum].corner = {
                topLeft : elemList[newSameElem].corner.topLeft,
                topRight : elemList[newSameElem].corner.topRight,
                bottomRight : elemList[newSameElem].corner.bottomRight,
                bottomLeft : elemList[newSameElem].corner.bottomLeft,
                pixelOrPercent : {
                    //true == percent |false == pixel
                    topLeft : elemList[newSameElem].corner.pixelOrPercent.topLeft,
                    topRight : elemList[newSameElem].corner.pixelOrPercent.topRight,
                    bottomRight : elemList[newSameElem].corner.pixelOrPercent.bottomRight,
                    bottomLeft : elemList[newSameElem].corner.pixelOrPercent.bottomLeft,
                }
            }
        }

        btnPxPcs[cornerNum].addEventListener("click", function(){
            if(elemIFList[cornerNum].corner.btnPxPcSelect == true){
                btnPxPcs[cornerNum].setAttribute("pixel","");
                btnPxPcs[cornerNum].removeAttribute("max");
                radiusRanges[cornerNum].setAttribute("max", "175");
                elemIFList[cornerNum].corner.btnPxPcSelect = false;

                RangeVisualChangeBeforeCornerSelection();
                changePixelOrPercent(
                    elemIFList[cornerNum].corner.CornerInteruptorTL, elemIFList[cornerNum].corner.CornerInteruptorTR, 
                    elemIFList[cornerNum].corner.CornerInteruptorBR, elemIFList[cornerNum].corner.CornerInteruptorBL,
                    elemIFList[cornerNum].corner.btnPxPcSelect,
                    elemList[cornerNum].corner.pixelOrPercent.topLeft, elemList[cornerNum].corner.pixelOrPercent.topRight,
                    elemList[cornerNum].corner.pixelOrPercent.bottomRight,elemList[cornerNum].corner.pixelOrPercent.bottomLeft
                    )
            } else {
                btnPxPcs[cornerNum].removeAttribute("pixel");
                btnPxPcs[cornerNum].removeAttribute("max");
                radiusRanges[cornerNum].setAttribute("max", "100");
                elemIFList[cornerNum].corner.btnPxPcSelect = true; 

                RangeVisualChangeBeforeCornerSelection();
                changePixelOrPercent(
                    elemIFList[cornerNum].corner.CornerInteruptorTL, elemIFList[cornerNum].corner.CornerInteruptorTR, 
                    elemIFList[cornerNum].corner.CornerInteruptorBR, elemIFList[cornerNum].corner.CornerInteruptorBL,
                    elemIFList[cornerNum].corner.btnPxPcSelect,
                    elemList[cornerNum].corner.pixelOrPercent.topLeft, elemList[cornerNum].corner.pixelOrPercent.topRight,
                    elemList[cornerNum].corner.pixelOrPercent.bottomRight,elemList[cornerNum].corner.pixelOrPercent.bottomLeft
                    )
            }
        })

        function changePixelOrPercent(  topLeftInteruptor, topRightInteruptor, 
                                        bottomRightInteruptor, bottomLeftInteruptor, 
                                        pixelOrPercentInteruptor, 
                                        pixelOrPercentTopLeft, pixelOrPercentTopRight, 
                                        pixelOrPercentBottomRight, pixelOrPercentBottomLeft
                                     ){
                                        let interuptorList = [topLeftInteruptor, topRightInteruptor, bottomRightInteruptor, bottomLeftInteruptor];
                                        let interuptorTrueList = [];
                                        let pixelOrPercentinteruptorList = [pixelOrPercentTopLeft, pixelOrPercentTopRight, pixelOrPercentBottomRight, pixelOrPercentBottomLeft];
                                        
                                        for(i=0; i<=interuptorList.length-1; i++){
                                            if(interuptorList[i] == true){
                                                interuptorTrueList.push(interuptorList[i]);
                                                if(pixelOrPercentinteruptorList[i] != pixelOrPercentInteruptor) pixelOrPercentinteruptorList[i] = pixelOrPercentInteruptor;
                                            }
                                            if(i == interuptorList.length-1){
                                                if(interuptorTrueList.length == 0){
                                                    console.log("test2");
                                                    elemList[cornerNum].corner.pixelOrPercent.topLeft = pixelOrPercentInteruptor;
                                                    elemList[cornerNum].corner.pixelOrPercent.topRight = pixelOrPercentInteruptor; 
                                                    elemList[cornerNum].corner.pixelOrPercent.bottomRight = pixelOrPercentInteruptor; 
                                                    elemList[cornerNum].corner.pixelOrPercent.bottomLeft = pixelOrPercentInteruptor;
                                                } else {
                                                    console.log("test1");
                                                    elemList[cornerNum].corner.pixelOrPercent.topLeft = pixelOrPercentinteruptorList[0]; 
                                                    elemList[cornerNum].corner.pixelOrPercent.topRight = pixelOrPercentinteruptorList[1]; 
                                                    elemList[cornerNum].corner.pixelOrPercent.bottomRight = pixelOrPercentinteruptorList[2]; 
                                                    elemList[cornerNum].corner.pixelOrPercent.bottomLeft= pixelOrPercentinteruptorList[3];
                                                }
                                            }
                                        }
                                        }


        //RangeVisualChangeBeforeCornerSelection :
        //fonction permettant la mise à jour visuel du range de selection de la valeur de la courbure, en fonctions des coins séléctionné
        function RangeVisualChangeBeforeCornerSelection(){
            visualChgtCorner(
                elemIFList[cornerNum].corner.CornerInteruptorTL, elemIFList[cornerNum].corner.CornerInteruptorTR,
                elemIFList[cornerNum].corner.CornerInteruptorBR , elemIFList[cornerNum].corner.CornerInteruptorBL,

                elemList[cornerNum].corner.topLeft, elemList[cornerNum].corner.topRight, 
                elemList[cornerNum].corner.bottomRight, elemList[cornerNum].corner.bottomLeft, 

                radiusRanges[cornerNum],

                elemIFList[cornerNum].corner.btnPxPcSelect,
                elemList[cornerNum].corner.pixelOrPercent.topLeft, elemList[cornerNum].corner.pixelOrPercent.topRight,
                elemList[cornerNum].corner.pixelOrPercent.bottomRight, elemList[cornerNum].corner.pixelOrPercent.bottomLeft
            )
        }

        //suite de fonction qui s'activerons dans les EVENT qui leurs succede, 
        //elles permettent +/- l'attribut HTML correspondant a un selecteur de coin activé ou non
        //ce sont des fonction permettant un feed-back visuel a l'utilisateur, et non pas de modifié directement les valeurs des coins 
        //neutral = visuel des bords non sélectionné, activate = visuel des bords sélectionné
        function topLeftCornerActivate(){
            topLefts[cornerNum].setAttribute("active","");
            elemList[cornerNum].corner.pixelOrPercent.topLeft = elemIFList[cornerNum].corner.btnPxPcSelect;
        }
        function topRightCornerActivate(){
            topRights[cornerNum].setAttribute("active","");
            elemList[cornerNum].corner.pixelOrPercent.topRight = elemIFList[cornerNum].corner.btnPxPcSelect;
        }
        function bottomRightCornerActivate(){
            bottomRights[cornerNum].setAttribute("active","");
            elemList[cornerNum].corner.pixelOrPercent.bottomRight = elemIFList[cornerNum].corner.btnPxPcSelect;
        }
        function bottomLeftCornerActivate(){
            bottomLefts[cornerNum].setAttribute("active","");
            elemList[cornerNum].corner.pixelOrPercent.bottomLeft = elemIFList[cornerNum].corner.btnPxPcSelect;
        }
        function topLeftCornerNeutral(){
            topLefts[cornerNum].removeAttribute("active");
        }
        function topRightCornerNeutral(){
            topRights[cornerNum].removeAttribute("active");
        }
        function bottomRightCornerNeutral(){
            bottomRights[cornerNum].removeAttribute("active");
        }
        function bottomLeftCornerNeutral(){
            bottomLefts[cornerNum].removeAttribute("active"); 
        }

        //Evenement lié au bouton de selection des coins (bouton-central du selecteur de coins)
        //a chaque nouveau clique une nouvelle selection de coin est faite,
        //il y a 11 selections différentes qui se succede
        //l'evenement utilise : 
        //les fonction neutral/active pour chgmt grahique et 
        //les variables interuptors (o/i) pour validé ou non la possibilité de modification des coins  
        cornerSelects[cornerNum].addEventListener("click", function(e){
            //selection de tout les coins
            if(elemIFList[cornerNum].corner.cornerSelectorSelectionCounter == 1){
                elemIFList[cornerNum].corner.cornerSelectorSelectionCounter++;
                elemIFList[cornerNum].corner.CornerInteruptorTL = true;
                elemIFList[cornerNum].corner.CornerInteruptorTR = true;
                elemIFList[cornerNum].corner.CornerInteruptorBR = true;
                elemIFList[cornerNum].corner.CornerInteruptorBL = true;
                topLeftCornerActivate();
                topRightCornerActivate();
                bottomRightCornerActivate();
                bottomLeftCornerActivate();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection du coin supérieur gauche
            else if(elemIFList[cornerNum].corner.cornerSelectorSelectionCounter == 2){
                elemIFList[cornerNum].corner.cornerSelectorSelectionCounter++;
                elemIFList[cornerNum].corner.CornerInteruptorTL = true;
                elemIFList[cornerNum].corner.CornerInteruptorTR = false;
                elemIFList[cornerNum].corner.CornerInteruptorBR = false;
                elemIFList[cornerNum].corner.CornerInteruptorBL = false;
                topLeftCornerActivate();
                topRightCornerNeutral();
                bottomRightCornerNeutral();
                bottomLeftCornerNeutral();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection du coin supérieur droit
            else if(elemIFList[cornerNum].corner.cornerSelectorSelectionCounter == 3){
                elemIFList[cornerNum].corner.cornerSelectorSelectionCounter++;
                elemIFList[cornerNum].corner.CornerInteruptorTL = false;
                elemIFList[cornerNum].corner.CornerInteruptorTR = true;
                elemIFList[cornerNum].corner.CornerInteruptorBR = false;
                elemIFList[cornerNum].corner.CornerInteruptorBL = false;
                topLeftCornerNeutral();
                topRightCornerActivate();
                bottomRightCornerNeutral();
                bottomLeftCornerNeutral();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection du coin inférieur droit
            else if(elemIFList[cornerNum].corner.cornerSelectorSelectionCounter == 4){
                elemIFList[cornerNum].corner.cornerSelectorSelectionCounter++;
                elemIFList[cornerNum].corner.CornerInteruptorTL = false;
                elemIFList[cornerNum].corner.CornerInteruptorTR = false;
                elemIFList[cornerNum].corner.CornerInteruptorBR = true;
                elemIFList[cornerNum].corner.CornerInteruptorBL = false;
                topLeftCornerNeutral();
                topRightCornerNeutral();
                bottomRightCornerActivate();
                bottomLeftCornerNeutral();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection du coin inférieur gauche
            else if(elemIFList[cornerNum].corner.cornerSelectorSelectionCounter == 5){
                elemIFList[cornerNum].corner.cornerSelectorSelectionCounter++;
                elemIFList[cornerNum].corner.CornerInteruptorTL = false;
                elemIFList[cornerNum].corner.CornerInteruptorTR = false;
                elemIFList[cornerNum].corner.CornerInteruptorBR = false;
                elemIFList[cornerNum].corner.CornerInteruptorBL = true;
                topLeftCornerNeutral();
                topRightCornerNeutral();
                bottomRightCornerNeutral();
                bottomLeftCornerActivate();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection des coins supérieurs
            else if(elemIFList[cornerNum].corner.cornerSelectorSelectionCounter == 6){
                elemIFList[cornerNum].corner.cornerSelectorSelectionCounter++;
                elemIFList[cornerNum].corner.CornerInteruptorTL = true;
                elemIFList[cornerNum].corner.CornerInteruptorTR = true;
                elemIFList[cornerNum].corner.CornerInteruptorBR = false;
                elemIFList[cornerNum].corner.CornerInteruptorBL = false;
                topLeftCornerActivate();
                topRightCornerActivate();
                bottomRightCornerNeutral();
                bottomLeftCornerNeutral();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection des coins droits
            else if(elemIFList[cornerNum].corner.cornerSelectorSelectionCounter == 7){
                elemIFList[cornerNum].corner.cornerSelectorSelectionCounter++;
                elemIFList[cornerNum].corner.CornerInteruptorTL = false;
                elemIFList[cornerNum].corner.CornerInteruptorTR = true;
                elemIFList[cornerNum].corner.CornerInteruptorBR = true;
                elemIFList[cornerNum].corner.CornerInteruptorBL = false;
                topLeftCornerNeutral();
                topRightCornerActivate();
                bottomRightCornerActivate();
                bottomLeftCornerNeutral();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection des coins inférieurs
            else if(elemIFList[cornerNum].corner.cornerSelectorSelectionCounter == 8){
                elemIFList[cornerNum].corner.cornerSelectorSelectionCounter++;
                elemIFList[cornerNum].corner.CornerInteruptorTL = false;
                elemIFList[cornerNum].corner.CornerInteruptorTR = false;
                elemIFList[cornerNum].corner.CornerInteruptorBR = true;
                elemIFList[cornerNum].corner.CornerInteruptorBL = true;
                topLeftCornerNeutral();
                topRightCornerNeutral();
                bottomRightCornerActivate();
                bottomLeftCornerActivate();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection des coins gauches
            else if(elemIFList[cornerNum].corner.cornerSelectorSelectionCounter == 9){
                elemIFList[cornerNum].corner.cornerSelectorSelectionCounter++;
                elemIFList[cornerNum].corner.CornerInteruptorTL = true;
                elemIFList[cornerNum].corner.CornerInteruptorTR = false;
                elemIFList[cornerNum].corner.CornerInteruptorBR = false;
                elemIFList[cornerNum].corner.CornerInteruptorBL = true;
                topLeftCornerActivate();
                topRightCornerNeutral();
                bottomRightCornerNeutral();
                bottomLeftCornerActivate();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection des coins haut gauche et bas droit
            else if(elemIFList[cornerNum].corner.cornerSelectorSelectionCounter == 10){
                elemIFList[cornerNum].corner.cornerSelectorSelectionCounter++;
                elemIFList[cornerNum].corner.CornerInteruptorTL = true;
                elemIFList[cornerNum].corner.CornerInteruptorTR = false;
                elemIFList[cornerNum].corner.CornerInteruptorBR = true;
                elemIFList[cornerNum].corner.CornerInteruptorBL = false;
                topLeftCornerActivate();
                topRightCornerNeutral();
                bottomRightCornerActivate();
                bottomLeftCornerNeutral();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection des coins haut droit et bas gauche
            else if(elemIFList[cornerNum].corner.cornerSelectorSelectionCounter == 11){
                elemIFList[cornerNum].corner.cornerSelectorSelectionCounter = 1;
                elemIFList[cornerNum].corner.CornerInteruptorTL = false;
                elemIFList[cornerNum].corner.CornerInteruptorTR = true;
                elemIFList[cornerNum].corner.CornerInteruptorBR = false;
                elemIFList[cornerNum].corner.CornerInteruptorBL = true;
                topLeftCornerNeutral();
                topRightCornerActivate();
                bottomRightCornerNeutral();
                bottomLeftCornerActivate();
                RangeVisualChangeBeforeCornerSelection();
            }
        })

        //les 4 Evenements permettant O/I indépendament les différents coins
        //lors d'un clique sur les bouton de coin représentant le coin désiré dans le selecteur
        //cela permet de l'inclure ou l'exclure de la selection de coin que l'on peut modifier (interuptor booleen O/I)
        //et de changer son visuel pour que l'utilisateur ai un feed-back (neutral/activate, +/-) 
        topLefts[cornerNum].addEventListener("click", function(){
            if(elemIFList[cornerNum].corner.CornerInteruptorTL == false){
                topLeftCornerActivate();
                elemIFList[cornerNum].corner.CornerInteruptorTL = true;
            }
            else{
                topLeftCornerNeutral();
                elemIFList[cornerNum].corner.CornerInteruptorTL = false;           
            }
            RangeVisualChangeBeforeCornerSelection();
        })
        topRights[cornerNum].addEventListener("click", function(){
            if(elemIFList[cornerNum].corner.CornerInteruptorTR == false){
                topRightCornerActivate();
                elemIFList[cornerNum].corner.CornerInteruptorTR = true;
            }
            else{
                topRightCornerNeutral();
                elemIFList[cornerNum].corner.CornerInteruptorTR = false;
            }
            RangeVisualChangeBeforeCornerSelection();
        })
        bottomRights[cornerNum].addEventListener("click", function(){
            if(elemIFList[cornerNum].corner.CornerInteruptorBR == false){
                bottomRightCornerActivate();
                elemIFList[cornerNum].corner.CornerInteruptorBR = true;
            }
            else{
                bottomRightCornerNeutral();
                elemIFList[cornerNum].corner.CornerInteruptorBR = false;
            }
            RangeVisualChangeBeforeCornerSelection();
        })
        bottomLefts[cornerNum].addEventListener("click", function(){
            if(elemIFList[cornerNum].corner.CornerInteruptorBL == false){
                bottomLeftCornerActivate();
                elemIFList[cornerNum].corner.CornerInteruptorBL = true;
            }
            else{
                bottomLeftCornerNeutral();
                elemIFList[cornerNum].corner.CornerInteruptorBL = false;
            }
            RangeVisualChangeBeforeCornerSelection();
        })


        //L'Event du range qui gere la courbure fonctionne en 3 étapes : 
        //1. intrinsequement, l'evenement recupere une valeur lié a l'element HTML d'interaction (input/btn)
        //2. effectue une condition pour chaques coins (4) avec les interuptor O/I associé au coin pour savoir- 
        //   -si il est inclus a la selection a modifié. Si le booleen est true, on change la valeur désiré dans la variable représentant le coin
        //3. si aucun coins n'est sélectionné mais que le range est utilisé, alors il y aura une selection auto de tout les bord (visuel et valeur)
        radiusRanges[cornerNum].addEventListener("input", function(){

            if(elemIFList[cornerNum].corner.CornerInteruptorTL == true){
                elemList[cornerNum].corner.topLeft = radiusRanges[cornerNum].value;
            }
            if(elemIFList[cornerNum].corner.CornerInteruptorTR == true){
                elemList[cornerNum].corner.topRight = radiusRanges[cornerNum].value;
            }
            if(elemIFList[cornerNum].corner.CornerInteruptorBR == true){
                elemList[cornerNum].corner.bottomRight = radiusRanges[cornerNum].value;
            }
            if(elemIFList[cornerNum].corner.CornerInteruptorBL == true){
                elemList[cornerNum].corner.bottomLeft = radiusRanges[cornerNum].value;
            }
            if((elemIFList[cornerNum].corner.CornerInteruptorTL == false)&&(elemIFList[cornerNum].corner.CornerInteruptorTR == false)&&
            (elemIFList[cornerNum].corner.CornerInteruptorBR == false)&&(elemIFList[cornerNum].corner.CornerInteruptorBL == false)){
                elemIFList[cornerNum].corner.cornerSelectorSelectionCounter = 2;
                elemIFList[cornerNum].corner.CornerInteruptorTL = true;
                elemIFList[cornerNum].corner.CornerInteruptorTR = true;
                elemIFList[cornerNum].corner.CornerInteruptorBR = true;
                elemIFList[cornerNum].corner.CornerInteruptorBL = true;

                topLeftCornerActivate();
                topRightCornerActivate();
                bottomRightCornerActivate();
                bottomLeftCornerActivate();
                RangeVisualChangeBeforeCornerSelection();
            }
            corner(cornerNum);
        })
}




//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SHADER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

function createShader(i, newSameElem = null){
    //boucle qui permet de remplir le shaderModList d'objet representant chacun des module de shaders et leurs différentes valeurs
    //déclaration d'evenement avec les outils HTML d'interactions et de selection
        //représente le nombre de module de shader
        let shaderNum = i;
        //permet de selectionner le range d'opacité lié au module de shader
        let opaNum = 1+(shaderNum*4);
        createOpacity(opaNum);            

        //objet qui contient les informations concernant le nombre de shader différent, celui qui est sélectionné et les info sur les btns
        if(newSameElem == null){
            if(elemIFList[shaderNum].shader == undefined){
                elemIFList[shaderNum].shader = {
                        //représente le nombre de shaders différent dans un même module
                        shaderNum : 1,
                        //représente le shader selectionné (le shaderNumber selectionné)
                        shaderSelectNum : 1,
                        //défini l'état du bouton de selection de gradient (lineaire ou gradient)
                        interuptor : false,
                        //défini les différentes variable lié au bouton de selection de degré
                        degreeBtn : {
                            //représente le numéro du bouton qui permet l'attribution d'un degré pour les gradient lineaire
                            btnNum : shaderNum,
                            //représente les degrés a 360°, ici a leurs valeurs initial
                            degree : 0,
                            //défini l'état du bouton d'attribution de degré (si gradient lineaire ON, si radial OFF)
                            degreeInteruptor : false,
                            //permet de pouvoir comparé l'ancienne place de la souris avec la nouvelle et de crée le nouveau degrés
                            initVal : 0
                        }    
                }   
                //crée un tableau qui va contenir les objets représentant les différents shaders d'un même module
                elemList[shaderNum].shader = [];
                //création de l'objet shader de base
                elemList[shaderNum].shader[elemIFList[shaderNum].shader.shaderNum-1] = {
                    placement : 0,
                    gradient : "linear",
                    degree : 0,
                    color : {
                                hue : "#FFA200",
                                opacity : 100
                            }
                }
            }
        } else {
            elemIFList[shaderNum].shader = {
                shaderNum : elemIFList[newSameElem].shader.shaderNum,
                shaderSelectNum : elemIFList[newSameElem].shader.shaderSelectNum,
                interuptor : elemIFList[newSameElem].shader.interuptor,
                degreeBtn : {
                    btnNum : shaderNum,
                    degree : elemIFList[newSameElem].shader.degreeBtn.degree,
                    degreeInteruptor : elemIFList[newSameElem].shader.degreeBtn.degreeInteruptor,
                    initVal : elemIFList[newSameElem].shader.degreeBtn.initVal
                }    
            }   
            elemList[shaderNum].shader = [];
            elemList[shaderNum].shader[0] = {
                placement : elemList[newSameElem].shader[0].placement,
                gradient : elemList[newSameElem].shader[0].gradient,
                degree : elemList[newSameElem].shader[0].degree,
                color : {
                            hue : elemList[newSameElem].shader[0].color.hue,
                            opacity : elemList[newSameElem].shader[0].color.opacity
                        }
            }
            for(j=1; j<=elemList[newSameElem].shader.length-1; j++){
                elemList[shaderNum].shader[j] = {
                    placement : elemList[newSameElem].shader[j].placement,
                    color : {
                                hue : elemList[newSameElem].shader[j].color.hue,
                                opacity : elemList[newSameElem].shader[j].color.opacity
                            }
                }
                console.log(elemList[shaderNum].shader[j].color.hue);
            }
        }

        elemIFList[shaderNum].shader.degreeBtn.btnNum = shaderNum;

        //fonction de changement visuel des element de selection du shader en fonction du shader du module selectionné dans la liste
        function visualChangeBeforeListSelection(val, opacity){
            //changement visuel du range de placement et du bouton de selection de couleur
            rangeVisualChgt(shaderRanges[shaderNum], elemList[shaderNum].shader[val]);
            colorVisualChgt(shaderColors[shaderNum], elemList[shaderNum].shader[val])
            //changement visuel du range d'opacité et du range de selection d'opacité
            opaVisualChgt(elemList[shaderNum].shader[val].color.opacity, opacity);
        }
        
        //event de selection du shader dans la liste des shader dans chaque module
        shaderSelectors[shaderNum].addEventListener("click", changeListShadersNumber);
        function changeListShadersNumber(){
            console.log(document.getElementById(elemList[shaderNum].id.name));
            //active la fonction si l'option selectionné est différente de celle qui l'est déjà
            if (elemIFList[shaderNum].shader.shaderSelectNum != shaderSelectors[shaderNum].options[shaderSelectors[shaderNum].selectedIndex].value){

                //supression et attribution a un nouvel element HTML option de l'attribut "select" de la liste de selection HTML
                shaderSelectors[shaderNum].children[elemIFList[shaderNum].shader.shaderSelectNum-1].removeAttribute("selected");
                elemIFList[shaderNum].shader.shaderSelectNum = shaderSelectors[shaderNum].options[shaderSelectors[shaderNum].selectedIndex].value;
                shaderSelectors[shaderNum].children[elemIFList[shaderNum].shader.shaderSelectNum-1].setAttribute("selected", "");      
                
                //fonction de changement visuel du module shader (permet de correspondre au shader selectionné)
                let val= elemIFList[shaderNum].shader.shaderSelectNum-1, opacity = opaNum;
                console.log(val);
                /* console.log(opacity);
                console.log(shaderRanges[shaderNum]);
                console.log(elemIFList[shaderNum].shader); */
                console.log(elemList[shaderNum].shader[val]);
                visualChangeBeforeListSelection(val, opacity);
            }
            shader(shaderNum);
        }
        //ajout d'un shader dans la liste des shader d'un module
        shaderMoreBtns[shaderNum].addEventListener("click", function(e){
            //ajout d'un shader dans le "compteur de shader" pour ensuite construire l'element html qui le representera
            elemIFList[shaderNum].shader.shaderNum ++;
            shaderSelectors[shaderNum].innerHTML += '<option value="' + elemIFList[shaderNum].shader.shaderNum + '">' + elemIFList[shaderNum].shader.shaderNum + '</option>';
            //suppression et ajout de l'attribut selected de l'option HTML de selection du shader
            shaderSelectors[shaderNum].children[elemIFList[shaderNum].shader.shaderSelectNum-1].removeAttribute("selected");
            shaderSelectors[shaderNum].children[elemIFList[shaderNum].shader.shaderNum-1].setAttribute("selected", "");
            //creation de l'objet représentant le nouveau shader
            elemIFList[shaderNum].shader.shaderSelectNum = elemIFList[shaderNum].shader.shaderNum;
            elemList[shaderNum].shader[elemIFList[shaderNum].shader.shaderNum-1] = {
                placement : 100,
                color : {
                            hue : "#FFA200",
                            opacity : 100
                        }
            }

            //fonction de changement visuel du module shader (permet de correspondre au shader selectionné)
            let val= elemIFList[shaderNum].shader.shaderNum-1, opacity = opaNum;
            visualChangeBeforeListSelection(val, opacity);
            shader(shaderNum);
        })
        
        //suppression d'un shader dans la liste des shader d'un module
        shaderTrashBtns[shaderNum].addEventListener("click", function(e){
            if(elemIFList[shaderNum].shader.shaderNum > 1){
                shaderSelectors[shaderNum].removeChild(shaderSelectors[shaderNum][elemIFList[shaderNum].shader.shaderSelectNum-1]);
                elemList[shaderNum].shader.splice(elemIFList[shaderNum].shader.shaderSelectNum-1, 1)

                //boucle pour remplacer les elements HTML qui représente les shaders précédent celui supprimé, pour leurs assigné leur nouveau numéro
                for(i=elemIFList[shaderNum].shader.shaderSelectNum-1; i<=shaderSelectors[shaderNum].length-1; i++){
                    shaderSelectors[shaderNum][i].innerHTML = i+1;
                    shaderSelectors[shaderNum][i].setAttribute("value", i+1);
                }
                //selection du shader inférieur a celui supprimé apres sa suppression 
                if(elemIFList[shaderNum].shader.shaderSelectNum-2 >= 0){
                    elemIFList[shaderNum].shader.shaderNum --;
                    shaderSelectors[shaderNum][elemIFList[shaderNum].shader.shaderSelectNum-2].setAttribute("selected", "");
                    elemIFList[shaderNum].shader.shaderSelectNum = elemIFList[shaderNum].shader.shaderSelectNum-1; 
                }
                //quand le shader supprimé est le premier de la liste, quelques regle différente pour que cela fonctionne
                else if(elemIFList[shaderNum].shader.shaderSelectNum-2 < 0){
                    elemIFList[shaderNum].shader.shaderNum --;
                    shaderSelectors[shaderNum][elemIFList[shaderNum].shader.shaderSelectNum-1].setAttribute("selected", "");
                }
                //force la selection de l'option correspondant au shaderSelectNumber
                shaderSelectors[shaderNum].selectedIndex = elemIFList[shaderNum].shader.shaderSelectNum-1;
                //partie de la fonction qui change la partie visuel 
                let val= elemIFList[shaderNum].shader.shaderSelectNum-1, opacity = opaNum;
                visualChangeBeforeListSelection(val, opacity);
                shader(shaderNum);
            }
            else{
                color(shaderNum);
            }
        })
        //event qui attribut la position des shaders grace au range du module shader
        shaderRanges[shaderNum].addEventListener("input", function(){
            elemList[shaderNum].shader[elemIFList[shaderNum].shader.shaderSelectNum-1].placement = shaderRanges[shaderNum].value;
            shader(shaderNum);
        })
        //event qui attribut la couleur des shaders grace a l'input couleur du module shader
        shaderColors[shaderNum].addEventListener("input", function(){
            elemList[shaderNum].shader[elemIFList[shaderNum].shader.shaderSelectNum-1].color.hue = shaderColors[shaderNum].value;
            shader(shaderNum);
        })
        //event qui attribut l'opacité des shaders grace a l'outil d'opacité du module shader
        opaHTMLRanges[opaNum].addEventListener("input", function(){
            elemList[shaderNum].shader[elemIFList[shaderNum].shader.shaderSelectNum-1].color.opacity = opaHTMLRanges[opaNum].value;
            shader(shaderNum);
        })

        //EVENT qui gere le changement détat du bouton, permettant selection soi d'un gradient lineaire ou radial
        selectGradients[shaderNum].addEventListener('click', function(){
            //etat bouton definissant selection du gradient lineaire en JS et qui active le css pour changer le visuel du bouton en fonction
            if(elemIFList[shaderNum].shader.interuptor == false){
                btnSelectGradients[shaderNum].setAttribute("active","");
                degreeButtons[shaderNum].removeAttribute("active");
                elemList[shaderNum].shader[0].gradient = "radial";
                elemList[shaderNum].shader[0].degree = undefined;
                elemIFList[shaderNum].shader.interuptor = true;
            }
            //idem pour le gradient radial
            else{; 
                btnSelectGradients[shaderNum].removeAttribute("active");
                degreeButtons[shaderNum].setAttribute("active","");
                elemList[shaderNum].shader[0].gradient = "linear";
                elemList[shaderNum].shader[0].degree = elemIFList[shaderNum].shader.degreeBtn.degree;
                elemIFList[shaderNum].shader.interuptor = false;
            }
            shader(shaderNum);
        })

        //fonction permettant de calculer le nouveau degré
        //fonctionne en comparant le placement de la souris une fois que l'on a appuyer sur le bouton de selection de degré
        //initialPlacementValue = relatif a initialValue, placementValue = placement suivant a InitialValue, degreeValue = valeur initial des degrè avant fonction.
        function calculDegree(initialPlacementValue, placementValue, degreeValue){
            let initialPlacement = initialPlacementValue, actualplacement = placementValue, degreeChange = degreeValue;
            let changementDegreeValue = (initialPlacement - actualplacement)*5;
        
            //changement de la valeur des degrés.
            elemIFList[shaderNum].shader.degreeBtn.degree += changementDegreeValue;
            //deux boucle permettant de rester dans l'interval de 360
            if (elemIFList[shaderNum].shader.degreeBtn.degree > 360){elemIFList[shaderNum].shader.degreeBtn.degree = degreeChange-360;}
            else if (elemIFList[shaderNum].shader.degreeBtn.degree < 0){elemIFList[shaderNum].shader.degreeBtn.degree = 360 - degreeChange;}
        
            //premet le changement visuel du bouton
            degreeButtons[elemIFList[shaderNum].shader.degreeBtn.btnNum].style.transform = "rotate(" + elemIFList[shaderNum].shader.degreeBtn.degree + "deg)";
            //ajout de la nouvelle valeur des degrés au premier objet du tableau des shader
            elemList[shaderNum].shader[0].degree = elemIFList[shaderNum].shader.degreeBtn.degree;
            //mise a jour de la valeur initial du placement du curseur pour pouvoir répété la fonction. 
            elemIFList[shaderNum].shader.degreeBtn.initVal = actualplacement;
    
            /*placer sans doute ici le code permettant d'ajouter*/
            shader(shaderNum);
        }

        //evenement permettant d'initialisé une valeurs de placement de la souris lorsqu'on clique sur le bouton
        degreeButtons[elemIFList[shaderNum].shader.degreeBtn.btnNum].addEventListener('mousedown', function(event){
            if (degreeButtons[elemIFList[shaderNum].shader.degreeBtn.btnNum].hasAttribute("active")){
                elemIFList[shaderNum].shader.degreeBtn.degreeInteruptor = true;
                elemIFList[shaderNum].shader.degreeBtn.initVal = event.clientY;
            }

            body.addEventListener('mousemove', function(event){ 
            //this condition is here for if the module contain the btn in link with this Event is delete
            //avoid the rest of the event
                if (degreeButtons[elemIFList[shaderNum].shader.degreeBtn.btnNum].hasAttribute("active")){
                    let placement = event.clientY;
                    if (elemIFList[shaderNum].shader.degreeBtn.degreeInteruptor == true){
                        beginCalculDegree = setInterval(calculDegree(elemIFList[shaderNum].shader.degreeBtn.initVal, placement, elemIFList[shaderNum].shader.degreeBtn.degree), 200);
                    }
                }   
            })

            //evenement qui s'active lorsqu'on remonte la souris, qui termine le processus de selection du degré
            //réinitialise une partie des valeurs pour pouvoir recommencer la selection une prochaine fois.
            body.addEventListener('mouseup', function(){
                //this condition is here for if the module container the btn in link with this Event is delete
                //avoid the rest of the event
                    if (degreeButtons[elemIFList[shaderNum].shader.degreeBtn.btnNum].hasAttribute("active")){
                        if(elemIFList[shaderNum].shader.degreeBtn.degreeInteruptor == true){
                            elemIFList[shaderNum].shader.degreeBtn.degreeInteruptor = false;
                            clearInterval(beginCalculDegree);
                        }
                    }
            })
        })
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~BOX~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
function createBox(i, newSameElem = null){
        //représente le nombre de module de box
        let boxNum = i;
        //permet de selectionner le range d'opacité lié au module de box
        let opaNum = 3+(boxNum*4);
        createOpacity(opaNum);

        if(newSameElem == null){
            if(elemIFList[boxNum].box == undefined){
                elemIFList[boxNum].box = {
                    //représente le nombre de boxs différent dans un même module
                    boxNum : 1,
                    //représente la box selectionné (le boxNum selectionné)
                    boxSelectNum : 1,
                    //défini l'état du bouton XY
                    interuptorXY : false,    
                    //défini l'état du bouton BS
                    interuptorBS : false
                    }
                //crée un tableau qui va contenir les objets représentant les différents boxs d'un même module
                elemList[boxNum].box = [];
                //création de l'objet box de base
                elemList[boxNum].box[elemIFList[boxNum].box.boxNum-1] = {
                    inset : false,
                    radius : {
                        spread : 0,
                        blur : 0 
                    },
                    offset : {
                        x : 0,
                        y : 0
                    },
                    color : {
                        hue : "#969696",
                        opacity : 100
                    }
                }
            }
        } else {
            elemIFList[boxNum].box = {
                boxNum : elemIFList[newSameElem].box.boxNum,
                boxSelectNum : elemIFList[newSameElem].box.boxSelectNum,
                interuptorXY : elemIFList[newSameElem].box.interuptorXY,    
                interuptorBS : elemIFList[newSameElem].box.interuptorBS
                }
            elemList[boxNum].box = [];
            for(j=0; j<=elemList[newSameElem].box.length-1; j++){
                elemList[boxNum].box[j] = {
                    inset : elemList[newSameElem].box[j].inset,
                    radius : {
                        spread : elemList[newSameElem].box[j].radius.spread,
                        blur : elemList[newSameElem].box[j].radius.blur 
                    },
                    offset : {
                        x : elemList[newSameElem].box[j].offset.x,
                        y : elemList[newSameElem].box[j].offset.y
                    },
                    color : {
                        hue : elemList[newSameElem].box[j].color.hue,
                        opacity : elemList[newSameElem].box[j].color.opacity
                    }
                }
            }
        }
        //fonction de changement visuel des element de selection de la box en fonction de la box du module selectionné dans la liste
        function visualChangeBeforeListSelection(val, opacity){
            visualChgtBox(
                elemList[boxNum].box[val], elemIFList[boxNum].box, 
                boxInsetCheckBoxs[boxNum], boxRangeXYs[boxNum], boxRangeBSs[boxNum], 
                boxColors[boxNum], 
                elemList[boxNum].box[val], opacity
                )
        }
    
        //event de selection du box dans la liste des box dans chaque module
        boxSelectors[boxNum].addEventListener("click", changeListBoxsNumber);
        function changeListBoxsNumber(){
            //active la fonction si l'option selectionné est différente de celle qui l'est déjà
            if (elemIFList[boxNum].box.boxSelectNum != boxSelectors[boxNum].options[boxSelectors[boxNum].selectedIndex].value){
                //supression et attribution a un nouvel element HTML option de l'attribut "select" de la liste de selection HTML
                boxSelectors[boxNum].children[elemIFList[boxNum].box.boxSelectNum-1].removeAttribute("selected");
                elemIFList[boxNum].box.boxSelectNum = boxSelectors[boxNum].options[boxSelectors[boxNum].selectedIndex].value;
                boxSelectors[boxNum].children[elemIFList[boxNum].box.boxSelectNum-1].setAttribute("selected", "");      
                
                //fonction de changement visuel du module box (permet de correspondre au box selectionné)
                let val= elemIFList[boxNum].box.boxSelectNum-1, opacity = opaNum;
                visualChangeBeforeListSelection(val, opacity);  
            }
            box(boxNum);
        }
        
        //ajout d'une box dans la liste des box d'un module
        boxMoreBtns[boxNum].addEventListener("click", function(e){
            //ajout d'une box dans le "compteur de box" pour ensuite construire l'element html qui le representera
            elemIFList[boxNum].box.boxNum ++;
            boxSelectors[boxNum].innerHTML += '<option value="' + elemIFList[boxNum].box.boxNum + '">' + elemIFList[boxNum].box.boxNum + '</option>';
            //suppression et ajout de l'attribut selected de l'option HTML de selection de la box
            boxSelectors[boxNum].children[elemIFList[boxNum].box.boxSelectNum-1].removeAttribute("selected");
            boxSelectors[boxNum].children[elemIFList[boxNum].box.boxNum-1].setAttribute("selected", "");
            //creation de l'objet représentant la nouvelle box
            elemIFList[boxNum].box.boxSelectNum = elemIFList[boxNum].box.boxNum;
            elemList[boxNum].box[elemIFList[boxNum].box.boxNum-1] = {
                inset : false,
                radius : {
                    spread : 0,
                    blur : 0 
                },
                offset : {
                    x : 0,
                    y : 0
                },
                color : {
                    hue : "#969696",
                    opacity : 100
                }
            }
            //enleve les animations des interupteur de selection des ranges
            interuptorSpreadBlurs[boxNum].classList.add("no-transition");
            interuptorSelectsXYs[boxNum].classList.add("no-transition");
            //remet les interupter XY/BS dans leurs position initial lorsque ajout d'une box
            interuptorSpreadBlurs[boxNum].removeAttribute("active");
            boxRangeBSs[boxNum].setAttribute("min","-100");
            boxRangeBSs[boxNum].setAttribute("max","100");
            boxRangeBSs[boxNum].value = elemList[boxNum].box[elemIFList[boxNum].box.boxSelectNum-1].radius.spread; 
            elemIFList[boxNum].box.interuptorBS = false;
            interuptorSelectsXYs[boxNum].removeAttribute("active");
            boxRangeXYs[boxNum].value = elemList[boxNum].box[elemIFList[boxNum].box.boxSelectNum-1].offset.y;
            elemIFList[boxNum].box.interuptorXY = false;
    
    
            //fonction de changement visuel du module box (permet de correspondre au box selectionné)
            let val= elemIFList[boxNum].box.boxNum-1, opacity = opaNum;
            visualChangeBeforeListSelection(val, opacity);
            box(boxNum);
        })
    
        //suppression d'un box dans la liste des box d'un module
        boxTrashBtns[boxNum].addEventListener("click", function(e){
            if(elemIFList[boxNum].box.boxNum > 1){
                boxSelectors[boxNum].removeChild(boxSelectors[boxNum][elemIFList[boxNum].box.boxSelectNum-1]);
                elemList[boxNum].box.splice(elemIFList[boxNum].box.boxSelectNum-1, 1)
    
                //boucle pour remplacer les elements HTML qui représente les boxs précédent celui supprimé, pour leurs assigné leur nouveau numéro
                for(i=elemIFList[boxNum].box.boxSelectNum-1; i<=boxSelectors[boxNum].length-1; i++){
                    boxSelectors[boxNum][i].innerHTML = i+1;
                    boxSelectors[boxNum][i].setAttribute("value", i+1);
                }
                //selection du box inférieur a celui supprimé apres sa suppression 
                if(elemIFList[boxNum].box.boxSelectNum-2 >= 0){
                    elemIFList[boxNum].box.boxNum --;
                    boxSelectors[boxNum][elemIFList[boxNum].box.boxSelectNum-2].setAttribute("selected", "");
                    elemIFList[boxNum].box.boxSelectNum = elemIFList[boxNum].box.boxSelectNum-1; 
                }
                //quand le box supprimé est le premier de la liste, quelques regle différente pour que cela fonctionne
                else if(elemIFList[boxNum].box.boxSelectNum-2 < 0){
                    elemIFList[boxNum].box.boxNum --;
                    boxSelectors[boxNum][elemIFList[boxNum].box.boxSelectNum-1].setAttribute("selected", "");
                }
                //force la selection de l'option correspondant au boxSelectNum
                boxSelectors[boxNum].selectedIndex = elemIFList[boxNum].box.boxSelectNum-1;
                //partie de la fonction qui change la partie visuel 
                let val= elemIFList[boxNum].box.boxSelectNum-1, opacity = opaNum;
                visualChangeBeforeListSelection(val, opacity);
            }
            box(boxNum);
        })
    
        //E checkbox, defini si box est inset ou non 
        boxInsetCheckBoxs[boxNum].addEventListener('input', function(){
            if(elemList[boxNum].box[elemIFList[boxNum].box.boxSelectNum-1].inset == false){
                elemList[boxNum].box[elemIFList[boxNum].box.boxSelectNum-1].inset = true;
    
            }
            else{
                elemList[boxNum].box[elemIFList[boxNum].box.boxSelectNum-1].inset = false;
            }
            box(boxNum);
        })
        //Evenement qui gere le changement détat du bouton XY, permettant selection de l'axe
        selectXYs[boxNum].addEventListener('click', function(){
        //mise en place des effet de transition de l'interupteur
        interuptorSelectsXYs[boxNum].classList.remove("no-transition");
        //etat bouton definissant l'axe Y en JS et qui active le css pour changer le visuel du bouton en fonction
            if(elemIFList[boxNum].box.interuptorXY == false){
                interuptorSelectsXYs[boxNum].setAttribute("active","");
                setTimeout(function(){
                    boxRangeXYs[boxNum].value = elemList[boxNum].box[elemIFList[boxNum].box.boxSelectNum-1].offset.x;
                    elemIFList[boxNum].box.interuptorXY = true;  
                },200)
            }
            //idem que dernier commentaire pour l'axe X 
            else{
                interuptorSelectsXYs[boxNum].removeAttribute("active");
                setTimeout(function(){
                    boxRangeXYs[boxNum].value = elemList[boxNum].box[elemIFList[boxNum].box.boxSelectNum-1].offset.y;
                    elemIFList[boxNum].box.interuptorXY = false;  
                },200)
            }
            box(boxNum);
        })
        //E définissant le offset de box via un range, Y||X en fonction d'interuptorXY
        boxRangeXYs[boxNum].addEventListener("input", function(){
            if(elemIFList[boxNum].box.interuptorXY == false){
                elemList[boxNum].box[elemIFList[boxNum].box.boxSelectNum-1].offset.y = boxRangeXYs[boxNum].value;
            }
            else{
                elemList[boxNum].box[elemIFList[boxNum].box.boxSelectNum-1].offset.x = boxRangeXYs[boxNum].value;            
            }
            box(boxNum);
        })
        //Evenement qui gere le changement détat du bouton BS, permettant selection soi du spread ou du blur
        selectBlurSpreads[boxNum].addEventListener('click', function(){
            //mise en place des effet de transition de l'interupteur
            interuptorSpreadBlurs[boxNum].classList.remove("no-transition");
            //etat bouton definissant selection spread en JS et qui active le css pour changer le visuel du bouton en fonction
            if(elemIFList[boxNum].box.interuptorBS == false){
                interuptorSpreadBlurs[boxNum].setAttribute("active","");
                setTimeout(function(){
                    boxRangeBSs[boxNum].setAttribute("min","0");
                    boxRangeBSs[boxNum].setAttribute("max","100");
                    boxRangeBSs[boxNum].value = elemList[boxNum].box[elemIFList[boxNum].box.boxSelectNum-1].radius.blur;
                    elemIFList[boxNum].box.interuptorBS = true;
                },200)
            }
            //idem pour le blur
            else{
                interuptorSpreadBlurs[boxNum].removeAttribute("active");
                setTimeout(function(){
                    boxRangeBSs[boxNum].setAttribute("min","-100");
                    boxRangeBSs[boxNum].setAttribute("max","100");
                    boxRangeBSs[boxNum].value = elemList[boxNum].box[elemIFList[boxNum].box.boxSelectNum-1].radius.spread; 
                    elemIFList[boxNum].box.interuptorBS = false;
                },200)
            }
            box(boxNum);
        })
        //E definissant le Blur de box via un range, Blur||Spread en fonction d'interuptorBS
        boxRangeBSs[boxNum].addEventListener("input", function(){
            if(elemIFList[boxNum].box.interuptorBS == false){
                elemList[boxNum].box[elemIFList[boxNum].box.boxSelectNum-1].radius.spread = boxRangeBSs[boxNum].value;
            }
            else{
                elemList[boxNum].box[elemIFList[boxNum].box.boxSelectNum-1].radius.blur = boxRangeBSs[boxNum].value;            
            }
            box(boxNum);
        })
        //E definissant la couleur de box 
        boxColors[boxNum].addEventListener("input", function(){
            elemList[boxNum].box[elemIFList[boxNum].box.boxSelectNum-1].color.hue = boxColors[boxNum].value;
            box(boxNum);
        })
        opaHTMLRanges[opaNum].addEventListener("input", function(){
            elemList[boxNum].box[elemIFList[boxNum].box.boxSelectNum-1].color.opacity = opaHTMLRanges[opaNum].value;
            box(boxNum);
        })
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~TEXT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
function createText(elementNumber, newSameElem = null){

    let textNum = elementNumber;
    if(elemList[textNum].text == null){
        elemList[textNum].text = [];
        if(newSameElem != null){
            for(t=0; t<=elemList[newSameElem].text.length-1; t++){
                elemList[textNum].text.push(elemList[newSameElem].text[t]);
            }
        }
    }

    elemIFList[textNum].text = {
        bold : false,
        italic : false,
        decoration : {
            style : 0,
            color : "#000000",
            line : {
                underline : false,
                lineThrough : false,
                overline : false
            }
        },
        align : {
            start : false,
            center : false,
            end : false,
            justify : false,
            value : "start"
        },
        family : "Arial, Helvetica, sans-serif",
        size : 16,
        color : "#000000",
        spacing : {
            selected : "letter-spacing",
            letter : 0,
            word : 0,
            line : 18
        },
        shadow : {
            nextOptionNum : 2,
            optionSelected : 0,
            axeX : false,
            shadowTextValue : [
                {
                    axe : {
                        x : 0,
                        y : 0
                    },
                    blur : 0,
                    color : "#000000"
                }
            ]
        },
        whiteSpace : "pre",
        tag : "span",
        content : ""
};
    //event for openning the textTool and associate to it the actual and selected element
    textButtons[textNum].addEventListener("mousedown", openTextTool);
    function openTextTool(){
        //changement value for openning animation
        textTool.style.display = "flex";
        body.parentNode.style.overflow = "hidden";
        setTimeout(function(){
            textTool.removeAttribute("close");
        },90)

        //set some variable for textTool working with the selected element
        textAssociateElemNum = textNum;
        elementTextaddedNumber = 0;

        //because the text tool is the same for all generate elements, we need to adapt it to the element each time we open it
        //first, update btn, select and input of the menu of the tool to the state of the related elemIFList[].text
        openingTextTool();
        //in second time we put a representation(or copy) of the element selected for a text adding, in the text tool 
        copy = document.getElementById(elemList[textAssociateElemNum].id.name).cloneNode(true);
        copy.removeAttribute("id");
        displayElementInTextTool.appendChild(copy);
        copy.innerHTML = "";
        for(g=0; g<=elemList[textAssociateElemNum].text.length-1; g++){
            addingTextToElementRepresentation(copy);
            elementTextaddedNumber++;
        }
    }
}

closeTextToolBtn.addEventListener("click", function(){
    textTool.setAttribute("close", "");
    body.parentNode.style.overflow = "scroll";
    setTimeout(function(){
        textTool.style.display = "none";
    },500)
    displayElementInTextTool.innerHTML = "";
})

resetBtn.addEventListener("click", function(){
    resetTextToolvalues();
    openingTextTool();
})

boldBtn.addEventListener("click", function(){
    let isSet = addAndRemoveAttribute(boldBtn, "selected");
    elemIFList[textAssociateElemNum].text.bold = isSet;
    textGen();
})
italicBtn.addEventListener("click", function(){
    let isSet = addAndRemoveAttribute(italicBtn, "selected");
    elemIFList[textAssociateElemNum].text.italic = isSet;
    textGen();
})

//---DECORATION-EVENT---//
underlineBtn.addEventListener("click", function(){
    let isSet = addAndRemoveAttribute(underlineBtn, "selected");
    if(isSet) {
        elemIFList[textAssociateElemNum].text.decoration.line.underline = true;
    } else{ 
        elemIFList[textAssociateElemNum].text.decoration.line.underline = false; 
    }; 
    textGen();
});
lineThroughBtn.addEventListener("click", function(){
    let isSet = addAndRemoveAttribute(lineThroughBtn, "selected");
    if(isSet) {
        elemIFList[textAssociateElemNum].text.decoration.line.lineThrough = true;
    } else{ 
        elemIFList[textAssociateElemNum].text.decoration.line.lineThrough = false;
    };
    textGen();
});
overlineBtn.addEventListener("click", function(){
    let isSet = addAndRemoveAttribute(overlineBtn, "selected");
    if(isSet) {
        elemIFList[textAssociateElemNum].text.decoration.line.overline = true;
    } else{ 
        elemIFList[textAssociateElemNum].text.decoration.line.overline = false; 
    };
    textGen();
});

textDecorationStyleSelect.addEventListener("change", function(){
    elemIFList[textAssociateElemNum].text.decoration.style = textDecorationStyleSelect.value;
    textGen();
})
textDecorationColorInput.addEventListener("input", function(){
    elemIFList[textAssociateElemNum].text.decoration.color = textDecorationColorInput.value;
    textGen();
})
//---ALIGN-EVENT---//
alignLeftBtn.addEventListener("click", function(){
    let isSet = addAndRemoveAttributeTextAlign(alignLeftBtn, alignRightBtn, alignCenterBtn, alignJustifyBtn, "selected");
    elemIFList[textAssociateElemNum].text.align.value = "start";
    if(isSet){
        elemIFList[textAssociateElemNum].text.align.start = true;
        elemIFList[textAssociateElemNum].text.align.center = false;
        elemIFList[textAssociateElemNum].text.align.justify = false;
        elemIFList[textAssociateElemNum].text.align.end = false;
    } else {
        removeAlign()
    }
    textGen();
});
alignCenterBtn.addEventListener("click", function(){
    let isSet = addAndRemoveAttributeTextAlign(alignCenterBtn, alignRightBtn, alignJustifyBtn, alignLeftBtn, "selected");
    if(isSet){ 
        elemIFList[textAssociateElemNum].text.align.value = "center";
        elemIFList[textAssociateElemNum].text.align.center = true;
        elemIFList[textAssociateElemNum].text.align.start = false;
        elemIFList[textAssociateElemNum].text.align.justify = false;
        elemIFList[textAssociateElemNum].text.align.end = false;
    } else{ 
        elemIFList[textAssociateElemNum].text.align.value = "start";
        removeAlign()
    };
    textGen();
});
alignRightBtn.addEventListener("click", function(){
    let isSet = addAndRemoveAttributeTextAlign(alignRightBtn, alignJustifyBtn, alignCenterBtn, alignLeftBtn, "selected");
    if(isSet){ 
        elemIFList[textAssociateElemNum].text.align.value = "end";
        elemIFList[textAssociateElemNum].text.align.end = true;
        elemIFList[textAssociateElemNum].text.align.start = false;
        elemIFList[textAssociateElemNum].text.align.center = false;
        elemIFList[textAssociateElemNum].text.align.justify = false;
    } else{ 
        elemIFList[textAssociateElemNum].text.align.value = "start";
        removeAlign()
    };
    textGen();
});

alignJustifyBtn.addEventListener("click", function(){
    let isSet = addAndRemoveAttributeTextAlign(alignJustifyBtn, alignRightBtn, alignCenterBtn, alignLeftBtn, "selected");
    if(isSet){ 
        elemIFList[textAssociateElemNum].text.align.value = "justify";
        elemIFList[textAssociateElemNum].text.align.justify = true; 
        elemIFList[textAssociateElemNum].text.align.start = false;
        elemIFList[textAssociateElemNum].text.align.center = false;
        elemIFList[textAssociateElemNum].text.align.end = false;
    } else{ 
        elemIFList[textAssociateElemNum].text.align.value = "start";
        removeAlign()
    };
    textGen();
});
//function associate to align event to remove all alignment selection on btn  
function removeAlign(){
    elemIFList[textAssociateElemNum].text.align.start = false;
    elemIFList[textAssociateElemNum].text.align.center = false;
    elemIFList[textAssociateElemNum].text.align.justify = false;
    elemIFList[textAssociateElemNum].text.align.end = false;
}


selectFontFamily.addEventListener('change', function(){
    elemIFList[textAssociateElemNum].text.family = selectFontFamily.value;
    textGen();
})
fontSizeRange.addEventListener('input', function(){
    elemIFList[textAssociateElemNum].text.size = fontSizeRange.value; 
    textGen();
})
textColorInput.addEventListener('input', function(){
    elemIFList[textAssociateElemNum].text.color = textColorInput.value;
    textGen();
})

//---TEXT-SPACING-EVENT---//
letterSpacingRadio.addEventListener("click", textSpacingInpuRadioSelection);
wordSpacingRadio.addEventListener("click", textSpacingInpuRadioSelection);
lineSpacingRadio.addEventListener("click", textSpacingInpuRadioSelection);
//associate to the above event, manage selection of the radio input
function textSpacingInpuRadioSelection(e){
    elemIFList[textAssociateElemNum].text.spacing.selected = e.target.value; 
    textGen();
}

//4 events to interact with the 2 btns of spacing.
//2 events associate to the enlarging fonction (one to setInterval and one to clearInterval)
//2 event associate to the decrease. (one to setInterval and one to clearInterval) 
enlargeSpaceBtn.addEventListener("mousedown", function(){
    enlargingInterval = setInterval(function(){
        enlarging(); textGen();
    }, 100);
});
enlargeSpaceBtn.addEventListener("mouseup", function(){
    clearInterval(enlargingInterval);
});
decreaseSpaceBtn.addEventListener("mousedown", function(){
    decreasingInterval = setInterval(function(){
        decreasing(); textGen();
    }, 100);
    
});
decreaseSpaceBtn.addEventListener("mouseup", function(){
    clearInterval(decreasingInterval);
});

//in function of the value of elemIFList[].text.spacing.selected change the value of the spacing of letter, word or line
function enlarging(){
    switch (elemIFList[textAssociateElemNum].text.spacing.selected){
        case "letter-spacing" : 
            elemIFList[textAssociateElemNum].text.spacing.letter += 1;
            break; 
        case "word-spacing" :
            elemIFList[textAssociateElemNum].text.spacing.word += 1;
            break;
        case "line-height" :
            elemIFList[textAssociateElemNum].text.spacing.line += 1;
            break
    }
    textGen();
};
function decreasing(){
    switch (elemIFList[textAssociateElemNum].text.spacing.selected){
        case "letter-spacing" : 
            elemIFList[textAssociateElemNum].text.spacing.letter -= 1;
            break; 
        case "word-spacing" :
            elemIFList[textAssociateElemNum].text.spacing.word -= 1;
            break;
        case "line-height" :
            elemIFList[textAssociateElemNum].text.spacing.line -= 1;
            break
    }
    textGen();
};

//---TEXT-TAG-EVENT---//
textTagSpan.addEventListener('click', textTagInpuRadioSelection);
textTagP.addEventListener('click', textTagInpuRadioSelection);
textTagH1.addEventListener('click', textTagInpuRadioSelection);
textTagH2.addEventListener('click', textTagInpuRadioSelection);
textTagH3.addEventListener('click', textTagInpuRadioSelection);

function textTagInpuRadioSelection(e){
    elemIFList[textAssociateElemNum].text.tag = e.target.value;
    textGen();
}

//---SHADOW-TEXT-EVENT---//
//shadow select and add and delete btn//
shadowTextSelect.addEventListener("change", function(){
    let SelectChildren = shadowTextSelect.children;
    SelectChildren[elemIFList[textAssociateElemNum].text.shadow.optionSelected].removeAttribute("selected");
    elemIFList[textAssociateElemNum].text.shadow.optionSelected = shadowTextSelect.value-1; 
    SelectChildren[elemIFList[textAssociateElemNum].text.shadow.optionSelected].setAttribute("selected","");
    reinitializeShadowTextInput();
    textGen();
})
shadowTextMoreBtn.addEventListener("click", function(){
    let SelectChildren = shadowTextSelect.children;
    SelectChildren[elemIFList[textAssociateElemNum].text.shadow.optionSelected].removeAttribute("selected");
    shadowTextSelect.innerHTML += "<option value='" + elemIFList[textAssociateElemNum].text.shadow.nextOptionNum + "' selected>" + elemIFList[textAssociateElemNum].text.shadow.nextOptionNum + "</option>";
    elemIFList[textAssociateElemNum].text.shadow.optionSelected++;
    elemIFList[textAssociateElemNum].text.shadow.shadowTextValue.push({ axe : {x : 0, y : 0}, blur : 0, color : "#000000"})
    elemIFList[textAssociateElemNum].text.shadow.nextOptionNum++;

    reinitializeShadowTextInput();
    textGen();
})
shadowTextTrashBtn.addEventListener("click", function(){
    if((elemIFList[textAssociateElemNum].text.shadow.optionSelected == shadowTextSelect.children.length-1)&&(elemIFList[textAssociateElemNum].text.shadow.optionSelected != 0)){
        let SelectChildren = shadowTextSelect.children;
        SelectChildren[elemIFList[textAssociateElemNum].text.shadow.optionSelected].removeAttribute("selected");
        elemIFList[textAssociateElemNum].text.shadow.optionSelected--
        SelectChildren[elemIFList[textAssociateElemNum].text.shadow.optionSelected].setAttribute("selected","");
    }

    if(shadowTextSelect.children.length-1 == 0){
        elemIFList[textAssociateElemNum].text.shadow.shadowTextValue = [
            {
                axe : {
                    x : 0,
                    y : 0
                },
                blur : 0,
                color : "#000000"
            }
        ]
    } else {
        shadowTextSelect.removeChild(shadowTextSelect.lastChild);
        elemIFList[textAssociateElemNum].text.shadow.shadowTextValue.splice(elemIFList[textAssociateElemNum].text.shadow.optionSelected, 1);
        elemIFList[textAssociateElemNum].text.shadow.nextOptionNum--;
    }
    reinitializeShadowTextInput();
    textGen();
}) 
//in relation with three event above, change value of input (ect) in function of the new selected shadow
function reinitializeShadowTextInput(){
    btnTextShadow.removeAttribute("axeX"); elemIFList[textAssociateElemNum].text.shadow.axeX = false;
    shadowTextXYRange.value = elemIFList[textAssociateElemNum].text.shadow.shadowTextValue[elemIFList[textAssociateElemNum].text.shadow.optionSelected].axe.y;
    shadowTextBlurRange.value = elemIFList[textAssociateElemNum].text.shadow.shadowTextValue[elemIFList[textAssociateElemNum].text.shadow.optionSelected].blur;
    shadowTextColorInput.value = elemIFList[textAssociateElemNum].text.shadow.shadowTextValue[elemIFList[textAssociateElemNum].text.shadow.optionSelected].color;
}

//to change the axe of the spacing of the shadow
btnTextShadow.addEventListener("click", function(){
    let isSet = addAndRemoveAttribute(btnTextShadow, "axeX");
    elemIFList[textAssociateElemNum].text.shadow.axeX = isSet;
    if(elemIFList[textAssociateElemNum].text.shadow.axeX == false) shadowTextXYRange.value = elemIFList[textAssociateElemNum].text.shadow.shadowTextvalue[elemIFList[textAssociateElemNum].text.shadow.optionSelected].axe.y;
    else {shadowTextXYRange.value = elemIFList[textAssociateElemNum].text.shadow.shadowTextValue[elemIFList[textAssociateElemNum].text.shadow.optionSelected].axe.x};
    textGen();
})
//to place the shadow in the space next to the text
shadowTextXYRange.addEventListener("input", function(){
    if(elemIFList[textAssociateElemNum].text.shadow.axeX == false) elemIFList[textAssociateElemNum].text.shadow.shadowTextValue[elemIFList[textAssociateElemNum].text.shadow.optionSelected].axe.y = shadowTextXYRange.value;
    else {elemIFList[textAssociateElemNum].text.shadow.shadowTextValue[elemIFList[textAssociateElemNum].text.shadow.optionSelected].axe.x = shadowTextXYRange.value};
    textGen();
})
//to add or remove blur to the shadow-text
shadowTextBlurRange.addEventListener("input", function(){
    elemIFList[textAssociateElemNum].text.shadow.shadowTextValue[elemIFList[textAssociateElemNum].text.shadow.optionSelected].blur = shadowTextBlurRange.value;
    textGen();
})
//to set the color of the shadow
shadowTextColorInput.addEventListener("input", function(){
    elemIFList[textAssociateElemNum].text.shadow.shadowTextValue[elemIFList[textAssociateElemNum].text.shadow.optionSelected].color = shadowTextColorInput.value;
    textGen();
})

//---WHITE-SPACE-EVENT---//
whiteSpaceSelect.addEventListener("change", function(){
    elemIFList[textAssociateElemNum].text.whiteSpace = whiteSpaceSelect.value;
    textGen();
})

//---TEXTAREA-EVENT---//
textWrite.addEventListener('input', function(){
    elemIFList[textAssociateElemNum].text.content = textWrite.value;
    textGen();
})

//to adding text write and styled to the elemList[].text to save it inside
//after that, with the function addingTextToElementRepresentation, we put the text in the html element and his representation
//finally we reset the textTool btn/select/input/ ect to their default value, to adding an other text and increment variable who represent the futur next text
textAddBtn.addEventListener("click", function(){
    //adding all new text values to the elemList[]text array
    let newText = {
        bold : elemIFList[textAssociateElemNum].text.bold,
        italic : elemIFList[textAssociateElemNum].text.italic,
        decoration : {
            style : elemIFList[textAssociateElemNum].text.decoration.style,
            color : elemIFList[textAssociateElemNum].text.decoration.color,
            line : {
                underline : elemIFList[textAssociateElemNum].text.decoration.line.underline,
                lineThrough : elemIFList[textAssociateElemNum].text.decoration.line.lineThrough,
                overline : elemIFList[textAssociateElemNum].text.decoration.line.overline
            }
        },
        align : elemIFList[textAssociateElemNum].text.align.value,
        family : elemIFList[textAssociateElemNum].text.family,
        size : elemIFList[textAssociateElemNum].text.size,
        color : elemIFList[textAssociateElemNum].text.color,
        spacing : {
            letter : elemIFList[textAssociateElemNum].text.spacing.letter,
            word : elemIFList[textAssociateElemNum].text.spacing.word,
            line : elemIFList[textAssociateElemNum].text.spacing.line
        },
        shadow :[],
        whiteSpace : elemIFList[textAssociateElemNum].text.whiteSpace,
        tag : elemIFList[textAssociateElemNum].text.tag,
        content : elemIFList[textAssociateElemNum].text.content
    }

    elemList[textAssociateElemNum].text.push(newText);
    for(t=0; t<=elemIFList[textAssociateElemNum].text.shadow.shadowTextValue.length-1; t++){
        elemList[textAssociateElemNum].text[elementTextaddedNumber].shadow.push(elemIFList[textAssociateElemNum].text.shadow.shadowTextValue[t])
    }

    //adding the new Text to the HTML element and his text tool representation
    addingTextToElementRepresentation(copy);
    addingTextToElementRepresentation(document.getElementById(elemList[textAssociateElemNum].id.name));

    //increment the below variable, represent the futur next text to adding to elemList[].text[HERE]
    elementTextaddedNumber++;

    //reset the textTool btn/select/input/ect to their initial values
    resetTextToolvalues();
    openingTextTool();
})

//to remove all text save in the elemList[].text, remove text from html element and set the variable associate to the number of text in the element to 0
trashAllTextBtn.addEventListener("click", function(){
    copy.innerHTML = "";
    document.getElementById(elemList[textAssociateElemNum].id.name).innerHTML = "";
    elementTextaddedNumber = 0;
    elemList[textAssociateElemNum].text = [];

})

function addingTextToElementRepresentation(elem){
    elem.innerHTML += "<" + elemList[textAssociateElemNum].text[elementTextaddedNumber].tag +">" + elemList[textAssociateElemNum].text[elementTextaddedNumber].content +"</" + elemList[textAssociateElemNum].text[elementTextaddedNumber].tag +">"

    elem.style.display = "flex";
    elem.style.flexDirection = "column";
    elem.style.alignItems = "center"
    elem.style.justifyContent = "center";
    
    if(elemList[textAssociateElemNum].text[elementTextaddedNumber].bold) elem.children[elementTextaddedNumber].style.fontWeight = "900";
    else {elem.children[elementTextaddedNumber].style.fontWeight = 'normal';}

    if(elemList[textAssociateElemNum].text[elementTextaddedNumber].italic) elem.children[elementTextaddedNumber].style.fontStyle = "italic";
    else {elem.children[elementTextaddedNumber].style.fontStyle = 'normal';}

    elem.children[elementTextaddedNumber].style.textDecorationColor = elemList[textAssociateElemNum].text[elementTextaddedNumber].decoration.color;
    elem.children[elementTextaddedNumber].style.textDecorationStyle = elemList[textAssociateElemNum].text[elementTextaddedNumber].decoration.style;

    let textDecorationLineSetting = "";
    if((elemList[textAssociateElemNum].text[elementTextaddedNumber].decoration.line.underline == false)&&(elemList[textAssociateElemNum].text[elementTextaddedNumber].decoration.line.lineThrough == false)&&(elemList[textAssociateElemNum].text[elementTextaddedNumber].decoration.line.overline == false)){
        textDecorationLineSetting = "none"
    } else {
        if(elemList[textAssociateElemNum].text[elementTextaddedNumber].decoration.line.underline != false) textDecorationLineSetting += "underline";
        if(elemList[textAssociateElemNum].text[elementTextaddedNumber].decoration.line.lineThrough != false){
            if(textDecorationLineSetting != "") textDecorationLineSetting += " " + "line-through";
            else {textDecorationLineSetting += "line-through"}
        }
        if(elemList[textAssociateElemNum].text[elementTextaddedNumber].decoration.line.overline != false){
            if(textDecorationLineSetting != "") textDecorationLineSetting += " " + "overline";
            else {textDecorationLineSetting += "overline"}
        }
    }
    elem.children[elementTextaddedNumber].style.textDecorationLine = textDecorationLineSetting;
    elem.style.textAlign = elemList[textAssociateElemNum].text[elementTextaddedNumber].align;
    elem.children[elementTextaddedNumber].style.fontFamily = elemList[textAssociateElemNum].text[elementTextaddedNumber].family;
    elem.children[elementTextaddedNumber].style.fontSize = elemList[textAssociateElemNum].text[elementTextaddedNumber].size + "px";
    elem.children[elementTextaddedNumber].style.color = elemList[textAssociateElemNum].text[elementTextaddedNumber].color;
    elem.children[elementTextaddedNumber].style.letterSpacing = elemList[textAssociateElemNum].text[elementTextaddedNumber].spacing.letter + "px";
    elem.children[elementTextaddedNumber].style.wordSpacing = elemList[textAssociateElemNum].text[elementTextaddedNumber].spacing.word + "px";
    elem.children[elementTextaddedNumber].style.lineHeight = elemList[textAssociateElemNum].text[elementTextaddedNumber].spacing.line + "px";

    let textShadowFinalStyle = ""
    for(t=0; t<=elemList[textAssociateElemNum].text[elementTextaddedNumber].shadow.length-1; t++){
        textShadowFinalStyle += elemList[textAssociateElemNum].text[elementTextaddedNumber].shadow[t].axe.x + "px " + elemList[textAssociateElemNum].text[elementTextaddedNumber].shadow[t].axe.y + "px " + elemList[textAssociateElemNum].text[elementTextaddedNumber].shadow[t].blur + "px " + elemList[textAssociateElemNum].text[elementTextaddedNumber].shadow[t].color;
        if(t < elemList[textAssociateElemNum].text[elementTextaddedNumber].shadow.length-1) textShadowFinalStyle += ', '; 
    }
    elem.children[elementTextaddedNumber].style.textShadow = textShadowFinalStyle; 

    elem.style.whiteSpace = elemList[textAssociateElemNum].text[elementTextaddedNumber].whiteSpace;
}

//set the elemIFList[]text to is default value again.
function resetTextToolvalues(){
    elemIFList[textAssociateElemNum].text = {
        bold : false,
        italic : false,
        decoration : {
            style : 0,
            color : "#000000",
            line : {
                underline : false,
                lineThrough : false,
                overline : false
            }
        },
        align : {
            start : false,
            center : false,
            end : false,
            justify : false,
            value : "start"
        },
        family : "Arial, Helvetica, sans-serif",
        size : 16,
        color : "#000000",
        spacing : {
            selected : "letter-spacing",
            letter : 0,
            word : 0,
            line : 18
        },
        shadow : {
            nextOptionNum : 2,
            optionSelected : 0,
            axeX : false,
            shadowTextValue : [
                {
                    axe : {
                        x : 0,
                        y : 0
                    },
                    blur : 0,
                    color : "#000000"
                }
            ]
        },
        whiteSpace : "pre",
        tag : "span",
        content : ""
    }
}

//generate representation of the futur text to put in the element.
//it is placed in the texttool in the #result-text tag 
function textGen(){
    if(textTool.style.display == "flex"){
        textResult.innerHTML = "";
        textResult.innerHTML += "<" + elemIFList[textAssociateElemNum].text.tag + ">";
        textResult.innerHTML += textWrite.value;
        textResult.innerHTML += "</" + elemIFList[textAssociateElemNum].text.tag + ">";


        if(boldBtn.hasAttribute("selected")) textResult.style.fontWeight = "900";
        else {textResult.style.fontWeight = 'normal';}

        if(italicBtn.hasAttribute("selected")) textResult.style.fontStyle = "italic";
        else {textResult.style.fontStyle = 'normal';}

        textResult.style.textDecorationColor = elemIFList[textAssociateElemNum].text.decoration.color;
        textResult.style.textDecorationStyle = elemIFList[textAssociateElemNum].text.decoration.style;

        let textDecorationLineSetting = "";
        if((elemIFList[textAssociateElemNum].text.decoration.line.underline == false)&&(elemIFList[textAssociateElemNum].text.decoration.line.lineThrough == false)&&(elemIFList[textAssociateElemNum].text.decoration.line.overline == false)){
            textDecorationLineSetting = "none"
        } else {
            if(elemIFList[textAssociateElemNum].text.decoration.line.underline != false) textDecorationLineSetting += "underline";
            if(elemIFList[textAssociateElemNum].text.decoration.line.lineThrough != false){
                if(textDecorationLineSetting != "") textDecorationLineSetting += " " + "line-through";
                else {textDecorationLineSetting += "line-through"}
            }
            if(elemIFList[textAssociateElemNum].text.decoration.line.overline != false){
                if(textDecorationLineSetting != "") textDecorationLineSetting += " " + "overline";
                else {textDecorationLineSetting += "overline"}
            }
        }
        textResult.style.textDecorationLine = textDecorationLineSetting;
        textResult.style.textAlign = elemIFList[textAssociateElemNum].text.align.value;
        textResult.style.fontFamily = elemIFList[textAssociateElemNum].text.family;
        textResult.style.fontSize = elemIFList[textAssociateElemNum].text.size + "px";
        textResult.style.color = elemIFList[textAssociateElemNum].text.color;
        textResult.style.letterSpacing = elemIFList[textAssociateElemNum].text.spacing.letter + "px";
        textResult.style.wordSpacing = elemIFList[textAssociateElemNum].text.spacing.word + "px";
        textResult.style.lineHeight = elemIFList[textAssociateElemNum].text.spacing.line + "px";

        let textShadowFinalStyle = ""
        for(t=0; t<=elemIFList[textAssociateElemNum].text.shadow.shadowTextValue.length-1; t++){
            textShadowFinalStyle += elemIFList[textAssociateElemNum].text.shadow.shadowTextValue[t].axe.x + "px " + elemIFList[textAssociateElemNum].text.shadow.shadowTextValue[t].axe.y + "px " + elemIFList[textAssociateElemNum].text.shadow.shadowTextValue[t].blur + "px " + elemIFList[textAssociateElemNum].text.shadow.shadowTextValue[t].color;
            if(t < elemIFList[textAssociateElemNum].text.shadow.shadowTextValue.length-1) textShadowFinalStyle += ', '; 
        }
        textResult.style.textShadow = textShadowFinalStyle; 

        textResult.style.whiteSpace = elemIFList[textAssociateElemNum].text.whiteSpace;
    } 
}

//////////////////////////////////////////////////////////////////////////////////////////////
//setup all btns and selector of the text tool to related information in the elemIFList
//use the three function below
function openingTextTool(){
    //----bold----//
    setupTextToolBtn(boldBtn, elemIFList[textAssociateElemNum].text.bold);
    //----italic----//
    setupTextToolBtn(italicBtn, elemIFList[textAssociateElemNum].text.italic);

    //----decoration----//
    //decoration-line
    setupTextToolBtn(underlineBtn, elemIFList[textAssociateElemNum].text.decoration.line.underline);
    setupTextToolBtn(lineThroughBtn, elemIFList[textAssociateElemNum].text.decoration.line.lineThrough);
    setupTextToolBtn(overlineBtn, elemIFList[textAssociateElemNum].text.decoration.line.overline);
    //decoration-style
    optionSelection(textDecorationStyleSelect, elemIFList[textAssociateElemNum].text.decoration.style)
    //decoration-color
    textDecorationColorInput.value = elemIFList[textAssociateElemNum].text.decoration.color;

    //----align----//
    setupTextToolBtn(alignJustifyBtn, elemIFList[textAssociateElemNum].text.align.justify);
    setupTextToolBtn(alignRightBtn, elemIFList[textAssociateElemNum].text.align.start);
    setupTextToolBtn(alignCenterBtn, elemIFList[textAssociateElemNum].text.align.center);
    setupTextToolBtn(alignLeftBtn, elemIFList[textAssociateElemNum].text.align.end);

    //----font-family----//
    optionSelection(selectFontFamily, elemIFList[textAssociateElemNum].text.family);
    //----size----//
    fontSizeRange.value = elemIFList[textAssociateElemNum].text.size;
    //----color----//
    textColorInput.value = elemIFList[textAssociateElemNum].text.color;

    //----shadow----//
    //shadow-select-setting : 
    //remove all option from the select tag 
    shadowTextSelect.innerHTML = ""
    //add one option for each element in the array shadowTextValue (who represent each shadow text associate to the actual text)
    for(b=1; b<=elemIFList[textAssociateElemNum].text.shadow.shadowTextValue.length; b++){
        shadowTextSelect.innerHTML += "<option value='" + b + "'>" + b + "</option>";
    }
    //select the option associate to the actual selected shadow
    shadowTextSelect.children[elemIFList[textAssociateElemNum].text.shadow.optionSelected].selected = true;

    //shadow-axeX-btn and the input range associate
    if(!elemIFList[textAssociateElemNum].text.shadow.axeX){
        if(btnTextShadow.hasAttribute("axex")) btnTextShadow.removeAttribute("axex");
        shadowTextXYRange.value = elemIFList[textAssociateElemNum].text.shadow.shadowTextValue[elemIFList[textAssociateElemNum].text.shadow.optionSelected].axe.y
    } else {
        btnTextShadow.removeAttribute("axex"); btnTextShadow.setAttribute("axex", "");
        shadowTextXYRange.value = elemIFList[textAssociateElemNum].text.shadow.shadowTextValue[elemIFList[textAssociateElemNum].text.shadow.optionSelected].axe.x
    }

    //shadow-blur-input-range
    shadowTextBlurRange.value = elemIFList[textAssociateElemNum].text.shadow.shadowTextValue[elemIFList[textAssociateElemNum].text.shadow.optionSelected].blur
    //shadow-color-input-range
    shadowTextColorInput.value = elemIFList[textAssociateElemNum].text.shadow.shadowTextValue[elemIFList[textAssociateElemNum].text.shadow.optionSelected].color

    //----white-space----//
    optionSelection(whiteSpaceSelect, elemIFList[textAssociateElemNum].text.whiteSpace);

    //----tag----//
    setupTextToolInputRadio(textTagSpan, elemIFList[textAssociateElemNum].text.tag, textTagSpan.value);
    setupTextToolInputRadio(textTagP, elemIFList[textAssociateElemNum].text.tag, textTagP.value);
    setupTextToolInputRadio(textTagH1, elemIFList[textAssociateElemNum].text.tag, textTagH1.value);
    setupTextToolInputRadio(textTagH2, elemIFList[textAssociateElemNum].text.tag, textTagH2.value);
    setupTextToolInputRadio(textTagH3, elemIFList[textAssociateElemNum].text.tag, textTagH3.value);

    //----textarea----//
    textWrite.value = elemIFList[textAssociateElemNum].text.content;
    
    //after all this setting, we generate the text in the #result-text tag
    textGen();    
}

//three function in link with the one above : 
//to setup the btn in function of elemIFlist info
function setupTextToolBtn(btn, info){
    if(!info){
        if(btn.hasAttribute("selected")) btn.removeAttribute("selected");
    } else {
        btn.removeAttribute("selected"); btn.setAttribute("selected", "");
    }
}
//to setup the selected option in function of elemIFlist info
function optionSelection(select, optionName){
    for(t=0; t<=select.children.length-1; t++){
        select.children[t].selected = false;
        if(select.children[t].value == optionName){
            select.children[t].selected = true;
        } 
    }
}
//to setup input radio in function of elemIFlist info
function setupTextToolInputRadio(radio, waitingInfo, info){
    if( waitingInfo != info){
        radio.checked = false;
    } else {
        radio.checked = true;
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////


function addAndRemoveAttribute(element, attribute){
    if(element.hasAttribute(attribute)){
        element.removeAttribute(attribute);
        return false; 
    } else {
        element.setAttribute(attribute, "");
        return true;
    }
}

function addAndRemoveAttributeTextAlign(element, anotherElement, anotherElement2, anotherElement3, attribute){
    if(element.hasAttribute(attribute)){
        element.removeAttribute(attribute);
        return false;
    } else {
        element.setAttribute(attribute, "");
        anotherElement.removeAttribute(attribute);
        anotherElement2.removeAttribute(attribute);
        anotherElement3.removeAttribute(attribute);
        return true; 
    }
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~TRASH-RESET-MORE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

//fonction de suppression d'une element bar

function createTrashBtn(i){
        let trashNum = i;
        trashBtns[trashNum].addEventListener("click", function(){
        
            document.getElementById("if-" + elemList[trashNum].id.name).remove();
            document.getElementById(elemList[trashNum].id.name).remove();
            elements[trashNum].remove();
                
            elemList.splice(trashNum, 1);
            elemIFList.splice(trashNum, 1);

            for (i=trashNum; i<=elemList.length-1; i++){
                elements[i].replaceWith(elements[i].cloneNode(true));
                createModule(i)
            }
            //first step of visual change
            for (o=0; o<=elemList.length-1; o++){
                allVisualChange(o);
            }
            
            updatePos();
            gridIFList[i].use = false;
            createSize();
            createPlacement();

            //for visual-changement of elem-window
            removeAllEllAttr()
            moduleCounter--;
            selectAllEllAttr()
            if(moduleCounter == 0){
                elemTool.setAttribute("begin", "");
                angle.setAttribute("begin", "");
            }
    })
}
//fonction de reset des information de style de l'element séléctionné
function createResetBtn(){
    for(i=0; i<= elements.length-1; i++){
        let resetNum = i;
        resetBtns[resetNum].addEventListener("click", function(){
            //~~~~~~~~~~~~~~~~~~~~RESET ELEMENT~~~~~~~~~~~~~~~~~~~~~//
            //put all information in their initial values, for all modules
            //id
            elemList[resetNum].id.name = elemList[resetNum].id.name;
            //color
            elemList[resetNum].color.hue = "#009DFF";
            elemList[resetNum].color.opacity = 100;
            //shader
            elemIFList[resetNum].shader.shaderNum = 1;
            elemIFList[resetNum].shader.shaderSelectNum = 1;
            elemIFList[resetNum].shader.interuptor = false;
            elemIFList[resetNum].shader.degreeBtn.btnNum = 0;
            elemIFList[resetNum].shader.degreeBtn.degree = 0;
            elemIFList[resetNum].shader.degreeBtn.degreeInteruptor = false;
            elemIFList[resetNum].shader.degreeBtn.initVal = 0;

            if(elemList[resetNum].shader.length >= 1){
                for (j=1; j<= elemList[resetNum].shader.length-1; j++) {
                    elemList[resetNum].shader.splice(j,1);
                }
            }
            elemList[resetNum].shader[0] = {
                placement : 0, gradient : "linear", degree : 0,
                color : { hue : "#FFA200",opacity : 100 }
            }
            //corner
            elemIFList[resetNum].corner.cornerSelectorSelectionCounter = 1;
            elemIFList[resetNum].corner.CornerInteruptorTL = false;
            elemIFList[resetNum].corner.CornerInteruptorTR = false;
            elemIFList[resetNum].corner.CornerInteruptorBR = false;
            elemIFList[resetNum].corner.CornerInteruptorBL = false;
            elemIFList[resetNum].corner.btnPxPcSelect = true;

            elemList[resetNum].corner.topLeft = 0;
            elemList[resetNum].corner.topRight = 0;
            elemList[resetNum].corner.bottomRight = 0;
            elemList[resetNum].corner.bottomLeft = 0;
            elemList[resetNum].corner.pixelOrPercent.topLeft = true;
            elemList[resetNum].corner.pixelOrPercent.topRight = true;
            elemList[resetNum].corner.pixelOrPercent.bottomRight = true;
            elemList[resetNum].corner.pixelOrPercent.bottomLeft = true;
            //border
            elemIFList[resetNum].border.borderSelectorCounter = 1;
            elemIFList[resetNum].border.interuptorTB = false;
            elemIFList[resetNum].border.interuptorRB = false;
            elemIFList[resetNum].border.interuptorLB = false;
            elemIFList[resetNum].border.interuptorBB = false;

            elemList[resetNum].border.top.size = 0;
            elemList[resetNum].border.top.style = "none";
            elemList[resetNum].border.top.color.hue = "#000000";
            elemList[resetNum].border.top.color.opacity = 100;
            elemList[resetNum].border.right.size = 0;
            elemList[resetNum].border.right.style = "none";
            elemList[resetNum].border.right.color.hue = "#000000";
            elemList[resetNum].border.right.color.opacity = 100;
            elemList[resetNum].border.bottom.size = 0;
            elemList[resetNum].border.bottom.style = "none";
            elemList[resetNum].border.bottom.color.hue = "#000000";
            elemList[resetNum].border.bottom.color.opacity = 100;
            elemList[resetNum].border.left.size = 0;
            elemList[resetNum].border.left.style = "none";
            elemList[resetNum].border.left.color.hue = "#000000";
            elemList[resetNum].border.left.color.opacity = 100;
            //box
            elemIFList[resetNum].box.boxNum = 1;
            elemIFList[resetNum].box.boxSelectNum = 1;
            elemIFList[resetNum].box.interuptorXY = false;
            elemIFList[resetNum].box.interuptorBS = false;

            elemList[resetNum].box = [];
            elemList[resetNum].box[0] = {
                inset : false,
                radius : { spread : 0, blur : 0 },
                offset : { x : 0, y : 0 },
                color : { hue : "#969696", opacity : 100 }
            }
            //size
            elemList[resetNum].size.width = 60;
            elemList[resetNum].size.height = 60;
            //text
            elemList[resetNum].text = [];
            //~~~~~~~~~~~~~~~~~~~~RESET VISUEL~~~~~~~~~~~~~~~~~~~~~//
            //name
            idNames[resetNum].value = elemList[resetNum].id.name;
            //color
            colors[resetNum].value = elemList[resetNum].color.hue;
            opaVisualChgt(elemList[resetNum].color.hue.opacity, (resetNum*4));
            //shader
            shaderSelectors[resetNum].innerHTML = '<option value="' + 1 + '">' + 1 + '</option>'
            shaderColors[resetNum].value = elemList[resetNum].shader[0].color.hue;
            opaVisualChgt(elemList[resetNum].shader[0].color.opacity, 1+(resetNum*4));
            btnSelectGradients[resetNum].removeAttribute("active");
            degreeButtons[resetNum].style.transform = "rotate(" + 0 + "deg)";
            degreeButtons[resetNum].setAttribute("active","");
            //corner
            topLefts[resetNum].removeAttribute("active"); 
            topRights[resetNum].removeAttribute("active"); 
            bottomRights[resetNum].removeAttribute("active"); 
            bottomLefts[resetNum].removeAttribute("active"); 
            btnPxPcs[resetNum].removeAttribute("pixel");
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
            borderColors[resetNum].value = elemList[resetNum].border.top.color.hue;
            opaVisualChgt(elemList[resetNum].border.top.color.opacity, 2+(resetNum*4));
            borderRanges[resetNum].value = 0;
            //box
            boxSelectors[resetNum].innerHTML = '<option value="' + 1 + '">' + 1 + '</option>'
            boxColors[resetNum].value = elemList[resetNum].box[0].color.hue;
            opaVisualChgt(elemList[resetNum].box[0].color.opacity, 3+(resetNum*4));
            boxInsetCheckBoxs[resetNum].checked = false;
            interuptorSelectsXYs[resetNum].removeAttribute("active");
            interuptorSpreadBlurs[resetNum].removeAttribute("active");
            boxRangeBSs[resetNum].setAttribute("min", "-100");
            boxRangeXYs[resetNum].value = 0;
            boxRangeBSs[resetNum].value = 0;

            //color
            color(resetNum);
            //shader
            shader(resetNum)
            //corner
            corner(resetNum);
            //border
            border(resetNum);
            //box
            box(resetNum);
            //size
            size(resetNum);
            //text  
            document.getElementById(elemList[resetNum].id.name).innerHTML = "";       
        })
    }
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ELEM-COPY~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
let copyButtons = document.getElementsByClassName("element-btn-more-under-module");

function createCopyButton(i){
    let copyNum = i;
    let copyNameNum = 2;
    copyButtons[copyNum].addEventListener("click", createNewSameElement)
    function createNewSameElement(){

        fetch('data/element-module.html')
        .then(response => response.text())
        .then(data => {
            let newElem = document.createElement("div");
            newElem.classList.add("html-element");
            elementModulesContainer.appendChild(newElem);
            newElem.innerHTML += data;
    
            let y = elements.length-1; 
            
            createModule(y, copyNum, copyNameNum);
            elemList[elemList.length-1].size.width = elemList[copyNum].size.width; 
            elemList[elemList.length-1].size.height = elemList[copyNum].size.height;            
            
            updatePos();
            createSize();
            createPlacement();
            for (o=0; o<=elemList.length-1; o++){
               allVisualChange(o); 
                //corner
                if(elemIFList[o].corner.btnPxPcSelect == false){
                    btnPxPcs[o].setAttribute("pixel", "");
                    btnPxPcs[o].removeAttribute("max");
                    radiusRanges[o].setAttribute("max", "175");
                } else {
                    btnPxPcs[o].removeAttribute("pixel");
                    btnPxPcs[o].removeAttribute("max");
                    radiusRanges[o].setAttribute("max", "100");
                }
                //shader
                shaderSelectors[o].innerHTML = "";
                for(p=1; p <= elemIFList[o].shader.shaderNum; p++){
                    let option = document.createElement("option");
                    option.innerHTML = p;
                    if(p == elemIFList[o].shader.shaderSelectNum) option.setAttribute("selected", "");
                    shaderSelectors[o].appendChild(option);
                }
                //to change the background diffusion (linear/radial) btn
                if((elemIFList[o].shader.interuptor == false)&&(btnSelectGradients[o].hasAttribute("active"))){
                    //linear
                    btnSelectGradients[o].removeAttribute("active");
                    degreeButtons[o].setAttribute("active", "");
                } 
                else if((elemIFList[o].shader.interuptor == true)&&(btnSelectGradients[o].hasAttribute("active")) == false){
                    //radial
                    btnSelectGradients[o].setAttribute("active", "");
                    degreeButtons[o].removeAttribute("active");
                }
                //visual change of linear background btn degree selection
                //premet le changement visuel du bouton
                degreeButtons[o].style.transform = "rotate(" + elemIFList[o].shader.degreeBtn.degree + "deg)";


                //corner
                let cornerIFArray = [
                    elemIFList[o].corner.CornerInteruptorBL,
                    elemIFList[o].corner.CornerInteruptorBR,
                    elemIFList[o].corner.CornerInteruptorTL,
                    elemIFList[o].corner.CornerInteruptorTR
                ];
                let cornerArray = [ bottomLefts[o], bottomRights[o], topLefts[o], topRights[o] ];
                let cornerCounter = 0;
                cornerIFArray.forEach(element => {
                    if(element == true){
                        cornerArray[cornerCounter].setAttribute("active", "");
                    } else {
                        cornerArray[cornerCounter].removeAttribute("active");
                    }
                    cornerCounter++;
                });

                //border
                let borderIFarray = [
                    elemIFList[o].border.interuptorRB,
                    elemIFList[o].border.interuptorTB,
                    elemIFList[o].border.interuptorBB,
                    elemIFList[o].border.interuptorLB
                ]
                let borderHTMLArray = [
                    rightBorderSelectors[o],
                    topBorderSelectors[o],
                    bottomBorderSelectors[o],
                    leftBorderSelectors[o]
                ]
                let counterBorder = 0;
                borderIFarray.forEach(element => {
                    if(element == true){
                        borderHTMLArray[counterBorder].setAttribute("active", "");
                    } else {
                        borderHTMLArray[counterBorder].removeAttribute("active");
                    }
                    counterBorder++;
                });
                //box
                boxSelectors[o].innerHTML = "";
                for(p=1; p <= elemIFList[o].box.boxNum; p++){
                    let option = document.createElement("option");
                    option.innerHTML = p;
                    if(p == elemIFList[o].box.boxSelectNum) option.setAttribute("selected", "");
                    boxSelectors[o].appendChild(option);
                }


                if((elemIFList[o].box.interuptorXY == false)&&(interuptorSelectsXYs[o].hasAttribute("active"))){
                    //y
                    interuptorSelectsXYs[o].removeAttribute("active");
                } 
                else if((elemIFList[o].box.interuptorXY == true)&&(interuptorSelectsXYs[o].hasAttribute("active")) == false){
                    //x
                    interuptorSelectsXYs[o].setAttribute("active", "");
                }

                if((elemIFList[o].box.interuptorBS == false)&&(interuptorSpreadBlurs[o].hasAttribute("active"))){
                    //y
                    interuptorSpreadBlurs[o].removeAttribute("active");
                } 
                else if((elemIFList[o].box.interuptorBS == true)&&(interuptorSpreadBlurs[o].hasAttribute("active")) == false){
                    //x
                    interuptorSpreadBlurs[o].setAttribute("active", "");
                }
            }
            updateGraphicPos();
            calcElemCelPlace();
    
            removeAllEllAttr();
            angleInteruptor = false;
            moduleCounter++;
            selectAllEllAttr();

            copyNameNum++; 
        })
    }
}

function createElem(i, newSameElem = null){
    let elemNum = i;
    if(elemList[elemNum] == undefined){
        elemList[elemNum] = 
        {
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
        elemIFList[elemNum] = {};
    }
}

function createModule(i, newSameElem = null, newSameElemName = null){    
    createElem(i, newSameElem);
    createName(i, newSameElem, newSameElemName);
    createColor(i, newSameElem);
    createBorder(i, newSameElem);
    createCorner(i, newSameElem);
    createShader(i, newSameElem);
    createBox(i, newSameElem);
    createText(i, newSameElem);
    createCopyButton(i);
    createListPlace(i);

    createResetBtn(i);
    createTrashBtn(i);
}
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ELEMENT-MODULE-ADDING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
//Event of the more-btn of the element-window
moreElementBtn.addEventListener("click", addingANewElement)
function addingANewElement(){
    fetch('data/element-module.html')
    .then(response => response.text())
    .then(data => {
        let newElem = document.createElement("div");
        newElem.classList.add("html-element");
        elementModulesContainer.appendChild(newElem);
        newElem.innerHTML += data;

        let y = elements.length-1; 
        
        createModule(y);
        updatePos();
        createSize();
        createPlacement();
        for (i=0; i<=elemList.length-1; i++){
           allVisualChange(i); 
        }
        updateGraphicPos();
        calcElemCelPlace();

    })
}

