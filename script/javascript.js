var fullCardContainer;
var cards = {};
var tags = [];
var cardTitle = document.querySelector('#new-card-title');
var cardNotes = document.querySelector('#new-card-notes');
var element = document.getElementsByClassName("content");
var cardTag = document.querySelector('#tags');
var messages = document.querySelector('#chat-input');
var idToDelete

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
            for (var k=0; k < response.data.length; k++){
                cards.
            }
            cards = response.data;
            console.log(response.data);
            for (var i=0; i < response.data.length; i++){
                var tag_items = '';
                for (j=0; j < response.data[i].tags.length; j++) {
                    tag_items += `<li>${response.data[i].tags[j]}</li>`;
                }
                var preview = `<div class="preview_cards" id="${response.data[i]._id}" data-index="${i}">
            <h3 class="card_title">${response.data[i].title}</h3>
            <div class="author">${cards[i].author}</div>
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
            url: `http://thiman.me:1337/grace/${idToDelete}`,
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
    });

    $(".full-close-action").on('click', function(){
        fullCardContainer.css("display", "none");
    });

    $(".save").on('click', function(){
        //cards.push({title: cardTitle.value, tags: tags.slice(),
            //notes: cardNotes.value});
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

        cardTitle.value = "Enter title";
        cardNotes.value = "Enter text content";
        cardTag.value = "Enter tag";
        $(cardTag).empty();
        tags = [];
        editCardContainer.css("display", "none");
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
        $(e.target).remove();
        var a = tags.indexOf(e.target.textContent);
        tags.splice(a,1);
   });
    
    $('.content').on('click','.preview_cards', function(){
        $('.full-tags').empty();
        idToDelete = $(this).attr('id');
        console.log(idToDelete);
        var cards_index = $(this).attr('data-index');
        $('.full-title > h2').text(cards[cards_index].title);
        $('.full-text-content > p').text(cards[cards_index].notes);
        var tag_items = '';
        for (var i=0; i < cards[cards_index].tags.length; i++){
            tag_items += `<li>${cards[cards_index].tags[i]}</li>`;
        };
        $('.full-tags').append(tag_items);
        fullCardContainer.css("display", "initial");
    });

    $('#chat-send-button').on('click',function(){

        var a = `<div>Author - Date:</div>
        <div>${messages.value}</div>
        <hr>`;

        $('#chat-messages').append(a);


    });





});