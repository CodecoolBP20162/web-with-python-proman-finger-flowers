$(document).ready(function () {
    var boardList = [];
    function Board(title, newCards = [], inProgress = [], review = [], done = []) {
        this.title = title;
        this.newCards = newCards;
        this.inProgress = inProgress;
        this.review = review;
        this.done = done;
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
        $(".label:last").html(item.newCards.length);
    }

    // LIST CARDS ///////////////////////////////////////////////////////////////
    function listCardsNew(list_of_cards) {
        for (var card in list_of_cards) {
            createCard("#new", list_of_cards[card]);
        }
    };

    function listCardsInP(list_of_cards) {
        for (var card in list_of_cards) {
            createCard("#in-progress", list_of_cards[card]);
        }
    };

    function listCardsReview(list_of_cards) {
        for (var card in list_of_cards) {
            createCard("#review", list_of_cards[card]);
        }
    };

    function listCardsDone(list_of_cards) {
        for (var card in list_of_cards) {
            createCard("#done", list_of_cards[card]);
        }
    };
    // END LIST CARDS
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
                listCardsNew(boardList[board].newCards);
                listCardsInP(boardList[board].inProgress);
                listCardsReview(boardList[board].review);
                listCardsDone(boardList[board].done);
            };
        };
    };

    // FUNC. CREATE CARD DIV
    function createCard(divId, item) {
        $(divId).append(
            "<div class='card'>" +
            "<div class='cardTitle'><h1></h1></div>" +
            "<div><h2></h2></div>" +
            "</div>");
        $(divId).find(".card h1:last").html(item.title);
        $(divId).find(".card h2:last").html(item.cardtext);

    }


    // ADD NEW CARD
    $("#add_new_card").click(function () {
        var card_title = $("#cardTitle").val();
        var card_text = $("#cardText").val();
        var card = new Card(card_title, card_text);
        for (board in boardList) {
            if (boardList[board].title === localStorage.getItem("boardTitle")) {
                boardList[board].newCards.push(card);
            };
        };
        localStorage.setItem("boardList", JSON.stringify(boardList));
        createCard("#new", card);
        card_title = $("#cardTitle").val("");
        card_text = $("#cardText").val("");

    });
    // UPDATE
    function updateStatus(statusId) {
        $(statusId).children(".card").each(function () {
            var card_title = $(this).find("h1").html();
            var card_text = $(this).find("h2").html();
            var card = new Card(card_title, card_text);
            for (board in boardList) {
                if (boardList[board].title === localStorage.getItem("boardTitle")) {
                    if (statusId === "#new") {
                        boardList[board].newCards.push(card);
                    } else if (statusId === "#in-progress") {
                        boardList[board].inProgress.push(card);
                    } else if (statusId === "#review") {
                        boardList[board].review.push(card);
                    } else {
                        boardList[board].done.push(card);
                    };
                };
            };
        });
    };


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
    $('.column').sortable({
        update: function (even, ui) {
            for (board in boardList) {
                if (boardList[board].title === localStorage.getItem("boardTitle")) {
                    boardList[board].newCards = [];
                    boardList[board].inProgress = [];
                    boardList[board].review = [];
                    boardList[board].done = [];
                };
            };
            // ITERATE THROUGH 4 STATUS
            updateStatus("#new");
            updateStatus("#in-progress");
            updateStatus("#review");
            updateStatus("#done");
            // SAVE
            localStorage.setItem("boardList", JSON.stringify(boardList));
        },
        connectWith: ".column",
        dropOnEmpty: true
    });
});