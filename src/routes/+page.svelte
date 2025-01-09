<script lang="ts">
	import type { PageData } from './$types';
	import type { Root as RootJson } from './wapJson';
	import BaseDescription from '../components/BaseDescription.svelte';
	import ContextChapterResources from '../components/ContextChapterResources.svelte';
	import MainVideoSideTexts from '../components/MainVideoSideTexts.svelte';
	import NothingLoaded from '../components/NothingLoaded.svelte';

	const { data } = $props<{ data: PageData }>();
	let root = $state<RootJson | null>(null);

	let fileInput: HTMLInputElement;
	let videoElements = $state<HTMLVideoElement[]>([]);

	function handleFileUpload(event: Event) {
		data.pageData
			.handleFileUpload(event)
			.then((newRoot: RootJson) => {
				root = newRoot;
			})
			.catch((error: Error) => {
				alert(error.message);
			});
	}

	function handleLoadJson() {
		fileInput.click();
	}

</script>

<div class="form-container">
	<div class="button-group">
		<input
			type="file"
			accept=".json"
			bind:this={fileInput}
			onchange={handleFileUpload}
			style="display: none"
		/>
		<button class="btn" onclick={handleLoadJson}>Load JSON</button>
		<button class="btn" onclick={() => data.pageData.saveJson(root)}>Save JSON</button>
		<button class="btn" onclick={() => root = data.pageData.createNewJson()}>Create New JSON</button>
	</div>
</div>

{#if root}
	<BaseDescription {root} />

	<div class="form-container">
		<!-- All Contents -->
		<h2>Contents</h2>
		{#each root.content as c, i}
			<details class="collapsible-container">
				<summary class="collapsible-header">Content {i + 1}</summary>
				<div class="collapsible-content">
					<ContextChapterResources {c} {i} />
					<MainVideoSideTexts {c} {i} {videoElements} {data} {root} />
				</div>
			</details>
		{/each}
	</div>
{:else}
	<NothingLoaded />
{/if}
