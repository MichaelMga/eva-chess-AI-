

                 //BOARD GUI SETUP
  
  

  
  var board = document.getElementById('board');





   
   //VAR WHICH WILL ALLOW US TO SET THE RIGHT CLASSES ON THE SQUAREDIVS (COLORS) USING A BITWISE OPERATION

   let fileColor = 1;


   for(rankIndex = 0; rankIndex <= 7; rankIndex++ ){

    let rank = document.createElement("div");

    rank.setAttribute("class", "rankDiv");

    rank.setAttribute("id", 'rank' + (rankIndex+1).toString());


    board.append(rank);

  
    for(fileIndex = 0; fileIndex <= 7; fileIndex++ ){
       

      let square = document.createElement("div");

      if(fileColor == 1){
         
        square.setAttribute("class", "lightSquareDiv");
       

      } else {
         square.setAttribute("class", "darkSquareDiv");

      }

      square.setAttribute("id", 'rank' + (rankIndex+1).toString() + 'file' + (fileIndex+1).toString());
      
      
      //INITIAL WHITE NON PAWNS PIECES
      
      if(rankIndex==0){

         let pieceImg = document.createElement('img');

         
         if(fileIndex == 0 || fileIndex == 7){

            pieceImg.setAttribute("src", "img/whiteRook.png");

         } else if (fileIndex == 1 || fileIndex == 6){

            pieceImg.setAttribute("src", "img/whiteKnight.png");

         } else if (fileIndex == 2 || fileIndex == 5){

            pieceImg.setAttribute("src", "img/whiteBishop.png");

         } else if (fileIndex == 3){

            pieceImg.setAttribute("src", "img/whiteQueen.png");

         } else if (fileIndex == 4){

            pieceImg.setAttribute("src", "img/whiteKing.png");

         } 





         square.append(pieceImg);



      }


      //INITIAL BLACK NON PAWN PIECES


      if(rankIndex==7){
         
         let pieceImg = document.createElement('img');

         
         if(fileIndex == 0 || fileIndex == 7){

            //DEPENDING ON THE FILE, A DIFFERENT PIECE

            pieceImg.setAttribute("src", "img/blackRook.png");

         } else if (fileIndex == 1 || fileIndex == 6){

            pieceImg.setAttribute("src", "img/blackKnight.png");

         } else if (fileIndex == 2 || fileIndex == 5){

            pieceImg.setAttribute("src", "img/blackBishop.png");

         } else if (fileIndex == 3){

            pieceImg.setAttribute("src", "img/blackQueen.png");

         } else if (fileIndex == 4){

            pieceImg.setAttribute("src", "img/blackKing.png");

         } 

         square.append(pieceImg);


      }


      //INITIAL WHITE PAWNS

      if(rankIndex == 1){

         let pieceImg = document.createElement('img');

         pieceImg.setAttribute("src", "img/whitePawn.png");

         square.append(pieceImg);

      } 

      //INITIAL BLACK PAWNS


      if(rankIndex == 6){

         let pieceImg = document.createElement('img');

         pieceImg.setAttribute("src", "img/blackPawn.png");

         square.append(pieceImg);

      }
      

      //FOR EACH SQUARE, SET THE ONCLICK ELEMENT

      square.setAttribute('onclick', 'clickedSquare(event)');


      rank.append(square);

       fileColor ^= 1;

    }
          
    fileColor ^= 1;



   }








       //SEARCH



       function makeUserMove(){

         //if the move is valid, makeMove(moveChecked), checkAndSet, preSearch()



       }
           
         //THE FUNCTION MAKE USER MOVE CALLS PRESEARCH


      
       function preSearch(){


         if(gameController.gameOver != true){

                search_thinking = true;

                 //append eva thinking IMG

                 //THE FUNCTION STARTSEARCH IS CALLED REPETEADLY EVERY 200 MILLISECONDS , PROBABLY TO PREVENT IT FROM NOT LAUNCHING AT ALL

                 setTimeout(function(){StartSearch()}, 200);
         }

   }
    

      //This functon determins the search Time, and calls the function SearchPosition



      /* 
   function startSearch(){

      srch_depth = MAXDEPTH;

      var time = $.now();

      var timeLimit = $('#ThinkingTimeChoice').val();

      search_time = parseInt(timeLimit) * 1000; //CONVERSION IN MILLISECONDS

      SearchPosition();

   }

   */





   function moveGuiPieces(fromSquare, toSquare){


      //DELETE THE PIECE FROM THE FROMSQUARE, ADD IT ON THE TOSQUARE

      //get the piece class

      //FROMSQUARE

      rank = ranksSquaresArray[fromSquare].rank;
      
      file = filesSquaresArray[fromSquare].file;

      guiSquare = $('#rank' + (rank+1).toString() + 'file'+ (file+1).toString());

      (guiSquare[0].lastChild).remove();

      
      //FROM PIECE

      
      //KNOWING WE ALREADY MOVED THE PIECE USING THE MAKEMOVE FUNCTION , THE PIECE HAS ALREADY BEEN MOVED TO THE DESTINATION SQUARE

      movingPiece = pieceStringArray[boardSquaresArray[toSquare].piece]  ;

      
      movingPieceImage = document.createElement('img');

      movingPieceImage.setAttribute('src', 'img/' + movingPiece + '.png');


      //TOSQUARE

      rank = ranksSquaresArray[toSquare].rank;
      
      file = filesSquaresArray[toSquare].file;

      guiSquare = $('#rank' + (rank+1).toString() + 'file'+ (file+1).toString());

      if((guiSquare[0].lastChild)){

         guiSquare[0].lastChild.remove();

      }

      guiSquare.append(movingPieceImage);

   }



   function addGuiPiece(piece, square){

      

      rank = ranksSquaresArray[square].rank;
      
      file = filesSquaresArray[square].file;

      guiSquare = $('#rank' + (rank+1).toString() + 'file'+ (file+1).toString());


      
       addedPiece = pieceStringArray[boardSquaresArray[piece].piece];


       addedPiecePieceImage = document.createElement('img');

       addedPiecePieceImage.setAttribute('src', 'img/' +   'whitePawn' + '.png');


       guiSquare.append(addedPiecePieceImage);


   }







   function selectPromotedPiece(event){

     chosenPromPiece = event.currentTarget.id;



     if(sides[activeSideIndex] == white){


         if(chosenPromPiece == 'Pawn'){

            promotedPieceChoice = pieces.wP;

 
          } else if(chosenPromPiece == 'Knight'){

            promotedPieceChoice = pieces.wN;


          } else if(chosenPromPiece == 'Rook'){

            promotedPieceChoice = pieces.wR;

          } else if (chosenPromPiece == 'Queen'){

            promotedPieceChoice = pieces.wQ;

          } else if (chosenPromPiece == 'King'){


            promotedPieceChoice = pieces.wK;

          }

     } else if(sides[activeSideIndex] == black){         
        
         if(chosenPromPiece == 'Pawn'){

            promotedPieceChoice = pieces.bP;

 
          } else if(chosenPromPiece == 'Knight'){

            promotedPieceChoice = pieces.bN;


          } else if(chosenPromPiece == 'Rook'){

            promotedPieceChoice = pieces.bR;

          } else if (chosenPromPiece == 'Queen'){

            promotedPieceChoice = pieces.bQ;

          } else if (chosenPromPiece == 'King'){


            promotedPieceChoice = pieces.bK;

          }

     }




 }













