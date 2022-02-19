let posAngle = document.getElementById("pos-angle");
let posOpener = document.getElementById("position-menu-opener");
let posMenu = document.getElementById("position-menu");

let posMenuContent; 
posMenuContent = document.getElementById("pos-menu-content");

let posToolOpen = false;

posAngle.addEventListener("click", function(){
    if(posToolOpen == false){
        posToolOpen = true;
        posOpener.setAttribute("active", ""); 
        posMenu.setAttribute("active", ""); 
        posMenuContent.removeAttribute("inactive");
    }
    else{
        posToolOpen = false;
        posOpener.removeAttribute("active");
        posMenu.removeAttribute("active");
        let inativeposMenuContent = window.setTimeout(inativationContent, 300);
    }
})

function inativationContent(){
    posMenuContent.setAttribute("inactive", "");
}

let posContainerSetting = {
    selectPos : "none",
    posMenuOpen : false,
    settingPos : {}
}

let freeSelect;
let flexSelect;
let gridSelect;

function baseMenu(){
    freeSelect = document.getElementById("free-pos-select");
    flexSelect = document.getElementById("flex-pos-select");
    gridSelect = document.getElementById("grid-pos-select");

    function posSelection(posSelect){
        console.log("test");
        if (posContainerSetting.selectPos != posSelect.getAttribute("pos")){

            freeSelect.removeAttribute("selected");
            flexSelect.removeAttribute("selected");
            gridSelect.removeAttribute("selected");

            posContainerSetting.selectPos = posSelect.getAttribute("pos");
            posSelect.setAttribute("selected", "");
        }

        posMenu.removeAttribute("base");
        posMenu.setAttribute(posContainerSetting.selectPos, "");
        fetch('data/position/' + posContainerSetting.selectPos + '.html')
        .then(response => response.text())
        .then(data => {
            posMenu.innerHTML = data;
            posMenuContent = document.getElementById("pos-menu-content");
            if(posContainerSetting.selectPos == "free"){
                whenFreeIsSelect();
            }
            else if (posContainerSetting.selectPos == "flex"){
                whenFlexIsSelect();
                flexBtns();
            }
            else if (posContainerSetting.selectPos == "grid"){

            }
    })
    }

    freeSelect.addEventListener("mousedown", function(){posSelection(freeSelect);});
    flexSelect.addEventListener("mousedown", function(){posSelection(flexSelect);});
    gridSelect.addEventListener("mousedown", function(){posSelection(gridSelect);});
}
baseMenu();


function whenFreeIsSelect(){
    let goBefore = document.getElementById("go-before");
    goBefore.addEventListener("mousedown", function(){
        posMenu.setAttribute("base", "");
        posMenu.innerHTML = "";
        posMenu.removeAttribute("free");
        fetch('data/position/base.html')
        .then(response => response.text())
        .then(data => {
            posMenu.innerHTML = data;
            posMenuContent = document.getElementById("pos-menu-content");
            baseMenu();
            freeSelect.setAttribute("selected", "");
    })
    })
}

function whenFlexIsSelect(){
    let goBefore = document.getElementById("go-before");
    goBefore.addEventListener("mousedown", function(){
        posMenu.setAttribute("base", "");
        posMenu.innerHTML = "";
        posMenu.removeAttribute("flex");
        fetch('data/position/base.html')
        .then(response => response.text())
        .then(data => {
            posMenu.innerHTML = data;
            posMenuContent = document.getElementById("pos-menu-content");
            baseMenu();
            flexSelect.setAttribute("selected", "");
    })
    })
}

function flexBtns(){
    let selectFlexXY = document.getElementById("interuptor-flex-direction");
    let interuptorFlexRowColumn = document.getElementById("flex-positions");
    
    let flexXY = false;
    
    selectFlexXY.addEventListener('click', function(){
        if(flexXY == false){
            interuptorFlexRowColumn.setAttribute("active","");
            flexXY = true;
        }
        else{
            interuptorFlexRowColumn.removeAttribute("active");
            flexXY = false;
        }
    })

    let selectFlexAxe1 = document.getElementById("first-axe-interuptor");
    let interuptorFlexStartEnd1 = document.getElementById("first-axe-under-interuptor");
    
    let flexStartEnd1 = "start";
    
    selectFlexAxe1.addEventListener('click', function(){
        if(flexStartEnd1 == "start"){
            interuptorFlexStartEnd1.setAttribute("middle","");
            flexStartEnd1 = "middle";
        }
        else if(flexStartEnd1 == "middle"){
            interuptorFlexStartEnd1.removeAttribute("middle");
            interuptorFlexStartEnd1.setAttribute("end","");
            flexStartEnd1 = "end";
        }
        else{
            interuptorFlexStartEnd1.removeAttribute("end");
            flexStartEnd1 = "start";
        }
    })

    let selectFlexAxe2 = document.getElementById("second-axe-interuptor");
    let interuptorFlexStartEnd2 = document.getElementById("second-axe-under-interuptor");
    
    let flexStartEnd2 = "start";
    
    selectFlexAxe2.addEventListener('click', function(){
        if(flexStartEnd2 == "start"){
            interuptorFlexStartEnd2.setAttribute("middle","");
            flexStartEnd2 = "middle";
        }
        else if(flexStartEnd2 == "middle"){
            interuptorFlexStartEnd2.removeAttribute("middle");
            interuptorFlexStartEnd2.setAttribute("end","");
            flexStartEnd2 = "end";
        }
        else{
            interuptorFlexStartEnd2.removeAttribute("end");
            flexStartEnd2 = "start";
        }
    })
}