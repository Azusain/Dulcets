import ConditionalNavigation from "@/components/ConditionalNavigation";
import { LoadingProvider } from "@/contexts/LoadingContext";
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
        <link rel="icon" type="image/png" href="/images/logo_black.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <style dangerouslySetInnerHTML={{
          __html: `
            nav {
              position: fixed !important;
              top: 0 !important;
              left: 0 !important;
              right: 0 !important;
              z-index: 9999 !important;
              width: 100% !important;
              background-color: rgba(0, 0, 0, 0.95) !important;
              backdrop-filter: blur(10px) !important;
              -webkit-backdrop-filter: blur(10px) !important;
            }
            nav.nav-loaded {
              transition: all 0.3s ease-in-out !important;
            }
          `
        }} />
        <title>Dulcets</title>
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
