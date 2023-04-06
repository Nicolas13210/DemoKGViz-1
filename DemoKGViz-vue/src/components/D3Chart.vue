<template>
    <div ref="chart"></div>
</template>

<script>
import * as d3 from "d3";
import niceJson from '../assets/nice.json'

export default {
    name: "D3Chart",
    data() {
        return {
            data: [
                { x: "Jan", y: 10 },
                { x: "Feb", y: 20 },
                { x: "Mar", y: 15 },
                { x: "Apr", y: 25 },
                { x: "May", y: 30 },
                { x: "Jun", y: 22 },
                { x: "Jul", y: 18 },
                { x: "Aug", y: 28 },
                { x: "Sep", y: 35 },
                { x: "Oct", y: 40 },
                { x: "Nov", y: 32 },
                { x: "Dec", y: 20 }
            ],
            lineData: [
                { x: "Jan", y: 15 },
                { x: "Feb", y: 25 },
                { x: "Mar", y: 20 },
                { x: "Apr", y: 30 },
                { x: "May", y: 35 },
                { x: "Jun", y: 27 },
                { x: "Jul", y: 23 },
                { x: "Aug", y: 33 },
                { x: "Sep", y: 40 },
                { x: "Oct", y: 45 },
                { x: "Nov", y: 37 },
                { x: "Dec", y: 25 }
            ]
        }
    },
    mounted() {
        console.log(niceJson.results.bindings);
        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const width = 500 - margin.left - margin.right;
        const height = 300 - margin.top - margin.bottom;

        const svg = d3
            .select(this.$refs.chart)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const x = d3
            .scaleBand()
            .range([0, width])
            .domain(niceJson.results.bindings.map((d) => d.date.value))
            .padding(0.1);
            

        const y = d3.scaleLinear().range([height, 0]);

        y.domain([0, d3.max(this.data, (d) => d.y)]);

        svg
            .append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
        svg
            .append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Value");

        svg
            .selectAll(".bar")
            .data(this.data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d) => x(d.x))
            .attr("y", (d) => y(d.y))
            .attr("width", x.bandwidth())
            .attr("height", (d) => height - y(d.y));

        const line = d3
            .line()
            .x((d) => x(d.x) + x.bandwidth() / 2)
            .y((d) => y(d.y));

        svg
            .append("path")
            .datum(this.lineData)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", line);
    },
}
</script>

<style scoped></style>