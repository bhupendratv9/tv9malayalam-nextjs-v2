import Document, { Html, Head, Main, NextScript } from "next/document";

const SITE_LANGUAGE = process.env.NEXT_PUBLIC_SITE_LANGUAGE || "hi";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    const pathname = ctx.pathname || "";
    const isAmpPage =
      pathname === "/ArticleDetail/ArticleDetailPageAMP";

    return {
      ...initialProps,
      isAmpPage,
    };
  }

  render() {
    const { isAmpPage } = this.props;

    return (
      <Html lang={SITE_LANGUAGE} {...(isAmpPage ? { amp: "" } : {})}>
        <Head>
          {!isAmpPage && (
            <>
              {/* <link
                rel="stylesheet"
                href={`${process.env.NEXT_PUBLIC_STATIC_CDN_URL || "https://static.tv9hindi.com"}/wp-content/themes/tv9bharavarsh/css/splide_slider.css?ver=1.1.2`}
              /> */}
            </>
          )}
        </Head>

        <body>
          {/* GPT script moved to _app.js — loaded dynamically based on siteSettings.gpt_enabled */}
		  
		  <Main />
          {!isAmpPage ? <NextScript /> : null}
        </body>
      </Html>
    );
  }
}

export default MyDocument;