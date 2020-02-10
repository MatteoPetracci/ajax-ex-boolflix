// MILESTONE 1

// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// Titolo
// Titolo Originale
// Lingua
// Voto
// *******************************

// MILESTONE 2

// Milestone 2:
// Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da
// permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5,
// lasciando le restanti vuote (troviamo le icone in FontAwesome).
// Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze
// piene (o mezze vuote :P)
// Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della
// nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della
// nazione ritornata dall’API (le flag non ci sono in FontAwesome).
// Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca
// dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando
// attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di
// risposta diversi, simili ma non sempre identici)
// *********************************************************

$(document).ready(function() {
  $('#button').on('click', function() {
    $('#film').empty();
    searchMovie();
    searchTvShow();
    // ripristino il campo input vuoto
    $('input').val('');
  });
  // invio con la tastiera
  $('input').keypress(function(){
    if (event.which == 13) {
      $('#film').empty();
      searchMovie();
      searchTvShow();
      $('input').val('');
    }
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
    // var num = numIntgr(movie.vote_average);
    // console.log(movie.vote_average);
    // console.log(movie.original_language);
    var context = {
      'path_img': printImg(movie.poster_path),
      'title': movie.title,
      'original_title': movie.original_title,
      'lang': printFlag(movie.original_language),
      'vote': movie.vote_average,
      'star': printStar(movie.vote_average)
    };
    console.log(movie.original_language);
    console.log(printImg(movie.poster_path));
    // console.log(printStar(movie.vote_average));
    var html = template(context);
    $('#film').append(html);
  }
}

function printTvShow(arrayMovie) {
  var source = $("#tv_show").html();
  var template = Handlebars.compile(source);
  for (var i = 0; i < arrayMovie.length; i++) {
    var movie = arrayMovie[i];
    var context = {
      'path_img': printImg(movie.poster_path),
      'name': movie.name,
      'original_name': movie.original_name,
      'lang': printFlag(movie.original_language),
      'vote': movie.vote_average,
      'star': printStar(movie.vote_average)
    };
    console.log(movie.original_language);
    console.log(printImg(movie.poster_path));

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
        query : input,
        language: "it-IT"
      },
      'success': function(data) {
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

function searchTvShow(movie){
  var input = $('#input').val();
  if (input == '') {
    console.log('Inserisci un titolo');
    $('#film').append('Inserisci un titolo');
  }
  $.ajax(
    {
      'url': 'https://api.themoviedb.org/3/search/tv',
      'method':'GET',
      'data': {
        api_key :'529c9b24599513d9b7c68c4b715e6f75',
        query : input,
        language: "it-IT"
      },
      'success': function(data) {
        var results = data.results;
        printTvShow(results);
        if (results == '') {
          $('#film').append('Non è stato trovato nessuna serie tv con questo nome');
        }
      },
      'error': function(request, state, error) {
        console.log('error', error);
      }
    }
  );
}

function printStar(vote) {
  // Rendo il numero intero
  vote = Math.floor((vote / 2));
  var star = "";
  // Ciclo il max delle stelle per stampare le icone
  for (var i = 1; i <= 5; i++) {
    if (i <= vote) {
      star += '<i class="fas fa-star"></i>';
    } else {
      star += '<i class="far fa-star"></i>';
    }
  }
  return star
}

// movie.original_language restiuisce le prime due lettere della lingua usata en, it, fr

function printFlag(lang) {
  // creo un array con lo stesso risultato che ottengo da movie.original_language
  var langString = ['en', 'it', 'fr', 'es'];
  console.log(langString);
  var flag = "";
  // se nell'array è contenuto movie.original_language stampa l'immagine
  if (langString.includes(lang)) {
    flag += '<img class="img_lng" src="img/' + lang + '.png">';
    // altrimenti ritorno la sigla della lingua
  } else {
    return lang;
  }
  return flag;
}

// risultato della chiamata "poster_path": "/eo2Xu4UWXHE8UlBlAktNiSsAmfx.jpg"
function printImg(pathImg){
  var url = 'https://image.tmdb.org/t/p/w185'
  var urlImg = url + pathImg;
  console.log(urlImg);
}
