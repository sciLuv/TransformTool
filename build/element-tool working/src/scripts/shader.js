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

