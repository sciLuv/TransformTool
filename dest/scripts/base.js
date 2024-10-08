//VARIABLES GLOBALE

//ELEMENT TOOL VARIABLE

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
//représente l'element-tool dans son ensemble
let allElement = document.getElementById("all-elements");

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~OPACITY-BTN-RANGES~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//4 tableaux qui contiennent l'ensemble des balises construisant la structure HTML de l'outil d'opacité
//btn qui ouvre le conteneur du range
let opaHTMLBtns = document.getElementsByClassName("opacity-btn");
//pastille de niveau de gris a l'interieur de l'opacityHTMLButton qui représente visuellement l'état d'opacité 
let opaHTMLInsideBtns = document.getElementsByClassName("inside-opacity-btn");
//conteneur du range gérant l'opacité, caché tant qu'opacityHTMLButton n'est pas cliqué
let opaHTMLRangeContainers = document.getElementsByClassName("opacity-range-container");
//element exclusivement graphique pour plus de clarté pour l'utilisateur lors de l'ouverture du range
let opaHTMLArrows = document.getElementsByClassName("opacity-range-container-arrow");
//le range qui gere l'opacité lui même
let opaHTMLRanges = document.getElementsByClassName("opacity-range");

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CHANGE-LIST-PLACE-ELEMENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
let listPlaces = document.getElementsByClassName("list-place-elem");
let temporaryElem = document.getElementsByClassName('temporary-elem');
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ID-INPUT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//représente chaque le conteneur de toutes les barres d'elements
let elementModulesContainer = document.getElementById("all-elements");
//représente chaque itération d'une barre d'element dans un tableau
let elements = document.getElementsByClassName("html-element");

//tab représentant chaque itération de l'iput text-id
let idNames = document.getElementsByClassName("text-id");

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~COLOR-INPUT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
let colors = document.getElementsByClassName("color-element-input");

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~BORDER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//Tableau des balises HTML de selection des bordures
let borderSelectors = document.getElementsByClassName("border-select");
//Tableau des différentes parties HTML de l'outil de selection des bordures
let topBorderSelectors = document.getElementsByClassName("border-top");
let leftBorderSelectors = document.getElementsByClassName("border-left");
let rightBorderSelectors = document.getElementsByClassName("border-right");
let bottomBorderSelectors = document.getElementsByClassName("border-bottom");
//Tableau des balises HTML centrale du selecteur de bords (carré au millieu du selecteur) 
let borderSelects = document.getElementsByClassName("all-borders");
//Tableau des (dans l'ordre) des inputs range HTML de selection de la taille des bordures, de leurs couleurs et de leurs styles. 
let borderRanges = document.getElementsByClassName("border-range");
let borderColors = document.getElementsByClassName("border-color");
let borderStyles = document.getElementsByClassName("border-style");

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CORNER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//taleau des balises HTML des boutons de selection PX/%
let btnPxPcs = document.getElementsByClassName("button-pixel-percent");
//Tableaux des balises HTML de selection des coins
let cornerSelectors = document.getElementsByClassName("corner-select");
//Représentation des différentes parties HTML de l'outil de selection des coins
let topLefts = document.getElementsByClassName("top-left");
let topRights = document.getElementsByClassName("top-right");
let bottomRights = document.getElementsByClassName("bottom-right");
let bottomLefts = document.getElementsByClassName("bottom-left");
//Tableau des balises HTML centrale du selecteur de coin (rond au millieu du selecteur) 
let cornerSelects = document.getElementsByClassName("all");
//représentation de l'input range qui gere la courbure des coins
let radiusRanges = document.getElementsByClassName("range-radius");

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

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~BOX~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
let boxSelectors = document.getElementsByClassName("box-list");
let boxMoreBtns = document.getElementsByClassName("element-more-box");
let boxTrashBtns = document.getElementsByClassName("element-trash-box");
let boxInsetCheckBoxs = document.getElementsByClassName("box-inset-checkbox");
let boxRangeXYs = document.getElementsByClassName("box-range-x-y");
let boxRangeBSs = document.getElementsByClassName("box-range-blur-spread");
let boxColors = document.getElementsByClassName("box-color");

