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
        alert(boardList.length);
        localStorage.setItem("list", JSON.stringify(boardList));
        create_division(board.title);
    });

    // FUNC. CREATE DIV
    var create_division = function (item) {
        $(".row").append("<div class='col-sm-3'><div class='col-sm-12'style='height: 300px; border-radius: 10px; background: #FFE345'><h1></h1></div></div>");
        $("h1:last").html(item);
    }

    // START
    var board1 = new Board("board1");
    var board2 = new Board("board2");
    var loadBoard = JSON.parse(localStorage.getItem("list"));
    boardList = loadBoard;
    if (loadBoard.length < 1) {
        boardList.push(board1);
        boardList.push(board2);
        localStorage.setItem("list", JSON.stringify(boardList))
    };
    list_all_board(loadBoard);

});