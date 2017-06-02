
$( document ).ready(function() {
  console.log( "ready!" );
  /// 1/5 mines

  numMines = 7;
  plantedMines = 0;
  var boardMatrix = [];
  var revealedMatrix = [];


  function drawBoard () {

    var i, j, fieldElement;
    for (i = 0; i < 7; i++)
    {
      $("table").append("<tr class='board-row-" + i + "'></tr>");
      boardMatrix[i] = [];
      revealedMatrix[i] = [];

      for (j = 0; j < 5; j++)
      {
        $(".board-row-" + i + "").append("<td class='cell-row-" + i + " cell-column-" + j + "'>  </td>");
        boardMatrix[i][j] = [];
        revealedMatrix[i][j] = [];
        boardMatrix[i][j] = false;
        revealedMatrix[i][j] = false;
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
      //$(".cell-row-"+row+".cell-column-"+col+"").addClass("bomb");
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
        if (boardMatrix[i][j] === 1)
          $(".cell-row-"+(i)+".cell-column-"+(j)+" > p").css({"color": "blue"});
        else if (boardMatrix[i][j] === 2)
            $(".cell-row-"+(i)+".cell-column-"+(j)+" > p").css({"color": "green"});
        else if (boardMatrix[i][j] === 3)
            $(".cell-row-"+(i)+".cell-column-"+(j)+" > p").css({"color": "red"});
        else if (boardMatrix[i][j] === 4)
            $(".cell-row-"+(i)+".cell-column-"+(j)+" > p").css({"color": "purple"});
        else if (boardMatrix[i][j] === 5)
            $(".cell-row-"+(i)+".cell-column-"+(j)+" > p").css({"color": "maroon"});
        else if (boardMatrix[i][j] === 6)
          $(".cell-row-"+(i)+".cell-column-"+(j)+" > p").css({"color": "#13a798"});
        else if (boardMatrix[i][j] === 7)
          $(".cell-row-"+(i)+".cell-column-"+(j)+" > p").css({"color": "black"});
        else if (boardMatrix[i][j] === 8)
            $(".cell-row-"+(i)+".cell-column-"+(j)+" > p").css({"color": "brown"});


      }

    }


  }

  function displayClicked (row,col) {


    if (boardMatrix[row][col] === true) {
     $(".cell-row-"+row+".cell-column-"+col+"").addClass("bomb");
   }

    else if (boardMatrix[row][col] > 0) {
      console.log("hi");
      revealedMatrix[row][col] = true;
      $(".cell-row-"+row+".cell-column-"+col+" > p").show();
    }

   else {
    if (revealedMatrix[row][col] === false) {
      revealedMatrix[row][col] = true;
      if (boardMatrix[row][col] === 0) {
      $(".cell-row-"+(row)+".cell-column-"+(col)+"").addClass("noBomb");
      displayClicked(row,col);
      }
    }


    if (row !== 0 && col !== 0 && revealedMatrix[row-1][col-1] === false)
    {
      revealedMatrix[row-1][col-1] = true;
      if (boardMatrix[row-1][col-1] === 0) {
        $(".cell-row-"+(row-1)+".cell-column-"+(col-1)+"").addClass("noBomb");
        displayClicked(row-1,col-1);
      }
      else  $(".cell-row-"+(row-1)+".cell-column-"+(col-1)+" > p").show();
    }

    if (row !== 0 && revealedMatrix[row-1][col] === false)
    {
      revealedMatrix[row-1][col] = true;

      if (boardMatrix[row-1][col] === 0) {
        $(".cell-row-"+(row-1)+".cell-column-"+col+"").addClass("noBomb");
        displayClicked(row-1,col);
      }
      else  $(".cell-row-"+(row-1)+".cell-column-"+col+" > p").show();
    }
    if (col !== 0  && revealedMatrix[row][col-1] === false)
    {
      revealedMatrix[row][col-1] = true;

      if (boardMatrix[row][col-1] === 0) {
      $(".cell-row-"+row+".cell-column-"+(col-1)+"").addClass("noBomb");
        displayClicked(row,col-1);
      }
      else  $(".cell-row-"+(row)+".cell-column-"+(col-1)+" > p").show();
    }
    if (row !== 6 && col !== 0  && revealedMatrix[row+1][col-1] === false )
    {
      revealedMatrix[row+1][col-1] = true;

      if (boardMatrix[row+1][col-1] === 0) {
        $(".cell-row-"+(row+1)+".cell-column-"+(col-1)+"").addClass("noBomb");
        displayClicked(row+1,col-1);
      }
      else $(".cell-row-"+(row+1)+".cell-column-"+(col-1)+" > p").show();
    }

    if (row !== 0 && col !== 4 && revealedMatrix[row-1][col+1] === false)
    {
      revealedMatrix[row-1][col+1] = true;

      if (boardMatrix[row-1][col+1] === 0) {
        $(".cell-row-"+(row-1)+".cell-column-"+(col+1)+"").addClass("noBomb");
        displayClicked(row-1,col+1);
      }
      else $(".cell-row-"+(row-1)+".cell-column-"+(col+1)+" > p").show();
    }

    if (row !== 6 && col !== 4 && revealedMatrix[row+1][col+1] === false)
    {
      revealedMatrix[row+1][col+1] = true;

      if (boardMatrix[row+1][col+1] === 0) {
        $(".cell-row-"+(row+1)+".cell-column-"+(col+1)+"").addClass("noBomb");
        displayClicked(row+1,col+1);
      }
      else $(".cell-row-"+(row+1)+".cell-column-"+(col+1)+" > p").show();
    }
    if (row !== 6  && revealedMatrix[row+1][col] === false)
    {
      revealedMatrix[row+1][col] = true;

      if (boardMatrix[row+1][col] === 0) {
        $(".cell-row-"+(row+1)+".cell-column-"+col+"").addClass("noBomb");
        displayClicked(row+1,col);
      }
      else $(".cell-row-"+(row+1)+".cell-column-"+(col)+" > p").show();
    }
    if (col !== 4 && revealedMatrix[row][col+1] === false)
    {
      revealedMatrix[row][col+1] = true;

      if (boardMatrix[row][col+1] === 0) {
        $(".cell-row-"+row+".cell-column-"+(col+1)+"").addClass("noBomb");
        displayClicked(row,col+1);
    }
      else  $(".cell-row-"+(row)+".cell-column-"+(col+1)+" > p").show();
    }
  }


  }

  $("body").on("click", "td", function() {
    var col = $(this).parent().children().index($(this));
    var row = $(this).parent().parent().children().index($(this).parent());
    displayClicked(row,col);
  });

  $("body").on("click", ".dropdown-content", function() {
    var difficulty = $('.dropdown-content option[value="Hard"]').attr('selected', true);
  });



  drawBoard();
  plantMines();
  calcAdjBombs();
  $("p > label:contains('1')").each(function () {
    $(this).html($(this).html().replace("1", "<span class='red'>*</span>"));
});
});
