//GESTION DES OPACITE
//4 tableaux qui contiennent l'ensemble des balises html lié a la gestion de l'opacité
let opacityHTMLButtons = document.getElementsByClassName("opacity-btn");
let opacityHTMLInsideButtons = document.getElementsByClassName("inside-opacity-btn");
let opacityHTMLRangeContainers = document.getElementsByClassName("opacity-range-container");
let opacityHTMLArrows = document.getElementsByClassName("opacity-range-container-arrow");
let opacityHTMLRanges = document.getElementsByClassName("opacity-range");

//représentation des parties spécifiques de la barre d'element, pour gerer leurs transformation
//en fonction des barres d'opacité et de leurs ouverture/fermeture.
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//borderContent est un tableau représentant les parties basses du module "border"
let borderContent = document.getElementsByClassName("border-content");
//boxRangeContainer est un tableau représentant les parties basses du module "Box"
let boxRangeContainer = document.getElementsByClassName("all-box-range-container");
//boxInset est un tableau qui représente les checkbox du module "box"
let boxInset = document.getElementsByClassName("box-inset-checkbox");


//variable qui représente le BODY du HTML
let bodyDetection = document.getElementsByTagName("body");
let body = bodyDetection[0];

//tableau contenant les objets représentant les boutons/ranges de gestion d'opacité
let opacityButtonList = [];

//création des objets représentant les boutons/ranges de gestion d'opacité
//également les fonction d'ouverture/fermeture lié au range d'opacité et leurs conteneurs
//et les fonction de traitement de l'opacité elle même
for(i=0; i<=opacityHTMLButtons.length-1; i++){
    
    //elementNum et la boucle qui suit permettent de définir le nombre de barre d'element
    //qui contient l'ensemble des module de modification des éléments
    let elementNum=1
    while(i+1>4*elementNum){
        elementNum++
    }

    //opacityNumber défini un numéro pour chaque range d'opacité
    let opacityNumber = i;
    //ajout des différentes infos nécessaire a chaque range d'opacité dans des objet, dans opacityButtonList
    opacityButtonList[i] =
        {
            opacityButton : opacityHTMLButtons[i],
            opacityInsideButton : opacityHTMLInsideButtons[i],
            opacityContainer : opacityHTMLRangeContainers[i],
            opacityArrow : opacityHTMLArrows[i],
            opacityRange : opacityHTMLRanges[i],
            opacityGate : false
        } 
    //différentes variables représentant les balises contenante ou adjacentes aux range d'opacité
    let actualArticle = opacityButtonList[opacityNumber].opacityButton.parentElement.parentElement.parentElement;   
    let actualArticleClass = actualArticle.className;
    let afterArticle = opacityButtonList[opacityNumber].opacityButton.parentElement.parentElement.parentElement.nextElementSibling;
    let afterArticleClass = afterArticle.className;
    //certaines condition permettant d'ajouté des infos aux range d'opacité de "border" et "box"
    //nécessaire pour changer dynamiquement le css en fonction de l'overture/fermeture des range
    if(actualArticleClass == "border"){
        opacityButtonList[i].content = borderContent[elementNum-1];
    }
    if(actualArticleClass == "box"){
        opacityButtonList[i].container = boxRangeContainer[elementNum-1];
        opacityButtonList[i].inset = boxInset[elementNum-1];
    }
    //fonction qui gere l'ouverture et la fermeture du range d'opacité  
    opacityButtonList[opacityNumber].opacityButton.addEventListener("click", function (){
        //ouverture du range
        if (opacityButtonList[opacityNumber].opacityGate == false){
            opacityButtonList[opacityNumber].opacityContainer.style.display = "block";
            opacityButtonList[opacityNumber].opacityGate = true;
            if(afterArticleClass == "hr-shader"){
                afterArticle.style.marginLeft = "-85.2px"; 
            }
            else if(afterArticleClass == "hr-radius"){
                afterArticle.style.marginLeft = "-85px"; 
            }
            else if(afterArticleClass == "hr-box"){
                afterArticle.style.marginLeft = "-75.9px";
                opacityButtonList[opacityNumber].content.style.marginTop = "-3px";
            }
            else if(afterArticleClass == "hr-trash-reset"){
                afterArticle.style.marginLeft = "-69px";
                opacityButtonList[opacityNumber].inset.style.top = "-23px";
            }

        }
        //fermeture du range
        else{
            opacityButtonList[opacityNumber].opacityContainer.style.display = "none";
            opacityButtonList[opacityNumber].opacityGate = false;
            afterArticle.style.marginLeft = "0px"; 
            if(afterArticleClass == "hr-box"){
                opacityButtonList[opacityNumber].content.style.marginTop = "0px";
            }
            if(afterArticleClass == "hr-trash-reset"){
                afterArticle.style.marginLeft = "0px";
                opacityButtonList[opacityNumber].inset.style.marginLeft = "6.8px";
                opacityButtonList[opacityNumber].inset.style.top = "0px";
            }
        }
    });
    //fonction qui gere l'opacité elle même et sa représentation dans le bouton d'ouverture de l'opacité
    opacityButtonList[opacityNumber].opacityRange.addEventListener("click", function(){
        let opacityValue = opacityButtonList[opacityNumber].opacityRange.value/100;
        let opacityRepre = Math.abs(Math.trunc(opacityValue*255)-255);
        opacityButtonList[opacityNumber].opacityInsideButton.style.backgroundColor = "rgb(" + opacityRepre + ", " + opacityRepre + ", " + opacityRepre + ")";
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log("opacity information");
        console.log(opacityButtonList[opacityNumber].opacityInsideButton.style.backgroundColor);
        console.log(opacityValue);
        console.log(opacityButtonList[opacityNumber].opacityRange.value);
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    })
}

