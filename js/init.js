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


    

}


