/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Element-Window (bar?)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
//Element module creation, in element windows

let moreElementBtn = document.getElementById("btn-more-tool");
let elementModulesContainer = document.getElementById("all-elements");

moreElementBtn.addEventListener("click", function(){
    fetch('data/element-module.txt')
    .then(response => response.text())
    .then(data => {

        elementModulesContainer.innerHTML += data;

    })
})