function GameLoop() {
    init_playfield();   
}

//I suppose the thing we need to do initially is load some sort of map

function init_playfield() {
    data = readTextFile("map.txt");
    
    //data = "0.0|0.0|0.0|0.0|0.0|0.0%0.0|0.0|0.0|0.0|0.0|0.0%0.0|0.0|0.0|0.0|0.0|0.0%0.0|0.0|0.0|0.0|0.0|0.0";
    var mapArray = data.split('%');
    
    for (i=0; i <= mapArray.length-1; i++) {
        
        mapArray[i] = mapArray[i].split('|');   
    }
    
    //Image Mapping
    var Blank = ['CryptoTechTile', 0];
    var Node = ['CryptoTechTileNode', 1];
    var Hash = ['CryptoTechHash', 2];
    var Server = ['CryptoTechServer', 3];
    var AI = ['CryptoTechTileAI', 4];
    var Home = ['CryptoTechHome', 5];
   
    //Create the playing field
    $("body").append("<div class = 'PlayDiv'></div>");
    
    $(".PlayDiv").append("<table class = 'PlayTable' cellpadding = '0' cellspacing = '0'>");
    for (i = 0; i <= mapArray.length-1; i++) {
        $(".PlayTable").append("<tr id = row"+i+">");
        for (j = 0; j <= mapArray[0].length-1; j++){
            $("#row"+i).append("<td id = "+i+""+j+" class = 'PlayCell'></td>");   
        }
        $(".PlayTable").append("</tr>");
    }
    $(".PlayDiv").append("</table>")
    //Substitute the correct images for the given variables
    for (i = 0; i <= mapArray.length-1; i++) {
        for (j = 0; j <= mapArray[0].length-1; j++){
            var currVal = mapArray[i][j];
            tile =(currVal.split('.'))[0]
            rot = (currVal.split('.'))[1];
            if (tile == Blank[1]) {
                
                $("#"+i.toString()+j.toString()).prepend('<img src="Tiles/'+Blank[0]+rot+'.png"/>');
            }
            if (tile == Node[1] ) {
                $("#"+i.toString()+j.toString()).prepend('<img src="Tiles/'+Node[0]+rot+'.png"/>');
            }
            if (tile == Hash[1]) {
                $("#"+i.toString()+j.toString()).prepend('<img src="Tiles/'+Hash[0]+rot+'.png"/>');;
            }
            if (tile == Server[1]) {
                $("#"+i.toString()+j.toString()).prepend('<img src="Tiles/'+Server[0]+rot+'.png"/>');;
            }
            if (tile == AI[1]) {
                $("#"+i.toString()+j.toString()).prepend('<img src="Tiles/'+AI[0]+rot+'.png"/>');;
            }
            if (tile == Home[1]) {
                $("#"+i.toString()+j.toString()).prepend('<img src="Tiles/'+Home[0]+rot+'.png"/>');;
            }
        }
    }
}

function readTextFile(file)
        {
            var rawFile = new XMLHttpRequest();
            rawFile.open("GET", file, false);
            rawFile.onreadystatechange = function ()
            {
                if(rawFile.readyState === 4)
                {
                    if(rawFile.status === 200 || rawFile.status == 0)
                    {
                        var allText = rawFile.responseText;
                        alert(allText);
                    }
                }
            }
            rawFile.send(null);
        }