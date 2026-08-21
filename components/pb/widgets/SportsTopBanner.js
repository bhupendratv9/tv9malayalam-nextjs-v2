import Image from "next/image";

export default function SportsTopBanner() {
  return (
    <>
      <section className="sports_navbar">
        <figure>
          <div className="bannerImg">
            <Image
              src="https://images.tv9hindi.com/wp-content/themes/tv9bharavarsh/images/cricket_banner.jpg"
              alt="Cricket"
              width={330}
              height={70}
              style={{ width: "100%", height: "auto" }}
              priority
            />
          </div>

          <figcaption>
            <a
              title="News"
              href="/sports/cricket-news"
              className="active"
            >
              News
            </a>

            <a
              title="Schedule"
              href="/sports/cricket-news/series/schedule"
            >
              Schedule
            </a>

            <a
              title="Results"
              href="/sports/cricket-news/series/results"
            >
              Results
            </a>

            <a
              title="Ranking"
              href="/sports/cricket-news/series/icc-team-ranking"
            >
              Ranking
            </a>

            <a
              title="Teams"
              href="/sports/cricket-news/series/teams"
            >
              Teams
            </a>

            <a
              title="Series"
              href="/sports/cricket-news/series"
            >
              Series
            </a>
          </figcaption>
        </figure>
      </section>

      <style>{`
        .sports_navbar {
          border: 1px solid #dfdfdf;
          margin-bottom: 20px;
        }

        .sports_navbar .bannerImg {
          width: 100%;
        }

        .sports_navbar figure {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-wrap: wrap;
          margin: 0;
        }

        .sports_navbar figcaption {
          width: 100%;
          display: flex;
          flex-wrap: nowrap;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          align-items: center;
        }

        .sports_navbar figcaption a {
          font-weight: 500;
          font-size: 14px;
          line-height: 21px;
          text-transform: capitalize;
          color: #000;
          margin-right: 10px;
          padding: 5px;
          flex: 0 0 auto;
          text-decoration: none;
        }

        .sports_navbar figcaption a.active {
          color: #dc0000;
          border-bottom: 1px solid #dc0000;
        }

        .sports_navbar figcaption::-webkit-scrollbar {
          display: none;
        }

        @media (min-width: 1000px) {
          .sports_navbar .bannerImg {
            width: 330px;
            margin-right: 20px;
          }

          .sports_navbar figcaption {
            width: calc(100% - 350px);
            justify-content: space-evenly;
          }

          .sports_navbar figcaption a {
            margin-right: 0;
          }

          .sports_navbar figcaption a.active {
            background: #dc0000;
            padding: 4px 10px;
            color: #fff;
            border-radius: 50px;
            border-bottom: none;
          }
        }
      `}</style>
    </>
  );
}