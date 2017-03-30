$(document).ready(function () {
    // CREATE CARD DIV
    function createCard(divId, title, text, boardId) {
        $(divId).after(
            "<div class='card'>" +
            "<div class='cardTitle'>" +
            "<h1 data-boardId=" + "'" + boardId + "'" + " data-position=0>" + title + "</h1></div>" +
            "<div><h2>" + text + "</h2></div>" +
            "</div>");
    };

    // ADD NEW CARD TO TABLE
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
            type: 'GET'
        })
        location.reload();
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
            $.ajax({
                url: link,
                error: function () {
                    alert('error')
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

    //COUNT CARDS
    $(".board").each(function () {
        var boardId = $(this).prop('id');
        var link = '/' + boardId + '/counter'
        $.ajax({
            url: link,
            success: function (data) {
                var count = JSON.parse(data);
                $('#' + boardId).find('span').text(count['cards']);
            },
            type: 'GET'
        })
    })
    // EDIT MODAL CONTENT
    $('button.edit').click(function (event) {
        var button = $(event.currentTarget);
        var card_id = button.attr('data-cardId')
        $.ajax({
            url: '/edit/' + card_id,
            error: function () {
                alert('error')
            },
            success: function (data) {
                cardInfo = JSON.parse(data);
                var title = cardInfo['card_title'];
                var text = cardInfo['card_text'];
                $('#editCardTitle').val(title);
                $('#editCardText').val(text);
                $('#cardIdModal').val(card_id)
            }
        })
    })

    // UPDATE CARD
    $('#edit_card').click(function (event) {
        var card_id = $('form').find('#cardIdModal').val();
        var card_title = $('form').find('#editCardTitle').val();
        var card_text = $('form').find('#editCardText').val();
        var board_id = $(this).attr('data-boardId')
        $.ajax({
            url: '/update/' + board_id + '/' + card_id + '/' + card_title + '/' + card_text,
            error: function () {
                alert('ERROR')
            },
            success: function () {
                alert('vuhuuu');
                location.reload()
            }
        })
    })
    // START ///////////////////////////////////////////////////////////////
    sortableDiv();
});