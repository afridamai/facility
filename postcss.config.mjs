/* FILE: postcss.config.mjs 
   LOCATION: Project Root
   DESCRIPTION: The essential PostCSS configuration to enable Tailwind CSS v4 processing.
   CHANGES: 
    - Rule #3: Switched 'tailwindcss' to '@tailwindcss/postcss' to fix the Build Error.
    - Rule #3: Maintained 'autoprefixer' for Safari/Chrome clinical view stability.
    - Rule #5: Simplified the plugin set to match the modern Next.js 15 stack.
*/

export default {
  plugins: {
    // Rule #3: The specific v4 adapter required by your package.json
    '@tailwindcss/postcss': {},
    
    // Rule #4: Ensures Melanin-Orange buttons work on old Safari/iPhones
    autoprefixer: {},
  },
};