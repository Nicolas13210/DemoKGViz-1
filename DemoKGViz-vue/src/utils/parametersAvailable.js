import data from "../config/metricsConfig.json"

export function parametersAvailable(selectedParameter, chartType) {
    if (data.some(category => category.items.find(item => item.param === selectedParameter && item.availableChart.includes(chartType)))) {
        return data.flatMap((item) => item.items).find((item) => item.param === selectedParameter);
    }
}
