let angleCodeOpener = true;


let codeGen = document.getElementById("code-gen");
let codeGenOpener = document.getElementById("code-angle");


codeGenOpener.addEventListener("click", function(){
    console.log("test");
    if(angleCodeOpener == false){
        console.log("test2");
        codeGen.setAttribute("close","");
        angleCodeOpener = true;
    }
    else{
        codeGen.removeAttribute("close");
        angleCodeOpener = false;
    }
})


//~~~~~~~~~~~~~~MOVE OF WINDOW-ELEMENT~~~~~~~~~~~~~~~~~//

//part of the top pf element-window 
let codePlace = document.getElementById("code-placement");
//html tag content the element-tool
let codeContent = document.getElementById("move-code-tool");

//boolean : false = moving is inactivate
let codePlaceActive = false;
let initPlaceXCode, initPlaceYCode;

//Event for beginning the element-window moving, and assign initial value of X/Y
codePlace.addEventListener("mousedown", function(event){
    elemMousePlace = event.target.getBoundingClientRect();
    initPlaceXCode = event.clientX - elemMousePlace.left;
    initPlaceYCode = event.clientY - elemMousePlace.top;
    //body.setAttribute("active","");
    codePlace.setAttribute("active","");
    codePlaceActive = true;

})
//Event for beginning the element-window moving,
codePlace.addEventListener("mouseup", function(event){
    //body.removeAttribute("active");
    codePlace.removeAttribute("active");
    codePlaceActive = false;
})
//Event for ending the element-window moving,
body.addEventListener('mouseup', function(event){
    if(codePlaceActive == true){
        //body.removeAttribute("active");
        codePlace.removeAttribute("active");
        codePlaceActive = false;
    }
})
//Event for calculate and applicate move
body.addEventListener('mousemove', function(event){
    if(codePlaceActive == true){
        codeContent.style.left = Math.round((event.clientX - initPlaceXCode))+ "px";
        codeContent.style.top = Math.round((event.clientY - initPlaceYCode)) + "px";
    }
})