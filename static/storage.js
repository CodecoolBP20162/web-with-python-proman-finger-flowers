$(document).ready(function () {
    var boardList = [];
    function Board(title) {
        this.title = title;
        this.cardlist = [];
    };

    // LIST BOARDS
    var list_all_board = function (list_of_boards) {
        for (var oneBoard in list_of_boards) {
            create_division(list_of_boards[oneBoard]);
        }
    };

    // ADD NEW BOARD
    $("#add_new_board").click(function () {
        var board_title = prompt("Board Title: ");
        var board = new Board(board_title);
        boardList.push(board);
        alert(boardList.length);
        localStorage.setItem("list", JSON.stringify(boardList));
        create_division(board);
    });

    // FUNC. CREATE DIV
    var create_division = function (item) {
        $(".divBoard").append("<div class='col-sm-3'><a href='/cards'><div class='col-sm-12 board'><h1></h1><h2></h2></div></a></div>");
        $("h1:last").html(item.title);
    }

    // DETAILED PAGE
    function getBoardTitle() {
        $("div.board").click(function () {
            var title = $(this).find("h1");
            var innerTitle = title[0].innerHTML;
            localStorage.setItem("boardTitle", innerTitle)
        });
    };
    function setDetailedTitle() {
        var innerTitle = localStorage.getItem("boardTitle")
        $(".divBoardHeader").append("<h1></h1>")
        $(".divBoardHeader h1:first").html(innerTitle);
    };
    // START
    var board1 = new Board("board1");
    var board2 = new Board("board2");
    var loadBoard = JSON.parse(localStorage.getItem("list"));
    if (loadBoard) {
        boardList = loadBoard;
        list_all_board(loadBoard);
    } else {
        boardList.push(board1);
        boardList.push(board2);
        list_all_board(boardList);
        localStorage.setItem("list", JSON.stringify(boardList))
    };
    getBoardTitle();
    setDetailedTitle();
});