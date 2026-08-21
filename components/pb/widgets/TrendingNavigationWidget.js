import { getHref } from "@/lib/helper/commonHelper";

// Default fallback trending items (shown when API returns empty)
const DEFAULT_TRENDING = [
  { title: "ईरान-इजराइल वॉर", url: "https://www.tv9hindi.com/topic/iran-israel-war" },
  { title: "सुप्रीम लीडर खामेनेई", url: "https://www.tv9hindi.com/topic/ali-khamenei-supreme-leader" },
  { title: "T20 वर्ल्ड कप 2026", url: "https://www.tv9hindi.com/sports/cricket-news/series/t20-world-cup" },
  { title: "पाकिस्तान", url: "https://www.tv9hindi.com/topic/pakistan" },
  { title: "अफगानिस्तान", url: "https://www.tv9hindi.com/topic/afghanistan" },
  { title: "नरेंद्र मोदी", url: "https://www.tv9hindi.com/topic/narendra-modi" },
  { title: "AI न्यूज़", url: "https://www.tv9hindi.com/topic/artificial-intelligence" },
  { title: "सोना-चांदी", url: "https://www.tv9hindi.com/topic/gold-silver" },
];

export default function TrendingNavigationWidget({ trendingItems }) {
  const items = Array.isArray(trendingItems) && trendingItems.length > 0 ? trendingItems : DEFAULT_TRENDING;

  return (
    <div className="TrendStripwrap">
      <div className="container">
        <div className="TrendStripHD">
		  <svg
			version="1.1"
			id="Layer_1"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			x="0px"
			y="0px"
			viewBox="0 0 16 24"
			style={{ enableBackground: "new 0 0 16 24" }}
			xmlSpace="preserve"
		  >
			<g>
			  <path
				className="st0"
				d="M7.9,14.6c-2.4,0-4.7,0-7.1,0C4.4,9.7,7.9,4.8,11.4,0c0,0,0.1,0,0.1,0c-1.1,3.1-2.3,6.2-3.4,9.3c2.4,0,4.7,0,7.1,0C11.6,14.3,8.1,19.2,4.5,24c0,0,0,0-0.1,0C5.6,20.9,6.8,17.7,7.9,14.6z"
			  />
			</g>
		  </svg>
		</div>
        <ul className="TrendStripLink">
          {items.map((item, index) => (
            <li key={item.id || index}>
              <a
                href={getHref(item.url)}
                target={item.target || "_blank"}
                title={item.title}
                rel={item.target === "_blank" || !item.target ? "nofollow noopener" : undefined}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
