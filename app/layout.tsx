import "./globals.css";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ramitha Iddamalgoda | Software Engineer',
  description:
    'Ramitha Iddamalgoda – Software Engineer, DevOps Enthusiast, and AI/ML Enthusiast portfolio.',
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">
        {children}
      </body>
    </html>
  );
}