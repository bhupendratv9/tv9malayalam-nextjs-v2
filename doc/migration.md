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
| 11 | Article detail page looks UP, not malayalamtv9 | **Resolved** — see §11 (widget CSS + `LayoutRightSidebar` class names) |
| 12 | Category cards leave localhost → `alphapublish.tv9hindi.com/...html` | **Resolved** — see §12 (`getHref` helper; `*UP` RHS widgets **not** changed) |
| 13 | Short-video detail 404 after staying on localhost | **Resolved** — see §13 (`.env` `SHORT_VIDEO_API_BASE_URL` `alphaup` → `alphamalayalam`) |
| 14 | Short-videos listing: empty SVG + no title under thumbs | **Resolved** — see §14 (ML listing markup/CSS, `#ytShort`) |
| 15 | Photo gallery view more → `/photo-gallery` 404 | **Resolved** — see §15 (S3 `photo-gallery-landing.json` 403; use `listing`) |
| 16 | City weather icon → `/weather-forecast` missing `basePath` | **Resolved** — see §10 leftover (`TodaysWeatherInCity.js`) |
| 17 | Google SSO does not work | **Leave** — see §17 (same as UP: no hardcoded client ID; CMS) |
| 18 | `/aqi` polluted-cities `city_label` / `rank_label` still Tamil | **Resolved** — see §18 (`CityTable` uses CMS labels) |
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
| `.env` `NEXT_PUBLIC_SITE_REWRITE_PATTERN` | `tv9up.com` regex | `malayalamtv9.com` **and** CMS `tv9hindi.com` — see §8 / §12 |
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

Active global sheet is the old Malayalam `globals.css`. **Open:** ad label is still Tamil (`விளம்பரம்`). Font is **Noto Sans** — see §6. After this swap, layout class names must be ML (`tv9wrapperMain` / `main_col` / `rhs_col`) — see §11.

---

## 3. Article tags crash (`Link is not defined`)

### Changes

Originally added `import Link from "next/link"` on `DetailMainContent.js`. §11 later switched tags to `AppLink` + `getHref(...)` (same file).

### Root cause

UP `DetailMainContent` rendered `<Link>` for tags without importing `next/link`. UP articles often had no tags so it never crashed. Malayalam articles with tags threw `Link is not defined`. Old Malayalam already imported `Link`.

### Resolution

