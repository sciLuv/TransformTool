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

//représente chaque le conteneur de toutes les barres d'elements
let elementModulesContainer = document.getElementById("all-elements");
//représente chaque itération d'une barre d'element dans un tableau
let elements = document.getElementsByClassName("html-element");

//tab représentant chaque itération de l'iput text-id
let idNames = document.getElementsByClassName("text-id");

let colors = document.getElementsByClassName("color-element-input");

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

//list of HTML element of reset btn(in each element-bar)
let resetBtns = document.getElementsByClassName("element-bar-reset");
//list of HTML element of trash btn(in each element-bar)
let trashBtns = document.getElementsByClassName("element-bar-trash");

//represent more-btn of the element-window
let moreElementBtn = document.getElementById("btn-more-tool");

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

let position = document.getElementById("position");

let posIF = document.getElementById("position-interface");

let topElemsContainer = document.getElementById("top-position-elems-container");
let elemsContainer = document.getElementById("position-elems-container");
let underElemsContainer = document.getElementById("under-position-elems-container");

let positionMove = document.getElementById("position-move");

let moreBtn2 = document.getElementById("btn-more-tool");
let lessBtns = document.getElementsByClassName("element-bar-trash")

let openClosePosArrow = document.getElementById("pos-angle-img");

//JS representation of the opener btn of the position menu
let posOpener = document.getElementById("pos-angle");
//JS representation of the tool position title container (contain "position tool title" and the opener menu btn)
let posToolTitle = document.getElementById("position-menu-opener");
//JS representation of the position menu container
let posMenu = document.getElementById("position-menu");
//JS representation of the position menu content
let posMenuContent = document.getElementById("pos-menu-content");