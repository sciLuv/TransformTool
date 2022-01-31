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

let boxModuleList = []

for(i=0; i<= elements.length-1; i++){
    //représente le nombre de module de box
    let boxModuleNumber = i;
    //représente le nombre de boxs différent dans un même module
    let boxNumber = 1;
    //représente la box selectionné (le boxNumber selectionné)
    let boxSelectNumber = 1;
    //permet de selectionner le range d'opacité lié au module de box
    let opacityNumber = 3+(boxModuleNumber*4);
    //crée un tableau qui va contenir les objets représentant les différents boxs d'un même module
    boxModuleList[boxModuleNumber] = [];
    //création de l'objet box de base
    boxModuleList[boxModuleNumber][boxNumber-1] = {
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
        //chgt visuel de l'input checkbox inset
        if(boxModuleList[boxModuleNumber][val].inset == false){
            boxInsetCheckBoxs[boxModuleNumber].checked = false;
        }
        else{
            boxInsetCheckBoxs[boxModuleNumber].checked = true;
        }
        //chgt visuel des ranges XY et BS, en fonction de l'état des interupteurs associé
        if(interuptorXY == false){
            boxRangeXYs[boxModuleNumber].value = boxModuleList[boxModuleNumber][val].offset.y;
        }
        else{
            boxRangeXYs[boxModuleNumber].value = boxModuleList[boxModuleNumber][val].offset.x;
        }
        if(interuptorBS == false){
            boxRangeBSs[boxModuleNumber].value = boxModuleList[boxModuleNumber][val].radius.spread;
        }
        else{
            boxRangeBSs[boxModuleNumber].value = boxModuleList[boxModuleNumber][val].radius.blur;
        }
        //chgt visuel du btn de couleur
        boxColors[boxModuleNumber].value = boxModuleList[boxModuleNumber][val].color.hue;
        //chgt visuel du range d'opacité et du range de selection d'opacité
        let opacityRepre = Math.abs(Math.trunc((boxModuleList[boxModuleNumber][val].color.opacity/100)*255)-255);
        opacityButtonList[opacity].opacityInsideButton.style.backgroundColor = "rgb(" + opacityRepre + ", " + opacityRepre + ", " + opacityRepre + ")";
        opacityButtonList[opacity].opacityRange.value = boxModuleList[boxModuleNumber][val].color.opacity;
    }

    //event de selection du box dans la liste des box dans chaque module
    boxSelectors[boxModuleNumber].addEventListener("click", changeListBoxsNumber);
    function changeListBoxsNumber(){
        //active la fonction si l'option selectionné est différente de celle qui l'est déjà
        if (boxSelectNumber != boxSelectors[boxModuleNumber].options[boxSelectors[boxModuleNumber].selectedIndex].value){
            //supression et attribution a un nouvel element HTML option de l'attribut "select" de la liste de selection HTML
            boxSelectors[boxModuleNumber].children[boxSelectNumber-1].removeAttribute("selected");
            boxSelectNumber = boxSelectors[boxModuleNumber].options[boxSelectors[boxModuleNumber].selectedIndex].value;
            boxSelectors[boxModuleNumber].children[boxSelectNumber-1].setAttribute("selected", "");      
            
            //fonction de changement visuel du module box (permet de correspondre au box selectionné)
            let val= boxSelectNumber-1, opacity = opacityNumber;
            visualChangeBeforeListSelection(val, opacity);
            
        }

    }
    
    //ajout d'une box dans la liste des box d'un module
    boxMoreBtns[boxModuleNumber].addEventListener("click", function(e){
        //ajout d'une box dans le "compteur de box" pour ensuite construire l'element html qui le representera
        boxNumber ++;
        boxSelectors[boxModuleNumber].innerHTML += '<option value="' + boxNumber + '">' + boxNumber + '</option>';
        //suppression et ajout de l'attribut selected de l'option HTML de selection de la box
        boxSelectors[boxModuleNumber].children[boxSelectNumber-1].removeAttribute("selected");
        boxSelectors[boxModuleNumber].children[boxNumber-1].setAttribute("selected", "");
        //creation de l'objet représentant la nouvelle box
        boxSelectNumber = boxNumber;
        boxModuleList[boxModuleNumber][boxNumber-1] = {
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
        interuptorSpreadBlurs[boxModuleNumber].classList.add("no-transition");
        interuptorSelectsXYs[boxModuleNumber].classList.add("no-transition");
        //remet les interupter XY/BS dans leurs position initial lorsque ajout d'une box
        interuptorSpreadBlurs[boxModuleNumber].removeAttribute("active");
        boxRangeBSs[boxModuleNumber].setAttribute("min","-100");
        boxRangeBSs[boxModuleNumber].setAttribute("max","100");
        boxRangeBSs[boxModuleNumber].value = boxModuleList[boxModuleNumber][boxSelectNumber-1].radius.spread; 
        interuptorBS = false;
        interuptorSelectsXYs[boxModuleNumber].removeAttribute("active");
        boxRangeXYs[boxModuleNumber].value = boxModuleList[boxModuleNumber][boxSelectNumber-1].offset.y;
        interuptorXY = false;


        //fonction de changement visuel du module box (permet de correspondre au box selectionné)
        let val= boxNumber-1, opacity = opacityNumber;
        visualChangeBeforeListSelection(val, opacity);
    })

    //suppression d'un box dans la liste des box d'un module
    boxTrashBtns[boxModuleNumber].addEventListener("click", function(e){
        if(boxNumber > 1){
            boxSelectors[boxModuleNumber].removeChild(boxSelectors[boxModuleNumber][boxSelectNumber-1]);
            boxModuleList[boxModuleNumber].splice(boxSelectNumber-1, 1)

            //boucle pour remplacer les elements HTML qui représente les boxs précédent celui supprimé, pour leurs assigné leur nouveau numéro
            for(i=boxSelectNumber-1; i<=boxSelectors[boxModuleNumber].length-1; i++){
                boxSelectors[boxModuleNumber][i].innerHTML = i+1;
                boxSelectors[boxModuleNumber][i].setAttribute("value", i+1);
            }
            //selection du box inférieur a celui supprimé apres sa suppression 
            if(boxSelectNumber-2 >= 0){
                boxNumber --;
                boxSelectors[boxModuleNumber][boxSelectNumber-2].setAttribute("selected", "");
                boxSelectNumber = boxSelectNumber-1; 
            }
            //quand le box supprimé est le premier de la liste, quelques regle différente pour que cela fonctionne
            else if(boxSelectNumber-2 < 0){
                boxNumber --;
                boxSelectors[boxModuleNumber][boxSelectNumber-1].setAttribute("selected", "");
            }
            //force la selection de l'option correspondant au boxSelectNumber
            boxSelectors[boxModuleNumber].selectedIndex = boxSelectNumber-1;
            //partie de la fonction qui change la partie visuel 
            let val= boxSelectNumber-1, opacity = opacityNumber;
            visualChangeBeforeListSelection(val, opacity);
        }
    })

    //E checkbox, defini si box est inset ou non 
    boxInsetCheckBoxs[boxModuleNumber].addEventListener('input', function(){
        if(boxModuleList[boxModuleNumber][boxSelectNumber-1].inset == false){
            boxModuleList[boxModuleNumber][boxSelectNumber-1].inset = true;

        }
        else{
            boxModuleList[boxModuleNumber][boxSelectNumber-1].inset = false;
        }
    })
    //défini l'état du bouton XY
    let interuptorXY = false;
    //Evenement qui gere le changement détat du bouton XY, permettant selection de l'axe
    selectXYs[boxModuleNumber].addEventListener('click', function(){
    //mise en place des effet de transition de l'interupteur
    interuptorSelectsXYs[boxModuleNumber].classList.remove("no-transition");
    //etat bouton definissant l'axe Y en JS et qui active le css pour changer le visuel du bouton en fonction
        if(interuptorXY == false){
            interuptorSelectsXYs[boxModuleNumber].setAttribute("active","");
            setTimeout(function(){
                boxRangeXYs[boxModuleNumber].value = boxModuleList[boxModuleNumber][boxSelectNumber-1].offset.x;
                interuptorXY = true;  
            },200)
        }
        //idem que dernier commentaire pour l'axe X 
        else{
            interuptorSelectsXYs[boxModuleNumber].removeAttribute("active");
            setTimeout(function(){
                boxRangeXYs[boxModuleNumber].value = boxModuleList[boxModuleNumber][boxSelectNumber-1].offset.y;
                interuptorXY = false;  
            },200)
        }
    })
    //E définissant le offset de box via un range, Y||X en fonction d'interuptorXY
    boxRangeXYs[boxModuleNumber].addEventListener("input", function(){
        if(interuptorXY == false){
            boxModuleList[boxModuleNumber][boxSelectNumber-1].offset.y = boxRangeXYs[boxModuleNumber].value;
        }
        else{
            boxModuleList[boxModuleNumber][boxSelectNumber-1].offset.x = boxRangeXYs[boxModuleNumber].value;            
        }
    })
    //défini l'état du bouton BS
    let interuptorBS = false;
    //Evenement qui gere le changement détat du bouton BS, permettant selection soi du spread ou du blur
    selectBlurSpreads[boxModuleNumber].addEventListener('click', function(){
        //mise en place des effet de transition de l'interupteur
        interuptorSpreadBlurs[boxModuleNumber].classList.remove("no-transition");
        //etat bouton definissant selection spread en JS et qui active le css pour changer le visuel du bouton en fonction
        if(interuptorBS == false){
            interuptorSpreadBlurs[boxModuleNumber].setAttribute("active","");
            setTimeout(function(){
                boxRangeBSs[boxModuleNumber].setAttribute("min","0");
                boxRangeBSs[boxModuleNumber].setAttribute("max","100");
                boxRangeBSs[boxModuleNumber].value = boxModuleList[boxModuleNumber][boxSelectNumber-1].radius.blur;
                interuptorBS = true;
            },200)
        }
        //idem pour le blur
        else{
            interuptorSpreadBlurs[boxModuleNumber].removeAttribute("active");
            setTimeout(function(){
                boxRangeBSs[boxModuleNumber].setAttribute("min","-100");
                boxRangeBSs[boxModuleNumber].setAttribute("max","100");
                boxRangeBSs[boxModuleNumber].value = boxModuleList[boxModuleNumber][boxSelectNumber-1].radius.spread; 
                interuptorBS = false;
            },200)
        }
    })
    //E definissant le Blur de box via un range, Blur||Spread en fonction d'interuptorBS
    boxRangeBSs[boxModuleNumber].addEventListener("input", function(){
        if(interuptorBS == false){
            boxModuleList[boxModuleNumber][boxSelectNumber-1].radius.spread = boxRangeBSs[boxModuleNumber].value;
        }
        else{
            boxModuleList[boxModuleNumber][boxSelectNumber-1].radius.blur = boxRangeBSs[boxModuleNumber].value;            
        }
    })
    //E definissant la couleur de box 
    boxColors[boxModuleNumber].addEventListener("input", function(){
        boxModuleList[boxModuleNumber][boxSelectNumber-1].color.hue = boxColors[boxModuleNumber].value;
    })
    opacityButtonList[opacityNumber].opacityRange.addEventListener("input", function(){
        boxModuleList[boxModuleNumber][boxSelectNumber-1].color.opacity = opacityButtonList[opacityNumber].opacityRange.value;
    })
}

