import { renderHeaderAmp } from "../../components/pb/amp/widgets/HeaderWidgetAMP";
import { renderFooterAmp } from "../../components/pb/amp/widgets/FooterWidgetAMP";
import { renderDetailMainContentAmp } from "../../components/pb/amp/widgets/DetailMainContentWidgetAMP";
import { renderCustomAdAmp } from "../../components/pb/amp/widgets/CustomAdWidgetAMP";
import { renderTaboolaAdAmp } from "../../components/pb/amp/widgets/TaboolaAdWidgetAMP";
import { renderRelatedNewsAmp } from "../../components/pb/amp/widgets/RelatedNewsWidgetAMP";
import { renderRelatedPhotosAmp } from "../../components/pb/amp/widgets/RelatedPhotosWidgetAMP";
import { renderRelatedVideosAmp } from "../../components/pb/amp/widgets/RelatedVideosWidgetAMP";
import { renderRelatedWebstoryAmp } from "../../components/pb/amp/widgets/RelatedWebstoryWidgetAMP";
import { renderRightNewsAmp } from "../../components/pb/amp/widgets/RightNewsWidgetAMP";
import { renderRightNewsPhotoAmp } from "../../components/pb/amp/widgets/RightNewsPhotoWidgetAMP";
import { renderBreadcrumbAmp } from "../../components/pb/amp/widgets/BreadcrumbWidgetAMP";
import { renderGenericAmp } from "../../components/pb/amp/widgets/Generic";

/**
 * AMP Widget Registry
 * Maps widget type slugs to their AMP render functions.
 * Unknown widgets fall through to renderGenericAmp (renders items as list).
 */
const AMP_WIDGET_MAP = {
  // Layout
  "header": renderHeaderAmp,
  "header-up": renderHeaderAmp,
  "footer": renderFooterAmp,
  "footer-up": renderFooterAmp,

  // Content
  "detail-main-content-widget": renderDetailMainContentAmp,
  "photo-detail-main-content-widget": renderDetailMainContentAmp,
  "video-detail-main-content-widget": renderDetailMainContentAmp,
  "live-blog-detail-main-content-widget": renderDetailMainContentAmp,
  "static-detail-content-widget": renderDetailMainContentAmp,
  "breadcrumb-widget": renderBreadcrumbAmp,

  // Ads
  "custom-ads-widget": renderCustomAdAmp,
  "top-ad-widget": renderCustomAdAmp,
  "taboola-ads-widget": renderTaboolaAdAmp,

  // Related — dedicated renderers
  "related-news-widget": renderRelatedNewsAmp,
  "related-photos-widget": renderRelatedPhotosAmp,
  "related-videos-widget": renderRelatedVideosAmp,
  "related-webstory-widget": renderRelatedWebstoryAmp,

  // Right sidebar widgets
  "right-news-widget-up": renderRightNewsAmp,
  "right-news-photo-widget-up": renderRightNewsPhotoAmp,

  // Listing (generic news list)
  "five-col-news-widget-up": renderRelatedNewsAmp,
  "five-col-news-all-thumb-widget-up": renderRelatedNewsAmp,
};

export function renderSectionAmp(section, queryParams, meta, siteSettings = {}) {
  const type = String(section?.type || "").trim().toLowerCase();
  // console.log(section);
  
  const renderer = AMP_WIDGET_MAP[type] || renderGenericAmp;
  return renderer(section, queryParams, meta, siteSettings);
}
