import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import SmoothScroll from "@/components/SmoothScroll";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeBlog - Decoding the Digital Universe",
  description: "A comprehensive blog website focused on coding articles, tutorials, and insights for modern software development.",
  keywords: ["programming", "coding", "tutorials", "JavaScript", "React", "TypeScript", "web development", "software engineering"],
  authors: [{ name: "CodeBlog Team" }],
  openGraph: {
    title: "CodeBlog - Decoding the Digital Universe",
    description: "Comprehensive coding articles and tutorials for modern software development",
    url: "https://codeblog.example.com",
    siteName: "CodeBlog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeBlog - Decoding the Digital Universe",
    description: "Comprehensive coding articles and tutorials for modern software development",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <SmoothScroll />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
