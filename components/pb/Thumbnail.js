import Image from "next/image";
import { DEFAULT_FALLBACK_IMAGE } from "@/lib/constants";

/**
 * Thumbnail — Centralized responsive image component.
 *
 * Features:
 *   - Preset aspect ratios for consistent sizing
 *   - dataConfig override (CMS can control image dimensions)
 *   - CDN resize param support (appends ?w=XXX to image URL)
 *   - Lazy loading by default, priority for LCP
 *   - Fallback image when src is empty
 *   - WebP format hint via CDN params
 *
 * Presets:
 *   "landscape"  → 16:9 (news cards, listings)
 *   "portrait"   → 9:16 (short videos, web stories)
 *   "square"     → 1:1 (avatars, icons)
 *   "photo"      → 4:3 (photo gallery)
 *   "banner"     → 16:9 large (hero/detail)
 *   "thumb"      → 90px small (sidebar thumbnails)
 *
 * Usage:
 *   <Thumbnail src={img} alt={title} />
 *   <Thumbnail src={img} alt={title} preset="portrait" />
 *   <Thumbnail src={img} alt={title} dataConfig={dataConfig} priority />
 *   <Thumbnail src={img} alt={title} width={400} height={225} />
 */

const PRESETS = {
  landscape: { width: 320, height: 180, aspect: "16/9" },
  portrait: { width: 228, height: 405, aspect: "9/16" },
  square: { width: 170, height: 170, aspect: "1/1" },
  photo: { width: 320, height: 240, aspect: "4/3" },
  banner: { width: 600, height: 338, aspect: "16/9" },
  thumb: { width: 90, height: 90, aspect: "1/1" },
};

/**
 * Append CDN resize param to image URL if not already present.
 * Works with tv9 image CDN: images.tv9tamilnews.com/...?w=400
 */
function withCdnResize(src, width) {
  if (!src || !width) return src;
  // Skip if already has ?w= or &w= param
  if (/[?&]w=/.test(src)) return src;
  // Skip non-CDN URLs
  if (!src.includes("images.tv9") && !src.includes("static.tv9")) return src;
  const separator = src.includes("?") ? "&" : "?";
  return `${src}${separator}w=${width}`;
}

export default function Thumbnail({
  src,
  alt = "",
  title,
  preset = "landscape",
  width,
  height,
  priority = false,
  className,
  fallback = DEFAULT_FALLBACK_IMAGE,
  style,
  dataConfig,
  cdnResize = true,
  ...rest
}) {
  // Resolve dimensions: dataConfig > explicit props > preset
  const presetDims = PRESETS[preset] || PRESETS.landscape;

  const w = Number(dataConfig?.image_width) || width || presetDims.width;
  const h = Number(dataConfig?.image_height) || height || presetDims.height;
  const aspect = dataConfig?.image_aspect || presetDims.aspect;

  // Resolve image source with CDN resize
  let imageSrc = src || fallback;
  if (!imageSrc) return null;
  if (cdnResize && imageSrc !== fallback) {
    imageSrc = withCdnResize(imageSrc, w);
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      title={title || alt}
      width={w}
      height={h}
      loading={priority ? "eager" : "lazy"}
      priority={priority}
      unoptimized
      className={className}
      style={{
        width: "100%",
        height: "auto",
        aspectRatio: aspect,
        objectFit: "cover",
        ...style,
      }}
      {...rest}
    />
  );
}

/**
 * Helper: get Thumbnail props from dataConfig for passing to widget cards.
 * Widgets can spread this into Thumbnail: <Thumbnail {...getThumbnailConfig(dataConfig)} src={img} alt={title} />
 */
export function getThumbnailConfig(dataConfig = {}) {
  const config = {};
  if (dataConfig.image_width) config.width = Number(dataConfig.image_width);
  if (dataConfig.image_height) config.height = Number(dataConfig.image_height);
  if (dataConfig.image_aspect) config.style = { aspectRatio: dataConfig.image_aspect };
  if (dataConfig.image_preset) config.preset = dataConfig.image_preset;
  return config;
}