Crash is gone. Tags now use `AppLink` + `getHref` so they keep `basePath` when `USE_LINK=0`. See §11.

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
| Short video env URL | `.env` `SHORT_VIDEO_API_BASE_URL` | **Resolved** — see §13 | `alphamalayalam/.../short-video-detail` |
| Next-article API | `.env` `NEXT_ARTICLE_API_URL` | still `alphaup` | `alphamalayalam/.../detail/{id}` |
| Infinite scroll path | `InfiniteScrollArticleWidget` | `BASE_PATH = "/tv9up-nextjs"` | `/tv9malayalam-nextjs` |
| Double-basePath strip | `lib/server/homePageBuilder.js` | **Resolved** — see §8 | UP-style collapse `/tv9malayalam-nextjs/tv9malayalam-nextjs/` |
| Page-builder fallback name | `lib/constants.js` | `PAGE_BUILDER_SITE_NAME = "tv9up"` | `tv9malayalam` |
| Font | `pages/_app.js` + AMP | **Resolved** — see §6 | Noto Sans like old ML |
| Font leftovers | UP widgets still CSS `"Anek Devanagari"` | unused on typical ML pages; same leftovers as old ML | see §6 leftover table — swap to `"Noto Sans"` only if those widgets go live |
| Rewrite pattern | `.env` `NEXT_PUBLIC_SITE_REWRITE_PATTERN` | **Resolved** — see §8 + §12 | live `malayalamtv9.com` **and** CMS `tv9hindi.com` |
| Web story **href** (double path) | CMS permalink + `getHref` | **Resolved** — see §8 | `basePath` / `SITE_URL` match CMS folder; doubled path collapses like UP |
| Web story 404 (detail) | `WebStoryDetailAMP.js` | **Resolved** — see §8 | `SITE_LANGUAGE` → `SITE_LANGUAGE_VALUE` |
| Page keys | `lib/pageConfig.js` | UP keys (`video-landing`, `detail-amp`); `photo-gallery-landing.json` **403** | **Partial** — photo gallery uses `listing` (§15); videos still `video-landing` |
| `top-9-widget` | `widgetRegistry.js` | not registered; ML homepage JSON may use it | copy from old ML **or** rebuild CMS to `*-up` |
| Header / sports links | `Header.js`, `Sports9HeaderWidget.js` | hardcoded `tv9up.com` | Malayalam URLs |
| Menus 404 | `fetchNavMenu` + `ENDPOINTS` | helper appends `.json`; ML menu URLs 404 | real ML menu URL or drop `.json` |
| Short-video permalinks | CMS | listing uses `/short-videos/{slug}`; rewrite is `/videos/short-videos/:slug` | CMS path `/videos/short-videos/{slug}` |
| AMP backups | `amp/widgets__05-08-2026/*` | tv9up logos (not live registry) | ignore or replace if used |
| `globals.css` ad label | `styles/globals.css` | copied from old ML (Tamil) | Malayalam copy |
| `#webstory-icon` | `public/images/icons.svg` | ML widgets request `#webstory-icon`; sprite does not have it | **Open** — see §9 |
| Weather / AQI click | `AppLink` `href="/aqi"` / `"/weather-forecast"` | **Resolved** — see §10 | `getHref(...)` including city-page weather tab |
| Article detail **style** | UP `DetailMainContent` + UP layout class names vs ML `globals.css` | **Resolved** — see §11 | ML widget CSS/markup + `LayoutRightSidebar` `tv9wrapperMain` / `main_col` / `rhs_col` |
| Category / listing **href** | `getHref` + `rewritePermalink` | **Resolved** — see §12 | shared helper rewrites CMS Alpha host; `RightNewsWidgetUP` / `RightNewsPhotoWidgetUP` left as UP (`item.url` only) |
| Short-videos **listing** chrome | UP `ShortVideoLanding` (no title, `#ic_shortvideo`) vs ML overlay + `#ytShort` | **Resolved** — see §14 | original ML markup/CSS; keep `AppLink` + `getHref` |

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
| `WeatherForecastWidget/TodaysWeatherInCity.js` | AQI tab **and** weather tab `getHref("/weather-forecast")` (city page leftover) |
| `AqiPollutedCitiesWidget/AqiPollutedCities.js` | city AQI hrefs |
| `AqiTopCityWidget/AqiTopCity.js` | city AQI hrefs |
| `public/images/icons.svg` | copied `#weather_icon`, `#sun_icon`, `#wind_icon` from original ML sprite |

`router.push(\`/aqi/...\`)` in `AqiIndex.js` left as-is — Next router already prefixes `basePath`. Unused root-level backup widgets (`AqiIndexWidget.js`, `HomeAqiWidget.js`, etc.) not in `widgetRegistry.js` were left unchanged.

### Root cause

`.env` `NEXT_PUBLIC_USE_LINK_NAVIGATION=0` → `AppLink` = `<a href={href}>`. Next `basePath` is **not** applied to raw `<a>`. Original homepage weather/AQI tabs use `next/link` `Link`, which prefixes `/tv9malayalam-nextjs`. Header both sides prefix `SITE_URL`, so header clicks were already fine. UP sprite also lacked `#weather_icon` / `#sun_icon` / `#wind_icon`, so header/tab SVGs were empty.

### Resolution

Relative `/aqi` and `/weather-forecast` (and city AQI) hrefs now go through `getHref`, which prefixes `SITE_URL` (`http://localhost:3000/tv9malayalam-nextjs`). Tab/header icons resolve from the copied sprite symbols.

**Follow-up:** city page `TodaysWeatherInCity.js` still had `weatherHref = "/weather-forecast"` without `getHref`. Clicking the weather tab from `/weather-forecast/chennai-weather-update` went to `http://localhost:3000/weather-forecast` (no `basePath`) → 404. Now `getHref("/weather-forecast")`. Do not change `tv9up-nextjs`.

---

## 11. Article detail page style (example Kerala pension URL)

Example:

`http://localhost:3000/tv9malayalam-nextjs/kerala/kerala-welfare-pension-july-distribution-begins-today-will-beneficiaries-get-rs-3000-2218429.html`

vs production `https://www.malayalamtv9.com/kerala/kerala-welfare-pension-july-distribution-begins-today-will-beneficiaries-get-rs-3000-2218429.html` and original `tv9malayalam-nextjs-original`.

