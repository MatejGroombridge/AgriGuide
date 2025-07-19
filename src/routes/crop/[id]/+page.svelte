<script>
	import { browser } from '$app/environment';
	import BackButton from '$lib/components/BackButton.svelte';

	export let data;
	$: ({ crop } = data);

	// Calculate when to start planting based on best sell month and growth time
	function calculatePlantingTime() {
		const months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];
		const bestSellIndex = months.indexOf(crop.bestSellMonth);
		const plantingMonthIndex = (bestSellIndex - Math.floor(crop.growthTime / 30) + 12) % 12;
		return months[plantingMonthIndex];
	}

	// Check why this crop was recommended (if coming from recommendations)
	function getRecommendationReason() {
		if (!browser) return null;

		const soilData = localStorage.getItem('soilData');
		if (!soilData) return null;

		const soil = JSON.parse(soilData);
		const req = crop.requirements;

		const isRecommended =
			soil.ph >= req.ph.min &&
			soil.ph <= req.ph.max &&
			soil.moisture >= req.moisture.min &&
			soil.moisture <= req.moisture.max &&
			soil.nitrogen >= req.nitrogen.min &&
			soil.nitrogen <= req.nitrogen.max &&
			soil.organicMatter >= req.organicMatter.min &&
			soil.organicMatter <= req.organicMatter.max;

		if (!isRecommended) return null;

		return {
			suitable: true,
			highPrice: crop.marketPrice > 400,
			reasons: []
		};
	}

	$: recommendationReason = getRecommendationReason();
	$: plantingMonth = calculatePlantingTime();
</script>

<svelte:head>
	<title>AgriGuide - {crop.name}</title>
</svelte:head>