//fonction lié au BODY, permettant fermeture des conteneur des range d'opacité
//quand l'utilisateur clique en dehors du HTML lié à ces derniers
body.addEventListener("click", function(e){
    for(i=0; i<=opacityHTMLButtons.length-1; i++){
        let afterArticle = opacityButtonList[i].opacityButton.parentElement.parentElement.parentElement.nextElementSibling;
        let afterArticleClass = afterArticle.className;
        if(((e.target != opacityButtonList[i].opacityRange)&&
        (e.target != opacityButtonList[i].opacityContainer)&&
        (e.target != opacityButtonList[i].opacityArrow)&&
        (e.target != opacityButtonList[i].opacityInsideButton)&&
        (e.target != opacityButtonList[i].opacityButton))&&
        (opacityButtonList[i].opacityGate == true)){
            opacityButtonList[i].opacityContainer.style.display = "none";
            opacityButtonList[i].opacityGate = false;
            afterArticle.style.marginLeft = "0px"; 
            if(afterArticleClass == "hr-box"){
                opacityButtonList[i].content.style.marginTop = "0px";
            }
            if(afterArticleClass == "hr-trash-reset"){
                afterArticle.style.marginLeft = "0px";
                opacityButtonList[i].inset.style.marginLeft = "6.8px";
                opacityButtonList[i].inset.style.top = "0px";
            }
            break;
        }
    }
})
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
//différentes variables qui représente le DOM des modules du shader sous forme de tableau
let shaderLists = document.getElementsByClassName("shader-list");
let shaderMoreButtons = document.getElementsByClassName("element-more-shader");
let shaderTrashButtons = document.getElementsByClassName("element-trash-shader");
let shaderColors = document.getElementsByClassName("shader-color");
let shaderRanges = document.getElementsByClassName("range-shader-placement");

//Tableau qui contiendra par la suite tout les shaders des différents modules element
let shaderModuleList = [];

