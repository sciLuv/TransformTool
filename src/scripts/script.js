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
    console.log(afterArticleClass);
    console.log(actualArticleClass);
    
    //certaines condition permettant d'ajouté des infos aux range d'opacité de "border" et "box"
    //nécessaire pour changer dynamiquement le css en fonction de l'overture/fermeture des range
    if(actualArticleClass == "border"){
        console.log("test");
        opacityButtonList[i].content = borderContent[elementNum-1];
    }
    if(actualArticleClass == "box"){
        console.log("test");
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
                afterArticle.style.marginLeft = "-60px"; 
            }
            else if(afterArticleClass == "hr-radius"){
                afterArticle.style.marginLeft = "-86px"; 
            }
            else if(afterArticleClass == "hr-box"){
                afterArticle.style.marginLeft = "-76px";
                opacityButtonList[opacityNumber].content.style.marginTop = "-3px";
            }
            else if(afterArticleClass == "hr-trash-reset"){
                opacityButtonList[opacityNumber].container.style.marginTop = "-3px";
                opacityButtonList[opacityNumber].inset.style.marginLeft = "-80px";
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
                opacityButtonList[opacityNumber].container.style.marginTop = "0px";
                opacityButtonList[opacityNumber].inset.style.marginLeft = "4px";
            }
        }
    });
    //fonction qui gere l'opacité elle même et sa représentation dans le bouton d'ouverture de l'opacité
    opacityButtonList[opacityNumber].opacityRange.addEventListener("click", function(){
        let opacityValue = opacityButtonList[opacityNumber].opacityRange.value/100;
        let opacityRepre = Math.trunc(opacityValue*255);
        opacityButtonList[opacityNumber].opacityInsideButton.style.backgroundColor = "rgb(" + opacityRepre + ", " + opacityRepre + ", " + opacityRepre + ")";
        console.log(opacityButtonList[opacityNumber].opacityInsideButton.style.backgroundColor);
        console.log(opacityValue);
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
                opacityButtonList[i].container.style.marginTop = "0px";
                opacityButtonList[i].inset.style.marginLeft = "4px";
            }
            break;
        }
    }
})