'use client'
import { useEffect, useState } from "react";
import { IPeakShaving } from "./types/peakShavingTypes";
import { GetPeakShavingUseCase } from "./application/PeakShavingUseCase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Routes } from "@/app/auth/Routes";

export default function PickShavingPage() {
  const [peakShaving, setPeakShaving] = useState<IPeakShaving[]>([]);

  const { push } = useRouter();

  useEffect(() => {
    const fetchPeakShaving = async () => {
        try {
          const response = await GetPeakShavingUseCase();
          setPeakShaving(response);
        } catch (error) {
          console.error(error);
        }
      }

    fetchPeakShaving();
  }, []);

  
  return (
    <div>
      <div className="flex flex-row items-center gap-2 mb-4">
        <h1 className="text-2xl font-bold">Peak Shaving</h1>
        <Button 
          variant="secondary" 
          className="ml-auto"
          onClick={() => push(Routes.tools.peakShavingForm)}>
            <Plus className="h-4 w-4" />
            Novo Calculo
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {peakShaving.map((item) => (
          <Card key={item.id} className="transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-start justify-between">
                <span className="line-clamp-1">{item.name}</span>
                <FileText className="h-5 w-5 text-muted-foreground" />
              </CardTitle>
              <CardDescription className="line-clamp-2">Dados do calculo de Peak Shaving</CardDescription>
            </CardHeader>
            <CardContent>              
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <span>Energia Máxima Diária: {item.max_daily_energy}</span>
                  <span>Energia Mínima Diária: {item.min_daily_energy}</span>
                  <span>Potência Máxima Diária: {item.max_daily_power}</span>
                  <span>Potência Mínima Diária: {item.min_daily_power}</span>
                  <span>Energia Média Diária: {item.energy_average}</span>
                  <span>Potência Média Diária: {item.power_average}</span>
                </div>

              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
