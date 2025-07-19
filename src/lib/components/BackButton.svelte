<script>
	import { goto } from '$app/navigation';

	export let href = null;
	export let text = 'Back';

	function handleBack() {
		if (href) {
			goto(href);
		} else {
			history.back();
		}
	}
</script>

<button class="back-button" on:click={handleBack}>
	<span class="back-icon">←</span>
</button>

<style>
	.back-button {
		position: fixed;
		top: 20px;
		left: 20px;
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		background: white;
		border: 2px solid #e1e5e9;
		border-radius: 50%;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}

	.back-button:hover {
		border-color: #4caf50;
		background: #f8fff8;
		box-shadow: 0 4px 15px rgba(76, 175, 80, 0.2);
		transform: translateY(-1px);
	}

	.back-icon {
		font-size: 24px;
		font-weight: bold;
		color: #2c3e50;
		transition: color 0.3s ease;
	}

	.back-button:hover .back-icon {
		color: #4caf50;
	}

	/* Desktop responsive adjustments */
	@media (min-width: 768px) {
		.back-button {
			top: 30px;
			left: 30px;
			width: 56px;
			height: 56px;
		}

		.back-icon {
			font-size: 28px;
		}
	}
</style>
