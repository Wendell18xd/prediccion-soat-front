import { useState } from "react";

export const useChart = () => {
    const [dataActiva, setDataActiva] = useState([]);
    const [dataCancelada, setDataCancelada] = useState([]);

    const [dataActivaProvincia, setDataActivaProvincia] = useState([]);
    const [dataCanceladaProvincia, setDataCanceladaProvincia] = useState([]);
    const [dataProvinciaChart, setDataProvinciaChart] = useState([]);

    const agruparPorCampo = (predicciones, campo) => {
        const activas = {};
        const canceladas = {};

        predicciones.forEach((p) => {
            const key = p[campo] || "Desconocido";
            const prob = parseFloat(p.probabilidad) || 0;

            if (p.estado_emision_prediccion === "Activa") {
                if (!activas[key]) activas[key] = { total: 0, count: 0 };
                activas[key].total += prob;
                activas[key].count += 1;
            } else if (p.estado_emision_prediccion === "Cancelada") {
                if (!canceladas[key]) canceladas[key] = { total: 0, count: 0 };
                canceladas[key].total += prob;
                canceladas[key].count += 1;
            }
        });

        const formatear = (obj) =>
            Object.entries(obj).map(([nombre, { total, count }]) => ({
                nombre,
                riesgo: parseFloat((total / count).toFixed(2)), // Promedio
            }));
        return {
            activas: formatear(activas),
            canceladas: formatear(canceladas),
        };
    };

    const mapDataDistritoChart = (predicciones) => {
        const { activas, canceladas } = agruparPorCampo(predicciones, "distrito");
        setDataActiva(activas);
        setDataCancelada(canceladas);
    };

    const mapDataProvinciaChart = (predicciones) => {
        const { activas, canceladas } = agruparPorCampo(predicciones, "provincia");
        setDataActivaProvincia(activas);
        setDataCanceladaProvincia(canceladas);

        // Opcional: unificar ambos en un dataset para BarChart (si quieres comparar ambas)
        const provincias = new Set([
            ...activas.map((a) => a.nombre),
            ...canceladas.map((c) => c.nombre),
        ]);

        const combinado = Array.from(provincias).map((provincia) => {
            const activa = activas.find((a) => a.nombre === provincia);
            const cancelada = canceladas.find((c) => c.nombre === provincia);
            return {
                provincia,
                riesgoActiva: activa?.riesgo || 0,
                riesgoCancelada: cancelada?.riesgo || 0,
            };
        });

        setDataProvinciaChart(combinado);
    };

    return {
        //* Propiedades
        dataActiva,
        dataCancelada,
        dataActivaProvincia,
        dataCanceladaProvincia,
        dataProvinciaChart,

        //* Metodos
        mapDataDistritoChart,
        mapDataProvinciaChart,
    };
};
