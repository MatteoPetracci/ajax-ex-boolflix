$(document).ready(function() {
  $('#button').on('click', function() {
    searchAll();
  });
  // invio con la tastiera
  $('input').keypress(function(){
    if (event.which == 13) {
      searchAll();
    }
  });
});

// **********Funzioni**********

function searchAll() {
  $('#film').empty();
  var input = $('#input').val();
  var key = '529c9b24599513d9b7c68c4b715e6f75';
  var urlMovie = 'https://api.themoviedb.org/3/search/movie' ;
  var urlTvshow = 'https://api.themoviedb.org/3/search/tv' ;
  searchMovie(input, key, urlMovie);
  searchMovie(input, key, urlTvshow);
  // ripristino il campo input vuoto
  $('input').val('');
}

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
    var poster = '/ocsmt4duUyNZtTM641k262PBeIU.jpg';
    if (movie.poster_path) {
      poster = movie.poster_path;
    }
    var context = {
      'path_img': printImg(poster),
      'title': movie.title,
      'original_title': movie.original_title,
      'lang': printFlag(movie.original_language),
      'vote': movie.vote_average,
      'star': printStar(movie.vote_average),
      'overview': movie.overview
    };
    console.log(movie.poster_path);

    // console.log(movie.poster_path);
    // if (movie.poster_path == null) {
    //   movie.poster_path = '/ocsmt4duUyNZtTM641k262PBeIU.jpg';
    // }
    // console.log(movie.poster_path);
    // console.log(movie.original_language);
    // console.log(printImg(movie.poster_path));
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
    var poster = '/ocsmt4duUyNZtTM641k262PBeIU.jpg';
    if (movie.poster_path) {
      poster = movie.poster_path;
    }
    var context = {
      'path_img': printImg(poster),
      'name': movie.name,
      'original_name': movie.original_name,
      'lang': printFlag(movie.original_language),
      'vote': movie.vote_average,
      'star': printStar(movie.vote_average),
      'overview': movie.overview
    };

    // console.log(movie.poster_path);

    // if (movie.poster_path == null) {
    //   movie.poster_path = '/ocsmt4duUyNZtTM641k262PBeIU.jpg';
    // }

    console.log(movie.poster_path);
    // console.log(movie.poster_path);

    // console.log(printImg(movie.poster_path));
    // console.log(movie.overview);
    // console.log(movie.original_language);

    var html = template(context);
    $('#film').append(html);
  }
}

function searchMovie(input, key, url) {
  if (input == '') {
    console.log('Inserisci un titolo');
    $('#film').append(' Inserisci un titolo');
  }
  // chiamata ajax
  $.ajax(
    {
      'url': url,
      'method':'GET',
      'data': {
        api_key : key,
        query : input,
        language : "it-IT"
      },
      'success': function(data) {
        // console.log(data);
        // Stampo direttamente l'array che contiene gli oggetti con le varie proprietà
        // console.log(data.results);
        var results = data.results;
        // console.log(results);
        printMovie(results);
        printTvShow(results);
        if (results == '') {
          // console.log('ciao');
          $('#film_text').append('Non è stato trovato nessun film con questo nome  ');
        }
      },
      'error': function(request, state, error) {
        // console.log('error', error);
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
  // console.log(langString);
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
  var url = 'https://image.tmdb.org/t/p/w185/'
  var urlImg = url + pathImg;
  // console.log(urlImg);
  return urlImg;
}