<div class="crop-container">
	<BackButton />

	<!-- Crop Header -->
	<div class="crop-header">
		<div class="crop-image-placeholder">
			<div class="crop-icon-large">{crop.icon}</div>
		</div>
		<div class="crop-title">
			<h1>{crop.name}</h1>
			<p class="crop-subtitle">{crop.description}</p>
		</div>
	</div>

	<!-- Key Metrics -->
	<div class="card metrics-card">
		<h3>📊 Key Information</h3>
		<div class="metrics-grid">
			<div class="metric">
				<span class="metric-icon">💰</span>
				<div class="metric-info">
					<span class="metric-label">Market Price</span>
					<span class="metric-value">${crop.marketPrice}/ton</span>
				</div>
			</div>
			<div class="metric">
				<span class="metric-icon">📅</span>
				<div class="metric-info">
					<span class="metric-label">Best Sell Time</span>
					<span class="metric-value">{crop.bestSellMonth}</span>
				</div>
			</div>
			<div class="metric">
				<span class="metric-icon">⏱️</span>
				<div class="metric-info">
					<span class="metric-label">Growth Period</span>
					<span class="metric-value">{crop.growthTime} days</span>
				</div>
			</div>
			<div class="metric">
				<span class="metric-icon">🌱</span>
				<div class="metric-info">
					<span class="metric-label">Plant in</span>
					<span class="metric-value">{plantingMonth}</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Why Recommended -->
	{#if recommendationReason}
		<div class="card recommendation-card">
			<h3>✨ Why This Crop is Recommended</h3>
			<div class="recommendation-content">
				<div class="recommendation-item">
					<span class="rec-icon">🎯</span>
					<div>
						<strong>Perfect Soil Match</strong>
						<p>Your soil conditions are ideal for growing {crop.name.toLowerCase()}.</p>
					</div>
				</div>
				{#if recommendationReason.highPrice}
					<div class="recommendation-item">
						<span class="rec-icon">💎</span>
						<div>
							<strong>High Market Value</strong>
							<p>This crop commands premium prices in the market, maximizing your profits.</p>
						</div>
					</div>
				{/if}
				<div class="recommendation-item">
					<span class="rec-icon">🌍</span>
					<div>
						<strong>Climate Suitable</strong>
						<p>Current weather conditions favor the growth of this crop.</p>
					</div>
				</div>
			</div>
		</div>
	{/if}

	<!-- Soil Requirements -->
	<div class="card requirements-card">
		<h3>🌱 Soil Requirements</h3>
		<div class="requirements-grid">
			<div class="requirement">
				<span class="req-label">pH Level</span>
				<span class="req-range">{crop.requirements.ph.min} - {crop.requirements.ph.max}</span>
			</div>
			<div class="requirement">
				<span class="req-label">Moisture</span>
				<span class="req-range"
					>{crop.requirements.moisture.min}% - {crop.requirements.moisture.max}%</span
				>
			</div>
			<div class="requirement">
				<span class="req-label">Nitrogen</span>
				<span class="req-range"
					>{crop.requirements.nitrogen.min} - {crop.requirements.nitrogen.max} ppm</span
				>
			</div>
			<div class="requirement">
				<span class="req-label">Organic Matter</span>
				<span class="req-range"
					>{crop.requirements.organicMatter.min}% - {crop.requirements.organicMatter.max}%</span
				>
			</div>
		</div>
	</div>

	<!-- Farming Tips -->
	<div class="card tips-card">
		<h3>💡 Farming Tips</h3>

		<div class="tip-section">
			<h4>🌱 Pre-Harvest Tips</h4>
			<p>{crop.preHarvestTips}</p>
		</div>

		<div class="tip-section">
			<h4>📦 Post-Harvest Tips</h4>
			<p>{crop.postHarvestTips}</p>
		</div>

		<div class="tip-section">
			<h4>🛡️ Pest Control</h4>
			<p>{crop.pesticides}</p>
		</div>
	</div>

	<!-- Timing Information -->
	<div class="card timing-card">
		<h3>📅 Timing Guide</h3>
		<div class="timing-info">
			<div class="timing-item">
				<span class="timing-icon">🌱</span>
				<div>
					<strong>Best Planting Time</strong>
					<p>Start planting in <strong>{plantingMonth}</strong> for optimal results</p>
				</div>
			</div>
			<div class="timing-item">
				<span class="timing-icon">📈</span>
				<div>
					<strong>Best Selling Time</strong>
					<p>Market prices peak in <strong>{crop.bestSellMonth}</strong></p>
				</div>
			</div>
			<div class="timing-item">
				<span class="timing-icon">⏰</span>
				<div>
					<strong>Growth Duration</strong>
					<p>
						Expect harvest after <strong
							>{Math.floor(crop.growthTime / 30)} months and {crop.growthTime % 30} days</strong
						>
					</p>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.crop-container {
		max-width: 100%;
	}

	.crop-header {
		text-align: center;
		margin-bottom: 24px;
	}

	.crop-image-placeholder {
		width: 120px;
		height: 120px;
		margin: 0 auto 16px;
		background: linear-gradient(135deg, #4caf50, #45a049);
		border-radius: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 20px rgba(76, 175, 80, 0.3);
	}

	.crop-icon-large {
		font-size: 64px;
	}

	.crop-title h1 {
		margin: 0 0 8px 0;
		color: #2c3e50;
	}

	.crop-subtitle {
		color: #666;
		font-size: 16px;
		line-height: 1.5;
		margin: 0;
	}

	.metrics-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
	}

	.metric {
		display: flex;
		align-items: center;
		padding: 12px;
		background: #f8f9fa;
		border-radius: 8px;
	}

	.metric-icon {
		font-size: 24px;
		margin-right: 12px;
	}

	.metric-info {
		display: flex;
		flex-direction: column;
	}

	.metric-label {
		font-size: 12px;
		color: #666;
		margin-bottom: 2px;
	}

	.metric-value {
		font-size: 14px;
		font-weight: 600;
		color: #2c3e50;
	}

	.recommendation-content {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.recommendation-item {
		display: flex;
		align-items: flex-start;
		gap: 12px;
	}

	.rec-icon {
		font-size: 24px;
		flex-shrink: 0;
	}

	.recommendation-item strong {
		display: block;
		color: #2c3e50;
		margin-bottom: 4px;
	}

	.recommendation-item p {
		margin: 0;
		color: #666;
		font-size: 14px;
		line-height: 1.4;
	}

	.requirements-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
	}

	.requirement {
		display: flex;
		flex-direction: column;
		padding: 12px;
		background: #f8f9fa;
		border-radius: 8px;
		text-align: center;
	}

	.req-label {
		font-size: 12px;
		color: #666;
		margin-bottom: 4px;
		font-weight: 600;
	}

	.req-range {
		font-size: 14px;
		font-weight: 600;
		color: #4caf50;
	}

	.tip-section {
		margin-bottom: 20px;
	}

	.tip-section:last-child {
		margin-bottom: 0;
	}

	.tip-section h4 {
		margin: 0 0 8px 0;
		color: #2c3e50;
		font-size: 16px;
	}

	.tip-section p {
		margin: 0;
		color: #666;
		line-height: 1.5;
	}

	.timing-info {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.timing-item {
		display: flex;
		align-items: flex-start;
		gap: 12px;
	}

	.timing-icon {
		font-size: 24px;
		flex-shrink: 0;
	}

	.timing-item strong {
		display: block;
		color: #2c3e50;
		margin-bottom: 4px;
	}

	.timing-item p {
		margin: 0;
		color: #666;
		font-size: 14px;
		line-height: 1.4;
	}

	@media (max-width: 480px) {
		.metrics-grid,
		.requirements-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
