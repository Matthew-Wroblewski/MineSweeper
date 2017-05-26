
$( document ).ready(function() {
    console.log( "ready!" );

    function drawBoard () {

      var i, j, fieldElement;

         for (i = 0; i < 7; i++)
         {


             for (j = 0; j < 5; j++)
             {
                 $(".container").append("<button type='button'> </button>");


             }
               $(".container").append("<br>");

         }
    }

    drawBoard();
});
