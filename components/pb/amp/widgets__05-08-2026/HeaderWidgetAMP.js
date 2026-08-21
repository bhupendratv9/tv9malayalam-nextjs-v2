import { esc } from "../../../../lib/server/amp/ampUtils";

// export function renderHeaderAmp(section) {
//   const cfg = section?.config || {};
//   const title = esc(section?.title_override || cfg?.site_name || "TV9");
//   const homeUrl = esc(cfg?.home_url || "/");
//   const navItems = Array.isArray(cfg?.menu_items) ? cfg.menu_items : [];

//   return `
//     <header class="amp-header">
//       <div class="container">
//         <a href="${homeUrl}" class="amp-logo">${title}</a>
//         ${
//           navItems.length
//             ? `<nav class="amp-nav">
//                 ${navItems
//                   .map((item) => `<a href="${esc(item?.url || "#")}">${esc(item?.label || "")}</a>`)
//                   .join("")}
//                </nav>`
//             : ""
//         }
//       </div>
//     </header>
//   `;
// }

export function renderHeaderAmp(section) {
	return `
		<header class="main_header">
			<div class="container">
				<div class="logo_wrap">
					<a href="/" title="logo">
						<amp-img
							class="logo"
							src="https://images.tv9up.com/uploads/tv9up-logo.svg"
							width="52"
							height="46"
							alt="TV9 UP"
							layout="fixed">
						</amp-img>
					</a>
				</div>
				<div class="rhsNav_Menu">
					<div title="Navigation Menu" id="toggleNav">
						<span on="tap:sidebar.toggle" aria-label="Click to open sidebar" role="button" tabindex="0" class="MenuBtn"> 
							<i></i> 
							<i></i> 
							<i></i> 
							<i></i> 
						</span>
					</div>
				</div>
			</div>
		</header>
		
	`;
}