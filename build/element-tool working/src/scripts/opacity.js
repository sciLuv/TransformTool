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