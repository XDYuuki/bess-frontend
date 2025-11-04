import { BarGraph } from "@/components/barGraph";
import React, { useMemo } from "react";

interface HistogramProps {
    data: number[];
    title: string;
    description: string;
    xAxisLabel: string;
    yAxisLabel: string;
    showGrid: boolean;
    height: number;
    averageValue: number;
    intervals: {min:number; max:number;}[];
}

const Histogram: React.FC<HistogramProps> = (props) => {
    // Função para contar incidências em cada intervalo
    const histogramData = useMemo(() => {
        const counts = props.intervals.map((interval, index) => {
            const isLastInterval = index === props.intervals.length - 1;
            
            // Conta quantos valores estão dentro do intervalo
            // Para o último intervalo, inclui o valor máximo
            const count = props.data.filter(value => {
                if (isLastInterval) {
                    // Último intervalo: inclui o valor máximo
                    return value >= interval.min && value <= interval.max;
                }
                // Outros intervalos: [min, max)
                return value >= interval.min && value < interval.max;
            }).length;
            
            return {
                label: `${interval.min.toFixed(2)} - ${interval.max.toFixed(2)}`,
                value: count,
                min: interval.min,
                max: interval.max,
            };
        });
        
        return counts;
    }, [props.data, props.intervals]);

    // Calcula a média das incidências para a linha de referência
    const averageCount = useMemo(() => {
        if (histogramData.length === 0) return 0;
        const total = histogramData.reduce((sum, item) => sum + item.value, 0);
        return total / histogramData.length;
    }, [histogramData]);

    // Extrai apenas os valores para o BarGraph
    const histogramValues = histogramData.map(item => item.value);
    
    return (
        <BarGraph
            title={props.title}
            description={props.description}
            xAxisLabel={props.xAxisLabel}
            yAxisLabel={props.yAxisLabel}
            showGrid={props.showGrid}
            height={props.height}
            data={histogramValues}
            averageValue={averageCount}
            labels={histogramData.map(item => item.label)}
        />
    );
}

export default Histogram;