This URL does **not** use `breaking-strip-widget`. `articleBody` in the HTML is JSON-LD only, not the layout wrapper.

### Changes

Copied original ML article chrome (hex CSS, not UP `var(--…)` tokens). Kept `decodeHtml` and `AppLink` + `getHref` for tags / relative live-TV.

| File | What we did |
|---|---|
| `DetailMainContentWidget/DetailMainContent.module.css` | replaced with original ML sheet + sticky Google badge rule |
| `DetailMainContentWidget/DetailMainContent.js` | `detailPage_Content`, `DetailPageAuthor`, YouTube / Google News / WhatsApp |
| `detail/ArticleFormat.js` | `.featuredImage` + caption inside figure |
| `detail/PhotoFormat.js` | original ML `photoSummaryGrid` |
| `detail/LiveblogFormat.js` | caption nested in `.featuredImage` |
| `PhotoDetailMainContent.js`, `LiveBlogDetailMainContent.js` | same author + Follow Us + wrapper classes |
| `InfiniteScrollArticleWidget/InfiniteScrollArticle.js` | `detailPage_Content` / `.featuredImage` so it matches the new CSS |
| `public/images/icons.svg` | copied `#icon_googleNews`, `#whats_iconff` |
| `layout/LayoutRightSidebar.js` | UP `mainWrapper` / `mainCol` / `rhsCol` → ML `tv9wrapperMain` / `main_col` / `rhs_col` so §2 globals grid applies |

Social URL defaults are `#` (CMS `dataConfig` can set Malayalam YouTube / Google News / WhatsApp / live TV). Do not change `tv9up-nextjs`.

### Root cause

Two layers:

1. **Widget chrome.** Globals were swapped to old ML (§2) but article widgets stayed the UP engine: `articleBody` / huge H1 / red hero frame / `DetailPageAuthorUP` / Facebook+Twitter pointing at TV9 UP, plus CSS variables that no longer exist in `globals.css`. Original Malayalam detail CSS never needed those tokens.
2. **Page grid (why it still looked broken after the widget swap).** ML `globals.css` lays out article + sidebar with `.tv9wrapperMain` / `.main_col` (`calc(100% - 320px)`) / `.rhs_col` (`300px`). The UP layout file still emitted `.mainWrapper` / `.mainCol` / `.rhsCol` (only defined in unused `_test_globals_.css`). Live HTML had `mainWrapper has-right-sidebar` — two-column grid never applied.

### Resolution

Article / photo / live-blog detail use original ML markup + CSS. `LayoutRightSidebar` class names match ML globals. Hard-refresh the Kerala pension URL: headline `1.625rem`, grey caption bar, ML author row, Follow Us YouTube / Google News / WhatsApp, **article left column + 300px right sidebar**.

**Still open (not this page’s article chrome):** AMP `CssAMP.js` still has UP article rules; `VideoDetailMainContentWidget.js` (root, registered) is old global-class markup; other UP widgets still call missing `:root` tokens (home-up, galleries, AQI tables); Tamil ad label; `<html lang="ma">`.

---

## 12. Category page article links go to `alphapublish.tv9hindi.com`

Example (sports listing card):

`https://alphapublish.tv9hindi.com/tv9malayalam-nextjs/sports/argentina-fan-launches-petition-for-fifa-world-cup-2026-final-replay-after-defeat-to-spain-2218331.html`

Expected local href:

`http://localhost:3000/tv9malayalam-nextjs/sports/argentina-fan-launches-petition-for-fifa-world-cup-2026-final-replay-after-defeat-to-spain-2218331.html`

Same class of bug as §8 (permalink rewrite / `getHref`). Not a Next.js route redirect — the `<a href>` is already the CMS publish host, so the browser leaves localhost.

### Changes

**Do not change** `RightNewsWidgetUP.js` or `RightNewsPhotoWidgetUP.js` (same as UP: `href={item.url}`). Rewrite belongs in the shared helper, not in `*UP` widgets. Those two files were briefly wrapped with `getHref`, then **reverted**.

1. `lib/helper/commonHelper.js` `getHref` — UP flow (prefix `SITE_URL`, collapse doubled `basePath`) **plus** original ML host rewrite in code, not env-only:
   - `alphapublish.tv9hindi.com` / other `tv9*.com` Alpha hosts
   - `malayalamtv9.com`
   - plus `NEXT_PUBLIC_SITE_REWRITE_PATTERN` if set
