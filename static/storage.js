/**
 * Created by arinyu on 2017.03.13..
 */
$(document).ready(function () {
    var boardList = [];
    function Board(title) {
        this.title = title;
        this.boardCardList = []
};

$("#add_new_board").click(function () {
    var board_title = prompt("Board Title: ")
    $(".row").append("<div class='col-sm-3'style='height: 300px; border: solid black;'><h1></h1></div>");
    var board = new Board(board_title);
    boardList.push(board)
    localStorage.setItem("boardList", JSON.stringify(boardList));
    $("h1:last").html(board_title);
})

var list_all_board = function (list_of_boards) {
    for ( var oneBoard in list_of_boards) {
        $(".row").append("<div class='col-sm-3'style='height: 300px; border: solid black;'><h1></h1></div>");
        var board_title = function(){
            for (key in oneBoard) {
                alert("salala")
                }
            };
        };
        $("h1:last").html(board_title);
    };

var board1 = new Board("board1");
var board2 = new Board("board2");
alert(board1.title);
boardList.push(board1);
boardList.push(board2);
//localStorage.setItem("boardList", JSON.stringify(boardList));
//var board_list = JSON.parse(localStorage.getItem("boardList"));
list_all_board(boardList);





    //localStorage.setItem("key", board_example);

var MakeCardList = function (Card) {

    cardList.push(Card);
    return cardList
};

var SaveCard = function (Card) {
    localStorage.setItem(Card)
};

var SaveCardList = function (cardList) {
    localStorage.setItem(cardList)

};


})