//tableaux des représentation JS des elements HTML lié au bouton de selection de l'axe XY
//tableau des boutons eux même
let selectXYs = document.getElementsByClassName("select-x-y-btn");
//tableau des interupteurs a l'interieur du bouton 
let interuptorSelectsXYs = document.getElementsByClassName("x-y-interuptor");

//tableaux des représentation JS des elements HTML lié au bouton de selection du spread/blur
//tableau des boutons eux même
let selectBlurSpreads = document.getElementsByClassName("select-blur-spread-btn");
//tableau des interupteurs a l'interieur du bouton
let interuptorSpreadBlurs = document.getElementsByClassName("spread-blur-interuptor");

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~TRASH-RESET-MORE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//list of HTML element of reset btn(in each element-bar)
let resetBtns = document.getElementsByClassName("element-bar-reset");
//list of HTML element of trash btn(in each element-bar)
let trashBtns = document.getElementsByClassName("element-bar-trash");

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ELEMENT-MODULE-ADDING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
//represent more-btn of the element-window
let moreElementBtn = document.getElementById("btn-more-tool");

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ELEMENT-WINDOWS-ANIMATION~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//~~~~~~~~~~~~~~OPEN-CLOSE-GROW-DECREASE~~~~~~~~~~~~~~~~~//
//represent whole "element-tool-window" HTML
let beforeElemTool = document.getElementsByClassName("element-tool");
let elemTool = beforeElemTool[0]; 
//represent HTML tag content of all element-bar
let allElem = document.getElementById("all-elements");
//represent btn to open and close element tool
let angle = document.getElementById("angle");
//represent separation next to more btn in HTML
let beforeTitleSeparation = document.getElementsByClassName("element-title-separation");
let titleSeparation = beforeTitleSeparation[0];
//more button in html
let moreBtn = document.getElementById("btn-more-tool");


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~NON-DOM-VAR~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//tableau contenant les objets représentant les outils d'opacité de toutes les barres d'éléments

let elemList  = [];
let elemIFList = [];
//ELEMENT-WINDOWS-ANIMATION
//counter for the number of element-bar/module
let moduleCounter = 0;

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

//POSITION TOOL VARIABLE
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~GLOBAL-POSITION~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
let position = document.getElementById("position");
let posIF = document.getElementById("position-interface");

let topElemsContainer = document.getElementById("top-position-elems-container");
let elemsContainer = document.getElementById("position-elems-container");
let underElemsContainer = document.getElementById("under-position-elems-container");

let moreBtn2 = document.getElementById("btn-more-tool");
let lessBtns = document.getElementsByClassName("element-bar-trash");

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~POSITION-VISIBILITY~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
let openClosePosArrow = document.getElementById("pos-angle-img");

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~POSITION-MENU~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//JS representation of the opener btn of the position menu
let posOpener = document.getElementById("pos-angle");
//JS representation of the tool position title container (contain "position tool title" and the opener menu btn)
let posToolTitle = document.getElementById("position-menu-opener");
//JS representation of the position menu container
let posMenu = document.getElementById("position-menu");
//JS representation of the position menu content
let posMenuContent = document.getElementById("pos-menu-content");

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~IN-POSITION-MARGE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
let inPositionPaddingTop = document.getElementsByClassName("horizon-padding");
let inPositionPaddingLeft = document.getElementsByClassName("vertical-padding");

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~NON-DOM-VAR~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//if menu is open this variable is true
let posToolOpen = false;

let posIFWidthMin = 244;
let posIFHeightMin = 125;

let topPosition = 327;
let leftPosition = 714;

//POSITION-VISIBILITY
let mouseIsOnPos = false;

//POSITION-MENU
//variable for the position tool menu change innerHTML and associate css 
//in function of selection (flex basic ect) 
let selectPos = "none";

let lastSelectPosMenu;
let lastSelectPosMenuDisplay;

