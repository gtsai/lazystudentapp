var fullCardContainer;
var cards = {};
var tags = [];
var cardTitle = document.querySelector('#new-card-title');
var cardNotes = document.querySelector('#new-card-notes');
var element = document.getElementsByClassName("content");
var cardTag = document.querySelector('#tags');
var chatMessage = document.querySelector('#chat-input');
var reset_title = document.getElementById('new-card-title');
var reset_body = document.getElementById('new-card-notes');
var reset_message = document.getElementById('chat-input');

function appendPreviewCard(response){
    var tag_items = '';
    for (j = 0; j < response.data.tags.length; j++) {
            tag_items += `<li>${response.data.tags[j]}</li>`;
    }
    var preview = `<div class="preview_cards" data-index="${response.data.length - 1}" id="${response.data._id}">
        <h3 class="card_title">${response.data.title}</h3>
        <div class="author">${response.data.author}</div>
        <ul class="preview_card_tags">
        ${tag_items}
        </ul>
        <div class="card_thumbnail">
        <img src="images/150x150.jpg" >
        </div>
        <p class="upload_date">YYYY-MM-DD</p>
        </div>`;
    $(element).append(preview);
    };

$(function(){

    $.ajax({
        url: "http://thiman.me:1337/grace",
        type: "GET",
        success: function(response){
            console.log(response.data);
            for (var k=0; k < response.data.length; k++){
                var object_id = response.data[k]._id;
                cards[object_id]= response.data[k]
            }
            console.log(cards);
            for (var i=0; i < response.data.length; i++){
                var tag_items = '';
                for (j=0; j < response.data[i].tags.length; j++) {
                    tag_items += `<li>${response.data[i].tags[j]}</li>`;
                }
                var preview = `<div class="preview_cards" id="${response.data[i]._id}" data-index="${i}">
            <h3 class="card_title">${response.data[i].title}</h3>
            <div class="author">${response.data[i].author}</div>
            <ul class="preview_card_tags">
            ${tag_items}
            </ul>
            <div class="card_thumbnail">
            <img src="images/150x150.jpg" >
            </div>
            <p class="upload_date">YYYY-MM-DD</p>
            </div>`;
                $(element).append(preview);
            }
        }
    });


    $('.delete-button > button').on('click', function(){
        $.ajax({
            url: `http://thiman.me:1337/grace/${clicked_id}`,
            type: "DELETE",
            success: function(response){
                fullCardContainer.css("display", "none");
                delete cards[clicked_id];
                $(`#${clicked_id}`).remove();
                console.log(cards);
                clicked_id = null;
            }
        });
    });

    editCardContainer = $('.hide');
    fullCardContainer = $('.hidden');

    $('#add-card-button').on('click', function(){
        editCardContainer.css("display", "initial");
    });

    $(".close-action").on('click', function(){
        editCardContainer.css("display", "none");
        reset_title.value = null;
        reset_body.value = null;
        $(cardTag).empty();
        clicked_id = null;
        tags = [];
    });

    $(".full-close-action").on('click', function(){
        fullCardContainer.css("display", "none");
        clicked_id = null;
        tags = [];
    });

    $('#edit-existing').on('click', function(){
        fullCardContainer.css("display", "none");
        editCardContainer.css("display", "initial");
        cardTitle.value = cards[clicked_id].title;
        cardNotes.value = cards[clicked_id].body;
        for (var t=0; t < cards[clicked_id].tags.length; t++) {
            var tag = $('<div/>').addClass('tag').html(cards[clicked_id].tags[t]);
            $(cardTag).append(tag);
        }
    });

    $(".save").on('click', function(){
        if (typeof clicked_id !== "undefined" && cards[clicked_id]){
            var taglist = cards[clicked_id].tags;
            if (tags.length != 0){
                for (var item=0; item < tags.length; item++){
                    taglist.push(tags[item])
                }}
            tags = taglist;
            console.log(tags);
            $.ajax({
                url: `http://thiman.me:1337/grace/${clicked_id}`,
                type: "PATCH",
                data: {
                    title: cardTitle.value,
                    tags: tags,
                    body: cardNotes.value,
                    author: 'Author'
                },
                success: function(response){
                    console.log(response);
                    var object_id = response.data._id;
                    cards[object_id] = response.data;
                    $(`#${object_id} > h3`).text(response.data.title);
                    console.log(cards)
                }
            });
        } else {
        $.ajax({
            url: "http://thiman.me:1337/grace",
            type: "POST",
            data: {
                title: cardTitle.value,
                tags: tags.slice(),
                body: cardNotes.value,
                author: 'Author'
            },
            traditional: true,
            success: function(response){
                appendPreviewCard(response);
                var object_id = response.data._id
                cards[object_id]= response.data
                console.log(cards)
            }
        });}
        reset_title.value = null;
        reset_body.value = null;
        $(cardTag).empty();
        tags = [];
        editCardContainer.css("display", "none");
        clicked_id = null;
    });
    
    $('#new-card-tags').on('keydown',function(e){
        if (e.keyCode === 13) {
            var tag = $('<div/>').addClass('tag').html(this.value);
            tags.push(this.value);
            $(cardTag).append(tag);
            this.value = null;
        }
    });

    $('#tags').on('click','.tag', function(e){
        if (typeof clicked_id !== "undefined" && cards[clicked_id]) {
            var a = cards[clicked_id].tags.indexOf(e.target.textContent);
            cards[clicked_id].tags.splice(a, 1);
            $(e.target).remove();
            console.log(cards[clicked_id])
        } else {
            $(e.target).remove();
            var b = tags.indexOf(e.target.textContent);
            console.log(b);
            tags.splice(b, 1);
        }
   });
    
    $('.content').on('click','.preview_cards', function(){
        $('.full-tags').empty();
        clicked_id = $(this).attr('id');
        console.log(clicked_id);
        $('.full-title > h2').text(cards[clicked_id].title);
        $('.full-text-content > p').text(cards[clicked_id].body);
        $('.author-date').text(`${cards[clicked_id].author} on YYYY-MM-DD`);
        var tag_items = '';
        for (var i=0; i < cards[clicked_id].tags.length; i++){
            tag_items += `<li>${cards[clicked_id].tags[i]}</li>`;
        };
        $('.full-tags').append(tag_items);
        fullCardContainer.css("display", "initial");
    });

    $('#chat-send-button').on('click',function(){
        var a = `<div>Author - Date:</div>
        <div>${chatMessage.value}</div>
        <hr>`;
        $('#chat-messages').append(a);
        reset_message.value = null;
    });





});