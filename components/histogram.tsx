"use client"
import { useMemo } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface HistogramProps {
  data: number[]
  averageValue: number
  title?: string
  description?: string
  xAxisLabel?: string
  yAxisLabel?: string
  showGrid?: boolean
  height?: number
}

export function Histogram({
  data,
  averageValue,
  title = "Histogram",
  description,
  xAxisLabel = "Index",
  yAxisLabel = "Value",
  showGrid = true,
  height = 400,
}: HistogramProps) {
  const chartData = useMemo(() => {
    return data.map((value, index) => ({
      index: index + 1,
      value: value,
    }))
  }, [data])

  const maxValue = useMemo(() => Math.max(...data, averageValue), [data, averageValue])
  const minValue = useMemo(() => Math.min(...data, averageValue), [data, averageValue])

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            {showGrid && <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />}
            <XAxis
              dataKey="index"
              label={{
                value: xAxisLabel,
                position: "insideBottom",
                offset: -10,
                className: "fill-muted-foreground text-sm",
              }}
              className="text-xs fill-muted-foreground"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              label={{
                value: yAxisLabel,
                angle: -90,
                position: "insideLeft",
                className: "fill-muted-foreground text-md",
              }}
              className="text-xs fill-muted-foreground"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              domain={[Math.floor(minValue * 0.9), Math.ceil(maxValue * 1.1)]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
                color: "hsl(var(--card-foreground))",
              }}
              itemStyle={{ color: "hsl(var(--foreground))" }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              position={{ x: 100, y: 0 }}
              cursor={{ fill: "#a0cd30", opacity: 0.5 }}
            />
            <Legend
              wrapperStyle={{
                paddingTop: "20px",
                color: "hsl(var(--foreground))",
              }}
            />
            <ReferenceLine
              y={averageValue}
              stroke="#ff6b35"  // Cor laranja
              strokeWidth={2}   // Mais espessa
              strokeDasharray="4 4"
              label={{
                value: `Média`,
                position: "top",
                fill: "hsl(var(--primary))",
                fontSize: 12,
                fontWeight: 600,
                className: "fill-secondary text-md",
              }}
            />
            <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name={yAxisLabel} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
