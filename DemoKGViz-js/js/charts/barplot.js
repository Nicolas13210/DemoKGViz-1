

function drawBarPlot(data,id){

    console.log(data);
    let xScale = d3.scaleTime()
    .domain(d3.extent(data, function(d) { return new Date(d.date); }))
    .range([ 0, width - margin.left]);

    let yScale = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return parseFloat(d.value); })])
    .range([height - margin.bottom, 0]);

    let xAxis = d3.axisBottom(xScale);
    let yAxis = d3.axisLeft(yScale);

    let svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id",id)
        .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    
    let xAxisGroup = svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    
    let yAxisGroup = svg.append("g")
    .call(yAxis);

    svg.selectAll(".rect")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return xScale(new Date(d.date)); })
        .attr("y", function(d) { return yScale(d.value); })
        .attr("height", function(d) { return height - yScale(d.value); })
        .attr("width", function(d) { return xScale(new Date(d.date)); })
        .attr("fill", "steelblue");
}