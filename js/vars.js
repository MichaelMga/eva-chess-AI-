var black = {pieceList: [] , name: 'black'};

var white = {pieceList: [] , name: 'white'};


var boardSquaresNum = 120;

var boardSquare;

var squareNum;


var offBoard = 'offBoard';

var noMove = 'noMove';





var activeSideIndex = 0;


var sides = [white, black];

var player;

var testedMove;

var ranksArray = [];




//PIECES


colorsArray = [ 0 , white,  white , white, white, white, white , black , black , black, black , black , black , 0 ];



var pieces =  { noPiece : 0 , wP :  1,  wN : 2 , wB :  3 , wR : 4, wQ : 5, wK : 6 , bP : 7 , bN : 8  , bB : 9 , bR : 10 , bQ : 11 , bK : 12 , offBoard: 13 };





//PROMOTIONS


var promotionArray;

var whitePiecesPromotionArray = [pieces.wN, pieces.wB, pieces.wR, pieces.wQ, pieces.wK];

var blackPiecesPromotionArray = [pieces.bN, pieces.bB, pieces.bR, pieces.bQ, pieces.bK];

var promotionPiece;

var pieceRank;


var pieceRankStr;


var pieceFileStr;



var checkedPiece;



var squareNum;


var sixtyFourArray = [];


var clickedSquareId;


var boardSquaresArray = [];

var newSquare;


var from;

var to;

var newMove;


var moveList = [];



var fileSquare;

var rankSquare;

var filesSquaresArray = [];

var ranksSquaresArray = [];


var fromSquare;

var toSquare;

var guiSquare;

var movingPieceImage;

var addedPiece;


var addedPiecePieceImage;



var prevMoveFromSq;

var prevMoveToSq;

var prevMoveCap;

var prevMovePromoted;




var knightDirections = [ -8, -19,-21, -12, 8, 19, 21, 12 ];
var queenDirections = [ -1, -10, 1, 10 , -9, -11, 11, 9 ];
var rookDirections = [ -1, -10,	1, 10 ];
var bishopDirections = [ -9, -11, 11, 9 ];
var kingDirections = [ -1, -10,	1, 10, -9, -11, 11, 9 ];

var nonSlidingPieces = { white: [{ piece : pieces.wN, directions: knightDirections}, {piece: pieces.wK, directions: kingDirections}] , black: [{piece : pieces.bN, directions: knightDirections}, {piece : pieces.bK, directions: kingDirections}] };

var slidingPieces = { white: [{piece: pieces.wR, directions: rookDirections}, {piece: pieces.wB, directions: bishopDirections}, {piece: pieces.wQ, directions: queenDirections }] , black: [{piece: pieces.bR, directions: rookDirections}, {piece: pieces.bB, directions: bishopDirections}, {piece: pieces.bQ, directions: queenDirections}] };


var pieceStringArray = ['noPiece' , 'whitePawn',  'whiteKnight' , 'whiteBishop', 'whiteRook' , 'whiteQueen' , 'whiteKing', 'blackPawn', 'blackKnight' , 'blackBishop', 'blackRook', 'blackQueen', 'blackKing' , 'offBoard'];

var activePlayerNonSlidingPieces;
var activePlayerSlidingPieces;


var nonSlidingPiece;


var capturedPiece;

var addedMove;

var checkedMove;

var foundMove;

var directions;

var checkedDirection;

var checkedSquare;


var rank;

var file;

var movingPiece;

var activePlayerPieceList;

var nonActivePlayerPieceList;

var pieceGroup;

var loopedOnPiece;

var capPiece;

var promPiece;

var pawn;

var queen;

var  prePromotionRank;

var score;

var infinite = 30000;

var pvTable = [];

//PROMOTION GUI INTERFACE


var noChoice = 'noChoice';

var promotedPieceChoice = noChoice;


var choiceTimeOut;

var choiceInterval;


var chosenPromPiece;


var thinkingTime = 1000;


var depth;

var bestScore;

var bestSearchedMove;

var reversedMove;

var testedMove;

var aiMove;