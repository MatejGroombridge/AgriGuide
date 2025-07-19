<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Navigation from '$lib/components/Navigation.svelte';
	import LoadingScreen from '$lib/components/LoadingScreen.svelte';

	let showLoading = true;

	onMount(() => {
		if (browser) {
			// Check if user has visited before
			const hasVisited = localStorage.getItem('agriguide-visited');

			if (hasVisited) {
				// Returning user - shorter loading time
				setTimeout(() => {
					showLoading = false;
				}, 800);
			} else {
				// First-time user - full loading experience
				localStorage.setItem('agriguide-visited', 'true');
				setTimeout(() => {
					showLoading = false;
				}, 2500);
			}
		}
	});
</script>

<LoadingScreen isVisible={showLoading} />

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
		font-family: 'Lato', sans-serif;
		@import url('/static/fonts/lato.css');
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

	/* Desktop responsive adjustments */
	@media (min-width: 768px) {
		.app {
			max-width: 1200px;
			margin: 20px auto;
			border-radius: 12px;
		}

		.content {
			padding: 40px 60px 120px 60px;
		}
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

	/* Additional responsive grid classes */
	@media (min-width: 768px) {
		:global(.grid-3) {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 20px;
		}

		:global(.grid-4) {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			gap: 20px;
		}

		:global(.btn) {
			padding: 14px 28px;
			font-size: 18px;
		}

		:global(h1) {
			font-size: 36px;
		}

		:global(h2) {
			font-size: 28px;
		}

		:global(h3) {
			font-size: 22px;
		}
	}
</style>
