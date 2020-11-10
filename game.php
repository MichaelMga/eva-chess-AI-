<?php
require 'header.php';

?>

<div id="board">
 

</div>


<div id='thinkingImgDiv'>Eva réfléchit...</div>

<button onclick="takeMove(newMove)">take move</button>


<div id='promotionChoiceInterface'>

     <h1>Choisissez une pièce de promotion</h1>

     <a onclick='selectPromotedPiece(event)' id='Pawn'><img src='img/blackPawn.png'></a>
     <a onclick='selectPromotedPiece(event)' id='Knight'><img src='img/blackKnight.png'></a>
     <a onclick='selectPromotedPiece(event)' id='Rook'><img src='img/blackRook.png'></a>
     <a onclick='selectPromotedPiece(event)' id='Queen'><img src='img/blackQueen.png'></a>
     <a onclick='selectPromotedPiece(event)' id='King'> <img src='img/blackKing.png'></a>

</div>

<?php
require 'footer.php';

?>
