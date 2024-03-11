<h1 class="text-text capitalize text-xl md:text-4xl">
    <span>{pokemon.name}</span>
    - Type:
    <span>{pokemon.types.map(({ type }) => type.name).join(', ')}
    - HP:
    <span>{pokemon.stats.filter(({ stat }) => stat.name === 'hp')[0]['base_stat']}</span>
</h1>

<script>
    export let pokemon
</script>