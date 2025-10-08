"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUpload } from "@/components/ui/file-upload"
import { batterySizingSchema, type BatterySizingFormData } from "@/lib/schemas/battery"
import { defaultBatteryData, batteryTypeOptions, chemistryOptions } from "@/lib/types/battery"
import { Loader2 } from "lucide-react"

interface BatterySizingFormProps {
  defaultData?: Partial<BatterySizingFormData>
  onSubmit: (data: BatterySizingFormData) => void
  isLoading?: boolean
}

export function BatterySizingForm({ 
  defaultData = defaultBatteryData, 
  onSubmit, 
  isLoading = false 
}: BatterySizingFormProps) {
  const form = useForm<BatterySizingFormData>({
    resolver: zodResolver(batterySizingSchema),
    defaultValues: {
      powerProfile: defaultData.powerProfile,
      voltageProfile: defaultData.voltageProfile,
      internalResistance: defaultData.internalResistance || 0.1,
      cn: defaultData.cn || 100,
      crRate: defaultData.crRate || 0.5,
      batteryType: defaultData.batteryType || 'Li-ion',
      socMax: defaultData.socMax || 100,
      socMin: defaultData.socMin || 20,
      vdc: defaultData.vdc || 48,
      partNumber: defaultData.partNumber || '',
      chemistry: defaultData.chemistry || 'Lithium',
    },
  })

  const handleSubmit = (data: BatterySizingFormData) => {
    onSubmit(data)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Dimensionamento de Bateria</CardTitle>
        <CardDescription>
          Insira os parâmetros dimensionar seu banco de baterias
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Seção de Arquivos */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Perfis de Dados</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FileUpload
                  label="Perfil de Potência"
                  accept=".mat,.xls,.xlsx"
                  value={form.watch("powerProfile")}
                  onChange={(file) => form.setValue("powerProfile", file)}
                />
                {form.formState.errors.powerProfile && (
                  <p className="text-sm text-destructive mt-1">
                    {form.formState.errors.powerProfile.message}
                  </p>
                )}
              </div>
              <div>
                <FileUpload
                  label="Perfil de Tensão"
                  accept=".mat,.xls,.xlsx"
                  value={form.watch("voltageProfile")}
                  onChange={(file) => form.setValue("voltageProfile", file)}
                />
                {form.formState.errors.voltageProfile && (
                  <p className="text-sm text-destructive mt-1">
                    {form.formState.errors.voltageProfile.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Seção de Parâmetros Elétricos */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Parâmetros Elétricos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="internalResistance">Resistência Interna (Ω)</Label>
                <Input
                  id="internalResistance"
                  type="number"
                  step="0.01"
                  {...form.register("internalResistance", { valueAsNumber: true })}
                />
                {form.formState.errors.internalResistance && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.internalResistance.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="cn">Cn (Ah)</Label>
                <Input
                  id="cn"
                  type="number"
                  step="1"
                  {...form.register("cn", { valueAsNumber: true })}
                />
                {form.formState.errors.cn && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.cn.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="crRate">Taxa Cr</Label>
                <Input
                  id="crRate"
                  type="number"
                  step="0.1"
                  {...form.register("crRate", { valueAsNumber: true })}
                />
                {form.formState.errors.crRate && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.crRate.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Seção de Configurações SOC */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Configurações SOC</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="socMax">SOC Máximo (%)</Label>
                <Input
                  id="socMax"
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  {...form.register("socMax", { valueAsNumber: true })}
                />
                {form.formState.errors.socMax && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.socMax.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="socMin">SOC Mínimo (%)</Label>
                <Input
                  id="socMin"
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  {...form.register("socMin", { valueAsNumber: true })}
                />
                {form.formState.errors.socMin && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.socMin.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Seção de Configurações da Bateria */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Configurações da Bateria</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vdc">VDC (V)</Label>
                <Input
                  id="vdc"
                  type="number"
                  step="0.1"
                  {...form.register("vdc", { valueAsNumber: true })}
                />
                {form.formState.errors.vdc && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.vdc.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="partNumber">Número da Peça</Label>
                <Input
                  id="partNumber"
                  {...form.register("partNumber")}
                />
                {form.formState.errors.partNumber && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.partNumber.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="batteryType">Tipo de Bateria</Label>
                <Select
                  value={form.watch("batteryType")}
                  onValueChange={(value) => form.setValue("batteryType", value as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {batteryTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.batteryType && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.batteryType.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="chemistry">Química</Label>
                <Select
                  value={form.watch("chemistry")}
                  onValueChange={(value) => form.setValue("chemistry", value as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a química" />
                  </SelectTrigger>
                  <SelectContent>
                    {chemistryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.chemistry && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.chemistry.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={isLoading}
            >
              Limpar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processando...
                </>
              ) : (
                "Salvar Configuração"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
