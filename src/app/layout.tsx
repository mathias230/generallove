import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans'; // Correct import path for Geist Sans
import './globals.css';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import NavigationMenu from '@/components/navigation-menu';
import { Toaster } from "@/components/ui/toaster";

const geistSans = GeistSans({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

// Removed GeistMono as it's not explicitly used and GeistSans can be default

export const metadata: Metadata = {
  title: 'Amor Eterno',
  description: 'A special place for our memories and moments.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <SidebarProvider defaultOpen={true}>
          <Sidebar collapsible="icon" className="shadow-lg">
            <NavigationMenu />
          </Sidebar>
          <SidebarInset>
            <main className="p-4 md:p-6 lg:p-8 flex-grow">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
