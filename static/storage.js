$(document).ready(function () {
    // FUNC. CREATE CARD DIV
    function createCard(divId, title, text, boardId) {
        $(divId).after(
            "<div class='card'>" +
            "<div class='cardTitle'>" +
            "<h1 data-boardId=" + "'" + boardId + "'" + " data-position=0>" + title + "</h1></div>" +
            "<div><h2>" + text + "</h2></div>" +
            "</div>");
        $(divId).find(".card h1:last").html(title);
        $(divId).find(".card h2:last").html(text);
    };

    // ADD NEW CARD
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
        createCard("#new a:first-child", card_title, card_text, board_id);
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
    // UPDATE ON DROP
    function updateStatus(statusId) {
        var position = 0
        $(statusId).children(".card").each(function () {
            var board_id = $(this).find("h1").attr('data-boardId');
            //var card_id = $(this).find("h1").attr('id');
            var card_title = $(this).find("h1").html();
            var card_text = $(this).find("h2").html();
            var status = statusId.replace('#', '');
            position++;
            var link = '/' + board_id + '/' + card_title + '/' + card_text + '/' + status + '/' + position;
            alert(link);
            $.ajax({
                url: link,
                error: function () {
                    alert('error')
                },
                success: function (data) {
                    alert('SUCCES UPDATE')
                },
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