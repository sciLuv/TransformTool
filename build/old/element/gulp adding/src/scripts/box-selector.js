//BOXSELECTOR///////////////////////////////////////////
let boxButtonRangeSelects = document.getElementsByClassName("box-select-range");
let boxInteruptorRangeSelects = document.getElementsByClassName("box-select-range-interuptor");


for(i=0; i<=boxButtonRangeSelects.length-1; i++){
    let interuptor = false;
    let boxButtonNumber = i;
    boxButtonRangeSelects[boxButtonNumber].addEventListener('click', function(){
        if(interuptor == false){
            boxInteruptorRangeSelects[boxButtonNumber].style.marginLeft = "10px";
            interuptor = true;
        }
        else{
            boxInteruptorRangeSelects[boxButtonNumber].style.marginLeft = "-1px"; 
            interuptor = false;
        }
})
}