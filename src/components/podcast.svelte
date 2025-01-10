<script>
    export let c;
    export let i;
</script>

<div class="mb-2">
    <h3>Podcast</h3>
    {#each c.podcast as p, pIndex}
        <div class="p-2 border rounded mb-2">
            <div class="mb-2">
                <label for="podcast-lang-{i}-{pIndex}" class="block mb-1">Language:</label>
                <input
                    id="podcast-lang-{i}-{pIndex}"
                    type="text"
                    bind:value={p.lang}
                    class="w-full p-2 border rounded"
                />
            </div>
            <div>
                <label for="podcast-url-{i}-{pIndex}" class="block mb-1">URL:</label>
                <input
                    id="podcast-url-{i}-{pIndex}"
                    type="url"
                    bind:value={p.url}
                    class="w-full p-2 border rounded"
                />
            </div>
        </div>
    {/each}
    <button
        class="btn"
        onclick={() => {
            c.podcast = [
                ...c.podcast,
                { lang: '', url: '' }
            ];
        }}
    >
        Add Podcast
    </button>
</div>

