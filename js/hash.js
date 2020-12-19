
function hashPiece(piece, square){

    boardPosKey ^= pieceKeys[piece,square];

}




//INITIAL GENERATION OF PIECE KEYS


 function generateHashKeys(){

    generateInitialBoardPoskey();
    generateInitialPieceKeys();

 }






function generateInitialBoardPoskey(){


	let finalKey = 0;
	let piece;
    
    
    // loop on all the squares
    
	for(i = 0; i < boardSquaresArray.length; i++) {

        piece = boardSquaresArray[i];
        
		if(piece != pieces.noPiece && piece != pieces.offBoard) {	

            finalKey ^= pieceKeys[(piece * 120) + i];

		}		
	}
	
	if(sides[activeSideIndex] == white) {
		finalKey ^= sides[activeSideIndex];
	}
        
    
    boardPosKey = finalKey;

}



function generateInitialPieceKeys(){
    

    for(i = 0; i < 13 * 120; i++) {				
         
        pieceKeys[i] = rand32();
    
    }

}




