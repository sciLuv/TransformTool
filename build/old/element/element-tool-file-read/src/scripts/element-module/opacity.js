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

function createOpacity(){
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
}