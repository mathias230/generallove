import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import NavigationMenu from '@/components/navigation-menu';
import { Toaster } from "@/components/ui/toaster";

// Correct usage: GeistSans is an object containing className and variable
// const geistSans = GeistSans({ // This is incorrect usage for the 'geist' package
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });

export const metadata: Metadata = {
  title: 'Amor Eterno',
  description: 'Un lugar especial para nuestros recuerdos y momentos.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es"> {/* Change lang attribute to Spanish */}
      {/* Apply the font class name and variable */}
      <body className={`${GeistSans.variable} ${GeistSans.className} font-sans antialiased`}>
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
