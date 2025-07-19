import { error } from '@sveltejs/kit';
import { getCropById } from '$lib/data/crops.js';

export function load({ params }) {
	const crop = getCropById(params.id);

	if (!crop) {
		throw error(404, 'Crop not found');
	}

	return {
		crop
	};
}
