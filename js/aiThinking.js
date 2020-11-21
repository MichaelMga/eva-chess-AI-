
function startAiThinking(){

   searchPosition();


 }




function searchPosition(){


  let bestScore;

  for( currentDepth = 1; currentDepth <= 5; ++currentDepth ) {						
		
		bestScore = alphaBeta(-infinite, infinite, currentDepth);

		//Check if the function has to be stopped.

		if(stopSearch == true) break;

		//Get a Pv line, that will be used in the alpha beta function


		//GET THE BEST MOVE FOR THE POSITION
	
		bestMove = probePvTable();



		line = ("Depth:" + currentDepth + " best:" + PrMove(bestMove) + " Score:" + bestScore + " nodes:" + srch_nodes); 
		
		if(currentDepth!=1) {

			line += (" Ordering:" + ((srch_fhf/srch_fh)*100).toFixed(2) + "%");

		}
		console.log(line);
		
		domUpdate_depth = currentDepth;
		domUpdate_move = bestMove;
		domUpdate_score = bestScore;
		domUpdate_nodes = srch_nodes;
		domUpdate_ordering = ((srch_fhf/srch_fh)*100).toFixed(2);
	}	

}




function alphabeta(depth, alpha, beta){



	if(depth <= 0){


		return evalBoard();


	}

	//IMPORTANT, CHECK IF THE FUNCTION NEEDS TO STOP AFTER CHECKING 2047 nodes


	if(searchNodes & 2048 != 0){

		checkUp();
	}


	if()

  GenerateMoves();

  let score;
  

			//LOOP ON EVERY MOVE OF THE MOVE LIST
			


  	for(MoveIndex = 0; moveIndex < moveList.length; moveIndex++)  {	


		//Before making each move, select the move with the best score at the position of the array we're on


		//This is why the pvtable was important : if there is a pvmove in this list, it will be picked first.


		pickNextMove(moveIndex);	


        if (makeMove(moveList[moveNum]) == false)  {

			//IF THIS MOVE CAN'T BE DONE, MOVE INVALID STOP AND CHECK THE NEXT MOVE IN THE LIST IF THERE IS ONE

            continue;
        }
        
		legal++;

		//the beta of the opponent being the reverse of its alpha, the reverse of the opponent's beta is the players alpha, and the players beta is the reverse of the opponents alpha.


		score = -alphaBeta(depth-1, -beta, -alpha);


		takeMove(moveList[MoveIndex]);


		if(stopSearch == true) return 0;				
		
		//If we find a best move for this score.

		if(score > alpha) {
			if(score >= beta) {

				//if the score is higher than beta (-alpha of the opponent), then there 's no point in going on. If the move is ordered properly, if there is a probing to do in a movelist, it should happen first.

			
				if(legal==1) {

					searchFhf++;
				}

				//if not first legal move

				searchFh++;	


				//if the move is not a capture move , we'll refer it as a "search killer"
				
				if( (CAPTURED(moveList[moveIndex]) & 0x4F) == 0) {

					boardSearchKillers[MAXDEPTH + boardPly] = brd_searchKillers[boardPly];
					boardSearchKillers[boardPly] = brd_moveList[MoveNum];

				}				
				return beta;
			}

			//IF THIS IS A BEST MOVE BUT THERE ARE NO PRUNNING


			alpha = score;
			bestMove = moveList[moveIndex];

			//IF THERE IS NO PRUNNING, BUT THERE IS A CAPTURE


		 	if( (CAPTURED(bestMove) & 0x4F) != 0) {

				//STORE THE MOVE AT A UNIQUE INDEX IN THE HISTORY (FROMPIECE * 120 + TOSQ) and add the current depth we are checking to it.

				boardSearchHistory[ boardSquaresArray[FROMSQ(bestMove)].piece * boardSquaresNum + TOSQ(BestMove) ] += depth;

			}


		}		
	}


	//IF THERE WERE NO LEGAL MOVES AT ALL IN THE LIST
	 
	if(Legal == 0) {

         //CHECK IF THE AI IS IN A CHECKED POSITION (MEANING, IF THE KING IS ATTACKED BY AN OPPONENTS PIECE AT THE CURRENT POSITION)

		if(InCheck) {

			//RETURN A SCORE VERY NEGATIVE FOR THE CURRENT POSITION  = GAME OVER. NO LEGAL MOVE, WHILE IN A MATE POSITION
			return -MATE + brd_ply;

		} else {

			//IF NO LEGAL MOVE POSSIBLE, BUT NO POSSIBLE MOVE, return 0.

			return 0;
		}
	}



	//IMPORTANT PART : IF WE FIND A BEST MOVE, WE FILL THE PV ARRAY AT THE CURRENT POSKEY (which will be useful for the further iterations)
	
	if(alpha != OldAlpha) {		

		StorePvMove(BestMove);
	}
	
	return alpha;

}




function pickNextMove(unsortedArrayFirstElementIndex){

	//loop at a certain point of the moveScores to find the best movescore at a certain point of the array.

	var index = 0;
	
	//init the best score at 0
	var bestScore = 0; 

	var bestNum = unsortedFirstElement;
	

	//Loop on the movescores, and get the best score. Pick the index.
	for (moveIndex = unsortedArrayFirstElementIndex; moveIndex < moveList.length; moveIndex++) {

		if (boardMoveScores[moveIndex] > bestScore) {

			bestScore = moveListScores[moveIndex];
			bestNum = moveIndex;
		}
	}
	



	let previouslyFirstElement;


	//select the first element of the part of the array we check, and swap it with the best element

	//select the first element and store it

	previouslyFirstElement = moveList[unsortedArrayFirstElementIndex];

	//go at the first element of the array, and replace what is in there with the move with the highest score

	moveList[unsortedArrayFirstElementIndex] = moveList[bestNum];

	//now, go where the best move was stored, and replace it with the previously first element of the array

	brd_moveList[bestNum] = previouslyFirstElement;
	
	
	//Do the same operation with the move scores array

	previouslyFirstElement = moveListScores[unsortedArrayFirstElementIndex];
    
	moveListScores[unsortedArrayFirstElementIndex] = moveListScores[bestNum];
	moveListScores[bestNum] = previouslyFirstElement;

}