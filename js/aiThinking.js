
var nodes = 0;


function startAiThinking(){

	stopSearch = false;
	let bestMove = searchPosition();
	makeMove(bestMove);
	moveGuiPieces(FROMSQ(bestMove), TOSQ(bestMove));



 }



function searchPosition(){

	var bestMove = noMove;
	let bestScore = -infinite;
	let pvNum = 0;
	let line;


	clearForSearch();
	//EXECUTE THE ALPHABETA FUNCTION A CERTAIN NUMBER OF TIMES ACCORDING TO THE DESIRED DEPTH

	console.log('before the search , the poskey was ' + boardPosKey);

   for(var currentDepth = 1; currentDepth < 5 ; currentDepth++ ) {		

   	   
	 bestScore = alphaBeta( currentDepth , -infinite, infinite);

	 console.log('after the search , the poskey is ' + boardPosKey);
		
		//bestScore = alphaBeta(-infinite, infinite, currentDepth);

		//Check if the function has to be stopped.
		
		if(stopSearch == true){

			console.log('times up!!');
			
			break;
		 } 

		 
		//Get a Pv line, that will be used in the alpha beta function

	   //AFTER MAKING AN ALPHABETA ITERATION, GET THE BEST MOVE FOR THE POSITION
		
	
		bestMove = probePvTable();

		
	}	


	
	return bestMove;
			

}




function alphaBeta(depth, alpha, beta){

	nodes++;

	var moves = 0;

	
	var oldAlpha = alpha;
	var legal = 0;

	var bestMove = -infinite;




	if(depth <= 0){

		//WHEN DEPTH IS AT 0, RETURN THE EVALUATION.

		//alert('leaf node reached');

		return evalBoard();
	}


	//IMPORTANT, CHECK IF THE FUNCTION NEEDS TO STOP AFTER CHECKING 2047 nodes

	/*
	if(searchedNodes & 2048 != 0){
		checkUp();
	}
	*/

	console.log('************************' + nodes + '*****************************')
	
	let moveList = generateMoves();

	//alert(moveList.length);

	let score;	   

	  //LOOP ON EVERY MOVE OF THE MOVE LIST

  	for(var i = 0 ; i < moveList.length ; i++){	

		//SORT THE MOVE LIST USING SELECTION SORT
		//pickNextMove(i, moveList);	

		//IF THE MOVE ISNT VALID, THEN, CONTINUE ON THE MOVELIST

        if (makeMove(moveList[i]) == false) {

			//IF THIS MOVE CAN'T BE DONE, MOVE INVALID STOP AND CHECK THE NEXT MOVE IN THE LIST IF THERE IS ONE
		    continue;
			
		} else {

			moves++;

			if(i == (moveList.length - 1)){

				console.log('*********************last move made ' + moves + 'ML length => ' + moveList.length + ' depth=> ' + depth);



			} else {

				
			console.log('*********************move made ' + moves + 'ML length => ' + moveList.length  + ' depth=> ' + depth);
			
			}


			//legal++;
			//the beta of the opponent being the reverse of its alpha, the reverse of the opponent's beta is the players alpha, and the players beta is the reverse of the opponents alpha.
			
			score = -alphaBeta(depth-1, -beta, -alpha);	

			takeMove(moveList[i]);

			/*
			if(stopSearch == true){ 
				return 0;	
			}	
			*/

		}
		
		

		
		if(alpha != oldAlpha) {		
	
			storePvMove(bestMove);

		}


		if(score > alpha) {
   
			if(score >= beta) {


				//if the score is higher than beta (-alpha of the opponent), then there 's no point in going on. If the moves are ordered properly, if there is a "beta cutoff"(meaning "no need to go further there ")to do in a movelist, it should happen first.
			
				if(legal==1) {

					searchFhf++;
				}

				//if not first legal move (meaning, the program could potentially do better there)

				searchFh++;	



				return beta;
			}


			//IF THIS IS A BEST MOVE BUT THERE ARE NO PRUNNING

			alpha = score;
			bestMove = moveList[i];
			
		  }		
		  

  	 }



	//IF THERE WERE NO LEGAL MOVES AT ALL IN THE LIST


	//IMPORTANT PART : IF WE FIND A BEST MOVE, WE FILL THE PV ARRAY AT THE CURRENT POSKEY (which will be useful for the further iterations)

   

   return alpha;



}




