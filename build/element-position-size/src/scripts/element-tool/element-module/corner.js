//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CORNER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
function createCorner(){
    //boucle qui contient l'ensemble des regles de représentations graphiques de l'outil de selection de coins
    for(i=0; i<= elements.length-1; i++){
        //represente le nombre de modules de corner (1 pour chaque module d'element)
        let cornerModNum = i;
        //objet contenant les informations sur les element de selection du module
        cornerIFList[cornerModNum] = {
            //représente l'état futur de l'element de selection des coins
            cornerSelectorSelectionCounter : 1,
            //4 variables représentant l'état d'activation (O/I) des boutons de coin du selecteur de coin
            CornerInteruptorTL : false,
            CornerInteruptorTR : false,
            CornerInteruptorBR : false,
            CornerInteruptorBL : false
        }

        //objet qui contient les valeurs de courbure pour les 4 coins de l'element ciblé
        cornerModList[cornerModNum] = {
            topLeft : 0,
            topRight : 0,
            bottomRight : 0,
            bottomLeft : 0
        }

        //RangeVisualChangeBeforeCornerSelection :
        //fonction permettant la mise à jour visuel du range de selection de la valeur de la courbure, en fonctions des coins séléctionné
        function RangeVisualChangeBeforeCornerSelection(){
            visualChgtCorner(
                cornerIFList[cornerModNum].CornerInteruptorTL, cornerIFList[cornerModNum].CornerInteruptorTR,
                cornerIFList[cornerModNum].CornerInteruptorBR , cornerIFList[cornerModNum].CornerInteruptorBL,

                cornerModList[cornerModNum].topLeft, cornerModList[cornerModNum].topRight, 
                cornerModList[cornerModNum].bottomRight, cornerModList[cornerModNum].bottomLeft, 

                radiusRanges[cornerModNum]
            )
        }

        //suite de fonction qui s'activerons dans les EVENT qui leurs succede, 
        //elles permettent +/- l'attribut HTML correspondant a un selecteur de coin activé ou non
        //ce sont des fonction permettant un feed-back visuel a l'utilisateur, et non pas de modifié directement les valeurs des coins 
        //neutral = visuel des bords non sélectionné, activate = visuel des bords sélectionné
        function topLeftCornerActivate(){
            topLefts[cornerModNum].setAttribute("active","");
        }
        function topRightCornerActivate(){
            topRights[cornerModNum].setAttribute("active","");  
        }
        function bottomRightCornerActivate(){
            bottomRights[cornerModNum].setAttribute("active","");
        }
        function bottomLeftCornerActivate(){
            bottomLefts[cornerModNum].setAttribute("active","");
        }
        function topLeftCornerNeutral(){
            topLefts[cornerModNum].removeAttribute("active");
        }
        function topRightCornerNeutral(){
            topRights[cornerModNum].removeAttribute("active");
        }
        function bottomRightCornerNeutral(){
            bottomRights[cornerModNum].removeAttribute("active");
        }
        function bottomLeftCornerNeutral(){
            bottomLefts[cornerModNum].removeAttribute("active"); 
        }

        //Evenement lié au bouton de selection des coins (bouton-central du selecteur de coins)
        //a chaque nouveau clique une nouvelle selection de coin est faite,
        //il y a 11 selections différentes qui se succede
        //l'evenement utilise : 
        //les fonction neutral/active pour chgmt grahique et 
        //les variables interuptors (o/i) pour validé ou non la possibilité de modification des coins  
        cornerSelects[cornerModNum].addEventListener("click", function(e){
            //selection de tout les coins
            if(cornerIFList[cornerModNum].cornerSelectorSelectionCounter == 1){
                cornerIFList[cornerModNum].cornerSelectorSelectionCounter++;
                cornerIFList[cornerModNum].CornerInteruptorTL = true;
                cornerIFList[cornerModNum].CornerInteruptorTR = true;
                cornerIFList[cornerModNum].CornerInteruptorBR = true;
                cornerIFList[cornerModNum].CornerInteruptorBL = true;
                topLeftCornerActivate();
                topRightCornerActivate();
                bottomRightCornerActivate();
                bottomLeftCornerActivate();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection du coin supérieur gauche
            else if(cornerIFList[cornerModNum].cornerSelectorSelectionCounter == 2){
                cornerIFList[cornerModNum].cornerSelectorSelectionCounter++;
                cornerIFList[cornerModNum].CornerInteruptorTL = true;
                cornerIFList[cornerModNum].CornerInteruptorTR = false;
                cornerIFList[cornerModNum].CornerInteruptorBR = false;
                cornerIFList[cornerModNum].CornerInteruptorBL = false;
                topLeftCornerActivate();
                topRightCornerNeutral();
                bottomRightCornerNeutral();
                bottomLeftCornerNeutral();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection du coin supérieur droit
            else if(cornerIFList[cornerModNum].cornerSelectorSelectionCounter == 3){
                cornerIFList[cornerModNum].cornerSelectorSelectionCounter++;
                cornerIFList[cornerModNum].CornerInteruptorTL = false;
                cornerIFList[cornerModNum].CornerInteruptorTR = true;
                cornerIFList[cornerModNum].CornerInteruptorBR = false;
                cornerIFList[cornerModNum].CornerInteruptorBL = false;
                topLeftCornerNeutral();
                topRightCornerActivate();
                bottomRightCornerNeutral();
                bottomLeftCornerNeutral();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection du coin inférieur droit
            else if(cornerIFList[cornerModNum].cornerSelectorSelectionCounter == 4){
                cornerIFList[cornerModNum].cornerSelectorSelectionCounter++;
                cornerIFList[cornerModNum].CornerInteruptorTL = false;
                cornerIFList[cornerModNum].CornerInteruptorTR = false;
                cornerIFList[cornerModNum].CornerInteruptorBR = true;
                cornerIFList[cornerModNum].CornerInteruptorBL = false;
                topLeftCornerNeutral();
                topRightCornerNeutral();
                bottomRightCornerActivate();
                bottomLeftCornerNeutral();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection du coin inférieur gauche
            else if(cornerIFList[cornerModNum].cornerSelectorSelectionCounter == 5){
                cornerIFList[cornerModNum].cornerSelectorSelectionCounter++;
                cornerIFList[cornerModNum].CornerInteruptorTL = false;
                cornerIFList[cornerModNum].CornerInteruptorTR = false;
                cornerIFList[cornerModNum].CornerInteruptorBR = false;
                cornerIFList[cornerModNum].CornerInteruptorBL = true;
                topLeftCornerNeutral();
                topRightCornerNeutral();
                bottomRightCornerNeutral();
                bottomLeftCornerActivate();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection des coins supérieurs
            else if(cornerIFList[cornerModNum].cornerSelectorSelectionCounter == 6){
                cornerIFList[cornerModNum].cornerSelectorSelectionCounter++;
                cornerIFList[cornerModNum].CornerInteruptorTL = true;
                cornerIFList[cornerModNum].CornerInteruptorTR = true;
                cornerIFList[cornerModNum].CornerInteruptorBR = false;
                cornerIFList[cornerModNum].CornerInteruptorBL = false;
                topLeftCornerActivate();
                topRightCornerActivate();
                bottomRightCornerNeutral();
                bottomLeftCornerNeutral();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection des coins droits
            else if(cornerIFList[cornerModNum].cornerSelectorSelectionCounter == 7){
                cornerIFList[cornerModNum].cornerSelectorSelectionCounter++;
                cornerIFList[cornerModNum].CornerInteruptorTL = false;
                cornerIFList[cornerModNum].CornerInteruptorTR = true;
                cornerIFList[cornerModNum].CornerInteruptorBR = true;
                cornerIFList[cornerModNum].CornerInteruptorBL = false;
                topLeftCornerNeutral();
                topRightCornerActivate();
                bottomRightCornerActivate();
                bottomLeftCornerNeutral();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection des coins inférieurs
            else if(cornerIFList[cornerModNum].cornerSelectorSelectionCounter == 8){
                cornerIFList[cornerModNum].cornerSelectorSelectionCounter++;
                cornerIFList[cornerModNum].CornerInteruptorTL = false;
                cornerIFList[cornerModNum].CornerInteruptorTR = false;
                cornerIFList[cornerModNum].CornerInteruptorBR = true;
                cornerIFList[cornerModNum].CornerInteruptorBL = true;
                topLeftCornerNeutral();
                topRightCornerNeutral();
                bottomRightCornerActivate();
                bottomLeftCornerActivate();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection des coins gauches
            else if(cornerIFList[cornerModNum].cornerSelectorSelectionCounter == 9){
                cornerIFList[cornerModNum].cornerSelectorSelectionCounter++;
                cornerIFList[cornerModNum].CornerInteruptorTL = true;
                cornerIFList[cornerModNum].CornerInteruptorTR = false;
                cornerIFList[cornerModNum].CornerInteruptorBR = false;
                cornerIFList[cornerModNum].CornerInteruptorBL = true;
                topLeftCornerActivate();
                topRightCornerNeutral();
                bottomRightCornerNeutral();
                bottomLeftCornerActivate();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection des coins haut gauche et bas droit
            else if(cornerIFList[cornerModNum].cornerSelectorSelectionCounter == 10){
                cornerIFList[cornerModNum].cornerSelectorSelectionCounter++;
                cornerIFList[cornerModNum].CornerInteruptorTL = true;
                cornerIFList[cornerModNum].CornerInteruptorTR = false;
                cornerIFList[cornerModNum].CornerInteruptorBR = true;
                cornerIFList[cornerModNum].CornerInteruptorBL = false;
                topLeftCornerActivate();
                topRightCornerNeutral();
                bottomRightCornerActivate();
                bottomLeftCornerNeutral();
                RangeVisualChangeBeforeCornerSelection();
            }
            //selection des coins haut droit et bas gauche
            else if(cornerIFList[cornerModNum].cornerSelectorSelectionCounter == 11){
                cornerIFList[cornerModNum].cornerSelectorSelectionCounter = 1;
                cornerIFList[cornerModNum].CornerInteruptorTL = false;
                cornerIFList[cornerModNum].CornerInteruptorTR = true;
                cornerIFList[cornerModNum].CornerInteruptorBR = false;
                cornerIFList[cornerModNum].CornerInteruptorBL = true;
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
        topLefts[cornerModNum].addEventListener("click", function(){
            if(cornerIFList[cornerModNum].CornerInteruptorTL == false){
                topLeftCornerActivate();
                cornerIFList[cornerModNum].CornerInteruptorTL = true;
            }
            else{
                topLeftCornerNeutral();
                cornerIFList[cornerModNum].CornerInteruptorTL = false;           
            }
            RangeVisualChangeBeforeCornerSelection();
        })
        topRights[cornerModNum].addEventListener("click", function(){
            if(cornerIFList[cornerModNum].CornerInteruptorTR == false){
                topRightCornerActivate();
                cornerIFList[cornerModNum].CornerInteruptorTR = true;
            }
            else{
                topRightCornerNeutral();
                cornerIFList[cornerModNum].CornerInteruptorTR = false;
            }
            RangeVisualChangeBeforeCornerSelection();
        })
        bottomRights[cornerModNum].addEventListener("click", function(){
            if(cornerIFList[cornerModNum].CornerInteruptorBR == false){
                bottomRightCornerActivate();
                cornerIFList[cornerModNum].CornerInteruptorBR = true;
            }
            else{
                bottomRightCornerNeutral();
                cornerIFList[cornerModNum].CornerInteruptorBR = false;
            }
            RangeVisualChangeBeforeCornerSelection();
        })
        bottomLefts[cornerModNum].addEventListener("click", function(){
            if(cornerIFList[cornerModNum].CornerInteruptorBL == false){
                bottomLeftCornerActivate();
                cornerIFList[cornerModNum].CornerInteruptorBL = true;
            }
            else{
                bottomLeftCornerNeutral();
                cornerIFList[cornerModNum].CornerInteruptorBL = false;
            }
            RangeVisualChangeBeforeCornerSelection();
        })


        //L'Event du range qui gere la courbure fonctionne en 3 étapes : 
        //1. intrinsequement, l'evenement recupere une valeur lié a l'element HTML d'interaction (input/btn)
        //2. effectue une condition pour chaques coins (4) avec les interuptor O/I associé au coin pour savoir- 
        //   -si il est inclus a la selection a modifié. Si le booleen est true, on change la valeur désiré dans la variable représentant le coin
        //3. si aucun coins n'est sélectionné mais que le range est utilisé, alors il y aura une selection auto de tout les bord (visuel et valeur)
        radiusRanges[cornerModNum].addEventListener("input", function(){

            if(cornerIFList[cornerModNum].CornerInteruptorTL == true){
                cornerModList[cornerModNum].topLeft = radiusRanges[cornerModNum].value;
            }
            if(cornerIFList[cornerModNum].CornerInteruptorTR == true){
                cornerModList[cornerModNum].topRight = radiusRanges[cornerModNum].value;
            }
            if(cornerIFList[cornerModNum].CornerInteruptorBR == true){
                cornerModList[cornerModNum].bottomRight = radiusRanges[cornerModNum].value;
            }
            if(cornerIFList[cornerModNum].CornerInteruptorBL == true){
                cornerModList[cornerModNum].bottomLeft = radiusRanges[cornerModNum].value;
            }
            if((cornerIFList[cornerModNum].CornerInteruptorTL == false)&&(cornerIFList[cornerModNum].CornerInteruptorTR == false)&&
            (cornerIFList[cornerModNum].CornerInteruptorBR == false)&&(cornerIFList[cornerModNum].CornerInteruptorBL == false)){
                cornerIFList[cornerModNum].cornerSelectorSelectionCounter = 2;
                cornerIFList[cornerModNum].CornerInteruptorTL = true;
                cornerIFList[cornerModNum].CornerInteruptorTR = true;
                cornerIFList[cornerModNum].CornerInteruptorBR = true;
                cornerIFList[cornerModNum].CornerInteruptorBL = true;
                topLeftCornerActivate();
                topRightCornerActivate();
                bottomRightCornerActivate();
                bottomLeftCornerActivate();
                RangeVisualChangeBeforeCornerSelection();
            }
            corner(cornerModNum);
        })
    }
}



