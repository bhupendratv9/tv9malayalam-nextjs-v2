/**
 * Centralized Page ID / Page Key Configuration
 * =============================================
 * All page builder identifiers are managed here.
 *
 * Values can be:
 *   - Numeric string: "1" → fetches by ID (/api/admin/public/pages/1)
 *   - Page key string: "home-page" → fetches by key (/api/admin/public/pages/home-page)
 *
 * The `fetchPageBuilderPage` function in pageBuilder.js handles both formats.
 *
 * Usage:
 *   import { PAGE_IDS } from '../../lib/pageConfig';
 *   const page = await buildHomePageData(PAGE_IDS.HOME, { queryParams });
 */

const PAGE_IDS = {
  // ─── Home ───
  HOME: "home-page",                           // 1

  // ─── Generic Listing ───
  CATEGORY_LISTING: "listing",                 // 2

  // ─── Article Detail ───
  ARTICLE_DETAIL: "detail",                    // 3
  VIDEO_DETAIL: "video-detail",                // 14
  PHOTO_DETAIL: "photo-detail",                // 13
  LIVE_BLOG_DETAIL: "liveblog-detail",         // 15

  // ─── Article Detail AMP ───
  // ARTICLE_DETAIL_AMP: "detail-amp",
  // VIDEO_DETAIL_AMP: "video-detail-amp",
  // PHOTO_DETAIL_AMP: "photo-detail-amp",
  // LIVE_BLOG_DETAIL_AMP: "liveblog-detail-amp",

  ARTICLE_DETAIL_AMP: "detail-amp",
  VIDEO_DETAIL_AMP: "video-detail-amp",
  PHOTO_DETAIL_AMP: "photo-detail-amp",
  LIVE_BLOG_DETAIL_AMP: "liveblog-detail-amp",

  // ─── Category Landing Pages ───
  SPORTS_LANDING: "sports-landing",            // 5
  ENTERTAINMENT: "entertainment-landing",      // 6
  WEB_STORIES: "webstories-landing",           // 7
  WEB_STORIES_LISTING: "webstories-listing-page",                  // 74
  PHOTO_GALLERY: "photo-gallery-landing",      // 8
  RASHIPHAL: "rashiphal",                      // 9
  VIDEOS: "video-landing",                     // 10
  EDUCATION: "education",                      // 11
  BUDGET: "budget",                            // 41
  LATEST_NEWS: 'latest-news',
  CITIES_LANDING: 'city-landing',

  // ─── Sports / Cricket ───
  CRICKET_SCORECARD: "cricket-scorecard-page", // 16
  CRICKET_LANDING_PAGE: "cricket-landing-page",// 33
  ICC_SCHEDULE_PAGE: "cricket-schedule-page",  // 34
  ICC_RESULT_PAGE: "circket-result-page",      // 37
  ICC_CRICKET_TEAM: "cricket-team-page",       // 45
  ICC_CRICKET_RANKING: "cricket-ranking-page", // 44
  ICC_SERIES: "icc-series-page",               // 56
  PLAYER_PROFILE: "player-profile-page",       // 53
  ICC_CRICKET_TEAM_PROFILE: "cricket-team-profile-page", // 46

  // ─── IPL ───
  IPL_LANDING_PAGE: "ipl-landing-page",        // 55
  IPL_SCHEDULE_PAGE: "ipl-schedule-page",      // 57
  IPL_RESULT_PAGE: "ipl-result-page",          // 59
  IPL_TEAMS_PAGE: "ipl-team-page",             // 61
  IPL_TEAMS_PROFILE_PAGE: "ipl-teams-profile", // 62
  IPL_POINT_TABLE_PAGE: "ipl-point-table",     // 63
  IPL_STATS_PAGE: "ipl-stats-page",            // 64

  // ─── Rashiphal ───
  RASHIFAL_LANDING_PAGE: "rashiphal",          // 9
  RASHIFAL_DETAILS_PAGE: "libra",              // 66

  // ─── Mahakumbh Mela ───
  MAHAKUMBH_MELA_PAGE: "mahakumbh-mela",       // 60

  // ─── Elections ───
  ELECTIONS_LANDING: "elections",               // 17
  ASSEMBLY_ELECTION: "assembly-election-page",  // 19
  ASSEMBLY_ELECTION_CONSTITUENCIES: "assembly-election-constituencies", // 23
  ALLIANCE_PARTY_WISE: "election-alliance-party-wise-election-result",  // 24
  ASSEMBLY_ELECTION_VIDHAN_SABHA: "assembly-election-state-wise-page",  // 54
  EXIT_POLL_RESULT: "elections-exit-poll-result",                        // 25
  ASSEMBLY_ELECTION_SCHEDULE: "elections-assembly-election-schedule",    // 26

  // ─── AQI ───
  AQI: "aqi",                                  // 18
  AQI_CITY: "aqi-detail",                      // 27

  // ─── Weather Forecast ───
  WEATHER_FORECAST: "weather-forecast",        // 4
  WEATHER_FORECAST_CITY: "weather-city-forecast", // 73

  // ─── Static Pages ───
  STATIC_PAGE: "static-pages",                 // 20

  // ─── Topic ───
  TOPIC_LANDING: "topic",                      // 21
  TOPIC_LISTING: "topic-listing",              // 29

  // ─── Author ───
  AUTHOR_LANDING: "author-landing-page",       // 42
  AUTHOR_LISTING: "author-listing-page",       // 36

  // ─── Anchor ───
  ANCHOR_LANDING: "anchor",                    // 40
  ANCHOR_DETAIL: "tv9hindi-nextjs-anchor-detail", // 49

  // ─── Live TV ───
  LIVE_TV: "live-tv",                          // 28

  // ─── Short Videos ───
  SHORT_VIDEOS: "short-videos",                // 52

  // ─── Petrol Price ───
  PETROL_PRICE_TODAY: "petrol-price",          // 43

  // ─── Podcasts ───
  PODCAST: "podcast",                          // 67
  NEWS_PODCAST: "news-podcast",                // 68
  CRIME_PODCAST: "crime-podcast",              // 69
  HEALTH_PODCAST: "health-podcast",            // 70
  ENTERTAINMENT_PODCAST: "entertainment-podcast", // 71
};

module.exports = { PAGE_IDS };