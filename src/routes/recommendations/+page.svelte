<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { getRecommendations } from '$lib/data/crops.js';
	import { convertAndFormatPrice } from '$lib/utils/currency.js';

	let soilData = null;
	let recommendations = [];
	let climateData = {
		temperature: null,
		humidity: null,
		rainfall: null,
		season: 'Loading...'
	};
	let weatherWarnings = [];
	let loadingWeather = true;

	// Default to Vientiane, Laos coordinates
	const defaultLocation = { lat: 17.9757, lon: 102.6331 };

	async function getUserLocation() {
		if (browser && navigator.geolocation) {
			return new Promise((resolve) => {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						const userLat = position.coords.latitude;
						const userLon = position.coords.longitude;

						// Check if user is in Laos (approximate bounds)
						if (userLat >= 13.9 && userLat <= 22.5 && userLon >= 100.0 && userLon <= 107.7) {
							resolve({
								lat: userLat,
								lon: userLon
							});
						} else {
							// User outside Laos, default to Vientiane
							resolve(defaultLocation);
						}
					},
					(error) => {
						console.log('Geolocation not available, using Vientiane default');
						resolve(defaultLocation);
					},
					{ timeout: 5000 }
				);
			});
		}
		return defaultLocation;
	}

	async function fetchWeatherData() {
		try {
			const location = await getUserLocation();

			// Free weather API - no key required
			const currentResponse = await fetch(
				`https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code&timezone=Asia/Vientiane&forecast_days=7`
			);

			if (currentResponse.ok) {
				const weatherData = await currentResponse.json();
				updateClimateData(weatherData);
				generateWeatherWarnings(weatherData);
			}
		} catch (error) {
			console.error('Failed to fetch weather:', error);
			// Fallback to default values
			climateData = {
				temperature: 28,
				humidity: 75,
				rainfall: 145,
				season: 'Unable to load'
			};
		} finally {
			loadingWeather = false;
		}
	}

	function updateClimateData(weatherData) {
		const current = weatherData.current;
		const daily = weatherData.daily;

		// Calculate average rainfall from daily data
		const avgRainfall =
			daily.precipitation_sum.reduce((sum, rain) => sum + rain, 0) / daily.precipitation_sum.length;

		// Determine season based on current month and rainfall
		const currentMonth = new Date().getMonth() + 1;
		let season;
		if (currentMonth >= 5 && currentMonth <= 10) {
			season = avgRainfall > 50 ? 'Rainy Season' : 'Wet Season';
		} else {
			season = 'Dry Season';
		}

		climateData = {
			temperature: Math.round(current.temperature_2m),
			humidity: Math.round(current.relative_humidity_2m),
			rainfall: Math.round(avgRainfall),
			season: season
		};
	}

	function generateWeatherWarnings(weatherData) {
		const warnings = [];
		const daily = weatherData.daily;

		// Check next 5 days for weather warnings
		for (let i = 0; i < Math.min(5, daily.time.length); i++) {
			const date = new Date(daily.time[i]).toLocaleDateString();
			const maxTemp = daily.temperature_2m_max[i];
			const minTemp = daily.temperature_2m_min[i];
			const rainfall = daily.precipitation_sum[i];
			const weatherCode = daily.weather_code[i];

			// Heavy rain warning (>20mm per day)
			if (rainfall > 20) {
				warnings.push({
					type: 'heavy_rain',
					severity: rainfall > 50 ? 'high' : 'medium',
					message: `Heavy rainfall expected (${Math.round(rainfall)}mm)`,
					date: date,
					affectedCrops: recommendations.filter((crop) =>
						['tomatoes', 'peppers', 'beans', 'leafy greens'].includes(crop.name.toLowerCase())
					),
					advice: 'Ensure proper drainage, avoid planting in low areas'
				});
			}

			// Storm warning (weather codes 95-99 are thunderstorms)
			if (weatherCode >= 95 && weatherCode <= 99) {
				warnings.push({
					type: 'storm',
					severity: 'high',
					message: 'Thunderstorms expected',
					date: date,
					affectedCrops: recommendations.filter((crop) =>
						['tomatoes', 'peppers', 'leafy greens', 'herbs'].includes(crop.name.toLowerCase())
					),
					advice: 'Delay planting until weather stabilizes, protect existing crops'
				});
			}

			// Extreme heat warning (>35°C)
			if (maxTemp > 35) {
				warnings.push({
					type: 'heat',
					severity: 'medium',
					message: `Extreme heat expected (${Math.round(maxTemp)}°C)`,
					date: date,
					affectedCrops: recommendations.filter((crop) =>
						['leafy greens', 'herbs'].includes(crop.category)
					),
					advice: 'Provide shade cover, increase watering frequency'
				});
			}

			// Drought warning (no rain for extended period and high temp)
			if (rainfall < 1 && maxTemp > 32) {
				warnings.push({
					type: 'drought',
					severity: 'medium',
					message: 'Hot and dry conditions',
					date: date,
					affectedCrops: recommendations,
					advice: 'Ensure adequate irrigation, consider mulching'
				});
			}
		}

		// Remove duplicates and limit to most severe warnings
		weatherWarnings = warnings
			.filter(
				(warning, index, self) =>
					index === self.findIndex((w) => w.type === warning.type && w.date === warning.date)
			)
			.sort((a, b) => {
				const severityOrder = { high: 3, medium: 2, low: 1 };
				return severityOrder[b.severity] - severityOrder[a.severity];
			})
			.slice(0, 5); // Limit to 5 most important warnings
	}

	onMount(() => {
		if (browser) {
			const stored = localStorage.getItem('soilData');
			if (stored) {
				soilData = JSON.parse(stored);
				recommendations = getRecommendations(soilData);
			}
			fetchWeatherData();
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
			{#if loadingWeather}
				<div class="loading-state">
					<div class="loading-spinner"></div>
					<p>Loading weather data...</p>
				</div>
			{:else}
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
			{/if}
		</div>

		<!-- Weather Warnings -->
		{#if weatherWarnings.length > 0}
			<div class="card weather-warnings">
				<h3>⚠️ Weather Alerts</h3>
				<p class="warnings-intro">
					Based on upcoming weather conditions, here are important warnings for your crops:
				</p>

				<div class="warnings-list">
					{#each weatherWarnings as warning}
						<div
							class="warning-card"
							class:high-severity={warning.severity === 'high'}
							class:medium-severity={warning.severity === 'medium'}
						>
							<div class="warning-header">
								<span class="warning-icon">
									{#if warning.type === 'storm'}⛈️
									{:else if warning.type === 'heavy_rain'}🌧️
									{:else if warning.type === 'heat'}🌡️
									{:else if warning.type === 'drought'}☀️
									{:else}⚠️{/if}
								</span>
								<div class="warning-content">
									<h4>{warning.message}</h4>
									<span class="warning-date">{warning.date}</span>
								</div>
							</div>

							{#if warning.affectedCrops.length > 0}
								<div class="affected-crops">
									<strong>Affected crops:</strong>
									<div class="crops-list">
										{#each warning.affectedCrops.slice(0, 3) as crop}
											<span class="crop-tag">{crop.name}</span>
										{/each}
										{#if warning.affectedCrops.length > 3}
											<span class="crop-tag more">+{warning.affectedCrops.length - 3} more</span>
										{/if}
									</div>
									<p class="advice">{warning.advice}</p>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		{/if}

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
									<span class="detail-value">{convertAndFormatPrice(crop.marketPrice)}/ton</span>
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
	.climate-card,
	.weather-warnings {
		margin-bottom: 20px;
	}

	.loading-state {
		text-align: center;
		padding: 40px 20px;
	}

	.loading-spinner {
		width: 40px;
		height: 40px;
		border: 4px solid #f3f3f3;
		border-top: 4px solid #4caf50;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin: 0 auto 16px;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.loading-state p {
		color: #666;
		margin: 0;
	}

	.weather-warnings {
		background: #fff8e1;
		border-left: 4px solid #ff9800;
	}

	.weather-warnings h3 {
		color: #e65100;
		margin-bottom: 8px;
	}

	.warnings-intro {
		color: #bf360c;
		font-size: 14px;
		margin-bottom: 16px;
	}

	.warnings-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.warning-card {
		background: white;
		border-radius: 8px;
		padding: 16px;
		border-left: 4px solid #ffc107;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.warning-card.high-severity {
		border-left-color: #f44336;
		background: #ffebee;
	}

	.warning-card.medium-severity {
		border-left-color: #ff9800;
		background: #fff3e0;
	}

	.warning-header {
		display: flex;
		align-items: flex-start;
		gap: 12px;
		margin-bottom: 12px;
	}

	.warning-icon {
		font-size: 24px;
		flex-shrink: 0;
	}

	.warning-content {
		flex: 1;
	}

	.warning-content h4 {
		margin: 0 0 4px 0;
		color: #d84315;
		font-size: 16px;
	}

	.warning-date {
		font-size: 12px;
		color: #666;
		font-weight: 500;
	}

	.affected-crops {
		background: #f5f5f5;
		padding: 12px;
		border-radius: 4px;
	}

	.affected-crops strong {
		display: block;
		margin-bottom: 8px;
		color: #333;
		font-size: 14px;
	}

	.crops-list {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-bottom: 8px;
	}

	.crop-tag {
		background: #e3f2fd;
		color: #1976d2;
		padding: 4px 8px;
		border-radius: 12px;
		font-size: 12px;
		font-weight: 500;
	}

	.crop-tag.more {
		background: #f5f5f5;
		color: #666;
	}

	.advice {
		margin: 0;
		font-size: 13px;
		color: #555;
		font-style: italic;
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

	/* Desktop responsive adjustments */
	@media (min-width: 768px) {
		.recommendations-container {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 30px;
			align-items: start;
		}

		.recommendations-container h1 {
			grid-column: 1 / -1;
			text-align: center;
		}

		.summary-card,
		.climate-card,
		.weather-warnings {
			margin-bottom: 0;
		}

		.recommendation-intro {
			grid-column: 1 / -1;
			font-size: 18px;
			margin: 20px 0 30px;
		}

		.recommendations-list {
			grid-column: 1 / -1;
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
			gap: 20px;
		}

		.recommendation-card {
			flex-direction: column;
			text-align: center;
			padding: 30px;
		}

		.crop-icon {
			font-size: 64px;
			margin-right: 0;
			margin-bottom: 16px;
		}

		.crop-info h3 {
			font-size: 22px;
			margin-bottom: 12px;
		}

		.crop-description {
			font-size: 16px;
			margin-bottom: 20px;
		}

		.crop-details {
			justify-content: center;
			gap: 20px;
		}

		.detail {
			min-width: 100px;
		}

		.arrow {
			display: none;
		}

		.no-recommendations,
		.no-data {
			grid-column: 1 / -1;
			max-width: 600px;
			margin: 0 auto;
		}
	}

	@media (min-width: 1024px) {
		.recommendations-list {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
