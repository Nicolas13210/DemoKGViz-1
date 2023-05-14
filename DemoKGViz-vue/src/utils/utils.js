export const isParameterTypeDataAlreadyFetch = (parameters, parameter) => {
    const foundTypeData = parameters.find(p => p.type === parameter.type);
    return foundTypeData ? true : false
}