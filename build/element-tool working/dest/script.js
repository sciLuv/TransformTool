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
//shaderGradientContainer est un tableau représentant la partie basse gauche du module "shader"
let shaderGradientContainer = document.getElementsByClassName("gradient-degree-selection-section")

//variable qui représente le BODY du HTML
let bodyDetection = document.getElementsByTagName("body");
let body = bodyDetection[0];

//tableau contenant les objets représentant les boutons/ranges de gestion d'opacité
let opacityButtonList = [];

//création des objets représentant les boutons/ranges de gestion d'opacité
//également les fonction d'ouverture/fermeture lié au range d'opacité et leurs conteneurs
//et les fonction de traitement de l'opacité elle même
for(i=0; i<=opacityHTMLButtons.length-1; i++){
    console.log("~~~~~~~~OPACITY-LENGHT~~~~~~~~~~~~~~");
    console.log(opacityHTMLButtons.length);
    //elementNum et la boucle qui suit permettent de définir le nombre de barre d'element
    //qui contient l'ensemble des module de modification des éléments
    let elementNum=1;
    while(i+1>4*elementNum){
        elementNum++
    }
    console.log("elementNum");
    console.log(elementNum);
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

                shaderGradientContainer[elementNum-1].style.marginTop = "-3.5px";
            }
            else if(afterArticleClass == "hr-box"){
                afterArticle.style.marginLeft = "-75.9px";
                opacityButtonList[opacityNumber].content.style.marginTop = "-3px";
            }
            else if(afterArticleClass == "hr-image-text-trash-reset"){
                afterArticle.style.marginLeft = "-69px";
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
            if(afterArticleClass == "hr-image-text-trash-reset"){
                afterArticle.style.marginLeft = "0px";
            }
            if(afterArticleClass == "hr-radius"){
                shaderGradientContainer[elementNum-1].style.marginTop = "1px";
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
        let elementNum=1;
        while(i+1>4*elementNum){
            elementNum++
        }
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
            if(afterArticleClass == "hr-radius"){
                shaderGradientContainer[elementNum-1].style.marginTop = "1px";
            }
            if(afterArticleClass == "hr-box"){
                opacityButtonList[i].content.style.marginTop = "0px";
            }
            if(afterArticleClass == "hr-image-text-trash-reset"){
                afterArticle.style.marginLeft = "0px";
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



//différentes variables qui représente le DOM des modules du shader sous forme de tableau
let shaderLists = document.getElementsByClassName("shader-list");
let shaderMoreBtns = document.getElementsByClassName("element-more-shader");
let shaderTrashBtns = document.getElementsByClassName("element-trash-shader");
let shaderColors = document.getElementsByClassName("shader-color");
let shaderRanges = document.getElementsByClassName("range-shader-placement");

//tableaux des représentation JS des elements HTML lié au bouton de selection du type de gradient (lineaire, radial)
//tableau des boutons eux même
let selectGradients = document.getElementsByClassName("shader-select-gradient");
//tableau des interupteurs a l'interieur du bouton
let interuptorSelectGradients = document.getElementsByClassName("shader-select-gradient-interuptor");

//tableau des bouton permettant selection des degrés des gradient lineaire
let degreeButtons = document.getElementsByClassName("degree-radiant-btn");

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
        placement : 0,
        gradient : "linear",
        degree : 0,
        color : {
                    hue : "#FFA200",
                    opacity : 100
                }
    }
    //fonction de changement visuel des element de selection du shader en fonction du shader du module selectionné dans la liste
    function visualChangeBeforeListSelection(val, opacity){
        //changement visuel du range de placement et du bouton de selection de couleur
        shaderRanges[shaderModuleNumber].value = shaderModuleList[shaderModuleNumber][val].placement;
        shaderColors[shaderModuleNumber].value = shaderModuleList[shaderModuleNumber][val].color.hue;
        //changement visuel du range d'opacité et du range de selection d'opacité
        let opacityRepre = Math.abs(Math.trunc((shaderModuleList[shaderModuleNumber][val].color.opacity/100)*255)-255);
        opacityButtonList[opacity].opacityInsideButton.style.backgroundColor = "rgb(" + opacityRepre + ", " + opacityRepre + ", " + opacityRepre + ")";
        opacityButtonList[opacity].opacityRange.value = shaderModuleList[shaderModuleNumber][val].color.opacity;
    }
    
    //event de selection du shader dans la liste des shader dans chaque module
    shaderLists[shaderModuleNumber].addEventListener("click", changeListShadersNumber);
    function changeListShadersNumber(){
        //active la fonction si l'option selectionné est différente de celle qui l'est déjà
        if (shaderSelectNumber != shaderLists[shaderModuleNumber].options[shaderLists[shaderModuleNumber].selectedIndex].value){

            //supression et attribution a un nouvel element HTML option de l'attribut "select" de la liste de selection HTML
            shaderLists[shaderModuleNumber].children[shaderSelectNumber-1].removeAttribute("selected");
            shaderSelectNumber = shaderLists[shaderModuleNumber].options[shaderLists[shaderModuleNumber].selectedIndex].value;
            shaderLists[shaderModuleNumber].children[shaderSelectNumber-1].setAttribute("selected", "");      
            
            //fonction de changement visuel du module shader (permet de correspondre au shader selectionné)
            let val= shaderSelectNumber-1, opacity = opacityNumber;
            visualChangeBeforeListSelection(val, opacity);
            
        }

    }
    //ajout d'un shader dans la liste des shader d'un module
    shaderMoreBtns[shaderModuleNumber].addEventListener("click", function(e){
        //ajout d'un shader dans le "compteur de shader" pour ensuite construire l'element html qui le representera
        shaderNumber ++;
        shaderLists[shaderModuleNumber].innerHTML += '<option value="' + shaderNumber + '">' + shaderNumber + '</option>';
        //suppression et ajout de l'attribut selected de l'option HTML de selection du shader
        shaderLists[shaderModuleNumber].children[shaderSelectNumber-1].removeAttribute("selected");
        shaderLists[shaderModuleNumber].children[shaderNumber-1].setAttribute("selected", "");
        //creation de l'objet représentant le nouveau shader
        shaderSelectNumber = shaderNumber;
        shaderModuleList[shaderModuleNumber][shaderNumber-1] = {
            placement : 100,
            color : {
                        hue : "#FFA200",
                        opacity : 100
                    }
        }

        //fonction de changement visuel du module shader (permet de correspondre au shader selectionné)
        let val= shaderNumber-1, opacity = opacityNumber;
        visualChangeBeforeListSelection(val, opacity);
    })
    
    //suppression d'un shader dans la liste des shader d'un module
    shaderTrashBtns[shaderModuleNumber].addEventListener("click", function(e){
        if(shaderNumber > 1){
            shaderLists[shaderModuleNumber].removeChild(shaderLists[shaderModuleNumber][shaderSelectNumber-1]);
            shaderModuleList[shaderModuleNumber].splice(shaderSelectNumber-1, 1)

            //boucle pour remplacer les elements HTML qui représente les shaders précédent celui supprimé, pour leurs assigné leur nouveau numéro
            for(i=shaderSelectNumber-1; i<=shaderLists[shaderModuleNumber].length-1; i++){
                shaderLists[shaderModuleNumber][i].innerHTML = i+1;
                shaderLists[shaderModuleNumber][i].setAttribute("value", i+1);
            }
            //selection du shader inférieur a celui supprimé apres sa suppression 
            if(shaderSelectNumber-2 >= 0){
                shaderNumber --;
                shaderLists[shaderModuleNumber][shaderSelectNumber-2].setAttribute("selected", "");
                shaderSelectNumber = shaderSelectNumber-1; 
            }
            //quand le shader supprimé est le premier de la liste, quelques regle différente pour que cela fonctionne
            else if(shaderSelectNumber-2 < 0){
                shaderNumber --;
                shaderLists[shaderModuleNumber][shaderSelectNumber-1].setAttribute("selected", "");
            }
            //force la selection de l'option correspondant au shaderSelectNumber
            shaderLists[shaderModuleNumber].selectedIndex = shaderSelectNumber-1;
            //partie de la fonction qui change la partie visuel 
            let val= shaderSelectNumber-1, opacity = opacityNumber;
            visualChangeBeforeListSelection(val, opacity);
        }
    })
    //event qui gere l'utilisation du range de placement des shaders
    shaderRanges[shaderModuleNumber].addEventListener("input", function(){
        shaderModuleList[shaderModuleNumber][shaderSelectNumber-1].placement = shaderRanges[shaderModuleNumber].value;
    })
    //event qui gere l'utilisation de l'input color des shaders
    shaderColors[shaderModuleNumber].addEventListener("input", function(){
        shaderModuleList[shaderModuleNumber][shaderSelectNumber-1].color.hue = shaderColors[shaderModuleNumber].value;
    })
    //event qui gere le range d'opacité des shaders
    opacityButtonList[opacityNumber].opacityRange.addEventListener("input", function(){
        shaderModuleList[shaderModuleNumber][shaderSelectNumber-1].color.opacity = opacityButtonList[opacityNumber].opacityRange.value;
    })


    //défini l'état du bouton de selection de gradient
    let interuptor = false;
    //Evenement qui gere le changement détat du bouton, permettant selection soi d'un gradient lineaire ou radial
    selectGradients[shaderModuleNumber].addEventListener('click', function(){
        //etat bouton definissant selection du gradient lineaire en JS et qui active le css pour changer le visuel du bouton en fonction
        if(interuptor == false){
            interuptorSelectGradients[shaderModuleNumber].setAttribute("active","");
            degreeButtons[shaderModuleNumber].removeAttribute("active");
            shaderModuleList[shaderModuleNumber][0].gradient = "radial";
            shaderModuleList[shaderModuleNumber][0].degree = undefined;
            interuptor = true;
        }
        //idem pour le gradient radial
        else{; 
            interuptorSelectGradients[shaderModuleNumber].removeAttribute("active");
            degreeButtons[shaderModuleNumber].setAttribute("active","");
            shaderModuleList[shaderModuleNumber][0].gradient = "linear";
            shaderModuleList[shaderModuleNumber][0].degree = degree;
            interuptor = false;
        }
    })

        //représente le numéro du bouton
        let buttonNumber = i;
        //représente les degrés, ici a leurs valeurs initial
        let degree = 0;
        //défini l'état du bouton 
        let degreeInteruptor = false;
        //mis au plus haut scope de la boucle car utilisé dans plusieurs fonction/evenement
        //permet de pouvoir comparé l'ancienne place de la souris avec la nouvelle et de crée le nouveau degrés
        let initialValue;
    
        //fonction permettant de calculer le nouveau degré
        //initialPlacementValue = relatif a initialValue, placementValue = placement suivant a InitialValue, degreeValue = valeur initial des degrè avant fonction.
        function calculDegree(initialPlacementValue, placementValue, degreeValue){
            let initialPlacement = initialPlacementValue, actualplacement = placementValue, degreeChange = degreeValue;
            let changementDegreeValue = (initialPlacement - actualplacement)*5;
        
            //changement de la valeur des degrés.
            degree += changementDegreeValue;
            //deux boucle permettant de rester dans l'interval de 360
            if (degree > 360){degree = degreeChange-360;}
            else if (degree < 0){degree = 360 - degreeChange;}
        
            //premet le changement visuel du bouton
            degreeButtons[buttonNumber].style.transform = "rotate(" + degree + "deg)";
            //ajout de la nouvelle valeur des degrés au premier objet du tableau des shader
            shaderModuleList[shaderModuleNumber][0].degree = degree;
            //mise a jour de la valeur initial du placement du curseur pour pouvoir répété la fonction. 
            initialValue = actualplacement;
    
            /*placer sans doute ici le code permettant d'ajouter*/
        }
        //evenement permettant d'initialisé une valeurs de placement de la souris lorsqu'on clique sur le bouton
        degreeButtons[buttonNumber].addEventListener('mousedown', function(event){
            if (degreeButtons[buttonNumber].hasAttribute("active")){
                degreeInteruptor = true;
                initialValue = event.clientY;
            }
        })
        //evement qui s'active lorsqu'on bouge la souris de haut en bas apres un clique qui n'est pas remonté
        body.addEventListener('mousemove', function(event){            
            if (degreeButtons[buttonNumber].hasAttribute("active")){
                let placement = event.clientY;
                if (degreeInteruptor == true){
                    beginCalculDegree = setInterval(calculDegree(initialValue, placement, degree), 200);
                }
            }
        })
        //evenement qui s'active lorsqu'on remonte la souris, qui termine le processus de selection du degré
        //réinitialise une partie des valeurs pour pouvoir recommencer la selection une prochaine fois.
        body.addEventListener('mouseup', function(){
            if (degreeButtons[buttonNumber].hasAttribute("active")){
                if(degreeInteruptor == true){
                    degreeInteruptor = false;
                    clearInterval(beginCalculDegree);
                }
            }
        })

}
//tableaux des représentation JS des elements HTML lié au bouton de selection de l'axe XY
//tableau des boutons eux même
let selectXYs = document.getElementsByClassName("select-x-y-btn");
//tableau des interupteurs a l'interieur du bouton 
let interuptorSelectsXYs = document.getElementsByClassName("x-y-interuptor");

for(i=0; i<=selectXYs.length-1; i++){
    //défini l'état du bouton 
    let interuptor = false;
    //défini le nombre de bouton total
    let buttonNumber = i;
    //Evenement qui gere le changement détat du bouton, permettant selection de l'axe
    selectXYs[buttonNumber].addEventListener('click', function(){
        //etat bouton definissant l'axe Y en JS et qui active le css pour changer le visuel du bouton en fonction
        if(interuptor == false){
            interuptorSelectsXYs[buttonNumber].setAttribute("active","");
            interuptor = true;
        }
        //idem que dernier commentaire pour l'axe X 
        else{
            interuptorSelectsXYs[buttonNumber].removeAttribute("active");
            interuptor = false;
        }
    })
}

//tableaux des représentation JS des elements HTML lié au bouton de selection du spread/blur
//tableau des boutons eux même
let selectBlurSpreads = document.getElementsByClassName("select-blur-spread-btn");
//tableau des interupteurs a l'interieur du bouton
let interuptorSpreadBlurs = document.getElementsByClassName("spread-blur-interuptor");

//boucle permettant de définir les fonctions et les event pour chaques bouton de spread/blur, element de la liste
for(i=0; i<=selectBlurSpreads.length-1; i++){
    //défini l'état du bouton 
    let interuptor = false;
    //défini le nombre de bouton total
    let buttonNumber = i;
    //Evenement qui gere le changement détat du bouton, permettant selection soi du spread ou du blur
    selectBlurSpreads[buttonNumber].addEventListener('click', function(){
        //etat bouton definissant selection spread en JS et qui active le css pour changer le visuel du bouton en fonction
        if(interuptor == false){
            interuptorSpreadBlurs[buttonNumber].setAttribute("active","");
            interuptor = true;
        }
        //idem pour le blur
        else{
            interuptorSpreadBlurs[buttonNumber].removeAttribute("active");
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
        shader : shaderModuleList[elementNumber],
        corner : cornerModuleList[elementNumber],
        border : borderModuleList[elementNumber]
    }
}