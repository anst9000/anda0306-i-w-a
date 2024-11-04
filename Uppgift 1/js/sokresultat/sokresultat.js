"use strict"

import { sokEfterTitel } from "./fetch.js"
import { skapaSokresultatLista } from "./funktioner.js"

//mainmetod som anropas direkt när sidan öppnas.
async function main() {
  const sokresultat = await sokEfterTitel()
  console.log("--> sokresultat", sokresultat)

  // skapa en lista med alla sökresultat
  skapaSokresultatLista(sokresultat)
}

//FUNKTIONSANROP OCH EVENTLISTENERS
main()
