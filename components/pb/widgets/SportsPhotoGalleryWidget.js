import Image from "next/image";

export default function SportsPhotoGalleryWidget() {
  return (
    <>
      <div className="sports9_PhotoGallery">

        <svg xmlns="http://www.w3.org/2000/svg" style={{display:"none"}}>
          <symbol viewBox="0 0 13 9" id="rgt-arrow">
            <path d="M7.76244 8.40347C7.59551 8.25946 7.51538 8.08543 7.52205 7.88141C7.52929 7.67738 7.61637 7.50336 7.78331 7.35934L10.1413 5.3251H0.834671C0.598181 5.3251 0.399808 5.25597 0.239551 5.11771C0.0798503 4.97993 0 4.80903 0 4.60501C0 4.40098 0.0798503 4.22984 0.239551 4.09158C0.399808 3.95381 0.598181 3.88492 0.834671 3.88492H10.1413L7.76244 1.83267C7.59551 1.68865 7.51204 1.51751 7.51204 1.31924C7.51204 1.12146 7.59551 0.950559 7.76244 0.806541C7.92937 0.662524 8.12775 0.590515 8.35756 0.590515C8.58682 0.590515 8.78491 0.662524 8.95185 0.806541L12.7705 4.10095C12.8539 4.17295 12.9132 4.25096 12.9482 4.33497C12.9827 4.41898 13 4.509 13 4.60501C13 4.70102 12.9827 4.79103 12.9482 4.87504C12.9132 4.95905 12.8539 5.03706 12.7705 5.10907L8.93098 8.42147C8.77796 8.55349 8.58682 8.6195 8.35756 8.6195C8.12775 8.6195 7.92937 8.54749 7.76244 8.40347Z"/>
          </symbol>
        </svg>

        <div className="sports_heading">
          <h2 className="h1"><a href="/photo-gallery/sports-photos">स्पोर्ट्स फोटो</a></h2>
          <a href="/photo-gallery/sports-photos" className="view_more">और देखे
            <svg><use href="#rgt-arrow"></use></svg>
          </a>
        </div>

        <div className="sp9PhotoGal_Wrapper">

          <figure>
            <a href="https://www.tv9hindi.com/photo-gallery/sports-photos/fifa-world-cup-2026-11-july-might-set-the-scene-for-messi-vs-ronaldo-3808484.html">
              <div className="imgThumb">
                <Image width={290} height={163} src="https://images.tv9hindi.com/wp-content/uploads/2026/06/messi-ronaldo-4.jpg" alt="FIFA World Cup 2026 में कब होगी मेसी- रोनाल्डो की टक्कर? दोनों का हो सकता है आखिरी मैच" />
                <span className="photo-count">
                  <svg><use href="#photos"></use></svg>
                  5 Images
                </span>
              </div>
              <div className="card_title">
                <span className="h3">FIFA World Cup 2026 में कब होगी मेसी- रोनाल्डो की टक्कर? दोनों का हो सकता है आखिरी मैच</span>
              </div>
            </a>
          </figure>

          <figure>
            <a href="https://www.tv9hindi.com/photo-gallery/cricket-photos/harmanpreet-kaur-most-international-matches-played-in-women-cricket-ahead-of-t20-world-cup-2026-3808183.html">
              <div className="imgThumb">
                <Image width={290} height={163} src="https://images.tv9hindi.com/wp-content/uploads/2026/06/harmanpreet-kaur-2-1.jpg" alt="Women's T20 World Cup 2026: इस वर्ल्ड रिकॉर्ड के साथ उतरेंगी हरमनप्रीत कौर, ऐसा करने वाली बनेंगी पहली खिलाड़ी" />
                <span className="photo-count">
                  <svg><use href="#photos"></use></svg>
                  5 Images
                </span>
              </div>
              <div className="card_title">
                <span className="h3">{"Women's"} T20 World Cup 2026: इस वर्ल्ड रिकॉर्ड के साथ उतरेंगी हरमनप्रीत कौर, ऐसा करने वाली बनेंगी पहली खिलाड़ी</span>
              </div>
            </a>
          </figure>

          <figure>
            <a href="https://www.tv9hindi.com/photo-gallery/sports-photos/french-open-2026-marta-kostyuk-advanced-to-semi-final-beat-elina-svitolina-3807891.html">
              <div className="imgThumb">
                <Image width={290} height={163} src="https://images.tv9hindi.com/wp-content/uploads/2026/06/marta-kostyuk.jpg" alt="French Open 2026: Marta Kostyuk फ्रेंच ओपन के सेमीफाइनल में, अपनी ही आइडल Elina Svitolina को हराया" />
                <span className="photo-count">
                  <svg><use href="#photos"></use></svg>
                  5 Images
                </span>
              </div>
              <div className="card_title">
                <span className="h3">French Open 2026: Marta Kostyuk फ्रेंच ओपन के सेमीफाइनल में, अपनी ही आइडल Elina Svitolina को हराया</span>
              </div>
            </a>
          </figure>

          <figure>
            <a href="https://www.tv9hindi.com/photo-gallery/sports-photos/fifa-world-cup-2026-5-richest-players-to-play-3807862.html">
              <div className="imgThumb">
                <Image width={290} height={163} src="https://images.tv9hindi.com/wp-content/uploads/2026/06/fifa-2026.jpg" alt="FIFA World Cup 2026 के 5 सबसे अमीर खिलाड़ी, एक की मां करती थी घरों में काम" />
                <span className="photo-count">
                  <svg><use href="#photos"></use></svg>
                  6 Images
                </span>
              </div>
              <div className="card_title">
                <span className="h3">FIFA World Cup 2026 के 5 सबसे अमीर खिलाड़ी, एक की मां करती थी घरों में काम</span>
              </div>
            </a>
          </figure>

        </div>

      </div>
    </>
  );
}
