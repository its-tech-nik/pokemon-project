import { loadState } from "./loadState"

export const isFavourite = (pokemonName) => {
    const favouritePokemons = loadState() || []
    return favouritePokemons?.includes(pokemonName)
}
