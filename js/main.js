
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
        $(".board-row-" + i + "").append("<td class='cell-row-" + i + " cell-column-" + j + "'> 1 </td>");
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
      if (boardMatrix[row][col] == true)
        continue;
      boardMatrix[row][col] = true;
      $(".cell-row-"+row+".cell-column-"+col+"").addClass("bomb");


      plantedMines++;
    }
    while (numMines > plantedMines);

  }

  $('td').click(function(){
    var colIndex = $(this).prevAll().length;
    var rowIndex = $(this).parent('tr').prevAll().length;
});

  drawBoard();
  plantMines();
});
