function generateMoves(){

  //clear the moveList before any move generation

  let moveList = [];
  let moveScores = [];


  //console.log('---------------------------------------------generating moves------------------------------------------------------------------------------------------' );


  var player = sides[activeSideIndex];



  //alert(player.name);


  //LOOP ON EVERY PIECE

  //FOR EVERY PIECE


  for(pieceGroupIndex = 0; pieceGroupIndex < player.pieceList.length ; pieceGroupIndex++){

    
    
      pieceGroup = player.pieceList[pieceGroupIndex];

      //console.log('piece group : ' + pieceGroupIndex + ' length :' + pieceGroup.length);


     for(pieceIndex=0; pieceIndex < pieceGroup.length ; pieceIndex++){ 


      //console.log('piece index ' + pieceIndex + ' piece : ' + pieceGroup[pieceIndex].piece);


        checkedPiece = pieceGroup[pieceIndex];

        fromSquare = checkedPiece.square;

        

      if(player == white){
          
        if(checkedPiece.piece == pieces.wP){

          //console.log('we are checking a white pawn....');

            if( boardSquaresArray[checkedPiece.square + 10].piece == pieces.noPiece ){

              toSquare = checkedPiece.square + 10;


              addPawnQuietMove(fromSquare, toSquare ,  moveList , moveScores);

              
            }


            if(fromSquare <= 38){
    
            
               if( boardSquaresArray[checkedPiece.square + 20].piece == pieces.noPiece ){

                 toSquare = checkedPiece.square + 20;

                addPawnQuietMove(fromSquare, toSquare ,  moveList , moveScores);

              }


          }

            if( boardSquaresArray[checkedPiece.square + 11].piece != pieces.noPiece || boardSquaresArray[checkedPiece.square + 11].piece != pieces.offBoard  ){
                 
              if(colorsArray[boardSquaresArray[checkedPiece.square + 11].piece] == black){


                  toSquare = checkedPiece.square + 11;

                  //console.log('there is nothing in front of this piece!!');

                  capturedPiece = boardSquaresArray[toSquare].piece;


                      addPawnCaptureMove(fromSquare, toSquare, capturedPiece , moveList , moveScores);

              }
              
            }


            if( boardSquaresArray[checkedPiece.square + 9].piece != pieces.noPiece || boardSquaresArray[checkedPiece.square + 9].piece != pieces.offBoard  ){
                 
              if(colorsArray[boardSquaresArray[checkedPiece.square + 9].piece] == black){

                  //console.log('white pawn capture move found');

                  toSquare = checkedPiece.square + 9;

                  capturedPiece = boardSquaresArray[toSquare].piece;

                  addPawnCaptureMove(fromSquare, toSquare, capturedPiece ,  moveList , moveScores);

              }

            }


          continue;


        }


      } else if (player == black) {    
          
          
          if(checkedPiece.piece == pieces.bP){

            //console.log('we are checking a black pawn....');



              if( boardSquaresArray[checkedPiece.square - 10 ].piece == pieces.noPiece ){


                toSquare = checkedPiece.square - 10;


                addPawnQuietMove(fromSquare, toSquare ,  moveList , moveScores);

              }


              if(fromSquare >= 81){

                
                 if( boardSquaresArray[checkedPiece.square - 20].piece == pieces.noPiece ){


                    toSquare = checkedPiece.square - 20;

                   addPawnQuietMove(fromSquare, toSquare ,  moveList , moveScores);
    
            }

              }


           
         if( boardSquaresArray[checkedPiece.square - 11].piece != pieces.noPiece || boardSquaresArray[checkedPiece.square - 11].piece != pieces.offBoard  ){
                 
          
          if(colorsArray[boardSquaresArray[checkedPiece.square - 11].piece] == white ){

              toSquare = checkedPiece.square - 11;

              capturedPiece = boardSquaresArray[checkedPiece.square - 11].piece;


              addPawnCaptureMove(fromSquare, toSquare, capturedPiece ,  moveList , moveScores);


          }
          
        }

        
    
        if( boardSquaresArray[checkedPiece.square - 9].piece != pieces.noPiece || boardSquaresArray[checkedPiece.square - 9].piece != pieces.offBoard  ){
          

          if(colorsArray[boardSquaresArray[checkedPiece.square - 9].piece] == white ){
              
           toSquare = checkedPiece.square - 9;
           capturedPiece = boardSquaresArray[checkedPiece.square - 9].piece;


              addPawnCaptureMove(fromSquare, toSquare, capturedPiece ,  moveList , moveScores);

          }

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

       for(directionIndex = 0; directionIndex < directions.length ; directionIndex++){ 

             
          checkedDirection = directions[directionIndex];

          toSquare = fromSquare + checkedDirection;

     
            
            if(boardSquaresArray[toSquare].piece != pieces.offBoard && colorsArray[boardSquaresArray[toSquare].piece] != sides[activeSideIndex]) {


              if( boardSquaresArray[toSquare].piece == pieces.noPiece){
     
                addQuietMove(fromSquare, toSquare ,  moveList ,  moveScores);
            
               } else {
            
                   
                  capturedPiece = boardSquaresArray[toSquare].piece;

                  addCaptureMove(fromSquare, toSquare, capturedPiece ,  moveList, moveScores);
 


               }
               

  

              

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

           while(boardSquaresArray[toSquare].piece != pieces.offBoard && colorsArray[boardSquaresArray[toSquare].piece] != sides[activeSideIndex]){
          
               if(boardSquaresArray[toSquare].piece == pieces.noPiece){

                    addQuietMove(fromSquare, toSquare,  moveList ,  moveScores);

                  //ELSE IT MEANS THERE IS A PIECE, SO POSSIBLE CAPTURE MOVE (IF OPPONENT'S PIECE)

                 } else {

                      capturedPiece = boardSquaresArray[toSquare].piece;
  
                      addCaptureMove(fromSquare, toSquare, capturedPiece ,  moveList , moveScores);



                     //IF THE SQUARE IS NOT EMPTY, STOP ITERATING ON THIS DIRECTION


                     break;


                }

                toSquare += checkedDirection;

             }

          }

        }

      }

    }

   
      //console.log('la taille de la move list : ' + moveList.length);



  }




  //console.log('---------------------------------------------end of moves generation------------------------------------------------------------------------------------------' + moveList.length );


 
  return {list: moveList , scores: moveScores};

  
}




function addQuietMove(fromSquare, toSquare, moveList , moveScores){

   addedMove = createMove(fromSquare, toSquare, pieces.noPiece, pieces.noPiece);

   if(boardSearchKillers[boardPly] == addedMove) {	
		moveScores.push(900000);
	} else if(boardSearchKillers[MAXDEPTH + boardPly] == addedMove) {	
    moveScores.push(800000);
	} else {	
      moveScores.push(boardSearchHistory[ boardSquaresArray[FROMSQ(addedMove)].piece * boardSquaresNum + TOSQ(addedMove)]);       
	}


   ////console.log('quiet move added from ' + fromSquare + 'to ' + toSquare + 'with the chain ' + addedMove + 'for the side ' + sides[activeSideIndex].name + ' with the piece ' + boardSquaresArray[fromSquare].piece );

   moveList.push(addedMove);
}



function addCaptureMove(fromSquare, toSquare, capturedPiece, moveList, moveScores){


//console.log('capture move added from' + fromSquare + 'to : ' + toSquare + 'the moving piece is' + boardSquaresArray[fromSquare].piece + ' , the active side is ' + sides[activeSideIndex].name + ' , the captured piece side is ' + colorsArray[boardSquaresArray[toSquare].piece].name )+ ' , the captured piece side is ' + colorsArray[boardSquaresArray[toSquare].piece].name ;


addedMove = createMove(fromSquare, toSquare, capturedPiece, pieces.noPiece);
           
moveList.push(addedMove); 

moveScores.push(mvvLvaScores[CAPTURED(addedMove) * 14 + boardSquaresArray[FROMSQ(addedMove)].piece] + 1000000);







}



function addPawnCaptureMove(fromSquare, toSquare, capturedPiece ,  moveList , moveScores){

  //console.log('Capture pawn move added from ' + fromSquare + 'to ' + toSquare + 'with the chain ' + addedMove + 'for the side ' + sides[activeSideIndex].name);


    
   addedMove = createMove(fromSquare, toSquare, capturedPiece, pieces.noPiece);
           
   moveList.push(addedMove);
   
   
   moveScores.push(mvvLvaScores[CAPTURED(addedMove) * 14 + boardSquaresArray[FROMSQ(addedMove)].piece] + 1000000);

  
  
  //IF POSSIBILITY OF PROMOTION



    if(sides[activeSideIndex] == white){

      prePromotionRank = 6;
    } else{

      prePromotionRank = 1;
    }
   


    /*
    
   if(ranksSquaresArray[fromSquare].rank == prePromotionRank){



      if(sides[activeSideIndex] == white){
  
          promotionArray = whitePiecesPromotionArray;
  
       } else if(sides[activeSideIndex] == black){
  
          promotionArray = blackPiecesPromotionArray;
  
      }
  
      //console.log('promotion pieces available : ');



   for(promotionIndex = 0; promotionIndex < promotionArray.length ; promotionIndex++) {


           promotionPiece =  promotionArray[promotionIndex];

           //console.log(promotionPiece);
  
           addedMove = createMove(fromSquare, toSquare, capturedPiece,  promotionPiece );
           
           moveList.push(addedMove); 

  
        }        
    }


    */


  }



function addPawnQuietMove(fromSquare, toSquare ,  moveList , moveScores){

  
  addedMove = createMove(fromSquare, toSquare, pieces.noPiece, pieces.noPiece);

  
  moveList.push(addedMove); 

  
  if(boardSearchKillers[boardPly] == addedMove) {	
		moveScores.push(900000);
	} else if(boardSearchKillers[MAXDEPTH + boardPly] == addedMove) {	
    moveScores.push(800000);
	} else {	
      moveScores.push(boardSearchHistory[ boardSquaresArray[FROMSQ(addedMove)].piece * boardSquaresNum + TOSQ(addedMove)]);       
	}

          

  ////console.log('quiet pawn move added from ' + fromSquare + 'to ' + toSquare + 'with the chain ' + addedMove + 'for the side ' + sides[activeSideIndex].name + ' with the piece ' + boardSquaresArray[fromSquare].piece );


 
 //IF POSSIBILITY OF PROMOTION


 /*

   if(sides[activeSideIndex] == white){

      prePromotionRank = 6;
    } else{

      prePromotionRank = 1;
    }

 if(ranksSquaresArray[fromSquare].rank == prePromotionRank){
     

     if(sides[activeSideIndex] == white){
 
         promotionArray = whitePiecesPromotionArray;
 
      } else if(sides[activeSideIndex] == black){
 
         promotionArray = blackPiecesPromotionArray;
 
     }

     //console.log('promotion pieces available : ');
 
 
        for(promotionIndex = 0; promotionIndex < promotionArray.length ; promotionIndex++) {

            promotionPiece =  promotionArray[promotionIndex];

            //console.log(promotionPiece);


            addedMove = createMove(fromSquare, toSquare, pieces.noPiece,  promotionPiece );
          
            moveList.push(addedMove); 

      
        }  
     }

    */
  }






    //COPY OF THE GENERATE MOVES FUNCTION, BUT WITH ONLY CAPTURE MOVES








    function generateCaptures(){

      //clear the moveList before any move generation
    
      let moveList = [];
      let moveScores = [];
    
    
      //console.log('---------------------------------------------generating moves------------------------------------------------------------------------------------------' );
    
    
      var player = sides[activeSideIndex];
    
    
    
      //alert(player.name);
    
    
      //LOOP ON EVERY PIECE
    
      //FOR EVERY PIECE
    
    
      for(pieceGroupIndex = 0; pieceGroupIndex < player.pieceList.length ; pieceGroupIndex++){
    
        
        
          pieceGroup = player.pieceList[pieceGroupIndex];
    
          //console.log('piece group : ' + pieceGroupIndex + ' length :' + pieceGroup.length);
    
    
         for(pieceIndex=0; pieceIndex < pieceGroup.length ; pieceIndex++){ 
    
    
          //console.log('piece index ' + pieceIndex + ' piece : ' + pieceGroup[pieceIndex].piece);
    
    
            checkedPiece = pieceGroup[pieceIndex];
    
            fromSquare = checkedPiece.square;
    
            
    
          if(player == white){
              
            if(checkedPiece.piece == pieces.wP){
    
                if( boardSquaresArray[checkedPiece.square + 11].piece != pieces.noPiece || boardSquaresArray[checkedPiece.square + 11].piece != pieces.offBoard  ){
                     
                  if(colorsArray[boardSquaresArray[checkedPiece.square + 11].piece] == black){
    
    
                      toSquare = checkedPiece.square + 11;
    
                      //console.log('there is nothing in front of this piece!!');
    
                      capturedPiece = boardSquaresArray[toSquare].piece;
    
    
                          addPawnCaptureMove(fromSquare, toSquare, capturedPiece , moveList , moveScores);
    
                  }
                  
                }
    
    
                if( boardSquaresArray[checkedPiece.square + 9].piece != pieces.noPiece || boardSquaresArray[checkedPiece.square + 9].piece != pieces.offBoard  ){
                     
                  if(colorsArray[boardSquaresArray[checkedPiece.square + 9].piece] == black){
    
                      //console.log('white pawn capture move found');
    
                      toSquare = checkedPiece.square + 9;
    
                      capturedPiece = boardSquaresArray[toSquare].piece;
    
                      addPawnCaptureMove(fromSquare, toSquare, capturedPiece ,  moveList , moveScores);
    
                  }
    
                }
    
    
              continue;
    
    
            }
    
    
          } else if (player == black) {    
              
              
              if(checkedPiece.piece == pieces.bP){
    
    
    
    
               
             if( boardSquaresArray[checkedPiece.square - 11].piece != pieces.noPiece || boardSquaresArray[checkedPiece.square - 11].piece != pieces.offBoard  ){
                     
              
              if(colorsArray[boardSquaresArray[checkedPiece.square - 11].piece] == white ){
    
                  toSquare = checkedPiece.square - 11;
    
                  capturedPiece = boardSquaresArray[checkedPiece.square - 11].piece;
    
    
                  addPawnCaptureMove(fromSquare, toSquare, capturedPiece ,  moveList , moveScores);
    
    
              }
              
            }
    
            
        
            if( boardSquaresArray[checkedPiece.square - 9].piece != pieces.noPiece || boardSquaresArray[checkedPiece.square - 9].piece != pieces.offBoard  ){
              
    
              if(colorsArray[boardSquaresArray[checkedPiece.square - 9].piece] == white ){
                  
               toSquare = checkedPiece.square - 9;
               capturedPiece = boardSquaresArray[checkedPiece.square - 9].piece;
    
    
                  addPawnCaptureMove(fromSquare, toSquare, capturedPiece ,  moveList , moveScores);
    
              }
    
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
    
           for(directionIndex = 0; directionIndex < directions.length ; directionIndex++){ 
    
                 
              checkedDirection = directions[directionIndex];
    
              toSquare = fromSquare + checkedDirection;
    
         
                
                if(boardSquaresArray[toSquare].piece != pieces.offBoard && colorsArray[boardSquaresArray[toSquare].piece] != sides[activeSideIndex] && boardSquaresArray[toSquare].piece != pieces.noPiece ) {
    
    
                       
                      capturedPiece = boardSquaresArray[toSquare].piece;
    
                      addCaptureMove(fromSquare, toSquare, capturedPiece ,  moveList, moveScores);
     
    
    
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
    
               while(boardSquaresArray[toSquare].piece != pieces.offBoard && colorsArray[boardSquaresArray[toSquare].piece] != sides[activeSideIndex]){
              

                    if(boardSquaresArray[toSquare].piece != pieces.noPiece){

                       
                         capturedPiece = boardSquaresArray[toSquare].piece;
      
                          addCaptureMove(fromSquare, toSquare, capturedPiece ,  moveList , moveScores);


                           break;


                    }                     
    
    
                         //IF THE SQUARE IS NOT EMPTY, STOP ITERATING ON THIS DIRECTION
    
    
    
    
                    
    
                    toSquare += checkedDirection;
    
                 }
    
              }
    
            }
    
          }
    
        }
    
       
          //console.log('la taille de la move list : ' + moveList.length);
    
    
    
      }
    
    
    
    
      //console.log('---------------------------------------------end of moves generation------------------------------------------------------------------------------------------' + moveList.length );
    
    
     
      return {list: moveList , scores: moveScores};
    
      
    }








    









    function initMoveList(){
       
      moveList = [];

    }