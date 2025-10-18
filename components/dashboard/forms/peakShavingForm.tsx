"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUpload } from "@/components/ui/file-upload";
import { PeakShavingFormData, peakShavingSchema } from "@/lib/schemas/peakShaving";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface PeakShavingFormProps {
  onSubmit: () => void
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

  const handleSubmitData = () =>{
    onSubmit();
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FileUpload
                  label="Perfil de Potência:"
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
            </div>
            <Button type="submit">Calcular</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}