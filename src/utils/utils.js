export const isParameterTypeDataAlreadyFetch = (parameters, parameter) => {
    console.log(parameters, parameter)
    const foundTypeData = parameters.find(p => p.type === parameter.type);
    return !!foundTypeData
}

export function groupRequestsByParam(requests) {
    return [...new Set(requests.map(item => item.request))]
}

export function reloadChart(context) {
    // Reload chart data

    // if comparison is active, then use getComparisonDate, else use getStartDate...

    for (let fonction of groupRequestsByParam(context.getters.getParameters)) {
        context.dispatch("setWeather", {
            query: fonction(
                context.getters.getSelectedStationsJoin,
                context.getters.getDate[0],
                context.getters.getDate[1]),
            queryMethod: fonction.name
        });
    }
}
