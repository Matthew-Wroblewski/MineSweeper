$(document).ready(function () {
    console.log("ready!");
    /// 1/5 mines

    var plantedMines = 0,
        size,
        boardMatrix = [],
        revealedMatrix = [];

    var columns, rows, numMines;

    function init() {
        drawBoard();
        plantMines();
        calcAdjBombs();
    }

    function drawBoard() {
        debugger;
        if (size !== "Large" && size !== "Normal" && size !== "Small") {
            size = "Normal";
        }

        plantedMines = 0;
        if (size === "Normal") {
            columns = 13;
            rows = 13;
            numMines = (rows * columns) * 0.20;
        } else if (size === "Large") {
            columns = 20;
            rows = 20;
            numMines = (rows * columns) * 0.20;
        } else {
            columns = 7;
            rows = 7;
            numMines = (rows * columns) * 0.20;
        }


        var i, j, fieldElement;
        for (i = 0; i < rows; i++) {
            $("table").append("<tr class='board-row-" + i + "'></tr>");
            boardMatrix[i] = [];
            revealedMatrix[i] = [];

            for (j = 0; j < columns; j++) {
                $(".board-row-" + i + "").append("<td class='cell-row-" + i + " cell-column-" + j + "'>  </td>");
                boardMatrix[i][j] = [];
                revealedMatrix[i][j] = [];
                boardMatrix[i][j] = false;
                revealedMatrix[i][j] = false;
            }
            $("tr").append("</tr>");

        }
    }

    function plantMines() {
        var row, col;
        do {
            row = Math.floor(Math.random() * rows);
            col = Math.floor(Math.random() * columns);
            if (boardMatrix[row][col] === true)
                continue;
            boardMatrix[row][col] = true;
            //$(".cell-row-"+row+".cell-column-"+col+"").addClass("bomb");
            //    $(".bomb").css({"background-color": "yellow"});



            plantedMines++;
        }
        while (numMines > plantedMines);

    }

    $('td').click(function () {
        var colIndex = $(this).prevAll().length;
        var rowIndex = $(this).parent('tr').prevAll().length;
    });

    function calcAdjBombs() {
        var numBombs;
        for (i = 0; i < rows; i++) {
            for (j = 0; j < columns; j++) {
                numBombs = 0;

                if (i !== 0 && j !== 0)
                    if (boardMatrix[i - 1][j - 1] === true) {
                        numBombs++;
                    }

                if (i !== 0)
                    if (boardMatrix[i - 1][j] === true) {
                        numBombs++;
                    }
                if (j !== 0)
                    if (boardMatrix[i][j - 1] === true) {
                        numBombs++;
                    }
                if (j !== 0 && i !== (rows - 1))
                    if (boardMatrix[i + 1][j - 1] === true) {
                        numBombs++;
                    }

                if (i !== 0 && j !== (columns - 1))
                    if (boardMatrix[i - 1][j + 1] === true) {
                        numBombs++;
                    }

                if (i !== (rows - 1) && j !== (columns - 1))
                    if (boardMatrix[i + 1][j + 1] === true) {
                        numBombs++;
                    }
                if (i !== (rows - 1))
                    if (boardMatrix[i + 1][j] === true) {
                        numBombs++;
                    }
                if (j !== (columns - 1))
                    if (boardMatrix[i][j + 1] === true) {
                        numBombs++;
                    }

                /////// Append to TD

                if (boardMatrix[i][j] !== true) {
                    $(".cell-row-" + i + ".cell-column-" + j + "").append("<p>" + numBombs + "</p>");
                    boardMatrix[i][j] = numBombs;
                }
                $("p").hide();
                if (boardMatrix[i][j] === 1)
                    $(".cell-row-" + (i) + ".cell-column-" + (j) + " > p").css({
                        "color": "blue"
                    });
                else if (boardMatrix[i][j] === 2)
                    $(".cell-row-" + (i) + ".cell-column-" + (j) + " > p").css({
                        "color": "green"
                    });
                else if (boardMatrix[i][j] === 3)
                    $(".cell-row-" + (i) + ".cell-column-" + (j) + " > p").css({
                        "color": "red"
                    });
                else if (boardMatrix[i][j] === 4)
                    $(".cell-row-" + (i) + ".cell-column-" + (j) + " > p").css({
                        "color": "purple"
                    });
                else if (boardMatrix[i][j] === 5)
                    $(".cell-row-" + (i) + ".cell-column-" + (j) + " > p").css({
                        "color": "maroon"
                    });
                else if (boardMatrix[i][j] === 6)
                    $(".cell-row-" + (i) + ".cell-column-" + (j) + " > p").css({
                        "color": "#13a798"
                    });
                else if (boardMatrix[i][j] === 7)
                    $(".cell-row-" + (i) + ".cell-column-" + (j) + " > p").css({
                        "color": "black"
                    });
                else if (boardMatrix[i][j] === 8)
                    $(".cell-row-" + (i) + ".cell-column-" + (j) + " > p").css({
                        "color": "brown"
                    });


            }

        }


    }

    function displayClicked(row, col) {


        if (boardMatrix[row][col] === true) {
            $(".cell-row-" + row + ".cell-column-" + col + "").addClass("bomb");
            debugger;
            for (i = 0; i < rows; i++) {
                for (j = 0; j < columns; j++) {
                    $(".cell-row-" + i + ".cell-column-" + j + " > p").show();
                    if (boardMatrix[i][j] === true)
                        $(".cell-row-" + (i) + ".cell-column-" + (j) + "").addClass("bomb");
                }
            }
            alert("You've clicked on a bomb.  GAME OVER.");
        } else if (boardMatrix[row][col] > 0) {
            console.log("hi");
            revealedMatrix[row][col] = true;
            $(".cell-row-" + row + ".cell-column-" + col + " > p").show();
        } else {
            if (revealedMatrix[row][col] === false) {
                revealedMatrix[row][col] = true;
                if (boardMatrix[row][col] === 0) {
                    $(".cell-row-" + (row) + ".cell-column-" + (col) + "").addClass("noBomb");
                    displayClicked(row, col);
                }
            }


            if (row !== 0 && col !== 0 && revealedMatrix[row - 1][col - 1] === false) {
                revealedMatrix[row - 1][col - 1] = true;
                if (boardMatrix[row - 1][col - 1] === 0) {
                    $(".cell-row-" + (row - 1) + ".cell-column-" + (col - 1) + "").addClass("noBomb");
                    displayClicked(row - 1, col - 1);
                } else $(".cell-row-" + (row - 1) + ".cell-column-" + (col - 1) + " > p").show();
            }

            if (row !== 0 && revealedMatrix[row - 1][col] === false) {
                revealedMatrix[row - 1][col] = true;

                if (boardMatrix[row - 1][col] === 0) {
                    $(".cell-row-" + (row - 1) + ".cell-column-" + col + "").addClass("noBomb");
                    displayClicked(row - 1, col);
                } else $(".cell-row-" + (row - 1) + ".cell-column-" + col + " > p").show();
            }
            if (col !== 0 && revealedMatrix[row][col - 1] === false) {
                revealedMatrix[row][col - 1] = true;

                if (boardMatrix[row][col - 1] === 0) {
                    $(".cell-row-" + row + ".cell-column-" + (col - 1) + "").addClass("noBomb");
                    displayClicked(row, col - 1);
                } else $(".cell-row-" + (row) + ".cell-column-" + (col - 1) + " > p").show();
            }
            if (row !== (rows - 1) && col !== 0 && revealedMatrix[row + 1][col - 1] === false) {
                revealedMatrix[row + 1][col - 1] = true;

                if (boardMatrix[row + 1][col - 1] === 0) {
                    $(".cell-row-" + (row + 1) + ".cell-column-" + (col - 1) + "").addClass("noBomb");
                    displayClicked(row + 1, col - 1);
                } else $(".cell-row-" + (row + 1) + ".cell-column-" + (col - 1) + " > p").show();
            }

            if (row !== 0 && col !== (columns - 1) && revealedMatrix[row - 1][col + 1] === false) {
                revealedMatrix[row - 1][col + 1] = true;

                if (boardMatrix[row - 1][col + 1] === 0) {
                    $(".cell-row-" + (row - 1) + ".cell-column-" + (col + 1) + "").addClass("noBomb");
                    displayClicked(row - 1, col + 1);
                } else $(".cell-row-" + (row - 1) + ".cell-column-" + (col + 1) + " > p").show();
            }

            if (row !== (rows - 1) && col !== (columns - 1) && revealedMatrix[row + 1][col + 1] === false) {
                revealedMatrix[row + 1][col + 1] = true;

                if (boardMatrix[row + 1][col + 1] === 0) {
                    $(".cell-row-" + (row + 1) + ".cell-column-" + (col + 1) + "").addClass("noBomb");
                    displayClicked(row + 1, col + 1);
                } else $(".cell-row-" + (row + 1) + ".cell-column-" + (col + 1) + " > p").show();
            }
            if (row !== (rows - 1) && revealedMatrix[row + 1][col] === false) {
                revealedMatrix[row + 1][col] = true;

                if (boardMatrix[row + 1][col] === 0) {
                    $(".cell-row-" + (row + 1) + ".cell-column-" + col + "").addClass("noBomb");
                    displayClicked(row + 1, col);
                } else $(".cell-row-" + (row + 1) + ".cell-column-" + (col) + " > p").show();
            }
            if (col !== (columns - 1) && revealedMatrix[row][col + 1] === false) {
                revealedMatrix[row][col + 1] = true;

                if (boardMatrix[row][col + 1] === 0) {
                    $(".cell-row-" + row + ".cell-column-" + (col + 1) + "").addClass("noBomb");
                    displayClicked(row, col + 1);
                } else $(".cell-row-" + (row) + ".cell-column-" + (col + 1) + " > p").show();
            }
        }


    }

    $("body").on("click", "td", function () {
        var col = $(this).parent().children().index($(this));
        var row = $(this).parent().parent().children().index($(this).parent());
        displayClicked(row, col);
    });

    /* $("body").on("click", ".dropdown-content", function() {
      debugger;
        var difficulty = $('dropdown-content').find(":selected").text();
    }); */

    $("a").click(function (event) {

        size = $(this).text();
        alert("Press Reset to start the next game with a " + size + " sized board.")
        event.preventDefault();
    });


    $("p > label:contains('1')").each(function () {
        $(this).html($(this).html().replace("1", "<span class='red'>*</span>"));
    });

    $(function () {
        $('.reset').click(function () {
            $("table").empty();
            init();


        });
    });


    init();
});
