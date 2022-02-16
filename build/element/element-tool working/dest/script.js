//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~OPACITY-BTN-RANGES~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//4 tableaux qui contiennent l'ensemble des balises construisant la structure HTML de l'outil d'opacité
//btn qui ouvre le conteneur du range
let opacityHTMLButtons = document.getElementsByClassName("opacity-btn");
//pastille de niveau de gris a l'interieur de l'opacityHTMLButton qui représente visuellement l'état d'opacité 
let opacityHTMLInsideButtons = document.getElementsByClassName("inside-opacity-btn");
//conteneur du range gérant l'opacité, caché tant qu'opacityHTMLButton n'est pas cliqué
let opacityHTMLRangeContainers = document.getElementsByClassName("opacity-range-container");
//element exclusivement graphique pour plus de clarté pour l'utilisateur lors de l'ouverture du range
let opacityHTMLArrows = document.getElementsByClassName("opacity-range-container-arrow");
//le range qui gere l'opacité lui même
let opacityHTMLRanges = document.getElementsByClassName("opacity-range");

//représentation de parties spécifiques de la barre d'element, pour gerer leurs transformation
//en fonction de l'ouverture/fermeture de l'outil d'opacité
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//tableau représentant la partie HTML basses du module "border", pour chaque barre d'element
let borderContents = document.getElementsByClassName("border-content");
//tableau représentant la partie HTML basses du module "Box", pour chaque barre d'element
let boxRangeContainers = document.getElementsByClassName("all-box-range-container");
//Tableau représentant la partie HTML basse gauche du module "shader" , pour chaque barre d'element
let shaderGradientContainers = document.getElementsByClassName("gradient-degree-selection-section")

//variable qui représente le BODY du HTML
let bodyDetection = document.getElementsByTagName("body");
let body = bodyDetection[0];

//tableau contenant les objets représentant les outils d'opacité de toutes les barres d'éléments
let opacityButtonList = [];

