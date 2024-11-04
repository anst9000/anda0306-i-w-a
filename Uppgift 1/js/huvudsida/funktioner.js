export function skapaToppLista(topMedias) {
  const topList = document.getElementById("top-list")
  topList.innerHTML = ""

  topMedias.forEach((media, index) => {
    if (index < 3) {
      topList.innerHTML += skapaStoraKort(media)
    } else {
      topList.innerHTML += skapaMindreKort(media)
    }
  })
}

function skapaStoraKort(media) {
  return `<li>
            <a class="stora kort-media kort-media-link" href="/Uppgift%201/merinfo.html?imdb_id=${media.imdb_id}" data-imdb_id="${media.imdb_id}">
              <div class="kort-media-info">
                <p class="kort-media-titel">${media.title}</p>

                <p class="tagline kort-media-tagline">${media.tagline}</p>
                <p class="kort-media-betyg">Betyg: ${media.cmdb_score}</p>

                <p class="kort-media-betygsatt">Betygsätt</p>
                <div className="button-group">
                  <button class="rosta rosta_minus_1">-1</button>
                  <button class="rosta rosta_1">1</button>
                  <button class="rosta rosta_2">2</button>
                  <button class="rosta rosta_3">3</button>
                  <button class="rosta rosta_4">4</button>
                  <button class="rosta rosta_5">5</button>
                </div>
              </div>

              <div class="kort-media-poster">
                <img class="filmposter" src="https://image.tmdb.org/t/p/original${media.poster_path}" alt="filmposter" height="962" width="641" />
              </div>
            </a>
          </li>`
}

function skapaMindreKort(media) {
  return `<li>
            <a class="lilla kort-media kort-media-link" href="/Uppgift%201/merinfo.html?imdb_id=${media.imdb_id}" data-imdb_id="${media.imdb_id}">
              <div class="kort-media-info">
                <p class="kort-media-titel">${media.title}</p>

                <p class="tagline kort-media-tagline">${media.tagline}</p>
                <p class="kort-media-betyg">Betyg: ${media.cmdb_score}</p>

                <p class="kort-media-betygsatt">Betygsätt</p>
                <div className="button-group">
                  <button class="rosta rosta_minus_1">-1</button>
                  <button class="rosta rosta_1">1</button>
                  <button class="rosta rosta_2">2</button>
                  <button class="rosta rosta_3">3</button>
                  <button class="rosta rosta_4">4</button>
                  <button class="rosta rosta_5">5</button>
                </div>
              </div>

              <div class="kort-media-poster">
                <img class="filmposter" src="https://image.tmdb.org/t/p/original${media.poster_path}" alt="filmposter" height="962" width="641" />
              </div>
            </a>
          </li>`
}

export function skapaLyssnareForSokruta() {
  const sokFormular = document.getElementById("startsida-sokformular")
  sokFormular.addEventListener("submit", async function (event) {
    event.preventDefault()

    const sokstrang = event.target.sokord.value
    window.location.href = `/Uppgift%201/sokresultat.html?sokstrang=${sokstrang}`
  })
}
