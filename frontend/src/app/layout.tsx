import ConditionalNavigation from "@/components/ConditionalNavigation";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { getAssetPath } from "@/utils/assetPath";
import "./global.css";
import "./loading.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        {/* TODO: icon */}
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <link
          rel="icon"
          type="image/png"
          href={getAssetPath("/images/logo_black.png")}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Shippori+Mincho+B1:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href={getAssetPath("/fonts/fonts.css")}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            nav {
              position: fixed !important;
              top: 0 !important;
              left: 0 !important;
              right: 0 !important;
              z-index: 9999 !important;
              width: 100% !important;
            }
          `,
          }}
        />
        <title>Dulcets</title>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Dynamic scrollbar color change
              let scrollTimeout;
              
              function handleScroll() {
                document.body.classList.add('scrolling');
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                  document.body.classList.remove('scrolling');
                }, 150);
              }
              
              window.addEventListener('scroll', handleScroll, { passive: true });
            `,
          }}
        />
      </head>
      <body>
        <LoadingProvider>
          <ConditionalNavigation />
          {children}
        </LoadingProvider>
      </body>
    </html>
  );
}
