import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Admin • Portfolio",
};


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* VT323 pixel font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=VT323&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="crt terminal">
        <div className="crt-flicker">
          {children}
        </div>
      </body>
    </html>
  );
}


