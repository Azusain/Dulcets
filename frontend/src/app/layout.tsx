export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* TODO: icon */}
        <link rel="icon" type="image/png" href="/images/favicon.png" />
        <title>Dulcets</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
