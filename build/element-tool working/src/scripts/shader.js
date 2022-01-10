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
    shaderMoreButtons[shaderModuleNumber].addEventListener("click", function(e){
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
                        hue : "#009DFF",
                        opacity : 100
                    }
        }

        //fonction de changement visuel du module shader (permet de correspondre au shader selectionné)
        let val= shaderNumber-1, opacity = opacityNumber;
        visualChangeBeforeListSelection(val, opacity);
    })
    
    //suppression d'un shader dans la liste des shader d'un module
    shaderTrashButtons[shaderModuleNumber].addEventListener("click", function(e){
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
}