2. `lib/server/homePageBuilder.js` `rewritePermalink` — calls `getHref` (same as client; UP had a second hardcoded regex that drifted). SSR `items[].url` is already localhost before `*UP` widgets render.
3. Malayalam-only widgets that used raw `href` now wrap `getHref`:
   - `SixNewsWidget/SixNews.js`
   - `HeaderWidget/Header.js` mega menu (`/sports` etc. need `SITE_URL` when `USE_LINK=0`)
   - `RightNewsWidget/RightNews.js` already had `getHref` (ML twin of the UP RHS widget)
4. `lib/server/fetchNavMenu.js` — rewrite menu `url` via `getHref`.

`.env` `NEXT_PUBLIC_SITE_REWRITE_PATTERN` still includes live `malayalamtv9.com` **and** CMS `tv9hindi.com`.

### Root cause

Malayalam CMS permalinks are **`https://alphapublish.tv9hindi.com/tv9malayalam-nextjs/...`**. Original ML `getHref` rewrote that host in code. This fork copied UP `getHref`, which only rewrites `NEXT_PUBLIC_SITE_REWRITE_PATTERN`. Env-only `malayalamtv9.com` (and a later env tweak) was not enough: some ML listing widgets (`SixNews`, hamburger mega menu) used **raw** `href={item.url}` / `href={item.href}` like UP, assuming SSR already rewrote. Client load-more and relative `/sports` (no `basePath` when `AppLink` is a plain `<a>`) still sent the browser to Alpha or off `basePath`.

### Resolution

`getHref` always rewrites Alpha `tv9hindi.com` the same way original ML did. Server `rewritePermalink` uses that helper, so UP RHS widgets keep `item.url` and still stay local. Malayalam listing (`SixNews`, `Header.js` mega, `RightNews.js`) also calls `getHref`. Card href should be `http://localhost:3000/tv9malayalam-nextjs/sports/...html`, not `alphapublish.tv9hindi.com`. Hard-refresh after the Next rebuild.

Do not change `tv9up-nextjs`.

---

## 13. Short-video detail 404 (`alphaup` API)

Example:

`http://localhost:3000/tv9malayalam-nextjs/videos/short-videos/mohanlal-watching-fifa-world-cup-2026-final-at-new-york-new-jersey-stadium`

Dev log: `Fetch failed: 404 .../alphaup/pagecategory/short-video-detail/mohanlal-...` then Next `404`.

### Changes

`.env` (same UP env key, Malayalam tenant — env wins over `lib/constants.js` `SHORT_VIDEO_API_URL`):

```env
SHORT_VIDEO_API_BASE_URL=https://apipublish1.tv9hindi.com/apis/page-builder/alphamalayalam/pagecategory/short-video-detail
```

### Root cause

§12 made short-video **hrefs stay on localhost**. Before that, cards went to Alpha publish, so the local detail API was never hit. `pages/ShortVideoDetail/ShortVideoDetailPage.js` uses `process.env.SHORT_VIDEO_API_BASE_URL || SHORT_VIDEO_API_URL`. Env was still UP `alphaup` (leftover in §5). That endpoint 404s for Malayalam slugs. Constants already had `alphamalayalam` but env overrides it. Original ML uses `alphamalayalam` (optionally `/1min/` — both 200 for this slug).

### Resolution

Env matches UP’s shape with tenant `alphamalayalam`. **Restart `npm run dev`** (server env). Reload the Mohanlal short-video URL — should 200 and play, not Custom 404.

Do not change `tv9up-nextjs`.

---

## 14. Short-videos listing — empty SVG, no title under thumbs

Page: View more on homepage Short Videos → `/videos/short-videos`.

### Changes

1. `ShortVideoLandingWidget/ShortVideoLanding.module.css` — copied original ML listing CSS (`shortVideosListing_Wrapper`, `.sv_btn`, `.textgraint` gradient, red `#ytShort` badge). Replaced UP `shortvideosWidget_Thumbs` (no title overlay; `var(--color-red)` missing in ML `globals.css`).
2. `ShortVideoLandingWidget/ShortVideoLanding.js` — original ML card markup:
   - red corner `.sv_btn` + sprite `#ytShort` (homepage `HomeShortVideos.js` already used this)
   - `.textgraint` + `<h3>` title on the thumb
   - heading class `tv9common_heading` (ML globals)
   - kept `AppLink` + `getHref` / `getLink` (not `next/link`) so `USE_LINK=0` still has `basePath`

