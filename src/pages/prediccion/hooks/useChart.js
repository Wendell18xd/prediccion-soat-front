import { useState } from "react";

export const useChart = () => {
    const [dataActiva, setDataActiva] = useState([]);
    const [dataCancelada, setDataCancelada] = useState([]);

    const [dataActivaProvincia, setDataActivaProvincia] = useState([]);
    const [dataCanceladaProvincia, setDataCanceladaProvincia] = useState([]);
    const [dataProvinciaChart, setDataProvinciaChart] = useState([]);
    const [dataCanceladaLineChart, setDataCanceladaLineChart] = useState([]);
    const [dataUsoDelAutoChart, setDataUsoDelAutoChart] = useState([]);

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

        console.log(combinado)

        setDataProvinciaChart(combinado);
    };

    const mapDataCanceladaLineChart = (predicciones) => {
        const canceladas = predicciones.filter(p => p.estado_emision_prediccion === "Cancelada");

        const data = canceladas.map((p, index) => ({
            id: index + 1,
            montoBruto: parseFloat(p.monto_bruto) || 0,
            montoPrima: parseFloat(p.monto_prima) || 0,
            probabilidad: parseFloat(p.probabilidad).toFixed(2) || 0,
        }));

        setDataCanceladaLineChart(data);
    };

    const mapDataUsoDelAutoChart = (predicciones) => {
        // Agrupar por uso_del_auto, separando activas y canceladas
        const { activas, canceladas } = agruparPorCampo(predicciones, "uso_del_auto");

        // Obtener todos los tipos de uso presentes
        const usos = new Set([
            ...activas.map((a) => a.nombre),
            ...canceladas.map((c) => c.nombre),
        ]);

        // Combinar en un solo array
        const combinado = Array.from(usos).map((uso) => {
            const activa = activas.find((a) => a.nombre === uso);
            const cancelada = canceladas.find((c) => c.nombre === uso);
            return {
                uso_del_auto: uso,
                riesgoActiva: activa?.riesgo || 0,
                riesgoCancelada: cancelada?.riesgo || 0,
            };
        });

        console.log(combinado);

        setDataUsoDelAutoChart(combinado);
    };

    return {
        //* Propiedades
        dataActiva,
        dataCancelada,
        dataActivaProvincia,
        dataCanceladaProvincia,
        dataProvinciaChart,
        dataCanceladaLineChart,
        dataUsoDelAutoChart,

        //* Metodos
        mapDataDistritoChart,
        mapDataProvinciaChart,
        mapDataCanceladaLineChart,
        mapDataUsoDelAutoChart,
    };
};
