import dynamic from "next/dynamic";

// ─── Core Layout Widgets ───

import HeaderWidget from "./widgets/HeaderWidget/Header";
import HeaderWidgetUP from "./widgets/HeaderWidgetUP/HeaderUP";

import FooterWidget from "./widgets/FooterWidget/Footer";
import FooterWidgetUP from "./widgets/FooterWidgetUP/FooterUP";

import TrendingNavigationWidget from "./widgets/TrendingNavigationWidget/TrendingNavigation";
import BreakingStripWidget from "./widgets/BreakingStripWidget/BreakingStrip";
import TopAdWidget from "./widgets/TopAdWidget";
import BreadcrumbWidget from "./widgets/BreadcrumbWidget";

// ─── Homepage Widgets ───
import HomeTopNewsWidget from "./widgets/HomeTopNewsWidget/HomeTopNews";
import HomeTopNewsWidgetUP from "./widgets/HomeTopNewsWidgetUP/HomeTopNewsUP";

import OneBigEightSmallWidget from "./widgets/OneBigEightSmallWidget";

import FiveColNewsWidgetUP from "./widgets/FiveColNewsWidgetUP/FiveColNewsUP";
import FiveColNewsAllThumbUP from "./widgets/FiveColNewsAllThumbWidgetUP/FiveColNewsAllThumbUP";

import TwoColumnNewsWidget from "./widgets/TwoColumnNewsWidget";
import ThreeColumnNewsWidget from "./widgets/ThreeColumnNewsWidget";
import HomeShortVideosWidget from "./widgets/HomeShortVideosWidget/HomeShortVideos";
import HomeShortVideosWidgetUP from "./widgets/HomeShortVideosWidgetUP/HomeShortVideosWidgetUP";
import HomeAqiWidget from "./widgets/HomeAqiWidget/HomeAqi";
import HomePremiumContentWidget from "./widgets/HomePremiumContentWidget";
import HomePhotoSliderWidget from "./widgets/HomePhotoSliderWidget/HomePhotoSlider";

import HomePhotoWidgetUP from "./widgets/HomePhotoWidgetUP/HomePhotoWidgetUP";

import HomeVideoSliderWidget from "./widgets/HomeVideoSliderWidget/HomeVideoSlider";

import HomeVideoWidgetUP from "./widgets/HomeVideoWidgetUP/HomeVideoWidgetUP";
import ThreeColNewsWidgetUP from "./widgets/ThreeColNewsWidgetUP/ThreeColNewsUP";

import SixNewsWidget from "./widgets/SixNewsWidget/SixNews";
import HomeWebStoriesWidget from "./widgets/HomeWebStoriesWidget/HomeWebStories";
import HomeStateNewsWidget from "./widgets/HomeStateNewsWidget/HomeStateNews";
import HomepageWeatherWidget from "./widgets/HomepageWeatherWidget/HomepageWeather";



// ─── Detail Page Widgets ───
import DetailMainContentWidget from "./widgets/DetailMainContentWidget/DetailMainContent";
import PhotoDetailMainContentWidget from "./widgets/DetailMainContentWidget/PhotoDetailMainContent";
import VideoDetailMainContentWidget from "./widgets/VideoDetailMainContentWidget";
import LiveBlogDetailMainContentWidget from "./widgets/DetailMainContentWidget/LiveBlogDetailMainContent";
import StaticDetailContent from "./widgets/StaticDetailWidget/StaticDetailContent";

// ─── Listing Widgets ───
import CategoryListingCommonWidget from "./widgets/CategoryListingCommonWidget/CategoryListingCommon";

import PhotoGalleryLanding from "./widgets/PhotoGalleryLandingWidget/PhotoGalleryLanding";

import CategoryListingCommonWidgetUP from "./widgets/CategoryListingCommonWidgetUP/CategoryListingCommonUP";

import WebStoriesListingCommonWidget from "./widgets/WebStoriesListingCommonWidget/WebStoriesListing";
import ShortVideoLandingWidget from "./widgets/ShortVideoLandingWidget/ShortVideoLanding";
import VideoGalleryWidget from "./widgets/VideoGalleryWidget";
import VideoGalleryLanding from "./widgets/VideoGalleryLandingWidget/VideoGalleryLanding";
import ArticleFourNewsWidget from "./widgets/ArticleFourNewsWidget/ArticleFourNews";

// ─── Topic & Author Widgets ───
import TopicListWidget from "./widgets/TopicListingWidget/TopicListing";

import TopicInformationWidget from "./widgets/TopicInformationWidget/TopicInformation";
import AllTopicListWidget from "./widgets/AllTopicListWidget/AllTopicList";
import AuthorListWidget from "./widgets/AuthorListWidget/AuthorList";
import AuthorDetailWidget from "./widgets/AuthorDetailWidget/AuthorDetail";


