# UP → Malayalam migration (`tv9malayalam-nextjs`)

Date: 21 Aug 2026  
Source: copy of `tv9up-nextjs` (UP page-builder app)  
Target: **malayalamtv9** (`API_SITE_NAME=tv9malayalam`, APIs `alphamalayalam`)  
Local URL: `http://localhost:3000/tv9malayalam-nextjs`

This tree is the UP engine retargeted for Malayalam (formerly worked as `tv9malayalam-nextjs-v2`). `tv9up-nextjs` stays UP. Original Malayalam app is now `tv9malayalam-nextjs-original` (reference for ML-only widgets / CSS / fonts).

**Log rule:** every issue in this file must have **Changes**, **Root cause**, and **Resolution** (or **Open** if not fixed yet).

## Change log (all work)

| # | Topic | Status |
|---|---|---|
| 1 | Tenant retarget (`basePath`, site name, APIs, proxy) | **Resolved** |
| 2 | `globals.css` swap to old ML | **Resolved** (ad label still Tamil — open) |
| 3 | Article tags `Link is not defined` | **Resolved** |
| 4 | Short-video sprite `#ytShort` + `#rgt-arrow` + `ICONS_SVG` / `ViewMoreLink` | **Resolved** |
| 6 | Fonts: `Noto_Sans` in `_app.js` + AMP CSS / Google Fonts | **Resolved** |
| 6 leftovers | UP widgets still CSS `"Anek Devanagari"` | **Open** (unused on typical ML pages) |
| 7 | Trending Photos `#p_icon` copied into sprite | **Resolved** |
| 8 | Web-story href: `basePath` / `SITE_URL` / rewrite pattern like UP | **Resolved** |
| 8 | Web-story AMP `SITE_LANGUAGE` → `SITE_LANGUAGE_VALUE` | **Resolved** |
| 9 | `#webstory-icon` missing from sprite | **Open** |
| 10 | Weather / AQI clicks miss `basePath` (`AppLink` + `USE_LINK=0`) | **Resolved** — see §10 |
| 5 | Logo, `alphaup` env APIs, infinite-scroll path, page keys, `top-9-widget`, menus `.json` | **Open** |

---

## 1. Tenant retarget (copy UP → this folder)

### Changes

| File | UP | v2 |
|---|---|---|
| `next.config.js` | `basePath: '/tv9up-nextjs'` | `basePath: '/tv9malayalam-nextjs'` (same CMS folder as old ML; was briefly `-v2`) |
| `.env` `NEXT_PUBLIC_SITE_URL` | alphapublish `tv9up-nextjs` | `http://localhost:3000/tv9malayalam-nextjs` |
| `.env` `PORT` | `3300` | `3000` |
| `.env` `STATIC_DEPLOY_DIR` | `.../tv9up-nextjs` | `.../tv9malayalam-nextjs` |
| `.env` `API_SITE_NAME` | `tv9up` | `tv9malayalam` |
| `.env` `NEXT_PUBLIC_SITE_NAME` | `Tv9up` | `tv9malayalam` |
| `.env` `NEXT_PUBLIC_SITE_LANGUAGE` | `hi` | `ma` |
| `.env` `PROXY_ORIGIN` | `tv9tamilnews.com` | `https://www.malayalamtv9.com` |
| `.env` `MENU_API_BASE_URL` | UP `wpapis/.../menus` | `.../alphamalayalam/pagecategory` |
| `.env` `TRENDING_MENU_SLUG` | empty | `trending-tags` |
| `.env` `WEBSTORY_API_BASE_URL` | `alphaup` | `alphamalayalam` |
| `.env` `NEXT_PUBLIC_SITE_REWRITE_PATTERN` | `tv9up.com` regex | `malayalamtv9.com` regex (same shape as UP) — see §8 |
| `lib/constants.js` `SHORT_VIDEO_API_URL` | `alphaup/.../short-video-detail` | `alphamalayalam/.../short-video-detail` |

Rewrites unchanged (same UP routes). `PAGE_BUILDER_MODE` still `s3`.

### Root cause

UP copy still pointed at UP `basePath`, site name, menus, and `alphaup` APIs. Malayalam CMS JSON and `alphamalayalam` APIs would not load.

### Resolution

