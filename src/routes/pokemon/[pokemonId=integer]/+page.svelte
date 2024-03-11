<div class="pokemon-display flex items-center flex-col">
    <Header pokemon={data} />
    <div class="grid grid-cols-2 items-center my-5">
        <div class="text-text">
            <ul>
                {#each data.moves.slice(0, 3) as move}
                    <li class="capitalize mb-1">{move.move.name.split('-').join(' ')}</li>
                {/each}
            </ul>
        </div>
        <div class="bg-white rounded shadow-inner relative custom-box-shadow">
            <img class="size-36 rounded" src={data.sprites.front_default} alt="" />
            <button on:click={(evt) => starPokemon(evt, data.name)}>
                <Icon src={Star} solid={favourited} class="absolute top-1 right-1 size-8 lg:size-6 text-secondary" />
            </button>
        </div>
    </div>
    <Footer pokemon={data} />
</div>

<script>
    import { Icon, Star } from 'svelte-hero-icons'
    import { writable } from 'svelte/store'
    import { browser } from '$app/environment'
    import { updateState } from '$lib/utils/favouritePokemonsStore'
    import { isFavourite } from '$lib/utils/isFavourite'
    import Header from '$lib/components/Header.svelte'
    import Footer from '$lib/components/Footer.svelte'

    export let data

    let favourited = isFavourite(data.name)

    const starPokemon = (evt, pokemonName) => {
        evt.stopPropagation()

        updateState(pokemonName)

        favourited = isFavourite(pokemonName)
    }
</script>
