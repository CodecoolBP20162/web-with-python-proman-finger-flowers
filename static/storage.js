/**
 * Created by arinyu on 2017.03.13..
 */
$(document).ready(function () {
    var boardList = [];
    function Board(title) {
        this.title = title;
        //this.boardCardList = []
};

$("#add_new_board").click(function () {
    var board_title = prompt("Board Title: ");
    var board = new Board(board_title);
    boardList.push(board);
    create_division(board.title);
});

var list_all_board = function (list_of_boards) {
    for ( var oneBoard in list_of_boards) {
        create_division(list_of_boards[oneBoard].title);
        }
    };

var create_division = function (item) {
    $(".row").append("<div class='col-sm-3'style='height: 300px; border: solid black;'><h1></h1></div>");
        $("h1:last").html(item);
}
var board1 = new Board("board1");
var board2 = new Board("board2");
boardList.push(board1);
boardList.push(board2);
saveList(boardList);
var saveList = function (List) {
    localStorage.setItem("boardList", JSON.stringify(List))};

var getList = function (List) {
    JSON.parse(localStorage.getItem("List"));
};
var my_list = getList(boardList);
alert(my_list);





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