Retargeted env + `basePath` + short-video constants fallback as above. **Open leftovers** (logo, `SHORT_VIDEO_API_BASE_URL`, next-article API, infinite-scroll path, menus `.json` 404) are listed in §5.

---

## 2. Global CSS swap

### Changes

| File | What we did |
|---|---|
| `styles/globals.css` | Replaced UP globals with old Malayalam `tv9malayalam-nextjs/styles/globals.css` |
| `styles/_test_globals_.css` | Kept original UP globals (not imported) |

`pages/_app.js` still `import "../styles/globals.css"`. Commented homepage CSS imports stay commented (files not in this tree).

### Root cause

UP globals (`:root` tokens, UP layout) do not match Malayalam site chrome. Widget CSS modules stayed UP; only the site-wide sheet needed the old ML look.

### Resolution

Active global sheet is the old Malayalam `globals.css`. **Open:** ad label is still Tamil (`விளம்பரம்`). Font is **Noto Sans** — see §6.

---

## 3. Article tags crash (`Link is not defined`)

### Changes

`components/pb/widgets/DetailMainContentWidget/DetailMainContent.js` — added:

```js
import Link from "next/link";
```

### Root cause

UP `DetailMainContent` rendered `<Link>` for tags without importing `next/link`. UP articles often had no tags so it never crashed. Malayalam articles with tags threw `Link is not defined`. Old Malayalam already imported `Link`.

### Resolution

Added the import. Tags on article detail should render.

---

## 4. Short video SVG icons missing / wrong

### Changes

1. `lib/constants.js`

```js
// was (UP copy)
ICONS_SVG = "/tv9up-nextjs/images/icons.svg"

// now
ICONS_SVG = "/tv9malayalam-nextjs/images/icons.svg"
```

2. `public/images/icons.svg` — copied `#ytShort` and `#rgt-arrow` from old ML sprite into the UP sprite.
3. `lib/helper/commonHelper.js` `ViewMoreLink` default:

```js
// was
iconId = "/images/icons.svg#rgt-arrow"

// now
iconId = `${ICONS_SVG}#rgt-arrow`
```

Homepage widget `HomeShortVideos.js` still uses `#ytShort` (correct for Malayalam CMS type `home-short-videos-widget`).

### Root cause

Three separate bugs:

1. **Wrong sprite URL.** `<use href>` is a browser path. Next `basePath` is **not** applied. `/tv9up-nextjs/images/icons.svg` 404s on this app.
2. **Missing symbol.** Malayalam `home-short-videos-widget` requests `#ytShort`. UP sprite had `#ic_shortvideo` only. Sprite could 200 and the red shorts badge stayed **empty**.
3. **View more ignored `ICONS_SVG`.** Default `/images/icons.svg#rgt-arrow` has no `basePath` → `GET /images/icons.svg 404`. UP sprite also had no `#rgt-arrow`.

Checked:

| URL | Result |
|---|---|
| `/tv9malayalam-nextjs/images/icons.svg` | **200** |
| `/tv9up-nextjs/images/icons.svg` | **404** |
| `/images/icons.svg` | **404** |

Detail player (`ShortVideoDetailPage.js`) uses inline SVGs, not this sprite.

### Resolution

Path includes `basePath`; `#ytShort` + `#rgt-arrow` added to the sprite; `ViewMoreLink` uses `ICONS_SVG`. Hard-refresh home / short-videos listing. Dev log should no longer show `GET /images/icons.svg 404`.

---

## 5. Still UP / not resolved

