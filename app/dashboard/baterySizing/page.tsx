import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Calendar, Download } from "lucide-react"

const sizing = [
  {
    id: 1,
    title: "IV Measurement - Solar Panel A",
    description: "Initial testing under standard conditions",
    date: "2024-01-15",
    measurements: 150,
  },
  {
    id: 2,
    title: "Temperature Analysis",
    description: "Performance testing at various temperatures",
    date: "2024-01-14",
    measurements: 200,
  },
  {
    id: 3,
    title: "Efficiency Study",
    description: "Long-term efficiency monitoring",
    date: "2024-01-12",
    measurements: 500,
  },
]

export default function BaterySizingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dimensionamentos</h1>
          <p className="text-muted-foreground">Gerencie e analise seus dimensionamentos de baterias</p>
        </div>
        <Button variant="secondary" className="cursor-pointer">
          <Plus className="h-4 w-4" />
          Novo Dimensionamento
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sizing.map((item) => (
          <Card key={item.id} className="transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-start justify-between">
                <span className="line-clamp-1">{item.title}</span>
                <FileText className="h-5 w-5 text-muted-foreground" />
              </CardTitle>
              <CardDescription className="line-clamp-2">{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">{item.measurements}</span> measurements
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
