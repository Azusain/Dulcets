import DsNavigation from "@/components/navigation";
import "./global.css";

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
        <link rel="icon" type="image/png" href="/images/favicon.png" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <title>Dulcets</title>
      </head>
      <body className="bg-black">
        <header>
          <DsNavigation />
        </header>
        {children}
      </body>
    </html>
  );
}