//Boucle qui itere pour chaque barre d'element des objets représentant les outils d'opacité et leurs EVENTS
//4 objets représentant les outils d'opacité (color,shader,border,box) par barre d'element
//2 EVENTS par outils d'opacité = Event du bouton d'ouverture du range, Event du range lui même
//et les fonction de traitement de l'opacité elle même
for(i=0; i<=opacityHTMLButtons.length-1; i++){
    //elementNum et le while associé permettent de définir le nombre de barre d'element
    let elementNum=1;
    while(i+1>4*elementNum){
        elementNum++
    }
    //opacityNumber défini un numéro pour chaque range d'opacité
    let opacityNumber = i;
    //ajout des différentes infos (un booleen et les variables représentant le HTML) pour chaque outil d'opacité dans des objet, dans opacityButtonList
    opacityButtonList[i] =
        {
            opacityButton : opacityHTMLButtons[i],
            opacityInsideButton : opacityHTMLInsideButtons[i],
            opacityContainer : opacityHTMLRangeContainers[i],
            opacityArrow : opacityHTMLArrows[i],
            opacityRange : opacityHTMLRanges[i],
            opacityInteruptor : false
        } 
        
    //actualArticle actualArticleClass afterArticle afterArticleClass:
    //représente des balises HTML contenante ou adjacentes aux outils d'opacité
    //cela permettra l'ajout d'information dans les outils d'opacité des modules border et box
    //ces information permettrons de modifié le css de ces module lors de l'ouverture/fermeture de l'outil d'opacité, et d'évité des bug graphique
    let actualArticle = opacityButtonList[opacityNumber].opacityButton.parentElement.parentElement.parentElement;   
    let actualArticleClass = actualArticle.className;

    let afterArticle = opacityButtonList[opacityNumber].opacityButton.parentElement.parentElement.parentElement.nextElementSibling;
    let afterArticleClass = afterArticle.className;

    //ajout des infos de conteneur HTML des modules des outil d'opacité de "border" et "box" grace aux variable du dessus
    if(actualArticleClass == "border"){
        opacityButtonList[i].content = borderContents[elementNum-1];
    }
    if(actualArticleClass == "box"){
        opacityButtonList[i].container = boxRangeContainers[elementNum-1];
    }

    //fonction qui gere l'ouverture et la fermeture du range d'opacité  
    opacityButtonList[opacityNumber].opacityButton.addEventListener("click", function (){
        //ouverture du range
        //suivant le module de l'outil d'opacité les transformation graphique ne sont pas exactement les même
        if (opacityButtonList[opacityNumber].opacityInteruptor == false){
            opacityButtonList[opacityNumber].opacityContainer.style.display = "block";
            opacityButtonList[opacityNumber].opacityInteruptor = true;
            if(afterArticleClass == "hr-shader"){
                afterArticle.style.marginLeft = "-85.2px"; 
            }
            else if(afterArticleClass == "hr-radius"){
                afterArticle.style.marginLeft = "-85px"; 
                shaderGradientContainers[elementNum-1].style.marginTop = "-3.5px";
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
            opacityButtonList[opacityNumber].opacityInteruptor = false;
            afterArticle.style.marginLeft = "0px"; 
            if(afterArticleClass == "hr-box"){
                opacityButtonList[opacityNumber].content.style.marginTop = "0px";
            }
            if(afterArticleClass == "hr-image-text-trash-reset"){
                afterArticle.style.marginLeft = "0px";
            }
            if(afterArticleClass == "hr-radius"){
                shaderGradientContainers[elementNum-1].style.marginTop = "1px";
            }
        }
    });
    //fonction qui gere la valeur de l'opacité elle même et sa représentation dans le bouton d'ouverture de l'opacité
    opacityButtonList[opacityNumber].opacityRange.addEventListener("click", function(){
        let opacityValue = opacityButtonList[opacityNumber].opacityRange.value/100;
        let opacityRepre = Math.abs(Math.trunc(opacityValue*255)-255);
        opacityButtonList[opacityNumber].opacityInsideButton.style.backgroundColor = "rgb(" + opacityRepre + ", " + opacityRepre + ", " + opacityRepre + ")";
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
        (opacityButtonList[i].opacityInteruptor == true)){
            opacityButtonList[i].opacityContainer.style.display = "none";
            opacityButtonList[i].opacityInteruptor = false;
            afterArticle.style.marginLeft = "0px"; 
            if(afterArticleClass == "hr-radius"){
                shaderGradientContainers[elementNum-1].style.marginTop = "1px";
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
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~BORDER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//Tableau des balises HTML de selection des bordures
let borderSelectors = document.getElementsByClassName("border-select");
//Tableau des différentes parties HTML de l'outil de selection des bordures
let topBorderSelectors = document.getElementsByClassName("border-top");
let leftBorderSelectors = document.getElementsByClassName("border-left");
let rightBorderSelectors = document.getElementsByClassName("border-right");
let bottomBorderSelectors = document.getElementsByClassName("border-bottom");
//Tableau des balises HTML centrale du selecteur de bords (carré au millieu du selecteur) 
let borderSelects = document.getElementsByClassName("all-borders");
//Tableau des (dans l'ordre) des inputs range HTML de selection de la taille des bordures, de leurs couleurs et de leurs styles. 
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
    let topBorderInteruptor = false;
    let rightBorderInteruptor = false;
    let bottomBorderInteruptor = false;
    let leftBorderInteruptor = false;

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
        if(topBorderInteruptor == true){
            modifiedBorder.push(borderModuleList[borderModuleNumber].top);
        }
        if(rightBorderInteruptor == true){
            modifiedBorder.push(borderModuleList[borderModuleNumber].right);
        }
        if(bottomBorderInteruptor == true){
            modifiedBorder.push(borderModuleList[borderModuleNumber].bottom);
        }
        if(leftBorderInteruptor == true){
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
            topBorderInteruptor = true;
            rightBorderInteruptor = true; 
            bottomBorderInteruptor = true;
            leftBorderInteruptor = true;
            visualChangeBeforeBorderModification()
        }
        //selection de la bordure haute
        else if(borderSelectorSelectionCounter == 2){
            borderSelectorSelectionCounter++
            topBorderActivate();
            rightBorderNeutral();
            bottomBorderNeutral();
            leftBorderNeutral();
            topBorderInteruptor = true;
            rightBorderInteruptor = false; 
            bottomBorderInteruptor = false;
            leftBorderInteruptor = false;
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
            topBorderInteruptor = false;
            rightBorderInteruptor = true; 
            bottomBorderInteruptor = false;
            leftBorderInteruptor = false;
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
            topBorderInteruptor = false;
            rightBorderInteruptor = false; 
            bottomBorderInteruptor = true;
            leftBorderInteruptor = false;
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
            topBorderInteruptor = false;
            rightBorderInteruptor = false; 
            bottomBorderInteruptor = false;
            leftBorderInteruptor = true;
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
            topBorderInteruptor = true;
            rightBorderInteruptor = true; 
            bottomBorderInteruptor = false;
            leftBorderInteruptor = false;
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
            topBorderInteruptor = false;
            rightBorderInteruptor = false; 
            bottomBorderInteruptor = true;
            leftBorderInteruptor = true;
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
            topBorderInteruptor = true;
            rightBorderInteruptor = false; 
            bottomBorderInteruptor = true;
            leftBorderInteruptor = false;
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
            topBorderInteruptor = false;
            rightBorderInteruptor = true; 
            bottomBorderInteruptor = false;
            leftBorderInteruptor = true;
            borderSelects[borderModuleNumber].style.top = "0px";
            visualChangeBeforeBorderModification()
        }
    })
    //les 4 Evenements permettant O/I indépendament les différent bords
    //lors d'un clique sur les bouton de bord représentant le bord désiré dans le selecteur
    //cela permet de l'inclure ou l'exclure de la selection de bord que l'on peut modifier (interuptor booleen O/I)
    //et de changer son visuel pour que l'utilisateur ai un feed-back (neutral/activate, +/-) 
    topBorderSelectors[borderModuleNumber].addEventListener("click", function(){
        if(topBorderInteruptor == false){
            topBorderActivate();
            topBorderInteruptor = true;
            visualChangeBeforeBorderModification()
        }
        else{
            topBorderNeutral();
            topBorderInteruptor = false;
            visualChangeBeforeBorderModification()
        }
    })
    leftBorderSelectors[borderModuleNumber].addEventListener("click", function(){
        if(leftBorderInteruptor == false){
            leftBorderActivate();
            leftBorderInteruptor = true;
            visualChangeBeforeBorderModification()
        }
        else{
            leftBorderNeutral();
            leftBorderInteruptor = false;
            visualChangeBeforeBorderModification()
        }
    })
    rightBorderSelectors[borderModuleNumber].addEventListener("click", function(){
        if(rightBorderInteruptor == false){
            rightBorderActivate();
            rightBorderInteruptor = true;
            visualChangeBeforeBorderModification()
        }
        else{
            rightBorderNeutral();
            rightBorderInteruptor = false;
            visualChangeBeforeBorderModification()
        }
    })
    bottomBorderSelectors[borderModuleNumber].addEventListener("click", function(){
        if(bottomBorderInteruptor == false){
            bottomBorderActivate();
            bottomBorderInteruptor = true;
            visualChangeBeforeBorderModification()
        }
        else{
            bottomBorderNeutral();
            bottomBorderInteruptor = false;
            visualChangeBeforeBorderModification()
        }
    })
    
    //selectionIfNoBorderIsSelected:
    //permet lors des Event de selection de valeur,btn/input, qui suivent juste en dessous de selectionné tout les bords si aucun ne l'est
    //inclus visualChangeBeforeBorderModification pour activé visuellement le changement.
    function selectionIfNoBorderIsSelected(){
        if((topBorderInteruptor == false)&&(rightBorderInteruptor == false)&&
        (bottomBorderInteruptor == false)&&(leftBorderInteruptor == false)){
            borderSelectorSelectionCounter = 2;
            topBorderInteruptor = true;
            rightBorderInteruptor = true;
            bottomBorderInteruptor = true;
            leftBorderInteruptor = true;
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
    borderRanges[borderModuleNumber].addEventListener("input", function(){
        if(topBorderInteruptor == true){
            borderModuleList[borderModuleNumber].top.size = borderRanges[borderModuleNumber].value;
        }
        if(rightBorderInteruptor == true){
            borderModuleList[borderModuleNumber].right.size = borderRanges[borderModuleNumber].value;
        }
        if(bottomBorderInteruptor == true){
            borderModuleList[borderModuleNumber].bottom.size = borderRanges[borderModuleNumber].value;
        }
        if(leftBorderInteruptor == true){
            borderModuleList[borderModuleNumber].left.size = borderRanges[borderModuleNumber].value;
        }
        selectionIfNoBorderIsSelected();
    })
    //Event du bouton de couleur des bords
    borderColors[borderModuleNumber].addEventListener("input", function(){
        if(topBorderInteruptor == true){
            borderModuleList[borderModuleNumber].top.color.hue = borderColors[borderModuleNumber].value;
        }
        if(rightBorderInteruptor == true){
            borderModuleList[borderModuleNumber].right.color.hue = borderColors[borderModuleNumber].value;
        }
        if(bottomBorderInteruptor == true){
            borderModuleList[borderModuleNumber].bottom.color.hue = borderColors[borderModuleNumber].value;
        }
        if(leftBorderInteruptor == true){
            borderModuleList[borderModuleNumber].left.color.hue = borderColors[borderModuleNumber].value;
        }
        selectionIfNoBorderIsSelected();
    })
    //Event du select de la liste de style des bords 
    borderStyles[borderModuleNumber].addEventListener("click", function(){
        if(borderStyles[borderModuleNumber].options[borderStyles[borderModuleNumber].selectedIndex] != selectedStyle){
            selectedStyle.removeAttribute("selected");
            selectedStyle = borderStyles[borderModuleNumber].options[borderStyles[borderModuleNumber].selectedIndex];
            selectedStyle.setAttribute("selected", "");
        }
        if(topBorderInteruptor == true){
            borderModuleList[borderModuleNumber].top.style = selectedStyle.value;
        }
        if(rightBorderInteruptor == true){
            borderModuleList[borderModuleNumber].right.style = selectedStyle.value;
        }
        if(bottomBorderInteruptor == true){
            borderModuleList[borderModuleNumber].bottom.style = selectedStyle.value;
        }
        if(leftBorderInteruptor == true){
            borderModuleList[borderModuleNumber].left.style = selectedStyle.value;
        }
        selectionIfNoBorderIsSelected();
    })
    //Event du bouton d'opacité
    opacityButtonList[opacityNumber].opacityRange.addEventListener("input", function(){
        if(topBorderInteruptor == true){
            borderModuleList[borderModuleNumber].top.color.opacity = opacityButtonList[opacityNumber].opacityRange.value;
        }
        if(rightBorderInteruptor == true){
            borderModuleList[borderModuleNumber].right.color.opacity = opacityButtonList[opacityNumber].opacityRange.value;
        }
        if(bottomBorderInteruptor == true){
            borderModuleList[borderModuleNumber].bottom.color.opacity = opacityButtonList[opacityNumber].opacityRange.value;
        }
        if(leftBorderInteruptor == true){
            borderModuleList[borderModuleNumber].left.color.opacity = opacityButtonList[opacityNumber].opacityRange.value;
        }
        selectionIfNoBorderIsSelected();
    })
}


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



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SHADER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//Tableaux des balises HTML a l'interieur des modules shader (outil d'interation (btn, input), de selection(select))
let shaderSelectors = document.getElementsByClassName("shader-select");
let shaderMoreBtns = document.getElementsByClassName("element-more-shader");
let shaderTrashBtns = document.getElementsByClassName("element-trash-shader");
let shaderColors = document.getElementsByClassName("shader-color");
let shaderRanges = document.getElementsByClassName("range-shader-placement");

//tableaux des balises HTML contenant les outils d'intéraction du type de gradient (lineaire, radial)
let selectGradients = document.getElementsByClassName("shader-select-gradient");
//tableau des boutons de selection de gradient
let btnSelectGradients = document.getElementsByClassName("shader-select-gradient-interuptor");
//tableau des boutons de selection des degrés des gradient, si ceux la sont lineaire
let degreeButtons = document.getElementsByClassName("degree-radiant-btn");

//Tableau qui contiendra par la suite tout les shaders des différents modules element
let shaderModuleList = [];

//boucle qui permet de remplir le shaderModuleList d'objet representant chacun des module de shaders et leurs différentes valeurs
//déclaration d'evenement avec les outils HTML d'interactions et de selection
for(i=0; i<= shaderSelectors.length-1; i++){
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
    shaderSelectors[shaderModuleNumber].addEventListener("click", changeListShadersNumber);
    function changeListShadersNumber(){
        //active la fonction si l'option selectionné est différente de celle qui l'est déjà
        if (shaderSelectNumber != shaderSelectors[shaderModuleNumber].options[shaderSelectors[shaderModuleNumber].selectedIndex].value){

            //supression et attribution a un nouvel element HTML option de l'attribut "select" de la liste de selection HTML
            shaderSelectors[shaderModuleNumber].children[shaderSelectNumber-1].removeAttribute("selected");
            shaderSelectNumber = shaderSelectors[shaderModuleNumber].options[shaderSelectors[shaderModuleNumber].selectedIndex].value;
            shaderSelectors[shaderModuleNumber].children[shaderSelectNumber-1].setAttribute("selected", "");      
            
            //fonction de changement visuel du module shader (permet de correspondre au shader selectionné)
            let val= shaderSelectNumber-1, opacity = opacityNumber;
            visualChangeBeforeListSelection(val, opacity);
            
        }

    }
    //ajout d'un shader dans la liste des shader d'un module
    shaderMoreBtns[shaderModuleNumber].addEventListener("click", function(e){
        //ajout d'un shader dans le "compteur de shader" pour ensuite construire l'element html qui le representera
        shaderNumber ++;
        shaderSelectors[shaderModuleNumber].innerHTML += '<option value="' + shaderNumber + '">' + shaderNumber + '</option>';
        //suppression et ajout de l'attribut selected de l'option HTML de selection du shader
        shaderSelectors[shaderModuleNumber].children[shaderSelectNumber-1].removeAttribute("selected");
        shaderSelectors[shaderModuleNumber].children[shaderNumber-1].setAttribute("selected", "");
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
            shaderSelectors[shaderModuleNumber].removeChild(shaderSelectors[shaderModuleNumber][shaderSelectNumber-1]);
            shaderModuleList[shaderModuleNumber].splice(shaderSelectNumber-1, 1)

            //boucle pour remplacer les elements HTML qui représente les shaders précédent celui supprimé, pour leurs assigné leur nouveau numéro
            for(i=shaderSelectNumber-1; i<=shaderSelectors[shaderModuleNumber].length-1; i++){
                shaderSelectors[shaderModuleNumber][i].innerHTML = i+1;
                shaderSelectors[shaderModuleNumber][i].setAttribute("value", i+1);
            }
            //selection du shader inférieur a celui supprimé apres sa suppression 
            if(shaderSelectNumber-2 >= 0){
                shaderNumber --;
                shaderSelectors[shaderModuleNumber][shaderSelectNumber-2].setAttribute("selected", "");
                shaderSelectNumber = shaderSelectNumber-1; 
            }
            //quand le shader supprimé est le premier de la liste, quelques regle différente pour que cela fonctionne
            else if(shaderSelectNumber-2 < 0){
                shaderNumber --;
                shaderSelectors[shaderModuleNumber][shaderSelectNumber-1].setAttribute("selected", "");
            }
            //force la selection de l'option correspondant au shaderSelectNumber
            shaderSelectors[shaderModuleNumber].selectedIndex = shaderSelectNumber-1;
            //partie de la fonction qui change la partie visuel 
            let val= shaderSelectNumber-1, opacity = opacityNumber;
            visualChangeBeforeListSelection(val, opacity);
        }
    })
    //event qui attribut la position des shaders grace au range du module shader
    shaderRanges[shaderModuleNumber].addEventListener("input", function(){
        shaderModuleList[shaderModuleNumber][shaderSelectNumber-1].placement = shaderRanges[shaderModuleNumber].value;
    })
    //event qui attribut la couleur des shaders grace a l'input couleur du module shader
    shaderColors[shaderModuleNumber].addEventListener("input", function(){
        shaderModuleList[shaderModuleNumber][shaderSelectNumber-1].color.hue = shaderColors[shaderModuleNumber].value;
    })
    //event qui attribut l'opacité des shaders grace a l'outil d'opacité du module shader
    opacityButtonList[opacityNumber].opacityRange.addEventListener("input", function(){
        shaderModuleList[shaderModuleNumber][shaderSelectNumber-1].color.opacity = opacityButtonList[opacityNumber].opacityRange.value;
    })


    //défini l'état du bouton de selection de gradient (lineaire ou gradient)
    let interuptor = false;
    //EVENT qui gere le changement détat du bouton, permettant selection soi d'un gradient lineaire ou radial
    selectGradients[shaderModuleNumber].addEventListener('click', function(){
        //etat bouton definissant selection du gradient lineaire en JS et qui active le css pour changer le visuel du bouton en fonction
        if(interuptor == false){
            btnSelectGradients[shaderModuleNumber].setAttribute("active","");
            degreeButtons[shaderModuleNumber].removeAttribute("active");
            shaderModuleList[shaderModuleNumber][0].gradient = "radial";
            shaderModuleList[shaderModuleNumber][0].degree = undefined;
            interuptor = true;
        }
        //idem pour le gradient radial
        else{; 
            btnSelectGradients[shaderModuleNumber].removeAttribute("active");
            degreeButtons[shaderModuleNumber].setAttribute("active","");
            shaderModuleList[shaderModuleNumber][0].gradient = "linear";
            shaderModuleList[shaderModuleNumber][0].degree = degree;
            interuptor = false;
        }
    })

        //représente le numéro du bouton qui permet l'attribution d'un degré pour les gradient lineaire
        let buttonNumber = i;
        //représente les degrés a 360°, ici a leurs valeurs initial
        let degree = 0;
        //défini l'état du bouton d'attribution de degré (si gradient lineaire ON, si radial OFF)
        let degreeInteruptor = false;
        //permet de pouvoir comparé l'ancienne place de la souris avec la nouvelle et de crée le nouveau degrés
        let initialValue;
    
        //fonction permettant de calculer le nouveau degré
        //fonctionne en comparant le placement de la souris une fois que l'on a appuyer sur le bouton de selection de degré
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

for(i=0; i<= boxSelectors.length-1; i++){
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
        border : borderModuleList[elementNumber],
        box : boxModuleList[elementNumber]
    }
}
