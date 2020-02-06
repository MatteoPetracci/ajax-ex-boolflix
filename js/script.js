// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// Titolo
// Titolo Originale
// Lingua
// Voto

$(document).ready(function() {
  // Prendo il valore di input quando clicco sul bottone
  $('#input').on('click', function() {
    var element = $(this);
    console.log(element);
    $('#button').on('click', function() {
      var valInput = element.val();
      console.log(valInput);
    })
  })


});
