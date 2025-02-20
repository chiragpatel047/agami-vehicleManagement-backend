const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');
const path = require('path');

const i18nextConfig = () => {
  i18next
    .use(Backend) 
    .use(middleware.LanguageDetector) 
    .init({
      fallbackLng: 'en', 
      preload: ['en', 'ar', 'fr'],
      backend: {
        loadPath: path.join(__dirname,'../locales/{{lng}}/translation.json')
      },
      detection: {
        order: ['header'],
        caches: false,
      },
    });

  return i18next;
};
module.exports = i18nextConfig;
