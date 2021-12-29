//4 tableaux qui contiennent l'ensemble des balises html lié a la gestion de l'opacité
let opacityHTMLButtons = document.getElementsByClassName("opacity-btn");
let opacityHTMLInsideButtons = document.getElementsByClassName("inside-opacity-btn");
let opacityHTMLRangeContainers = document.getElementsByClassName("opacity-range-container");
let opacityHTMLArrows = document.getElementsByClassName("opacity-range-container-arrow");
let opacityHTMLRanges = document.getElementsByClassName("opacity-range");

//variable qui représente le BODY du HTML
let bodyDetection = document.getElementsByTagName("body");
let body = bodyDetection[0];

//tableau contenant les objets représentant les boutons/ranges de gestion d'opacité
let opacityButtonList = [];

//création des objets représentant les boutons/ranges de gestion d'opacité
//également les fonction d'ouverture/fermeture lié au range d'opacité et leurs conteneurs
//et les fonction de traitement de l'opacité elle même
for(i=0; i<=opacityHTMLButtons.length-1; i++){
    let opacityNumber = i;
    opacityButtonList[i] =
        {
            opacityButton : opacityHTMLButtons[i],
            opacityInsideButton : opacityHTMLInsideButtons[i],
            opacityContainer : opacityHTMLRangeContainers[i],
            opacityArrow : opacityHTMLArrows[i],
            opacityRange : opacityHTMLRanges[i],
            opacityGate : false
        } 
    //fonction qui gere l'ouverture et la fermeture du range d'opacité  
    opacityButtonList[opacityNumber].opacityButton.addEventListener("click", function (){
        if (opacityButtonList[opacityNumber].opacityGate == false){
            opacityButtonList[opacityNumber].opacityContainer.style.display = "block";
            opacityButtonList[opacityNumber].opacityGate = true;
        }
        else{
            opacityButtonList[opacityNumber].opacityContainer.style.display = "none";
            opacityButtonList[opacityNumber].opacityGate = false;
        }
    });
    //fonction qui gere l'opacité elle même et sa représentation dans le bouton d'ouverture de l'opacité
    opacityButtonList[opacityNumber].opacityRange.addEventListener("click", function(){
        let opacityValue = opacityButtonList[opacityNumber].opacityRange.value/100;
        let opacityRepre = Math.abs(Math.trunc(opacityValue*255)-255);
        opacityButtonList[opacityNumber].opacityInsideButton.style.backgroundColor = "rgb(" + opacityRepre + ", " + opacityRepre + ", " + opacityRepre + ")";
        console.log(opacityButtonList[opacityNumber].opacityInsideButton.style.backgroundColor);
        console.log(opacityValue);
        console.log(opacityButtonList[opacityNumber].opacityRange.value);
    })
}

//fonction lié au BODY, permettant fermeture des conteneur des range d'opacité
//quand l'utilisateur clique en dehors du HTML lié à ces derniers
body.addEventListener("click", function(e){
    for(i=0; i<=opacityHTMLButtons.length-1; i++){
        if(((e.target != opacityButtonList[i].opacityRange)&&
        (e.target != opacityButtonList[i].opacityContainer)&&
        (e.target != opacityButtonList[i].opacityArrow)&&
        (e.target != opacityButtonList[i].opacityInsideButton)&&
        (e.target != opacityButtonList[i].opacityButton))&&
        (opacityButtonList[i].opacityGate == true)){
            opacityButtonList[i].opacityContainer.style.display = "none";
            opacityButtonList[i].opacityGate = false;
            break;
        }
    }
})





