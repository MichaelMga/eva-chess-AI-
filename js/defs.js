

//BIT OPERATIONS


/*                         	                        
0000 0000 0000 0000 0000 0111 1111 -> From 0x7F
0000 0000 0000 0011 1111 1000 0000 -> To >> 7, 0x7F
0000 0000 0011 1100 0000 0000 0000 -> Captured >> 14, 0xF
0000 0000 0100 0000 0000 0000 0000 -> EP 0x40000
0000 0000 1000 0000 0000 0000 0000 -> Pawn Start 0x80000
0000 1111 0000 0000 0000 0000 0000 -> Promoted Piece >> 20, 0xF
0001 0000 0000 0000 0000 0000 0000 -> Castle 0x1000000
*/


function FROMSQ(m) { return (m & 0x7F); }
function TOSQ(m)  { return (((m)>>7) & 0x7F); }
function CAPTURED(m)  { return (((m)>>14) & 0xF); }
function PROMOTED(m)  { return (((m)>>20) & 0xF); }

var MFLAGEP = 0x40000
var MFLAGPS = 0x80000
var MFLAGCA = 0x1000000

var MFLAGCAP = 0x7C000
var MFLAGPROM = 0xF00000






function createGameBoard(){


      //SET EVERY PIECE TO OFFBOARD 
     for(squareIndex = 0; squareIndex < 120; squareIndex++){

        newSquare = { piece: pieces.offBoard , sixtyFourArrayIndex: pieces.noPiece };

        boardSquaresArray.push(newSquare);

     }

     //SET THE 64 SQUARES EMPTY

     
    for(rank = 0; rank < 8; rank++){

       for(file = 0; file< 8; file++){
           
        //WE MAKE A TRANSLATION FROM A 120 boardsquare TO A 64 ONE

         squareNum = 21 + (rank * 10) + file ;

         boardSquaresArray[squareNum].piece = pieces.noPiece ;
     
       } 
     }   

}



function createFilesAndRanksBoard(){

    //SET EVERY PIECE TO OFFBOARD 
    
   for(squareIndex = 0; squareIndex < 120; squareIndex++){


      fileSquare = {file : pieces.offBoard};

      filesSquaresArray.push(fileSquare);
      
      
      rankSquare = {rank : pieces.offBoard};

      ranksSquaresArray.push(rankSquare);

   }


   //SET THE 64 SQUARES EMPTY


  for(rank = 0; rank < 8; rank++){

     for(file = 0; file< 8; file++){
         
      //WE MAKE A TRANSLATION FROM A 120 boardsquare TO A 64 ONE

       squareNum = 21 + (rank * 10) + file ;

       ranksSquaresArray[squareNum].rank = rank ;

       filesSquaresArray[squareNum].file = file ;

     } 

   } 

 }



