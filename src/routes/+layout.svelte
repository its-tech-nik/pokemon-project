<script>
    import image from '$lib/assets/pokemon-logo.png'
    import "../app.css"
    import { onNavigate } from '$app/navigation';

    onNavigate((navigation) => {
        if (!document.startViewTransition) return;

        return new Promise((resolve) => {
            document.startViewTransition(async () => {
                resolve()
                await navigation.complete
            })
        })
    })
</script>

<a href="/"><img class="w-64 mx-auto" src={image} alt="pokemon-logo" /></a>
<div class="container mx-auto my-5  ">
    <slot />
</div>