"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Upload, Save, Download, RefreshCw } from "lucide-react"
import { useState } from "react"

export function DatasetInformation() {
  const [title, setTitle] = useState("IV Measurement")
  const [description, setDescription] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async () => {
    setIsConnecting(true)
    // Simulate connection
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsConnecting(false)
  }

  return (
    <div className="space-y-6">
      <Card className="border-secondary/20 bg-secondary text-secondary-foreground">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex py-1 px-2 items-center justify-center rounded-full bg-secondary-foreground/20">
              <span className="text-sm font-bold">BESS</span>
            </div>
            ReliaBESS
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-sm font-medium">
              <Upload className="h-4 w-4" />
              Dataset Information
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dataset-title" className="text-secondary-foreground">
                  Dataset Title <span className="text-secondary-foreground/70">*</span>
                </Label>
                <Input
                  id="dataset-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="IV Measurement"
                  className="border-secondary-foreground/20 bg-secondary-foreground/10 text-secondary-foreground placeholder:text-secondary-foreground/50"
                />
                <p className="text-xs text-secondary-foreground/70">Required for data collection</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dataset-description" className="text-secondary-foreground">
                  Description (Optional)
                </Label>
                <Textarea
                  id="dataset-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of test conditions..."
                  className="min-h-[100px] border-secondary-foreground/20 bg-secondary-foreground/10 text-secondary-foreground placeholder:text-secondary-foreground/50"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center rounded-lg border border-secondary-foreground/20 bg-secondary-foreground/5 p-8">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary-foreground/10">
                <RefreshCw className="h-8 w-8" />
              </div>
              <h4 className="mb-2 text-lg font-semibold">Connect to Device</h4>
              <p className="mb-4 text-center text-sm text-secondary-foreground/70">
                Click below to connect to your ReliaBESS device via Bluetooth.
              </p>
              <Button
                onClick={handleConnect}
                disabled={isConnecting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isConnecting ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Connect to Device
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 border-secondary-foreground/20 bg-secondary-foreground/10 text-secondary-foreground hover:bg-secondary-foreground/20"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Dataset
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-secondary-foreground/20 bg-secondary-foreground/10 text-secondary-foreground hover:bg-secondary-foreground/20"
            >
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
