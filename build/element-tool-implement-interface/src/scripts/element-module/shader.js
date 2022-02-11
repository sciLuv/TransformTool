//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SHADER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//Tableaux des balises HTML a l'interieur des modules shader (outil d'interation (btn, input), de selection(select))
let shaderSelectors = document.getElementsByClassName("shader-select");
let shaderMoreBtns = document.getElementsByClassName("element-more-shader");
let shaderTrashBtns = document.getElementsByClassName("element-trash-shader");
let shaderColors = document.getElementsByClassName("shader-color");
let shaderRanges = document.getElementsByClassName("range-shader-placement");

//tableaux des balises HTML contenant les outils d'intéraction du type de gradient (lineaire, radial)
let selectGradients = document.getElementsByClassName("shader-select-gradient");
//tableau des boutons de selection de gradient
let btnSelectGradients = document.getElementsByClassName("shader-select-gradient-interuptor");
//tableau des boutons de selection des degrés des gradient, si ceux la sont lineaire
let degreeButtons = document.getElementsByClassName("degree-radiant-btn");

//Tableau qui contiendra par la suite tout les shaders des différents modules element
let shaderModList = [];
//tableau qui contiendra les information d'interface de shader
let shaderIFList = []

function createShader(){
    //boucle qui permet de remplir le shaderModList d'objet representant chacun des module de shaders et leurs différentes valeurs
    //déclaration d'evenement avec les outils HTML d'interactions et de selection
    for(i=0; i<= elements.length-1; i++){
        //représente le nombre de module de shader
        let shaderModNum = i;
        //permet de selectionner le range d'opacité lié au module de shader
        let opaNum = 1+(shaderModNum*4);

        //objet qui contient les informations concernant le nombre de shader différent, celui qui est sélectionné et les info sur les btns
        shaderIFList[shaderModNum] = {
            //représente le nombre de shaders différent dans un même module
            shaderNum : 1,
            //représente le shader selectionné (le shaderNumber selectionné)
            shaderSelectNum : 1,
            //défini l'état du bouton de selection de gradient (lineaire ou gradient)
            interuptor : false,
            //défini les différentes variable lié au bouton de selection de degré
            degreeBtn : {
                //représente le numéro du bouton qui permet l'attribution d'un degré pour les gradient lineaire
                btnNum : i,
                //représente les degrés a 360°, ici a leurs valeurs initial
                degree : 0,
                //défini l'état du bouton d'attribution de degré (si gradient lineaire ON, si radial OFF)
                degreeInteruptor : false,
                //permet de pouvoir comparé l'ancienne place de la souris avec la nouvelle et de crée le nouveau degrés
                initVal : 0
            }    
        }   

        //crée un tableau qui va contenir les objets représentant les différents shaders d'un même module
        shaderModList[shaderModNum] = [];
        //création de l'objet shader de base
        shaderModList[shaderModNum][shaderIFList[shaderModNum].shaderNum-1] = {
            placement : 0,
            gradient : "linear",
            degree : 0,
            color : {
                        hue : "#FFA200",
                        opacity : 100
                    }
        }
        //fonction de changement visuel des element de selection du shader en fonction du shader du module selectionné dans la liste
        function visualChangeBeforeListSelection(val, opacity){
            //changement visuel du range de placement et du bouton de selection de couleur
            rangeVisualChgt(shaderRanges[shaderModNum], shaderModList[shaderModNum][val]);
            colorVisualChgt(shaderColors[shaderModNum], shaderModList[shaderModNum][val])
            //changement visuel du range d'opacité et du range de selection d'opacité
            opaVisualChgt(shaderModList[shaderModNum][val].color.opacity, opacity);
        }
        
        //event de selection du shader dans la liste des shader dans chaque module
        shaderSelectors[shaderModNum].addEventListener("click", changeListShadersNumber);
        function changeListShadersNumber(){
            //active la fonction si l'option selectionné est différente de celle qui l'est déjà
            if (shaderIFList[shaderModNum].shaderSelectNum != shaderSelectors[shaderModNum].options[shaderSelectors[shaderModNum].selectedIndex].value){

                //supression et attribution a un nouvel element HTML option de l'attribut "select" de la liste de selection HTML
                shaderSelectors[shaderModNum].children[shaderIFList[shaderModNum].shaderSelectNum-1].removeAttribute("selected");
                shaderIFList[shaderModNum].shaderSelectNum = shaderSelectors[shaderModNum].options[shaderSelectors[shaderModNum].selectedIndex].value;
                shaderSelectors[shaderModNum].children[shaderIFList[shaderModNum].shaderSelectNum-1].setAttribute("selected", "");      
                
                //fonction de changement visuel du module shader (permet de correspondre au shader selectionné)
                let val= shaderIFList[shaderModNum].shaderSelectNum-1, opacity = opaNum;
                visualChangeBeforeListSelection(val, opacity);
            }

        }
        //ajout d'un shader dans la liste des shader d'un module
        shaderMoreBtns[shaderModNum].addEventListener("click", function(e){
            //ajout d'un shader dans le "compteur de shader" pour ensuite construire l'element html qui le representera
            shaderIFList[shaderModNum].shaderNum ++;
            shaderSelectors[shaderModNum].innerHTML += '<option value="' + shaderIFList[shaderModNum].shaderNum + '">' + shaderIFList[shaderModNum].shaderNum + '</option>';
            //suppression et ajout de l'attribut selected de l'option HTML de selection du shader
            shaderSelectors[shaderModNum].children[shaderIFList[shaderModNum].shaderSelectNum-1].removeAttribute("selected");
            shaderSelectors[shaderModNum].children[shaderIFList[shaderModNum].shaderNum-1].setAttribute("selected", "");
            //creation de l'objet représentant le nouveau shader
            shaderIFList[shaderModNum].shaderSelectNum = shaderIFList[shaderModNum].shaderNum;
            shaderModList[shaderModNum][shaderIFList[shaderModNum].shaderNum-1] = {
                placement : 100,
                color : {
                            hue : "#FFA200",
                            opacity : 100
                        }
            }

            //fonction de changement visuel du module shader (permet de correspondre au shader selectionné)
            let val= shaderIFList[shaderModNum].shaderNum-1, opacity = opaNum;
            visualChangeBeforeListSelection(val, opacity);
        })
        
        //suppression d'un shader dans la liste des shader d'un module
        shaderTrashBtns[shaderModNum].addEventListener("click", function(e){
            if(shaderIFList[shaderModNum].shaderNum > 1){
                shaderSelectors[shaderModNum].removeChild(shaderSelectors[shaderModNum][shaderIFList[shaderModNum].shaderSelectNum-1]);
                shaderModList[shaderModNum].splice(shaderIFList[shaderModNum].shaderSelectNum-1, 1)

                //boucle pour remplacer les elements HTML qui représente les shaders précédent celui supprimé, pour leurs assigné leur nouveau numéro
                for(i=shaderIFList[shaderModNum].shaderSelectNum-1; i<=shaderSelectors[shaderModNum].length-1; i++){
                    shaderSelectors[shaderModNum][i].innerHTML = i+1;
                    shaderSelectors[shaderModNum][i].setAttribute("value", i+1);
                }
                //selection du shader inférieur a celui supprimé apres sa suppression 
                if(shaderIFList[shaderModNum].shaderSelectNum-2 >= 0){
                    shaderIFList[shaderModNum].shaderNum --;
                    shaderSelectors[shaderModNum][shaderIFList[shaderModNum].shaderSelectNum-2].setAttribute("selected", "");
                    shaderIFList[shaderModNum].shaderSelectNum = shaderIFList[shaderModNum].shaderSelectNum-1; 
                }
                //quand le shader supprimé est le premier de la liste, quelques regle différente pour que cela fonctionne
                else if(shaderIFList[shaderModNum].shaderSelectNum-2 < 0){
                    shaderIFList[shaderModNum].shaderNum --;
                    shaderSelectors[shaderModNum][shaderIFList[shaderModNum].shaderSelectNum-1].setAttribute("selected", "");
                }
                //force la selection de l'option correspondant au shaderSelectNumber
                shaderSelectors[shaderModNum].selectedIndex = shaderIFList[shaderModNum].shaderSelectNum-1;
                //partie de la fonction qui change la partie visuel 
                let val= shaderIFList[shaderModNum].shaderSelectNum-1, opacity = opaNum;
                visualChangeBeforeListSelection(val, opacity);
            }
        })
        //event qui attribut la position des shaders grace au range du module shader
        shaderRanges[shaderModNum].addEventListener("input", function(){
            shaderModList[shaderModNum][shaderIFList[shaderModNum].shaderSelectNum-1].placement = shaderRanges[shaderModNum].value;
        })
        //event qui attribut la couleur des shaders grace a l'input couleur du module shader
        shaderColors[shaderModNum].addEventListener("input", function(){
            shaderModList[shaderModNum][shaderIFList[shaderModNum].shaderSelectNum-1].color.hue = shaderColors[shaderModNum].value;
        })
        //event qui attribut l'opacité des shaders grace a l'outil d'opacité du module shader
        opacityButtonList[opaNum].opacityRange.addEventListener("input", function(){
            shaderModList[shaderModNum][shaderIFList[shaderModNum].shaderSelectNum-1].color.opacity = opacityButtonList[opaNum].opacityRange.value;
        })



        //EVENT qui gere le changement détat du bouton, permettant selection soi d'un gradient lineaire ou radial
        selectGradients[shaderModNum].addEventListener('click', function(){
            //etat bouton definissant selection du gradient lineaire en JS et qui active le css pour changer le visuel du bouton en fonction
            if(shaderIFList[shaderModNum].interuptor == false){
                btnSelectGradients[shaderModNum].setAttribute("active","");
                degreeButtons[shaderModNum].removeAttribute("active");
                shaderModList[shaderModNum][0].gradient = "radial";
                shaderModList[shaderModNum][0].degree = undefined;
                shaderIFList[shaderModNum].interuptor = true;
            }
            //idem pour le gradient radial
            else{; 
                btnSelectGradients[shaderModNum].removeAttribute("active");
                degreeButtons[shaderModNum].setAttribute("active","");
                shaderModList[shaderModNum][0].gradient = "linear";
                shaderModList[shaderModNum][0].degree = shaderIFList[shaderModNum].degreeBtn.degree;
                shaderIFList[shaderModNum].interuptor = false;
            }
        })
        
            //fonction permettant de calculer le nouveau degré
            //fonctionne en comparant le placement de la souris une fois que l'on a appuyer sur le bouton de selection de degré
            //initialPlacementValue = relatif a initialValue, placementValue = placement suivant a InitialValue, degreeValue = valeur initial des degrè avant fonction.
            function calculDegree(initialPlacementValue, placementValue, degreeValue){
                let initialPlacement = initialPlacementValue, actualplacement = placementValue, degreeChange = degreeValue;
                let changementDegreeValue = (initialPlacement - actualplacement)*5;
            
                //changement de la valeur des degrés.
                shaderIFList[shaderModNum].degreeBtn.degree += changementDegreeValue;
                //deux boucle permettant de rester dans l'interval de 360
                if (shaderIFList[shaderModNum].degreeBtn.degree > 360){shaderIFList[shaderModNum].degreeBtn.degree = degreeChange-360;}
                else if (shaderIFList[shaderModNum].degreeBtn.degree < 0){shaderIFList[shaderModNum].degreeBtn.degree = 360 - degreeChange;}
            
                //premet le changement visuel du bouton
                degreeButtons[shaderIFList[shaderModNum].degreeBtn.btnNum].style.transform = "rotate(" + shaderIFList[shaderModNum].degreeBtn.degree + "deg)";
                //ajout de la nouvelle valeur des degrés au premier objet du tableau des shader
                shaderModList[shaderModNum][0].degree = shaderIFList[shaderModNum].degreeBtn.degree;
                //mise a jour de la valeur initial du placement du curseur pour pouvoir répété la fonction. 
                shaderIFList[shaderModNum].degreeBtn.initVal = actualplacement;
        
                /*placer sans doute ici le code permettant d'ajouter*/
            }
            //evenement permettant d'initialisé une valeurs de placement de la souris lorsqu'on clique sur le bouton
            degreeButtons[shaderIFList[shaderModNum].degreeBtn.btnNum].addEventListener('mousedown', function(event){
                if (degreeButtons[shaderIFList[shaderModNum].degreeBtn.btnNum].hasAttribute("active")){
                    shaderIFList[shaderModNum].degreeBtn.degreeInteruptor = true;
                    shaderIFList[shaderModNum].degreeBtn.initVal = event.clientY;
                }
            })
            //evement qui s'active lorsqu'on bouge la souris de haut en bas apres un clique qui n'est pas remonté
            body.addEventListener('mousemove', function(event){    
                if(shaderIFList[shaderModNum] != undefined){
                    if (degreeButtons[shaderIFList[shaderModNum].degreeBtn.btnNum].hasAttribute("active")){
                        let placement = event.clientY;
                        if (shaderIFList[shaderModNum].degreeBtn.degreeInteruptor == true){
                            beginCalculDegree = setInterval(calculDegree(shaderIFList[shaderModNum].degreeBtn.initVal, placement, shaderIFList[shaderModNum].degreeBtn.degree), 200);
                        }
                    }
                }      
            })
            //evenement qui s'active lorsqu'on remonte la souris, qui termine le processus de selection du degré
            //réinitialise une partie des valeurs pour pouvoir recommencer la selection une prochaine fois.
            body.addEventListener('mouseup', function(){
                if(shaderIFList[shaderModNum] != undefined){
                    if (degreeButtons[shaderIFList[shaderModNum].degreeBtn.btnNum].hasAttribute("active")){
                        if(shaderIFList[shaderModNum].degreeBtn.degreeInteruptor == true){
                            shaderIFList[shaderModNum].degreeBtn.degreeInteruptor = false;
                            clearInterval(beginCalculDegree);
                        }
                    }
                }
            })

    }
}