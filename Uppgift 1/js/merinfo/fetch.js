const BASE_URL = "https://dsvkurs.miun.se/api"
const X_API_KEY = "qdcTq7sVnUiVUoQ7H1KhUA"

export async function hamtaDetaljeradInformation(imdbId) {
  const URI = `${BASE_URL}/Media/${imdbId}`

  try {
    const response = await fetch(URI, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": X_API_KEY,
      },
    })

    const detaljInfo = await response.json()
    return detaljInfo
  } catch (err) {
    console.error("Någonting blev fel")
  }
}
