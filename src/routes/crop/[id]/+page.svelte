<script>
	import { browser } from '$app/environment';
	import BackButton from '$lib/components/BackButton.svelte';
	import { convertAndFormatPrice } from '$lib/utils/currency.js';

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

	// Tab management for farming tips
	let activeTab = 'preHarvest';

	function setActiveTab(tab) {
		activeTab = tab;
	}
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
		</div>
	</div>

	<!-- Crop Description -->
	<div class="card description-card">
		<h3>� About This Crop</h3>
		<div class="description-content">
			<p>{crop.description}</p>
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
							<p>This crop commands premium prices in the market, maximising your profits.</p>
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
		<h3>💡 Comprehensive Farming Guide</h3>

		<!-- Tab Navigation -->
		<div class="tab-navigation">
			<button
				class="tab-button"
				class:active={activeTab === 'preHarvest'}
				on:click={() => setActiveTab('preHarvest')}
			>
				<span class="tab-icon">🌱</span>
				<span class="tab-text">Pre-Harvest</span>
			</button>
			<button
				class="tab-button"
				class:active={activeTab === 'growing'}
				on:click={() => setActiveTab('growing')}
			>
				<span class="tab-icon">🌿</span>
				<span class="tab-text">Growing</span>
			</button>
			<button
				class="tab-button"
				class:active={activeTab === 'postHarvest'}
				on:click={() => setActiveTab('postHarvest')}
			>
				<span class="tab-icon">📦</span>
				<span class="tab-text">Post-Harvest</span>
			</button>
			<button
				class="tab-button"
				class:active={activeTab === 'pestControl'}
				on:click={() => setActiveTab('pestControl')}
			>
				<span class="tab-icon">🛡️</span>
				<span class="tab-text">Pest Control</span>
			</button>
		</div>

		<!-- Tab Content -->
		<div class="tab-content">
			{#if activeTab === 'preHarvest'}
				<div class="tip-content">
					<h4>🌱 Pre-Harvest Preparation</h4>
					<p>{crop.farmingTips.preHarvest}</p>
				</div>
			{:else if activeTab === 'growing'}
				<div class="tip-content">
					<h4>🌿 Growing Stage Management</h4>
					<p>{crop.farmingTips.growing}</p>
				</div>
			{:else if activeTab === 'postHarvest'}
				<div class="tip-content">
					<h4>📦 Post-Harvest Handling</h4>
					<p>{crop.farmingTips.postHarvest}</p>
				</div>
			{:else if activeTab === 'pestControl'}
				<div class="tip-content">
					<h4>🛡️ Pest & Disease Control</h4>
					<p>{crop.farmingTips.pestControl}</p>
				</div>
			{/if}
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
		padding-top: 80px; /* Add space for fixed back button */
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

	.description-content {
		line-height: 1.7;
	}

	.description-content p {
		margin: 0;
		color: #2c3e50;
		font-size: 15px;
		text-align: justify;
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

	/* Tabbed Tips Styles */
	.tab-navigation {
		display: flex;
		border-bottom: 2px solid #e1e5e9;
		margin-bottom: 20px;
		overflow-x: auto;
	}

	.tab-button {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 12px 8px;
		background: none;
		border: none;
		cursor: pointer;
		transition: all 0.3s ease;
		border-bottom: 3px solid transparent;
		min-width: 80px;
	}

	.tab-button:hover {
		background: #f8f9fa;
	}

	.tab-button.active {
		border-bottom-color: #4caf50;
		background: #f8fff8;
	}

	.tab-icon {
		font-size: 24px;
		margin-bottom: 4px;
	}

	.tab-text {
		font-size: 12px;
		font-weight: 600;
		color: #666;
		text-align: center;
	}

	.tab-button.active .tab-text {
		color: #4caf50;
	}

	.tab-content {
		min-height: 200px;
	}

	.tip-content h4 {
		margin: 0 0 12px 0;
		color: #2c3e50;
		font-size: 18px;
	}

	.tip-content p {
		margin: 0;
		color: #555;
		line-height: 1.6;
		text-align: justify;
	}

	.timing-info {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.timing-item {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.timing-icon {
		font-size: 24px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
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
		.requirements-grid {
			grid-template-columns: 1fr;
		}
	}

	/* Desktop responsive adjustments */
	@media (min-width: 768px) {
		.crop-container {
			max-width: 900px;
			margin: 0 auto;
			padding-top: 100px; /* More space for larger fixed back button */
		}

		.crop-header {
			margin-bottom: 40px;
		}

		.crop-image-placeholder {
			width: 160px;
			height: 160px;
			margin-bottom: 24px;
		}

		.crop-icon-large {
			font-size: 80px;
		}

		.crop-title h1 {
			font-size: 36px;
		}

		.description-content p {
			font-size: 16px;
			line-height: 1.8;
		}

		.recommendation-content {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 24px;
		}

		.recommendation-item {
			flex-direction: column;
			text-align: center;
			background: #f8f9fa;
			padding: 20px;
			border-radius: 12px;
		}

		.rec-icon {
			font-size: 32px;
			margin-bottom: 12px;
		}

		.requirements-grid {
			grid-template-columns: repeat(4, 1fr);
			gap: 16px;
		}

		.requirement {
			padding: 16px;
		}

		.tab-button {
			flex-direction: row;
			padding: 16px 20px;
			gap: 8px;
		}

		.tab-icon {
			font-size: 20px;
			margin-bottom: 0;
		}

		.tab-text {
			font-size: 14px;
		}

		.tip-content h4 {
			font-size: 20px;
		}

		.tip-content p {
			font-size: 15px;
			line-height: 1.7;
		}

		.timing-info {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 24px;
		}

		.timing-item {
			flex-direction: column;
			text-align: center;
			background: #f8f9fa;
			padding: 20px;
			border-radius: 12px;
			align-items: center;
			justify-content: center;
			min-height: 120px;
		}

		.timing-icon {
			font-size: 32px;
			margin-bottom: 12px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	@media (min-width: 1024px) {
		.crop-container {
			max-width: 1100px;
			padding-top: 100px; /* Maintain consistent spacing */
		}

		.recommendation-content {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
