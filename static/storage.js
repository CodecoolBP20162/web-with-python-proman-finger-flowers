$(document).ready(function () {
    var boardList = [];
    function Board(title, cardlist = []) {
        this.title = title;
        this.cardlist = cardlist;
    };

    function Card(title, cardtext) {
        this.title = title;
        this.cardtext = cardtext;
    }

    // LIST BOARDS /////////////////////////////////////////////////////////////////
    function listBoards(list_of_boards) {
        for (var oneBoard in list_of_boards) {
            createBoard(list_of_boards[oneBoard]);
        }
    };

    // ADD NEW BOARD
    $("#add_new_board").click(function () {
        var board_title = $("#boardTitle").val();
        var board = new Board(board_title);
        localStorage.setItem("boardTitle", board_title)
        boardList.push(board);
        localStorage.setItem("boardList", JSON.stringify(boardList));
        createBoard(board);
        board_title = $("#boardTitle").val("");
    });

    // FUNC. CREATE BOARD DIV
    function createBoard(item) {
        $(".divBoard").append(
            "<div class='col-sm-3'>" +
            "<a href='/cards' style='color:white'><div class='col-sm-12 board'>" +
            "<div class='boardTitle'><h1></h1></div>" +
            "<h2></h2>" +
            "</div></a></div>");
        $(".board h1:last").html(item.title);
        $(".board h2:last").html("cards <span class='label label-success'></span> ");
        $(".label:last").html(item.cardlist.length);
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
        $(".divCard").append(
            "<div class='col-sm-3'>" +
            "<div class='col-sm-12 card'>" +
            "<div class='cardTitle'><h1></h1></div>" +
            "<div><h2></h2></div>" +
            "</div></div>");
        $(".card h1:last").html(item.title);
        $(".card h2:last").html(item.cardtext);

    }


    // ADD NEW CARD
    $("#add_new_card").click(function () {
        var card_title = $("#cardTitle").val();
        var card_text = $("#cardText").val();
        var card = new Card(card_title, card_text);
        for (board in boardList) {
            if (boardList[board].title === localStorage.getItem("boardTitle")) {
                boardList[board].cardlist.push(card);
            };
        };
        localStorage.setItem("boardList", JSON.stringify(boardList));
        createCard(card);
        card_title = $("#cardTitle").val("");
        card_text= $("#cardText").val("");

    });

    // START ///////////////////////////////////////////////////////////////
    var board1 = new Board("I'm a board");
    var board2 = new Board("Me too ^-^");
    var board3 = new Board("I'm bored :(")
    var board4 = new Board("I'm James Board")
    var loadBoard = JSON.parse(localStorage.getItem("boardList"));
    if (loadBoard) {
        boardList = loadBoard;
        listBoards(loadBoard);
    } else {
        boardList.push(board1);
        boardList.push(board2);
        boardList.push(board3);
        boardList.push(board4);
        listBoards(boardList);
        localStorage.setItem("boardList", JSON.stringify(boardList))
    };
    getBoardTitle();
    detailedBoard();
    $('.divCard').sortable({
        update: function (even, ui) {
            for (board in boardList) {
                if (boardList[board].title === localStorage.getItem("boardTitle")) {
                    boardList[board].cardlist = [];
                };
            };
            $('.card').each(function () {
                var card_title = $(this).find("h1").html();
                var card_text = $(this).find("h2").html();
                var card = new Card(card_title, card_text);
                for (board in boardList) {
                    if (boardList[board].title === localStorage.getItem("boardTitle")) {
                        boardList[board].cardlist.push(card);
                    };
                };
            });
            localStorage.setItem("boardList", JSON.stringify(boardList));
        }
    });
});