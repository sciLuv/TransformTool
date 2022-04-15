let degreeButtons = document.getElementsByClassName("degree-radiant-btn")
let body = document.getElementsByTagName('body');

for(i=0; i<=degreeButtons.length-1; i++){
    //représente le numéro du bouton
    let buttonNumber = i;
    //représente les degrés, ici a leurs valeurs initial
    let degree = 0;
    //défini l'état du bouton 
    let interuptor = false;
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
        //mise a jour de la valeur initial du placement du curseur pour pouvoir répété la fonction. 
        initialValue = actualplacement;

        /*placer sans doute ici le code permettant d'ajouter*/
    }
    //evenement permettant d'initialisé une valeurs de placement de la souris lorsqu'on clique sur le bouton
    degreeButtons[buttonNumber].addEventListener('mousedown', function(event){
        interuptor = true;
        initialValue = event.clientY;
    })
    //evement qui s'active lorsqu'on bouge la souris de haut en bas apres un clique qui n'est pas remonté
    body[0].addEventListener('mousemove', function(event){
        let placement = event.clientY;
        if (interuptor == true){
            beginCalculDegree = setInterval(calculDegree(initialValue, placement, degree), 200);
        }
    })
    //evenement qui s'active lorsqu'on remonte la souris, qui termine le processus de selection du degré
    //réinitialise une partie des valeurs pour pouvoir recommencer la selection une prochaine fois.
    body[0].addEventListener('mouseup', function(){
        if(interuptor == true){
            interuptor = false;
            clearInterval(beginCalculDegree);
        }
    })
    
}

