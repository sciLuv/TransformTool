//CORNER////////////////////////////////////////////////////////////
//Représentation de l'outil HTML de selection des coins
let cornerSelectors = document.getElementsByClassName("corner-select");
//Représentation des différentes parties HTML de l'outil de selection des coins
let topLefts = document.getElementsByClassName("top-left");
let topRights = document.getElementsByClassName("top-right");
let bottomRights = document.getElementsByClassName("bottom-right");
let bottomLefts = document.getElementsByClassName("bottom-left");
//représentation du bouton de selection des coins
let cornerSelects = document.getElementsByClassName("all");
//représentation de l'input range qui gere la courbure des coins
let radiusRanges = document.getElementsByClassName("range-radius");

//liste qui contient l'ensemble des objets représentant les coins de chaque élément crée
let cornerModuleList = [];

//boucle qui contient l'ensemble des regles de représentations graphiques de l'outil de selection de coins
for(i=0; i<= cornerSelectors.length-1; i++){
    //represente le nombre de modules de corner (1 pour chaque module d'element)
    let cornerModuleNumber = i;
    let cornerSelectorSelectionCounter = 1;

    //4 variables représentant l'état d'activation (O/I) des boutons de coin du selecteur de coin
    let topLeftInteruptor = false;
    let topRightInteruptor = false;
    let bottomRightInteruptor = false;
    let bottomLeftInteruptor = false;

    //objet qui contient les valeurs de courbure pour les 4 coins de l'element ciblé
    cornerModuleList[cornerModuleNumber] = {
        topLeft : 0,
        topRight : 0,
        bottomRight : 0,
        bottomLeft : 0
    }

    //RangeVisualChangeBeforeCornerSelection :
    //fonction permettant la mise à jour visuel du range de selection de la valeur de la courbure, en fonctions des coins séléctionné
    function RangeVisualChangeBeforeCornerSelection(){
        //tableau qui contiendra a chaque itération de la fonction les valeurs des coins séléctionné pour la mise à jour visuel
        let selectedCorner = [];
        //les 4 conditions suivante permettent d'ajouté ou non les valeurs des différentes coins. 
        //(topLeft/topRight/bottomRight/bottomLeft, dans l'ordre)
        let cornerSelectedValueTest;
        if(topLeftInteruptor == true){
            selectedCorner.push(cornerModuleList[cornerModuleNumber].topLeft);
        }
        if(topRightInteruptor == true){
            selectedCorner.push(cornerModuleList[cornerModuleNumber].topRight);
        }
        if(bottomRightInteruptor == true){
            selectedCorner.push(cornerModuleList[cornerModuleNumber].bottomRight);
        }
        if(bottomLeftInteruptor == true){
            selectedCorner.push(cornerModuleList[cornerModuleNumber].bottomLeft);
        }
        //boucle et condition permettant la mise a jour de l'input range d'attribution de valeur de courbure
        for(i=0; i<=selectedCorner.length-1; i++){
            //selection de la valeur de range commune aux coins séléctionné
            cornerSelectedValueTest = selectedCorner[0];
            if(selectedCorner[i] == selectedCorner[0]){
                radiusRanges[cornerModuleNumber].value = selectedCorner[0];
            }
            //valeur de courbure représenté par défaut si pas de correspondance entre les elements sélectionné
            else{
                radiusRanges[cornerModuleNumber].value = 0;
                break;
            }
        }
    }

    //suite de fonction qui s'activerons dans les EVENT qui leurs succede, 
    //elles permettent +/- l'attribut HTML correspondant a un selecteur de coin activé ou non
    //ce sont des fonction permettant un feed-back visuel a l'utilisateur, et non pas de modifié directement les valeurs des coins 
    //neutral = visuel des bords non sélectionné, activate = visuel des bords sélectionné
    function topLeftCornerActivate(){
        topLefts[cornerModuleNumber].setAttribute("active","");
    }
    function topRightCornerActivate(){
        topRights[cornerModuleNumber].setAttribute("active","");  
    }
    function bottomRightCornerActivate(){
        bottomRights[cornerModuleNumber].setAttribute("active","");
    }
    function bottomLeftCornerActivate(){
        bottomLefts[cornerModuleNumber].setAttribute("active","");
    }
    function topLeftCornerNeutral(){
        topLefts[cornerModuleNumber].removeAttribute("active");
    }
    function topRightCornerNeutral(){
        topRights[cornerModuleNumber].removeAttribute("active");
    }
    function bottomRightCornerNeutral(){
        bottomRights[cornerModuleNumber].removeAttribute("active");
    }
    function bottomLeftCornerNeutral(){
        bottomLefts[cornerModuleNumber].removeAttribute("active"); 
    }

    //Evenement lié au bouton de selection des coins (bouton-central du selecteur de coins)
    //a chaque nouveau clique une nouvelle selection de coin est faite,
    //il y a 11 selections différentes qui se succede
    //l'evenement utilise : 
    //les fonction neutral/active pour chgmt grahique et 
    //les variables interuptors (o/i) pour validé ou non la possibilité de modification des coins  
    cornerSelects[cornerModuleNumber].addEventListener("click", function(e){
        //selection de tout les coins
        if(cornerSelectorSelectionCounter == 1){
            console.log(cornerSelectorSelectionCounter);
            cornerSelectorSelectionCounter++;
            topLeftInteruptor = true;
            topRightInteruptor = true;
            bottomRightInteruptor = true;
            bottomLeftInteruptor = true;
            topLeftCornerActivate();
            topRightCornerActivate();
            bottomRightCornerActivate();
            bottomLeftCornerActivate();
            RangeVisualChangeBeforeCornerSelection();
        }
        //selection du coin supérieur gauche
        else if(cornerSelectorSelectionCounter == 2){
            console.log(cornerSelectorSelectionCounter);
            cornerSelectorSelectionCounter++;
            topLeftInteruptor = true;
            topRightInteruptor = false;
            bottomRightInteruptor = false;
            bottomLeftInteruptor = false;
            topLeftCornerActivate();
            topRightCornerNeutral();
            bottomRightCornerNeutral();
            bottomLeftCornerNeutral();
            RangeVisualChangeBeforeCornerSelection();
        }
        //selection du coin supérieur droit
        else if(cornerSelectorSelectionCounter == 3){
            cornerSelectorSelectionCounter++;
            topLeftInteruptor = false;
            topRightInteruptor = true;
            bottomRightInteruptor = false;
            bottomLeftInteruptor = false;
            topLeftCornerNeutral();
            topRightCornerActivate();
            bottomRightCornerNeutral();
            bottomLeftCornerNeutral();
            RangeVisualChangeBeforeCornerSelection();
        }
        //selection du coin inférieur droit
        else if(cornerSelectorSelectionCounter == 4){
            cornerSelectorSelectionCounter++;
            topLeftInteruptor = false;
            topRightInteruptor = false;
            bottomRightInteruptor = true;
            bottomLeftInteruptor = false;
            topLeftCornerNeutral();
            topRightCornerNeutral();
            bottomRightCornerActivate();
            bottomLeftCornerNeutral();
            RangeVisualChangeBeforeCornerSelection();
        }
        //selection du coin inférieur gauche
        else if(cornerSelectorSelectionCounter == 5){
            cornerSelectorSelectionCounter++;
            topLeftInteruptor = false;
            topRightInteruptor = false;
            bottomRightInteruptor = false;
            bottomLeftInteruptor = true;
            topLeftCornerNeutral();
            topRightCornerNeutral();
            bottomRightCornerNeutral();
            bottomLeftCornerActivate();
            RangeVisualChangeBeforeCornerSelection();
        }
        //selection des coins supérieurs
        else if(cornerSelectorSelectionCounter == 6){
            cornerSelectorSelectionCounter++;
            topLeftInteruptor = true;
            topRightInteruptor = true;
            bottomRightInteruptor = false;
            bottomLeftInteruptor = false;
            topLeftCornerActivate();
            topRightCornerActivate();
            bottomRightCornerNeutral();
            bottomLeftCornerNeutral();
            RangeVisualChangeBeforeCornerSelection();
        }
        //selection des coins droits
        else if(cornerSelectorSelectionCounter == 7){
            cornerSelectorSelectionCounter++;
            topLeftInteruptor = false;
            topRightInteruptor = true;
            bottomRightInteruptor = true;
            bottomLeftInteruptor = false;
            topLeftCornerNeutral();
            topRightCornerActivate();
            bottomRightCornerActivate();
            bottomLeftCornerNeutral();
            RangeVisualChangeBeforeCornerSelection();
        }
        //selection des coins inférieurs
        else if(cornerSelectorSelectionCounter == 8){
            cornerSelectorSelectionCounter++;
            topLeftInteruptor = false;
            topRightInteruptor = false;
            bottomRightInteruptor = true;
            bottomLeftInteruptor = true;
            topLeftCornerNeutral();
            topRightCornerNeutral();
            bottomRightCornerActivate();
            bottomLeftCornerActivate();
            RangeVisualChangeBeforeCornerSelection();
        }
        //selection des coins gauches
        else if(cornerSelectorSelectionCounter == 9){
            cornerSelectorSelectionCounter++;
            topLeftInteruptor = true;
            topRightInteruptor = false;
            bottomRightInteruptor = false;
            bottomLeftInteruptor = true;
            topLeftCornerActivate();
            topRightCornerNeutral();
            bottomRightCornerNeutral();
            bottomLeftCornerActivate();
            RangeVisualChangeBeforeCornerSelection();
        }
        //selection des coins haut gauche et bas droit
        else if(cornerSelectorSelectionCounter == 10){
            cornerSelectorSelectionCounter++;
            topLeftInteruptor = true;
            topRightInteruptor = false;
            bottomRightInteruptor = true;
            bottomLeftInteruptor = false;
            topLeftCornerActivate();
            topRightCornerNeutral();
            bottomRightCornerActivate();
            bottomLeftCornerNeutral();
            RangeVisualChangeBeforeCornerSelection();
        }
        //selection des coins haut droit et bas gauche
        else if(cornerSelectorSelectionCounter == 11){
            cornerSelectorSelectionCounter = 1;
            topLeftInteruptor = false;
            topRightInteruptor = true;
            bottomRightInteruptor = false;
            bottomLeftInteruptor = true;
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
    topLefts[cornerModuleNumber].addEventListener("click", function(){
        if(topLeftInteruptor == false){
            topLeftCornerActivate();
            topLeftInteruptor = true;
        }
        else{
            topLeftCornerNeutral();
            topLeftInteruptor = false;           
        }
        RangeVisualChangeBeforeCornerSelection();
    })
    topRights[cornerModuleNumber].addEventListener("click", function(){
        if(topRightInteruptor == false){
            topRightCornerActivate();
            topRightInteruptor = true;
        }
        else{
            topRightCornerNeutral();
            topRightInteruptor = false;
        }
        RangeVisualChangeBeforeCornerSelection();
    })
    bottomRights[cornerModuleNumber].addEventListener("click", function(){
        if(bottomRightInteruptor == false){
            bottomRightCornerActivate();
            bottomRightInteruptor = true;
        }
        else{
            bottomRightCornerNeutral();
            bottomRightInteruptor = false;
        }
        RangeVisualChangeBeforeCornerSelection();
    })
    bottomLefts[cornerModuleNumber].addEventListener("click", function(){
        if(bottomLeftInteruptor == false){
            bottomLeftCornerActivate();
            bottomLeftInteruptor = true;
        }
        else{
            bottomLeftCornerNeutral();
            bottomLeftInteruptor = false;
        }
        RangeVisualChangeBeforeCornerSelection();
    })


    //L'Event du range qui gere la courbure fonctionne en 3 étapes : 
    //1. intrinsequement, l'evenement recupere une valeur lié a l'element HTML d'interaction (input/btn)
    //2. effectue une condition pour chaques coins (4) avec les interuptor O/I associé au coin pour savoir- 
    //   -si il est inclus a la selection a modifié. Si le booleen est true, on change la valeur désiré dans la variable représentant le coin
    //3. si aucun coins n'est sélectionné mais que le range est utilisé, alors il y aura une selection auto de tout les bord (visuel et valeur)
    radiusRanges[cornerModuleNumber].addEventListener("input", function(){

        if(topLeftInteruptor == true){
            cornerModuleList[cornerModuleNumber].topLeft = radiusRanges[cornerModuleNumber].value;
        }
        if(topRightInteruptor == true){
            cornerModuleList[cornerModuleNumber].topRight = radiusRanges[cornerModuleNumber].value;
        }
        if(bottomRightInteruptor == true){
            cornerModuleList[cornerModuleNumber].bottomRight = radiusRanges[cornerModuleNumber].value;
        }
        if(bottomLeftInteruptor == true){
            cornerModuleList[cornerModuleNumber].bottomLeft = radiusRanges[cornerModuleNumber].value;
        }
        if((topLeftInteruptor == false)&&(topRightInteruptor == false)&&
        (bottomRightInteruptor == false)&&(bottomLeftInteruptor == false)){
            cornerSelectorSelectionCounter = 1;
            topLeftInteruptor = true;
            topRightInteruptor = true;
            bottomRightInteruptor = true;
            bottomLeftInteruptor = true;
            topLeftCornerActivate();
            topRightCornerActivate();
            bottomRightCornerActivate();
            bottomLeftCornerActivate();
            RangeVisualChangeBeforeCornerSelection();
        }
    })
}


