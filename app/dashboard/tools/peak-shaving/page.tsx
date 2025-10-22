'use client'
import { useEffect, useState } from "react";
import { IPeakShaving } from "./types/peakShavingTypes";
import { GetPeakShavingUseCase } from "./application/PeakShavingUseCase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Plus, ChartColumn } from "lucide-react";
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
                <div className="flex flex-col gap-2 p-4 border border-secondary rounded-md">
                  <div className="flex flex-col gap-2">

                    <div className="flex flex-col lg:flex-row gap-2 lg:items-center">
                      <h3 className="font-medium">Energia Máxima Diária [kw/h]: </h3>
                      <div className="lg:ml-auto">
                        <div className="p-1 border border-primary rounded-md">{(item.max_daily_energy/1000).toFixed(5)}</div>
                      </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-2 lg:items-center">
                      <h3 className="font-medium">Energia Mínima Diária [kw/h]: </h3>                    
                      <div className="lg:ml-auto">
                        <div className="p-1 border border-primary rounded-md">{(item.min_daily_energy/1000).toFixed(5)}</div>
                      </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-2 lg:items-center">
                      <h3 className="font-medium">Potência Máxima Diária [kw]: </h3>
                      <div className="lg:ml-auto">
                        <div className="p-1 border border-primary rounded-md">{(item.max_daily_power/1000).toFixed(5)}</div>
                      </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-2 lg:items-center">
                      <h3 className="font-medium">Potência Mínima Diária [kw]: </h3>                    
                      <div className="lg:ml-auto">
                        <div className="p-1 border border-primary rounded-md">{(item.min_daily_power/1000).toFixed(5)}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => push(Routes.tools.peakShavingFragment.replace('[peakShavingId]', item.id))}
                >
                  <ChartColumn className="h-4 w-4" />View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


