function editLoop() {
    
    mapArray = init_map();
    currTile = init_editor();
    changeTile(currTile, '', '0');
}
document.onkeypress = function (event) {
    if (typeof(currTile) == 'string'){
        currTile = currTile.split('');
        currTile[0] = parseInt(currTile[0]);
        currTile[1] = parseInt(currTile[1]);
    }
    changeRot = '0';
    tileChange = '';
    
    //wasd
    if (event.which == 119) {
        //w
        currTile[0] -= 1;
    }
    if (event.which == 97) {
        //a
        currTile[1] -= 1;
    }
    if (event.which == 115) {
        //s
        currTile[0] += 1;
    }
    if (event.which == 100) {
        //d
        currTile[1] += 1;
    }
    //numbers
    if (event.which == 48) {
        //0 - Blank
        tileChange = 'CryptoTechTile';
    }
    if (event.which == 49) {
        //1 - Node
        tileChange = 'CryptoTechTileNode';
    }
    if (event.which == 50) {
        //2 - Hash
        tileChange = 'CryptoTechHash';
    }
    if (event.which == 51) {
        //3 - Server
        tileChange = 'CryptoTechServer';
    }
    if (event.which == 52) {
        //4 - AI
        tileChange = 'CryptoTechTileAI';
    }
    if (event.which == 53) {
        //5 - Home
        tileChange = 'CryptoTechHome';
    }
    if (event.which == 105) {
        //I - Up Connection
        changeRot = '1';
    }
    if (event.which == 106) {
        //J - Down Connection
        changeRot = '4';
    }
    if (event.which == 107) {
        //K - Left Connection
        changeRot = '3';
    }
    if (event.which == 108) {
        //L - Right Connection
        changeRot = '2';
    }
    if (event.which == 120){
        //z - save map
        saveMap();
    }
    changeTile(currTile, tileChange, changeRot);
        
    }
    
    

function init_editor(){
    currTile = '00';
    return currTile
}

function init_map(){
    data = "0.0|0.0|0.0|0.0|0.0|0.0%0.0|0.0|0.0|0.0|0.0|0.0%0.0|0.0|0.0|0.0|0.0|0.0%0.0|0.0|0.0|0.0|0.0|0.0";
    mapArray = data.split('%');
    
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
    $("body").empty();
    $("body").append("<div class = 'PlayDiv'></div>");
    
    $(".PlayDiv").append("<table class = 'PlayTable' cellpadding = '0' cellspacing = '0'>");
    for (i = 0; i <= mapArray.length-1; i++) {
        $(".PlayTable").append("<tr id = row"+i+">");
        for (j = 0; j <= mapArray[0].length-1; j++){
            $("#row"+i).append("<td id = "+i+""+j+"></td>");   
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
    return mapArray
}

function changeTile (currTile, tileChange, changeRot){
    var Tiles = [['CryptoTechTile', 0], ['CryptoTechTileNode', 1], ['CryptoTechHash', 2], ['CryptoTechServer', 3], ['CryptoTechTileAI', 4],  ['CryptoTechHome', 5]];
    if (currTile[0] < 0) {
        currTile[0] = mapArray.length-1;
    }
    if (currTile[0] >= 4) {
        currTile[0] = 0;
    }
    if (currTile[1] < 0) {
        currTile[1] = mapArray[0].length-1;
    }
    if (currTile[1] > 5) {
        currTile[1] = 0;
    }
    currTile = currTile[0] + "" + currTile[1];
    for (i = 0; i <= mapArray.length; i++) {
        for (j = 0; j <= mapArray[0].length; j++)
            if ((i+""+j).toString() == currTile) {
                if (tileChange != ''){
                    if (tileChange == "CryptoTechTile"){
                        changeRot = '0';
                    }
                    $("#"+currTile).empty();
                    $("#"+currTile).prepend('<img src="Tiles/'+tileChange+changeRot+'.png"/>')
                    for (z=0; z <= Tiles.length-1; z++){
                       if( tileChange == Tiles[z][0]){
                           mapCurr = mapArray[i][j].split('.')
                           mapCurr[0] = Tiles[z][1];
                           mapCurr = mapCurr[0]+'.'+mapCurr[1]
                           mapArray[i][j] = mapCurr;
                       }
                    }
                     
                }
                if (changeRot != '0'){
                    for (z = 0; z <= Tiles.length-1; z++){
                        if (mapArray[i][j].split('.')[0] == Tiles[z][1].toString()){
                            tileChange = Tiles[z][0];
                        }
                    }
                    if (tileChange != '' && mapArray[i][j].split('.')[0] != '0' ){
                        $("#"+currTile).empty();
                        $("#"+currTile).prepend('<img src="Tiles/'+tileChange+changeRot+'.png"/>')
                        mapCurr = mapArray[i][j].split('.')
                        mapCurr[1] = changeRot;
                        mapCurr = mapCurr[0]+'.'+mapCurr[1]
                        mapArray[i][j] = mapCurr;
                    }
                }
                $("#"+currTile).children('img').addClass('Active');
            }
            else{
                $("#"+i+""+j).children('img').removeClass('Active')
            } 
    }
    return currTile   
}

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute("download", filename);
    pom.click();
        }

function saveMap(){
   //Save
    finalArray = '';
    for (i = 0; i < mapArray.length; i++){
        curr = mapArray[i].toString();
        finalArray += curr;
        if (i != mapArray.length-1){
            finalArray += '%';
        }
    }
    download("map.txt", finalArray.replace(/,/g, '|'));
}