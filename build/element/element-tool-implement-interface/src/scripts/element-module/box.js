//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~BOx~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
let boxSelectors = document.getElementsByClassName("box-list");
let boxMoreBtns = document.getElementsByClassName("element-more-box");
let boxTrashBtns = document.getElementsByClassName("element-trash-box");
let boxInsetCheckBoxs = document.getElementsByClassName("box-inset-checkbox");
let boxRangeXYs = document.getElementsByClassName("box-range-x-y");
let boxRangeBSs = document.getElementsByClassName("box-range-blur-spread");
let boxColors = document.getElementsByClassName("box-color");

//tableaux des représentation JS des elements HTML lié au bouton de selection de l'axe XY
//tableau des boutons eux même
let selectXYs = document.getElementsByClassName("select-x-y-btn");
//tableau des interupteurs a l'interieur du bouton 
let interuptorSelectsXYs = document.getElementsByClassName("x-y-interuptor");

//tableaux des représentation JS des elements HTML lié au bouton de selection du spread/blur
//tableau des boutons eux même
let selectBlurSpreads = document.getElementsByClassName("select-blur-spread-btn");
//tableau des interupteurs a l'interieur du bouton
let interuptorSpreadBlurs = document.getElementsByClassName("spread-blur-interuptor");

let boxModList = [];
let boxIFList = [];

