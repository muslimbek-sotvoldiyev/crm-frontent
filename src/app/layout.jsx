import "@/app/globals.css";
import { Inter } from "next/font/google";
import { DashboardLayout } from "@/components/dashboard-layout";
import { ThemeProvider } from "next-themes";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "English Center CRM",
  description: "CRM system for English language learning center",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {/* ThemeProviderni Providers ichiga ko‘chiring */}
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <DashboardLayout>{children}</DashboardLayout>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
