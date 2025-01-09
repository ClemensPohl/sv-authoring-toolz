<script>
	export let c;
    export let i;
</script>

<div class="mb-2">
    <label for="context-{i}" class="block mb-1">Text:</label>
    <input
        id="context-{i}"
        type="text"
        bind:value={c.context}
        class="w-full p-2 border rounded"
    />
</div>
<div class="mb-2">
    <label for="chapter-{i}" class="block mb-1">Chapter:</label>
    <input
        id="chapter-{i}"
        type="text"
        bind:value={c.chapter}
        class="w-full p-2 border rounded"
    />
</div>

<!-- Ressources -->
<h3>Resources</h3>
{#each c.ressources as r, i}
    <div class="p-2 border rounded mb-2">
        <div class="mb-2">
            <label for="resource-text-{i}" class="block mb-1">Text:</label>
            <input
                id="resource-text-{i}"
                type="text"
                bind:value={r.text}
                class="w-full p-2 border rounded"
            />
        </div>
        <div>
            <label for="resource-url-{i}" class="block mb-1">URL:</label>
            <input
                id="resource-url-{i}"
                type="url"
                bind:value={r.url}
                class="w-full p-2 border rounded"
            />
        </div>
    </div>
{/each}