import { Routes } from "@/app/auth/Routes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, TrendingUp, LineChart, Zap, ArrowRight } from "lucide-react"
import Link from "next/link"

const tools = [
  {
    name: "Calculo de Vida Útil",
    description: "Calcule a vida útil de sua bateria",
    icon: Activity,
    href: Routes.tools.lifespan,
    color: "text-blue-500",
  },
  // {
  //   name: "Villalva Optimization",
  //   description: "Optimize solar panel parameters using Villalva model",
  //   icon: TrendingUp,
  //   href: "/dashboard/tools/villalva",
  //   color: "text-green-500",
  // },
  // {
  //   name: "Curve Fit",
  //   description: "Fit curves to your measurement data",
  //   icon: LineChart,
  //   href: "/dashboard/tools/curve-fit",
  //   color: "text-purple-500",
  // },
  // {
  //   name: "PV Curve Translate",
  //   description: "Translate PV curves between different conditions",
  //   icon: Zap,
  //   href: "/dashboard/tools/pv-curve",
  //   color: "text-orange-500",
  // },
]

export default function ToolsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tools</h1>
        <p className="text-muted-foreground">Advanced analysis and optimization tools for your data</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {tools.map((tool) => (
          <Link key={tool.name} href={tool.href}>
            <Card className="transition-all hover:shadow-md hover:border-primary/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 ${tool.color}`}>
                    <tool.icon className="h-5 w-5" />
                  </div>
                  {tool.name}
                </CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">Acesse a ferramenta</p>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
