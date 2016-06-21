var fullCardContainer;
var cards = [{
    title: '1st card',
    tags: ['hello','goodbye'],
    notes: 'This is my note'}, {
    title: '2nd card',
    tags: ['yes','no'],
    notes: 'This is my note'
}];

var tags = [];
var cardTitle = document.querySelector('#new-card-title');
var cardNotes = document.querySelector('#new-card-notes');
var element = document.getElementsByClassName("content");
var cardTag = document.querySelector('#tags');


function appendPreviewCard(){
    var tag_items = ''
    for (i=0; i < tags.length; i++){
        tag_items += `<li>${tags[i]}</li>`;
    }
    var preview = `<div class="preview_cards">
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

    editCardContainer = $('.hide')
    fullCardContainer = $('.hidden')

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
        console.log(cards);
        editCardContainer.css("display", "none");

    });
    
    $('#new-card-tags').on('keydown',function(e){
        if (e.keyCode === 13) {
            var tag = $('<div/>').addClass('tag').html(this.value);
            tags.push(this.value);
            console.log(tags);
            $(cardTag).append(tag);
            this.value = null;
        }
    });

    $('#tags').on('click','.tag', function(e){
        $(e.target).remove();
        var a = tags.indexOf(e.target.textContent);
        tags.splice(a,1);
        console.log(tags);
   });
    
    $('.content').on('click','.preview_cards', function(card){
        fullCardContainer.css("display", "initial");
        console.log(card.target)
    });












});