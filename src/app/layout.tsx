import "./globals.css";

export const metadata = {
  title: "Kumar Samartha Construction (KSCPL) | Real Estate & Civil Infrastructure",
  description: "Kumar Samartha Construction Private Limited (KSCPL) is a premier luxury real estate developer and civil infrastructure engineering conglomerate in India.",
  keywords: ["KSCPL", "Kumar Samartha Construction", "Real Estate Pune", "Commercial Skylines", "Civil Infrastructure", "Luxury Living"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-neutral-950 text-neutral-100 selection:bg-amber-500 selection:text-neutral-950">
        {children}
      </body>
    </html>
  );
}
