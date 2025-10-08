"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Database, Smartphone, Wrench, Activity, TrendingUp, LineChart, Zap, ChevronRight, BatteryCharging, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/lib/contexts/sidebar-context"
import { Routes } from "@/app/auth/Routes"

const navigation = [
  { name: "Home", href: Routes.home, icon: Home },
  { name: "Dimensionamentos", href: Routes.batertSizing.root, icon: BatteryCharging },
  // { name: "Devices", href: "/dashboard/devices", icon: Smartphone },
  {
    name: "Ferramentas",
    href: Routes.tools.root,
    icon: Wrench,
    children: [
      { name: "Calculo de Vida Util", href: Routes.tools.lifespan, icon: Activity },
      // { name: "Villalva Optimization", href: "/dashboard/tools/villalva", icon: TrendingUp },
      // { name: "Curve Fit", href: "/dashboard/tools/curve-fit", icon: LineChart },
      // { name: "PV Curve Translate", href: "/dashboard/tools/pv-curve", icon: Zap },
    ],
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>(["Tools"])
  const { isOpen, closeSidebar } = useSidebar()

  const toggleExpand = (name: string) => {
    setExpandedItems((prev) => (prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]))
  }

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={closeSidebar}
        />
      )}
      
      <aside className={cn(
        "fixed left-0 top-0 z-50 h-screen w-64 flex flex-col border-r bg-card transition-transform duration-300 ease-in-out md:relative md:h-full md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-16 items-center justify-between border-b px-6">
          <Link href="/dashboard" className="flex items-center gap-2" onClick={closeSidebar}>
            <div className="flex py-1 px-2 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">BESS</span>
            </div>
            <span className="text-xl font-bold">ReliaBESS</span>
          </Link>
          
          {/* Botão de fechar para mobile */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={closeSidebar}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          const isExpanded = expandedItems.includes(item.name)
          const hasChildren = item.children && item.children.length > 0

          return (
            <div key={item.name}>
              {hasChildren ? (
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 font-normal",
                    isActive && "bg-accent text-accent-foreground",
                  )}
                  onClick={() => toggleExpand(item.name)}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="flex-1 text-left">{item.name}</span>
                  <ChevronRight className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-90")} />
                </Button>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-normal transition-colors hover:bg-accent hover:text-accent-foreground",
                    isActive && "bg-accent text-accent-foreground",
                  )}
                  onClick={closeSidebar}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )}

              {hasChildren && isExpanded && (
                <div className="ml-4 mt-1 space-y-1 border-l pl-4">
                  {item.children?.map((child) => {
                    const isChildActive = pathname === child.href
                    return (
                      <Link
                        key={child.name}
                        href={child.href}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-normal transition-colors hover:bg-accent hover:text-accent-foreground",
                          isChildActive && "bg-accent text-accent-foreground",
                        )}
                        onClick={closeSidebar}
                      >
                        <child.icon className="h-4 w-4" />
                        <span>{child.name}</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>
      </aside>
    </>
  )
}
