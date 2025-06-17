import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import NavigationMenu from '@/components/navigation-menu';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider"; // Import ThemeProvider
import { Heart } from 'lucide-react';

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
    <html lang="es" suppressHydrationWarning>
      {/* No whitespace or comments should be directly here */}
      <body className={`${GeistSans.variable} ${GeistSans.className} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider defaultOpen={true}>
            <Sidebar collapsible="icon" className="shadow-lg">
              <NavigationMenu />
            </Sidebar>
            <SidebarInset>
              {/* Mobile Header */}
              <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-background p-4 md:hidden">
                <div className="flex items-center gap-2">
                  <Heart className="text-primary h-6 w-6" />
                  <h1 className="text-lg font-semibold text-foreground">Amor Eterno</h1>
                </div>
                <SidebarTrigger />
              </header>
              <main className="p-4 md:p-6 lg:p-8 flex-grow">
                {children}
              </main>
            </SidebarInset>
          </SidebarProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
