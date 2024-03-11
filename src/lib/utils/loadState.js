import { browser } from '$app/environment'
export const STARRED_POKEMON_STATE = 'jabbr::starred_pokemons'

export const loadState = () => {
    if (browser) return JSON.parse(localStorage.getItem(STARRED_POKEMON_STATE))

    return null
}
