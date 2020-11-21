


 function startAiThinking(){

   searchPosition();


 }




function searchPosition(){

   depth = 1;

   bestScore = -infinite;

   bestSearchedMove = noMove;

   //INIT THE MOVELIST

   moveList = [];

   let bestMove = 'best move';
   

   generateMoves();

   
   let myTimeout;
 
   
   //THE POINT OF USING INFINITY, IS TO MAKE SURE THAT IF AN ELEMENT IS HIGHER TO A VARIABLE, IT MEANS IT WAS MODIFIED
     



for(moveIndex = 0; moveIndex < moveList.length; moveIndex++){
   
   
  makeMove(moveList[moveIndex]);

  takeMove(moveList[moveIndex]);

  


  if(moveIndex == (moveList.length - 1)){


    console.log('all moves were generated. There were ' + moveList.length);



  }


}

   


   return bestMove;


}



function alphabeta(depth, alpha, beta){

     bestMove;

     if(depth == 0){

       return boardEvaluation();
     }
     

     return bestMove;

}


function clearPvTable(){


}