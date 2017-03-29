$(document).ready(function () {
    // CREATE CARD DIV
    function createCard(divId, title, text) {
        $(divId).append(
            "<div class='card'>" +
            "<div class='cardTitle'><h1></h1></div>" +
            "<div><h2></h2></div>" +
            "</div>");
        $(divId).find(".card h1:last").html(title);
        $(divId).find(".card h2:last").html(text);
    };

    // ADD NEW CARD AJAX
    $("#add_new_card").click(function () {
        var card_title = $("#cardTitle").val();
        var card_text = $("#cardText").val();
        if (card_title === "") {
            card_title = "-"
        };
        if (card_text === "") {
            card_text = "-"
        };
        var board_id = $(this).attr("data-boardId")
        createCard("#new", card_title, card_text);
        $.ajax({
            url: '/' + board_id + '/' + card_title + '/' + card_text,
            error: function () {
                alert('ERROR')
            },
            success: function (data) {
                data = JSON.parse(data)
                alert('SUCCESS! ' + data['success'])
            },
            type: 'GET'
        })
        card_title = $("#cardTitle").val("");
        card_text = $("#cardText").val("");

    });
    // UPDATE STATUS
    function updateStatus(statusId) {
        $(statusId).children(".card").each(function () {
            var board_id = $(this).find("h1").attr('data-boardId');
            var card_id = $(this).find("h1").attr('id');
            var card_title = $(this).find("h1").html();
            var card_text = $(this).find("h2").html();
            var status = statusId.replace('#', '');
            var link = '/' + board_id + '/' + card_id + '/' + card_title + '/' + card_text + '/' + status;
            $.ajax({
                url: link,
                type: 'GET'
            })
        });
    };
    // SORTABLE function
    function sortableDiv() {
        $('.column').sortable({
            update: function (even, ui) {
                updateStatus('#new');
                updateStatus('#in_progress');
                updateStatus('#review');
                updateStatus('#done');
            },
            connectWith: ".column",
            dropOnEmpty: true
        });
    };

    // START ///////////////////////////////////////////////////////////////
    sortableDiv();
});