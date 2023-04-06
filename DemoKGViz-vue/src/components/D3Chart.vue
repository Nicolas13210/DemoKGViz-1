<template>
    <div ref="chart"></div>
</template>

<script>
import * as d3 from "d3";
import niceJson from '../assets/nice.json'

export default {
    name: "D3Chart",
    props: {
        data: Array,
        line1Data: Array,
        line2Data: Array,
        width: {
            type: Number,
            default: 1000,
        },
        height: {
            type: Number,
            default: 400,
        },
    },
    mounted() {
        const svg = d3.select(this.$refs.chart).append("svg").attr("viewBox", `0 0 ${this.width} ${this.height}`);

        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const innerWidth = this.width - margin.left - margin.right;
        const innerHeight = this.height - margin.top - margin.bottom;

        const x = d3.scaleBand().domain(this.data.map((d) => d.x)).range([margin.left, innerWidth + margin.left]).padding(0.1);

        const y = d3.scaleLinear().domain([0, d3.max(this.data, (d) => d.y)]).nice().range([innerHeight + margin.top, margin.top]);

        const xAxis = (g) =>
            g.attr("transform", `translate(0,${innerHeight + margin.top})`).call(d3.axisBottom(x).tickSizeOuter(0));

        const yAxis = (g) =>
            g.attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y).ticks(null, "s")).call((g) => g.select(".domain").remove());

        svg.append("g").call(xAxis).append("text").attr("y", margin.bottom / 2).attr("x", innerWidth / 2).attr("fill", "currentColor").attr("text-anchor", "middle").text("X axis");

        svg.append("g").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", -margin.left).attr("x", -(innerHeight / 2)).attr("fill", "currentColor").attr("text-anchor", "middle").text("Y axis");

        svg
            .append("g")
            .selectAll(".bar")
            .data(this.data)
            .join("rect")
            .attr("class", "bar")
            .attr("x", (d) => x(d.x))
            .attr("y", (d) => y(d.y))
            .attr("width", x.bandwidth())
            .attr("height", (d) => y(0) - y(d.y))
            .attr("fill", "#69b3a2");

        const line = d3.line().x((d) => x(d.x) + x.bandwidth() / 2).y((d) => y(d.y));

        svg
            .append("path")
            .datum(this.line1Data)
            .attr("fill", "none")
            .attr("stroke", "green")
            .attr("stroke-width", 2)
            .attr("d", line);

        svg
            .append("path")
            .datum(this.line2Data)
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 2)
            .attr("d", line);
    },
};
</script>

<style scoped></style>