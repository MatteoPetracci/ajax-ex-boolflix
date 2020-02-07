// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// Titolo
// Titolo Originale
// Lingua
// Voto

$(document).ready(function() {
    $('#button').on('click', function() {
      $('#film').empty();
      searchMovie();
 });
});

// **********Funzioni**********

// creo una funzione che cicla dentro l'array che contiene i film e stampo con handlebars

function printMovie(arrayMovie) {
  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);
  for (var i = 0; i < arrayMovie.length; i++) {
    // console.log(arrayMovie[i]);
    var movie = arrayMovie[i];
    var context = {
      'title': movie.title,
      'original_title': movie.original_title,
      'lang': movie.original_language,
      'vote': movie.vote_average + ' ' + numIntgr(movie.vote_average),
    };
    var html = template(context);
    $('#film').append(html);
  }
}

function searchMovie(movie) {
  // clicco sul bottone per prendere il valore di input
  var input = $('#input').val();
  // console.log(input);
  if (input == '') {
    console.log('Inserisci un titolo');
    $('#film').append('Inserisci un titolo');
  }
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
        // console.log(data);
        // Stampo direttamente l'array che contiene gli oggetti con le varie proprietà
        // console.log(data.results);
        var results = data.results;
        // console.log(results);
        printMovie(results);
        if (results == '') {
          // console.log('ciao');
          $('#film').append('Non è stato trovato nessun film con questo nome');
        }
      },
      'error': function(request, state, error) {
        // console.log('error', error);
      }
    }
  );
}

// funzione per trasformare il voto da 1 a 10 a 1 e 5, eliminando il decimale da aggiungere l'arrotondamento in eccesso
// numIntgr(parseInt(prompt('Inserisci un numero')));

function numIntgr(num){
  var numIntgr = parseInt(num);
  // console.log(numIntgr);
  if (numIntgr == 1 || numIntgr == 2) {
    return 1;
    // console.log(numIntgr);
  } else if (numIntgr == 3 || numIntgr == 4) {
    return 2;
    // console.log(numIntgr);
  } else if (numIntgr == 5 || numIntgr == 6) {
    return 3;
    // console.log(numIntgr);
  } else if (numIntgr == 7 || numIntgr == 8) {
    return 4;
    // console.log(numIntgr);
  } else if (numIntgr == 9 || numIntgr == 10) {
    return 5;
    // console.log(numIntgr);
  }
}
