const $form = $('#form')
const $search = $('#search')
const $results = $('#results')

$form.on('submit', function (event) {
  event.preventDefault()
  $.ajax({
    url: `http://www.omdbapi.com/?apikey=1c482164&s=${$search.val()}&type=movie`,
    method: 'GET',
    dataType: 'json'
  }).done(function (json) {
    console.table(json)
    if (json.Response === 'True') {
      const results = []
      for (const movie of json.Search) {
        if (movie.Poster === 'N/A') {
          movie.Poster = 'no-image.svg'
        }
        results.push(`
        <div class="card">
          <div class="card-image">
            <img class="card-img-top" src="${movie.Poster}" alt="${movie.Title}">
          </div>
          <div class="card-body">
            <h5 class="card-title">${movie.Title} (${movie.Year})</h5>
            <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank">Go to IMDb</a>
          </div>
        </div>
        `)
      }
      $results.html(results.join(''))
    } else if (json.Response === 'False') {
      $results.html(`${json.Error}`)
    }
  }).fail(function (error) {
    console.log(error)
    $results.html('<em>Oops! Something is wrong!</em>')
  })
})
