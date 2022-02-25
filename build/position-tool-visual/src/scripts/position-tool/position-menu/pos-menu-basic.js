function whenBasicIsSelect(){

    let block = document.getElementById("block");
    let inline = document.getElementById("inline");
    let blockInline = document.getElementById("block-inline");

    initBasicMenu()
    basicDisplaySelection();
    goToInitialMenu(selectPos);


    function initBasicMenu(){

        block.removeAttribute("selected");
        inline.removeAttribute("selected");
        blockInline.removeAttribute("selected");

        switch(posSetting.display.display){
            case undefined : block.setAttribute("selected", "");
                             posSetting.display = {  display : "block"  }; break;
            case "block" : block.setAttribute("selected", ""); break;
            case "inline" : inline.setAttribute("selected", ""); break;
            case "block-inline" : blockInline.setAttribute("selected", ""); break;
        }
    }

    function basicDisplaySelection(){
        block.addEventListener("click", function(){
            inline.removeAttribute("selected");
            blockInline.removeAttribute("selected");
            posSetting.display = {  display : "block"  };
            block.setAttribute("selected", "");
            console.log("test");
        })
        inline.addEventListener("click", function(){
            block.removeAttribute("selected");
            blockInline.removeAttribute("selected");
            posSetting.display = {  display : "inline"  };
            inline.setAttribute("selected", "");
        })
        blockInline.addEventListener("click", function(){
            block.removeAttribute("selected");
            inline.removeAttribute("selected");   
            posSetting.display = {  display : "block-inline"  };
            blockInline.setAttribute("selected", "");
        })
    }
}