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
    });
  });

  // chiamata ajax
  $.ajax(
    {
      'url': 'https://api.themoviedb.org/3/search/movie',
      'method':'GET',
      'data': {
        api_key :'529c9b24599513d9b7c68c4b715e6f75',
        query : 'la vita è bella'
      },
      'success': function(data) {
        console.log(data);
        // Stampo direttamente l'array che contiene gli oggetti con le varie proprietà
        console.log(data.results);
      },
      'error': function(request, state, error) {
        console.log('error', error);
      }
    }
  );
});
