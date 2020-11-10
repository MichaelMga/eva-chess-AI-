/*

function getPvLine(depth){

  var move = probePvTable();  

}

//THIS FUNCTION RETURNS THE PVMOVE FOR A CERTAIN POSKEY

function probePvTable(){ 

    //Take the current posKey, divide it by the PVENTRIES NUM (10 000). GIVEN THE FACT THE HASH KEYS ARE UNIQUE, WE HAVE A UNIQUE INDEX FOR EACH HASH KEY.
    //WE HASH THE HASHKEY

    var index = brd_posKey % PVENTRIES;


    if(brd_pvTable[index].posKey == brd_posKey){
        return boardPvTable[index].move;
    }
    return NOMOVE;
}


function storePvMove(move){

    var index = brd_posKey % PVENTRIES;

    board_pvTable[index].move = move;
    board_pvTable[index].m
    ove;

}


function getPvLine(depth){

     //PVMOVE = GET THE PVMOVE FOR THE CURRENT POSITION;

    var move = probePvTable();

    var count = 0;

    while(move != NOMOVE && count < depth){

        //Go from zero to the depth

        if(moveExists(move)) {

            makeMove(move);

            board_pvArray[count] = move;

            count++;
        
        } else {

            break;
        }

        move = probePvTable();
    }

    return count;

}





*/