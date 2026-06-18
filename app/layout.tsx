import type { Metadata } from "next";
import { Cormorant_Garamond, Raleway, Lora } from "next/font/google";
import "./globals.css";
import { localBusinessSchema } from "@/lib/seo";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-raleway",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shreejipanchkarma.com"),
  title: {
    default: "Shreeji Panchkarma | Ayurvedic Treatment Center Sonipat, Haryana",
    template: "%s | Shreeji Panchkarma",
  },
  description:
    "Shreeji Panchkarma — Haryana's most trusted AYUSH-certified Ayurvedic Panchakarma center. Authentic Panchakarma treatments, Shirodhara, Kati Basti & Ayurvedic products. Serving Sonipat, Delhi NCR since 2009.",
  keywords:
    "panchkarma sonipat, ayurvedic treatment haryana, panchakarma delhi ncr, shirodhara sonipat, kati basti back pain, ayurvedic doctor sonipat, ayush certified panchkarma haryana",
  authors: [{ name: "Dr. Rajesh Sharma, Shreeji Panchkarma" }],
  creator: "Shreeji Panchkarma",
  publisher: "Shreeji Panchkarma",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://shreejipanchkarma.com",
    siteName: "Shreeji Panchkarma",
    title: "Shreeji Panchkarma | Ayurvedic Treatment Center Sonipat, Haryana",
    description:
      "Haryana's most trusted AYUSH-certified Panchakarma center. 10,000+ patients healed since 2009.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shreeji Panchkarma — Ayurvedic Treatment Center Sonipat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shreeji Panchkarma | Ayurvedic Treatment Sonipat",
    description: "Authentic Panchakarma treatments in Sonipat, Haryana. AYUSH certified.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${raleway.variable} ${lora.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema()),
          }}
        />
        {/* Google Analytics placeholder */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" /> */}
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
