
var nodes = 0;
var betacutoff = 0;



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

	//console.log('before the search , the poskey was ' + boardPosKey);

   for(var currentDepth = 1; currentDepth < 6 ; currentDepth++ ) {		
   	   
	 bestScore = alphaBeta( currentDepth , -infinite, infinite);

	 //console.log('after the search , the poskey is ' + boardPosKey);
		
		//bestScore = alphaBeta(-infinite, infinite, currentDepth);

		//Check if the function has to be stopped.
		
		if(stopSearch == true){

			//console.log('times up!!');
			
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

	
	var oldAlpha = alpha;
	var legal = 0;

	var bestMove = noMove;

	var pvMove = probePvTable();




	if(depth <= 0){

		//WHEN DEPTH IS AT 0, RETURN THE EVALUATION.

		//alert('leaf node reached');

		return quiescence(alpha,beta);

	}


	//IMPORTANT, CHECK IF THE FUNCTION NEEDS TO STOP AFTER CHECKING 2047 nodes



	let moves = generateMoves();
	
	let moveList = moves.list;

	let moveScores = moves.scores;


	if(pvMove != noMove){

		//alert('we have a pv move');

		for(var i = 0 ; i < moveList.length ; i++){


			if(moveList[i] == pvMove){
				
				moveScores[i] = 2000000 ;
				break;
			}




		}



	}




	//alert(moveList.length);

	var score = -infinite;	   

	  //LOOP ON EVERY MOVE OF THE MOVE LIST

  	for(var i = 0 ; i < moveList.length ; i++){	

		pickNextMove(i, moveList, moveScores);


		//SORT THE MOVE LIST USING SELECTION SORT

		//IF THE MOVE ISNT VALID, THEN, CONTINUE ON THE MOVELIST

        if (makeMove(moveList[i]) == false) {

			//IF THIS MOVE CAN'T BE DONE, MOVE INVALID STOP AND CHECK THE NEXT MOVE IN THE LIST IF THERE IS ONE
		    continue;
			
		} else {

			legal++;
			//the beta of the opponent being the reverse of its alpha, the reverse of the opponent's beta is the players alpha, and the players beta is the reverse of the opponents alpha.
			
			score = -alphaBeta(depth-1, -beta, -alpha);	

			takeMove(moveList[i]);

		}


		

	


		if(score > alpha) {
   
			if(score >= beta) {


				//alert("there was a cutoff!! new score =>" + score)

				betacutoff++;


				//if the score is higher than beta (-alpha of the opponent), then there 's no point in going on. If the moves are ordered properly, if there is a "beta cutoff"(meaning "no need to go further there ")to do in a movelist, it should happen first.
				searchFh++;

				if(legal==1) {

					searchFhf++;
				}



				//if not first legal move (meaning, the program could potentially do better there)

			    

				if(CAPTURED(moveList[i]) == 0 ){

					//store the previous search killer in another memory space, and remove the search killer space , with the new move

					boardSearchKillers[MAXDEPTH + boardPly] = boardSearchKillers[boardPly];
					boardSearchKillers[boardPly] = moveList[i];
					boardSearchHistory[ boardSquaresArray[FROMSQ(moveList[i])].piece * boardSquaresNum + TOSQ(moveList[i])] += depth;

				}


		

				return beta;
			}


		


			//IF THIS IS A BEST MOVE BUT THERE ARE NO PRUNNING

			alpha = score;
			bestMove = moveList[i];

			
		  }


		
		  
		  

		  	
		if(alpha != oldAlpha) {		
	
			storePvMove(bestMove);

		}
		  

  	 }



	//IF THERE WERE NO LEGAL MOVES AT ALL IN THE LIST


	//IMPORTANT PART : IF WE FIND A BEST MOVE, WE FILL THE PV ARRAY AT THE CURRENT POSKEY (which will be useful for the further iterations)

   

   return alpha;



}




function pickNextMove(firstElementIndex, moveList, moveScores){

	//loop at a certain point of the moveScores to find the best movescore at a certain point of the array.
	
	//init the best score at 0

	var bestScore = moveScores[firstElementIndex]; 

	var bestNum = firstElementIndex;
	

	//Loop on the movescores, and get the best score. Pick the index.
	for (var i = firstElementIndex ; i < moveList.length; i++) {

		if (moveScores[i] > bestScore) {

			bestScore = moveScores[i];
			bestNum = i;
		}

	}
	

	 let currentFirst;
	 let currentFirstScore;

	//select the first element of the part of the array we check, and swap it with the best element
	//select the first element and store it

      currentFirst = moveList[firstElementIndex];

	//go at the first element of the array, and replace what is in there with the move with the highest score

	  moveList[firstElementIndex] = moveList[bestNum];

	//now, go where the best move was stored, and replace it with the previously first element of the array

	 moveList[bestNum] = currentFirst;
	

	//Do the same operation with the move scores array

	  currentFirstScore = moveScores[firstElementIndex];
    
	  moveScores[firstElementIndex] = moveScores[bestNum];

   	  moveScores[bestNum] = currentFirstScore;




  }










   function clearForSearch(){


	    boardPly = 0;

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


		//console.log("is the time over?");


	}





	function quiescence(alpha, beta){
		
		var oldAlpha = alpha;
		var legal = 0;
		var bestMove = noMove;
		var pvMove = probePvTable();
	
	
		return evalBoard();
		
		
		var score = evalBoard();
	
		//IMPORTANT, CHECK IF THE FUNCTION NEEDS TO STOP AFTER CHECKING 2047 nodes
	
		/*
		if(searchedNodes & 2048 != 0){
			checkUp();
		}
		*/
	
		let moves = generateCaptures();
		
		let moveList = moves.list;
	
		let moveScores = moves.scores;
	
	
		if(pvMove != noMove){
	
			//alert('we have a pv move');
	
			for(var i = 0 ; i < moveList.length ; i++){
	
	
				if(moveList[i] == pvMove){
					
					moveScores[i] = 2000000 ;
					break;
				}
	
	
	
	
			}
	
	
	
		}
	
	
	
	
	
	
		  //LOOP ON EVERY MOVE OF THE MOVE LIST
	
		  for(var i = 0 ; i < moveList.length ; i++){	
	
			pickNextMove(i, moveList, moveScores);
	
	
			//SORT THE MOVE LIST USING SELECTION SORT
	
			//IF THE MOVE ISNT VALID, THEN, CONTINUE ON THE MOVELIST
	
			if (makeMove(moveList[i]) == false) {
	
				//IF THIS MOVE CAN'T BE DONE, MOVE INVALID STOP AND CHECK THE NEXT MOVE IN THE LIST IF THERE IS ONE
				continue;
				
			} else {
	
	
				legal++;
				//the beta of the opponent being the reverse of its alpha, the reverse of the opponent's beta is the players alpha, and the players beta is the reverse of the opponents alpha.
				
				score = -alphaBeta(depth-1, -beta, -alpha);	
	
				takeMove(moveList[i]);
	
				/*
				if(stopSearch == true){ 
					return 0;	
				}	
				*/
	
			}
	
	
			
	
		
	
	
			if(score > alpha) {
	   
				if(score >= beta) {
	
	
	
					//if the score is higher than beta (-alpha of the opponent), then there 's no point in going on. If the moves are ordered properly, if there is a "beta cutoff"(meaning "no need to go further there ")to do in a movelist, it should happen first.
					searchFh++;
	
					if(legal==1) {
	
						searchFhf++;
					}
	
					//if not first legal move (meaning, the program could potentially do better there)
	
				 
	
	
	
					if(CAPTURED(moveList[i]) == 0 ){
	
						//store the previous search killer in another memory space, and remove the search killer space , with the new move
	
						boardSearchKillers[MAXDEPTH + boardPly] = boardSearchKillers[boardPly];
						boardSearchKillers[boardPly] = moveList[i];
	
					}
	
	
	
	
	
					return beta;
				}
	
	
				//IF THIS IS A BEST MOVE BUT THERE ARE NO PRUNNING
	
				alpha = score;
				bestMove = moveList[i];
				
			  }
			  
			  
	
				  
			if(alpha != oldAlpha) {		
		
				storePvMove(bestMove);
	
			}
			  
	
		   }
	
	
	
		//IF THERE WERE NO LEGAL MOVES AT ALL IN THE LIST
	
	
		//IMPORTANT PART : IF WE FIND A BEST MOVE, WE FILL THE PV ARRAY AT THE CURRENT POSKEY (which will be useful for the further iterations)
	
	   
	
	   return alpha;
	
	
	
	}
	
	