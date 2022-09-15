//import adapter from '@sveltejs/adapter-static';
import adapter from '@sveltejs/adapter-auto';
//import adapter from '@sveltejs/adapter-cloudflare';
//import adapter from '@sveltejs/adapter-netlify';
//import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		postcss: true,
	  }),

	kit: {
		//trailingSlash: 'always',//always make folders
		//paths: { base: '/'},
		//for static
		adapter: adapter(),
/*
		//for SPA:
		adapter: adapter({
			fallback: 'index.html'
		  }),
*/
		/// for node
		//adapter: adapter({ out: 'build' })
/*
///for auto
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: 'index.html', ///index.html, 200.htm or 404.html for SPA or null
			precompress: false
		  }),
*/
/*
///for Netlify
adapter: adapter({
	// if true, will create a Netlify Edge Function rather
	// than using standard Node-based functions
	edge: false,

	// if true, will split your app into multiple functions
	// instead of creating a single one for the entire app.
	// if `edge` is true, this option cannot be used
	split: false
  }) 
  */

		  prerender: {
			// This can be false if you're using a fallback (i.e. SPA mode)
			default: true, onError: 'continue'
		  },
		 /* */
		  
	},
	
};

export default config;
