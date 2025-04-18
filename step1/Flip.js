var cards = document.querySelectorAll('.flipCardInner');

[...cards].forEach((flipCardInner)=>{
  flipCardInner.addEventListener( 'click', function() {
    console.log("Card flipped")
    flipCardInner.classList.toggle('is-flipped');
  });
});