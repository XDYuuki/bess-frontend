"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUpload } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PeakShavingFormData, peakShavingSchema } from "@/lib/schemas/peakShaving";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface PeakShavingFormProps {
  onSubmit: (data: PeakShavingFormData) => void
  isLoading?: boolean
}

export default function PeakShavingForm({ onSubmit, isLoading }: PeakShavingFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

    const form = useForm<PeakShavingFormData>({
      resolver: zodResolver(peakShavingSchema),
      defaultValues: {
        powerProfile: undefined,
      },
    })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmitData = async (data: PeakShavingFormData) => {
    console.log("Raw Data From Form:", data);
    onSubmit(data);
  }


  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Entrada de dados</CardTitle>
        <CardDescription>
          Insira os parâmetros para calcular o Peak Shaving
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmitData)} className="space-y-6">
          {/* Seção de Arquivos */}
          <div className="flex flex-col gap-4">
            {/* <h3 className="text-lg font-medium">Perfis de Dados</h3> */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Titulo identificador:</Label>
                <Input
                  id="name"
                  type="text"
                  {...form.register("name")}
                  placeholder="Ex: Calculo de Peak Shaving, Local X"
                />
              </div>
              <div>
                <FileUpload
                  label="Perfil de Potência:"
                  accept=".mat,.xls,.xlsx,.csv"
                  value={form.watch("powerProfile")}
                  onChange={(file) => form.setValue("powerProfile", file)}
                />
                {form.formState.errors.powerProfile && (
                  <p className="text-sm text-destructive mt-1">
                    {form.formState.errors.powerProfile.message}
                  </p>
                )}
              </div>
              <div className="flex flex-row gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="startPeakTime">Hora de Início do Pico:</Label>
                  <Input
                    id="startPeakTime"
                    type="time"
                    {...form.register("startPeakTime")}
                  />
                  {form.formState.errors.startPeakTime && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.startPeakTime.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="endPeakTime">Hora de Fim do Pico:</Label>
                  <Input
                    id="endPeakTime"
                    type="time"
                    {...form.register("endPeakTime")}
                  />
                  {form.formState.errors.endPeakTime && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.endPeakTime.message}
                    </p>
                  )}
                </div>
                
              </div>
            <Button type="submit" disabled={loading || isLoading}>
              {loading || isLoading ? "Processando..." : "Calcular"}
            </Button>
          </div>
        </form>
        
        {/* Seção de Resultado */}
        {result && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h3 className="font-medium mb-2">Resultado:</h3>
            <p className="text-sm">{result}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}