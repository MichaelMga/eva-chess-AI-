window.onload = init();



function init(){

    createGameBoard();

    create120to64Square();

    addPieces();

    createFilesAndRanksBoard();

    createGameBoardHistory();

    createPvTable();

    generateHashKeys();

    initMvvLva();

    setTimeout(function(){
        alert("W=>" + gameBoardMaterials.white + " , B=>" +  gameBoardMaterials.black);
    },10000)

    

}


