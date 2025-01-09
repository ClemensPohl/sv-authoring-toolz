<script>
	export let root;
</script>

<div class="form-container">
    <h2>Description:</h2>
    <label for="context">Content:</label>
    <input id="context" bind:value={root.description.context} />

    <label for="date">Date:</label>
    <input type="date" id="date" bind:value={root.description.date} />

    <label for="furtherContent">Further Content:</label>
    {#each root.description.furtherContent as fc, i}
        <div class="p-2 border rounded mb-2">
            <div class="mb-2">
                <label for="text-{i}" class="block mb-1">Text:</label>
                <input id="text-{i}" type="text" bind:value={fc.text} class="w-full p-2 border rounded" />
            </div>
            <div>
                <label for="url-{i}" class="block mb-1">URL:</label>
                <input id="url-{i}" type="url" bind:value={fc.url} class="w-full p-2 border rounded" />
            </div>
        </div>
    {/each}
    <button
        class="btn"
        onclick={() => {
            if (root) {
                root.description.furtherContent = [
                    ...root.description.furtherContent,
                    { text: '', url: '' }
                ];
            }
        }}>Add Further Content</button
    >
</div>