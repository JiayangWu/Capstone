const radius = Math.min(width, height) / 2;

const svg2 = d3.select("#graph2")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

const color2 = d3.scaleOrdinal()
    .domain([0, 800])
    .range(d3.schemeSet2);

const pie = d3.pie()
    .value(function (d) { return d.count; })

const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

var outerArc = d3.arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9)

var arcGenerator = d3.arc()
    .innerRadius(0)
    .outerRadius(radius)
function type(d) {
    d.NA = Number(d.NA);
    d.EU = Number(d.EU);
    d.JP = Number(d.JP);
    d.Other = Number(d.Other);
    return d;
}

function arcTween(a) {
    const i = d3.interpolate(this._current, a);
    this._current = i(1);
    return (t) => arc(i(t));
}


d3.json("data.json", type).then(data => {
    console.log(data);
    d3.selectAll("input")
        .on("change", update);

    function update(val = this.value) {
        // Join new data
        // console.log(val);

        var region_data = pie(data[val]);

        const path = svg2.selectAll("path.slice")
            .data(region_data);
        // Update existing arcs
        path.transition().duration(200).attrTween("d", arcTween);

        // Enter new arcs
        path.enter().append("path")
            .attr("fill", (d, i) => color2(i))
            .attr("d", arc)
            .attr("stroke", "white")
            .attr("stroke-width", "3px")
            .style("opacity", 0.85)
            .each(function (d) { this._current = d; });

        function GetMidAngle(d) {
            return d.startAngle + (d.endAngle - d.startAngle) / 2;
        }
        var text = svg2
            .selectAll('mySlices')
            .data(region_data)
            .enter()
            .append('text')
            .text(function (d) { console.log(d); return d.data.genre })
            .attr("transform", function (d) { return "translate(" + arcGenerator.centroid(d) + ")"; })
            .style("text-anchor", "middle")
            .style("font-size", 15);

    }

    update("NA");
});