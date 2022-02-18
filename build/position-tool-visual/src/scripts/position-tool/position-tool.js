let posAngle = document.getElementById("pos-angle");
let posOpener = document.getElementById("position-menu-opener");
let posMenu = document.getElementById("position-menu");

let posMenuContent = document.getElementById("pos-menu-content");

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
        fetch('data/position/' + posContainerSetting.selectPos + '.txt')
        .then(response => response.text())
        .then(data => {
            posMenu.innerHTML = data;
            if(posContainerSetting.selectPos == "free"){
                whenFreeIsSelect();
            }
            else if (posContainerSetting.selectPos == "flex"){
                whenFlexIsSelect();

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
        fetch('data/position/base.txt')
        .then(response => response.text())
        .then(data => {
            posMenu.innerHTML = data;
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
        fetch('data/position/base.txt')
        .then(response => response.text())
        .then(data => {
            posMenu.innerHTML = data;
            baseMenu();
            flexSelect.setAttribute("selected", "");
    })
    })
}