//boucle qui permet de remplir le shaderModuleList d'objet representant chacun des module de shaders et leurs différentes valeurs
//déclaration d'evenement avec les element HTML d'interactions
for(i=0; i<= shaderLists.length-1; i++){
    //représente le nombre de module de shader
    let shaderModuleNumber = i;
    //représente le nombre de shaders différent dans un même module
    let shaderNumber = 1;
    //représente le shader selectionné (le shaderNumber selectionné)
    let shaderSelectNumber = 1;
    //permet de selectionner le range d'opacité lié au module de shader
    let opacityNumber = 1+(shaderModuleNumber*4);
    //crée un tableau qui va contenir les objets représentant les différents shaders d'un même module
    shaderModuleList[shaderModuleNumber] = [];
    //création de l'objet shader de base
    shaderModuleList[shaderModuleNumber][shaderNumber-1] = {
        placement : 100,
        color : {
                    hue : "#009DFF",
                    opacity : 100
                }
    }
    //représente le précedent shader selectionné dans la liste de shader du module, lors de la 
    let lastShader = shaderLists[shaderModuleNumber].options[shaderLists[shaderModuleNumber].selectedIndex].value;
    //représe
    let actualShader;
    //event de selection du shader dans la liste des shader dans chaque module
    shaderLists[shaderModuleNumber].addEventListener("click", changeListShadersNumber);
    function changeListShadersNumber(){
        actualShader = shaderLists[shaderModuleNumber].options[shaderLists[shaderModuleNumber].selectedIndex].value;
        if (lastShader != actualShader){
            shaderSelectNumber = shaderLists[shaderModuleNumber].options[shaderLists[shaderModuleNumber].selectedIndex].value;
            
            shaderRanges[shaderModuleNumber].value = shaderModuleList[shaderModuleNumber][shaderSelectNumber-1].placement;
            shaderColors[shaderModuleNumber].value = shaderModuleList[shaderModuleNumber][shaderSelectNumber-1].color.hue;

            let opacityValue = shaderModuleList[shaderModuleNumber][shaderSelectNumber-1].color.opacity/100;
            let opacityRepre = Math.abs(Math.trunc(opacityValue*255)-255);
            opacityButtonList[opacityNumber].opacityInsideButton.style.backgroundColor = "rgb(" + opacityRepre + ", " + opacityRepre + ", " + opacityRepre + ")";
            opacityButtonList[opacityNumber].opacityRange.value = shaderModuleList[shaderModuleNumber][shaderSelectNumber-1].color.opacity;
        }
        lastShader = shaderLists[shaderModuleNumber].options[shaderLists[shaderModuleNumber].selectedIndex].value;
    }
    //ajout d'un shader dans la liste des shader
    shaderMoreButtons[shaderModuleNumber].addEventListener("click", function(e){
        shaderNumber ++;
        shaderLists[shaderModuleNumber].innerHTML += '<option value="' + shaderNumber + '">' + shaderNumber + '</option>';
        shaderModuleList[shaderModuleNumber][shaderNumber-1] = {
            placement : 100,
            color : {
                        hue : "#009DFF",
                        opacity : 100
                    }
        }
    })

    shaderTrashButtons[shaderModuleNumber].addEventListener("click", function(e){
        if(shaderNumber > 1){
            shaderLists[shaderModuleNumber].removeChild(shaderLists[shaderModuleNumber].lastChild);
            shaderModuleList[shaderModuleNumber].pop();
            shaderNumber --;
        }
    })

    shaderRanges[shaderModuleNumber].addEventListener("input", function(){
        shaderModuleList[shaderModuleNumber][shaderSelectNumber-1].placement = shaderRanges[shaderModuleNumber].value;
    })
    shaderColors[shaderModuleNumber].addEventListener("input", function(){
        shaderModuleList[shaderModuleNumber][shaderSelectNumber-1].color.hue = shaderColors[shaderModuleNumber].value;
    })
    opacityButtonList[opacityNumber].opacityRange.addEventListener("input", function(){
        shaderModuleList[shaderModuleNumber][shaderSelectNumber-1].color.opacity = opacityButtonList[opacityNumber].opacityRange.value;
    })
}


//BOXSELECTOR///////////////////////////////////////////
let boxButtonRangeSelects = document.getElementsByClassName("box-select-range");
let boxInteruptorRangeSelects = document.getElementsByClassName("box-select-range-interuptor");


for(i=0; i<=boxButtonRangeSelects.length-1; i++){
    let interuptor = false;
    let boxButtonNumber = i;
    boxButtonRangeSelects[boxButtonNumber].addEventListener('click', function(){
        if(interuptor == false){
            boxInteruptorRangeSelects[boxButtonNumber].style.marginLeft = "10px";
            interuptor = true;
        }
        else{
            boxInteruptorRangeSelects[boxButtonNumber].style.marginLeft = "-1px"; 
            interuptor = false;
        }
})
}
let elements = document.getElementsByClassName("html-element");
let idNames = document.getElementsByClassName("text-id");
let colors = document.getElementsByClassName("color-element-input");
let shaders = document.getElementsByClassName("shader");
let radiusS = document.getElementsByClassName("radius");
let borders = document.getElementsByClassName("border");
let boxs = document.getElementsByClassName("box");

let elementList  = [];

for (i=0; i<=elements.length-1; i++){
    let elementNumber = i;
    let opacityNumber = elementNumber*4;

    elementList[elementNumber] = 
    {
        id : idNames[elementNumber].value,
        color : 
        {
            hue : colors[elementNumber].value,
            opacity : opacityButtonList[opacityNumber].opacityRange.value
        },
        shader : shaderModuleList[elementNumber]
    }
}