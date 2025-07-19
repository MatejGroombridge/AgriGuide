<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { getRecommendations } from '$lib/data/crops.js';

	let soilData = null;
	let recommendations = [];
	let climateData = {
		temperature: 28,
		humidity: 75,
		rainfall: 145,
		season: 'Rainy Season'
	};

	onMount(() => {
		if (browser) {
			const stored = localStorage.getItem('soilData');
			if (stored) {
				soilData = JSON.parse(stored);
				recommendations = getRecommendations(soilData);
			}
		}
	});

	function formatMonth(daysToGrow, bestSellMonth) {
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
		const bestSellIndex = months.indexOf(bestSellMonth);
		const plantingMonthIndex = (bestSellIndex - Math.floor(daysToGrow / 30) + 12) % 12;
		return months[plantingMonthIndex];
	}
</script>

<svelte:head>
	<title>AgriGuide - Recommendations</title>
</svelte:head>

<div class="recommendations-container">
	<h1>🎯 Crop Recommendations</h1>

	{#if soilData}
		<!-- Soil Summary -->
		<div class="card summary-card">
			<h3>📊 Your Soil Conditions</h3>
			<div class="grid grid-2">
				<div class="soil-metric">
					<span class="metric-label">pH Level</span>
					<span class="metric-value">{soilData.ph}</span>
				</div>
				<div class="soil-metric">
					<span class="metric-label">Moisture</span>
					<span class="metric-value">{soilData.moisture}%</span>
				</div>
				<div class="soil-metric">
					<span class="metric-label">Nitrogen</span>
					<span class="metric-value">{soilData.nitrogen} ppm</span>
				</div>
				<div class="soil-metric">
					<span class="metric-label">Organic Matter</span>
					<span class="metric-value">{soilData.organicMatter}%</span>
				</div>
			</div>
		</div>

		<!-- Climate Summary -->
		<div class="card climate-card">
			<h3>🌤️ Current Climate</h3>
			<div class="grid grid-2">
				<div class="climate-metric">
					<span class="metric-label">Temperature</span>
					<span class="metric-value">{climateData.temperature}°C</span>
				</div>
				<div class="climate-metric">
					<span class="metric-label">Humidity</span>
					<span class="metric-value">{climateData.humidity}%</span>
				</div>
				<div class="climate-metric">
					<span class="metric-label">Rainfall</span>
					<span class="metric-value">{climateData.rainfall}mm</span>
				</div>
				<div class="climate-metric">
					<span class="metric-label">Season</span>
					<span class="metric-value">{climateData.season}</span>
				</div>
			</div>
		</div>

		<!-- Recommendations -->
		{#if recommendations.length > 0}
			<h2>✨ Recommended Crops</h2>
			<p class="recommendation-intro">
				Based on your soil and climate conditions, here are the best crops for your farm:
			</p>

			<div class="recommendations-list">
				{#each recommendations as crop, index}
					<a href="/crop/{crop.id}" class="recommendation-card">
						<div class="rank-badge">#{index + 1}</div>
						<div class="crop-icon">{crop.icon}</div>
						<div class="crop-info">
							<h3>{crop.name}</h3>
							<p class="crop-description">{crop.description}</p>
							<div class="crop-details">
								<div class="detail">
									<span class="detail-label">💰 Market Price</span>
									<span class="detail-value">${crop.marketPrice}/ton</span>
								</div>
								<div class="detail">
									<span class="detail-label">📅 Best to Plant</span>
									<span class="detail-value"
										>{formatMonth(crop.growthTime, crop.bestSellMonth)}</span
									>
								</div>
								<div class="detail">
									<span class="detail-label">⏱️ Growth Time</span>
									<span class="detail-value">{crop.growthTime} days</span>
								</div>
							</div>
						</div>
						<div class="arrow">▶</div>
					</a>
				{/each}
			</div>
		{:else}
			<div class="no-recommendations">
				<div class="no-rec-icon">🤔</div>
				<h3>No Perfect Matches</h3>
				<p>
					Your current soil conditions don't perfectly match our crop database. Consider soil
					amendments or visit our search page to explore all available crops.
				</p>
				<a href="/search" class="btn">Browse All Crops</a>
			</div>
		{/if}
	{:else}
		<div class="no-data">
			<div class="no-data-icon">📝</div>
			<h3>No Soil Data Found</h3>
			<p>
				Please go back to the home page and input your soil data to get personalized
				recommendations.
			</p>
			<a href="/" class="btn">Input Soil Data</a>
		</div>
	{/if}
</div>

<style>
	.recommendations-container {
		max-width: 100%;
	}

	.summary-card,
	.climate-card {
		margin-bottom: 20px;
	}

	.soil-metric,
	.climate-metric {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 12px;
		background: #f8f9fa;
		border-radius: 8px;
	}

	.metric-label {
		font-size: 12px;
		color: #666;
		margin-bottom: 4px;
		font-weight: 600;
	}

	.metric-value {
		font-size: 18px;
		font-weight: 700;
		color: #2c3e50;
	}

	.recommendation-intro {
		color: #666;
		margin-bottom: 24px;
		text-align: center;
	}

	.recommendations-list {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.recommendation-card {
		display: flex;
		align-items: center;
		padding: 20px;
		background: white;
		border-radius: 12px;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
		text-decoration: none;
		color: inherit;
		transition: all 0.3s ease;
		border: 2px solid transparent;
		position: relative;
		overflow: hidden;
	}

	.recommendation-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
		border-color: #4caf50;
	}

	.recommendation-card:first-child {
		border: 2px solid #4caf50;
		background: linear-gradient(135deg, #f8fff8 0%, #ffffff 100%);
	}

	.rank-badge {
		position: absolute;
		top: 12px;
		right: 12px;
		background: #4caf50;
		color: white;
		font-size: 12px;
		font-weight: 700;
		padding: 4px 8px;
		border-radius: 12px;
	}

	.crop-icon {
		font-size: 48px;
		margin-right: 16px;
		flex-shrink: 0;
	}

	.crop-info {
		flex: 1;
		min-width: 0;
	}

	.crop-info h3 {
		margin: 0 0 8px 0;
		font-size: 18px;
		color: #2c3e50;
	}

	.crop-description {
		margin: 0 0 12px 0;
		font-size: 14px;
		color: #666;
		line-height: 1.4;
	}

	.crop-details {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
	}

	.detail {
		display: flex;
		flex-direction: column;
		min-width: 80px;
	}

	.detail-label {
		font-size: 11px;
		color: #888;
		margin-bottom: 2px;
	}

	.detail-value {
		font-size: 12px;
		font-weight: 600;
		color: #2c3e50;
	}

	.arrow {
		color: #4caf50;
		font-size: 20px;
		margin-left: 12px;
	}

	.no-recommendations,
	.no-data {
		text-align: center;
		padding: 60px 20px;
		background: white;
		border-radius: 12px;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
	}

	.no-rec-icon,
	.no-data-icon {
		font-size: 64px;
		margin-bottom: 20px;
	}

	.no-recommendations h3,
	.no-data h3 {
		color: #2c3e50;
		margin-bottom: 16px;
	}

	.no-recommendations p,
	.no-data p {
		color: #666;
		margin-bottom: 24px;
		line-height: 1.6;
	}
</style>
