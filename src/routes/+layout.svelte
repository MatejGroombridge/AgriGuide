<script>
	import Navigation from '$lib/components/Navigation.svelte';
</script>

<main class="app">
	<div class="content">
		<slot />
	</div>
	<Navigation />
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		background: #f8f9fa;
		color: #333;
	}

	:global(*) {
		box-sizing: border-box;
	}

	.app {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		max-width: 480px;
		margin: 0 auto;
		background: #fff;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
	}

	.content {
		flex: 1;
		padding: 20px 20px 100px 20px; /* Bottom padding for navbar */
		overflow-y: auto;
	}

	:global(h1) {
		font-size: 28px;
		font-weight: 700;
		margin: 0 0 20px 0;
		color: #2c3e50;
	}

	:global(h2) {
		font-size: 22px;
		font-weight: 600;
		margin: 0 0 16px 0;
		color: #34495e;
	}

	:global(h3) {
		font-size: 18px;
		font-weight: 600;
		margin: 0 0 12px 0;
		color: #34495e;
	}

	:global(p) {
		line-height: 1.6;
		margin: 0 0 16px 0;
		color: #555;
	}

	:global(.btn) {
		background: #4caf50;
		color: white;
		border: none;
		padding: 12px 24px;
		border-radius: 8px;
		font-size: 16px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		display: inline-block;
		text-decoration: none;
		text-align: center;
	}

	:global(.btn:hover) {
		background: #45a049;
		transform: translateY(-1px);
	}

	:global(.btn:active) {
		transform: translateY(0);
	}

	:global(.btn-secondary) {
		background: #6c757d;
	}

	:global(.btn-secondary:hover) {
		background: #5a6268;
	}

	:global(.input-group) {
		margin-bottom: 20px;
	}

	:global(.input-group label) {
		display: block;
		margin-bottom: 6px;
		font-weight: 600;
		color: #555;
	}

	:global(.input-group input) {
		width: 100%;
		padding: 12px;
		border: 2px solid #e1e5e9;
		border-radius: 8px;
		font-size: 16px;
		transition: border-color 0.3s ease;
	}

	:global(.input-group input:focus) {
		outline: none;
		border-color: #4caf50;
	}

	:global(.card) {
		background: white;
		border-radius: 12px;
		padding: 20px;
		margin-bottom: 16px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		border: 1px solid #e1e5e9;
	}

	:global(.grid) {
		display: grid;
		gap: 16px;
	}

	:global(.grid-2) {
		grid-template-columns: 1fr 1fr;
	}
</style>
