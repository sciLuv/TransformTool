//représente chaque itération d'une barre d'element dans un tableau
let elements = document.getElementsByClassName("html-element");

//tab représentant chaque itération de l'iput text-id
let idNames = document.getElementsByClassName("text-id");

let nameModuleList = [];

for(i=0; i<= elements.length-1; i++){
    idNameNumber = i;
    nameModuleList[idNameNumber] = {
        name : ""
    }

    idNames[idNameNumber].addEventListener("input", function(){
        nameModuleList[idNameNumber].name = idNames[idNameNumber].value;
    })
}

//ici les futures fonction de mise a jour visuel de : l'opacité, la couleur, les ranges.