function createBox(){
    for(i=0; i<= elements.length-1; i++){
        //représente le nombre de module de box
        let boxModNum = i;
        //permet de selectionner le range d'opacité lié au module de box
        let opaNum = 3+(boxModNum*4);
        boxIFList[boxModNum] = {
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
        boxModList[boxModNum] = [];
        //création de l'objet box de base
        boxModList[boxModNum][boxIFList[boxModNum].boxNum-1] = {
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
    
        //fonction de changement visuel des element de selection de la box en fonction de la box du module selectionné dans la liste
        function visualChangeBeforeListSelection(val, opacity){
            visualChgtBox(
                boxModList[boxModNum][val], boxIFList[boxModNum], 
                boxInsetCheckBoxs[boxModNum], boxRangeXYs[boxModNum], boxRangeBSs[boxModNum], 
                boxColors[boxModNum], 
                boxModList[boxModNum][val], opacity
                )
        }
    
        //event de selection du box dans la liste des box dans chaque module
        boxSelectors[boxModNum].addEventListener("click", changeListBoxsNumber);
        function changeListBoxsNumber(){
            //active la fonction si l'option selectionné est différente de celle qui l'est déjà
            if (boxIFList[boxModNum].boxSelectNum != boxSelectors[boxModNum].options[boxSelectors[boxModNum].selectedIndex].value){
                //supression et attribution a un nouvel element HTML option de l'attribut "select" de la liste de selection HTML
                boxSelectors[boxModNum].children[boxIFList[boxModNum].boxSelectNum-1].removeAttribute("selected");
                boxIFList[boxModNum].boxSelectNum = boxSelectors[boxModNum].options[boxSelectors[boxModNum].selectedIndex].value;
                boxSelectors[boxModNum].children[boxIFList[boxModNum].boxSelectNum-1].setAttribute("selected", "");      
                
                //fonction de changement visuel du module box (permet de correspondre au box selectionné)
                let val= boxIFList[boxModNum].boxSelectNum-1, opacity = opaNum;
                visualChangeBeforeListSelection(val, opacity);
                
            }
    
        }
        
        //ajout d'une box dans la liste des box d'un module
        boxMoreBtns[boxModNum].addEventListener("click", function(e){
            //ajout d'une box dans le "compteur de box" pour ensuite construire l'element html qui le representera
            boxIFList[boxModNum].boxNum ++;
            boxSelectors[boxModNum].innerHTML += '<option value="' + boxIFList[boxModNum].boxNum + '">' + boxIFList[boxModNum].boxNum + '</option>';
            //suppression et ajout de l'attribut selected de l'option HTML de selection de la box
            boxSelectors[boxModNum].children[boxIFList[boxModNum].boxSelectNum-1].removeAttribute("selected");
            boxSelectors[boxModNum].children[boxIFList[boxModNum].boxNum-1].setAttribute("selected", "");
            //creation de l'objet représentant la nouvelle box
            boxIFList[boxModNum].boxSelectNum = boxIFList[boxModNum].boxNum;
            boxModList[boxModNum][boxIFList[boxModNum].boxNum-1] = {
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
            interuptorSpreadBlurs[boxModNum].classList.add("no-transition");
            interuptorSelectsXYs[boxModNum].classList.add("no-transition");
            //remet les interupter XY/BS dans leurs position initial lorsque ajout d'une box
            interuptorSpreadBlurs[boxModNum].removeAttribute("active");
            boxRangeBSs[boxModNum].setAttribute("min","-100");
            boxRangeBSs[boxModNum].setAttribute("max","100");
            boxRangeBSs[boxModNum].value = boxModList[boxModNum][boxIFList[boxModNum].boxSelectNum-1].radius.spread; 
            boxIFList[boxModNum].interuptorBS = false;
            interuptorSelectsXYs[boxModNum].removeAttribute("active");
            boxRangeXYs[boxModNum].value = boxModList[boxModNum][boxIFList[boxModNum].boxSelectNum-1].offset.y;
            boxIFList[boxModNum].interuptorXY = false;
    
    
            //fonction de changement visuel du module box (permet de correspondre au box selectionné)
            let val= boxIFList[boxModNum].boxNum-1, opacity = opaNum;
            visualChangeBeforeListSelection(val, opacity);
        })
    
        //suppression d'un box dans la liste des box d'un module
        boxTrashBtns[boxModNum].addEventListener("click", function(e){
            if(boxIFList[boxModNum].boxNum > 1){
                boxSelectors[boxModNum].removeChild(boxSelectors[boxModNum][boxIFList[boxModNum].boxSelectNum-1]);
                boxModList[boxModNum].splice(boxIFList[boxModNum].boxSelectNum-1, 1)
    
                //boucle pour remplacer les elements HTML qui représente les boxs précédent celui supprimé, pour leurs assigné leur nouveau numéro
                for(i=boxIFList[boxModNum].boxSelectNum-1; i<=boxSelectors[boxModNum].length-1; i++){
                    boxSelectors[boxModNum][i].innerHTML = i+1;
                    boxSelectors[boxModNum][i].setAttribute("value", i+1);
                }
                //selection du box inférieur a celui supprimé apres sa suppression 
                if(boxIFList[boxModNum].boxSelectNum-2 >= 0){
                    boxIFList[boxModNum].boxNum --;
                    boxSelectors[boxModNum][boxIFList[boxModNum].boxSelectNum-2].setAttribute("selected", "");
                    boxIFList[boxModNum].boxSelectNum = boxIFList[boxModNum].boxSelectNum-1; 
                }
                //quand le box supprimé est le premier de la liste, quelques regle différente pour que cela fonctionne
                else if(boxIFList[boxModNum].boxSelectNum-2 < 0){
                    boxIFList[boxModNum].boxNum --;
                    boxSelectors[boxModNum][boxIFList[boxModNum].boxSelectNum-1].setAttribute("selected", "");
                }
                //force la selection de l'option correspondant au boxSelectNum
                boxSelectors[boxModNum].selectedIndex = boxIFList[boxModNum].boxSelectNum-1;
                //partie de la fonction qui change la partie visuel 
                let val= boxIFList[boxModNum].boxSelectNum-1, opacity = opaNum;
                visualChangeBeforeListSelection(val, opacity);
            }
        })
    
        //E checkbox, defini si box est inset ou non 
        boxInsetCheckBoxs[boxModNum].addEventListener('input', function(){
            if(boxModList[boxModNum][boxIFList[boxModNum].boxSelectNum-1].inset == false){
                boxModList[boxModNum][boxIFList[boxModNum].boxSelectNum-1].inset = true;
    
            }
            else{
                boxModList[boxModNum][boxIFList[boxModNum].boxSelectNum-1].inset = false;
            }
        })
        //Evenement qui gere le changement détat du bouton XY, permettant selection de l'axe
        selectXYs[boxModNum].addEventListener('click', function(){
        //mise en place des effet de transition de l'interupteur
        interuptorSelectsXYs[boxModNum].classList.remove("no-transition");
        //etat bouton definissant l'axe Y en JS et qui active le css pour changer le visuel du bouton en fonction
            if(boxIFList[boxModNum].interuptorXY == false){
                interuptorSelectsXYs[boxModNum].setAttribute("active","");
                setTimeout(function(){
                    boxRangeXYs[boxModNum].value = boxModList[boxModNum][boxIFList[boxModNum].boxSelectNum-1].offset.x;
                    boxIFList[boxModNum].interuptorXY = true;  
                },200)
            }
            //idem que dernier commentaire pour l'axe X 
            else{
                interuptorSelectsXYs[boxModNum].removeAttribute("active");
                setTimeout(function(){
                    boxRangeXYs[boxModNum].value = boxModList[boxModNum][boxIFList[boxModNum].boxSelectNum-1].offset.y;
                    boxIFList[boxModNum].interuptorXY = false;  
                },200)
            }
        })
        //E définissant le offset de box via un range, Y||X en fonction d'interuptorXY
        boxRangeXYs[boxModNum].addEventListener("input", function(){
            if(boxIFList[boxModNum].interuptorXY == false){
                boxModList[boxModNum][boxIFList[boxModNum].boxSelectNum-1].offset.y = boxRangeXYs[boxModNum].value;
            }
            else{
                boxModList[boxModNum][boxIFList[boxModNum].boxSelectNum-1].offset.x = boxRangeXYs[boxModNum].value;            
            }
        })
        //Evenement qui gere le changement détat du bouton BS, permettant selection soi du spread ou du blur
        selectBlurSpreads[boxModNum].addEventListener('click', function(){
            //mise en place des effet de transition de l'interupteur
            interuptorSpreadBlurs[boxModNum].classList.remove("no-transition");
            //etat bouton definissant selection spread en JS et qui active le css pour changer le visuel du bouton en fonction
            if(boxIFList[boxModNum].interuptorBS == false){
                interuptorSpreadBlurs[boxModNum].setAttribute("active","");
                setTimeout(function(){
                    boxRangeBSs[boxModNum].setAttribute("min","0");
                    boxRangeBSs[boxModNum].setAttribute("max","100");
                    boxRangeBSs[boxModNum].value = boxModList[boxModNum][boxIFList[boxModNum].boxSelectNum-1].radius.blur;
                    boxIFList[boxModNum].interuptorBS = true;
                },200)
            }
            //idem pour le blur
            else{
                interuptorSpreadBlurs[boxModNum].removeAttribute("active");
                setTimeout(function(){
                    boxRangeBSs[boxModNum].setAttribute("min","-100");
                    boxRangeBSs[boxModNum].setAttribute("max","100");
                    boxRangeBSs[boxModNum].value = boxModList[boxModNum][boxIFList[boxModNum].boxSelectNum-1].radius.spread; 
                    boxIFList[boxModNum].interuptorBS = false;
                },200)
            }
        })
        //E definissant le Blur de box via un range, Blur||Spread en fonction d'interuptorBS
        boxRangeBSs[boxModNum].addEventListener("input", function(){
            if(boxIFList[boxModNum].interuptorBS == false){
                boxModList[boxModNum][boxIFList[boxModNum].boxSelectNum-1].radius.spread = boxRangeBSs[boxModNum].value;
            }
            else{
                boxModList[boxModNum][boxIFList[boxModNum].boxSelectNum-1].radius.blur = boxRangeBSs[boxModNum].value;            
            }
        })
        //E definissant la couleur de box 
        boxColors[boxModNum].addEventListener("input", function(){
            boxModList[boxModNum][boxIFList[boxModNum].boxSelectNum-1].color.hue = boxColors[boxModNum].value;
        })
        opacityButtonList[opaNum].opacityRange.addEventListener("input", function(){
            boxModList[boxModNum][boxIFList[boxModNum].boxSelectNum-1].color.opacity = opacityButtonList[opaNum].opacityRange.value;
        })
    }
}

