function BarLineChart(data,id) {
    this.data = data;
    this.id = id;
    this.svg;
    return this;
}

function draw(){

    //draw the chart
    console.log("draw");
    
    //delete the svg that have the same id as attribute
    //d3.select(`#test`).remove();

    // append the svg object to the body of the page
    //var svg = d3.select(`#${"TMin"}`)
    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id","test")
        .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")");
    //load data

    this.svg = svg;
    
    //set an id to the svg
    //svg.attr("id","test");


    const data = this.data;
    console.log(data);
    
    // group the data: I want to draw one line per group
    var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
        .key(function(d) { return d.id;})
        .entries(data);
                // à tester pour avoir des "clés en tuples"
        //.key(function(d) { return (d.id,d.stationName);})
    
    console.log(sumstat);

    // Add Y axis
    var y = d3.scaleLinear()
        .domain(d3.extent(this.data, function (d) { return parseFloat(d.value) }))
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

    let cpt=0;

    console.log("AYAA");
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

    console.log("AYAAZ");




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

function update(type){
    console.log("update");

    //for each parameter in types, we update the chart by changing opacity    
    //check if type array is empty
    if(type.length == 0){
        deleteChart();
    } else{
        //for each parameter in types, we update the chart by changing opacity

        
        //select all the lines  

        /*
        this.svg.selectAll(".line")
            .transition()
            .style("opacity", (d)=>{
                console.log(d);
                if(type.includes(d.key)){
                    return 0;
                } else{
                    return 0.1;
                }
            });
        */
         
    }
}

function deleteChart(){
    console.log("delete");
    d3.select(`#test`).remove();
    chartCalc.delete(this.id);
}

function print(){
    console.log(this.data);
    console.log(this.id);
}


var data = [{ date: '1-May-12', close: 58.13, open: 7.41 }, { date: '2-May-12', close: 53.98, open: 45.55 }, { date: '3-May-12', close: 67.00, open: 11.78}];

var margin = { top: 30, right: 40, bottom: 30, left: 50 },
	width = 600 - margin.left - margin.right,
	height = 270 - margin.top - margin.bottom;

var x = d3.scale.ordinal().rangeBands([0, width], .09); // <-- to change the width of the columns, change the .09 at the end to whatever
var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis().scale(x)
	.orient("bottom")
	.tickFormat(d3.time.format("%d-%b-%y"));

var yAxisLeft = d3.svg.axis().scale(y)
	.orient("left");

var valueline = d3.svg.line()
	.x(function (d) { return x(d.date) + x.rangeBand()/2; })
	.y(function (d) { return y(d.open); });

var svg = d3.select("body")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform",
		"translate(" + margin.left + "," + margin.top + ")");

// Get the data
data.forEach(function (d) {
	d.date = new Date(d.date);
	d.close = +d.close;
	d.open = +d.open;
});

// Scale the range of the data
x.domain(data.map(function (d) { return d.date; }));
y.domain([0, d3.max(data, function (d) { return d.close; })]);

// Add the X Axis
svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

// Add the Y Axis
svg.append("g")
		.attr("class", "y axis")
		.style("fill", "steelblue")
		.call(yAxisLeft);

// Draw the bars
svg.selectAll("bar")
		.data(data)
		.enter()
		.append("rect")
		.style("fill", "#99ffcc")
		.attr("x", function (d) { return x(d.date); })
		.attr("width", x.rangeBand())
		.attr("y", function (d) { return y(d.close); })
		.attr("height", function (d) { return height - y(d.close); });

// Add the valueline path
svg.append("path")
		.attr("d", valueline(data));