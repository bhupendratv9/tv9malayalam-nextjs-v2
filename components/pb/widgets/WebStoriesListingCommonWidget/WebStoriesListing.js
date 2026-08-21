import AppLink from "@/components/AppLink";
import Image from "next/image";
import styles from "./WebStoriesListing.module.css";
import { ICONS_SVG } from "@/lib/constants";

export default function WebStoriesListing() {
  return (
    <div className={styles.webStoriesListing_Wrapper}>
      <figure>
        <AppLink href="#">
          <div className={styles.imgThumb}>
            <Image
              width={228}
              height={300}
              src="https://static.tv9tamilnews.com/wp-content/uploads/2026/06/eyeliner-11.jpg"
              alt="கண்ணே பட்டுடும்! நாள் முழுக்க கலையாத ஐ-லைனர் மேஜிக் டிப்ஸ்!"
            />
            <span className={styles.webstoryIcon}>
              <svg width={30} height={30}>
                <use href={`${ICONS_SVG}#webstory-icon`}></use>
              </svg>
            </span>
          </div>
          <div className={styles.card_title}>
            <span className={styles.h3}>
              கண்ணே பட்டுடும்! நாள் முழுக்க கலையாத ஐ-லைனர் மேஜிக் டிப்ஸ்!
            </span>
          </div>
        </AppLink>
      </figure>
      <figure>
        <AppLink href="#">
          <div className={styles.imgThumb}>
            <Image
              width={228}
              height={300}
              src="https://static.tv9tamilnews.com/wp-content/uploads/2026/06/vitamin-d-web.jpg"
              alt="மழைக்காலத்தில் வைட்டமின் டி குறைபாட்டை சரிசெய்வது எப்படி?"
            />
            <span className={styles.webstoryIcon}>
              <svg width={30} height={30}>
                <use href={`${ICONS_SVG}#webstory-icon`}></use>
              </svg>
            </span>
          </div>
          <div className={styles.card_title}>
            <span className={styles.h3}>
              மழைக்காலத்தில் வைட்டமின் டி குறைபாட்டை சரிசெய்வது எப்படி?
            </span>
          </div>
        </AppLink>
      </figure>
      <figure>
        <AppLink href="#">
          <div className={styles.imgThumb}>
            <Image
              width={228}
              height={300}
              src="https://static.tv9tamilnews.com/wp-content/uploads/2026/06/mixed-fruits-health.jpg"
              alt="நோய் எதிர்ப்பு சக்தியை வலுப்படுத்தும் பழங்கள்..!"
            />
            <span className={styles.webstoryIcon}>
              <svg width={30} height={30}>
                <use href={`${ICONS_SVG}#webstory-icon`}></use>
              </svg>
            </span>
          </div>
          <div className={styles.card_title}>
            <span className={styles.h3}>
              நோய் எதிர்ப்பு சக்தியை வலுப்படுத்தும் பழங்கள்..!
            </span>
          </div>
        </AppLink>
      </figure>
      <figure>
        <AppLink href="#">
          <div className={styles.imgThumb}>
            <Image
              width={228}
              height={300}
              src="https://static.tv9tamilnews.com/wp-content/uploads/2026/06/eggs.jpg"
              alt="முட்டையை அவிச்சு சாப்பிடணுமா, பச்சையா குடிக்கணுமா?"
            />
            <span className={styles.webstoryIcon}>
              <svg width={30} height={30}>
                <use href={`${ICONS_SVG}#webstory-icon`}></use>
              </svg>
            </span>
          </div>
          <div className={styles.card_title}>
            <span className={styles.h3}>
              முட்டையை அவிச்சு சாப்பிடணுமா, பச்சையா குடிக்கணுமா?
            </span>
          </div>
        </AppLink>
      </figure>
      <figure>
        <AppLink href="#">
          <div className={styles.imgThumb}>
            <Image
              width={228}
              height={300}
              src="https://static.tv9tamilnews.com/wp-content/uploads/2026/06/coffe-pow.jpg"
              alt="காயங்கள் மீது காபிப் பொடி வைக்கலாமா..?"
            />
            <span className={styles.webstoryIcon}>
              <svg width={30} height={30}>
                <use href={`${ICONS_SVG}#webstory-icon`}></use>
              </svg>
            </span>
          </div>
          <div className={styles.card_title}>
            <span className={styles.h3}>
              காயங்கள் மீது காபிப் பொடி வைக்கலாமா..?
            </span>
          </div>
        </AppLink>
      </figure>
      <figure>
        <AppLink href="#">
          <div className={styles.imgThumb}>
            <Image
              width={228}
              height={300}
              src="https://static.tv9tamilnews.com/wp-content/uploads/2026/06/run-vs-swim-11.jpg"
              alt="இதயத்தை காக்க நீச்சலா? ஓட்டமா? சிறந்த தேர்வு எது?"
            />
            <span className={styles.webstoryIcon}>
              <svg width={30} height={30}>
                <use href={`${ICONS_SVG}#webstory-icon`}></use>
              </svg>
            </span>
          </div>
          <div className={styles.card_title}>
            <span className={styles.h3}>
              இதயத்தை காக்க நீச்சலா? ஓட்டமா? சிறந்த தேர்வு எது?
            </span>
          </div>
        </AppLink>
      </figure>
      <figure>
        <AppLink href="#">
          <div className={styles.imgThumb}>
            <Image
              width={228}
              height={300}
              src="https://static.tv9tamilnews.com/wp-content/uploads/2026/06/aloe-vera-gel-4.jpg"
              alt="காலையில் கற்றாழை சாப்பிடுவதால் கிடைக்கும் நன்மைகள்..!"
            />
            <span className={styles.webstoryIcon}>
              <svg width={30} height={30}>
                <use href={`${ICONS_SVG}#webstory-icon`}></use>
              </svg>
            </span>
          </div>
          <div className={styles.card_title}>
            <span className={styles.h3}>
              காலையில் கற்றாழை சாப்பிடுவதால் கிடைக்கும் நன்மைகள்..!
            </span>
          </div>
        </AppLink>
      </figure>
      <figure>
        <AppLink href="#">
          <div className={styles.imgThumb}>
            <Image
              width={228}
              height={300}
              src="https://static.tv9tamilnews.com/wp-content/uploads/2026/06/clove-powder-11.jpg"
              alt="உடலை பலப்படுத்தும் கிராம்பு பொடி... ஏன் அவசியம்?"
            />
            <span className={styles.webstoryIcon}>
              <svg width={30} height={30}>
                <use href={`${ICONS_SVG}#webstory-icon`}></use>
              </svg>
            </span>
          </div>
          <div className={styles.card_title}>
            <span className={styles.h3}>
              உடலை பலப்படுத்தும் கிராம்பு பொடி... ஏன் அவசியம்?
            </span>
          </div>
        </AppLink>
      </figure>
      <figure>
        <AppLink href="#">
          <div className={styles.imgThumb}>
            <Image
              width={228}
              height={300}
              src="https://static.tv9tamilnews.com/wp-content/uploads/2026/06/walking-calcu.jpg"
              alt="ஒரு நாளைக்கு நீங்கள் எத்தனை கிலோமீட்டர் நடக்க வேண்டும்..?"
            />
            <span className={styles.webstoryIcon}>
              <svg width={30} height={30}>
                <use href={`${ICONS_SVG}#webstory-icon`}></use>
              </svg>
            </span>
          </div>
          <div className={styles.card_title}>
            <span className={styles.h3}>
              ஒரு நாளைக்கு நீங்கள் எத்தனை கிலோமீட்டர் நடக்க வேண்டும்..?
            </span>
          </div>
        </AppLink>
      </figure>
      <figure>
        <AppLink href="#">
          <div className={styles.imgThumb}>
            <Image
              width={228}
              height={300}
              src="https://static.tv9tamilnews.com/wp-content/uploads/2026/06/olive-oil-be-7.jpg"
              alt="சருமத்திற்கும் கூந்தலுக்கும் நன்மை தரும் ஆலிவ் ஆயில்..!"
            />
            <span className={styles.webstoryIcon}>
              <svg width={30} height={30}>
                <use href={`${ICONS_SVG}#webstory-icon`}></use>
              </svg>
            </span>
          </div>
          <div className={styles.card_title}>
            <span className={styles.h3}>
              சருமத்திற்கும் கூந்தலுக்கும் நன்மை தரும் ஆலிவ் ஆயில்..!
            </span>
          </div>
        </AppLink>
      </figure>
      <figure>
        <AppLink href="#">
          <div className={styles.imgThumb}>
            <Image
              width={228}
              height={300}
              src="https://static.tv9tamilnews.com/wp-content/uploads/2026/06/sleep-in-foods.jpg"
              alt="இரவில் நிம்மதியான தூக்கத்தைப் பெற தவிர்க்க வேண்டிய உணவுகள்"
            />
            <span className={styles.webstoryIcon}>
              <svg width={30} height={30}>
                <use href={`${ICONS_SVG}#webstory-icon`}></use>
              </svg>
            </span>
          </div>
          <div className={styles.card_title}>
            <span className={styles.h3}>
              இரவில் நிம்மதியான தூக்கத்தைப் பெற தவிர்க்க வேண்டிய உணவுகள்
            </span>
          </div>
        </AppLink>
      </figure>
      <figure>
        <AppLink href="#">
          <div className={styles.imgThumb}>
            <Image
              width={228}
              height={300}
              src="https://static.tv9tamilnews.com/wp-content/uploads/2026/06/periods-foods-12.jpg"
              alt="மாதவிடாய் காலத்தில் சாப்பிட வேண்டிய சூப்பர் ஃபுட்ஸ்..!"
            />
            <span className={styles.webstoryIcon}>
              <svg width={30} height={30}>
                <use href={`${ICONS_SVG}#webstory-icon`}></use>
              </svg>
            </span>
          </div>
          <div className={styles.card_title}>
            <span className={styles.h3}>
              மாதவிடாய் காலத்தில் சாப்பிட வேண்டிய சூப்பர் ஃபுட்ஸ்..!
            </span>
          </div>
        </AppLink>
      </figure>
      <figure>
        <AppLink href="#">
          <div className={styles.imgThumb}>
            <Image
              width={228}
              height={300}
              src="https://static.tv9tamilnews.com/wp-content/uploads/2026/06/hearty-health-12.jpg"
              alt="கெட்ட கொழுப்பை விரட்டி... இதயத்தை காக்கும் எளிய வழிகள்!"
            />
            <span className={styles.webstoryIcon}>
              <svg width={30} height={30}>
                <use href={`${ICONS_SVG}#webstory-icon`}></use>
              </svg>
            </span>
          </div>
          <div className={styles.card_title}>
            <span className={styles.h3}>
              கெட்ட கொழுப்பை விரட்டி... இதயத்தை காக்கும் எளிய வழிகள்!
            </span>
          </div>
        </AppLink>
      </figure>
      <figure>
        <AppLink href="#">
          <div className={styles.imgThumb}>
            <Image
              width={228}
              height={300}
              src="https://static.tv9tamilnews.com/wp-content/uploads/2026/06/clove-water-12.jpg"
              alt="கிராம்பு தண்ணீர் குடிப்பதால் கிடைக்கும் நன்மைகள்..!"
            />
            <span className={styles.webstoryIcon}>
              <svg width={30} height={30}>
                <use href={`${ICONS_SVG}#webstory-icon`}></use>
              </svg>
            </span>
          </div>
          <div className={styles.card_title}>
            <span className={styles.h3}>
              கிராம்பு தண்ணீர் குடிப்பதால் கிடைக்கும் நன்மைகள்..!
            </span>
          </div>
        </AppLink>
      </figure>
      <figure>
        <AppLink href="#">
          <div className={styles.imgThumb}>
            <Image
              width={228}
              height={300}
              src="https://static.tv9tamilnews.com/wp-content/uploads/2026/06/ragi-11.jpg"
              alt="ஃபிட்டாக மாறணுமா? அப்போ உங்க டயட்டில் ராகியை சேர்த்திடுங்க!"
            />
            <span className={styles.webstoryIcon}>
              <svg width={30} height={30}>
                <use href={`${ICONS_SVG}#webstory-icon`}></use>
              </svg>
            </span>
          </div>
          <div className={styles.card_title}>
            <span className={styles.h3}>
              ஃபிட்டாக மாறணுமா? அப்போ உங்க டயட்டில் ராகியை சேர்த்திடுங்க!
            </span>
          </div>
        </AppLink>
      </figure>
      <figure>
        <AppLink href="#">
          <div className={styles.imgThumb}>
            <Image
              width={228}
              height={300}
              src="https://static.tv9tamilnews.com/wp-content/uploads/2026/06/weigh-loss-11.jpg"
              alt="ஸ்லிம் ஆகணுமா? நாளை இப்படித்தான் தொடங்குங்கள்!"
            />
            <span className={styles.webstoryIcon}>
              <svg width={30} height={30}>
                <use href={`${ICONS_SVG}#webstory-icon`}></use>
              </svg>
            </span>
          </div>
          <div className={styles.card_title}>
            <span className={styles.h3}>
              ஸ்லிம் ஆகணுமா? நாளை இப்படித்தான் தொடங்குங்கள்!
            </span>
          </div>
        </AppLink>
      </figure>
      <button className={styles.loadMoreBtn}>Load More</button>
    </div>
  );
}
