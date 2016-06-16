var fullCardContainer;
var cards = [{
    title: 'My new card',
    notes: 'This is my note'
}];

var cardTitle = document.querySelector('#new-card-title')
var cardNotes = document.querySelector('#new-card-notes')

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
            notes: cardNotes.value})
        cardTitle.value = "Enter title here"
        cardNotes.value = "Enter text content here"
        console.log(cards)
        fullCardContainer.css("display", "none");

    });




















});