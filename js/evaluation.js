//FUNDAMENTAL PART OF THE ALGORITHM, WHICH DETERMINES HOW THE AI EVALUATES EACH PAWNS POSITION


    function evalBoard(){




        let score = gameBoardMaterials.white - gameBoardMaterials.black;

        let piece ;

        let square ;

        let pieceNum;

        let player;

        let individualPieceScore;

        let evalBoard;

        let evaluatedPiece;

        let pieceScore;

        let boardEvalScore;



        //FOR EACH SIDE
        


        for(sideIndex = 0; sideIndex < 2 ; sideIndex++){



            boardEvalScore = 0;

            player = sides[sideIndex];   




         //FOR EACH PIECE GROUP


            
            for(pieceGroupIndex=0; pieceGroupIndex < player.pieceList.length ;pieceGroupIndex++){


                

            
                pieceGroup = player.pieceList[pieceGroupIndex];

                evalBoard = evalBoardsList[pieceGroupIndex];
                    

                

                 for(pieceIndex=0; pieceIndex < pieceGroup.length ; pieceIndex++){ 


   

                         //FOR EACH PIECE 


                         //GET THE APPROPRIATE EVAL ARRAY
                      


                       evaluatedPieceSq = pieceGroup[pieceIndex].square;




                  //NOW , GET THE SCORE OF THE PIECE AND ADD IT.



                  if( player == white ){

                    pieceScore = evalBoard[get120To64Square(evaluatedPieceSq)];


                    //console.log('piece score :' + pieceScore + ' for the piece ' + pieceGroup[pieceIndex].piece);


                      

                  } else {

                    pieceScore = evalBoard[mirror64(get120To64Square(evaluatedPieceSq)) ];

                    //console.log('piece score :' + pieceScore + ' for the piece ' + pieceGroup[pieceIndex].piece);

                    
                  }

                      //BEFORE ADDING IT, WE CHECK IF THE LOOPED ON PIECE IS A QUEEN.

                  if(pieceGroupIndex == 4){

                        pieceScore = pieceScore/2;

                  }



                  boardEvalScore += pieceScore;


                  //console.log('the board eval score is ' + boardEvalScore);



               }


               //WHILE LOOPING ON THE PIECE LIST, WE CHECK FOR THE BISHOP PAIRS BONUS




               if(pieceGroupIndex == 2){


                   if(pieceGroup.length == 2){


                    boardEvalScore += bishopPairBonus;


                   }


               }



            }


            



            if( player == white){

                score += boardEvalScore;

            
            } else {

                score -= boardEvalScore;


            }

        }

        

        //console.log(' we evaluated the board. Here is the score : ' + score);


        return score;


    }

