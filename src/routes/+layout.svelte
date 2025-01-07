<script lang="ts">
	import '../app.css';

	let { children } = $props();

	// Hidden file input reference
	let fileInput: HTMLInputElement;

	// Trigger file input click
	function handleLoadJson() {
		fileInput.click();
	}
</script>

<header class="header">
	<div class="container">
		<div class="logo">
			<img src="feather_icon.png" alt="Logo" class="logo-icon" />
			<span class="logo-text">AuthoringToolz</span>
		</div>
		<div class="actions">
			<input 
				type="file" 
				accept=".json"
				bind:this={fileInput}
				onchange={(e) => {
					document.dispatchEvent(new CustomEvent('fileUpload', { detail: e }));
					// Clear the input value after dispatching the event
					(e.target as HTMLInputElement).value = '';
				}}
				style="display: none"
			/>
			<button class="btn" onclick={handleLoadJson}>Load JSON</button>
			<button class="btn">Save Json</button>
		</div>
	</div>
</header>

<div>

	<main>
		{@render children()}
	</main>

	<footer>
		<p style="text-align: center;">
			by Clemens, Manuel, Lucas, and Tobias
		</p>
	</footer>
</div>
