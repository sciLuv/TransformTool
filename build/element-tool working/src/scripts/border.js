//BORDER/////////////////////////////////////////////////////////////
//Représentation de l'outil HTML de selection des bordures
let borderSelectors = document.getElementsByClassName("border-select");
//Représentation des différentes parties HTML de l'outil de selection des bordures
let topBorderSelectors = document.getElementsByClassName("border-top");
let leftBorderSelectors = document.getElementsByClassName("border-left");
let rightBorderSelectors = document.getElementsByClassName("border-right");
let bottomBorderSelectors = document.getElementsByClassName("border-bottom");
//représentation du bouton de selection des bordures de chaque modules
let borderSelects = document.getElementsByClassName("all-borders");
//représentation (dans l'ordre) des inputs range de selection de la taille des bordures, de leurs couleurs et de leurs styles. 
let borderRanges = document.getElementsByClassName("border-range");
let borderColors = document.getElementsByClassName("border-color");
let borderStyles = document.getElementsByClassName("border-style");

//liste qui contient l'ensemble des objets représentant les bordures de chaque éléments crée
let borderModuleList = [];

//boucle qui contient l'ensemble des regles de l'outil de selection de bordure
for(i=0; i<= borderSelectors.length-1; i++){
    //represente le nombre de modules de border (1 pour chaque module d'element)
    let borderModuleNumber = i;
    //permet pour chaque module de border de selectionné le range d'opacité correspondant
    let opacityNumber = 2+(borderModuleNumber*4);

    //compteur permettant de selectionné grace au bouton centrale de selection des bordure 
    //une succession de selection des différentes bordures et de leurs représentation graphique. 
    let borderSelectorSelectionCounter = 1;

    //4 variables représentant l'état d'activation des boutons de bordure du selecteur de bordure 
    let borderTopInteruptor = false;
    let borderRightInteruptor = false;
    let borderBottomInteruptor = false;
    let borderLeftInteruptor = false;

    //représente l'option selectionné du select de style de bordure
    let selectedStyle = borderStyles[borderModuleNumber].options[borderStyles[borderModuleNumber].selectedIndex];

    //objet qui contient l'ensemble des info de style de chacune des bordures.
    borderModuleList[borderModuleNumber] = {
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

    //visualChangeBeforeBorderModification :
    //fonction permettant la mise à jour visuel des différents élément d'intéraction/sélection de style des bordures, en fonctions des bordures séléctionné
    //si aucune bordure selectionné les valeurs par défault sont :  opacité:100, couleur:noir, rangetaille:0, style:none
    function visualChangeBeforeBorderModification(){
        //tableau qui contiendra a chaque itération de la fonction les objets des bordures sélectionné pour la mise a jour visuel  
        let modifiedBorder = [];
        //les 4 conditions suivante permettent d'ajouté ou non les objets des différentes bordures. (top/right/bottom/left, dans l'ordre)
        if(borderTopInteruptor == true){
            modifiedBorder.push(borderModuleList[borderModuleNumber].top);
        }
        if(borderRightInteruptor == true){
            modifiedBorder.push(borderModuleList[borderModuleNumber].right);
        }
        if(borderBottomInteruptor == true){
            modifiedBorder.push(borderModuleList[borderModuleNumber].bottom);
        }
        if(borderLeftInteruptor == true){
            modifiedBorder.push(borderModuleList[borderModuleNumber].left);
        }
        //boucle permettant mise a jour de l'input d'attribution de couleur
        for(i=0; i<=modifiedBorder.length-1; i++){
            //selection de la couleur commune
            if(modifiedBorder[i].color.hue == modifiedBorder[0].color.hue){
                borderColors[borderModuleNumber].value = modifiedBorder[0].color.hue;
            }
            //couleur représenté par défault si pas de correspondance entre les elements sélectionné
            else{
                borderColors[borderModuleNumber].value = "#000000";
            }
        }
        //boucle permettant la mise a jours du range de la taille des bordures
        for(i=0; i<=modifiedBorder.length-1; i++){
            //selection de la taille de bordure commune
            if(modifiedBorder[i].size == modifiedBorder[0].size){
                borderRanges[borderModuleNumber].value = modifiedBorder[0].size;
            }
            //taille représenté par défault si pas de correspondance entre les bordures sélectionné
            else{
                borderRanges[borderModuleNumber].value = 0;
            }
        }
        //boucle permettant la mise a jour de l'input d'opacité (la couleur du bouton, et le placement du range)
        for(i=0; i<=modifiedBorder.length-1; i++){
            //selection de l'opacité de bordure commune
            if(modifiedBorder[i].color.opacity == modifiedBorder[0].color.opacity){
                opacityButtonList[opacityNumber].opacityRange.value = modifiedBorder[0].color.opacity;
                let opacityRepre = Math.abs(Math.trunc((modifiedBorder[0].color.opacity/100)*255)-255);
                opacityButtonList[opacityNumber].opacityInsideButton.style.backgroundColor = "rgb(" + opacityRepre + ", " + opacityRepre + ", " + opacityRepre + ")";
            }
            //opacité par défault si pas de correspondance entre les bordures selectionné
            else{
                opacityButtonList[opacityNumber].opacityRange.value = 100;
                opacityButtonList[opacityNumber].opacityInsideButton.style.backgroundColor = "black";
            }
        }
        //boucle permettant la mise a jour de la liste de style des bordures
        for(i=0; i<=modifiedBorder.length-1; i++){
            //selection du style de bordure commun 
            if(modifiedBorder[i].style == modifiedBorder[0].style){
                selectedStyle.removeAttribute("selected");
                //boucle+condition permettant, pour chaque style de la liste de la selectionné si elle est correspondante a la 1ere bordure de la liste 
                for(j=0; j<=9; j++){
                   if(borderStyles[borderModuleNumber].options[j].value == modifiedBorder[0].style){
                    selectedStyle = borderStyles[borderModuleNumber].options[j];
                    selectedStyle.setAttribute("selected", "");  
                    borderStyles[borderModuleNumber].value = selectedStyle.value;
                   } 
                }
                selectedStyle.setAttribute("selected", "");
            }
            //style de bordure par défaut
            else{
                selectedStyle.removeAttribute("selected");
                selectedStyle = borderStyles[borderModuleNumber].options[0];
                selectedStyle.setAttribute("selected", "");
                borderStyles[borderModuleNumber].value = selectedStyle.value;
                break;
            }
        }
    }

    //suite de fonction qui s'activerons dans les différents EVENT qui leurs succede
    //elles permettent +/- l'attribut HTML correspondant a un selecteur de bordure activé ou non 
    //ce sont des fonction permettant un feed-back visuel a l'utilisateur, et non pas de modifié directement les valeurs des bordures
    //neutral = visuel des bords non sélectionné, activate = visuel des bords sélectionné
    function topBorderActivate(){
        topBorderSelectors[borderModuleNumber].setAttribute("active","");
    };
    function bottomBorderActivate(){
        bottomBorderSelectors[borderModuleNumber].setAttribute("active","");
    };
    function leftBorderActivate(){
        leftBorderSelectors[borderModuleNumber].setAttribute("active","");
    };
    function rightBorderActivate(){
        rightBorderSelectors[borderModuleNumber].setAttribute("active","");
    }
    function topBorderNeutral(){
        topBorderSelectors[borderModuleNumber].removeAttribute("active");
    };
    function bottomBorderNeutral(){
        bottomBorderSelectors[borderModuleNumber].removeAttribute("active");
    };
    function leftBorderNeutral(){
        leftBorderSelectors[borderModuleNumber].removeAttribute("active");
    };
    function rightBorderNeutral(){
        rightBorderSelectors[borderModuleNumber].removeAttribute("active");
    }

    //Evenement lié au bouton de selection des bordures (bouton-central du selecteur de bordure)
    //a chaque nouveau clique une nouvelle selection de bordures modifiable est faite, 
    //il y a 9 selections différentes qui se succede.
    //l'evenement utilise : 
    //les fonction neutral/active pour chgmt grahique et 
    //les variables interuptors (o/i) pour validé ou non la possibilité de modification des bord  
    borderSelects[borderModuleNumber].addEventListener("click", function(e){
        //selection de tout les bords
        if(borderSelectorSelectionCounter == 1){
            borderSelectorSelectionCounter++
            topBorderActivate();
            rightBorderActivate();
            bottomBorderActivate();
            leftBorderActivate();
            borderTopInteruptor = true;
            borderRightInteruptor = true; 
            borderBottomInteruptor = true;
            borderLeftInteruptor = true;
            visualChangeBeforeBorderModification()
        }
        //selection de la bordure haute
        else if(borderSelectorSelectionCounter == 2){
            borderSelectorSelectionCounter++
            topBorderActivate();
            rightBorderNeutral();
            bottomBorderNeutral();
            leftBorderNeutral();
            borderTopInteruptor = true;
            borderRightInteruptor = false; 
            borderBottomInteruptor = false;
            borderLeftInteruptor = false;
            borderSelects[borderModuleNumber].style.top = "-0.1px";
            visualChangeBeforeBorderModification()
        }
        //selection de la bordure droite
        else if(borderSelectorSelectionCounter == 3){
            borderSelectorSelectionCounter++
            topBorderNeutral();
            rightBorderActivate();
            bottomBorderNeutral();
            leftBorderNeutral();
            borderTopInteruptor = false;
            borderRightInteruptor = true; 
            borderBottomInteruptor = false;
            borderLeftInteruptor = false;
            borderSelects[borderModuleNumber].style.top = "0px";
            visualChangeBeforeBorderModification()
        }
        //selection de la bordure basse
        else if(borderSelectorSelectionCounter == 4){
            borderSelectorSelectionCounter++
            topBorderNeutral();
            rightBorderNeutral();
            bottomBorderActivate();
            leftBorderNeutral();
            borderTopInteruptor = false;
            borderRightInteruptor = false; 
            borderBottomInteruptor = true;
            borderLeftInteruptor = false;
            borderSelects[borderModuleNumber].style.top = "0.1px";
            visualChangeBeforeBorderModification()
        }
        //selection de la bordure gauche
        else if(borderSelectorSelectionCounter == 5){
            borderSelectorSelectionCounter++
            topBorderNeutral();
            rightBorderNeutral();
            bottomBorderNeutral();
            leftBorderActivate();
            borderTopInteruptor = false;
            borderRightInteruptor = false; 
            borderBottomInteruptor = false;
            borderLeftInteruptor = true;
            borderSelects[borderModuleNumber].style.top = "0px";
            visualChangeBeforeBorderModification()
        }
        //selection des bordure haute et droite
        else if(borderSelectorSelectionCounter == 6){
            borderSelectorSelectionCounter++
            topBorderActivate();
            rightBorderActivate();
            bottomBorderNeutral();
            leftBorderNeutral();
            borderTopInteruptor = true;
            borderRightInteruptor = true; 
            borderBottomInteruptor = false;
            borderLeftInteruptor = false;
            borderSelects[borderModuleNumber].style.top = "0px";
            visualChangeBeforeBorderModification()
        }
        //selection des bordure basse et gauche
        else if(borderSelectorSelectionCounter == 7){
            borderSelectorSelectionCounter++
            topBorderNeutral();
            rightBorderNeutral();
            bottomBorderActivate();
            leftBorderActivate();
            borderTopInteruptor = false;
            borderRightInteruptor = false; 
            borderBottomInteruptor = true;
            borderLeftInteruptor = true;
            borderSelects[borderModuleNumber].style.top = "0px";
            visualChangeBeforeBorderModification()
        }
        //selection des bordure haute et basse
        else if(borderSelectorSelectionCounter == 8){
            borderSelectorSelectionCounter++
            topBorderActivate();
            rightBorderNeutral();
            bottomBorderActivate();
            leftBorderNeutral();
            borderTopInteruptor = true;
            borderRightInteruptor = false; 
            borderBottomInteruptor = true;
            borderLeftInteruptor = false;
            borderSelects[borderModuleNumber].style.top = "0px";
            visualChangeBeforeBorderModification()
        }
        //selection des bordure gauche et droite
        else if(borderSelectorSelectionCounter == 9){
            borderSelectorSelectionCounter = 1;
            topBorderNeutral();
            rightBorderActivate();
            bottomBorderNeutral();
            leftBorderActivate();
            borderTopInteruptor = false;
            borderRightInteruptor = true; 
            borderBottomInteruptor = false;
            borderLeftInteruptor = true;
            borderSelects[borderModuleNumber].style.top = "0px";
            visualChangeBeforeBorderModification()
        }
    })
    //les 4 Evenements permettant O/I indépendament les différent bords
    //lors d'un clique sur les bouton de bord représentant le bord désiré dans le selecteur
    //cela permet de l'inclure ou l'exclure de la selection de bord que l'on peut modifier (interuptor booleen O/I)
    //et de changer son visuel pour que l'utilisateur ai un feed-back (neutral/activate, +/-) 
    topBorderSelectors[borderModuleNumber].addEventListener("click", function(){
        if(borderTopInteruptor == false){
            topBorderActivate();
            borderTopInteruptor = true;
            visualChangeBeforeBorderModification()
        }
        else{
            topBorderNeutral();
            borderTopInteruptor = false;
            visualChangeBeforeBorderModification()
        }
    })
    leftBorderSelectors[borderModuleNumber].addEventListener("click", function(){
        if(borderLeftInteruptor == false){
            leftBorderActivate();
            borderLeftInteruptor = true;
            visualChangeBeforeBorderModification()
        }
        else{
            leftBorderNeutral();
            borderLeftInteruptor = false;
            visualChangeBeforeBorderModification()
        }
    })
    rightBorderSelectors[borderModuleNumber].addEventListener("click", function(){
        if(borderRightInteruptor == false){
            rightBorderActivate();
            borderRightInteruptor = true;
            visualChangeBeforeBorderModification()
        }
        else{
            rightBorderNeutral();
            borderRightInteruptor = false;
            visualChangeBeforeBorderModification()
        }
    })
    bottomBorderSelectors[borderModuleNumber].addEventListener("click", function(){
        if(borderBottomInteruptor == false){
            bottomBorderActivate();
            borderBottomInteruptor = true;
            visualChangeBeforeBorderModification()
        }
        else{
            bottomBorderNeutral();
            borderBottomInteruptor = false;
            visualChangeBeforeBorderModification()
        }
    })

    //Les 4 evenements qui suivents fonctionne en 3 étapes : 
    //1. intrinsequement, l'evenement recupere une valeur lié a l'element HTML d'interaction (input/btn)
    //2. effectue une condition pour chaque bord (4) avec les interuptor O/I associé au bord pour savoir 
    //   si il est inclus a la selection a modifié. si le booleen est true, on change la valeur désiré dans lobjet représentant le bord 

    //Event du range de selection de la taille 
    borderRanges[borderModuleNumber].addEventListener("click", function(){
        if(borderTopInteruptor == true){
            borderModuleList[borderModuleNumber].top.size = borderRanges[borderModuleNumber].value;
        }
        if(borderRightInteruptor == true){
            borderModuleList[borderModuleNumber].right.size = borderRanges[borderModuleNumber].value;
        }
        if(borderBottomInteruptor == true){
            borderModuleList[borderModuleNumber].bottom.size = borderRanges[borderModuleNumber].value;
        }
        if(borderLeftInteruptor == true){
            borderModuleList[borderModuleNumber].left.size = borderRanges[borderModuleNumber].value;
        }
    })
    //Event du bouton de couleur 
    borderColors[borderModuleNumber].addEventListener("input", function(){
        if(borderTopInteruptor == true){
            borderModuleList[borderModuleNumber].top.color.hue = borderColors[borderModuleNumber].value;
        }
        if(borderRightInteruptor == true){
            borderModuleList[borderModuleNumber].right.color.hue = borderColors[borderModuleNumber].value;
        }
        if(borderBottomInteruptor == true){
            borderModuleList[borderModuleNumber].bottom.color.hue = borderColors[borderModuleNumber].value;
        }
        if(borderLeftInteruptor == true){
            borderModuleList[borderModuleNumber].left.color.hue = borderColors[borderModuleNumber].value;
        }
    })
    //Event du select de la liste de style de bordure 
    borderStyles[borderModuleNumber].addEventListener("click", function(){
        if(borderStyles[borderModuleNumber].options[borderStyles[borderModuleNumber].selectedIndex] != selectedStyle){
            selectedStyle.removeAttribute("selected");
            selectedStyle = borderStyles[borderModuleNumber].options[borderStyles[borderModuleNumber].selectedIndex];
            selectedStyle.setAttribute("selected", "");
        }
        if(borderTopInteruptor == true){
            borderModuleList[borderModuleNumber].top.style = selectedStyle.value;
        }
        if(borderRightInteruptor == true){
            borderModuleList[borderModuleNumber].right.style = selectedStyle.value;
        }
        if(borderBottomInteruptor == true){
            borderModuleList[borderModuleNumber].bottom.style = selectedStyle.value;
        }
        if(borderLeftInteruptor == true){
            borderModuleList[borderModuleNumber].left.style = selectedStyle.value;
        }
    })
    //Event du bouton d'opacité
    opacityButtonList[opacityNumber].opacityRange.addEventListener("input", function(){
        if(borderTopInteruptor == true){
            borderModuleList[borderModuleNumber].top.color.opacity = opacityButtonList[opacityNumber].opacityRange.value;
        }
        if(borderRightInteruptor == true){
            borderModuleList[borderModuleNumber].right.color.opacity = opacityButtonList[opacityNumber].opacityRange.value;
        }
        if(borderBottomInteruptor == true){
            borderModuleList[borderModuleNumber].bottom.color.opacity = opacityButtonList[opacityNumber].opacityRange.value;
        }
        if(borderLeftInteruptor == true){
            borderModuleList[borderModuleNumber].left.color.opacity = opacityButtonList[opacityNumber].opacityRange.value;
        }
    })
}

/*
if((BordertopInteruptor == false)&&(topRightInteruptor == false)&&
(bottomRightInteruptor == false)&&(bottomLeftInteruptor == false)){
    cornerSelectorSelectionCounter = 1;
    topLeftInteruptor = true;
    topRightInteruptor = true;
    bottomRightInteruptor = true;
    bottomLeftInteruptor = true;
    topLeftActivation();
    topRightActivation();
    bottomRightActivation();
    bottomLeftActivation();
    RangeVisualChangeBeforeCornerSelection();
}*/