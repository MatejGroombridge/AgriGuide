export const crops = [
	{
		id: 'rice',
		name: 'Rice',
		description: 'A staple grain crop that grows well in wet conditions and provides high yields.',
		icon: '🌾',
		image: '/images/rice.jpg',
		marketPrice: 450, // USD per ton
		bestSellMonth: 'November',
		growthTime: 120, // days
		requirements: {
			ph: { min: 5.5, max: 7.0 },
			moisture: { min: 70, max: 90 },
			nitrogen: { min: 80, max: 120 },
			organicMatter: { min: 2.5, max: 4.0 }
		},
		preHarvestTips: 'Maintain water levels consistently. Apply nitrogen fertilizer in split doses.',
		postHarvestTips: 'Dry grains to 14% moisture content. Store in dry, ventilated areas.',
		pesticides: 'Use organic neem oil for pest control. Avoid chemical pesticides near harvest.'
	},
	{
		id: 'corn',
		name: 'Corn (Maize)',
		description:
			'A versatile grain crop that adapts to various soil conditions and has strong market demand.',
		icon: '🌽',
		image: '/images/corn.jpg',
		marketPrice: 380,
		bestSellMonth: 'September',
		growthTime: 90,
		requirements: {
			ph: { min: 6.0, max: 7.5 },
			moisture: { min: 50, max: 70 },
			nitrogen: { min: 100, max: 150 },
			organicMatter: { min: 3.0, max: 5.0 }
		},
		preHarvestTips: 'Plant after last frost. Ensure adequate spacing between plants.',
		postHarvestTips: 'Harvest when husks are dry and brown. Store in moisture-proof containers.',
		pesticides: 'Use BT spray for corn borers. Regular inspection for army worms.'
	},
	{
		id: 'cassava',
		name: 'Cassava',
		description:
			'A drought-resistant root crop that provides food security and has industrial uses.',
		icon: '🥔',
		image: '/images/cassava.jpg',
		marketPrice: 180,
		bestSellMonth: 'January',
		growthTime: 300,
		requirements: {
			ph: { min: 5.0, max: 7.0 },
			moisture: { min: 30, max: 60 },
			nitrogen: { min: 40, max: 80 },
			organicMatter: { min: 1.5, max: 3.0 }
		},
		preHarvestTips: 'Plant during rainy season. Minimal fertilizer needed.',
		postHarvestTips: 'Process within 24-48 hours after harvest to prevent spoilage.',
		pesticides: 'Monitor for cassava mosaic virus. Use resistant varieties.'
	},
	{
		id: 'soybeans',
		name: 'Soybeans',
		description: 'A protein-rich legume that fixes nitrogen in soil and has high export value.',
		icon: '🫘',
		image: '/images/soybeans.jpg',
		marketPrice: 520,
		bestSellMonth: 'October',
		growthTime: 100,
		requirements: {
			ph: { min: 6.0, max: 7.0 },
			moisture: { min: 60, max: 80 },
			nitrogen: { min: 20, max: 40 },
			organicMatter: { min: 2.0, max: 4.0 }
		},
		preHarvestTips: 'Inoculate seeds with rhizobia bacteria. Avoid waterlogged conditions.',
		postHarvestTips: 'Dry to 13% moisture. Store in cool, dry conditions.',
		pesticides: 'Use integrated pest management. Monitor for soybean rust.'
	},
	{
		id: 'sweet-potato',
		name: 'Sweet Potato',
		description: 'A nutritious root crop that grows in poor soils and has good storage life.',
		icon: '🍠',
		image: '/images/sweet-potato.jpg',
		marketPrice: 320,
		bestSellMonth: 'December',
		growthTime: 110,
		requirements: {
			ph: { min: 5.5, max: 6.5 },
			moisture: { min: 40, max: 65 },
			nitrogen: { min: 60, max: 100 },
			organicMatter: { min: 2.0, max: 4.0 }
		},
		preHarvestTips: 'Plant slips 30cm apart. Ridge planting improves drainage.',
		postHarvestTips: 'Cure in warm, humid conditions for 7-10 days before storage.',
		pesticides: 'Use organic mulch to prevent weeds. Monitor for sweet potato weevil.'
	},
	{
		id: 'peanuts',
		name: 'Peanuts',
		description: 'An oil-rich legume crop that improves soil fertility and has good market value.',
		icon: '🥜',
		image: '/images/peanuts.jpg',
		marketPrice: 680,
		bestSellMonth: 'August',
		growthTime: 120,
		requirements: {
			ph: { min: 5.8, max: 7.2 },
			moisture: { min: 50, max: 70 },
			nitrogen: { min: 30, max: 60 },
			organicMatter: { min: 2.5, max: 4.5 }
		},
		preHarvestTips: 'Ensure good drainage. Calcium application improves pod filling.',
		postHarvestTips: 'Dry pods to 10% moisture. Store in ventilated containers.',
		pesticides: 'Monitor for leaf spot diseases. Use resistant varieties.'
	},
	{
		id: 'cabbage',
		name: 'Cabbage',
		description: 'A cool-season vegetable with quick returns and consistent market demand.',
		icon: '🥬',
		image: '/images/cabbage.jpg',
		marketPrice: 280,
		bestSellMonth: 'February',
		growthTime: 75,
		requirements: {
			ph: { min: 6.0, max: 7.5 },
			moisture: { min: 65, max: 85 },
			nitrogen: { min: 120, max: 180 },
			organicMatter: { min: 3.0, max: 5.0 }
		},
		preHarvestTips: 'Transplant seedlings at 4-6 weeks. Consistent watering is crucial.',
		postHarvestTips: 'Harvest in cool morning hours. Store in cool, humid conditions.',
		pesticides: 'Use row covers for pest protection. BT spray for cabbage worms.'
	},
	{
		id: 'tomatoes',
		name: 'Tomatoes',
		description: 'A high-value fruit crop with strong local and export market potential.',
		icon: '🍅',
		image: '/images/tomatoes.jpg',
		marketPrice: 750,
		bestSellMonth: 'March',
		growthTime: 85,
		requirements: {
			ph: { min: 6.0, max: 7.0 },
			moisture: { min: 70, max: 85 },
			nitrogen: { min: 100, max: 150 },
			organicMatter: { min: 3.5, max: 5.5 }
		},
		preHarvestTips: 'Stake plants for support. Consistent watering prevents cracking.',
		postHarvestTips: 'Harvest at breaker stage for shipping. Handle carefully.',
		pesticides: 'Monitor for blight and hornworms. Use copper-based fungicides.'
	}
];

export function getCropById(id) {
	return crops.find((crop) => crop.id === id);
}

export function searchCrops(query) {
	if (!query) return crops;

	const lowercaseQuery = query.toLowerCase();
	return crops.filter(
		(crop) =>
			crop.name.toLowerCase().includes(lowercaseQuery) ||
			crop.description.toLowerCase().includes(lowercaseQuery)
	);
}

export function getRecommendations(soilData) {
	const { ph, moisture, nitrogen, organicMatter } = soilData;

	return crops
		.filter((crop) => {
			const req = crop.requirements;
			return (
				ph >= req.ph.min &&
				ph <= req.ph.max &&
				moisture >= req.moisture.min &&
				moisture <= req.moisture.max &&
				nitrogen >= req.nitrogen.min &&
				nitrogen <= req.nitrogen.max &&
				organicMatter >= req.organicMatter.min &&
				organicMatter <= req.organicMatter.max
			);
		})
		.sort((a, b) => b.marketPrice - a.marketPrice); // Sort by market price descending
}
