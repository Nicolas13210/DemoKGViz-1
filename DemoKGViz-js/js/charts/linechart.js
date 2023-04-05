
let color = d3.scaleOrdinal();

let scales = {
    x: d3.scaleTime(),
    y: d3.scaleLinear()
};

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 600 - margin.left - margin.right,
    height = 400     - margin.top - margin.bottom;

function drawChart(data, id) {

    //draw the chart    
    console.log("draw");
    
    //delete the svg that have the same id as attribute
    //d3.select(`#test`).remove();

    // append the svg object to the body of the page
    //var svg = d3.select(`#${"TMin"}`)


    let svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id",id)
        .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")");
    //load data

    // group the data: I want to draw one line per group
    var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
        .key(function(d) { return d.id;})
        .entries(data);
                // à tester pour avoir des "clés en tuples"
        //.key(function(d) { return (d.id,d.stationName);})

    // Add Y axis
    var y = d3.scaleLinear()
        .domain(d3.extent(data, function (d) { return parseFloat(d.value) }))
        .range([ height - margin.bottom, 0 ]);
        svg.append("g")
        .call(d3.axisLeft(y));

    // Add X axis --> it is a date format
    var x = d3.scaleTime()
        .domain(d3.extent(data, function(d) { return new Date(d.date); }))
        .range([ 0, width - margin.left]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(5));


    // color palette
    var res = sumstat.map(function(d){ return d.key }) // list of group names
    var color = d3.scaleOrdinal()
        .domain(res)
        //.range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999'])
        .range(colorbrewer.Set2[6])

    // Draw the line
    svg.selectAll(".line")
    .data(sumstat)
    .enter()
    .append("path")
        .attr("fill", "none")
        .attr("stroke", function(d){ return color(d.key) })
        .attr("stroke-width", 1.5)
        .style("opacity", 1)
        .attr("d", (d)=>{
        return d3.line()
            .curve(d3.curveCardinal)
            .x(function(d) { return x(new Date(d.date)); })
            .y(function(d) { return y(d.value); })
            (d.values)
        })

    // -----------------------------------------------------------------------------------------------------------
    
    /*
    color.domain(d3.map(this.data, function(d){return d.station;}).keys());

    //create the svg
    let svg = d3.select("#"+this.id).append("svg")
        .attr("width", 800)
        .attr("height", 600);

    //create the x axis
    scales.x.domain(d3.extent(this.data, function(d){return d.date; }));
    svg.append("g")
        .attr("transform", "translate(0," + 500 + ")")
        .call(d3.axisBottom(scales.x));

    //create the y axis
    scales.y.domain([0, d3.max(this.data, function(d){return d.value; })]);
    svg.append("g")
        .attr("transform", "translate(50,0)")
        .call(d3.axisLeft(scales.y));

    //create the line
    let line = d3.line()
        .x(function(d) { return scales.x(d.date); })
        .y(function(d) { return scales.y(d.value); });

    //create the path
    svg.append("path")
        .datum(this.data)
        .attr("fill", "none")
        .style("stroke", d => color(d.key))
        .attr("stroke-width", 1.5)
        .attr("d", line);

    //create the legend
    let legend = svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(color.domain().slice())
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", 750 - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", color);
        
    legend.append("text")
        .attr("x", 750 - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function(d) { return d; });
    
    */
}

function update(typeArray, id,data){
    console.log("update");
    console.log(data);
    //for each parameter in types, we update the chart by changing opacity    
    //check if type array is empty
    if(typeArray.length == 0){
        deleteChart(id);
    } else{
        //change opacity of the lines according to the type array
    }
}

function deleteChart(type){
    console.log("delete");
    //select the svg and remove it
    d3.select("#"+type).remove();
    chartCalc.delete(type);
}



