// Currency conversion utilities
// As of 2025, approximate exchange rate: 1 USD = 21,000 LAK
const USD_TO_LAK_RATE = 21000;

/**
 * Convert USD to Lao Kip (LAK)
 * @param {number} usdAmount - Amount in USD
 * @returns {number} Amount in LAK
 */
export function convertUSDToLAK(usdAmount) {
	return Math.round(usdAmount * USD_TO_LAK_RATE);
}

/**
 * Format LAK currency for display
 * @param {number} lakAmount - Amount in LAK
 * @returns {string} Formatted currency string
 */
export function formatLAK(lakAmount) {
	return new Intl.NumberFormat('lo-LA', {
		style: 'currency',
		currency: 'LAK',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(lakAmount);
}

/**
 * Convert USD to LAK and format for display
 * @param {number} usdAmount - Amount in USD
 * @returns {string} Formatted LAK currency string
 */
export function convertAndFormatPrice(usdAmount) {
	const lakAmount = convertUSDToLAK(usdAmount);
	return formatLAK(lakAmount);
}