| Area | File | Root cause | Open resolution |
|---|---|---|---|
| Logo | `.env` `NEXT_PUBLIC_SITE_LOGO_URL` | still tv9up logo URL | Malayalam logo (or `siteSettings.logo_url`) |
| Short video env URL | `.env` `SHORT_VIDEO_API_BASE_URL` | still `alphaup` (env wins over constants) | `alphamalayalam/.../short-video-detail` |
| Next-article API | `.env` `NEXT_ARTICLE_API_URL` | still `alphaup` | `alphamalayalam/.../detail/{id}` |
| Infinite scroll path | `InfiniteScrollArticleWidget` | `BASE_PATH = "/tv9up-nextjs"` | `/tv9malayalam-nextjs` |
| Double-basePath strip | `lib/server/homePageBuilder.js` | **Resolved** — see §8 | UP-style collapse `/tv9malayalam-nextjs/tv9malayalam-nextjs/` |
| Page-builder fallback name | `lib/constants.js` | `PAGE_BUILDER_SITE_NAME = "tv9up"` | `tv9malayalam` |
| Font | `pages/_app.js` + AMP | **Resolved** — see §6 | Noto Sans like old ML |
| Font leftovers | UP widgets still CSS `"Anek Devanagari"` | unused on typical ML pages; same leftovers as old ML | see §6 leftover table — swap to `"Noto Sans"` only if those widgets go live |
| Rewrite pattern | `.env` `NEXT_PUBLIC_SITE_REWRITE_PATTERN` | **Resolved** — see §8 | same shape as UP, host `malayalamtv9.com` |
| Web story **href** (double path) | CMS permalink + `getHref` | **Resolved** — see §8 | `basePath` / `SITE_URL` match CMS folder; doubled path collapses like UP |
| Web story 404 (detail) | `WebStoryDetailAMP.js` | **Resolved** — see §8 | `SITE_LANGUAGE` → `SITE_LANGUAGE_VALUE` |
| Page keys | `lib/pageConfig.js` | UP keys (`video-landing`, `detail-amp`) | ML JSON keys **or** rebuild CMS |
| `top-9-widget` | `widgetRegistry.js` | not registered; ML homepage JSON may use it | copy from old ML **or** rebuild CMS to `*-up` |
| Header / sports links | `Header.js`, `Sports9HeaderWidget.js` | hardcoded `tv9up.com` | Malayalam URLs |
| Menus 404 | `fetchNavMenu` + `ENDPOINTS` | helper appends `.json`; ML menu URLs 404 | real ML menu URL or drop `.json` |
| Short-video permalinks | CMS | listing uses `/short-videos/{slug}`; rewrite is `/videos/short-videos/:slug` | CMS path `/videos/short-videos/{slug}` |
| AMP backups | `amp/widgets__05-08-2026/*` | tv9up logos (not live registry) | ignore or replace if used |
| `globals.css` ad label | `styles/globals.css` | copied from old ML (Tamil) | Malayalam copy |
| `#webstory-icon` | `public/images/icons.svg` | ML widgets request `#webstory-icon`; sprite does not have it | **Open** — see §9 |
| Weather / AQI click | `AppLink` `href="/aqi"` / `"/weather-forecast"` | **Resolved** — see §10 | `getHref(...)` so `USE_LINK=0` still includes `basePath` |

---

## 6. Fonts — Noto Sans like malayalamtv9

### Changes

1. `pages/_app.js`

```js
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
// root: <div className={notoSans.className} role="main">
```

2. `lib/server/amp/ampPageBuilder.js` — Google Fonts URL `Anek+Devanagari` → `Noto+Sans:wght@400;500;600;700`.
3. `components/pb/amp/widgets/CssAMP.js` — `body` font `"Anek Devanagari"` → `"Noto Sans"`.

### Left as-is — unused UP widgets still name `"Anek Devanagari"`

These files were **not** changed. They hardcode `font-family: "Anek Devanagari"` in widget CSS. `tv9malayalam-nextjs-original` has the same leftovers. They are Hindi/UP campaign widgets and are unused on a typical Malayalam homepage / article. Site-wide Noto Sans from `_app.js` still applies unless these rules override a heading/body inside the widget.

| File | Why left |
|---|---|
| `components/pb/widgets/FaqsWidget.js` | FAQ heading + content still `"Anek Devanagari"` |
| `components/pb/widgets/MahakumbhHistorySliderWidget.js` | Mahakumbh history titles |
| `components/pb/widgets/TabNavigationWidget.js` | route-info tabs (Mahakumbh) |
| `components/pb/widgets/BathingDatesWidget.js` | snan-date cards |
| `components/pb/widgets/PhotoContentSliderWidget.js` | pramukh-akhada slider titles |
| `components/pb/amp/widgets__05-08-2026/CssAMP.js` | AMP backup folder, **not** in live registry |

If any of these widgets are added to a Malayalam page-builder JSON, change those `font-family` strings to `"Noto Sans"` (or drop them so they inherit `_app.js`).

### Root cause

v2 was an UP copy. UP’s site font is **Anek Devanagari** (Hindi). Malayalamtv9 / old `tv9malayalam-nextjs` uses **Noto Sans** on the app wrapper (`latin`, 400–700). Devanagari does not cover Malayalam script.

