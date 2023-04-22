export function transformData(inputData) {
    const outputData = {
        "values": []
    };

    const inputBindings = inputData.results.bindings;
    inputBindings.forEach((inputBinding) => {
        const outputBinding = {};
        Object.keys(inputBinding).forEach((key) => {
            outputBinding[key] = inputBinding[key].value;
            if (inputBinding[key].datatype === "http://www.w3.org/2001/XMLSchema#double") {
                outputBinding[key] = parseFloat(outputBinding[key]);
            }
        });
        outputData.values.push(outputBinding);
    });
   console.log(outputData)
    return outputData;
}