Do not change `tv9up-nextjs` or `HomeShortVideosWidgetUP`.

### Root cause

Listing widget was still the **UP engine** copy. UP cards are thumbnail + `#ic_shortvideo` only — **no title under the video**. Malayalamtv9 overlay is `.textgraint` (white clamped title on a bottom gradient) and a red `#ytShort` badge. Sprite already had `#ytShort` from §4; this page never requested it. Empty/odd SVG was UP’s icon + CSS (`position:absolute` on a bare `<svg>` without `.sv_btn`). Missing bottom text was missing markup, not a font bug.

### Resolution

Listing cards match homepage shorts / original ML: red shorts icon + title on the gradient. Hard-refresh `http://localhost:3000/tv9malayalam-nextjs/videos/short-videos`.

---

## 15. Photo gallery `/photo-gallery` 404

View more / header Photos → `http://localhost:3000/tv9malayalam-nextjs/photo-gallery` → Custom 404.

Dev log: `[buildHomePageData] Failed to fetch page photo-gallery-landing: Fetch failed: 403 https://api.tv9tamil.com/pagebuilder-apis/development/tv9malayalam/photo-gallery-landing.json`

### Changes

`pages/CategoryLanding/PhotoGalleryPage.js` `getServerSideProps` — same as `/sports` / `/world`:

```js
return getPageProps(PAGE_IDS.CATEGORY_LISTING, {
  query: { ...query, category: query.category || "photo-gallery" },
});
```

`next.config.js` rewrite `/photo-gallery` → this page is unchanged. Do not change `tv9up-nextjs`. `PAGE_IDS.PHOTO_GALLERY` stays `"photo-gallery-landing"` for when CMS publishes that JSON.

### Root cause

Same class as §13: §12 kept the click on **localhost**. Alpha publish had a working gallery. Local S3 mode fetches `{API_BASE}/{env}/tv9malayalam/{pageKey}.json`. Key `photo-gallery-landing` (and `photo-gallery`, `photos`, …) returns **403**. `listing.json` **200s**. Category API `.../category-detail/photo-gallery/0_15` **200s** (15 posts, title Photo Gallery). `getPageProps` treats empty fetch as `notFound`.

### Resolution

Photo gallery uses the shared listing page + `category=photo-gallery`. Reload `/photo-gallery` — listing should 200. Dedicated `photo-gallery-landing.json` is still missing on CDN (same leftover as `video-landing.json`).

---

## 17. Google SSO does not work

Fork copied UP SSO, which reads CMS `sso_enabled` + `google_sso_client_id`. Original Malayalam hardcoded the Google client ID and always rendered the sign-in widget. Malayalam CMS `site-global-settings.json` has **neither** field.

### Changes

None (RCA only). Do not change `tv9up-nextjs`.

### Root cause

1. **Empty Google client ID (homepage — `header` widget).** `Header.js` always mounts `GoogleSingleSignIn`. Init is:

   `clientId = siteSettings?.google_sso_client_id || GOOGLE_SSO_CLIENT_ID`

   - `lib/constants.js` (UP copy): `GOOGLE_SSO_CLIENT_ID = ""`
   - Malayalam CMS settings: no `google_sso_client_id`
   - Original ML: `GOOGLE_SSO_CLIENT_ID = "540494264173-alrp4h4kf8opo7f4gtq95lk8mrv938ar.apps.googleusercontent.com"`

   GIS never initializes (`if (resolvedClientId && window.google?.accounts?.id)` is false). Header person icon opens the drawer; **Continue with Google** is a dead custom button (GIS never `renderButton`).

2. **HeaderUP pages hide SSO entirely.** `HeaderUP.js` only renders `#GSignIn` + `GoogleSingleSignInUP` when `siteSettings.sso_enabled === "1"`. CMS has no `sso_enabled` → icon never appears on 404 / pages that use `header-up`. Homepage uses `header` (not `header-up`), so this is a second failure mode, not the home-page one.

3. **Sprite leftover.** Drawer button uses `#gIC`; current `icons.svg` (UP) has no `#gIC`. Original ML sprite does. Cosmetic until GIS `renderButton` replaces the button.

