"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Settings } from "lucide-react"
import { useState } from "react"

export function DeviceConfiguration() {
  const [diodeModel, setDiodeModel] = useState("one-diode")
  const [irradiance, setIrradiance] = useState("850")
  const [temperature, setTemperature] = useState("25")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Device Status */}
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-sm font-medium">
            <div className="h-2 w-2 rounded-full bg-primary" />
            Device Status
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border bg-card p-4">
              <p className="mb-2 text-sm font-medium">Connection</p>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-muted" />
                <span className="text-xs text-muted-foreground">Not connected</span>
              </div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <p className="mb-2 text-sm font-medium">Verification</p>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-muted" />
                <span className="text-xs text-muted-foreground">Pending</span>
              </div>
            </div>
          </div>
        </div>

        {/* Diode Model */}
        <div>
          <h3 className="mb-4 text-sm font-medium">Diode Model</h3>
          <RadioGroup value={diodeModel} onValueChange={setDiodeModel} className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="one-diode" id="one-diode" />
              <Label htmlFor="one-diode" className="cursor-pointer font-normal">
                One-Diode
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="two-diode" id="two-diode" />
              <Label htmlFor="two-diode" className="cursor-pointer font-normal">
                Two-Diode
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="three-diode" id="three-diode" />
              <Label htmlFor="three-diode" className="cursor-pointer font-normal">
                Three-Diode
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="auto" id="auto" />
              <Label htmlFor="auto" className="cursor-pointer font-normal">
                Auto
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Environment */}
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-sm font-medium">
            <span>☀</span>
            Environment
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="irradiance">Measured Irradiance</Label>
              <Input
                id="irradiance"
                type="number"
                value={irradiance}
                onChange={(e) => setIrradiance(e.target.value)}
                placeholder="850"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="temperature">Panel Temperature (°C)</Label>
              <Input
                id="temperature"
                type="number"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                placeholder="25"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