function pickNextMove(firstMoveInList, moveList){

	//loop at a certain point of the moveScores to find the best movescore at a certain point of the array.
	
	//init the best score at 0
	var bestScore = 0; 

	var bestNum = unsortedFirstElement;
	

	//Loop on the movescores, and get the best score. Pick the index.
	for (moveIndex = firstMoveInList ; moveIndex < moveList.length; moveIndex++) {

		if (boardMoveScores[moveIndex] > bestScore) {

			bestScore = moveListScores[moveIndex];
			bestNum = moveIndex;
		}
	}
	



	 let previouslyFirstElement;


	//select the first element of the part of the array we check, and swap it with the best element

	//select the first element and store it

      previouslyFirstElement = moveList[firstMoveInList];

	//go at the first element of the array, and replace what is in there with the move with the highest score

	  moveList[firstMoveInList] = moveList[bestNum];

	//now, go where the best move was stored, and replace it with the previously first element of the array

	  brd_moveList[bestNum] = previouslyFirstElement;
	
	
	//Do the same operation with the move scores array

	  previouslyFirstElement = moveListScores[firstMoveInList];
    
	  moveListScores[firstMoveInList] = moveListScores[bestNum];
   	  moveListScores[bestNum] = previouslyFirstElement;




  }








	/*



function alphaBeta(alpha, beta){


		
	if(depth <= 0) {
		return Quiescence(alpha, beta);
		// return EvalPosition();
	}	


	if((srch_nodes & 2047) == 0) CheckUp();
	
	srch_nodes++;
	

	if((IsRepetition() || brd_fiftyMove >= 100) && brd_ply != 0) {	
		return 0;
	}
	
	if(brd_ply > MAXDEPTH - 1) {
		return EvalPosition(pos);
	}
	
	var InCheck = SqAttacked(brd_pList[PCEINDEX(Kings[brd_side],0)], brd_side^1);
	
	if(InCheck == BOOL.TRUE) {
		depth++;
	}
	
	var Score = -INFINITE;
	
	if( DoNull == BOOL.TRUE && BOOL.FALSE == InCheck && 
			brd_ply != 0 && (brd_material[brd_side] > 50200) && depth >= 4) {
		
		
		var ePStore = brd_enPas;
		if(brd_enPas != SQUARES.NO_SQ) HASH_EP();
		brd_side ^= 1;
    	HASH_SIDE();
    	brd_enPas = SQUARES.NO_SQ;
		
		Score = -AlphaBeta( -beta, -beta + 1, depth-4, BOOL.FALSE);
		
		brd_side ^= 1;
    	HASH_SIDE();
		brd_enPas = ePStore;
		if(brd_enPas != SQUARES.NO_SQ) HASH_EP();
		
		if(srch_stop == BOOL.TRUE) return 0;	
		if (Score >= beta) {		 
		  return beta;
		}	
	}
		
    GenerateMoves();
      
    var MoveNum = 0;
	var Legal = 0;
	var OldAlpha = alpha;
	var BestMove = NOMOVE;
	Score = -INFINITE;
	var PvMove = ProbePvTable();		
	
	if( PvMove != NOMOVE) {
		for(MoveNum = brd_moveListStart[brd_ply]; MoveNum < brd_moveListStart[brd_ply + 1]; ++MoveNum) {
			if( brd_moveList[MoveNum] == PvMove) {
				brd_moveScores[MoveNum].score = 2000000;
				break;
			}
		}
	}
	
	for(MoveNum = brd_moveListStart[brd_ply]; MoveNum < brd_moveListStart[brd_ply + 1]; ++MoveNum)  {	
			
		PickNextMove(MoveNum);	
		
        if ( MakeMove(brd_moveList[MoveNum]) == BOOL.FALSE)  {
            continue;
        }
        
		Legal++;
		Score = -AlphaBeta( -beta, -alpha, depth-1, BOOL.TRUE);
		TakeMove();						
		if(srch_stop == BOOL.TRUE) return 0;				
		
		if(Score > alpha) {
			if(Score >= beta) {
				if(Legal==1) {
					srch_fhf++;
				}
				srch_fh++;	
				
				if((brd_moveList[MoveNum] & MFLAGCAP) == 0) {
					brd_searchKillers[MAXDEPTH + brd_ply] = brd_searchKillers[brd_ply];
					brd_searchKillers[brd_ply] = brd_moveList[MoveNum];
				}				
				return beta;
			}
			alpha = Score;
			BestMove = brd_moveList[MoveNum];
			if((BestMove & MFLAGCAP) == 0) {
				brd_searchHistory[ brd_pieces[FROMSQ(BestMove)] * BRD_SQ_NUM + TOSQ(BestMove) ] += depth;
			}
		}		
    }
	
	if(Legal == 0) {
		if(InCheck) {
			return -MATE + brd_ply;
		} else {
			return 0;
		}
	}
	
	if(alpha != OldAlpha) {		
		StorePvMove(BestMove);
	}
	
	return alpha;



	}


	
	*/




   function clearForSearch(){


		//clears the history

		for(var i=0; i < 14 * boardSquaresNum ; i++){
			boardSearchHistory[i] = 0;
		}


		//clears the searchKillers table

		
		for(var n=0; n < 3 * MAXDEPTH; n++){

			boardSearchKillers[n] = 0;

	   }

		//clears the pvTable

		clearPvTable();


		initMoveList();

		//set search stats to 0

        searchedNodes = 0;
		searchFh = 0;
		searchFhf = 0;
		searchStart = Date.now();
		stopSearch = false;


	}




	function checkUp(){


		console.log("is the time over?");


	}

