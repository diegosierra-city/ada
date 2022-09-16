import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		postcss: true,
	}),

	kit: {

		adapter: adapter(),


		prerender: {
			// This can be false if you're using a fallback (i.e. SPA mode)
			default: true, onError: 'continue'
		},


	},

};

export default config;
