function slugify(str) {
  if (!str) return "";
  return str.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-/]/g, "");
}

function formatSeriesDate(dateStr) {
  if (!dateStr) return "";
  try {
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      const d = new Date(parts[2], parts[0] - 1, parts[1]);
      return d.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
    }
    return dateStr;
  } catch {
    return dateStr;
  }
}

const ALL_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function IccSeriesWidget({
  title = "",
  items = [],
  sectionUrl = "#",
  dataConfig = {},
}) {
  // Data is at items[0].seriesdata — array of year arrays, each year has 12 month arrays
  const seriesData = Array.isArray(items?.[0]?.seriesdata)
    ? items[0].seriesdata
    : [];

  if (!seriesData || seriesData.length === 0) return null;

  // Flatten: iterate over years, then months, collect non-empty months
  const monthSections = [];

  seriesData.forEach((yearData, yearIndex) => {
    if (!Array.isArray(yearData)) return;
    yearData.forEach((monthData, monthIndex) => {
      if (!Array.isArray(monthData) || monthData.length === 0) return;
      // Determine the year from the first series entry's start date
      let yearLabel = "";
      if (monthData[0]?.series_start_date) {
        const parts = monthData[0].series_start_date.split("/");
        if (parts.length === 3) yearLabel = parts[2];
      }
      monthSections.push({
        monthName: yearLabel ? `${ALL_MONTHS[monthIndex]} ${yearLabel}` : ALL_MONTHS[monthIndex],
        series: monthData,
      });
    });
  });

  if (monthSections.length === 0) return null;

  return (
    <>
      <style>{`
        .seriesList .monthWise_list{padding:0 10px 12px 10px}
        .seriesList .monthWise_list h3{font-weight:600;font-size:16px;line-height:26px;text-transform:capitalize;color:#000;text-align:left;margin-bottom:6px}
        .seriesList .monthWise_list figure{background:#f6f6f6;border-radius:6px;padding:15px;margin-bottom:15px}
        .seriesList .monthWise_list figure:last-child{margin-bottom:0}
        .seriesList .monthWise_list figure p{font-weight:500;font-size:13px;line-height:18px;text-transform:capitalize;color:#818181;margin-bottom:6px}
        .seriesList .monthWise_list figure p span{color:#dc0000;font-weight:600;border-right:1px solid #bbb;padding-right:8px;margin-right:8px}
        .seriesList .monthWise_list figure h4{font-weight:500;font-size:15px;line-height:24px;text-transform:capitalize;color:#000}
        .wct20 .seriesList .monthWise_list figure p span{color:#00B0E3}
      `}</style>
      <div className="common_section seriesWrapper">
        <div className="common-heading">
          <h1><a href="/sports/cricket-news/series">T20, Test, ODI Series 2026</a></h1>
        </div>
        <div className="seriesList">
          {monthSections.map((section, sIdx) => (
            <div className="monthWise_list" key={sIdx}>
              <h3>{section.monthName}</h3>
              {section.series.map((s, idx) => {
                const seriesName = s?.seriesname || "";
                const seriesTranslated = s?.seriesname_translated || seriesName;
                const seriesId = s?.series_Id || "";
                const matchType = s?.matchtype || "";
                const numMatches = s?.number_of_matches || "";
                const startDate = s?.series_start_date || "";
                const endDate = s?.series_end_date || "";

                const seriesUrl = `/sports/cricket-news/series/schedule/${slugify(seriesTranslated)}-${seriesId}`;

                return (
                  <figure key={seriesId ? `${seriesId}-${idx}` : idx}>
                    <a href={seriesUrl}>
                      <p>
                        <span>{matchType}({numMatches})</span>
                        {formatSeriesDate(startDate)} - {formatSeriesDate(endDate)}
                      </p>
                      <h4>{seriesName}</h4>
                    </a>
                  </figure>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
