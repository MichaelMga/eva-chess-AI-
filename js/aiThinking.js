


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
     

   makeMove(moveList[0]);

   takeMove(moveList[0]);

   
   makeMove(moveList[1]);

   takeMove(moveList[1]);

   makeMove(moveList[3]);

   takeMove(moveList[3]);

   
   makeMove(moveList[4]);

   takeMove(moveList[4]);

   makeMove(moveList[5]);

   takeMove(moveList[5]);

   
   makeMove(moveList[6]);

   takeMove(moveList[6]);

   makeMove(moveList[7]);

   takeMove(moveList[7]);

   makeMove(moveList[8]);

   takeMove(moveList[8]);

   makeMove(moveList[9]);

   takeMove(moveList[9]);

   makeMove(moveList[10]);

   takeMove(moveList[10]);

   makeMove(moveList[11]);

   takeMove(moveList[11]);

  


  makeMove(moveList[12]);
   



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