4. **Localhost after GIS works.** Callback POSTs `{ token, domain: window.location.hostname }` to `https://e.tv9news.com/sso_login`. Hostname `localhost` may be rejected by that API even with a valid token. Google Cloud authorized origin for GIS is `http://localhost:3000` (path `/tv9malayalam-nextjs` is not part of origin).

### Resolution

**Leave.** UP has no real fallback (`GOOGLE_SSO_CLIENT_ID = ""`). Client ID and `sso_enabled` come from CMS. Do not hardcode the original ML client ID. Add `google_sso_client_id` + `sso_enabled` in Malayalam site settings when SSO should work.

---

## 18. `/aqi` polluted-cities labels still Tamil

CMS [`aqi.json`](https://api.tv9tamil.com/pagebuilder-apis/development/tv9malayalam/aqi.json) `aqi-polluted-cities-widget` `data_config` has Malayalam `city_label` (`നഗരം`) and `rank_label` (`റാങ്ക്`). Table headings on `/aqi` still show Tamil (`நகரம்` / `தரவரிசை`). City rows from the AQI endpoint are fine.

### Changes

`components/pb/widgets/AqiPollutedCitiesWidget/AqiPollutedCities.js` — `CityTable` reads `rank_label` / `city_label` from CMS `dataConfig`. Do not change `tv9up-nextjs`.

### Root cause

`components/pb/widgets/AqiPollutedCitiesWidget/AqiPollutedCities.js` **never reads** `dataConfig.city_label` or `dataConfig.rank_label`. `CityTable` hardcodes Tamil:

```js
<th>தரவரிசை</th>
<th>நகரம்</th>
```

Copied from UP (`tv9up-nextjs` has the same Tamil `<th>`). Section titles *do* use CMS (`title_less_populated_city` / `title_highest_populated_city`), so headings look Malayalam while column labels stay Tamil.

Same fork already wires CMS labels correctly in `AqiPerimeterWidget`:

```js
<th>{dataConfig.rank_label}</th>
<th>{dataConfig.city_label}</th>
```

`CityTable` also never receives `dataConfig`, so even a later lookup inside the table would need that prop.

### Resolution

**Resolved.** `CityTable` now uses `dataConfig.rank_label` and `dataConfig.city_label` (same as `AqiPerimeterWidget`). Fallback `Rank` / `City` only if CMS omits them.

---

## How CSS loads

1. `pages/_app.js` → `styles/globals.css` (site-wide). Includes ML layout: `.tv9wrapperMain` / `.main_col` / `.rhs_col`.
2. `layout/LayoutRightSidebar.js` must emit those same class names (not UP `mainWrapper` / `mainCol` / `rhsCol`).
3. Widget `*.module.css` — per component (article detail module is ML; many others still UP).
4. Splide CSS — imported in slider widgets, not `_app.js`.
5. `_document.js` CDN Splide `<link>` — commented out.

---

## Bottom line

**Resolved:** tenant `basePath` **`/tv9malayalam-nextjs`** (same as CMS, like UP); `SITE_URL` + rewrite for `malayalamtv9.com` **and** CMS `tv9hindi.com` in `getHref` / `rewritePermalink` (§8 / §12) — `RightNewsWidgetUP` / `RightNewsPhotoWidgetUP` **not** edited; ML `globals.css`; sprite `#ytShort` / `#rgt-arrow` / `#p_icon` / `#weather_icon` / `#sun_icon` / `#wind_icon` / `#icon_googleNews` / `#whats_iconff`; `ViewMoreLink` uses `ICONS_SVG`; **Noto Sans**; web-story AMP `SITE_LANGUAGE_VALUE`; Weather/AQI `getHref` (§10, city weather tab too); article detail ML chrome + layout grid (§11); short-video detail API `alphamalayalam` (§13); short-videos **listing** ML overlay + `#ytShort` (§14); photo gallery `/photo-gallery` uses `listing` (§15).

**Open:** logo; next-article `alphaup` env API; infinite-scroll `BASE_PATH`; page keys (`video-landing.json` still 403); `top-9-widget`; menu `.json` 404s; `#webstory-icon` (§9); Anek leftovers in unused UP widgets (§6); Tamil ad label in `globals.css`. Reference for ML-only bits: `tv9malayalam-nextjs-original`.
