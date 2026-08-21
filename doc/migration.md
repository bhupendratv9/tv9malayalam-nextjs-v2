# UP → Malayalam migration (`tv9malayalam-nextjs-v2`)

Date: 21 Aug 2026  
Source: copy of `tv9up-nextjs` (UP page-builder app)  
Target: **malayalamtv9** (`API_SITE_NAME=tv9malayalam`, APIs `alphamalayalam`)  
Local URL: `http://localhost:3000/tv9malayalam-nextjs-v2`

This tree is the UP engine retargeted for Malayalam. `tv9up-nextjs` stays UP. Old `tv9malayalam-nextjs` is the reference for Malayalam-only pieces (global CSS, `top-9-widget`, page keys).

**Log rule:** every issue in this file must have **Changes**, **Root cause**, and **Resolution** (or **Open** if not fixed yet).

---

## 1. Tenant retarget (copy UP → this folder)

### Changes

| File | UP | v2 |
|---|---|---|
| `next.config.js` | `basePath: '/tv9up-nextjs'` | `basePath: '/tv9malayalam-nextjs-v2'` |
| `.env` `NEXT_PUBLIC_SITE_URL` | alphapublish `tv9up-nextjs` | `http://localhost:3000/tv9malayalam-nextjs-v2` |
| `.env` `PORT` | `3300` | `3000` |
| `.env` `STATIC_DEPLOY_DIR` | `.../tv9up-nextjs` | `.../tv9malayalam-nextjs` |
| `.env` `API_SITE_NAME` | `tv9up` | `tv9malayalam` |
| `.env` `NEXT_PUBLIC_SITE_NAME` | `Tv9up` | `tv9malayalam` |
| `.env` `NEXT_PUBLIC_SITE_LANGUAGE` | `hi` | `ma` |
| `.env` `PROXY_ORIGIN` | `tv9tamilnews.com` | `https://www.malayalamtv9.com` |
| `.env` `MENU_API_BASE_URL` | UP `wpapis/.../menus` | `.../alphamalayalam/pagecategory` |
| `.env` `TRENDING_MENU_SLUG` | empty | `trending-tags` |
| `.env` `WEBSTORY_API_BASE_URL` | `alphaup` | `alphamalayalam` |
| `.env` `NEXT_PUBLIC_SITE_REWRITE_PATTERN` | `tv9up.com` regex | **cleared** (empty) |
| `lib/constants.js` `SHORT_VIDEO_API_URL` | `alphaup/.../short-video-detail` | `alphamalayalam/.../short-video-detail` |

Rewrites unchanged (same UP routes). `PAGE_BUILDER_MODE` still `s3`.

### Root cause

UP copy still pointed at UP `basePath`, site name, menus, and `alphaup` APIs. Malayalam CMS JSON and `alphamalayalam` APIs would not load.

### Resolution

Retargeted env + `basePath` + short-video constants fallback as above. **Open leftovers** (logo, `SHORT_VIDEO_API_BASE_URL`, next-article API, infinite-scroll path, rewrite pattern, menus `.json` 404) are listed in §5.

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

Active global sheet is the old Malayalam `globals.css`. **Open:** ad label is still Tamil (`விளம்பரம்`); `_app.js` font is still `Anek_Devanagari` (Hindi), not `Noto_Sans`.

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
ICONS_SVG = "/tv9malayalam-nextjs-v2/images/icons.svg"
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
| `/tv9malayalam-nextjs-v2/images/icons.svg` | **200** |
| `/tv9up-nextjs/images/icons.svg` | **404** |
| `/images/icons.svg` | **404** |

Detail player (`ShortVideoDetailPage.js`) uses inline SVGs, not this sprite.

### Resolution

Path includes `basePath`; `#ytShort` + `#rgt-arrow` added to v2 sprite; `ViewMoreLink` uses `ICONS_SVG`. Hard-refresh home / short-videos listing. Dev log should no longer show `GET /images/icons.svg 404`.

---

## 5. Still UP / not resolved

