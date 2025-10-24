"use client";
import { useEffect, useState } from "react";
import { GetPeakShavingUseCaseById } from "../../application/PeakShavingUseCase";
import { IPeakShaving } from "../../types/peakShavingTypes";
import { Histogram } from "@/components/histogram";
import { useParams } from "next/navigation";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function PickShavingFragmentPage() {
	const { peakShavingId } = useParams<{ peakShavingId: string }>();
	const [peakShaving, setPeakShaving] = useState<IPeakShaving | null>(null);

	useEffect(() => {
		const fetchPeakShaving = async () => {
			if (!peakShavingId) return;
			try {
				const response = await GetPeakShavingUseCaseById(peakShavingId);
				setPeakShaving(response);
			} catch (error) {
				console.error(error);
			}
		};
		fetchPeakShaving();
	}, [peakShavingId]);

	return (
		<div className="flex flex-col gap-4">
			<div>
				<Card className="transition-shadow hover:shadow-md">
					<CardHeader>
						<CardTitle className="flex items-start justify-between">
							<span className="line-clamp-1">
								{peakShaving?.name}
							</span>
							<FileText className="h-5 w-5 text-muted-foreground" />
						</CardTitle>
						<CardDescription className="line-clamp-2">
							Dados do calculo de Peak Shaving
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex flex-rol gap-20">
							<div className="flex flex-col gap-2">
								<div className="flex flex-col lg:flex-row gap-2 lg:items-center">
									<h3 className="font-medium">
										Energia Máxima Diária [kw/h]:{" "}
									</h3>
									<div className="">
										<div className="p-1 border border-primary rounded-md">
											{peakShaving
												? peakShaving.max_daily_energy.toFixed(2)
												: 0
											}
										</div>
									</div>
								</div>

								<div className="flex flex-col lg:flex-row gap-2 lg:items-center">
									<h3 className="font-medium">
										Energia Mínima Diária [kw/h]:{" "}
									</h3>
									<div className="">
										<div className="p-1 border border-primary rounded-md">
											{peakShaving
												? peakShaving.min_daily_energy.toFixed(2)
												: 0
											}
										</div>
									</div>
								</div>

								<div className="flex flex-col lg:flex-row gap-2 lg:items-center">
									<h3 className="font-medium">
										Potência Máxima Diária [kw]:{" "}
									</h3>
									<div className="">
										<div className="p-1 border border-primary rounded-md">
											{peakShaving
												? peakShaving.max_daily_power.toFixed(2)
												: 0
											}
										</div>
									</div>
								</div>

								<div className="flex flex-col lg:flex-row gap-2 lg:items-center">
									<h3 className="font-medium">
										Potência Mínima Diária [kw]:{" "}
									</h3>
									<div className="">
										<div className="p-1 border border-primary rounded-md">
											{peakShaving
												? peakShaving.min_daily_power.toFixed(2)
												: 0
											}
										</div>
									</div>
								</div>
							</div>

							<div className="flex flex-col gap-2">
								<div className="flex flex-col lg:flex-row gap-2 lg:items-center">
									<h3 className="font-medium">
										Energia Média [kw/h]:{" "}
									</h3>
									<div className="">
										<div className="p-1 border border-primary rounded-md">
											{peakShaving
												? peakShaving.energy_average.toFixed(2)
												: 0
											}
										</div>
									</div>
								</div>

								<div className="flex flex-col lg:flex-row gap-2 lg:items-center">
									<h3 className="font-medium">
										Potência Média [W/h]:{" "}
									</h3>
									<div className="">
										<div className="p-1 border border-primary rounded-md">
											{peakShaving
												? peakShaving.power_average.toFixed(2)
												: 0
											}
										</div>
									</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<Histogram
				title="Histograma de Energia Diária"
				description="Valores de energia diária"
				xAxisLabel="Dia"
				yAxisLabel="Energia diária [kWh]"
				showGrid={true}
				height={400}
				data={peakShaving?.daily_energie_list || []}
				averageValue={peakShaving?.energy_average || 0}
			/>

			<Histogram
				title="Histograma de Potência Máxima Diária"
				description="Valores de potência máxima diária"
				xAxisLabel="Dia"
				yAxisLabel="Ptência Máxima diária[kW]"
				showGrid={true}
				height={400}
				data={peakShaving?.max_daily_power_list || []}
				averageValue={peakShaving?.power_average || 0}
			/>
		</div>
	);
}
