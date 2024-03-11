export const load = async ({ fetch }) => {
    const pokemonCall = await fetch('https://pokeapi.co/api/v2/pokemon/')
    return await pokemonCall.json()
}