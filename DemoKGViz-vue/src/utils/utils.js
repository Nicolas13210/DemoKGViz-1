export const isParameterTypeDataAlreadyFetch = (parameters, parameter) => {
    console.log(parameters, parameter)
    const foundTypeData = parameters.find(p => p.type === parameter.type);
    return foundTypeData ? true : false
}

export function groupRequestsByParam(requests) {
    return [...new Set(requests.map(item => item.request))]
}

export function reloadChart(context, parameters, stations, startDate, endDate) {
    // Reload chart data

    for (let fonction of groupRequestsByParam(parameters)) {
        context.dispatch("setWeather", {
            query: fonction(stations,startDate,endDate),
            queryMethod: fonction.name
        });
    }
}