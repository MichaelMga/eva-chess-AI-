
//FUNDAMENTAL PART OF THE ALGORITHM, WHICH DETERMINES HOW THE AI EVALUATES EACH PAWNS POSITION


var pawnTable = [
    0	,	0	,	0	,	0	,	0	,	0	,	0	,	0	,
    10	,	10	,	0	,	-10	,	-10	,	0	,	10	,	10	,
    5	,	0	,	0	,	5	,	5	,	0	,	0	,	5	,
    0	,	0	,	10	,	20	,	20	,	10	,	0	,	0	,
    5	,	5	,	5	,	10	,	10	,	5	,	5	,	5	,
    10	,	10	,	10	,	20	,	20	,	10	,	10	,	10	,
    20	,	20	,	20	,	30	,	30	,	20	,	20	,	20	,
    0	,	0	,	0	,	0	,	0	,	0	,	0	,	0	
    ];
    
    var knightTable = [
    0	,	-10	,	0	,	0	,	0	,	0	,	-10	,	0	,
    0	,	0	,	0	,	5	,	5	,	0	,	0	,	0	,
    0	,	0	,	10	,	10	,	10	,	10	,	0	,	0	,
    0	,	0	,	10	,	20	,	20	,	10	,	5	,	0	,
    5	,	10	,	15	,	20	,	20	,	15	,	10	,	5	,
    5	,	10	,	10	,	20	,	20	,	10	,	10	,	5	,
    0	,	0	,	5	,	10	,	10	,	5	,	0	,	0	,
    0	,	0	,	0	,	0	,	0	,	0	,	0	,	0		
    ];
    
    var bishopTable = [
    0	,	0	,	-10	,	0	,	0	,	-10	,	0	,	0	,
    0	,	0	,	0	,	10	,	10	,	0	,	0	,	0	,
    0	,	0	,	10	,	15	,	15	,	10	,	0	,	0	,
    0	,	10	,	15	,	20	,	20	,	15	,	10	,	0	,
    0	,	10	,	15	,	20	,	20	,	15	,	10	,	0	,
    0	,	0	,	10	,	15	,	15	,	10	,	0	,	0	,
    0	,	0	,	0	,	10	,	10	,	0	,	0	,	0	,
    0	,	0	,	0	,	0	,	0	,	0	,	0	,	0	
    ];
    
    var rookTable = [
    0	,	0	,	5	,	10	,	10	,	5	,	0	,	0	,
    0	,	0	,	5	,	10	,	10	,	5	,	0	,	0	,
    0	,	0	,	5	,	10	,	10	,	5	,	0	,	0	,
    0	,	0	,	5	,	10	,	10	,	5	,	0	,	0	,
    0	,	0	,	5	,	10	,	10	,	5	,	0	,	0	,
    0	,	0	,	5	,	10	,	10	,	5	,	0	,	0	,
    25	,	25	,	25	,	25	,	25	,	25	,	25	,	25	,
    0	,	0	,	5	,	10	,	10	,	5	,	0	,	0		
    ];
    
    var kingE = [	
        -50	,	-10	,	0	,	0	,	0	,	0	,	-10	,	-50	,
        -10,	0	,	10	,	10	,	10	,	10	,	0	,	-10	,
        0	,	10	,	20	,	20	,	20	,	20	,	10	,	0	,
        0	,	10	,	20	,	40	,	40	,	20	,	10	,	0	,
        0	,	10	,	20	,	40	,	40	,	20	,	10	,	0	,
        0	,	10	,	20	,	20	,	20	,	20	,	10	,	0	,
        -10,	0	,	10	,	10	,	10	,	10	,	0	,	-10	,
        -50	,	-10	,	0	,	0	,	0	,	0	,	-10	,	-50	
    ];
    
    var kingO = [	
        0	,	5	,	5	,	-10	,	-10	,	0	,	10	,	5	,
        -30	,	-30	,	-30	,	-30	,	-30	,	-30	,	-30	,	-30	,
        -50	,	-50	,	-50	,	-50	,	-50	,	-50	,	-50	,	-50	,
        -70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,
        -70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,
        -70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,
        -70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,
        -70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70	,	-70		
    ];




 


    function evalBoard(){



        let score = gameBoardMaterial[white] -  gameBoardMaterial[black];


        let piece ;

        let square ;

        let pieceNum;

        let player;

        let boardEvalScore;

        let evalBoard;

        let evaluatedPiece;

        let pieceScore;


        //FOR EACH SIDE


        for(sideIndex=0; sideIndex < 2 ; sideIndex++){


            boardEvalScore = 0;

            player = sides[sideIndex];   
            
            
            for(pieceGroupIndex=0; pieceGroupIndex < player.pieceList.length ;pieceGroupIndex++){



            
                pieceGroup = player.pieceList[pieceGroupIndex];

                evalBoard = evalBoardsList[pieceGroupIndex];


           
               for(pieceIndex=0; pieceIndex < pieceGroup.length ; pieceIndex++){ 

          
                  evaluatedPieceSq = pieceGroup[pieceIndex].square;


                  //NOW , GET THE SCORE OF THE PIECE AND ADD IT.





                    



                  if( player == white ){

                    pieceScore = evalBoard[get120To64Square(evaluatedPieceSq)];
                      

                  } else {


                    pieceScore = evalBoard[mirror64(get120To64Square(evaluatedPieceSq)) ];
                    
                  }


                      //BEFORE ADDING IT, WE CHECK IF THE LOOPED ON PIECE IS A QUEEN.

                  if( pieceGroupIndex == 4 ){

                        pieceScore = pieceGroup/2;

                  }



                  boardEvalScore += pieceScore;



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






}