| Area | File | Root cause | Open resolution |
|---|---|---|---|
| Logo | `.env` `NEXT_PUBLIC_SITE_LOGO_URL` | still tv9up logo URL | Malayalam logo (or `siteSettings.logo_url`) |
| Short video env URL | `.env` `SHORT_VIDEO_API_BASE_URL` | still `alphaup` (env wins over constants) | `alphamalayalam/.../short-video-detail` |
| Next-article API | `.env` `NEXT_ARTICLE_API_URL` | still `alphaup` | `alphamalayalam/.../detail/{id}` |
| Infinite scroll path | `InfiniteScrollArticleWidget` | `BASE_PATH = "/tv9up-nextjs"` | v2 / ML `basePath` |
| Double-basePath strip | `lib/server/homePageBuilder.js` | still `/tv9up-nextjs/tv9up-nextjs/` | Malayalam `basePath` |
| Page-builder fallback name | `lib/constants.js` | `PAGE_BUILDER_SITE_NAME = "tv9up"` | `tv9malayalam` |
| Font | `pages/_app.js` + AMP | **Resolved** — see §6 | Noto Sans like old ML |
| Font leftovers | UP widgets still CSS `"Anek Devanagari"` | unused on typical ML pages; same leftovers as old ML | see §6 leftover table — swap to `"Noto Sans"` only if those widgets go live |
| Rewrite pattern | `.env` | empty — alphapublish URLs not rewritten; old `/tv9malayalam-nextjs` prefixes can double | Malayalam + alphapublish regex |
| Page keys | `lib/pageConfig.js` | UP keys (`video-landing`, `detail-amp`) | ML JSON keys **or** rebuild CMS |
| `top-9-widget` | `widgetRegistry.js` | not registered; ML homepage JSON may use it | copy from old ML **or** rebuild CMS to `*-up` |
| Web story 404 | `WebStoryDetailAMP.js` | `SITE_LANGUAGE` undefined (`SITE_LANGUAGE_VALUE` exists) → GSSP `notFound` | rename to `SITE_LANGUAGE_VALUE` |
| Header / sports links | `Header.js`, `Sports9HeaderWidget.js` | hardcoded `tv9up.com` | Malayalam URLs |
| Menus 404 | `fetchNavMenu` + `ENDPOINTS` | helper appends `.json`; ML menu URLs 404 | real ML menu URL or drop `.json` |
| Short-video permalinks | CMS | listing uses `/short-videos/{slug}`; rewrite is `/videos/short-videos/:slug` | CMS path `/videos/short-videos/{slug}` |
| AMP backups | `amp/widgets__05-08-2026/*` | tv9up logos (not live registry) | ignore or replace if used |
| `globals.css` ad label | `styles/globals.css` | copied from old ML (Tamil) | Malayalam copy |

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

These files were **not** changed. They hardcode `font-family: "Anek Devanagari"` in widget CSS. Old `tv9malayalam-nextjs` has the same leftovers. They are Hindi/UP campaign widgets and are unused on a typical Malayalam homepage / article. Site-wide Noto Sans from `_app.js` still applies unless these rules override a heading/body inside the widget.

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

v2 now loads **Noto Sans** the same way as old ML (`_app.js` + live AMP CSS). Hard-refresh the site. Leftover widget CSS above is documented, not swapped, matching old ML. A dedicated `Noto_Sans_Malayalam` face was not requested.

---

## How CSS loads

1. `pages/_app.js` → `styles/globals.css` (site-wide).
2. Widget `*.module.css` — per component (still UP modules).
3. Splide CSS — imported in slider widgets, not `_app.js`.
4. `_document.js` CDN Splide `<link>` — commented out.

---

## Bottom line

**Resolved:** tenant `basePath` / site name / proxy / web-story API / short-video constants; ML `globals.css`; `Link` import; sprite path + `#ytShort` / `#rgt-arrow`; `ViewMoreLink` uses `ICONS_SVG`; **Noto Sans** like malayalamtv9.

**Not live-ready:** logo, several `alphaup` APIs, infinite-scroll path, rewrite pattern, page keys, `top-9-widget`, web-story `SITE_LANGUAGE` 404, menu `.json` 404s. A few unused UP widgets still CSS `"Anek Devanagari"` (FAQ, Mahakumbh, TabNavigation, BathingDates, PhotoContentSlider, AMP backup) — same leftovers as old ML; see §6. Old `tv9malayalam-nextjs` stays the reference for those bits.