//object contain all variable set in the menu for application on the element's container
let posSetting = {
    free : {
        position: "intial",
        zIndex : 0,
        overflow : {
            x : "visible", y : "visible",
            interuptor : "xy" 
        }
    },
    size : {
        width : 250, height : 150,
        padding : {
            top : 0, bottom : 0, left : 0, right : 0
        },
        margin : {
            top : 0, bottom : 0, left : 0, right : 0
        },
        menu : {
            size : "width",
            margin : {
                top : false, left : false, right : false, bottom : false
            },
            padding : {
                top : false, left : false, right : false, bottom : false
            }
        }
    },
    display : { display : "block"}
}

let posSize = posSetting.size;
let allWidthSize, allHeightSize;

//next 5variables declare in global scope to be accessible for all function 
//variables represent futur HTML btn to access to different display menu
let basicSelect, flexSelect, gridSelect;
//variables represent futur HTML btn to access to position (relative, abs) and size menu
let freeSelect, sizeSelect;
let goBackMenu;

//futur array used in calcGrid() to put in firsts (vertical for row/horizontal for column) cels of each row/grid of the under-position-elems-container
let gridRowCelSizeList;
let gridColumnCelSizeList;

//global variable use to put value in to calculate place of clicked elem in an grid display context
let rowNumb;
let columnNumb;

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CODE-GEN-VAR~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
let angleCodeOpener = true;

let codeGen = document.getElementById("code-gen");
let codeGenOpener = document.getElementById("code-angle");
let codeGenOpenerImg = document.getElementById("code-angle-img");
let contentCodeGen = document.getElementById("content-code-gen");
let htmlCodePlace = document.getElementById('html');
let cssCodePlace = document.getElementById('css');
let copyBtn = document.getElementById("code-copy-container");

let htmlBtn = document.getElementById('html-button');
let cssBtn = document.getElementById('css-button');

let codeHTML = "";
let codeCSS = ""

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~TEXT-TOOL-VAR~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
let textButtons = document.getElementsByClassName("text-btn");

let textTool = document.getElementById("text-tool-container");
let closeTextToolBtn = document.getElementById("text-tool-closer-btn");

let resetBtn = document.getElementById("reset-text-img-container");

let boldBtn = document.getElementById("bold-text");
let italicBtn = document.getElementById("italic-text");

let underlineBtn = document.getElementById("underline-text");
let lineThroughBtn = document.getElementById("line-through-text");
let overlineBtn = document.getElementById("overline-text");

let textDecorationStyleSelect = document.getElementById("select-text-decoration-style");
let textDecorationColorInput = document.getElementById("text-decoration-color-input");

let alignJustifyBtn = document.getElementById("text-align-justify");
let alignRightBtn = document.getElementById("text-align-right");
let alignCenterBtn = document.getElementById("text-align-center");
let alignLeftBtn = document.getElementById("text-align-left");

let selectFontFamily = document.getElementById("select-font-family");

let fontSizeRange = document.getElementById("font-size-range");

let textColorInput = document.getElementById("text-color");

let letterSpacingRadio = document.getElementById("letter");
let wordSpacingRadio = document.getElementById("word");
let lineSpacingRadio = document.getElementById("line");

let enlargeSpaceBtn = document.getElementById("enlarge-space");
let decreaseSpaceBtn = document.getElementById("decrease-space");

let shadowTextSelect = document.getElementById("shadow-text-list");
let shadowTextMoreBtn = document.getElementById("shadow-text-more-btn");
let shadowTextTrashBtn = document.getElementById("shadow-text-trash-btn");
let btnTextShadow = document.getElementById("x-y-button-shadow-text");
let shadowTextXYRange = document.getElementById("shadow-text-x-y-input-range");
let shadowTextBlurRange = document.getElementById("text-shadow-blur-input-range");
let shadowTextColorInput = document.getElementById("shadow-text-color-input");

let whiteSpaceSelect = document.getElementById("white-space-select");

let textTagSpan = document.getElementById("span");
let textTagP = document.getElementById("p");
let textTagH1 = document.getElementById("h1");
let textTagH2 = document.getElementById("h2");
let textTagH3 = document.getElementById("h3");

