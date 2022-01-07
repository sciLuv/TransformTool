//BORDER/////////////////////////////////////////////////////////////
//Représentation de l'outil HTML de selection des bordures
let borderSelectors = document.getElementsByClassName("border-select");
//Représentation des différentes parties HTML de l'outil de selection des bordures
let topBorderSelectors = document.getElementsByClassName("border-top");
let leftBorderSelectors = document.getElementsByClassName("border-left");
let rightBorderSelectors = document.getElementsByClassName("border-right");
let bottomBorderSelectors = document.getElementsByClassName("border-bottom");
//représentation du bouton de selection des bordures
let borderSelects = document.getElementsByClassName("all-borders");

let borderNeutral = "solid #8d8d8d 0.8px";
let boxShadowNeutral = "0px 0px 0px 0px rgba(0, 0, 0, 0)";

let borderActivate = "solid rgb(0, 80, 255) 1px";
let boxShadowActivate = "0px 0px 5px 3px rgba(0, 110, 255, 0.22)";

let borderMarginNeutral = "4px";
let borderMarginActivate = "3.8px";

//boucle qui contient l'ensemble des regles de représentations graphiques de l'outil de selection de bordure
for(i=0; i<= borderSelectors.length-1; i++){
    let borderSelectorsNumber = i;
    let borderSelectorSelectionCounter = 1;
    //suite de fonction qui s'activerons dans l'evenement qui suis, leurs nom définie ce qu'elle font, d'un point de vue graphique
    function topBorderActivate(){
        topBorderSelectors[borderSelectorsNumber].style.borderTop = borderActivate;
        topBorderSelectors[borderSelectorsNumber].style.boxShadow = boxShadowActivate;
    };
    function bottomBorderActivate(){
        bottomBorderSelectors[borderSelectorsNumber].style.borderBottom = borderActivate;
        bottomBorderSelectors[borderSelectorsNumber].style.boxShadow = boxShadowActivate;
    };
    function leftBorderActivate(){
        leftBorderSelectors[borderSelectorsNumber].style.borderLeft = borderActivate;
        leftBorderSelectors[borderSelectorsNumber].style.boxShadow = boxShadowActivate;
        leftBorderSelectors[borderSelectorsNumber].style.marginRight = borderMarginActivate; 
    };
    function rightBorderActivate(){
        rightBorderSelectors[borderSelectorsNumber].style.borderRight = borderActivate;
        rightBorderSelectors[borderSelectorsNumber].style.boxShadow = boxShadowActivate;
        rightBorderSelectors[borderSelectorsNumber].style.marginLeft = borderMarginActivate;
    }
    function topBorderNeutral(){
        topBorderSelectors[borderSelectorsNumber].style.borderTop = borderNeutral;
        topBorderSelectors[borderSelectorsNumber].style.boxShadow = boxShadowNeutral;
    };
    function bottomBorderNeutral(){
        bottomBorderSelectors[borderSelectorsNumber].style.borderBottom = borderNeutral;
        bottomBorderSelectors[borderSelectorsNumber].style.boxShadow = boxShadowNeutral;
    };
    function leftBorderNeutral(){
        leftBorderSelectors[borderSelectorsNumber].style.borderLeft = borderNeutral;
        leftBorderSelectors[borderSelectorsNumber].style.boxShadow = boxShadowNeutral;
        leftBorderSelectors[borderSelectorsNumber].style.marginRight = borderMarginNeutral;
    };
    function rightBorderNeutral(){
        rightBorderSelectors[borderSelectorsNumber].style.borderRight = borderNeutral;
        rightBorderSelectors[borderSelectorsNumber].style.boxShadow = boxShadowNeutral;
        rightBorderSelectors[borderSelectorsNumber].style.marginLeft = borderMarginNeutral;
    }
    //Evenement lié au bouton de selection des bordures
    borderSelects[borderSelectorsNumber].addEventListener("click", function(e){
        //selection de la bordure supérieur
        if(borderSelectorSelectionCounter == 1){
            borderSelectorSelectionCounter++
            rightBorderNeutral();
            bottomBorderNeutral();
            leftBorderNeutral();
            topBorderActivate();
            borderSelects[borderSelectorsNumber].style.top = "-0.1px";
        }
        //selection de la bordure droite 
        else if(borderSelectorSelectionCounter == 2){
            borderSelectorSelectionCounter++
            topBorderNeutral();
            rightBorderActivate();
            borderSelects[borderSelectorsNumber].style.top = "0px";
        }
        //selection de la bordure inférieur
        else if(borderSelectorSelectionCounter == 3){
            borderSelectorSelectionCounter++
            rightBorderNeutral();
            bottomBorderActivate();
            borderSelects[borderSelectorsNumber].style.top = "0.1px";
        }
        //selection de la bordure gauche
        else if(borderSelectorSelectionCounter == 4){
            borderSelectorSelectionCounter++
            bottomBorderNeutral();
            leftBorderActivate();
            borderSelects[borderSelectorsNumber].style.top = "0px";
        }
        //selection de toutes les bordures ensembles
        else if(borderSelectorSelectionCounter == 5){
            borderSelectorSelectionCounter=1
            topBorderActivate();
            rightBorderActivate();
            bottomBorderActivate();
        }
    })
}
