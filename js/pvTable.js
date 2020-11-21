




function probePvTable(){

    let index = boardPosKey % PVENTRIES;	

    //get the current poskey of the table, and get an index

    
    
    //IF WE FIND A PV MOVE AT THIS POSKEY, WE RETURN IT.
	if( pvTable[index].posKey == boardPosKey ){

    
		return pvTable[index].move;
	}
    
    //else 

	return noMove;

}



function clearPvTable(){


}







function storePvMove(move){

    //CREATE AN INDEX FOR THE CURRENT POSKEY, AND STORE AT THIS INDEX, IN THE PV TABLE, THIS MOVE.

    let pvIndex = boardPosKey * PVENTRIES;


    pvTable[pvIndex].move = move;
    pvTable[pvIndex].posKey = boardPosKey;

}