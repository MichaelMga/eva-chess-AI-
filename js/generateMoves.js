function generateMoves(){

    player = sides[activeSideIndex];


    //LOOP ON EVERY PIECE

    //FOR EVERY PIECE


    for(pieceGroupIndex=0; pieceGroupIndex < player.pieceList.length ;pieceGroupIndex++){

        pieceGroup = player.pieceList[pieceGroupIndex];

       for(pieceIndex=0; pieceIndex < pieceGroup.length ; pieceIndex++){ 

          checkedPiece = pieceGroup[pieceIndex];
  
          fromSquare = checkedPiece.square;

          

        if(player == white){
            
          if(checkedPiece.piece == pieces.wP){

              if( boardSquaresArray[checkedPiece.square + 10].piece == pieces.noPiece ){

                toSquare = checkedPiece.square + 10;


                addPawnQuietMove(fromSquare, toSquare);

                
              }

              
              if( boardSquaresArray[checkedPiece.square + 20].piece == pieces.noPiece ){


                toSquare = checkedPiece.square + 20;

                addPawnQuietMove(fromSquare, toSquare);

              }


              if( boardSquaresArray[checkedPiece.square + 11].piece != pieces.noPiece || boardSquaresArray[checkedPiece.square + 11].piece != pieces.offBoard  ){
                   
                if(colorsArray[boardSquaresArray[checkedPiece.square + 11].piece] == black){


                    toSquare = checkedPiece.square + 11;

                    capturedPiece = boardSquaresArray[toSquare].piece;


                        addPawnCaptureMove(fromSquare, toSquare, capturedPiece);

                }
                
              }


              if( boardSquaresArray[checkedPiece.square + 9].piece != pieces.noPiece || boardSquaresArray[checkedPiece.square + 9].piece != pieces.offBoard  ){
                   
                if(colorsArray[boardSquaresArray[checkedPiece.square + 9].piece] == black){


                    toSquare = checkedPiece.square + 9;

                    capturedPiece = boardSquaresArray[toSquare].piece;

                    addPawnCaptureMove(fromSquare, toSquare, capturedPiece);

                }
 
              }


            continue;
  

          }


        } else if (player == black) {    
            
            
            if(checkedPiece.piece == pieces.bP){
  
  
                if( boardSquaresArray[checkedPiece.square - 10 ].piece == pieces.noPiece ){


                  toSquare = checkedPiece.square - 10;


                  addPawnQuietMove(fromSquare, toSquare);
 
                }

                if( boardSquaresArray[checkedPiece.square - 20].piece == pieces.noPiece ){
  

                  toSquare = checkedPiece.square - 20;

                  addPawnQuietMove(fromSquare, toSquare);

              }

           }
             
           if( boardSquaresArray[checkedPiece.square - 11].piece != pieces.noPiece || boardSquaresArray[checkedPiece.square - 11].piece != pieces.offBoard  ){
                   
            
            if(colorsArray[boardSquaresArray[checkedPiece.square - 11].piece] == white ){

                toSquare = checkedPiece.square - 11;

                capturedPiece = boardSquaresArray[checkedPiece.square - 11].piece;


                addPawnCaptureMove(fromSquare, toSquare, capturedPiece);


            }
            
          }

          
      
          if( boardSquaresArray[checkedPiece.square - 9].piece != pieces.noPiece || boardSquaresArray[checkedPiece.square - 9].piece != pieces.offBoard  ){
            

            if(colorsArray[boardSquaresArray[checkedPiece.square - 9].piece] == white ){
                
             toSquare = checkedPiece.square - 9;
             capturedPiece = boardSquaresArray[checkedPiece.square - 9].piece;


                addPawnCaptureMove(fromSquare, toSquare, capturedPiece);

            }

          }
    
       }


        //OTHER PIECES


        
  if(player == white){
    

    activePlayerNonSlidingPieces = nonSlidingPieces.white;

    activePlayerSlidingPieces = slidingPieces.white;


  } else {

    activePlayerNonSlidingPieces = nonSlidingPieces.black;

    activePlayerSlidingPieces = slidingPieces.black;


  }



      //LOOP ON EACH NON SLIDING PIECE

  for(nonSlidingPieceIndex = 0 ; nonSlidingPieceIndex < activePlayerNonSlidingPieces.length; nonSlidingPieceIndex++){
      
    nonSlidingPiece = activePlayerNonSlidingPieces[nonSlidingPieceIndex];

       if(checkedPiece.piece == nonSlidingPiece.piece){



         directions = nonSlidingPiece.directions;

          //LOOP ON ALL THE DIRECTIONS

          //FOR EACH DIRECTION

         for(directionIndex = 0; directionIndex < directions.length ;directionIndex++){
               
            checkedDirection = directions[directionIndex];

            toSquare = fromSquare + checkedDirection;

            if( boardSquaresArray[toSquare].piece == pieces.noPiece){
              
               addQuietMove(fromSquare, toSquare);

           
              } else if(boardSquaresArray[toSquare].piece != pieces.offBoard && colorsArray[boardSquaresArray[toSquare].piece] != sides[activeSideIndex] ) {

              capturedPiece = boardSquaresArray[toSquare].piece;

              addCaptureMove(fromSquare, toSquare, capturedPiece);



           }

        }

        //IF WE FOUND THE PIECE, NO NEED TO GO FURTHER

       continue; 

     }

  }


  
  for(slidingPieceIndex = 0 ; slidingPieceIndex < activePlayerSlidingPieces.length; slidingPieceIndex++){
      
    slidingPiece = activePlayerSlidingPieces[slidingPieceIndex];

       if(checkedPiece.piece == slidingPiece.piece){

        //RECURSION
        //FOR EACH DIRECTION, IF THE PIECE IS EMPTY, YOU ADD A QUIET MOVE, AND ADD THE DIRECTION NUM
           
         directions = slidingPiece.directions;


         for(directionIndex = 0; directionIndex < directions.length; directionIndex++){

            checkedDirection = directions[directionIndex];

            toSquare = fromSquare + checkedDirection;

             while(boardSquaresArray[toSquare].piece != pieces.offBoard){
            
                 if(boardSquaresArray[toSquare].piece == pieces.noPiece){

                      addQuietMove(fromSquare, toSquare);

                    //ELSE IT MEANS THERE IS A PIECE, SO POSSIBLE CAPTURE MOVE (IF OPPONENT'S PIECE)

                 } else {

                      if(colorsArray[boardSquaresArray[toSquare].piece] != sides[activeSideIndex]){

                        capturedPiece = boardSquaresArray[toSquare].piece;
    
                        addCaptureMove(fromSquare, toSquare, capturedPiece);

                       }  

                  }

                  toSquare += checkedDirection;

               }

            }

          }

       }

     }

     



    }



    
  }







