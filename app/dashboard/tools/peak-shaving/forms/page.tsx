"use client"

import { useState } from "react"
import { type BatterySizingFormData } from "@/lib/schemas/battery"
import { defaultBatteryData } from "@/lib/types/battery"
import { BatterySizingForm } from "@/components/dashboard/forms/baterySizingForm"
import { useParams, useRouter } from "next/navigation"
import PeakShavingForm from "@/components/dashboard/forms/peakShavingForm"
import { ICreatePeakShavingRequest } from "../types/peakShavingTypes"
import { CreatePeakShavingUseCase } from "../application/PeakShavingUseCase"
import { Routes } from "@/app/auth/Routes"
import { PeakShavingFormData } from "@/lib/schemas/peakShaving"

export default function PeakShavingPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [savedData, setSavedData] = useState<PeakShavingFormData | null>(null)
  const { push } = useRouter();

  const { baterySizingId } = useParams<{ baterySizingId: string }>()

  // Dados padrão que podem ser carregados

  const handleSubmit = async (data: PeakShavingFormData) => {
    setIsLoading(true)
    
    try {
      console.log("Dados do formulário:", data)
      const response = await CreatePeakShavingUseCase(data);
      console.log("Resposta da API:", response)
      push(Routes.tools.peakShaving);
      setSavedData(data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Calculo de Peak Shaving</h2>
        <p className="text-muted-foreground">
          Formulário de cálculo de Peak Shaving
        </p>
      </div>

      <PeakShavingForm
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
