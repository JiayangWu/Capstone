const radius = Math.min(width, height) / 2;

const svg2 = d3.select("#graph2")
    .append("svg")
    .attr("width", width)
    .attr("height", 540)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

const color2 = d3.scaleOrdinal()
    .domain([0, 800])
    .range(d3.schemeSet2);

const pie = d3.pie()
    .value(function (d) { return d.count; })
    .sort(function (d) { return d.value });

const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

var outerArc = d3.arc()
    .innerRadius(radius * 0.95)
    .outerRadius(radius * 0.95)

const labelArc1 = d3.arc()
    .innerRadius(radius * 0.75)
    .outerRadius(radius * 0.95);

const labelArc2 = d3.arc()
    .innerRadius(radius * 0.96)
    .outerRadius(radius * 0.96)

function type(d) {
    d.NA = Number(d.NA);
    d.EU = Number(d.EU);
    d.JP = Number(d.JP);
    d.Other = Number(d.Other);
    return d;
}

// function arcTween(a) {
//     const i = d3.interpolate(this._current, a);
//     this._current = i(1);
//     return (t) => arc(i(t));
// }


d3.json("data.json", type).then(data => {
    console.log(data);
    d3.selectAll("input")
        .on("change", update);

    function update(val = this.value) {

        var region_data = pie(data[val]);
        const path = svg2.selectAll("path.slice")
            .data(region_data);
        // Update existing arcs
        // path.transition().duration(200).attrTween("d", arcTween);

        // Enter new arcs
        path.enter().append("path")
            .attr("fill", (d, i) => color2(i))
            .attr("d", arc)
            .attr("stroke", "white")
            .attr("stroke-width", "3px")
            .style("opacity", 0.85)
            .each(function (d) { this._current = d; });

        function midAngle(d) {
            return d.startAngle + (d.endAngle - d.startAngle) / 2;
        }

        var text = svg2
            .selectAll('mySlices')
            .data(region_data)
            .enter()
            .append('text')
            .text(function (d) { console.log(d); return d.data.genre });

        text
            .style("text-anchor", "middle")
            .style("font-size", 12);

        text.attr('transform', function (d) {
            var pos = outerArc.centroid(d);
            console.log(d, pos);
            var mid_angle = midAngle(d);
            if (d.endAngle >= 6.0) {
                pos[1] += 13;
            }
            if (d.index == 11) {
                pos[1] -= 10;
            }
            pos[0] = radius * 1.2 * (mid_angle < Math.PI ? 1 : -1);
            return 'translate(' + pos + ')';
        });

        text.exit()
            .remove();

        svg2
            .selectAll('allPolylines')
            .data(region_data)
            .enter()
            .append('polyline')
            .attr("stroke", "black")
            .style("fill", "none")
            .attr("stroke-width", 0.8)
            .attr("opacity", 0.85)
            .attr('points', function (d) {
                var posA = labelArc1.centroid(d) // line insertion in the slice
                var posB = labelArc2.centroid(d)
                var posC = labelArc2.centroid(d); // Label position = almost the same as posB
                if (d.endAngle >= 6.0) {
                    posC[1] += 13;
                    posB[1] += 13;
                }
                if (d.index == 11) {
                    posC[1] -= 10;
                    posB[1] -= 10;
                }
                var midangle = midAngle(d)
                posC[0] = radius * 1.0 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
                return [posA, posB, posC]
            })
    }

    update("NA");
});