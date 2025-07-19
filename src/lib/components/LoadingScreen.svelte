<script>
	export let isVisible = true;
	let fadeOut = false;
	let shouldShow = true;

	// Trigger fade out when isVisible becomes false
	$: if (!isVisible && !fadeOut) {
		fadeOut = true;
		// Hide component completely after fade animation
		setTimeout(() => {
			shouldShow = false;
		}, 500); // Match the fadeOut animation duration
	}
</script>

{#if shouldShow}
	<div class="loading-screen" class:fade-out={fadeOut}>
		<div class="loading-content">
			<div class="logo-container">
				<img src="/images/logo.png" alt="AgriGuide Logo" class="logo" />
			</div>
			<div class="loading-spinner">
				<div class="spinner"></div>
			</div>
			<p class="loading-text">Loading AgriGuide...</p>
		</div>
	</div>
{/if}

<style>
	.loading-screen {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;
		animation: fadeIn 0.3s ease-in;
	}

	.loading-content {
		text-align: center;
		color: white;
	}

	.logo-container {
		margin-bottom: 32px;
		animation: logoFloat 2s ease-in-out infinite alternate;
	}

	.logo {
		max-width: 200px;
		max-height: 200px;
		width: auto;
		height: auto;
		filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.3));
	}

	.loading-spinner {
		margin: 24px auto;
		display: flex;
		justify-content: center;
	}

	.spinner {
		width: 40px;
		height: 40px;
		border: 4px solid rgba(255, 255, 255, 0.3);
		border-top: 4px solid white;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	.loading-text {
		font-size: 18px;
		font-weight: 500;
		margin: 0;
		opacity: 0.9;
		animation: pulse 1.5s ease-in-out infinite;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes logoFloat {
		from {
			transform: translateY(0px);
		}
		to {
			transform: translateY(-10px);
		}
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 0.7;
		}
		50% {
			opacity: 1;
		}
	}

	/* Desktop responsive adjustments */
	@media (min-width: 768px) {
		.logo {
			max-width: 250px;
			max-height: 250px;
		}

		.loading-text {
			font-size: 20px;
		}

		.spinner {
			width: 50px;
			height: 50px;
		}
	}

	/* Fade out animation */
	.loading-screen.fade-out {
		animation: fadeOut 0.5s ease-out forwards;
	}

	@keyframes fadeOut {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}
</style>
