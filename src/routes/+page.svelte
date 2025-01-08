<script lang="ts">
	import type { PageData } from './$types';
	import type { Root as RootJson } from './wapJson';

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

	<div class="form-container">
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
					<div class="video-container mb-2">
						<label for="video-url-{i}" class="block mb-1">VIDEO-URL:</label>
						<input
							id="video-url-{i}"
							type="url"
							bind:value={c.mainvideo}
							class="w-full p-2 border rounded"
						/>

						<label for="videoFile-{i}" class="block mb-1">Upload Video:</label>
						<input
							type="file"
							id="videoFile-{i}"
							class="file_multi_video mb-2"
							accept="video/*"
							onchange={() => data.pageData.handleVideoUpload(i, root)}
						/>

						<video 
							id="vplayer-{i}" 
							width="400" 
							controls 
							class="mt-2"
							bind:this={videoElements[i]}
						>
							<track
								kind="captions"
								src="media/captions.vtt"
								label="Deutsch"
								srclang="de"
								default
							/>
							Your browser does not support the video tag.
						</video>
					</div>

					<!-- Side Texts -->
					<div class="mb-2">
						<h3>Side Texts</h3>
						<div id="sidetexts-{i}">
							{#each c.sidetexts as sidetext, i}
								<div class="sidetext-container">
									<div class="sidetext-inputs-row">
										<div class="sidetext-input-group">
											<label for="sidetext-no-{i}">Number:</label>
											<input
												id="sidetext-no-{i}"
												type="text"
												bind:value={sidetext.no}
											/>
										</div>
										<div class="sidetext-input-group">
											<label for="sidetext-start-{i}">Start Time:</label>
											<input
												id="sidetext-start-{i}"
												type="text"
												bind:value={sidetext.start}
											/>
										</div>
										<div class="sidetext-input-group">
											<label for="sidetext-end-{i}">End Time:</label>
											<input
												id="sidetext-end-{i}"
												type="text"
												bind:value={sidetext.end}
											/>
										</div>
									</div>
									<div>
										<label for="sidetext-text-{i}">Text:</label>
										<textarea
											id="sidetext-text-{i}"
											bind:value={sidetext.text}
											class="sidetext-textarea"
										></textarea>
									</div>
								</div>
								<hr class="rounded" />
							{/each}
							<button
								class="btn"
								onclick={() =>
									(c.sidetexts = [
										...c.sidetexts,
										{ start: '1', end: '1', no: c.sidetexts.length + 1, text: '' }
									])}
							>
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
	<div class="feather-container">
		<svg
			class="feather-icon"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
			<line x1="16" y1="8" x2="2" y2="22"></line>
			<line x1="17.5" y1="15" x2="9" y2="15"></line>
		</svg>
	</div>
{/if}
