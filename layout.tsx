import "./globals.css";
import { Analytics } from '@vercel/analytics/next';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en">
        <body className="min-h-screen bg-black text-white">
          {children}
        </body>
      </html>
      <Analytics />
    </>
  );
}