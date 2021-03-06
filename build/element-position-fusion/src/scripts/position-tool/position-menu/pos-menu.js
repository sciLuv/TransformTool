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
        position: "intial",
        zIndex : 0,
        overflow : {
            x : "visible",
            y : "visible",
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
let allWidthSize;
let allHeightSize;
//use in posSize part of the menu to calculate all the width size of the container
function calcWidth(){
    console.log(Number(posSize.width) + " "+ Number(posSize.margin.left) + " "+ Number(posSize.margin.right) + " "+ Number(posSize.padding.left) + " "+ Number(posSize.padding.right));
    allWidthSize = Number(posSize.width) + Number(posSize.margin.left) + Number(posSize.margin.right) + Number(posSize.padding.left) + Number(posSize.padding.right);
    return allWidthSize;
}
function calcHeight(){
    allHeightSize = Number(posSize.height) + Number(posSize.margin.top) + Number(posSize.margin.bottom) + Number(posSize.padding.top) + Number(posSize.padding.bottom);
    return allHeightSize;
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

    //here after deselection of all btn
    //this function define the way to select new html for the content of the menu delete the actual
    //and define global style for each html selected (under menu)
    function posSelection(posSelect){
        if (selectPos != posSelect.getAttribute("pos")){

            basicSelect.removeAttribute("selected");
            flexSelect.removeAttribute("selected");
            gridSelect.removeAttribute("selected");

            //the line just after is to get the exact name of the futur html file load after
            //use an attribute in the btn associate to do that
            selectPos = posSelect.getAttribute("pos");
        }
        //here the specific code to delete old html and select and add new html
        posMenu.removeAttribute("base");
        posMenu.innerHTML = "";
        posMenu.setAttribute(selectPos, "");
        fetch('data/position/' + selectPos + '.html')
        .then(response => response.text())
        .then(data => {
            posMenu.innerHTML = data;
            posMenuContent = document.getElementById("pos-menu-content");
            //here trigger the function contain all specific rules of each under-menu
            switch(selectPos){
                case "basic" : whenBasicIsSelect(); break;
                case "flex" : whenFlexIsSelect(); break;
                case "grid" : whenGridIsSelect(); break;

                case "free" : whenFreeIsSelect(); break;
                case "size" : whenSizeIsSelect();break;
            }
        })
    }
    //here event use last function posSelection to access to each under menu
    basicSelect.addEventListener("mousedown", function(){posSelection(basicSelect);});
    flexSelect.addEventListener("mousedown", function(){posSelection(flexSelect);});
    gridSelect.addEventListener("mousedown", function(){posSelection(gridSelect);});

    freeSelect.addEventListener("mousedown", function(){posSelection(freeSelect);});
    sizeSelect.addEventListener("mousedown", function(){posSelection(sizeSelect);});
}

baseMenu();
let goBackMenu;

//for all under menu, there are a event associate to the btn to go back to the base menu
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
            baseMenu();
            selectAttributeIfItsDisplay();
            underElemsContainer.removeAttribute("active");
        })
    })
}

//to put in state of selection btn link of the display of the object of display 
function selectAttributeIfItsDisplay(){
    switch(posSetting.display.display){
        case "block" : basicSelect.setAttribute("selected", ""); break;
        case "inline" : basicSelect.setAttribute("selected", ""); break;
        case "block-inline" : basicSelect.setAttribute("selected", ""); break;
        case "flex" : flexSelect.setAttribute("selected", ""); break;
        case "grid" : gridSelect.setAttribute("selected", ""); break;
    }
}
