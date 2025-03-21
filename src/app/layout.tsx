import "@/app/globals.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "PoseAI - Advanced Pose Estimation Platform",
  description: "Upload images and analyze posture with AI technology. Perfect for dance, fitness, and posture analysis.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen antialiased")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
