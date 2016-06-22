var fullCardContainer;
var cards = {};
var tags = [];
var cardTitle = document.querySelector('#new-card-title');
var cardNotes = document.querySelector('#new-card-notes');
var element = document.getElementsByClassName("content");
var cardTag = document.querySelector('#tags');
var chatMessage = document.querySelector('#chat-input');

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
        $(cardTitle).value = null;
        $(cardNotes).value = null;

    });

    $(".full-close-action").on('click', function(){
        fullCardContainer.css("display", "none");
    });

    $(".save").on('click', function(){
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
                console.log("Data was posted");
            }
        });
        $(cardTitle).value = null;
        $(cardNotes).value = null;
        $(cardTag).empty();
        tags = [];
        editCardContainer.css("display", "none");
    });
    
    $('#new-card-tags').on('keydown',function(e){
        if (e.keyCode === 13) {
            var tag = $('<div/>').addClass('tag').html(this.value);
            tags.push(this.value);
            $(cardTag).append(tag);
            console.log(this)
            this.value = null;
        }
    });

    $('#tags').on('click','.tag', function(e){
        $(e.target).remove();
        var a = tags.indexOf(e.target.textContent);
        tags.splice(a,1);
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
        $('#chat-input').value = null;
        console.log($('#chat-input'));
    });





});