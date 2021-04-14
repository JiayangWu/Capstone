var svg4 = d3.select("#graph4")
    .append("svg")
    .attr("width", 1000)
    .attr("height", 1000)
    .append("g");

var projection = d3.geoNaturalEarth()
    .scale(width / 1.3 / Math.PI)
    .translate([width / 2, height / 2])

// console.log("dsadsadas");

var path = d3.geoPath().projection(d3.geoMercator());

d3.json("world.json").then((world) => {

    // console.log(world);

    var map_data = topojson.feature(world, world.objects.countries).features;
    console.log(map_data);

    svg4.append("g")
        .selectAll("path")
        .data(map_data)
        .enter().append("path")
        .attr("fill", (d) => {
            if (d.id == "JPN")
                return "#a6d854"; // Green for JP
            else {
                return "#fc8d62"; // Orange for others
            }
        })
        .attr("d", d3.geoPath()
            .projection(projection)
        )
        .style("stroke", "#FFFFFF");

    // .attr("transform", (-1000, 0));/
    // .attr("left", -400);

    svg4.append("circle")
        .attr("cx", 60)
        .attr("cy", 330)
        .attr("r", 6)
        .style("fill", "#fc8d62")

    svg4
        .append("circle")
        .attr("cx", 60)
        .attr("cy", 360)
        .attr("r", 6)
        .style("fill", "#a6d854")

    svg4.append("text")
        .attr("x", 80)
        .attr("y", 330)
        .text("Regions where Action is the most popular genre(NA, EU and Other)")
        .style("font-size", "15px")
        .attr("alignment-baseline", "middle")

    svg4.append("text")
        .attr("x", 80)
        .attr("y", 360)
        .text("Regions where RPG is the most popular genre(Only JP)")
        .style("font-size", "15px")
        .attr("alignment-baseline", "middle")
});