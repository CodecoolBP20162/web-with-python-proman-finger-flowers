$(document).ready(function () {
    var boardList = [];
    function Board(title, cardlist = []) {
        this.title = title;
        this.cardlist = cardlist;
    };

    function Card(title) {
        this.title = title;
    }

    // LIST BOARDS /////////////////////////////////////////////////////////////////
    function listBoards(list_of_boards) {
        for (var oneBoard in list_of_boards) {
            createBoard(list_of_boards[oneBoard]);
        }
    };

    // ADD NEW BOARD
    $("#add_new_board").click(function () {
        var board_title = prompt("Board Title: ");
        var board = new Board(board_title);
        boardList.push(board);
        localStorage.setItem("boardList", JSON.stringify(boardList));
        createBoard(board);
    });

    // FUNC. CREATE BOARD DIV
    function createBoard(item) {
        $(".divBoard").append("<div class='col-sm-3'><a href='/cards'><div class='col-sm-12 board'><h1></h1></div></a></div>");
        $(".board h1:last").html(item.title);
    }

    // LIST CARDS ///////////////////////////////////////////////////////////////
    function listCards(list_of_cards) {
        for (var card in list_of_cards) {
            createCard(list_of_cards[card]);
        }
    };

    function getBoardTitle() {
        $("div.board").click(function () {
            var title = $(this).find("h1");
            var innerTitle = title[0].innerHTML;
            localStorage.setItem("boardTitle", innerTitle)
        });
    };

    function detailedBoard() {
        var innerTitle = localStorage.getItem("boardTitle")
        $(".divBoardHeader").append("<h1></h1>")
        $(".divBoardHeader h1:first").html(innerTitle);
        for (board in boardList) {
            if (boardList[board].title === innerTitle) {
                listCards(boardList[board].cardlist)
            };
        };
    };

    // FUNC. CREATE CARD DIV
    function createCard(item) {
        $(".divCard").append("<div class='col-sm-3'><div class='col-sm-12 card'><h1></h1></div></div>");
        $(".card h1:last").html(item.title);
    }


    // ADD NEW CARD
    $("#add_new_card").click(function () {
        var card_title = prompt("Card Title: ");
        var card = new Card(card_title);
        for (board in boardList) {
            if (boardList[board].title === localStorage.getItem("boardTitle")) {
                boardList[board].cardlist.push(card);
            };
        };
        localStorage.setItem("boardList", JSON.stringify(boardList));
        createCard(card);
    });


    // START ///////////////////////////////////////////////////////////////
    var board1 = new Board("board1");
    var board2 = new Board("board2");
    var loadBoard = JSON.parse(localStorage.getItem("boardList"));
    if (loadBoard) {
        boardList = loadBoard;
        listBoards(loadBoard);
    } else {
        boardList.push(board1);
        boardList.push(board2);
        listBoards(boardList);
        localStorage.setItem("boardList", JSON.stringify(boardList))
    };
    getBoardTitle();
    detailedBoard();
});