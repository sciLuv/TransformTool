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

//tableaux des représentation JS des elements HTML lié au bouton de selection du type de gradient (lineaire, radial)
//tableau des boutons eux même
let selectGradients = document.getElementsByClassName("shader-select-gradient");
//tableau des interupteurs a l'interieur du bouton
let interuptorLinearRadials = document.getElementsByClassName("shader-select-gradient-interuptor");

for(i=0; i<=selectGradients.length-1; i++){
    //défini l'état du bouton 
    let interuptor = false;
    //défini le nombre de bouton total
    let buttonNumber = i;
    //Evenement qui gere le changement détat du bouton, permettant selection soi d'un gradient lineaire ou radial
    selectGradients[buttonNumber].addEventListener('click', function(){
        //etat bouton definissant selection du gradient lineaire en JS et qui active le css pour changer le visuel du bouton en fonction
        if(interuptor == false){
            interuptorLinearRadials[buttonNumber].setAttribute("active","");
            interuptor = true;
        }
        //idem pour le gradient radial
        else{; 
            interuptorLinearRadials[buttonNumber].removeAttribute("active");
            interuptor = false;
        }
    })
}