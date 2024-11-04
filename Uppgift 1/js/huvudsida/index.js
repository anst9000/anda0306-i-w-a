import { hamtaToppRankadMedia } from "../../data/top-rated-media.js"
import { skapaToppLista, skapaLyssnareForSokruta } from "./funktioner.js"
// import { addClickListenerForDetails } from "./funktioner.js"

// MAIN-METOD SOM ANROPAS NÄR MAN FÖRST KOMMER TILL SIDAN
async function main() {
  // läser in lista med filmer från js-fil
  const toppRankadMedia = await hamtaToppRankadMedia().data

  // createTop3List(topRatedMedia)
  // createTop10List(topRatedMedia)
  await skapaToppLista(toppRankadMedia)

  // Lägg till form event för sökfunktionen
  skapaLyssnareForSokruta()
}

// FUNKTIONSANROP OCH EVENTLISTENERS
main()