### Resolution

v2 (this tree) now loads **Noto Sans** the same way as original ML (`_app.js` + live AMP CSS). Hard-refresh the site. Leftover widget CSS above is documented, not swapped, matching original ML. A dedicated `Noto_Sans_Malayalam` face was not requested.

---

## 7. Trending Photos empty camera SVG (`#p_icon`)

### Changes

`public/images/icons.svg` — copied `#p_icon` from original ML sprite into the UP sprite.

`HomeTopNews.js` (and other non-UP listing widgets) already request:

```html
<svg><use href="/tv9malayalam-nextjs/images/icons.svg#p_icon"></use></svg>
```

That URL **200s**. The fragment `#p_icon` was missing, so the orange badge stayed empty.

Same `#p_icon` usage (now resolved by the sprite):

- `HomeTopNewsWidget/HomeTopNews.js` (right-side Trending Photos)
- `RightNewsWidget/RightNews.js`
- `HomeStateNewsWidget/HomeStateNews.js`
- `SixNewsWidget/SixNews.js`
- `CategoryListingCommonWidget/CategoryListingCommon.js`
- `CategoryListingCommonWidgetUP/CategoryListingCommonUP.js`
- `ArticleFourNewsWidget/ArticleFourNews.js`
- `TopicListingWidget/TopicListing.js`

UP widgets that already used `#ic_photo` (`HomeTopNewsUP`, `RelatedPhotosWidget`, `HomePhotoWidgetUP`, …) were already drawing; left as-is.

### Root cause

v2 sprite is the UP copy. UP names the camera `#ic_photo`. Malayalam / old-ML widgets name it `#p_icon`. Sprite file loads; `<use>` fragment does not match → empty SVG. Same class of bug as `#ytShort` vs `#ic_shortvideo`.

### Resolution

`#p_icon` is in the sprite (camera outline with white stroke, same as original ML). Hard-refresh home; Trending Photos badge should show the camera. `#v_icon` was already in the UP sprite.

---

## 8. Web story routes — same folder as CMS (like UP)

### Changes

Same mechanism as UP (`basePath` equals the folder CMS already puts in permalinks):

1. `next.config.js` `basePath: '/tv9malayalam-nextjs'`
2. `.env`

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000/tv9malayalam-nextjs
NEXT_PUBLIC_SITE_REWRITE_PATTERN=^https?://(www|app|alpha|alphapublish)\\.malayalamtv9\\.com
```

3. `lib/helper/commonHelper.js` `getHref` — UP-style: prefix `SITE_URL`, collapse doubled current `basePath`.
4. `lib/server/homePageBuilder.js` `rewritePermalink` — UP-style collapse `/tv9malayalam-nextjs/tv9malayalam-nextjs/` (same as UP `/tv9up-nextjs/tv9up-nextjs/`).
5. `lib/constants.js` `ICONS_SVG` — `/tv9malayalam-nextjs/images/icons.svg` (sprite URL must follow `basePath`).
6. `pages/WebStory/WebStoryDetailAMP.js` — `SITE_LANGUAGE_VALUE` (still required for AMP).

This app folder is now `tv9malayalam-nextjs`. Original ML is `tv9malayalam-nextjs-original`.

### Root cause

CMS permalinks use `/tv9malayalam-nextjs/...`. UP works because CMS folder and `basePath` are the same (`/tv9up-nextjs`), so `getHref` doubling collapses. While this tree was named `-v2`, `basePath` was `/tv9malayalam-nextjs-v2`, so doubling never matched.

### Resolution

`basePath` / `SITE_URL` now match CMS. Relative `/tv9malayalam-nextjs/web-stories/{slug}` + `SITE_URL` becomes a doubled path, then collapses to `http://localhost:3000/tv9malayalam-nextjs/web-stories/{slug}`. **Restart `npm run dev`** (`basePath` + `NEXT_PUBLIC_*`). Open `http://localhost:3000/tv9malayalam-nextjs`. Do not run `tv9malayalam-nextjs-original` on the same port with the same `basePath`.

---

## 9. Web story card icon empty (`#webstory-icon`) — **Open**

### Changes

None yet.

`HomeWebStories.js` (and `WebStoriesListing.js`) request:

```html
<svg><use xlink:href="/tv9malayalam-nextjs/images/icons.svg#webstory-icon"></use></svg>
```

