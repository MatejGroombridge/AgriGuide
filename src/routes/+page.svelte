<script>
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { onDestroy } from 'svelte';

	let inputMode = 'manual'; // 'manual' or 'qr'
	let soilData = {
		moisture: '',
		light: '',
		temperature: ''
	};

	function switchMode(mode) {
		inputMode = mode;
	}

	function handleSubmit() {
		// Validate all fields are filled
		if (!soilData.moisture || !soilData.light || !soilData.temperature) {
			alert('Please fill in all sensor data fields');
			return;
		}

		// Store data in localStorage for recommendations page
		if (browser) {
			localStorage.setItem(
				'soilData',
				JSON.stringify({
					ph: 6.5, // Default pH value since sensor was removed
					organicMatter: 3.0, // Default organic matter value since sensor was removed
					nitrogen: 80, // Default nitrogen value since sensor was removed
					moisture: parseFloat(soilData.moisture),
					light: parseFloat(soilData.light),
					temperature: parseFloat(soilData.temperature)
				})
			);
		}

		// Navigate to recommendations
		goto('/recommendations');
	}

	// QR code scanner logic using html5-qrcode
	let scanning = false;
	let qrResult = '';
	let html5QrCode;
	let qrCodeRegionId = 'qr-code-region';

	function parseQrData(qrString) {
		// Expected format: moisture:xx,light:xxxxxx,temperature:xx
		const regex = /^moisture:(\d+(?:\.\d+)?),light:(\d+(?:\.\d+)?),temperature:(-?\d+(?:\.\d+)?)$/;
		const match = qrString.match(regex);
		if (!match) return null;
		return {
			moisture: match[1],
			light: match[2],
			temperature: match[3]
		};
	}

	async function scanQRCode() {
		scanning = true;
		qrResult = '';
		if (browser) {
			const { Html5Qrcode } = await import('html5-qrcode');
			html5QrCode = new Html5Qrcode(qrCodeRegionId);
			try {
				await html5QrCode.start(
					{ facingMode: 'environment' },
					{
						fps: 10,
						qrbox: 250
					},
					(decodedText, decodedResult) => {
						const parsed = parseQrData(decodedText);
						if (parsed) {
							soilData.moisture = parsed.moisture;
							soilData.light = parsed.light;
							soilData.temperature = parsed.temperature;
							qrResult = decodedText;
							stopScanning();
						} else {
							qrResult = 'Invalid QR code format.';
						}
					}
				);
			} catch (err) {
				alert('Could not start QR scanner: ' + err.message);
				scanning = false;
			}
		}
	}

	async function stopScanning() {
		scanning = false;
		if (html5QrCode) {
			await html5QrCode.stop();
			html5QrCode.clear();
			html5QrCode = null;
		}
	}

	onDestroy(() => {
		if (html5QrCode) {
			html5QrCode.stop();
			html5QrCode.clear();
			html5QrCode = null;
		}
	});
</script>

<svelte:head>
	<title>AgriGuide - Home</title>
</svelte:head>

<div class="home-container">
	<h1><i class="fas fa-seedling"></i> Sensor Data Input</h1>
	<p>Enter your sensor readings to get personalised crop recommendations</p>

	<div class="mode-selector">
		<button
			class="mode-btn"
			class:active={inputMode === 'manual'}
			on:click={() => switchMode('manual')}
		>
			<i class="fas fa-edit"></i> Manual Input
		</button>
		<button class="mode-btn" class:active={inputMode === 'qr'} on:click={() => switchMode('qr')}>
			<i class="fas fa-qrcode"></i> QR Code
		</button>
	</div>

	{#if inputMode === 'manual'}
		<div class="manual-input">
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

			<div class="input-group">
				<label for="light">Light Intensity (lux)</label>
				<input
					id="light"
					type="number"
					step="100"
					min="0"
					placeholder="25000"
					bind:value={soilData.light}
				/>
				<small>Typical range: 10,000 - 50,000 lux</small>
			</div>

			<div class="input-group">
				<label for="temperature">Temperature (°C)</label>
				<input
					id="temperature"
					type="number"
					step="0.1"
					min="-10"
					max="50"
					placeholder="28.5"
					bind:value={soilData.temperature}
				/>
				<small>Typical range: 15 - 35°C</small>
			</div>

			<button class="btn submit-btn" on:click={handleSubmit}> Get Recommendations 🚀 </button>
		</div>
	{:else}
		<div class="qr-input">
			{#if !scanning}
				<div class="qr-scanner-placeholder">
					<div class="qr-icon"><i class="fas fa-mobile-alt fa-3x"></i></div>
					<h3>QR Code Scanner</h3>
					<p>Position your device camera over the QR code to automatically input sensor data</p>
					<button class="btn" on:click={scanQRCode}> Start Scanning </button>
				</div>
			{:else if scanning}
				<div class="qr-scanner-video">
					<div id={qrCodeRegionId} style="width:100%;max-width:400px;"></div>
					<p style="margin-top:12px;color:#666;">
						Camera active. Position the QR code within the frame.
					</p>
					<button class="btn" on:click={stopScanning}>Stop Scanning</button>
				</div>
			{/if}
			{#if qrResult}
				<div class="qr-result">
					<p><strong>QR Code Result:</strong> {qrResult}</p>
				</div>
			{/if}
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

	.qr-scanner-video {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	/* Desktop responsive adjustments */
	@media (min-width: 768px) {
		.home-container {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 40px;
			align-items: start;
		}

		.home-container h1,
		.home-container > p {
			grid-column: 1 / -1;
		}

		.mode-selector {
			grid-column: 1 / -1;
			max-width: 400px;
			margin: 0 auto 32px;
		}

		.manual-input,
		.qr-input {
			grid-column: 1 / -1;
			max-width: 600px;
			margin: 0 auto;
		}

		.manual-input .input-group {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 20px;
			align-items: start;
			margin-bottom: 24px;
		}

		.manual-input .input-group:nth-child(odd) {
			grid-column: 1;
		}

		.manual-input .input-group:nth-child(even) {
			grid-column: 2;
		}

		.submit-btn {
			grid-column: 1 / -1;
			max-width: 400px;
			margin: 24px auto 0;
		}

		.qr-scanner-placeholder {
			padding: 60px 40px;
		}

		.qr-icon {
			font-size: 96px;
		}
	}

	@media (min-width: 1024px) {
		.manual-input .input-group {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
