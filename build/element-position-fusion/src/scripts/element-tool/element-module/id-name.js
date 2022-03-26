//représente chaque le conteneur de toutes les barres d'elements
let elementModulesContainer = document.getElementById("all-elements");
//représente chaque itération d'une barre d'element dans un tableau
let elements = document.getElementsByClassName("html-element");

//tab représentant chaque itération de l'iput text-id
let idNames = document.getElementsByClassName("text-id");

let nameModList = [];

function createName(){
    for(i=0; i<= elements.length-1; i++){
        let nameNum = i;
        let idNum = 0;

        //condition et boucle qui permettent d'assigné un nom prédéfini qui n'existe pas déjà
        //par exemple si "element-3" existe déjà mais est le seul elem présent
        //cela permettra lors de la création de l'elem suivant  de s'appeler "element-1"  
        if(nameModList.length > 0){
            for(j=0; j<= elements.length-2; j++){
                if(nameModList[j].name == ("element-" + (idNum+1))){
                    idNum++;
                    j= -1;
                    console.log("test2");
                }
            }
            nameModList[j] = {
                name : "element-" + (idNum+1)
            }
            console.log(nameModList);
        }
        else{
            console.log('test');
            nameModList[nameNum] = {
                name : "element-" + (nameNum+1)
            }
        }
    
        idNames[nameNum].value = nameModList[nameNum].name;

        idNames[nameNum].addEventListener("input", function(){
            nameModList[nameNum].name = idNames[nameNum].value;
        })
    }
}

//ici les fonction de mise a jour visuel de : l'opacité, la couleur, les ranges.
//opacité
//opacity = opacitybtn number
//val = en fonction du module, ou se trouve la valeur de l'opacité (dans un objet)
function opaVisualChgt(val, opacity){
    let opacityRepre = Math.abs(Math.trunc((val/100)*255)-255);
    opacityButtonList[opacity].opacityInsideButton.style.backgroundColor = "rgb(" + opacityRepre + ", " + opacityRepre + ", " + opacityRepre + ")";
    opacityButtonList[opacity].opacityRange.value = val;
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
function visualChgtCorner(interuptorTL, interuptorTR, InteruptorBR, interuptorBL, topLeft, topRight, bottomRight, bottomLeft, rangeInput){
    //tableau qui contiendra a chaque itération de la fonction les valeurs des coins séléctionné pour la mise à jour visuel
    let selectedCorner = [];
    //les 4 conditions suivante permettent d'ajouté ou non les valeurs des différentes coins. 
    //(topLeft/topRight/bottomRight/bottomLeft, dans l'ordre)
    let cornerSelectedValueTest;
    if(interuptorTL == true){
        selectedCorner.push(topLeft);
    }
    if(interuptorTR == true){
        selectedCorner.push(topRight);
    }
    if(InteruptorBR == true){
        selectedCorner.push(bottomRight);
    }
    if(interuptorBL == true){
        selectedCorner.push(bottomLeft);
    }
    //boucle et condition permettant la mise a jour de l'input range d'attribution de valeur de courbure
    for(m=0; m<=selectedCorner.length-1; m++){
        //selection de la valeur de range commune aux coins séléctionné
        cornerSelectedValueTest = selectedCorner[0];
        if(selectedCorner[m] == selectedCorner[0]){
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
            opacityButtonList[opacity].opacityRange.value = 100;
            opacityButtonList[opacity].opacityInsideButton.style.backgroundColor = "black";
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
    opacityButtonList[opacity].opacityInsideButton.style.backgroundColor = "rgb(" + opacityRepre + ", " + opacityRepre + ", " + opacityRepre + ")";
    opacityButtonList[opacity].opacityRange.value = opaVal.color.opacity;
}

//tout les changement visuel en même temps
//num représente le module/element-bar selectionné
function allVisualChange(number){
    let num = number;
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
