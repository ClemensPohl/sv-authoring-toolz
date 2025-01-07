<script lang="ts">
	import type { Root as RootType } from './wapJson';
	import { onMount } from 'svelte';

	let root: RootType | null = null;

	function handleFileUpload(event: Event) {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const json = JSON.parse(e.target?.result as string);
                    root = json as RootType;
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    alert('Invalid JSON file');
                }
            };
            reader.readAsText(file);
        }
    }

    onMount(() => {
        const handleCustomEvent = (e: CustomEvent<Event>) => {
            handleFileUpload(e.detail);
        };

        document.addEventListener('fileUpload', handleCustomEvent as EventListener);

        return () => {
            document.removeEventListener('fileUpload', handleCustomEvent as EventListener);
        };
    });

</script>
{#if root}
<!-- Base Description -->
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
					<input 
						id="text-{i}"
						type="text" 
						bind:value={fc.text}
						class="w-full p-2 border rounded"
					/>
				</div>
				<div>
					<label for="url-{i}" class="block mb-1">URL:</label>
					<input 
						id="url-{i}"
						type="url" 
						bind:value={fc.url}
						class="w-full p-2 border rounded"
					/>
				</div>
			</div>
		{/each}
		<button class="btn" on:click={() => {
			if (root) {
				root.description.furtherContent = [...root.description.furtherContent, { text: '', url: '' }];
			}
		}}>Add Further Content</button>
<!-- All Contents -->
<h2>Contents</h2>
{#each root.content as c, i}
    <details class="collapsible-container">
        <summary class="collapsible-header">Content {i + 1}</summary>
        <div class="collapsible-content">
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

			<!-- Main Video change to take path upload oder so an scheiss fick mi leben-->
			<div class="mb-2">
                <label for="mainvideo-{i}" class="block mb-1">Main Video:</label>
                <input 
                    id="mainvideo-{i}"
                    type="text" 
                    bind:value={c.mainVideo}
                    class="w-full p-2 border rounded"
                />
            </div>
			
			<!-- Side Texts -->
			<div class="mb-2">
				<h3>Side Texts</h3>
				<div id="sidetexts-{i}">
					{#each c.sidetexts as sidetext, i}
						<div class="p-2 border rounded mb-2">
							<div class="mb-2">
								<label for="sidetext-start-{i}" class="block mb-1">Start Time:</label>
								<input 
									id="sidetext-start-{i}"
									type="text" 
									bind:value={sidetext.start}
									class="w-full p-2 border rounded"
								/>
							</div>
							<div class="mb-2">
								<label for="sidetext-end-{i}" class="block mb-1">End Time:</label>
								<input 
									id="sidetext-end-{i}"
									type="text" 
									bind:value={sidetext.end}
									class="w-full p-2 border rounded"
								/>
							</div>
							<div class="mb-2">
								<label for="sidetext-no-{i}" class="block mb-1">Number:</label>
								<input 
									id="sidetext-no-{i}"
									type="text" 
									bind:value={sidetext.no}
									class="w-full p-2 border rounded"
								/>
							</div>
							<div class="mb-2">
								<label for="sidetext-text-{i}" class="block mb-1">Text:</label>
								<textarea 
									id="sidetext-text-{i}"
									bind:value={sidetext.text}
									class="w-full p-2 border rounded"
								></textarea>
							</div>
						</div>
						<hr class="rounded"> <!-- DIVIDER  -->
					{/each}
					<button class="btn" on:click={() => c.sidetexts = [...c.sidetexts, { start: "1", end: "1", no: c.sidetexts.length + 1, text: '' }]}>
						Add Side Text
					</button>
				</div>
			</div>


        </div>
    </details>
{/each}
	</div>

{:else}
	<h1>No Json Loaded Capybara sad!</h1>
	<img src="noJsonLoaded.jpg" alt="NoJSONLoaded" class="no-json-image" />
{/if}
