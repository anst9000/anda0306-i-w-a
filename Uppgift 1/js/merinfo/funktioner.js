import { hamtaDetaljeradInformation } from "./fetch.js"

export async function visaDetaljeradInformation() {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const imdbId = urlParams.get("imdb_id")

  const detailedInformation = await hamtaDetaljeradInformation(imdbId)
  await skapaDetaljeradInformation(detailedInformation)
}

async function skapaDetaljeradInformation(info) {
  let merinfoHuvudinnehall = document.getElementById("merinfo-huvudinnehall")
  merinfoHuvudinnehall.innerHTML = ""

  const merinfoArticle = createArticle(info)
  merinfoHuvudinnehall.innerHTML += merinfoArticle
}

function createArticle(info) {
  const skadespelareHtmlLista = getActors(info.cast)
  const betyg = info.cmdb_score.toFixed(1)

  const betygsattning = info.contribution === null ? skapaBetygsModul() : null

  return `<article id="merinfo-article">
            <section id="merinfo-ovre-halva">
              <h2>${info.title}</h2>
              <p class="tagline">${info.tagline}</p>
              <p>Betyg ${betyg}</p>
                <h3>Handling</h3>
                <p>${info.overview}</p>
            </section>

            <section id="merinfo-undre-halva">
              <article id="merinfo-skadespelarlista">
                <h3>Skådespelare</h3>
                <ul>
                  ${skadespelareHtmlLista}
                </ul>
              </article>

              <aside id="merinfo-bild">
                <h3>${info.title}<span class="date"> - ${info.release_date}</span></h3>

                <img
                  class="filmposter"
                  src="https://image.tmdb.org/t/p/original${info.poster_path}"
                  alt="${info.title}"
                  height="962"
                  width="641"
                />
              </aside>
            </section>

            ${betygsattning}
          </article>`
}

function getActors(actors) {
  let actorsHtmlList = ""

  actors.forEach((actor, index) => {
    if (index < actors.length && index < 10) {
      actorsHtmlList += `<li>${actor.name}</li>`
    }
  })

  return actorsHtmlList
}

function skapaBetygsModul(info) {
  return `<form id="merinfo-recensionsformular">
            <h2>Recensera den här filmen</h2>

            <div class="">
              <div class="namn-och-varning">
                <div class="namn-falt">
                  <!-- label och ruta för att skriva in namn -->
                  <label for="namn">Ditt namn</label>
                  <input type="text" id="namn" />
                </div>

                <div id="varnings-meddelande">
                  <p>För en recension måste</p>
                  <p>båda fälten vara ifyllda.</p>
                </div>
              </div>
              <!-- label och flerradig textruta för att skriva recension -->
              <label for="recension">Din recension</label>
              <textarea rows="20" id="recension"></textarea>
            </div>

            <!-- betygsätta -->
            <div class="kort-betygsattingsmodul">
              <p class="kort-betygsatt">Ditt betyg på filmen</p>
              <div className="button-group" id="merinfo-button-group">
                <button type="button" class="rosta rosta_minus_1">-1</button>
                <button type="button" class="rosta rosta_1">1</button>
                <button type="button" class="rosta rosta_2">2</button>
                <button type="button" class="rosta rosta_3">3</button>
                <button type="button" class="rosta rosta_4">4</button>
                <button type="button" class="rosta rosta_5">5</button>
              </div>
            </div>

            <!-- Knapp för att skicka -->
            <button type="submit" disabled="true" id="merinfo-button-publicera">Publicera</button>
          </form>`
}

function hanteraPublicering(e) {
  e.preventDefault(e)

  const namn = document.getElementById("namn")
  const recension = document.getElementById("recension")
  const betyg = hamtaBetyg().innerText
  const varningsMeddelande = document.getElementById("varnings-meddelande")

  if (namn.value !== "" && recension.value === "") {
    recension.classList.add("danger")
    varningsMeddelande.style.visibility = "visible"
    return
  }

  if (namn.value === "" && recension.value !== "") {
    namn.classList.add("danger")
    varningsMeddelande.style.visibility = "visible"
    return
  }

  // Om namn och recension är ifyllda - skicka recension
  if (namn.value !== "" && recension.value !== "") {
    namn.classList.remove("danger")
    recension.classList.remove("danger")
    console.log("--> recension", namn.value, recension.value, betyg)
  }
  // Annars skicka bara betygsättning
  else {
    console.log("--> betyg", betyg)
  }

  aterstallFormularet()
}

export function laggTillSubmitListenerForForm() {
  const betygsattningsFormular = document.getElementById(
    "merinfo-recensionsformular"
  )

  const betygsKnappar = document.querySelectorAll(
    "#merinfo-button-group > button"
  )

  betygsKnappar.forEach((knapp) => {
    knapp.addEventListener("click", (e) => hanteraKlickaPaBetyg(e))
  })

  betygsattningsFormular.addEventListener("submit", (e) =>
    hanteraPublicering(e)
  )
}

function hanteraKlickaPaBetyg(e) {
  const betygsKnappar = document.querySelectorAll(
    "#merinfo-button-group > button"
  )

  betygsKnappar.forEach((knapp) => {
    if (knapp.classList.contains("active")) {
      knapp.classList.remove("active")
    } else {
      if (knapp === e.target) {
        knapp.classList.add("active")
      }
    }
  })

  let arNagonBetygsKnappAktiv = false

  betygsKnappar.forEach((knapp) => {
    if (knapp.classList.contains("active")) {
      arNagonBetygsKnappAktiv = true
    }
  })

  const publiceraKnapp = document.getElementById("merinfo-button-publicera")
  arNagonBetygsKnappAktiv
    ? publiceraKnapp.removeAttribute("disabled")
    : publiceraKnapp.setAttribute("disabled", "true")
}

function hamtaBetyg() {
  const betygsKnappar = document.querySelectorAll(
    "#merinfo-button-group > button"
  )

  let betygsKnapp = null

  betygsKnappar.forEach((knapp) => {
    if (knapp.classList.contains("active")) {
      betygsKnapp = knapp
    }
  })

  return betygsKnapp
}

function aterstallFormularet() {
  namn.value = ""
  recension.value = ""

  const betygsKnappar = document.querySelectorAll(
    "#merinfo-button-group > button"
  )
  betygsKnappar.forEach((knapp) => knapp.classList.remove("active"))

  const varningsMeddelande = document.getElementById("varnings-meddelande")
  varningsMeddelande.style.visibility = "hidden"

  const publiceraKnapp = document.getElementById("merinfo-button-publicera")
  publiceraKnapp.setAttribute("disabled", "true")
}

function skickaTillMerinfo(imdbId, e) {
  console.log(e.target)
}
