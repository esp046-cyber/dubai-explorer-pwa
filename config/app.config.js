// Base configuration (also usable from Node tests via module.exports)
const APP_CONFIG = {
  name: 'Dubai Explorer: Ultimate Tourist & Urban Guide',
  shortName: 'Dubai Explorer',
  version: '1.0.0',
  theme: { gold: '#D4AF37', background: '#0b0b12' },
  social: { ogImage: 'assets/og-image.png', twitterCard: 'summary_large_image' },
  map: { center: { lat: 25.2048, lng: 55.2708 }, zoom: 11, provider: 'google-maps-url-links' },
  dataUrl: 'api/places.json'
};
if (typeof module !== 'undefined') module.exports = APP_CONFIG;
