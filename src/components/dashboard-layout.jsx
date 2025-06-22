"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Calendar,
  DollarSign,
  Home,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  UserSquare2,
  DoorOpen,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"

export function Nav({ links, isCollapsed }) {
  const pathname = usePathname()

  return (
    <div data-collapsed={isCollapsed} className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <Button
              key={index}
              variant={link.variant}
              size="icon"
              className={cn(
                "h-9 w-9",
                link.variant === "default" &&
                  "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
              )}
              asChild
            >
              <Link
                href={link.href}
                className={cn(
                  pathname === link.href &&
                    "bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground",
                )}
              >
                {link.icon}
                <span className="sr-only">{link.title}</span>
              </Link>
            </Button>
          ) : (
            <Button
              key={index}
              variant={link.variant}
              size="sm"
              className={cn(
                "justify-start",
                link.variant === "default" && "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
              )}
              asChild
            >
              <Link
                href={link.href}
                className={cn(
                  pathname === link.href &&
                    "bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground",
                )}
              >
                {link.icon}
                <span className={cn("ml-2")}>{link.title}</span>
                {link.label && (
                  <span className={cn("ml-auto", link.variant === "default" && "text-background dark:text-white")}>
                    {link.label}
                  </span>
                )}
              </Link>
            </Button>
          ),
        )}
      </nav>
    </div>
  )
}

export function DashboardLayout({ children }) {
  const pathname = usePathname()

  // Skip layout for login page
  if (pathname === "/login") {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <LayoutDashboard className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <div className="grid gap-2 py-6">
              <div className="flex items-center gap-2 px-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                  O
                </div>
                <span className="text-lg font-semibold">Oxford Education Center</span>
              </div>
              <Nav
                isCollapsed={false}
                links={[
                  {
                    title: "Dashboard",
                    href: "/",
                    icon: <Home className="h-4 w-4" />,
                    variant: pathname === "/" ? "default" : "ghost",
                  },
                  {
                    title: "O'quvchilar",
                    href: "/students",
                    icon: <Users className="h-4 w-4" />,
                    variant: pathname.startsWith("/students") ? "default" : "ghost",
                  },
                  {
                    title: "O'qituvchilar",
                    href: "/teachers",
                    icon: <UserSquare2 className="h-4 w-4" />,
                    variant: pathname.startsWith("/teachers") ? "default" : "ghost",
                  },
                  {
                    title: "Guruhlar",
                    href: "/groups",
                    icon: <UserSquare2 className="h-4 w-4" />,
                    variant: pathname.startsWith("/groups") ? "default" : "ghost",
                  },
                  {
                    title: "Davomat",
                    href: "/attendance",
                    icon: <BarChart3 className="h-4 w-4" />,
                    variant: pathname.startsWith("/attendance") ? "default" : "ghost",
                  },
                  {
                    title: "To'lovlar",
                    href: "/payments",
                    icon: <DollarSign className="h-4 w-4" />,
                    variant: pathname.startsWith("/payments") ? "default" : "ghost",
                  },
                  {
                    title: "Moliya",
                    href: "/finance",
                    icon: <DollarSign className="h-4 w-4" />,
                    variant: pathname.startsWith("/finance") ? "default" : "ghost",
                  },
                  {
                    title: "Dars jadvali",
                    href: "/schedule",
                    icon: <Calendar className="h-4 w-4" />,
                    variant: pathname.startsWith("/schedule") ? "default" : "ghost",
                  },
                  {
                    title: "Xonalar",
                    href: "/rooms",
                    icon: <DoorOpen className="h-4 w-4" />,
                    variant: pathname.startsWith("/rooms") ? "default" : "ghost",
                  },
                  {
                    title: "Bot Sozlamalari",
                    href: "/bot-settings",
                    icon: <Settings className="h-4 w-4" />,
                    variant: pathname.startsWith("/bot-settings") ? "default" : "ghost",
                  },
                  {
                    title: "Sozlamalar",
                    href: "/settings",
                    icon: <Settings className="h-4 w-4" />,
                    variant: pathname.startsWith("/settings") ? "default" : "ghost",
                  },
                ]}
              />
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            O
          </div>
          <span className="text-lg font-semibold">Oxford Education Center</span>
        </div>
        <div className="flex-1"></div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button variant="outline" size="icon">
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Log out</span>
          </Button>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-background md:block">
          <ScrollArea className="h-full py-6">
            <Nav
              isCollapsed={false}
              links={[
                {
                  title: "Dashboard",
                  href: "/",
                  icon: <Home className="h-4 w-4" />,
                  variant: pathname === "/" ? "default" : "ghost",
                },
                {
                  title: "O'quvchilar",
                  href: "/students",
                  icon: <Users className="h-4 w-4" />,
                  variant: pathname.startsWith("/students") ? "default" : "ghost",
                },
                {
                  title: "O'qituvchilar",
                  href: "/teachers",
                  icon: <UserSquare2 className="h-4 w-4" />,
                  variant: pathname.startsWith("/teachers") ? "default" : "ghost",
                },
                {
                  title: "Guruhlar",
                  href: "/groups",
                  icon: <UserSquare2 className="h-4 w-4" />,
                  variant: pathname.startsWith("/groups") ? "default" : "ghost",
                },
                {
                  title: "Davomat",
                  href: "/attendance",
                  icon: <BarChart3 className="h-4 w-4" />,
                  variant: pathname.startsWith("/attendance") ? "default" : "ghost",
                },
                {
                  title: "To'lovlar",
                  href: "/payments",
                  icon: <DollarSign className="h-4 w-4" />,
                  variant: pathname.startsWith("/payments") ? "default" : "ghost",
                },
                {
                  title: "Moliya",
                  href: "/finance",
                  icon: <DollarSign className="h-4 w-4" />,
                  variant: pathname.startsWith("/finance") ? "default" : "ghost",
                },
                {
                  title: "Dars jadvali",
                  href: "/schedule",
                  icon: <Calendar className="h-4 w-4" />,
                  variant: pathname.startsWith("/schedule") ? "default" : "ghost",
                },
                {
                  title: "Xonalar",
                  href: "/rooms",
                  icon: <DoorOpen className="h-4 w-4" />,
                  variant: pathname.startsWith("/rooms") ? "default" : "ghost",
                },
                {
                  title: "Bot Sozlamalari",
                  href: "/bot-settings",
                  icon: <Settings className="h-4 w-4" />,
                  variant: pathname.startsWith("/bot-settings") ? "default" : "ghost",
                },
                {
                  title: "Sozlamalar",
                  href: "/settings",
                  icon: <Settings className="h-4 w-4" />,
                  variant: pathname.startsWith("/settings") ? "default" : "ghost",
                },
              ]}
            />
          </ScrollArea>
        </aside>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
