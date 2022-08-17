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