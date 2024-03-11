export const load = async ({ fetch, params}) => {
    const { pokemonId } = params
    const pokemonCall = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    return await pokemonCall.json()
}