Sprite has `#ytShort`, `#rgt-arrow`, `#p_icon`. It does **not** have `#webstory-icon`. Original ML sprite does.

### Root cause

Same class of bug as `#p_icon` / `#ytShort`: UP sprite uses other ids (`#ic_webstory`). Malayalam widgets use `#webstory-icon`. File 200s; fragment missing → empty badge.

### Resolution

**Open.** Copy `#webstory-icon` from `tv9malayalam-nextjs-original/public/images/icons.svg` into this sprite when asked.

---

## 10. Weather / AQI clicks go to the wrong URL

Correct (this app + malayalamtv9 / original):

```
http://localhost:3000/tv9malayalam-nextjs/weather-forecast
http://localhost:3000/tv9malayalam-nextjs/aqi
```

`next.config.js` already rewrites those paths. `PAGE_IDS.AQI` / `WEATHER_FORECAST` match original (`aqi`, `weather-forecast`). Header already used `${SITE_URL}/weather-forecast` and `${SITE_URL}/aqi`.

### Changes

Wrapped live-registry Weather/AQI `AppLink` hrefs with `getHref(...)` so plain `<a>` tags still include `SITE_URL` / `basePath`:

| File | What we did |
|---|---|
| `HomepageWeatherWidget/HomepageWeather.js` | tabs `getHref("/weather-forecast")` / `getHref("/aqi")` |
| `HomeAqiWidget/HomeAqi.js` | tabs + Delhi city card |
| `AqiIndexWidget/AqiIndex.js` | weather tab |
| `WeatherForecastWidget/WeatherForecast.js` | AQI tabs + AQI card |
| `WeatherForecastWidget/TodaysWeatherInCity.js` | AQI tab |
| `AqiPollutedCitiesWidget/AqiPollutedCities.js` | city AQI hrefs |
| `AqiTopCityWidget/AqiTopCity.js` | city AQI hrefs |
| `public/images/icons.svg` | copied `#weather_icon`, `#sun_icon`, `#wind_icon` from original ML sprite |

`router.push(\`/aqi/...\`)` in `AqiIndex.js` left as-is — Next router already prefixes `basePath`. Unused root-level backup widgets (`AqiIndexWidget.js`, `HomeAqiWidget.js`, etc.) not in `widgetRegistry.js` were left unchanged.

### Root cause

`.env` `NEXT_PUBLIC_USE_LINK_NAVIGATION=0` → `AppLink` = `<a href={href}>`. Next `basePath` is **not** applied to raw `<a>`. Original homepage weather/AQI tabs use `next/link` `Link`, which prefixes `/tv9malayalam-nextjs`. Header both sides prefix `SITE_URL`, so header clicks were already fine. UP sprite also lacked `#weather_icon` / `#sun_icon` / `#wind_icon`, so header/tab SVGs were empty.

### Resolution

Relative `/aqi` and `/weather-forecast` (and city AQI) hrefs now go through `getHref`, which prefixes `SITE_URL` (`http://localhost:3000/tv9malayalam-nextjs`). Tab/header icons resolve from the copied sprite symbols. Do not change `tv9up-nextjs`.

---

## How CSS loads

1. `pages/_app.js` → `styles/globals.css` (site-wide).
2. Widget `*.module.css` — per component (still UP modules).
3. Splide CSS — imported in slider widgets, not `_app.js`.
4. `_document.js` CDN Splide `<link>` — commented out.

---

## Bottom line

**Resolved:** tenant `basePath` **`/tv9malayalam-nextjs`** (same as CMS, like UP); `SITE_URL` + malayalamtv9 rewrite pattern; ML `globals.css`; `Link` import; sprite `#ytShort` / `#rgt-arrow` / `#p_icon` / `#weather_icon` / `#sun_icon` / `#wind_icon`; `ViewMoreLink` uses `ICONS_SVG`; **Noto Sans**; web-story AMP `SITE_LANGUAGE_VALUE`; Weather/AQI `getHref` (§10).

**Open:** logo; several `alphaup` env APIs; infinite-scroll `BASE_PATH`; page keys; `top-9-widget`; menu `.json` 404s; `#webstory-icon` (§9); Anek leftovers in unused UP widgets (§6); Tamil ad label in `globals.css`. Reference for ML-only bits: `tv9malayalam-nextjs-original`.