function addPieces(){

    //WHITE PIECES

     let whitePieceIndex = 0;

    //PAWNS



    var whitePawnsArray = [];

    white.pieceList.push(whitePawnsArray);


    for(whitePawnsSquaresIndex = 8 ; whitePawnsSquaresIndex < 16 ; whitePawnsSquaresIndex++){

        squareNum = get64to120Square(whitePawnsSquaresIndex);
         
        boardSquare = boardSquaresArray[squareNum];

        boardSquare.piece = pieces.wP;

        //FILL THE PIECE LIST

       whitePawnsArray.push({ piece: pieces.wP, square : squareNum });

        whitePieceIndex++;
 
     }



    //KNIGHTS


    var whiteKnightsArray = [];


    white.pieceList.push(whiteKnightsArray);



    
    boardSquaresArray[get64to120Square(1)].piece = pieces.wN;


    whiteKnightsArray.push({ piece: pieces.wN, square : get64to120Square(1)});


    boardSquaresArray[get64to120Square(6)].piece = pieces.wN;


    whiteKnightsArray.push({ piece: pieces.wN, square : get64to120Square(6) });


    //BISHOPS


    var whiteBishopsArray = [];

    white.pieceList.push(whiteBishopsArray);

   
    boardSquaresArray[get64to120Square(2)].piece = pieces.wB;


    whiteBishopsArray.push({ piece: pieces.wB, square : get64to120Square(2)});


    boardSquaresArray[get64to120Square(5)].piece = pieces.wB;


    whiteBishopsArray.push({ piece: pieces.wB, square : get64to120Square(5) });

   
    
    //ROOKS

    
    var whiteRooksArray = [];

    white.pieceList.push(whiteRooksArray);

   

  
     boardSquaresArray[get64to120Square(0)].piece = pieces.wR;


     whiteRooksArray.push({ piece: pieces.wR, square : get64to120Square(0)});


     boardSquaresArray[get64to120Square(7)].piece = pieces.wR;


     whiteRooksArray.push({ piece: pieces.wR, square : get64to120Square(7) });





    //QUEEN

    
    
    var whiteQueenArray = [];

    white.pieceList.push(whiteQueenArray);


    

    boardSquaresArray[get64to120Square(3)].piece = pieces.wQ;


    whiteQueenArray.push({ piece: pieces.wQ, square : get64to120Square(3)});


    //KING

    var whiteKingArray = [];

    white.pieceList.push(whiteKingArray);
    

    boardSquaresArray[get64to120Square(4)].piece = pieces.wK;


    whiteKingArray.push({ piece: pieces.wK, square : get64to120Square(4)});




    //BLACK PIECES

    let blackPieceIndex = 0;
    
    //PAWNS


    var blackPawnsArray = [];

    black.pieceList.push(blackPawnsArray);
    

    for(blackPawnsSquaresIndex = 48 ; blackPawnsSquaresIndex < 56 ; blackPawnsSquaresIndex++){

        squareNum = get64to120Square(blackPawnsSquaresIndex);
        
        boardSquare = boardSquaresArray[squareNum];

        boardSquare.piece = pieces.bP;

        //FILL THE PIECE LIST


        blackPawnsArray.push({ piece: pieces.bP, square : squareNum });

        blackPieceIndex++;

     }

      
    //KNIGHTS

    
    var blackKnightsArray = [];

    black.pieceList.push(blackKnightsArray);
    



    
    boardSquaresArray[get64to120Square(57)].piece = pieces.bN;


    blackKnightsArray.push({ piece: pieces.bN, square : get64to120Square(57)});


    boardSquaresArray[get64to120Square(62)].piece = pieces.bN;


    blackKnightsArray.push({ piece: pieces.bN, square : get64to120Square((62)) });


    //BISHOPS
    
    
    var blackBishopsArray = [];

    black.pieceList.push(blackBishopsArray);
   
    
    boardSquaresArray[get64to120Square(58)].piece = pieces.bB;


    blackBishopsArray.push({ piece: pieces.bB, square : get64to120Square(58)});


    boardSquaresArray[get64to120Square(61)].piece = pieces.bB;


    blackBishopsArray.push({ piece: pieces.bB, square : get64to120Square(61) });
    


    //ROOKS


    var blackRooksArray = [];

    black.pieceList.push(blackRooksArray);

  
    boardSquaresArray[get64to120Square(56)].piece = pieces.bR;


    blackRooksArray.push({ piece: pieces.bR, square : get64to120Square(56) });


    boardSquaresArray[get64to120Square(63)].piece = pieces.bR;


    blackRooksArray.push({ piece: pieces.bR, square :  get64to120Square(63) });



    //QUEEN


    

    var blackQueenArray = [];

    black.pieceList.push(blackQueenArray);
    

    boardSquaresArray[get64to120Square(59)].piece = pieces.bQ;


    blackQueenArray.push({ piece: pieces.bQ, square : get64to120Square(59)});


    //KING


    var blackKingArray = [];

    black.pieceList.push(blackKingArray);
   

    boardSquaresArray[get64to120Square(60)].piece = pieces.bK;

    
    blackKingArray.push({ piece: pieces.bK, square :  get64to120Square(60)});

}


function create120to64Square(){

    
    let sixtyFourArrayIndex = 0;

    for(rank = 0; rank < 8; rank++){

       for(file = 0; file< 8; file++){
           
        //WE MAKE A TRANSLATION FROM A 120 boardsquare TO A 64 ONE

         squareNum = 21 + (rank * 10) + file ;

         sixtyFourArray[sixtyFourArrayIndex] = squareNum ;

         boardSquaresArray[squareNum].sixtyFourIndex = sixtyFourArrayIndex;

         sixtyFourArrayIndex++;
     
    } 
   }       
}

function ranksArray(){

    
    let sixtyFourArrayIndex = 0;

    for(rank = 0; rank < 8; rank++){

       for(file = 0; file< 8; file++){
           
        //WE MAKE A TRANSLATION FROM A 120 boardsquare TO A 64 ONE

         squareNum = 21 + (rank * 10) + file ;

         ranksArray[squareNum] = rank;

         sixtyFourArrayIndex++;
     
    } 
   }       
}





function getSquare(rank, file){

    return (21 + (10*rank) + file);

}


function get64to120Square(square){

    return sixtyFourArray[square];

}

function get120To64Square(square){

    //WE NEED TO KNOW, WHERE THIS VALUE IS LOCATED IN THE ARRAY.

    console.log(boardSquaresArray[square].sixtyFourIndex);

}


function initPieceLists(){


}



//CREATE MOVE



function createMove(from, to, captured, promoted){

   //EACH SQUARE CAN GO UP TO 64, WHICH IS 1 000 000 IN BINARY

   //FROM AND TO SQUARES ARE NUMBERS GOING UP TO 64.(SQUARES NUMS)

   //CAPTURED AND PROMOTED ARE PIECE NUMS (DEFINED IN VARS.JS)
     
   

     return from | (to << 7) | (captured << 14) | (promoted << 20);

  }



  function mirror64(square){



   return mirror64[sq];

   
  }






  function checkUp();