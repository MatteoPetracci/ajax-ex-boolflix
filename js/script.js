// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// Titolo
// Titolo Originale
// Lingua
// Voto

$(document).ready(function() {
  // Prendo il valore di input quando clicco sul bottone
    $('#button').on('click', function() {
      var input = $('#input').val();
      $('#film').empty();
  // chiamata ajax
  $.ajax(
    {
      'url': 'https://api.themoviedb.org/3/search/movie',
      'method':'GET',
      'data': {
        api_key :'529c9b24599513d9b7c68c4b715e6f75',
        query : input
      },
      'success': function(data) {
        // stampo oggetto
        console.log(data);
        // Stampo direttamente l'array che contiene gli oggetti con le varie proprietà
        // console.log(data.results);
        var results = data.results;
        console.log(results);
        printMovie(results);
      },
      'error': function(request, state, error) {
        console.log('error', error);
      }
    }
  );
 });
});
// **********Funzioni**********

// creo una funzione che cicla dentro l'array che contiene i film e stampo con handlebars

function printMovie(arrayMovie) {
  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);
  for (var i = 0; i < arrayMovie.length; i++) {
    console.log(arrayMovie[i]);
    var movie = arrayMovie[i];
    var context = movie;
    // console.log(context);
    var html = template(context);
    $('#film').append(html);
  }
}

// function searchMovie(movie) {
//   // clicco sul bottone per prendere il valore di input
//       var input = $('#input').val();
//       console.log(input);
//
//
// }
