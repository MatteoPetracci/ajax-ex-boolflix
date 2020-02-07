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
    console.log(movie.vote_average);
    var context = {
      'title': movie.title,
      'original_title': movie.original_title,
      'lang': movie.original_language,
      'vote': movie.vote_average,
      'star': printStar(movie.vote_average)
    };
    // console.log(printStar(movie.vote_average));
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

function printStar(vote) {
  // Rendo il numero intero
  var num = Math.floor((vote / 2));
  var star = "";
  // Ciclo il max delle stelle per stampare le icone
  for (var i = 0; i < 5; i++) {
    if (i < num) {
      star += '<i class="fas fa-star"></i>';
    } else {
      star += '<i class="far fa-star"></i>';
    }
  }
  return star
}










// funzione per trasformare il voto da 1 a 10 a 1 e 5, eliminando il decimale da aggiungere l'arrotondamento in eccesso
// numIntgr(parseInt(prompt('Inserisci un numero')));
//
// function numIntgr(num){
  //   var numIntgr = parseInt(num);
  //   // console.log(numIntgr);
  //   if (numIntgr == 1 || numIntgr == 2) {
    //     return 1;
    //     // console.log(numIntgr);
    //   } else if (numIntgr == 3 || numIntgr == 4) {
      //     return 2;
      //     // console.log(numIntgr);
      //   } else if (numIntgr == 5 || numIntgr == 6) {
        //     return 3;
        //     // console.log(numIntgr);
        //   } else if (numIntgr == 7 || numIntgr == 8) {
          //     return 4;
          //     // console.log(numIntgr);
          //   } else if (numIntgr == 9 || numIntgr == 10) {
            //     return 5;
            //     // console.log(numIntgr);
            //   }
            // }
