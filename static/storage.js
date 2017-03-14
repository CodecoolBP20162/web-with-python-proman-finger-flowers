$(document).ready(function () {
    var boardList = [];
    function Board(title) {
        this.title = title;
    };
    // LIST BOARDS
    var list_all_board = function (list_of_boards) {
        for (var oneBoard in list_of_boards) {
            create_division(list_of_boards[oneBoard].title);
        }
    };

    // ADD NEW BOARD
    $("#add_new_board").click(function () {
        var board_title = prompt("Board Title: ");
        var board = new Board(board_title);
        boardList.push(board);
        alert(boardList);
        localStorage.setItem("list", JSON.stringify(boardList));
        var loadBoard = JSON.parse(localStorage.getItem("list"));
        alert(loadBoard);
        create_division(board.title);
    });

    // FUNC. CREATE DIV
    var create_division = function (item) {
        $(".row").append("<div class='col-sm-3'style='height: 300px; border: solid black;'><h1></h1></div>");
        $("h1:last").html(item);
    }

    // START
    var board1 = new Board("board1");
    var board2 = new Board("board2");
    boardList.push(board1);
    boardList.push(board2);
    var saveBoard = localStorage.setItem("list", JSON.stringify(boardList));
    var loadBoard = JSON.parse(localStorage.getItem("list"));
    alert(loadBoard[0].title)
    list_all_board(loadBoard);

});