
$( document ).ready(function() {
  console.log( "ready!" );
  /// 1/5 mines

  numMines = 7;
  plantedMines = 0;
  var boardMatrix = [];


  function drawBoard () {

    var i, j, fieldElement;
    for (i = 0; i < 7; i++)
    {
      $("table").append("<tr class='board-row-" + i + "'></tr>");
      boardMatrix[i] = [];

      for (j = 0; j < 5; j++)
      {
        $(".board-row-" + i + "").append("<td class='cell-row-" + i + " cell-column-" + j + "'>  </td>");
        boardMatrix[i][j] = [];
        boardMatrix[i][j] = false;
      }
      $("tr").append("</tr>");

    }


  }

  function plantMines () {
    var i, row, col;
    do {
      row = Math.floor(Math.random() * 7);
      col = Math.floor(Math.random() * 5);
      if (boardMatrix[row][col] === true)
        continue;
      boardMatrix[row][col] = true;
      $(".cell-row-"+row+".cell-column-"+col+"").addClass("bomb");
  //    $(".bomb").css({"background-color": "yellow"});



      plantedMines++;
    }
    while (numMines > plantedMines);

  }

  $('td').click(function(){
    var colIndex = $(this).prevAll().length;
    var rowIndex = $(this).parent('tr').prevAll().length;
});

function calcAdjBombs ()  {
  var numBombs;
    for (i = 0; i < 7; i++) {
      for (j = 0; j < 5; j++)
      {
        numBombs = 0;

        if (i !== 0 && j !== 0)
          if (boardMatrix[i-1][j-1] === true) {
            numBombs++;
          }

        if (i !== 0)
          if (boardMatrix[i-1][j] === true) {
            numBombs++;
         }
        if (j !== 0)
          if (boardMatrix[i][j-1] === true) {
            numBombs++;
}
        if (j !== 0 && i !== 6)
          if (boardMatrix[i+1][j-1] === true) {
            numBombs++;
          }

        if (i !== 0 && j !== 4)
          if (boardMatrix[i-1][j+1] === true) {
            numBombs++;
          }

        if (i !== 6 && j !== 4)
          if (boardMatrix[i+1][j+1] === true) {
            numBombs++;
}
        if (i !== 6)
          if (boardMatrix[i+1][j] === true) {
            numBombs++;
}
        if (j !== 4)
          if (boardMatrix[i][j+1] === true) {
            numBombs++;
}

/////// Append to TD

  if (boardMatrix[i][j] !== true) {
  $(".cell-row-"+i+".cell-column-"+j+"").append("<p>"+numBombs+"</p>");
  boardMatrix[i][j] = numBombs;
}
  $("p").hide();

      }

    }


}

function displayClicked (row,col) {


}

$("body").on("click", "td", function() {
     var col = $(this).parent().children().index($(this));
     var row = $(this).parent().parent().children().index($(this).parent());
     displayClicked(row,col);
   });

  drawBoard();
  plantMines();
  calcAdjBombs();
});