// ─── AQI Widgets ───
import AqiPerimeterWidget from "./widgets/AqiPerimeterWidget/AqiPerimeter";
import AqiFaqWidget from "./widgets/AqiWeatherFaqWidget/AqiWeatherFaq";
import AqiIndexWidget from "./widgets/AqiIndexWidget/AqiIndex";
import AqiRelatedNewsWidget from "./widgets/AqiWeatherRelatedNewsWidget/AqiWeatherRelatedNews";
import AqiTopCityWidget from "./widgets/AqiTopCityWidget/AqiTopCity";
import AqiHealthSuggationWidget from "./widgets/AqiHealthSuggationWidget/AqiHealthSuggation";
import AqiLastReportsWidget from "./widgets/AqiLastReportsWidget/AqiLastReports";
import AqiPollutedCitiesWidget from "./widgets/AqiPollutedCitiesWidget/AqiPollutedCities";
import AqiScaleWidget from "./widgets/AqiScaleWidget/AqiScale";

// ─── Weather Widgets ───
import MostPopularCityWeatherWidget from "./widgets/MostPopularCityWeatherWidget/MostPopularCityWeather";
import MostHotColdCityWidget from "./widgets/MostHotColdCityWidget/MostHotColdCity";
import WeatherForecastWidget from "./widgets/WeatherForecastWidget/WeatherForecast";
import WeatherFaqWidget from "./widgets/WeatherFaqWidget";
import YesterdayWeatherForecastWidget from "./widgets/YesterdayWeatherForecastWidget/YesterdayWeatherForecast";
import TodaysWeatherInCityWidget from "./widgets/WeatherForecastWidget/TodaysWeatherInCity";
import CityWeatherConditionWidget from "./widgets/CityWeatherConditionWidget/CityWeatherCondition";

// ─── Sidebar & Ads Widgets ───
import RightNewsWidget from "./widgets/RightNewsWidget/RightNews";

import RightNewsWidgetUP from "./widgets/RightNewsWidgetUP/RightNewsWidgetUP";
import RightNewsPhotoWidgetUP from "./widgets/RightNewsPhotoWidgetUP/RightNewsPhotoWidgetUP";

import CustomAdWidget from "./widgets/CustomAdWidget";
import TaboolaAdsWidget from "./widgets/TaboolaAdsWidget";

// ─── Misc Widgets ───
import FaqsWidget from "./widgets/FaqsWidget";
import PhotoContentSliderWidget from "./widgets/PhotoContentSliderWidget";
import BigBreakingNews from "./widgets/BigBreakingNewsWidget/BigBreakingNews";

// ─── Lazy-loaded widgets (not used on every page) ───
const GenericWidget = dynamic(() => import("./widgets/GenericWidget"));

import RelatedPhotosWidget from "./widgets/RelatedPhotosWidget/RelatedPhotosWidget";
import RelatedVideosWidget from "./widgets/RelatedVideosWidget/RelatedVideosWidget";
import RelatedWebstoryWidget from "./widgets/RelatedWebstoryWidget/RelatedWebstoryWidget";

import RecommendedNewsBottomWidget from "./widgets/RecommendedNewsBottomWidget/RecommendedNewsBottom";

import MobileFooterStickyBottomNavWidget from "./widgets/MobileFooterStickyBottomNavWidget/MobileFooterStickyBottomNav";
import MobileStickyAdWidget from "./widgets/MobileStickyAdWidget/MobileStickyAd";

import SubCategoryCommonWidget from "./widgets/SubCategoryCommonWidget/SubCategoryCommon";
import BigBreakingNewsWidget from "./widgets/BigBreakingNewsWidget/BigBreakingNews";
import BreakingNewsStrip from "./widgets/BreakingNewsStripWidget/BreakingNewsStrip";
import InfiniteScrollArticleWidget from "./widgets/InfiniteScrollArticleWidget/InfiniteScrollArticle";

