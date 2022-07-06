//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~OPACITY-BTN-RANGES~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

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

        //fonction qui gere l'ouverture et la fermeture du range d'opacité  
        opacityButtonList[opacityNumber].opacityButton.addEventListener("click", function (event){
            let btnPlace = opacityButtonList[opacityNumber].opacityButton.getBoundingClientRect();
            let elemPlace = allElement.getBoundingClientRect();
            //ouverture du range
            //suivant le module de l'outil d'opacité les transformation graphique ne sont pas exactement les même
            if (opacityButtonList[opacityNumber].opacityInteruptor == false){
                opacityButtonList[opacityNumber].opacityContainer.style.display = "block";
                opacityButtonList[opacityNumber].opacityInteruptor = true;
                opacityButtonList[opacityNumber].opacityContainer.style.top = (btnPlace.top-elemPlace.top+30) +"px";
                opacityButtonList[opacityNumber].opacityContainer.style.left = (btnPlace.left-elemPlace.left-5) + "px";
            }
            //fermeture du range
            else{
                opacityButtonList[opacityNumber].opacityContainer.style.display = "none";
                opacityButtonList[opacityNumber].opacityInteruptor = false;
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
            if(((e.target != opacityButtonList[i].opacityRange)&&
            (e.target != opacityButtonList[i].opacityContainer)&&
            (e.target != opacityButtonList[i].opacityArrow)&&
            (e.target != opacityButtonList[i].opacityInsideButton)&&
            (e.target != opacityButtonList[i].opacityButton))&&
            (opacityButtonList[i].opacityInteruptor == true)){
                opacityButtonList[i].opacityContainer.style.display = "none";
                opacityButtonList[i].opacityInteruptor = false;
                break;
            }
        }
    })
}