function addQuietMove(fromSquare, toSquare){

  
     addedMove = createMove(fromSquare, toSquare, pieces.noPiece, pieces.noPiece);
             
     moveList.push(addedMove); 

 
}


function addCaptureMove(fromSquare, toSquare, capturedPiece){


  
  addedMove = createMove(fromSquare, toSquare, capturedPiece, pieces.noPiece);
             
  moveList.push(addedMove); 






  
 }
 
 

 function addPawnCaptureMove(fromSquare, toSquare, capturedPiece){



            
     addedMove = createMove(fromSquare, toSquare, capturedPiece, pieces.noPiece);
             
     moveList.push(addedMove); 
    
    
    //IF POSSIBILITY OF PROMOTION

      if(sides[activeSideIndex] == white){

        prePromotionRank = 6;
      } else{

        prePromotionRank = 1;
      }
     

     if(ranksArray[fromSquare] == prePromotionRank){


        if(sides[activeSideIndex] == white){
    
            promotionArray = whitePiecesPromotionArray;
    
         } else if(sides[activeSideIndex] == black){
    
            promotionArray = blackPiecesPromotionArray;
    
        }
    

     for(promotionIndex = 0; promotionIndex < promotionArray.length ; promotionIndex++) {
    
             promotionPiece =  promotionArray[promotionIndex];
    
             addedMove = createMove(fromSquare, toSquare, capturedPiece,  promotionPiece );
             
             moveList.push(addedMove); 
    
          }        
      }

    }



function addPawnQuietMove(fromSquare, toSquare){

    
    addedMove = createMove(fromSquare, toSquare, pieces.noPiece, pieces.noPiece);
            
    moveList.push(addedMove); 



       
   
   //IF POSSIBILITY OF PROMOTION

   if(ranksArray[fromSquare] == 7){



       if(sides[activeSideIndex] == white){
   
           promotionArray = whitePiecesPromotionArray;
   
        } else if(sides[activeSideIndex] == black){
   
           promotionArray = blackPiecesPromotionArray;
   
       }
   
   
          for(promotionIndex = 0; promotionIndex < promotionArray.length ; promotionIndex++) {
   
              promotionPiece =  promotionArray[promotionIndex];
   
              addedMove = createMove(fromSquare, toSquare, pieces.noPiece,  promotionPiece );
            
              moveList.push(addedMove); 
 
            
         }  
     }
 }

