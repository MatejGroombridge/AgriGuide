<script>
	import { crops, searchCrops } from '$lib/data/crops.js';
	import { convertAndFormatPrice } from '$lib/utils/currency.js';

	let searchQuery = '';
	let filteredCrops = crops;

	$: {
		filteredCrops = searchCrops(searchQuery);
	}

	function clearSearch() {
		searchQuery = '';
	}
</script>

<svelte:head>
	<title>AgriGuide - Search Crops</title>
</svelte:head>

<div class="search-container">
	<h1>🔍 Search Crops</h1>
	<p>Discover crops suitable for your region and farming conditions</p>

	<div class="search-box">
		<div class="search-input-wrapper">
			<input
				type="text"
				placeholder="Search for crops..."
				bind:value={searchQuery}
				class="search-input"
			/>
			{#if searchQuery}
				<button class="clear-btn" on:click={clearSearch}>✕</button>
			{/if}
		</div>
	</div>

	<div class="results-info">
		<span class="results-count">
			{filteredCrops.length} crop{filteredCrops.length !== 1 ? 's' : ''} found
		</span>
		{#if searchQuery}
			<span class="search-term">for "{searchQuery}"</span>
		{/if}
	</div>

	<div class="crops-list">
		{#each filteredCrops as crop}
			<a href="/crop/{crop.id}" class="crop-item">
				<div class="crop-icon-wrapper">
					<div class="crop-icon">{crop.icon}</div>
				</div>
				<div class="crop-content">
					<h3 class="crop-name">{crop.name}</h3>
					<p class="crop-description">{crop.description}</p>
					<div class="crop-meta">
						<span class="meta-item">
							💰 {convertAndFormatPrice(crop.marketPrice)}/ton
						</span>
						<span class="meta-item">
							📅 Best: {crop.bestSellMonth}
						</span>
						<span class="meta-item">
							⏱️ {crop.growthTime} days
						</span>
					</div>
				</div>
				<div class="crop-arrow">▶</div>
			</a>
		{/each}

		{#if filteredCrops.length === 0}
			<div class="no-results">
				<div class="no-results-icon">🌾</div>
				<h3>No crops found</h3>
				<p>Try adjusting your search terms or browse all available crops.</p>
				<button class="btn" on:click={clearSearch}>Show All Crops</button>
			</div>
		{/if}
	</div>
</div>

<style>
	.search-container {
		max-width: 100%;
	}

	.search-box {
		margin-bottom: 20px;
	}

	.search-input-wrapper {
		position: relative;
		background: white;
		border-radius: 12px;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
	}

	.search-input {
		width: 100%;
		padding: 16px 50px 16px 20px;
		border: 2px solid #e1e5e9;
		border-radius: 12px;
		font-size: 16px;
		background: white;
		transition: border-color 0.3s ease;
	}

	.search-input:focus {
		outline: none;
		border-color: #4caf50;
	}

	.clear-btn {
		position: absolute;
		right: 12px;
		top: 50%;
		transform: translateY(-50%);
		background: #e1e5e9;
		border: none;
		border-radius: 50%;
		width: 28px;
		height: 28px;
		cursor: pointer;
		font-size: 14px;
		color: #666;
		transition: all 0.3s ease;
	}

	.clear-btn:hover {
		background: #d1d5d9;
	}

	.results-info {
		margin-bottom: 20px;
		text-align: center;
		color: #666;
		font-size: 14px;
	}

	.results-count {
		font-weight: 600;
		color: #4caf50;
	}

	.search-term {
		font-style: italic;
	}

	.crops-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.crop-item {
		display: flex;
		align-items: center;
		padding: 16px;
		background: white;
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		text-decoration: none;
		color: inherit;
		transition: all 0.3s ease;
		border: 2px solid transparent;
	}

	.crop-item:hover {
		transform: translateY(-1px);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
		border-color: #4caf50;
	}

	.crop-icon-wrapper {
		flex-shrink: 0;
		margin-right: 16px;
	}

	.crop-icon {
		font-size: 40px;
		display: block;
	}

	.crop-content {
		flex: 1;
		min-width: 0;
	}

	.crop-name {
		margin: 0 0 8px 0;
		font-size: 18px;
		font-weight: 600;
		color: #2c3e50;
	}

	.crop-description {
		margin: 0 0 12px 0;
		font-size: 14px;
		color: #666;
		line-height: 1.4;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.crop-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.meta-item {
		font-size: 12px;
		color: #888;
		background: #f8f9fa;
		padding: 4px 8px;
		border-radius: 6px;
		white-space: nowrap;
	}

	.crop-arrow {
		color: #4caf50;
		font-size: 16px;
		margin-left: 12px;
		flex-shrink: 0;
	}

	.no-results {
		text-align: center;
		padding: 60px 20px;
		background: white;
		border-radius: 12px;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
	}

	.no-results-icon {
		font-size: 64px;
		margin-bottom: 20px;
	}

	.no-results h3 {
		color: #2c3e50;
		margin-bottom: 16px;
	}

	.no-results p {
		color: #666;
		margin-bottom: 24px;
		line-height: 1.6;
	}

	/* Desktop responsive adjustments */
	@media (min-width: 768px) {
		.search-container {
			max-width: 800px;
			margin: 0 auto;
		}

		.search-input {
			font-size: 18px;
			padding: 20px 60px 20px 24px;
		}

		.clear-btn {
			width: 32px;
			height: 32px;
			right: 16px;
		}

		.results-info {
			font-size: 16px;
			margin-bottom: 30px;
		}

		.crops-list {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
			gap: 20px;
		}

		.crop-item {
			padding: 24px;
			flex-direction: column;
			text-align: center;
		}

		.crop-icon-wrapper {
			margin-right: 0;
			margin-bottom: 16px;
		}

		.crop-icon {
			font-size: 56px;
		}

		.crop-name {
			font-size: 20px;
			margin-bottom: 12px;
		}

		.crop-description {
			font-size: 16px;
			margin-bottom: 16px;
			-webkit-line-clamp: 3;
			line-clamp: 3;
		}

		.crop-meta {
			justify-content: center;
			gap: 12px;
		}

		.meta-item {
			font-size: 13px;
			padding: 6px 12px;
		}

		.crop-arrow {
			display: none;
		}

		.no-results {
			max-width: 600px;
			margin: 0 auto;
			padding: 80px 40px;
		}
	}

	@media (min-width: 1024px) {
		.search-container {
			max-width: 1000px;
		}

		.crops-list {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
