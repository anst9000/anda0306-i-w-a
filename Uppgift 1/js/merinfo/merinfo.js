"use strict"

import {
  visaDetaljeradInformation,
  laggTillSubmitListenerForForm,
} from "./funktioner.js"

//mainmetod som anropas direkt när sidan öppnas.
async function main() {
  await visaDetaljeradInformation()

  laggTillSubmitListenerForForm()
}

//FUNKTIONSANROP OCH EVENTLISTENERS
main()
