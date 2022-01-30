//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CORNER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//Tableaux des balises HTML de selection des coins
let cornerSelectors = document.getElementsByClassName("corner-select");
//Représentation des différentes parties HTML de l'outil de selection des coins
let topLefts = document.getElementsByClassName("top-left");
let topRights = document.getElementsByClassName("top-right");
let bottomRights = document.getElementsByClassName("bottom-right");
let bottomLefts = document.getElementsByClassName("bottom-left");
//Tableau des balises HTML centrale du selecteur de coin (rond au millieu du selecteur) 
let cornerSelects = document.getElementsByClassName("all");
//représentation de l'input range qui gere la courbure des coins
let radiusRanges = document.getElementsByClassName("range-radius");

//liste qui contient l'ensemble des objets représentant les coins de chaque élément crée
let cornerModuleList = [];

function createCorner(){
    //boucle qui contient l'ensemble des regles de représentations graphiques de l'outil de selection de coins
    for(i=0; i<= cornerSelectors.length-1; i++){
        //represente le nombre de modules de corner (1 pour chaque module d'element)
        let cornerModuleNumber = i;
        let cornerSelectorSelectionCounter = 1;

        //4 variables représentant l'état d'activation (O/I) des boutons de coin du selecteur de coin
        let topLeftCornerInteruptor = false;
        let topRightCornerInteruptor = false;
        let bottomRightCornerInteruptor = false;
        let bottomLeftCornerInteruptor = false;

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
            if(topLeftCornerInteruptor == true){
                selectedCorner.push(cornerModuleList[cornerModuleNumber].topLeft);
            }
            if(topRightCornerInteruptor == true){
                selectedCorner.push(cornerModuleList[cornerModuleNumber].topRight);
            }
            if(bottomRightCornerInteruptor == true){
                selectedCorner.push(cornerModuleList[cornerModuleNumber].bottomRight);
            }
            if(bottomLeftCornerInteruptor == true){
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
                cornerSelectorSelectionCounter++;
                topLeftCornerInteruptor = true;
                topRightCornerInteruptor = true;
                bottomRightCornerInteruptor = true;
                bottomLeftCornerInteruptor = true;
                topLeftCornerActivate();
                topRightCornerActivate();
                bottomRightCornerActivate();
                bottomLeftCornerActivate();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection du coin supérieur gauche
            else if(cornerSelectorSelectionCounter == 2){
                cornerSelectorSelectionCounter++;
                topLeftCornerInteruptor = true;
                topRightCornerInteruptor = false;
                bottomRightCornerInteruptor = false;
                bottomLeftCornerInteruptor = false;
                topLeftCornerActivate();
                topRightCornerNeutral();
                bottomRightCornerNeutral();
                bottomLeftCornerNeutral();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection du coin supérieur droit
            else if(cornerSelectorSelectionCounter == 3){
                cornerSelectorSelectionCounter++;
                topLeftCornerInteruptor = false;
                topRightCornerInteruptor = true;
                bottomRightCornerInteruptor = false;
                bottomLeftCornerInteruptor = false;
                topLeftCornerNeutral();
                topRightCornerActivate();
                bottomRightCornerNeutral();
                bottomLeftCornerNeutral();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection du coin inférieur droit
            else if(cornerSelectorSelectionCounter == 4){
                cornerSelectorSelectionCounter++;
                topLeftCornerInteruptor = false;
                topRightCornerInteruptor = false;
                bottomRightCornerInteruptor = true;
                bottomLeftCornerInteruptor = false;
                topLeftCornerNeutral();
                topRightCornerNeutral();
                bottomRightCornerActivate();
                bottomLeftCornerNeutral();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection du coin inférieur gauche
            else if(cornerSelectorSelectionCounter == 5){
                cornerSelectorSelectionCounter++;
                topLeftCornerInteruptor = false;
                topRightCornerInteruptor = false;
                bottomRightCornerInteruptor = false;
                bottomLeftCornerInteruptor = true;
                topLeftCornerNeutral();
                topRightCornerNeutral();
                bottomRightCornerNeutral();
                bottomLeftCornerActivate();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection des coins supérieurs
            else if(cornerSelectorSelectionCounter == 6){
                cornerSelectorSelectionCounter++;
                topLeftCornerInteruptor = true;
                topRightCornerInteruptor = true;
                bottomRightCornerInteruptor = false;
                bottomLeftCornerInteruptor = false;
                topLeftCornerActivate();
                topRightCornerActivate();
                bottomRightCornerNeutral();
                bottomLeftCornerNeutral();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection des coins droits
            else if(cornerSelectorSelectionCounter == 7){
                cornerSelectorSelectionCounter++;
                topLeftCornerInteruptor = false;
                topRightCornerInteruptor = true;
                bottomRightCornerInteruptor = true;
                bottomLeftCornerInteruptor = false;
                topLeftCornerNeutral();
                topRightCornerActivate();
                bottomRightCornerActivate();
                bottomLeftCornerNeutral();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection des coins inférieurs
            else if(cornerSelectorSelectionCounter == 8){
                cornerSelectorSelectionCounter++;
                topLeftCornerInteruptor = false;
                topRightCornerInteruptor = false;
                bottomRightCornerInteruptor = true;
                bottomLeftCornerInteruptor = true;
                topLeftCornerNeutral();
                topRightCornerNeutral();
                bottomRightCornerActivate();
                bottomLeftCornerActivate();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection des coins gauches
            else if(cornerSelectorSelectionCounter == 9){
                cornerSelectorSelectionCounter++;
                topLeftCornerInteruptor = true;
                topRightCornerInteruptor = false;
                bottomRightCornerInteruptor = false;
                bottomLeftCornerInteruptor = true;
                topLeftCornerActivate();
                topRightCornerNeutral();
                bottomRightCornerNeutral();
                bottomLeftCornerActivate();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection des coins haut gauche et bas droit
            else if(cornerSelectorSelectionCounter == 10){
                cornerSelectorSelectionCounter++;
                topLeftCornerInteruptor = true;
                topRightCornerInteruptor = false;
                bottomRightCornerInteruptor = true;
                bottomLeftCornerInteruptor = false;
                topLeftCornerActivate();
                topRightCornerNeutral();
                bottomRightCornerActivate();
                bottomLeftCornerNeutral();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection des coins haut droit et bas gauche
            else if(cornerSelectorSelectionCounter == 11){
                cornerSelectorSelectionCounter = 1;
                topLeftCornerInteruptor = false;
                topRightCornerInteruptor = true;
                bottomRightCornerInteruptor = false;
                bottomLeftCornerInteruptor = true;
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
            if(topLeftCornerInteruptor == false){
                topLeftCornerActivate();
                topLeftCornerInteruptor = true;
            }
            else{
                topLeftCornerNeutral();
                topLeftCornerInteruptor = false;           
            }
            RangeVisualChangeBeforeCornerSelection();
        })
        topRights[cornerModuleNumber].addEventListener("click", function(){
            if(topRightCornerInteruptor == false){
                topRightCornerActivate();
                topRightCornerInteruptor = true;
            }
            else{
                topRightCornerNeutral();
                topRightCornerInteruptor = false;
            }
            RangeVisualChangeBeforeCornerSelection();
        })
        bottomRights[cornerModuleNumber].addEventListener("click", function(){
            if(bottomRightCornerInteruptor == false){
                bottomRightCornerActivate();
                bottomRightCornerInteruptor = true;
            }
            else{
                bottomRightCornerNeutral();
                bottomRightCornerInteruptor = false;
            }
            RangeVisualChangeBeforeCornerSelection();
        })
        bottomLefts[cornerModuleNumber].addEventListener("click", function(){
            if(bottomLeftCornerInteruptor == false){
                bottomLeftCornerActivate();
                bottomLeftCornerInteruptor = true;
            }
            else{
                bottomLeftCornerNeutral();
                bottomLeftCornerInteruptor = false;
            }
            RangeVisualChangeBeforeCornerSelection();
        })


        //L'Event du range qui gere la courbure fonctionne en 3 étapes : 
        //1. intrinsequement, l'evenement recupere une valeur lié a l'element HTML d'interaction (input/btn)
        //2. effectue une condition pour chaques coins (4) avec les interuptor O/I associé au coin pour savoir- 
        //   -si il est inclus a la selection a modifié. Si le booleen est true, on change la valeur désiré dans la variable représentant le coin
        //3. si aucun coins n'est sélectionné mais que le range est utilisé, alors il y aura une selection auto de tout les bord (visuel et valeur)
        radiusRanges[cornerModuleNumber].addEventListener("input", function(){

            if(topLeftCornerInteruptor == true){
                cornerModuleList[cornerModuleNumber].topLeft = radiusRanges[cornerModuleNumber].value;
            }
            if(topRightCornerInteruptor == true){
                cornerModuleList[cornerModuleNumber].topRight = radiusRanges[cornerModuleNumber].value;
            }
            if(bottomRightCornerInteruptor == true){
                cornerModuleList[cornerModuleNumber].bottomRight = radiusRanges[cornerModuleNumber].value;
            }
            if(bottomLeftCornerInteruptor == true){
                cornerModuleList[cornerModuleNumber].bottomLeft = radiusRanges[cornerModuleNumber].value;
            }
            if((topLeftCornerInteruptor == false)&&(topRightCornerInteruptor == false)&&
            (bottomRightCornerInteruptor == false)&&(bottomLeftCornerInteruptor == false)){
                cornerSelectorSelectionCounter = 2;
                topLeftCornerInteruptor = true;
                topRightCornerInteruptor = true;
                bottomRightCornerInteruptor = true;
                bottomLeftCornerInteruptor = true;
                topLeftCornerActivate();
                topRightCornerActivate();
                bottomRightCornerActivate();
                bottomLeftCornerActivate();
                RangeVisualChangeBeforeCornerSelection();
            }
        })
    }
}

