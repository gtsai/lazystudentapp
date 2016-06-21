var fullCardContainer;
var cards = [{
    title: '1st card',
    tags: ['hello','goodbye'],
    notes: '1st note'}, {
    title: '2nd card',
    tags: ['yes','no'],
    notes: '2nd note'
}];

var tags = [];
var cardTitle = document.querySelector('#new-card-title');
var cardNotes = document.querySelector('#new-card-notes');
var element = document.getElementsByClassName("content");
var cardTag = document.querySelector('#tags');


function appendPreviewCard(){
    var tag_items = '';
    for (i=0; i < tags.length; i++){
        tag_items += `<li>${tags[i]}</li>`;
    }
    var preview = `<div class="preview_cards" data-index="${cards.length-1}">
        <h3 class="card_title">${cardTitle.value}</h3>
        <div class="author">Author</div>
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

    for (i=0; i < cards.length; i++){
        var tag_items = '';
        for (j=0; j < cards[i].tags.length; j++) {
            tag_items += `<li>${cards[i].tags[j]}</li>`;
        }
        var preview = `<div class="preview_cards" data-index="${i}">
        <h3 class="card_title">${cards[i].title}</h3>
        <div class="author">Author</div>
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
        cards.push({title: cardTitle.value, tags: tags.slice(),
            notes: cardNotes.value});
        appendPreviewCard();
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
        var cards_index = $(this).attr('data-index');
        $('.full-title > h2').text(cards[cards_index].title);
        $('.full-text-content > p').text(cards[cards_index].notes);
        var tag_items = '';
        for (i=0; i < cards[cards_index].tags.length; i++){
            tag_items += `<li>${cards[cards_index].tags[i]}</li>`;
        };
        $('.full-tags').append(tag_items);
        fullCardContainer.css("display", "initial");
    });




});