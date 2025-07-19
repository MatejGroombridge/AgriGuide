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
	{text}
</button>

<style>
	.back-button {
		display: flex;
		align-items: center;
		gap: 8px;
		background: none;
		border: 2px solid #e1e5e9;
		border-radius: 8px;
		padding: 8px 16px;
		font-size: 14px;
		font-weight: 600;
		color: #666;
		cursor: pointer;
		transition: all 0.3s ease;
		margin-bottom: 20px;
	}

	.back-button:hover {
		border-color: #4caf50;
		color: #4caf50;
		background: #f8fff8;
	}

	.back-icon {
		font-size: 16px;
	}
</style>
