import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, BatteryWarning, TrendingUp, BatteryCharging, Plus } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-row">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bem vindo ai ReliaBESS</h1>
          <p className="text-muted-foreground">Gerencie seus dimensionamentos de baterias aqui.</p>
        </div>

        {/* <Button variant="secondary" className="ml-auto cursor-pointer">
          <Plus className="h-5 w-5" />
            Criar Novo Dimensionamento
        </Button> */}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dimensionamentos Totais</CardTitle>
            <BatteryCharging className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 a mais que no mês passado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calculos de Vida Util</CardTitle>
            <BatteryWarning className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 calculos registrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Análise de Dados</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">+12 a mais que no mês passado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Card Reserva</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">+5% a mais que no mês passado</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
            <CardDescription>As últimas ações e atualizações</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <BatteryCharging className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Novo dimensionamento criado</p>
                  <p className="text-sm text-muted-foreground">IV Measurement - 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <BatteryWarning className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Dispositivo conectado</p>
                  <p className="text-sm text-muted-foreground">ReliaBESS Device #3 - 5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <Activity className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Análise concluída</p>
                  <p className="text-sm text-muted-foreground">Curve Fit Analysis - 1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Tarefas comuns e atalhos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <button className="flex w-full items-center gap-3 rounded-lg border cursor-pointer p-3 text-left transition-colors hover:bg-accent">
                <BatteryCharging className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Criar Novo Dimensionamento</p>
                  <p className="text-xs text-muted-foreground">Inicie a coleta de dados</p>
                </div>
              </button>
              <button className="flex w-full items-center gap-3 rounded-lg border cursor-pointer p-3 text-left transition-colors hover:bg-accent">
                <BatteryWarning className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Calculo de Vida Util</p>
                  <p className="text-xs text-muted-foreground">Calcule a vida util de sua bateria</p>
                </div>
              </button>
              <button className="flex w-full items-center gap-3 rounded-lg border cursor-pointer p-3 text-left transition-colors hover:bg-accent">
                <Activity className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Analisar Dados</p>
                  <p className="text-xs text-muted-foreground">Analise seus dados</p>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