let textWrite = document.getElementById("text-content");
let textResult = document.getElementById("result-text");

let textAddBtn = document.getElementById("text-add-btn");
let trashAllTextBtn = document.getElementById("element-text-trash-btn");
let displayElementInTextTool = document.getElementById("displaying-element");

let textAssociateElemNum = 0;
let elementTextaddedNumber = 0;
let enlargingInterval, decreasingInterval;
let copy;
//VARIABLES AND FUNCTION USED TO MOVE WINDOWS TOOL BY DRAG AND MOVE

//Variables needed to move windows of each tools
    //represent moved HTML tag 
    let posContent = document.getElementById("position");
    let elemContent = document.getElementById("move-element-tool");
    let codeContent = document.getElementById("move-code-tool");

    let textContent = document.getElementById("text-tool");
    let textResultContent = document.getElementById("text-result-text-in-element");
    //represent the drag & move HTML tag 
    let posPlace = document.getElementById("position-placement");
    let elemPlace = document.getElementById("element-placement");
    let codePlace = document.getElementById("title-and-categories");

    let textPlace = document.getElementById("text-placement");
    let textResultPlace = document.getElementById("result-title-container")
    //represent the state of the moving, if the drag & move HTML tag is clicked == true / else == false
    let posPlaceActive = false;
    let elemPlaceActive = false;
    let codePlaceActive = false;

    let textPlaceActive = false;
    let textResultPlaceActive = false;
    //initial position of the moved HTML tag in X/Y axis
    let posInitPlaceX, posInitPlaceY;
    let elemInitPlaceX, elemInitPlaceY;
    let codeInitPlaceX, codeInitPlaceY;

    let textInitPlaceX, textInitPlaceY;
    let textResultInitPlaceX, textResultInitPlaceY;
/* calculate the moving of the windows :
    dropToMoveElem :  moved HTML tag / initPlaceX, initPlaceY : initial position X/Y
    placeActive: the state of moving / tool : moved HTML tag  */
function movingTool(dropToMoveElem, initPlaceX, initPlaceY, placeActive, tool){
//set up inital value of all variables for moving the window with the mouse
dropToMoveElem.addEventListener("mousedown", function(event){
    let mousePlace = event.target.getBoundingClientRect();
    initPlaceX =  event.pageX - (mousePlace.left + (event.pageX - event.clientX));
    initPlaceY =  event.pageY - (mousePlace.top + (event.pageY - event.clientY));
    placeActive = true;
    tool.setAttribute("active","");
})
//Event for beginning the element-window moving,
dropToMoveElem.addEventListener("mouseup", function(event){
    placeActive = false;
    tool.removeAttribute("active");
})
//Event for ending the element-window moving,
body.addEventListener('mouseup', function(event){
    if(placeActive == true){
        body.removeAttribute("active");
        tool.removeAttribute("active");
        placeActive = false;
    }
    if(tool == position){
        inPositionPlacement();
    }
})
//Event for calculate and applicate move
body.addEventListener('mousemove', function(event){
    if(placeActive == true){
        tool.style.top = Math.round(event.pageY - initPlaceY) + "px";
        tool.style.left = Math.round(event.pageX - initPlaceX) + "px";

        if(tool == position){
            topPosition = Math.round(event.pageY - initPlaceY);
            leftPosition = Math.round(event.pageX - initPlaceX);
        }
    }
})
}

//call moving function for each tool's windows
movingTool(posPlace, posInitPlaceX, posInitPlaceY, posPlaceActive, posContent);
movingTool(elemPlace, elemInitPlaceX, elemInitPlaceY, elemPlaceActive, elemContent);
movingTool(codePlace, codeInitPlaceX, codeInitPlaceY, codePlaceActive, codeContent);
movingTool(textPlace,textInitPlaceX, textInitPlaceY, textPlaceActive, textContent);
movingTool(textResultPlace,textResultInitPlaceX, textResultInitPlaceY, textResultPlaceActive, textResultContent);