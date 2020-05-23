function filterFunc(SearchInput, SearchLocation) {
    // Declare variables
    var cards, filter, cardTitle, cardDescription, txtValue;
    cards = SearchLocation.getElementsByClassName('card h-100');
    filter = SearchInput.value.toUpperCase();

    for (i = 0; i < cards.length; i++) {
        cardTitle = cards[i].getElementsByClassName('card-title')[0];
        cardDescription = cards[i].getElementsByClassName('card-text')[0];
        txtValue = cardTitle.textContent || cardDescription;
        console.log(txtValue);
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          cards[i].parentElement.style.display = "";
        } else {
          cards[i].parentElement.style.display = "none";
        }
      }
    console.log(cards);
}