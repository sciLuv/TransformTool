//JS representation of the opener btn of the position menu
let posOpener = document.getElementById("pos-angle");
//JS representation of the tool position title container (contain "position tool title" and the opener menu btn)
let posToolTitle = document.getElementById("position-menu-opener");
//JS representation of the position menu container
let posMenu = document.getElementById("position-menu");
//JS representation of the position menu content
let posMenuContent = document.getElementById("pos-menu-content");

//if menu is open this variable is true
let posToolOpen = false;

//Event for give specific attribut to the opener and the tool title 
//in function of there opening and closing 
posOpener.addEventListener("click", function(){
    if(posToolOpen == false){
        posToolOpen = true;
        posToolTitle.setAttribute("active", ""); 
        posMenu.setAttribute("active", ""); 
        posMenuContent.removeAttribute("inactive");
    }
    else{
        posToolOpen = false;
        posToolTitle.removeAttribute("active");
        posMenu.removeAttribute("active");
        let inativeposMenuContent = window.setTimeout(inativationContent, 300);
    }
})
//exclusively use in the Event just before 
//for give specific attribut for few ms to the position menu content
function inativationContent(){
    posMenuContent.setAttribute("inactive", "");
}

//variable for the position tool menu change innerHTML and associate css 
//in function of selection (flex basic ect) 
let selectPos = "none";

let lastSelectPosMenu;
let lastSelectPosMenuDisplay;

//object contain all variable set in the menu for application on the element's container
let posSetting = {
    free : {
        position: "none",
        zIndex : 0,
        overflow : "visible"
    },
    size : {
        width : 100, height : 100,
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

//next 5variables declare in global scope to be accessible for all function 
//variables represent futur HTML btn to access to different display menu
let basicSelect;
let flexSelect;
let gridSelect;
//variables represent futur HTML btn to access to position (relative, abs) and size menu
let freeSelect;
let sizeSelect;

//function to change the begin of the position menu to an specific part of it
//this function is call each time we enter in the begin of the menu and be call in function of all part of the menu
//this function call data content the HTML of the other part of the menu to rewrite the content of the position menu
function baseMenu(){
    //assign the HTML btn for other part of the menu each time, avoid "undefined", that why this variable are declar in global scope
    basicSelect = document.getElementById("basic-pos-select");
    flexSelect = document.getElementById("flex-pos-select");
    gridSelect = document.getElementById("grid-pos-select");

    freeSelect = document.getElementById("free-pos-select");
    sizeSelect = document.getElementById("size-pos-select");

    function posSelection(posSelect){
        if (selectPos != posSelect.getAttribute("pos")){

            basicSelect.removeAttribute("selected");
            flexSelect.removeAttribute("selected");
            gridSelect.removeAttribute("selected");

            selectPos = posSelect.getAttribute("pos");
        }
        //
        posMenu.removeAttribute("base");
        posMenu.innerHTML = "";
        posMenu.setAttribute(selectPos, "");
        fetch('data/position/' + selectPos + '.html')
        .then(response => response.text())
        .then(data => {
            posMenu.innerHTML = data;
            posMenuContent = document.getElementById("pos-menu-content");
            switch(selectPos){
                case "basic" : whenBasicIsSelect(); break;
                case "flex" : whenFlexIsSelect(); break;
                case "grid" : whenGridIsSelect(); break;

                case "free" : whenFreeIsSelect(); break;
                case "size" : whenSizeIsSelect();break;
            }
        })
    }

    basicSelect.addEventListener("mousedown", function(){posSelection(basicSelect);});
    flexSelect.addEventListener("mousedown", function(){posSelection(flexSelect);});
    gridSelect.addEventListener("mousedown", function(){posSelection(gridSelect);});

    freeSelect.addEventListener("mousedown", function(){posSelection(freeSelect);});
    sizeSelect.addEventListener("mousedown", function(){posSelection(sizeSelect);});
}

baseMenu();
let goBackMenu;

//fonction goBack
function goToInitialMenu(posMenuSectionName){
    goBackMenu = document.getElementById("go-before");
    goBackMenu.addEventListener("mousedown", function(){
        posMenu.setAttribute("base", "");
        posMenu.innerHTML = "";
        posMenu.removeAttribute(posMenuSectionName);
        fetch('data/position/base.html')
        .then(response => response.text())
        .then(data => {
            posMenu.innerHTML = data;
            posMenuContent = document.getElementById("pos-menu-content");
            baseMenu();
            selectAttributeIfItsDisplay(posMenuSectionName);
        })
    })
}

function selectAttributeIfItsDisplay(posMenuSectionName){
    switch(posMenuSectionName){
        case "basic" : basicSelect.setAttribute("selected", ""); break;
        case "flex" : flexSelect.setAttribute("selected", ""); break;
        case "grid" : gridSelect.setAttribute("selected", ""); break;
    }
}
