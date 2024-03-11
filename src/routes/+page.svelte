<div class="index-page">
    {#if !loading}
        <div class="grid gap-5 grid-cols-2 md:grid-cols-5">
            {#each data.results as pokemon (pokemon.name)}
                <button animate:flip={{duration: 400}} class="bg-background transition-all relative flex justify-center text-text hover:bg-primary hover:text-secondary border rounded px-3 py-5" on:click={() => navigateTo(pokemon.url)}>
                    <span class="capitalize">{pokemon.name}</span>
                    <button class="absolute top-0 right-0 max-sm:p-1" on:click={(evt) => starPokemon(evt, pokemon.name)}>
                        <Icon src={Star} solid={isFavourite(pokemon.name)} class="size-8 lg:size-6 text-secondary" />
                    </button>
                </button>
            {/each}
        </div>
    {:else}
        Loading
        <div class="px-4 py-2 flex justify-center">
            <Icon src={ArrowPath} class="size-8 lg:size-6 text-secondary animate-spin" />
        </div>
    {/if}
    <div class="py-2 flex justify-center">
        <button class="bg-primary text-secondary rounded px-4 py-2" on:click={() => pokemonsPromise = getMorePokemons()}>
            {#await pokemonsPromise}
                <Icon src={ArrowPath} class="size-8 lg:size-6 text-secondary animate-spin" />
            {:then planet}
                Load More...
            {:catch someError}
                System error: {someError.message}.
            {/await}
        </button>
    </div>
</div>

<script>
    import { goto } from '$app/navigation'
    import { browser } from '$app/environment'
    import { flip } from 'svelte/animate'
    import { navigating } from '$app/stores'
    import { onMount } from 'svelte'
    // Utils
    import { isFavourite } from '$lib/utils/isFavourite'
    import { updateState } from '$lib/utils/favouritePokemonsStore'
    // Components
    import { Icon, Star, ArrowPath } from "svelte-hero-icons"

    // Initialisations
    export let data
    let loading = true
    let pokemonsPromise = null

    onMount(() => {
        loading = false
    })

    // Clickable functions
    const navigateTo = (clickedPokemon) => {
        const clickedPokemonRoute = clickedPokemon.split('v2')[1]
        goto(clickedPokemonRoute)
    }

    const starPokemon = (evt, pokemonName) => {
        evt.stopPropagation()

        updateState(pokemonName)

        data.results = reorderFavouritePokemonsToFront()
    }
    // Helper functions
    const sortAlphabetically = (a, b) => {
        if(a.name < b.name) return -1
        if(a.name > b.name) return 1
        return 0
    }

    const reorderFavouritePokemonsToFront = () => {
        const favouritePokemons = data.results.filter(pokemon => isFavourite(pokemon.name)).sort(sortAlphabetically)
        const remainingPokemons = data.results.filter(pokemon => !isFavourite(pokemon.name)).sort(sortAlphabetically)
        return [...favouritePokemons, ...remainingPokemons]
    }

    const getMorePokemons = async () => {
        const apiCall = await fetch(data.next)
        const result = await apiCall.json()
        data = {
            ...result,
            results: [
                ...data.results,
                ...result.results,
            ]
        }

        data.results = reorderFavouritePokemonsToFront()
    }

    data.results = reorderFavouritePokemonsToFront()
</script>
