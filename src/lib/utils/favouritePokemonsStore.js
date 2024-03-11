import { STARRED_POKEMON_STATE } from '$lib/utils/loadState'

import { browser } from '$app/environment'
import { writable } from 'svelte/store'
import { isFavourite } from './isFavourite'
import { loadState } from './loadState.js'
 
const defaultValue = loadState() || []

const favouriteList = writable(defaultValue)
 
favouriteList.subscribe((pokemonLilst) => {
  if (!browser) return

  localStorage.setItem(STARRED_POKEMON_STATE, JSON.stringify(pokemonLilst))
})

export const updateState = (pokemonName) => {
  if (browser && pokemonName) {
    const state = JSON.parse(localStorage.getItem(STARRED_POKEMON_STATE)) || []

    if (isFavourite(pokemonName)) {
      const listWithoutPokemon = state.filter(name => name !== pokemonName)
      favouriteList.set(listWithoutPokemon)
      return
    }

    favouriteList.set([
      ...state,
      pokemonName,
    ])
  }
}

export default favouriteList