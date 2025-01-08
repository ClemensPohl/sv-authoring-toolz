<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<header class="header">
	<div class="container">
		<div class="logo">
			<img src="feather_icon.png" alt="Logo" class="logo-icon" />
			<span class="logo-text">AuthoringToolz</span>
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
