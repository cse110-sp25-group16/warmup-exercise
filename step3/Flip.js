/**
 * Selects all elements with the class `.flipCardInner` and 
 * attaches a click listener to each that toggles the 
 * `is-flipped` class and logs "Card flipped" to the console.
 */
var cards = document.querySelectorAll('.flipCardInner');

[...cards].forEach((flipCardInner)=>{
  flipCardInner.addEventListener( 'click', function() {
    console.log("Card flipped")
    flipCardInner.classList.toggle('is-flipped');
  });
});