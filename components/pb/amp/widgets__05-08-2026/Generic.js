import { esc } from "../../../../lib/server/amp/ampUtils";

export function renderGenericAmp(section) {
  const title = esc(section?.title_override || section?.title || "");
  return `
    <section class="container" style="padding:16px 12px;">
      ${title ? `<h2 style="font-size:22px;margin:0 0 12px;">${title}</h2>` : ""}
    </section>
  `;
}