export const crops = [
	{
		id: 'rice',
		name: 'Rice',
		description:
			'Rice (Oryza sativa) is a semi-aquatic cereal grain originally native to the wetlands of Asia. This staple crop thrives in warm, humid climates with temperatures between 20-35°C and requires abundant water during its growing season. Rice grows best in flooded paddies with 15-25cm of standing water, making it ideal for monsoon regions and areas with reliable irrigation. The plant is rich in carbohydrates and provides essential B vitamins, particularly thiamine and niacin. Rice requires high nitrogen levels during its vegetative growth phase and benefits from phosphorus for root development and potassium for grain filling.',
		icon: '🌾',
		image: '/images/rice.jpg',
		marketPrice: 450,
		bestSellMonth: 'November',
		growthTime: 120,
		requirements: {
			ph: { min: 5.5, max: 7.0 },
			moisture: { min: 70, max: 90 },
			nitrogen: { min: 80, max: 120 },
			organicMatter: { min: 2.5, max: 4.0 }
		},
		farmingTips: {
			preHarvest:
				'Land preparation: Level fields properly and build bunds 15-20cm high to retain water. Seed treatment: Soak seeds in salt water (2kg salt per 10L water) to select viable seeds - discard floating seeds. Apply 2-3 tons of well-decomposed organic manure per hectare before transplanting. Maintain 2-5cm water depth for the first 10 days after transplanting.',
			growing:
				'Water management: Maintain 5-10cm standing water during vegetative growth, reduce to 2-3cm during reproductive stage. Apply nitrogen fertilizer in 3 splits: 50% as basal, 25% at tillering (25-30 days), 25% at panicle initiation (45-50 days). Perform 2-3 weeding operations in the first 45 days. Monitor for pest and disease symptoms regularly.',
			postHarvest:
				'Harvest when 80-85% of grains turn golden yellow. Cut crops in early morning when moisture content is optimal. Thresh within 24-48 hours to prevent grain quality deterioration. Sun-dry grains to 14% moisture content on clean mats, stirring every 2 hours. Store in moisture-proof containers with neem leaves to prevent insect infestation.',
			pestControl:
				'Preventive: Use certified disease-resistant varieties. Install pheromone traps for stem borer control (5-6 traps per acre). Organic: Apply neem oil (3-5ml/L) for brown planthopper control. Encourage natural predators like spiders and birds. Avoid insecticide application during flowering. For severe infestations, use recommended IPM practices with minimal chemical intervention.'
		}
	},
	{
		id: 'corn',
		name: 'Corn (Maize)',
		description:
			"Corn (Zea mays) originated in Central Mexico around 9,000 years ago and has become one of the world's most important cereal grains. This warm-season crop thrives in temperate to subtropical climates with temperatures between 16-35°C and requires a frost-free growing period of 100-140 days. Corn adapts well to various soil types but prefers well-drained, fertile soils with good organic matter content. The grain is an excellent source of carbohydrates, dietary fiber, and contains essential amino acids, though it's particularly rich in leucine and deficient in lysine. Corn has high nitrogen requirements during rapid growth phases and benefits from phosphorus for strong root development and kernel formation.",
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
		farmingTips: {
			preHarvest:
				'Soil preparation: Deep plough 20-25cm and add 20-25 tons of farmyard manure per hectare. Plant seeds 2-3cm deep with 75cm row spacing and 20-25cm plant spacing. Seed treatment with fungicide (2g/kg seeds) prevents soil-borne diseases. Plant after soil temperature reaches 10-12°C consistently. Ensure proper drainage to prevent waterlogging.',
			growing:
				'Side-dress with nitrogen fertilizer when plants are 30-40cm tall (V6 stage). Apply 120-150kg nitrogen per hectare in split doses. Maintain soil moisture at 70-80% field capacity during tasseling and grain filling. Remove weeds manually or with shallow cultivation up to knee-high stage. Monitor for armyworm, corn borer, and fall armyworm infestations.',
			postHarvest:
				'Harvest when moisture content drops to 20-25% (husks dry and brown). Test grain moisture with fingernail - kernels should dent but not puncture easily. Dry immediately to 13-14% moisture for safe storage. Use mechanical dryers or sun-drying on concrete floors. Store in well-ventilated bins with proper rodent control measures.',
			pestControl:
				'Cultural control: Crop rotation with legumes reduces pest buildup. Deep ploughing exposes overwintering larvae to natural enemies. Biological: Release Trichogramma wasps for corn borer control (50,000 cards/hectare). Use Bt corn varieties where available. Chemical: Apply selective insecticides only when economic threshold is reached (5% plants with egg masses).'
		}
	},
	{
		id: 'cassava',
		name: 'Cassava',
		description:
			'Cassava (Manihot esculenta) is a woody shrub native to South America, particularly the Amazon basin, that has become a crucial food security crop across tropical regions. This drought-tolerant root crop thrives in hot, humid climates with temperatures between 25-35°C and can survive in poor, acidic soils where other crops fail. Cassava is exceptionally resilient to drought conditions and can grow with minimal rainfall (500-1000mm annually). The tuberous roots are rich in carbohydrates and provide essential calories, though they are low in protein and certain vitamins. Cassava requires minimal nitrogen compared to other crops but benefits from potassium for proper root development and phosphorus for energy storage in the tubers.',
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
		farmingTips: {
			preHarvest:
				'Land preparation: Clear land and make ridges 75-100cm apart for good drainage. Select healthy stem cuttings 15-20cm long from disease-free plants. Plant cuttings at 45° angle with 2/3 buried in soil. Apply 5-10 tons of organic matter per hectare if available. Plant at onset of rainy season for optimal establishment.',
			growing:
				'Minimal fertilizer requirements - cassava grows well in poor soils. Weed control is crucial in first 3-4 months; perform 3-4 weeding operations. Earth up around plants to encourage tuber development. Prune flowering shoots to redirect energy to root development. Monitor for mosaic virus symptoms (yellow mottling on leaves).',
			postHarvest:
				'Harvest 8-12 months after planting when leaves turn yellow. Harvest tubers carefully to avoid bruising - use hand tools rather than machines. Process fresh roots within 24-48 hours to prevent spoilage and reduce cyanide content. Peel, wash, and dry sliced cassava on clean mats. Store dried cassava chips in dry, well-ventilated containers.',
			pestControl:
				'Disease management: Use virus-free planting material from certified sources. Remove and destroy infected plants immediately. Pest control: Monitor for cassava green mite and mealybugs. Encourage natural predators like predatory mites. Use soap solution (20g/L) for mealybug control. Practice crop rotation to break pest cycles.'
		}
	},
	{
		id: 'soybeans',
		name: 'Soybeans',
		description:
			'Soybeans (Glycine max) originated in East Asia and are now cultivated worldwide as a premier protein crop. This legume thrives in temperate climates with warm summers (20-30°C) and requires 100-130 frost-free days with adequate rainfall (500-800mm) during the growing season. Soybeans prefer well-drained, fertile soils with good organic matter content and perform best in areas with hot, humid summers and moderate rainfall. The beans are nutritionally exceptional, containing all essential amino acids and are rich in protein (35-40%), healthy fats, fiber, and isoflavones. As a nitrogen-fixing legume, soybeans form symbiotic relationships with rhizobia bacteria, reducing nitrogen fertilizer requirements while improving soil fertility for subsequent crops.',
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
		farmingTips: {
			preHarvest:
				'Soil preparation: Test soil pH and adjust to 6.0-7.0 with lime if needed. Prepare fine, firm seedbed with good drainage. Inoculate seeds with appropriate rhizobia bacteria (5g inoculant per kg seed). Plant seeds 2-3cm deep with 30-45cm row spacing. Ensure soil temperature is above 15°C for optimal germination.',
			growing:
				'Minimal nitrogen fertilizer needed due to biological nitrogen fixation. Apply starter fertilizer with phosphorus and potassium. Maintain soil moisture during flowering and pod filling stages - critical for yield. Side-dress with potassium if soil test indicates deficiency. Monitor for aphids, spider mites, and stink bugs regularly.',
			postHarvest:
				'Harvest when 95% of pods rattle and leaves turn yellow-brown. Test moisture content - optimal harvest at 13-15% moisture. Use combines with proper settings to minimize seed damage. Dry beans to 13% moisture if needed. Store in bins with good aeration and temperature monitoring systems.',
			pestControl:
				'Integrated approach: Use certified disease-resistant varieties. Scout fields weekly during growing season. Beneficial insects: Preserve natural enemies like ladybugs and lacewings. Organic options: Neem oil for aphid control, diatomaceous earth for crawling insects. Chemical control: Use selective insecticides only when economic thresholds are exceeded.'
		}
	},
	{
		id: 'sweet-potato',
		name: 'Sweet Potato',
		description:
			'Sweet potato (Ipomoea batatas) is a dicotyledonous plant native to tropical regions of the Americas, particularly Central and South America. This nutritious root vegetable thrives in warm climates with temperatures between 20-30°C and requires a long, warm growing season of 90-120 frost-free days. Sweet potatoes are remarkably adaptable to various soil conditions, including poor, sandy soils, making them valuable for marginal agricultural lands. The tuberous roots are nutritionally dense, rich in beta-carotene (vitamin A), vitamin C, potassium, and dietary fiber, while providing complex carbohydrates. Sweet potatoes have moderate nitrogen requirements but benefit significantly from potassium for proper tuber development and phosphorus for root establishment.',
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
		farmingTips: {
			preHarvest:
				'Prepare raised beds or ridges 25-30cm high for improved drainage. Obtain healthy vine cuttings 25-30cm long from disease-free plants. Plant cuttings with 2-3 nodes buried in soil, spacing 30cm apart in rows 75-100cm apart. Apply 10-15 tons of well-decomposed organic manure per hectare. Plant during warm, humid season.',
			growing:
				'Maintain moderate soil moisture - avoid waterlogging which causes root rot. Apply balanced fertilizer with emphasis on potassium for tuber development. Perform earthing up operation 60-70 days after planting to encourage tuber formation. Train vines periodically to prevent excessive vegetative growth. Monitor for weevil damage and viral infections.',
			postHarvest:
				'Harvest carefully 90-120 days after planting when vines start yellowing. Dig tubers on sunny day when soil is relatively dry. Handle roots gently to prevent bruising and cuts. Cure freshly harvested roots at 28-30°C with 85-90% humidity for 7-10 days. Store cured roots at 13-15°C with 85-90% relative humidity.',
			pestControl:
				'Quarantine measures: Use certified planting material to prevent virus introduction. Cultural control: Crop rotation with cereals or legumes. Remove infected plants and volunteer plants. Biological control: Encourage natural enemies of sweet potato weevil. Pheromone traps for weevil monitoring. Apply beneficial nematodes for soil pest control.'
		}
	},
	{
		id: 'peanuts',
		name: 'Peanuts',
		description:
			'Peanuts (Arachis hypogaea) are legumes native to South America, particularly Bolivia and northern Argentina, that have adapted to warm subtropical and tropical climates worldwide. This unique crop requires temperatures between 20-30°C and a growing season of 120-150 frost-free days with moderate rainfall (500-1000mm). Peanuts thrive in well-drained, sandy loam soils and have the fascinating characteristic of flowering above ground before the developing pods burrow into the soil to mature. The nuts are nutritionally rich, containing high-quality protein (25-30%), healthy monounsaturated fats, vitamin E, niacin, and folate. As a nitrogen-fixing legume, peanuts require minimal nitrogen fertilization but need adequate calcium for proper pod development and potassium for oil production.',
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
		farmingTips: {
			preHarvest:
				'Deep ploughing to 20-25cm depth for good soil structure. Apply gypsum (250-500kg/hectare) to supply calcium for pod development. Inoculate seeds with rhizobia bacteria specific to peanuts. Plant seeds 3-5cm deep with 30cm row spacing. Ensure adequate soil moisture for germination but avoid waterlogged conditions.',
			growing:
				'Critical calcium application during pod development stage (60-80 days after planting). Side-dress with calcium sulfate around plants when pegs start penetrating soil. Maintain consistent soil moisture during flowering and pegging stages. Avoid excessive nitrogen which promotes vegetative growth at expense of pods. Regular shallow cultivation to keep soil loose for peg penetration.',
			postHarvest:
				'Harvest when lower leaves turn yellow and pods show netted veining. Dig carefully to avoid pod breakage - use proper digging tools. Shake soil off plants and windrow for field drying. Dry pods to 8-10% moisture content before storage. Store in well-ventilated containers with moisture control. Monitor for aflatoxin development in stored nuts.',
			pestControl:
				'Disease prevention: Use certified disease-resistant varieties. Practice 3-4 year crop rotation with cereals. Fungal control: Apply copper-based fungicides for leaf spot diseases during humid conditions. Pest management: Scout for thrips, aphids, and white grubs. Use yellow sticky traps for thrips monitoring. Encourage beneficial insects like predatory beetles.'
		}
	},
	{
		id: 'cabbage',
		name: 'Cabbage',
		description:
			'Cabbage (Brassica oleracea) is a cool-season vegetable that originated in the Mediterranean region and has been cultivated for over 4,000 years. This hardy brassica thrives in cool, moist climates with temperatures between 15-20°C and can tolerate light frosts, making it ideal for temperate regions and high-altitude tropical areas. Cabbage prefers well-drained, fertile soils with high organic matter content and consistent moisture throughout its growing period. The dense, leafy heads are rich in vitamin C, vitamin K, folate, and dietary fiber, while being low in calories. Cabbage has high nitrogen requirements for rapid leaf development and benefits from consistent phosphorus and potassium for proper head formation and disease resistance.',
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
		farmingTips: {
			preHarvest:
				'Prepare well-drained, fertile soil with pH 6.0-7.5. Start seeds in nursery beds or seedling trays 4-6 weeks before transplanting. Apply 15-20 tons of well-decomposed farmyard manure per hectare. Harden seedlings by reducing water and increasing exposure to sunlight before transplanting. Transplant during cool, cloudy weather.',
			growing:
				'Maintain consistent soil moisture throughout growing period - use drip irrigation if possible. Apply balanced fertilizer with higher nitrogen during early growth, switch to potassium-rich fertilizer during head formation. Mulch around plants to conserve moisture and suppress weeds. Monitor for pest damage and remove affected leaves promptly.',
			postHarvest:
				'Harvest heads when firm and compact, before they become over-mature and split. Cut heads in early morning when temperatures are cool. Leave outer wrapper leaves for protection during storage. Cool harvested heads immediately to 0-2°C. Store in high humidity (90-95%) conditions to prevent wilting and weight loss.',
			pestControl:
				'Physical barriers: Use row covers during early growth to exclude pests. Crop rotation: Avoid planting brassicas in same area for 2-3 years. Biological control: Release beneficial wasps for aphid control. Bt application: Use Bacillus thuringiensis for caterpillar control. Monitor for clubroot disease and use resistant varieties in infected soils.'
		}
	},
	{
		id: 'tomatoes',
		name: 'Tomatoes',
		description:
			'Tomatoes (Solanum lycopersicum) are warm-season fruits native to western South America, particularly Peru and Ecuador, that have become globally important both nutritionally and economically. This heat-loving crop thrives in temperatures between 18-27°C with plenty of sunlight and requires a long growing season of 75-85 days from transplant. Tomatoes prefer well-drained, fertile soils rich in organic matter and need consistent moisture to prevent physiological disorders like blossom end rot and fruit cracking. The fruits are exceptionally rich in lycopene (a powerful antioxidant), vitamin C, vitamin K, and potassium, while providing essential nutrients with relatively few calories. Tomatoes require high nitrogen during vegetative growth, phosphorus for root development and fruit set, and potassium for fruit quality and disease resistance.',
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
		farmingTips: {
			preHarvest:
				'Start seeds indoors 6-8 weeks before last frost date. Prepare soil with organic matter (25-30 tons/hectare) and ensure good drainage. Install support structures (stakes or cages) before transplanting. Harden seedlings gradually over 7-10 days before transplanting. Plant seedlings deep, burying 2/3 of stem to encourage strong root development.',
			growing:
				'Maintain consistent soil moisture to prevent blossom end rot and fruit cracking. Use drip irrigation or soaker hoses to avoid wetting foliage. Apply mulch to conserve moisture and prevent soil splashing on leaves. Prune suckers regularly and tie plants to supports. Side-dress with compost or balanced fertilizer every 3-4 weeks during growing season.',
			postHarvest:
				'Harvest at breaker stage (first color change) for shipping, or vine-ripe for local markets. Pick fruits every 2-3 days during peak season. Handle gently to avoid bruising. Cool harvested fruits immediately to slow ripening. Store green tomatoes at 13-15°C, ripe tomatoes at 10-12°C with 85-90% humidity.',
			pestControl:
				'Disease prevention: Use certified disease-free transplants. Space plants properly for good air circulation. Water at soil level to keep foliage dry. Crop rotation with non-solanaceous crops. Early/late blight control: Apply copper-based fungicides preventively during humid conditions. Pest management: Use yellow sticky traps for whiteflies and aphids.'
		}
	},
	{
		id: 'coffee',
		name: 'Coffee',
		description:
			'A growing cash crop—Arabica and Robusta—for domestic consumption and export, with rising global demand.',
		icon: '☕',
		image: '/images/coffee.jpg',
		marketPrice: 1400,
		bestSellMonth: 'May',
		growthTime: 365,
		requirements: {
			ph: { min: 4.5, max: 6.5 },
			moisture: { min: 40, max: 60 },
			nitrogen: { min: 50, max: 90 },
			organicMatter: { min: 3.0, max: 5.0 }
		},
		farmingTips: {
			preHarvest:
				'Establish shade trees 1-2 years before planting coffee. Prepare holes 60x60x60cm and add organic matter. Plant during rainy season using healthy seedlings from certified nurseries. Establish windbreaks to protect young plants. Apply 2-3kg of well-decomposed compost per plant annually.',
			growing:
				'Maintain 50-70% shade using appropriate tree species. Prune coffee plants annually after harvest to maintain 2-3 main stems. Apply organic mulch around plants to conserve moisture and suppress weeds. Irrigate during dry seasons if possible. Apply balanced fertilizer in split doses during growing season.',
			postHarvest:
				'Hand-pick only ripe, red cherries for highest quality. Process within 6-12 hours of picking to prevent fermentation. Wet processing: Pulp, ferment 12-36 hours, wash thoroughly. Dry processing: Sun-dry whole cherries on raised beds. Dry to 10-12% moisture content, turning regularly. Store parchment coffee in ventilated bags.',
			pestControl:
				'Integrated pest management: Regular monitoring for coffee berry borer and leaf rust. Cultural control: Proper pruning for air circulation. Remove fallen berries and leaves. Biological control: Encourage beneficial insects and birds. Fungal diseases: Apply copper-based fungicides during rainy season. Use resistant varieties where available.'
		}
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
