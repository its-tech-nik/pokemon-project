<footer>
    <div class="text-text">
        <ul class="flex flex-row gap-5">
            {#each pokemon.stats.filter(({ stat }) => ['attack', 'defense'].includes(stat.name)) as stat}
                <li class="capitalize">{stat.stat.name}: {stat.base_stat}</li>
            {/each}
        </ul>
    </div>
</footer>

<script>
    export let pokemon
</script>