const widgetRegistry = {
  // Core Layout
  "header": HeaderWidget,
  "header-up": HeaderWidgetUP,
  
  "footer": FooterWidget,
  "footer-up": FooterWidgetUP,

  "trending-navigation": TrendingNavigationWidget,
  "breaking-strip-widget": BreakingStripWidget,
  "top-ad-widget": TopAdWidget,
  "breadcrumb-widget": BreadcrumbWidget,

  // Homepage
  "home-top-news-widget": HomeTopNewsWidget,
  "home-top-news-widget-up": HomeTopNewsWidgetUP,

  "one-big-8-small-news-widget": OneBigEightSmallWidget,
  "five-col-news-widget-up" : FiveColNewsWidgetUP,
  "five-col-news-all-thumb-widget-up" : FiveColNewsAllThumbUP,

  "two-column-news-widget": TwoColumnNewsWidget,
  
  "three-column-news-widget": ThreeColumnNewsWidget,
  "three-column-news-widget-up": ThreeColNewsWidgetUP,
  
  "home-short-videos-widget": HomeShortVideosWidget,
  "home-short-videos-widget-up": HomeShortVideosWidgetUP,
  "home-aqi-widget": HomeAqiWidget,
  "home-premium-content-widget": HomePremiumContentWidget,
  "home-photo-slider-widget": HomePhotoSliderWidget,

  "home-photo-widget-up" : HomePhotoWidgetUP,

  "home-video-slider-widget": HomeVideoSliderWidget,
  
  "home-video-widget-up": HomeVideoWidgetUP,
  
  

  "six-news-widget": SixNewsWidget,
  "home-web-stories-widget": HomeWebStoriesWidget,
  "home-state-news-widget": HomeStateNewsWidget,
  "homepage-weather-widget": HomepageWeatherWidget,
  "big-breaking-news-widget":BigBreakingNews,

  // Detail Pages
  "detail-main-content-widget": DetailMainContentWidget,
  "photo-detail-main-content-widget": PhotoDetailMainContentWidget,
  "video-detail-main-content-widget": VideoDetailMainContentWidget,
  "live-blog-detail-main-content-widget": LiveBlogDetailMainContentWidget,
  "static-detail-content-widget": StaticDetailContent,

  // Listings
  "category-listing-common-widget": CategoryListingCommonWidget,
  "category-listing-common-widget-up": CategoryListingCommonWidgetUP,

  "photo-gallery-landing-widget": PhotoGalleryLanding,

  "web-stories-listing-common-widget": WebStoriesListingCommonWidget,
  "short-video-landing-widget": ShortVideoLandingWidget,
  "video-gallery-widget": VideoGalleryWidget,
  "video-gallery-landing-widget": VideoGalleryLanding,
  "article-four-news-widget": ArticleFourNewsWidget,

  // Topic & Author
  "topic-listing-widget": TopicListWidget,
  "topic-list-widget": AllTopicListWidget,
  "topic-information-widget": TopicInformationWidget,
  "author-list-widget": AuthorListWidget,

  "author-detail-widget": AuthorDetailWidget,  
  // AQI
  "aqi-perimeter-widget": AqiPerimeterWidget,
  "aqi-faq-widget": AqiFaqWidget,
  "aqi-index-widget": AqiIndexWidget,
  "aqi-related-news-widget": AqiRelatedNewsWidget,
  "aqi-top-city-widget": AqiTopCityWidget,
  "aqi-health-suggation-widget": AqiHealthSuggationWidget,
  "aqi-last-reports-widget": AqiLastReportsWidget,
  "aqi-polluted-cities-widget": AqiPollutedCitiesWidget,
  "aqi-scale-widget": AqiScaleWidget,

  // Weather
  "most-popular-city-weather-widget": MostPopularCityWeatherWidget,
  "most-hot-cold-city-widget": MostHotColdCityWidget,
  "weather-forecast-widget": WeatherForecastWidget,
  "weather-faq-widget": WeatherFaqWidget,
  "yesterday-weather-forecast-widget": YesterdayWeatherForecastWidget,
  "todays-weather-in-city-widget": TodaysWeatherInCityWidget,
  "city-weather-condition-widget": CityWeatherConditionWidget,

  // Sidebar & Ads
  "right-news-widget": RightNewsWidget,
  "right-news-widget-up": RightNewsWidgetUP,
  "right-news-photo-widget-up": RightNewsPhotoWidgetUP,
  
  "related-webstory-widget": RelatedWebstoryWidget,
  "related-photos-widget": RelatedPhotosWidget,
  "related-videos-widget": RelatedVideosWidget,

  "custom-ads-widget": CustomAdWidget,
  "taboola-ads-widget": TaboolaAdsWidget,

  // Misc
  "faqs-widget": FaqsWidget,
  "photo-content-slider-widget": PhotoContentSliderWidget,

  "recommended-news-bottom-widget": RecommendedNewsBottomWidget,
  "sub-category-common": SubCategoryCommonWidget,
  "big-breaking-news": BigBreakingNews,
  "breaking-news-strip": BreakingNewsStrip,

  "mobile-footer-sticky-bottomnav-widget": MobileFooterStickyBottomNavWidget,
  "mobile-sticky-ad-widget": MobileStickyAdWidget,
  "infinite-scroll-article-widget": InfiniteScrollArticleWidget
};

export function getWidgetComponent(type) {
  return widgetRegistry[type] || GenericWidget;
}
