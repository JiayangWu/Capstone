const radius = Math.min(width, height) / 2;

const svg2 = d3.select("#graph2")
    .append("svg")
    .attr("width", width)
    .attr("height", 400)
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



function midAngle(d) {
    return d.startAngle + (d.endAngle - d.startAngle) / 2;
}

function type(d) {
    d.NA = Number(d.NA);
    d.EU = Number(d.EU);
    d.JP = Number(d.JP);
    d.Other = Number(d.Other);
    return d;
}


function resetChart() {
    console.log(svg2);

}

d3.json("data.json", type).then(data => {
    console.log(data);
    function update(val = this.value) {
        // console.log(val, "dsadass");
        svg2.selectAll("text").remove();
        svg2.selectAll("path").remove();
        svg2.selectAll("polyline").remove();

        var region_data = pie(data[val]);
        console.log(region_data);

        const paths = svg2.selectAll("path")
            .data(region_data);

        paths.enter().append("path")
            .attr("fill", (d, i) => color2(i))
            .attr("d", arc)
            .attr("stroke", "white")
            .attr("stroke-width", "3px")
            .style("opacity", 0.85)
            .each(function (d) { this._current = d; });

        var texts = svg2
            .selectAll('text')
            .data(region_data)
            .enter()
            .append('text')
            .text(function (d) { console.log(d); return d.data.genre })
            .style("text-anchor", "middle")
            .style("font-size", 12);

        texts.attr('transform', function (d) {
            var pos = outerArc.centroid(d);
            // console.log(d, pos);
            var mid_angle = midAngle(d);
            if (d.endAngle >= 5.8) {
                pos[1] += 13;
            }
            if (d.index == 11) {
                pos[1] -= 10;
            }
            pos[0] = radius * 1.2 * (mid_angle < Math.PI ? 1 : -1);
            return 'translate(' + pos + ')';
        });



        var poly_lines = svg2
            .selectAll('polyline')
            .data(region_data)
            .enter()
            .append('polyline')
            .attr("stroke", "black")
            .style("fill", "none")
            .attr("stroke-width", 0.9)
            .attr("opacity", 0.85)
            .attr('points', function (d) {
                var posA = labelArc1.centroid(d) // line insertion in the slice
                var posB = labelArc2.centroid(d)
                var posC = labelArc2.centroid(d); // Label position = almost the same as posB
                if (d.endAngle >= 5.8) {
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

        texts.exit()
            .remove();
        paths.exit().remove();
        poly_lines.exit().remove();
    }
    update("NA");
    // d3.select("#regionButton").on("change", update)
    d3.selectAll("input")
        .on("change", update);

});