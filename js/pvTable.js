
function probePvTable(){


    let index = boardPosKey % pvEntries ;	

    //get the current poskey of the table, and get an index

    
    
	if( pvTable[index].posKey == boardPosKey ){

        return pvTable[index].move;
        
	}
    

    return noMove;

}


function clearPvTable(){
    
    
    for(i = 0; i < pvEntries; i++) {

      pvTable[i].move = noMove;
      pvTable[i].posKey = 0;

    }

}




function storePvMove(move){


    //CREATE AN INDEX FOR THE CURRENT POSKEY, AND STORE AT THIS INDEX, IN THE PV TABLE, THIS MOVE.

    let pvIndex = boardPosKey % pvEntries;

    pvTable[pvIndex].move = move;
    pvTable[pvIndex].posKey = boardPosKey;


    return pvTable[pvIndex].posKey;



}

