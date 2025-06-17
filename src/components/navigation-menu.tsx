
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, CalendarDays, Gamepad2, Gift, HelpCircle } from 'lucide-react'; // Added HelpCircle
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';

const navItems = [
  { href: '/', label: 'Inicio', icon: Heart },
  { href: '/dates', label: 'Calendario', icon: CalendarDays },
  { href: '/anniversaries', label: 'Aniversarios', icon: Gift },
  { href: '/minigame', label: 'Juego', icon: Gamepad2 },
  { href: '/survey', label: 'Encuesta', icon: HelpCircle }, // Added Survey link
];

export default function NavigationMenu() {
  const pathname = usePathname();
  const { setOpenMobile, isMobile } = useSidebar(); 

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false); 
    }
  };

  return (
    <>
      <SidebarHeader className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="text-primary w-7 h-7" />
          <h1 className="text-xl font-semibold text-foreground">Amor Eterno</h1>
        </div>
        <div className="md:hidden">
            <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent className="flex-grow p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref legacyBehavior>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  className={cn(
                    "w-full justify-start text-base py-3",
                    pathname === item.href ? "bg-sidebar-primary text-sidebar-primary-foreground" : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                  tooltip={item.label}
                  onClick={handleLinkClick} 
                >
                  <a>
                    <item.icon className="w-5 h-5 mr-3" />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-sidebar-border flex justify-center items-center">
         <ThemeToggle />
      </SidebarFooter>
    </>
  );
}
