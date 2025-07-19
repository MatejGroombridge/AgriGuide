<script>
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	let inputMode = 'manual'; // 'manual' or 'qr'
	let soilData = {
		ph: '',
		organicMatter: '',
		nitrogen: '',
		moisture: ''
	};

	function switchMode(mode) {
		inputMode = mode;
	}

	function handleSubmit() {
		// Validate all fields are filled
		if (!soilData.ph || !soilData.organicMatter || !soilData.nitrogen || !soilData.moisture) {
			alert('Please fill in all soil data fields');
			return;
		}

		// Store data in localStorage for recommendations page
		if (browser) {
			localStorage.setItem(
				'soilData',
				JSON.stringify({
					ph: parseFloat(soilData.ph),
					organicMatter: parseFloat(soilData.organicMatter),
					nitrogen: parseFloat(soilData.nitrogen),
					moisture: parseFloat(soilData.moisture)
				})
			);
		}

		// Navigate to recommendations
		goto('/recommendations');
	}

	function scanQRCode() {
		// Placeholder for QR code functionality
		alert('QR Code scanning functionality will be implemented in the future');
	}
</script>

<svelte:head>
	<title>AgriGuide - Home</title>
</svelte:head>

<div class="home-container">
	<h1>🌱 Soil Data Input</h1>
	<p>Enter your soil conditions to get personalized crop recommendations</p>

	<div class="mode-selector">
		<button
			class="mode-btn"
			class:active={inputMode === 'manual'}
			on:click={() => switchMode('manual')}
		>
			✏️ Manual Input
		</button>
		<button class="mode-btn" class:active={inputMode === 'qr'} on:click={() => switchMode('qr')}>
			📱 QR Code
		</button>
	</div>

	{#if inputMode === 'manual'}
		<div class="manual-input">
			<div class="input-group">
				<label for="ph">pH Level</label>
				<input
					id="ph"
					type="number"
					step="0.1"
					min="0"
					max="14"
					placeholder="6.5"
					bind:value={soilData.ph}
				/>
				<small>Typical range: 5.0 - 8.0</small>
			</div>

			<div class="input-group">
				<label for="organic">Organic Matter Content (%)</label>
				<input
					id="organic"
					type="number"
					step="0.1"
					min="0"
					max="100"
					placeholder="3.2"
					bind:value={soilData.organicMatter}
				/>
				<small>Typical range: 1.0 - 6.0%</small>
			</div>

			<div class="input-group">
				<label for="nitrogen">Nitrogen Content (ppm)</label>
				<input
					id="nitrogen"
					type="number"
					step="1"
					min="0"
					placeholder="80"
					bind:value={soilData.nitrogen}
				/>
				<small>Typical range: 20 - 200 ppm</small>
			</div>

			<div class="input-group">
				<label for="moisture">Moisture Level (%)</label>
				<input
					id="moisture"
					type="number"
					step="1"
					min="0"
					max="100"
					placeholder="65"
					bind:value={soilData.moisture}
				/>
				<small>Typical range: 20 - 90%</small>
			</div>

			<button class="btn submit-btn" on:click={handleSubmit}> Get Recommendations 🚀 </button>
		</div>
	{:else}
		<div class="qr-input">
			<div class="qr-scanner-placeholder">
				<div class="qr-icon">📱</div>
				<h3>QR Code Scanner</h3>
				<p>Position your device camera over the QR code to automatically input soil data</p>
				<button class="btn" on:click={scanQRCode}> Start Scanning </button>
			</div>
		</div>
	{/if}
</div>

<style>
	.home-container {
		max-width: 100%;
	}

	.mode-selector {
		display: flex;
		gap: 12px;
		margin-bottom: 24px;
		background: #f8f9fa;
		padding: 4px;
		border-radius: 12px;
	}

	.mode-btn {
		flex: 1;
		padding: 12px 16px;
		border: none;
		background: transparent;
		border-radius: 8px;
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		color: #666;
	}

	.mode-btn.active {
		background: #4caf50;
		color: white;
		box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
	}

	.manual-input {
		background: white;
		border-radius: 12px;
		padding: 24px;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
	}

	.input-group small {
		display: block;
		color: #888;
		font-size: 12px;
		margin-top: 4px;
	}

	.submit-btn {
		width: 100%;
		margin-top: 8px;
		font-size: 18px;
		padding: 16px;
	}

	.qr-input {
		background: white;
		border-radius: 12px;
		padding: 24px;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
	}

	.qr-scanner-placeholder {
		text-align: center;
		padding: 40px 20px;
	}

	.qr-icon {
		font-size: 64px;
		margin-bottom: 16px;
	}

	.qr-scanner-placeholder h3 {
		margin-bottom: 12px;
		color: #2c3e50;
	}

	.qr-scanner-placeholder p {
		color: #666;
		margin-bottom: 24px;
		line-height: 1.5;
	}
</style>
