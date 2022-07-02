//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~BORDER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
function createBorder(){
//boucle qui contient l'ensemble des regles de l'outil de selection de bordure
for(i=0; i<= elements.length-1; i++){
    //represente le nombre de modules de border (1 pour chaque module d'element)
    let borderModNum = i;
    //permet pour chaque module de border de selectionné le range d'opacité correspondant
    let opaNum = 2+(borderModNum*4);

    borderIFList[borderModNum] = {
        //compteur permettant de selectionné grace au bouton centrale de selection des bordure. 
        //une succession de selection des différentes bordures et de leurs représentation graphique. 
        borderSelectorCounter : 1,

        //4 variables représentant l'état d'activation des boutons de bordure du selecteur de bordure 
        interuptorTB : false,
        interuptorRB : false,
        interuptorLB : false,
        interuptorBB : false
    }

    //représente l'option selectionné du select de style de bordure
    let selectedStyle = borderStyles[borderModNum].options[borderStyles[borderModNum].selectedIndex];

    //objet qui contient l'ensemble des info de style de chacune des bordures.
    borderModList[borderModNum] = {
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
        visualChgtBorder(
            borderIFList[borderModNum].interuptorTB, borderIFList[borderModNum].interuptorLB, 
            borderIFList[borderModNum].interuptorRB, borderIFList[borderModNum].interuptorBB,
             
            borderModList[borderModNum].top, borderModList[borderModNum].left, 
            borderModList[borderModNum].right, borderModList[borderModNum].bottom,
            
            borderRanges[borderModNum], 
            borderColors[borderModNum], 
            opaNum, 
            selectedStyle, borderStyles[borderModNum]
            )
    }

    //suite de fonction qui s'activerons dans les différents EVENT qui leurs succede
    //elles permettent +/- l'attribut HTML correspondant a un selecteur de bordure activé ou non 
    //ce sont des fonction permettant un feed-back visuel a l'utilisateur, et non pas de modifié directement les valeurs des bordures
    //neutral = visuel des bords non sélectionné, activate = visuel des bords sélectionné
    function topBorderActivate(){
        topBorderSelectors[borderModNum].setAttribute("active","");
    };
    function bottomBorderActivate(){
        bottomBorderSelectors[borderModNum].setAttribute("active","");
    };
    function leftBorderActivate(){
        leftBorderSelectors[borderModNum].setAttribute("active","");
    };
    function rightBorderActivate(){
        rightBorderSelectors[borderModNum].setAttribute("active","");
    }
    function topBorderNeutral(){
        topBorderSelectors[borderModNum].removeAttribute("active");
    };
    function bottomBorderNeutral(){
        bottomBorderSelectors[borderModNum].removeAttribute("active");
    };
    function leftBorderNeutral(){
        leftBorderSelectors[borderModNum].removeAttribute("active");
    };
    function rightBorderNeutral(){
        rightBorderSelectors[borderModNum].removeAttribute("active");
    }

    //Evenement lié au bouton de selection des bordures (bouton-central du selecteur de bordure)
    //a chaque nouveau clique une nouvelle selection de bordures modifiable est faite, 
    //il y a 9 selections différentes qui se succede.
    //l'evenement utilise : 
    //les fonction neutral/active pour chgmt grahique et 
    //les variables interuptors (o/i) pour validé ou non la possibilité de modification des bord  
    borderSelects[borderModNum].addEventListener("click", function(e){
        console.log("test");
        //selection de tout les bords
        if(borderIFList[borderModNum].borderSelectorCounter == 1){
            borderIFList[borderModNum].borderSelectorCounter++
            topBorderActivate();
            rightBorderActivate();
            bottomBorderActivate();
            leftBorderActivate();
            borderIFList[borderModNum].interuptorTB = true;
            borderIFList[borderModNum].interuptorRB = true; 
            borderIFList[borderModNum].interuptorBB = true;
            borderIFList[borderModNum].interuptorLB = true;
            visualChangeBeforeBorderModification()
        }
        //selection de la bordure haute
        else if(borderIFList[borderModNum].borderSelectorCounter == 2){
            borderIFList[borderModNum].borderSelectorCounter++
            topBorderActivate();
            rightBorderNeutral();
            bottomBorderNeutral();
            leftBorderNeutral();
            borderIFList[borderModNum].interuptorTB = true;
            borderIFList[borderModNum].interuptorRB = false; 
            borderIFList[borderModNum].interuptorBB = false;
            borderIFList[borderModNum].interuptorLB = false;
            borderSelects[borderModNum].style.top = "-0.1px";
            visualChangeBeforeBorderModification()
        }
        //selection de la bordure droite
        else if(borderIFList[borderModNum].borderSelectorCounter == 3){
            borderIFList[borderModNum].borderSelectorCounter++
            topBorderNeutral();
            rightBorderActivate();
            bottomBorderNeutral();
            leftBorderNeutral();
            borderIFList[borderModNum].interuptorTB = false;
            borderIFList[borderModNum].interuptorRB = true; 
            borderIFList[borderModNum].interuptorBB = false;
            borderIFList[borderModNum].interuptorLB = false;
            borderSelects[borderModNum].style.top = "0px";
            visualChangeBeforeBorderModification()
        }
        //selection de la bordure basse
        else if(borderIFList[borderModNum].borderSelectorCounter == 4){
            borderIFList[borderModNum].borderSelectorCounter++
            topBorderNeutral();
            rightBorderNeutral();
            bottomBorderActivate();
            leftBorderNeutral();
            borderIFList[borderModNum].interuptorTB = false;
            borderIFList[borderModNum].interuptorRB = false; 
            borderIFList[borderModNum].interuptorBB = true;
            borderIFList[borderModNum].interuptorLB = false;
            borderSelects[borderModNum].style.top = "0.1px";
            visualChangeBeforeBorderModification()
        }
        //selection de la bordure gauche
        else if(borderIFList[borderModNum].borderSelectorCounter == 5){
            borderIFList[borderModNum].borderSelectorCounter++
            topBorderNeutral();
            rightBorderNeutral();
            bottomBorderNeutral();
            leftBorderActivate();
            borderIFList[borderModNum].interuptorTB = false;
            borderIFList[borderModNum].interuptorRB = false; 
            borderIFList[borderModNum].interuptorBB = false;
            borderIFList[borderModNum].interuptorLB = true;
            borderSelects[borderModNum].style.top = "0px";
            visualChangeBeforeBorderModification()
        }
        //selection des bordure haute et droite
        else if(borderIFList[borderModNum].borderSelectorCounter == 6){
            borderIFList[borderModNum].borderSelectorCounter++
            topBorderActivate();
            rightBorderActivate();
            bottomBorderNeutral();
            leftBorderNeutral();
            borderIFList[borderModNum].interuptorTB = true;
            borderIFList[borderModNum].interuptorRB = true; 
            borderIFList[borderModNum].interuptorBB = false;
            borderIFList[borderModNum].interuptorLB = false;
            borderSelects[borderModNum].style.top = "0px";
            visualChangeBeforeBorderModification()
        }
        //selection des bordure basse et gauche
        else if(borderIFList[borderModNum].borderSelectorCounter == 7){
            borderIFList[borderModNum].borderSelectorCounter++
            topBorderNeutral();
            rightBorderNeutral();
            bottomBorderActivate();
            leftBorderActivate();
            borderIFList[borderModNum].interuptorTB = false;
            borderIFList[borderModNum].interuptorRB = false; 
            borderIFList[borderModNum].interuptorBB = true;
            borderIFList[borderModNum].interuptorLB = true;
            borderSelects[borderModNum].style.top = "0px";
            visualChangeBeforeBorderModification()
        }
        //selection des bordure haute et basse
        else if(borderIFList[borderModNum].borderSelectorCounter == 8){
            borderIFList[borderModNum].borderSelectorCounter++
            topBorderActivate();
            rightBorderNeutral();
            bottomBorderActivate();
            leftBorderNeutral();
            borderIFList[borderModNum].interuptorTB = true;
            borderIFList[borderModNum].interuptorRB = false; 
            borderIFList[borderModNum].interuptorBB = true;
            borderIFList[borderModNum].interuptorLB = false;
            borderSelects[borderModNum].style.top = "0px";
            visualChangeBeforeBorderModification()
        }
        //selection des bordure gauche et droite
        else if(borderIFList[borderModNum].borderSelectorCounter == 9){
            borderIFList[borderModNum].borderSelectorCounter = 1;
            topBorderNeutral();
            rightBorderActivate();
            bottomBorderNeutral();
            leftBorderActivate();
            borderIFList[borderModNum].interuptorTB = false;
            borderIFList[borderModNum].interuptorRB = true; 
            borderIFList[borderModNum].interuptorBB = false;
            borderIFList[borderModNum].interuptorLB = true;
            borderSelects[borderModNum].style.top = "0px";
            visualChangeBeforeBorderModification()
        }
    })
    //les 4 Evenements permettant O/I indépendament les différent bords
    //lors d'un clique sur les bouton de bord représentant le bord désiré dans le selecteur
    //cela permet de l'inclure ou l'exclure de la selection de bord que l'on peut modifier (interuptor booleen O/I)
    //et de changer son visuel pour que l'utilisateur ai un feed-back (neutral/activate, +/-) 
    topBorderSelectors[borderModNum].addEventListener("click", function(){
        if(borderIFList[borderModNum].interuptorTB == false){
            topBorderActivate();
            borderIFList[borderModNum].interuptorTB = true;
            visualChangeBeforeBorderModification()
        }
        else{
            topBorderNeutral();
            borderIFList[borderModNum].interuptorTB = false;
            visualChangeBeforeBorderModification()
        }
    })
    leftBorderSelectors[borderModNum].addEventListener("click", function(){
        if(borderIFList[borderModNum].interuptorLB == false){
            leftBorderActivate();
            borderIFList[borderModNum].interuptorLB = true;
            visualChangeBeforeBorderModification()
        }
        else{
            leftBorderNeutral();
            borderIFList[borderModNum].interuptorLB = false;
            visualChangeBeforeBorderModification()
        }
    })
    rightBorderSelectors[borderModNum].addEventListener("click", function(){
        if(borderIFList[borderModNum].interuptorRB == false){
            rightBorderActivate();
            borderIFList[borderModNum].interuptorRB = true;
            visualChangeBeforeBorderModification()
        }
        else{
            rightBorderNeutral();
            borderIFList[borderModNum].interuptorRB = false;
            visualChangeBeforeBorderModification()
        }
    })
    bottomBorderSelectors[borderModNum].addEventListener("click", function(){
        if(borderIFList[borderModNum].interuptorBB == false){
            bottomBorderActivate();
            borderIFList[borderModNum].interuptorBB = true;
            visualChangeBeforeBorderModification()
        }
        else{
            bottomBorderNeutral();
            borderIFList[borderModNum].interuptorBB = false;
            visualChangeBeforeBorderModification()
        }
    })
    
    //selectionIfNoBorderIsSelected:
    //permet lors des Event de selection de valeur,btn/input, qui suivent juste en dessous de selectionné tout les bords si aucun ne l'est
    //inclus visualChangeBeforeBorderModification pour activé visuellement le changement.
    function selectionIfNoBorderIsSelected(){
        if((borderIFList[borderModNum].interuptorTB == false)&&(borderIFList[borderModNum].interuptorRB == false)&&
        (borderIFList[borderModNum].interuptorBB == false)&&(borderIFList[borderModNum].interuptorLB == false)){
            borderIFList[borderModNum].borderSelectorCounter = 2;
            borderIFList[borderModNum].interuptorTB = true;
            borderIFList[borderModNum].interuptorRB = true;
            borderIFList[borderModNum].interuptorBB = true;
            borderIFList[borderModNum].interuptorLB = true;
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
    borderRanges[borderModNum].addEventListener("input", function(){
        if(borderIFList[borderModNum].interuptorTB == true){
            borderModList[borderModNum].top.size = borderRanges[borderModNum].value;
        }
        if(borderIFList[borderModNum].interuptorRB == true){
            borderModList[borderModNum].right.size = borderRanges[borderModNum].value;
        }
        if(borderIFList[borderModNum].interuptorBB == true){
            borderModList[borderModNum].bottom.size = borderRanges[borderModNum].value;
        }
        if(borderIFList[borderModNum].interuptorLB == true){
            borderModList[borderModNum].left.size = borderRanges[borderModNum].value;
        }
        selectionIfNoBorderIsSelected();
        border(borderModNum);
    })
    //Event du bouton de couleur des bords
    borderColors[borderModNum].addEventListener("input", function(){
        if(borderIFList[borderModNum].interuptorTB == true){
            borderModList[borderModNum].top.color.hue = borderColors[borderModNum].value;
        }
        if(borderIFList[borderModNum].interuptorRB == true){
            borderModList[borderModNum].right.color.hue = borderColors[borderModNum].value;
        }
        if(borderIFList[borderModNum].interuptorBB == true){
            borderModList[borderModNum].bottom.color.hue = borderColors[borderModNum].value;
        }
        if(borderIFList[borderModNum].interuptorLB == true){
            borderModList[borderModNum].left.color.hue = borderColors[borderModNum].value;
        }
        selectionIfNoBorderIsSelected();
        border(borderModNum);
    })
    //Event du select de la liste de style des bords 
    borderStyles[borderModNum].addEventListener("click", function(){
        if(borderStyles[borderModNum].options[borderStyles[borderModNum].selectedIndex] != selectedStyle){
            selectedStyle.removeAttribute("selected");
            selectedStyle = borderStyles[borderModNum].options[borderStyles[borderModNum].selectedIndex];
            selectedStyle.setAttribute("selected", "");
        }
        if(borderIFList[borderModNum].interuptorTB == true){
            borderModList[borderModNum].top.style = selectedStyle.value;
        }
        if(borderIFList[borderModNum].interuptorRB == true){
            borderModList[borderModNum].right.style = selectedStyle.value;
        }
        if(borderIFList[borderModNum].interuptorBB == true){
            borderModList[borderModNum].bottom.style = selectedStyle.value;
        }
        if(borderIFList[borderModNum].interuptorLB == true){
            borderModList[borderModNum].left.style = selectedStyle.value;
        }
        selectionIfNoBorderIsSelected();
        border(borderModNum);
    })
    //Event du bouton d'opacité
    opacityButtonList[opaNum].opacityRange.addEventListener("input", function(){
        if(borderIFList[borderModNum].interuptorTB == true){
            borderModList[borderModNum].top.color.opacity = opacityButtonList[opaNum].opacityRange.value;
        }
        if(borderIFList[borderModNum].interuptorRB == true){
            borderModList[borderModNum].right.color.opacity = opacityButtonList[opaNum].opacityRange.value;
        }
        if(borderIFList[borderModNum].interuptorBB == true){
            borderModList[borderModNum].bottom.color.opacity = opacityButtonList[opaNum].opacityRange.value;
        }
        if(borderIFList[borderModNum].interuptorLB == true){
            borderModList[borderModNum].left.color.opacity = opacityButtonList[opaNum].opacityRange.value;
        }
        selectionIfNoBorderIsSelected();
        border(borderModNum);
    })
}

}
