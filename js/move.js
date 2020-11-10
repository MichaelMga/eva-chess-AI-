
var selectedFromSquare = null;
var selectedToSquare = null;

let invalid = 'invalid';


function clickedSquare(event){

     


        clickedSquareId = event.currentTarget.id;



        if(selectedFromSquare == null){

            selectedFromSquare = clickedSquareId;


             
        } else{
        
            selectedToSquare = clickedSquareId;

           //PROVIDE THE TWO CLASSES AS ARGUMENT. 
      
           if(moveValidity( getSquareFromGui(selectedFromSquare), getSquareFromGui(selectedToSquare)) == true){

               //IF THE MOVE IS VALID, A BIT CHAIN IS RETURNED USING THE VARIABLE 'NEW MOVE'
                
               
                makeMove(newMove);

               //CHANGE THE BOARD SIDE
                
               
               startAiThinking();


                 //AFTER THE PLAYER CLICK ON THE SECOND SQUARE, THE AI STARTS THINKING;
           }

           console.log(boardSquaresNum);


            selectedFromSquare = null;
            selectedToSquare = null;


     
       }
  
  }




function moveValidity(fromSquare, toSquare){

     
    //GENERATE THE MOVES FOR THE CURRENT COLOR

      
     newMove = createUserMove(fromSquare, toSquare);

     console.log('is the move ' + newMove + 'valid?')

      //IF THE MOVE IS NOT IN THIS LIST, THEN RETURN FALSE

      //ELSE RETURN THE MOVE


      if(moveExists(newMove) == true){

        console.log('valid move');

           return true;

      } else {

        console.log('invalid move');

      }

}


