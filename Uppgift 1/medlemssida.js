"use strict"

//VARIABLER
const filmlista = document.getElementById("filmlista")
const medelbetygAnvandare = document.getElementById(
  "medlemssida-statistikkort-siffra-poppe"
)
const antalBetygsattaFilmer = document.getElementById(
  "medlemssida-statistikkort-siffra-kamera"
)
const antalBetygsattaSerier = document.getElementById(
  "medlemssida-statistikkort-siffra-tv"
)

let filtreringsBox = document.getElementById("medlemssida-filtrering")
const meterAlla = document.getElementById("meter-Alla")

const poppebild = document.getElementById("poppe")

let allaHamtadeFilmer = []
let filtreradeFilmer = []
let aktivFilterTyp = "Alla"

//FUNKTIONER
//funktion som skapar listelement för varje film som finns i listan som hämtas
function skapaListelement(data) {
  // console.log("--> data", data)
  filmlista.innerHTML = ""
  data.forEach((film) => {
    console.log(film)

    // Skapa ett li-element
    let li = document.createElement("li")
    li.setAttribute("class", "medlemssida-filmkort")

    // Skapa ett img-element
    let img = document.createElement("img")
    img.setAttribute("class", "filmposter")
    img.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/original${film.poster_path}`
    )
    img.setAttribute("alt", "filmposter")
    img.setAttribute("height", "962")
    img.setAttribute("width", "641")

    // Skapa ett div-element
    let div = document.createElement("div")
    div.setAttribute("class", "medlemssida-filmbetyg")

    // Skapa ikon-element
    let stjarna1 = document.createElement("i")
    let stjarna2 = document.createElement("i")
    let stjarna3 = document.createElement("i")
    let stjarna4 = document.createElement("i")
    let stjarna5 = document.createElement("i")
    let daligFilm = document.createElement("i")

    let ikonArray = [stjarna1, stjarna2, stjarna3, stjarna4, stjarna5]

    // stjarna1.style.color = "yellow"
    stjarna1.setAttribute("class", "fa-solid fa-star")
    stjarna2.setAttribute("class", "fa-solid fa-star")
    stjarna3.setAttribute("class", "fa-solid fa-star")
    stjarna4.setAttribute("class", "fa-solid fa-star")
    stjarna5.setAttribute("class", "fa-solid fa-star")

    daligFilm.setAttribute("class", "fa-regular fa-face-frown")
    daligFilm.setAttribute("id", "surgubbe")
    daligFilm.style.color = "red"

    if (film.contribution.cmdb_score < 1) {
      div.appendChild(daligFilm)
    } else {
      // Bestäm hur många stjärnor som ska fyllas
      let betyg = film.contribution.cmdb_score || 0

      for (let i = 0; i < betyg; i++) {
        ikonArray[i].style.color = "yellow"
      }

      div.appendChild(stjarna1)
      div.appendChild(stjarna2)
      div.appendChild(stjarna3)
      div.appendChild(stjarna4)
      div.appendChild(stjarna5)
    }

    // Lägg till img-element till li-elementet
    li.appendChild(img)
    // Lägg till div-element till li-elementet
    li.appendChild(div)

    filmlista.appendChild(li)
  })
}

function bestammaPoppebild(medelbetyg) {
  if (medelbetyg < 0) {
    poppebild.setAttribute("src", "bilder/poppeArg.png")
  } else if (medelbetyg < 1) {
    poppebild.setAttribute("src", "bilder/poppeLedsen.png")
  } else if (medelbetyg < 2) {
    poppebild.setAttribute("src", "bilder/poppeNeutral.png")
  } else if (medelbetyg < 3) {
    poppebild.setAttribute("src", "bilder/poppeLiteGlad.png")
  } else if (medelbetyg < 4) {
    poppebild.setAttribute("src", "bilder/poppeGlad.png")
  } else {
    poppebild.setAttribute("src", "bilder/poppeSuperlycklig.png")
  }
}

function sattaBetyg(data) {
  let totalBetyg = 0
  let antalBetyg = data.length

  let antalFilmer = 0
  let antalSerier = 0

  data.forEach((film) => {
    if (film.media_type === "Movie") {
      antalFilmer++
    } else if (film.media_type === "TVSeries") {
      antalSerier++
    }

    totalBetyg += film.contribution.cmdb_score
  })

  let medelbetyg = (totalBetyg / antalBetyg).toFixed(1)

  //anropa funktion för att få rätt poppebild beroende på betyg
  bestammaPoppebild(medelbetyg)

  medelbetygAnvandare.innerText = medelbetyg
  antalBetygsattaFilmer.innerText = antalFilmer
  antalBetygsattaSerier.innerText = antalSerier
}

function skapaFilterelement(data) {
  let antalFilmerOchSerier = data.length
  let kategoriLista = new Map()

  // Räknar ihop alla kategorier
  data.forEach((film) => {
    film.genres.forEach((genre) => {
      let kategoriNamn = genre.name.split(" ")[0]
      let finnsKategori = kategoriLista.has(kategoriNamn)

      // Finns kategorin inte i listan - lägg till den
      if (finnsKategori === false) {
        kategoriLista.set(kategoriNamn, 1)
      } else {
        let kategoriForekomst = kategoriLista.get(kategoriNamn)
        kategoriLista.set(kategoriNamn, ++kategoriForekomst)
      }
    })
  })

  // Skapa filter utifrån kategoriListan
  // filtreringsBox.innerHTML = "";
  meterAlla.setAttribute("max", antalFilmerOchSerier)
  meterAlla.setAttribute("value", antalFilmerOchSerier)

  kategoriLista.forEach((value, key) => {
    filtreringsBox.innerHTML += `
      <div class="filter">
        <div class="filter-radio-button">
          <input
            type="radio"
            id="${key}"
            name="filmkategori"
            value="${key}"
          />
          <label for="${key}">${key}</label>
        </div>
        <meter id="meter-${key}" value="${value}" min="0" max="${antalFilmerOchSerier}"></meter>
      </div>
    `
  })

  const allaFilter = document.querySelectorAll("input[type='radio']")
  allaFilter.forEach((filter) => {
    filter.addEventListener("click", filtreraFilmer)
  })
}

function hittaGenreIListan(lista) {
  let genreTraff = lista.find((g) => {
    let kategoriNamn = g.name.split(" ")[0]
    return kategoriNamn === aktivFilterTyp
  })

  return genreTraff !== undefined
}

// https://fjolt.com/article/javascript-multiple-elements-addeventlistener
// https://stackoverflow.com/questions/3960376/in-javascript-how-to-get-the-current-id-of-the-div-where-mouse-pointer-is
function filtreraFilmer(event) {
  aktivFilterTyp = event.target.id
  event.stopPropagation()

  console.log("--> aktivFilterTyp", aktivFilterTyp)

  if (aktivFilterTyp === "Alla") {
    filtreradeFilmer = allaHamtadeFilmer
    console.log("--> allaHamtadeFilmer", allaHamtadeFilmer)
  } else {
    filtreradeFilmer = allaHamtadeFilmer.filter((film) => {
      let genreLista = film.genres
      let filmenSkaMed = hittaGenreIListan(genreLista)
      return filmenSkaMed
    })
  }

  skapaListelement(filtreradeFilmer)
  sattaBetyg(filtreradeFilmer)
}

function main() {
  fetch("filmer.json")
    .then((response) => response.json())
    .then((data) => {
      allaHamtadeFilmer = data.data

      skapaListelement(allaHamtadeFilmer)
      sattaBetyg(allaHamtadeFilmer)
      skapaFilterelement(allaHamtadeFilmer)
    })
}

//FUNKTIONSANROP OCH EVENTLISTENERS
main()
