body.addEventListener('keydown', move);
function move (event){
  let key = event.key;
  if (key == 0){
    console.log("elementList :");
    console.log(elementList);
    console.log("colorModuleList :");
    console.log(colorModuleList);
    console.log("shaderModuleList :");
    console.log(shaderModuleList);
    console.log("cornerModuleList :");
    console.log(cornerModuleList);
    console.log("borderModuleList :");
    console.log(borderModuleList);
    console.log("boxModuleList :");
    console.log(boxModuleList);
  }
}