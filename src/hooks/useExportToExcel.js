import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

/**
 * Exporta datos a Excel con columnas personalizadas
 * 
 * @returns {exportToExcel}
 */
export const useExportToExcel = () => {
    /**
     * 
     * @param {Array} data - Array de objetos a exportar
     * @param {Object} columnsMap - Mapeo de { columnaFinal: campoOriginal }
     * @param {String} filename - Nombre del archivo Excel
     */
    const exportToExcel = (data, columnsMap, filename = "Reporte.xlsx") => {
        const dataToExport = data.map((row) => {
            const newRow = {};
            for (const [header, key] of Object.entries(columnsMap)) {
                const value = row[key];
                newRow[header] =
                    value instanceof Date
                        ? value.toLocaleDateString()
                        : typeof value === "number"
                            ? value.toFixed(2)
                            : value;
            }
            return newRow;
        });

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        const blob = new Blob([excelBuffer], {
            type: "application/octet-stream",
        });

        saveAs(blob, filename);
    };

    return { exportToExcel };
};
