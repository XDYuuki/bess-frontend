"use client"

import { useState } from "react"
import { BatterySizingForm } from "./baterySizingForm"
import { type BatterySizingFormData } from "@/lib/schemas/battery"
import { defaultBatteryData } from "@/lib/types/battery"

export function BatterySizingExample() {
  const [isLoading, setIsLoading] = useState(false)
  const [savedData, setSavedData] = useState<BatterySizingFormData | null>(null)

  // Dados padrão que podem ser carregados
  const defaultData = {
    ...defaultBatteryData,
    partNumber: "BAT-001",
    internalResistance: 0.15,
    cn: 200,
    crRate: 0.8,
    batteryType: "LiFePO4" as const,
    chemistry: "Lithium" as const,
  }

  const handleSubmit = async (data: BatterySizingFormData) => {
    setIsLoading(true)
    
    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log("Dados do formulário:", data)
    setSavedData(data)
    setIsLoading(false)
    
    // Aqui você pode enviar os dados para uma API
    // await api.saveBatteryConfiguration(data)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Exemplo de Uso do Formulário</h2>
        <p className="text-muted-foreground">
          Formulário de dimensionamento de bateria com dados pré-carregados
        </p>
      </div>

      <BatterySizingForm
        defaultData={defaultData}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />

      {savedData && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-medium text-green-800 mb-2">Dados Salvos com Sucesso!</h3>
          <pre className="text-sm text-green-700 overflow-auto">
            {JSON.stringify(savedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
