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

let backgroundColorActivate = "rgba(0, 110, 255, 0.22)";
let backgroundColorNeutral = "rgba(255, 255, 255, 0)";

let cornerMarginNeutral = "2px";
let cornerMarginActivate = "1.8px";

let cornerModuleList = [];

//boucle qui contient l'ensemble des regles de représentations graphiques de l'outil de selection de coins
for(i=0; i<= cornerSelectors.length-1; i++){
    let cornerSelectorsNumber = i;
    let cornerSelectorSelectionCounter = 1;

    cornerModuleList[cornerSelectorsNumber] = {
        topLeft : 0,
        topRight : 0,
        bottomRight : 0,
        bottomLeft : 0
    }
    //suite de fonction qui s'activerons dans l'evenement qui suis, leurs nom définie ce qu'elle font, d'un point de vue graphique
    function topLeftActivation(){
        topLefts[cornerSelectorsNumber].style.borderTop = borderActivate;
        topLefts[cornerSelectorsNumber].style.borderLeft = borderActivate;
        topLefts[cornerSelectorsNumber].style.boxShadow = boxShadowActivate;
        topLefts[cornerSelectorsNumber].style.backgroundColor = backgroundColorActivate;
        topLefts[cornerSelectorsNumber].style.marginBottom = cornerMarginActivate;
        topLefts[cornerSelectorsNumber].style.marginRight = cornerMarginActivate;
    }
    function topRightActivation(){
        topRights[cornerSelectorsNumber].style.borderTop = borderActivate;
        topRights[cornerSelectorsNumber].style.borderRight = borderActivate;
        topRights[cornerSelectorsNumber].style.boxShadow = boxShadowActivate;
        topRights[cornerSelectorsNumber].style.backgroundColor = backgroundColorActivate;
        topRights[cornerSelectorsNumber].style.marginBottom = cornerMarginActivate;
        topRights[cornerSelectorsNumber].style.marginLeft = cornerMarginActivate;   
    }
    function bottomRightActivation(){
        bottomRights[cornerSelectorsNumber].style.borderBottom = borderActivate;
        bottomRights[cornerSelectorsNumber].style.borderRight = borderActivate;
        bottomRights[cornerSelectorsNumber].style.boxShadow = boxShadowActivate;
        bottomRights[cornerSelectorsNumber].style.backgroundColor = backgroundColorActivate;
        bottomRights[cornerSelectorsNumber].style.marginTop = cornerMarginActivate;
        bottomRights[cornerSelectorsNumber].style.marginLeft = cornerMarginActivate;
    }
    function bottomLeftActivation(){
        bottomLefts[cornerSelectorsNumber].style.borderBottom = borderActivate;
        bottomLefts[cornerSelectorsNumber].style.borderLeft = borderActivate;
        bottomLefts[cornerSelectorsNumber].style.boxShadow = boxShadowActivate;
        bottomLefts[cornerSelectorsNumber].style.backgroundColor = backgroundColorActivate;
        bottomLefts[cornerSelectorsNumber].style.marginTop = cornerMarginActivate;
        bottomLefts[cornerSelectorsNumber].style.marginRight = cornerMarginActivate;
    }
    function topLeftNeutral(){
        topLefts[cornerSelectorsNumber].style.borderTop = borderNeutral;
        topLefts[cornerSelectorsNumber].style.borderLeft = borderNeutral;
        topLefts[cornerSelectorsNumber].style.boxShadow = boxShadowNeutral;
        topLefts[cornerSelectorsNumber].style.backgroundColor = backgroundColorNeutral;
        topLefts[cornerSelectorsNumber].style.marginBottom = cornerMarginNeutral;
        topLefts[cornerSelectorsNumber].style.marginRight = cornerMarginNeutral;
    }
    function topRightNeutral(){
        topRights[cornerSelectorsNumber].style.borderTop = borderNeutral;
        topRights[cornerSelectorsNumber].style.borderRight = borderNeutral;
        topRights[cornerSelectorsNumber].style.boxShadow = boxShadowNeutral;
        topRights[cornerSelectorsNumber].style.backgroundColor = backgroundColorNeutral;
        topRights[cornerSelectorsNumber].style.marginBottom = cornerMarginNeutral;
        topRights[cornerSelectorsNumber].style.marginLeft = cornerMarginNeutral;
    }
    function bottomRightNeutral(){
        bottomRights[cornerSelectorsNumber].style.borderBottom = borderNeutral;
        bottomRights[cornerSelectorsNumber].style.borderRight = borderNeutral;
        bottomRights[cornerSelectorsNumber].style.boxShadow = boxShadowNeutral;
        bottomRights[cornerSelectorsNumber].style.backgroundColor = backgroundColorNeutral;
        bottomRights[cornerSelectorsNumber].style.marginTop = cornerMarginNeutral;
        bottomRights[cornerSelectorsNumber].style.marginLeft = cornerMarginNeutral;
    }
    function bottomLeftNeutral(){
        bottomLefts[cornerSelectorsNumber].style.borderBottom = borderNeutral;
        bottomLefts[cornerSelectorsNumber].style.borderLeft = borderNeutral;
        bottomLefts[cornerSelectorsNumber].style.boxShadow = boxShadowNeutral;
        bottomLefts[cornerSelectorsNumber].style.backgroundColor = backgroundColorNeutral;
        bottomLefts[cornerSelectorsNumber].style.marginTop = cornerMarginNeutral;
        bottomLefts[cornerSelectorsNumber].style.marginRight = cornerMarginNeutral; 
    }
    //Evenement lié au bouton de selection des coins
    cornerSelects[cornerSelectorsNumber].addEventListener("click", function(e){
        //selection du coin supérieur gauche
        if(cornerSelectorSelectionCounter == 1){
            cornerSelectorSelectionCounter++;
            topLeftActivation();
            topRightNeutral();
            bottomRightNeutral();
            bottomLeftNeutral();
        }
        //selection du coin supérieur droit
        else if(cornerSelectorSelectionCounter == 2){
            cornerSelectorSelectionCounter++;
            topLeftNeutral();
            topRightActivation();
        }
        //selection du coin inférieur droit
        else if(cornerSelectorSelectionCounter == 3){
            cornerSelectorSelectionCounter++;
            topRightNeutral();
            bottomRightActivation();
        }
        //selection du coin inférieur gauche
        else if(cornerSelectorSelectionCounter == 4){
            cornerSelectorSelectionCounter++;
            bottomRightNeutral();
            bottomLeftActivation()
        }
        //selection de tout les coins en même temps
        else if(cornerSelectorSelectionCounter == 5){
            cornerSelectorSelectionCounter = 1;
            topLeftActivation();
            topRightActivation();
            bottomRightActivation();
        }
    })
}