function moveExists(move){

     //loop on all the generated move, and return true if the move is in it. Else return false
     
     generateMoves();

     foundMove = false;

     for(moveIndex=0; moveIndex < moveList.length; moveIndex++){

          checkedMove = moveList[moveIndex];

          if(checkedMove == move){
            
               foundMove = true;

          }

     }


      if(foundMove == true){

          console.log('this move is valid!');

          return true;



      } else {

          console.log('this move is invalid');

      }



  }




   
   function getSquareFromGui(square){

        
         //WE GOT A RANK AND A FILE

         //FOR THE RANK, WE'LL TAKE THE VALUE LOCATED AFTER "RANK";


         rankSquare =  parseInt(square[4]) - 1;

         
         //FOR THE RANK, WE'LL TAKE THE VALUE LOCATED AFTER "FILE";
 

         fileSquare = parseInt(square[9]) - 1; 

         newSquare =  getSquare(rankSquare , fileSquare);

         console.log(newSquare);
         

         return newSquare;

   }




   function makeMove(move){



    //TAKE EACH PART OF THE MOVE, TO BITWISE AND WITH 1111111 

     fromSqFromChain = FROMSQ(move);

     toSqFromChain  = TOSQ(move);

     captSqFromChain = CAPTURED(move);

     promotedSqFromChain =  PROMOTED(move);



      
    //EMPTY THE PIECELIST

    //HOW TO FIND ELEMENTS IN THE PIECE LIST?

    activePlayerPieceList = sides[activeSideIndex].pieceList;

    nonActivePlayerPieceList = sides[activeSideIndex ^ 1].pieceList;

    

    //LOOP ON THE MOVELIST

         //ACCORDING TO THE PIECE, THE ELEMENT WILL BE LOCATED AT A CERTAIN SPOT IN THE MOVE LIST
          
         
        let piece = boardSquaresArray[fromSqFromChain].piece;

           console.log('the array is :');


        for(i=0; i< 120; i++){
        
          console.log( 'the array is :' + i + ':' + boardSquaresArray[i].piece);

        }

         console.log('the from square piece is ' + piece + 'for the move from ' + fromSqFromChain + ' to ' + toSqFromChain );
         

         


         for(pieceIndex = 0 ; pieceIndex < activePlayerPieceList[getPieceIndex(piece, sides[activeSideIndex])].length; pieceIndex++){

              loopedOnPiece = activePlayerPieceList[getPieceIndex(piece, sides[activeSideIndex])][pieceIndex];

              //CHANGE THE FROM SQUARE

              if(loopedOnPiece.square == fromSqFromChain){

                 loopedOnPiece.square = toSqFromChain;
                
              }
 
         }


         //IF THIS IS A CAPTURE MOVE (IF A PIECE NUM IS STORED IN THE CHAIN BIT)


    

    if(captSqFromChain & 0x4F != 0){

      console.log('capture!')

      piece = boardSquaresArray[toSqFromChain].piece;

         for(pieceIndex = 0 ; pieceIndex < nonActivePlayerPieceList[getPieceIndex(piece, sides[activeSideIndex ^ 1])].length; pieceIndex++){

          loopedOnPiece =  nonActivePlayerPieceList[getPieceIndex(piece, sides[activeSideIndex ^ 1])][pieceIndex];

          console.log('potential capture move');


          //CHANGE THE FROM SQUARE

          if(loopedOnPiece.square == toSqFromChain){

            //DELETE THE ELEMENT FROM THE LIST AT THE LOOPED ON INDEX

            nonActivePlayerPieceList[getPieceIndex(piece, sides[activeSideIndex ^ 1])].splice(0,pieceIndex);
            
           }
        }
     }


     if((promotedSqFromChain & 0x7F) != 0){


      //IF PROMOTION MOVE, ADD THE PROMOTED PIECE

      boardSquaresArray[toSqFromChain].piece = promotedPieceChoice;

      promotedPieceChoice = noChoice;
      
     } else {
           
      //IF NORMAL 

      //EMPTY THE FROMSQUARE IN THE BOARD SQUARES ARRAY

       boardSquaresArray[toSqFromChain].piece = boardSquaresArray[fromSqFromChain].piece;


     }



    
    
      //AFTER REPLACING THE TOSQUARE BY THE FROMSQUARE, WE CAN NOW EMPTY THE FROMSQUARE

      boardSquaresArray[fromSqFromChain].piece = pieces.noPiece;



      for(squareIndex=0; squareIndex < sixtyFourArray.length; squareIndex++ ){


      }
     


      moveGuiPieces(fromSqFromChain, toSqFromChain);


      activeSideIndex ^= 1;


     
   }





   function takeMove(move){

    activeSideIndex ^= 1;


    //REVERSE THE MOVE
     
    prevMoveFromSq = FROMSQ(move);

    prevMoveToSq  = TOSQ(move);

    prevMoveCap = CAPTURED(move);

    prevMovePromoted =  PROMOTED(move);



    console.log('move taken back for the piece ' + boardSquaresArray[prevMoveToSq].piece);



    
    activePlayerPieceList = sides[activeSideIndex].pieceList;

    nonActivePlayerPieceList = sides[activeSideIndex ^ 1].pieceList;



    reversedMove = createMove(prevMoveToSq ,  prevMoveFromSq , pieces.noPiece , pieces.noPieces );


     makeMove(reversedMove);

     activeSideIndex ^= 1;


     
    
/*



     //AFTER THE MOVE IS DONE BACK, ADD THE PIECE THAT WAS DELETED

    if( prevMoveCap & 0x4F != 0){

      //ADD A PIECE OBJECT AND GIVE IT THE SQUARE TOSQ

      nonActivePlayerPieceList[getPieceIndex( prevMoveCap, sides[activeSideIndex ^ 1])].push({piece:  prevMoveCap, square: prevMoveToSq });

      boardSquaresArray[prevMoveToSq].piece = prevMoveCap ;


      addGuiPiece(prevMoveCap , prevMoveToSq);

      
    }



    */





   }





   function createUserMove(fromSquare, toSquare){


         //IS IT A CAPTURE MOVE?


           if(boardSquaresArray[toSquare].piece != pieces.noPiece){

              capPiece = boardSquaresArray[toSquare].piece;

           } else {

             capPiece = pieces.noPiece;

           }




           //CHECKING PROMOTIONS(PAWNS)
   
           if(sides[activeSideIndex] == white){

            pawn = pieces.wP;

            queen = pieces.wQ;

            prePromotionRank = 6;

        } else {

            pawn = pieces.bP;

            queen = pieces.bQ;

            prePromotionRank = 1;

         }
       

      
        if(boardSquaresArray[fromSquare].piece == pawn){



              //IS IT A PROMOTING MOVE (ONLY FOR PAWNS)?

               
              if(ranksSquaresArray[fromSquare].rank == prePromotionRank){


                displayPromotionChoice();

                
                choiceInterval = setInterval( function(){

                  //CHECK IF THE PLAYER MAKES A CHOICE (BY FILLING A VARIABLE)

                  //CHECK IF THE PLAYER MADE A CHOICE

                  console.log('checking...');


                  if(promotedPieceChoice != noChoice){
                              
                    clearTimeout(choiceTimeOut);

                    clearInterval(choiceInterval);



                    console.log('timeout cleared..');



                    promPiece = promotedPieceChoice;


                  } 
                
                }, 500);

                  choiceTimeOut = setTimeout(

                     function(){

                         clearInterval(choiceInterval);

                        alert('nous avons choisis pour vous! Votre pion a été promu en reine');

                        promPiece = queen;

                        alert('promotion move created' + promPiece);


                      }, 3000


                );





                       
                //IF THE FROMSQUARE PIECE IS A PAWN, BUT THE SQUARE ISNT A PRE PROMOTION SQUARE, NO PROMOTION

              } else {

                promPiece = pieces.noPiece;

              }


              //IF THE FROMSQUARE IS NOT A PAWN, THIS IS NOT A PROMOTION MOVE
    
           } else {
             
            promPiece = pieces.noPiece;

           }

          
         return createMove(fromSquare, toSquare, capPiece, promPiece);

   }



   function getPieceIndex(givenPiece, side){




      if(side == white){
        
        return (givenPiece - 1);

      } else {
        
        //FOR THE BLACK PIECES, THE 7th ELEMENT IS ACTUALLY LOCATED AT THE 0th POSITION

        return (givenPiece - 7);
      }




  }
