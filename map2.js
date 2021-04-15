var svg8 = d3.select("#graph8")
    .append("svg")
    .attr("width", 1400)
    .attr("height", 500 * 2)
    .append("g");

// var path = d3.geoNaturalEarth()
//     .scale(width / 1.3 / Math.PI)
//     .translate([width / 2, height / 2]);
var path = d3.geoAlbersUsa();
// console.log("dsadsadas");
var projection = d3.geoNaturalEarth()
    .scale(width / 1.3 / Math.PI)
    .translate([width / 2, height / 2])
// var path = d3.geoPath().projection(d3.geoMercator());
console.log("Dasdasdas");
d3.json("us-states.json").then((world) => {

    // console.log(topojson.feature(us, us.objects.states).features);
    var map_data = topojson.feature(world, world.objects.states).features;


    console.log(map_data);
    // var map2_data = topojson.feature(us, us.objects.states).features;
    // console.log(map2_data);

    // svg.append("g")
    //   .attr("class", "states")
    // .selectAll("path")
    // .data(topojson.feature(us, us.objects.states).features)
    // .enter().append("path")
    //   .attr("d", path);

    svg8.append("g")
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
    // .style("stroke", "#FFFFFF");

    // svg8.append("path")
    //     .datum(topojson.mesh(us, us.objects.states, function (a, b) { return a !== b; }))
    //     .attr("class", "states")
    //     .attr("d", path);

    // // .attr("transform", (-1000, 0));/
    // // .attr("left", -400);

    // svg4.append("circle")
    //     .attr("cx", 60)
    //     .attr("cy", 330)
    //     .attr("r", 6)
    //     .style("fill", "#fc8d62")

    // svg4
    //     .append("circle")
    //     .attr("cx", 60)
    //     .attr("cy", 360)
    //     .attr("r", 6)
    //     .style("fill", "#a6d854")

    // svg4.append("text")
    //     .attr("x", 80)
    //     .attr("y", 330)
    //     .text("Regions where Action is the most popular genre(NA, EU and Other)")
    //     .style("font-size", "15px")
    //     .attr("alignment-baseline", "middle")

    // svg4.append("text")
    //     .attr("x", 80)
    //     .attr("y", 360)
    //     .text("Regions where RPG is the most popular genre(Only JP)")
    //     .style("font-size", "15px")
    //     .attr("alignment-baseline", "middle")
});