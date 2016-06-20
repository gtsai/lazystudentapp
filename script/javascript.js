var fullCardContainer;
var cards = [{
    title: 'My new card',
    notes: 'This is my note'
}];

var cardTitle = document.querySelector('#new-card-title');
var cardNotes = document.querySelector('#new-card-notes');


var element = document.getElementsByClassName("content");



function appendPreviewCard(){
    var preview = `<div class="preview_cards">
        <h3 class="card_title">${cardTitle.value}</h3>
        <div class="author">Author</div>
        <ul class="card_tags">
        <li>Science</li>
        <li>Math</li>
        <li>History</li>
        </ul>
        <div class="card_thumbnail">
        <img src="images/150x150.jpg" >
        </div>
        <p class="upload_date">YYYY-MM-DD</p>
    </div>`;
    $(element).append(preview);
};



$(function(){

    fullCardContainer = $('.hide')

    $('#add-card-button').on('click', function(){
        fullCardContainer.css("display", "initial");
    });

    $(".close-action").on('click', function(){
        fullCardContainer.css("display", "none");
    });

    $(".save").on('click', function(){
        cards.push({title: cardTitle.value,
            notes: cardNotes.value});
        appendPreviewCard();
        cardTitle.value = "Enter title here";
        cardNotes.value = "Enter text content here";
        console.log(cards);
        fullCardContainer.css("display", "none");




    });
















});