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
  var input = $('#input').val();
  var key = '529c9b24599513d9b7c68c4b715e6f75';
  var urlMovie = 'https://api.themoviedb.org/3/search/movie';
  var urlTvshow = 'https://api.themoviedb.org/3/search/tv';
  $('#movie').empty();
  $('#tv').empty();
  searchMovie(input, key, urlMovie);
  searchMovie(input, key, urlTvshow);
  // ripristino il campo input vuoto
  $('input').val('');
  if (input == '') {
    $('#movie').empty();
    $('#tv').empty();
  }
}

// creo una funzione che cicla dentro l'array che contiene i film e stampo con handlebars

function printMovie(arrayMovie) {
  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);
  for (var i = 0; i < arrayMovie.length; i++) {
    var movie = arrayMovie[i];
    var poster = '/ocsmt4duUyNZtTM641k262PBeIU.jpg';
    if (movie.poster_path) {
      poster = movie.poster_path;
    }
    var overview = 'Non è disponibile';
    if (movie.overview) {
      overview = movie.overview;
    }
    var title = 'Not found';
    if (movie.title) {
      title = movie.title;
    }
    var titleOriginal = 'Not found';
    if (movie.original_title) {
      titleOriginal = movie.original_title;
    }
    var context = {
      'path_img': printImg(poster),
      'title': title,
      'original_title': titleOriginal,
      'lang': printFlag(movie.original_language),
      'vote': movie.vote_average,
      'star': printStar(movie.vote_average),
      'overview': overview
    };
    var html = template(context);
    $('#movie').append(html);
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
    // var overview = 'Non è disponibile';
    // if (movie.overview) {
    //   overview = movie.overview;
    // }
    // var name = 'Not found';
    // if (movie.name) {
    //   name = movie.name;
    // }
    // var nameOriginal = 'Not found';
    // if (movie.original_name) {
    //   nameOriginal = movie.original_name;
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
    var html = template(context);
    $('#tv').append(html);
  }

function searchMovie(input, key, url) {
  if (input == '') {
    // console.log('Inserisci un titolo');
    $('#film_text').append(' Inserisci un titolo');
  }
  $('#film_text').empty();
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
          $('#film_text').append('Non è disponibile');
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
