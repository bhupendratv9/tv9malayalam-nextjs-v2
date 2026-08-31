/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  basePath: '/tv9malayalam-nextjs-v1',
  trailingSlash: false,
  images: { unoptimized: true },
  sassOptions: { includePaths: [path.resolve('styles')] },
  
  //assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || undefined,

  async rewrites() {
    return {
      beforeFiles: [
        { source: '/', destination: '/home' },
      ],

      afterFiles: [
        
		// ─── Ads.txt Proxy ───
        { source: '/ads.txt', destination: '/api/proxy/ads.txt' },
        { source: '/app-ads.txt', destination: '/api/proxy/app-ads.txt' },

		// ─── Sitemap, Feed & Robots Proxy ───
        { source: '/sitemap.xml', destination: '/api/proxy/sitemap.xml' },
        { source: '/sitemap/:path*', destination: '/api/proxy/sitemap/:path*' },
        { source: '/news-sitemap.xml', destination: '/api/proxy/news-sitemap.xml' },
        { source: '/video-sitemap.xml', destination: '/api/proxy/video-sitemap.xml' },
        { source: '/page-sitemap.xml', destination: '/api/proxy/page-sitemap.xml' },
        { source: '/category-sitemap.xml', destination: '/api/proxy/category-sitemap.xml' },
        { source: '/feed', destination: '/api/proxy/feed' },
        { source: '/feed/:path*', destination: '/api/proxy/feed/:path*' },
        { source: '/robots.txt', destination: '/api/proxy/robots.txt' },
		
		// ─── Static Pages ───
        { source: '/contact-us', destination: '/StaticPage/StaticPage?slug=contact-us' },
        { source: '/about-us', destination: '/StaticPage/StaticPage?slug=about-us' },
        { source: '/advertise-with-us', destination: '/StaticPage/StaticPage?slug=advertise-with-us' },
        { source: '/privacy-policy', destination: '/StaticPage/StaticPage?slug=privacy-policy' },
        { source: '/terms-and-conditions', destination: '/StaticPage/StaticPage?slug=terms-and-conditions' },
		
		// ─── Short Video Detail ───
        { source: '/videos/short-videos/:slug', destination: '/ShortVideoDetail/ShortVideoDetailPage?slug=:slug' },
		
		// ─── Short Videos ───
        { source: '/videos/short-videos', destination: '/Videos/ShortVideoLandingPage' },
		    { source: '/cities', destination: '/CategoryLanding/CitiesCategoryLanding?category=cities' },
        { source: '/latest-news', destination: '/CategoryLanding/LatestNewsLandingPage' },
		
		// ─── AQI Pages ───
        { source: '/aqi', destination: '/Aqi/Aqi' },
        { source: '/aqi/:city([a-zA-Z0-9-]+)-air-quality-index-today', destination: '/Aqi/AqiCityPage?city=:city' },
        
		// ─── Weather Forecast ───
        { source: '/weather-forecast', destination: '/WeatherForecast/WeatherForecastPage' },
        { source: '/weather-forecast/:city([a-zA-Z0-9-]+)-weather-update', destination: '/WeatherForecast/WeatherForecastCityPage?city=:city' },

		    
		// ─── Topic Pages ───
        { source: '/topic', destination: '/Topic/TopicLandingPage' },
        { source: '/topic/:topicSlug([a-zA-Z0-9-]+)', destination: '/Topic/TopicListingPage?topicSlug=:topicSlug' },
		
	    // ─── Author & Anchor Pages ───
        { source: '/author', destination: '/Author/AuthorLandingPage' },
        { source: '/author/:nameSlug([a-zA-Z0-9-]+)', destination: '/Author/AuthorListingPage?nameSlug=:nameSlug' },
    	
		
		{ source: '/web-stories', destination: '/CategoryLanding/WebStoriesPage?category=web-stories' },
        { source: '/photo-gallery', destination: '/CategoryLanding/PhotoGalleryPage?category=photo-gallery' },
		{ source: '/videos', destination: '/CategoryLanding/VideosPage?category=videos' },
		
        // ─── Article Detail — AMP (4 segments) ───
        {
          source: '/:category([a-zA-Z0-9-]+)/:subcategory([a-zA-Z0-9-]+)/:subcat2([a-zA-Z0-9-]+)/:title([a-zA-Z0-9-]+)-:id([0-9]+).html/amp',
          destination: '/ArticleDetail/ArticleDetailPageAMP?category=:category&subcategory=:subcategory&subcat2=:subcat2&title=:title&id=:id',
        },
        // ─── Article Detail (4 segments) ───
        {
          source: '/:category([a-zA-Z0-9-]+)/:subcategory([a-zA-Z0-9-]+)/:subcat2([a-zA-Z0-9-]+)/:title([a-zA-Z0-9-]+)-:id([0-9]+).html',
          destination: '/ArticleDetail/ArticleDetailPage?category=:category&subcategory=:subcategory&subcat2=:subcat2&title=:title&id=:id',
        },
        // ─── Article Detail — AMP (3 segments) ───
        {
          source: '/:category([a-zA-Z0-9-]+)/:subcategory([a-zA-Z0-9-]+)/:title([a-zA-Z0-9-]+)-:id([0-9]+).html/amp',
          destination: '/ArticleDetail/ArticleDetailPageAMP?category=:category&subcategory=:subcategory&title=:title&id=:id',
        },
        // ─── Article Detail (3 segments) ───
        {
          source: '/:category([a-zA-Z0-9-]+)/:subcategory([a-zA-Z0-9-]+)/:title([a-zA-Z0-9-]+)-:id([0-9]+).html',
          destination: '/ArticleDetail/ArticleDetailPage?category=:category&subcategory=:subcategory&title=:title&id=:id',
        },
        // ─── Article Detail — AMP (2 segments) ───
        {
          source: '/:category([a-zA-Z0-9-]+)/:title([a-zA-Z0-9-]+)-:id([0-9]+).html/amp',
          destination: '/ArticleDetail/ArticleDetailPageAMP?category=:category&title=:title&id=:id',
        },
        // ─── Article Detail (2 segments) ───
        {
          source: '/:category([a-zA-Z0-9-]+)/:title([a-zA-Z0-9-]+)-:id([0-9]+).html',
          destination: '/ArticleDetail/ArticleDetailPage?category=:category&title=:title&id=:id',
        },
		
		
		// ─── Web Story Detail (AMP) ───
        { source: '/web-stories/:category([a-zA-Z0-9-]+)/:slug([a-zA-Z0-9-]+)', destination: '/WebStory/WebStoryDetailAMP?slug=:slug&category=:category' },
		{ source: '/web-stories/:slug([a-zA-Z0-9-]+)', destination: '/WebStory/WebStoryDetailAMP?slug=:slug' },
		
        
		
        // ─── Generic Category Fallback (must be last) ───
        // Only matches valid URL slugs: letters, numbers, hyphens
        {
          source: '/:category([a-zA-Z0-9-]+)',
          destination: '/CategoryLanding/ArticleCategoryLandingPage?category=:category',
        },
        {
          source: '/:parentCategory([a-zA-Z0-9-]+)/:category([a-zA-Z0-9-]+)',
          destination: '/CategoryLanding/ArticleCategoryLandingPage?category=:category&parentCategory=:parentCategory',
        },
      ],

      fallback: [],
    };
  },

  // Add noindex header to static assets so crawlers ignore them
 /* async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },*/
};

module.exports = nextConfig;
