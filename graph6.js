
console.log(margin.left);
var svg6 = d3.select("#graph6")
    .append("svg")
    .attr("width", 1400)
    .attr("height", 500 * 2)
    // .attr("left", 500)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

var x6 = d3.scaleBand()
    .range([0, 1000])
    // .attr("transform", "translate(0,500)")
    .padding(0.5);

var x6_axis = d3.axisBottom()
    .scale(x6);

// # https://colourco.de
let color6 = d3.scaleOrdinal()
    .range(d3.quantize(d3.interpolateHcl("#ded79b", "#9AA6DD"), 51));

var y6 = d3.scaleLinear()
    .range([500, 0])

let y6_desc = svg6.append("text");
let title6 = svg6.append("text");
let x6_desc = svg6.append("text");
let y6_labels = svg6.append("g");

let tooltip6 = d3.select("body")
    .append("div")
    .attr("class", "tooltip3")
    .style("opacity", 0);

let x6_axis_g = svg6.append("g");

let mouseover6 = function (d) {
    let color_span = `<span style="color: ${darkenColor(color6(d.State_Code), 1.1)}; font-size: 18px; font-weight:bold;">`;
    let html = `${d.State_Code}<br/>
            Turnout Rate:<br/>
            ${color_span}${d.Turnout_Rate}%</span>`;
    // console.log(color6(d.State_Code));
    // console.log(parseFloat(d.Turnout_Rate));
    // console.log(color6(d.State_Code));
    // Show the tooltip and set the position relative to the event X and Y location
    tooltip6.html(html)
        .style("left", `${(d3.event.pageX) + 50}px`)
        .style("top", `${(d3.event.pageY) - 100}px`)
        .style("box-shadow", `5px 5px 7px ${color6(d.State_Code)}`)
        .style("background-color", "#ffffff")
        .transition()
        .duration(400)
        .style("opacity", 0.9)

    svg6.select(`#rect-${d.State_Code}`).attr("fill", function (d) {
        return darkenColor(color6(d.State_Code), 0.5);
    });
}

let mouseout6 = function (d) {
    // Set opacity back to 0 to hide
    tooltip6.transition()
        .duration(500)
        .style("opacity", 0);
    svg6.select(`#rect-${d.State_Code}`).attr("fill", function (d) {
        return color6(d.State_Code);
    });
};

d3.csv("./data/full_dataset.csv").then(function (data) {
    svg6.selectAll("rect").remove();

    x6.domain(data.map(function (d) { return d.State_Code }));
    y6.domain([50, d3.max(data, function (d) { return parseFloat(d.Turnout_Rate) })]);

    // Add y-axis description
    y6_desc.attr("transform", `translate(-60, ${(height - margin.top - margin.bottom) / 2 + 80})rotate(-90)`)       // HINT: Place this at the center left edge of the graph - use translate(x, y) that we discussed earlier
        .style("text-anchor", "middle")
        .style("font-size", 18)
        .text("Voter Turnout in Each State");

    // Add chart title
    title6.attr("transform", `translate(500, -25)`)      // HINT: Place this at the top middle edge of the graph - use translate(x, y) that we discussed earlier
        .style("text-anchor", "middle")
        .style("font-size", 18)
        .text("Voter Turnout VS State Code");

    // Add x-axis description
    x6_desc.style("font-size", 18)
        .text("State Code").attr("transform", `translate(450, 550)`);

    // Create x-axis
    x6_axis_g
        .call(x6_axis)
        .style("text-anchor", "end")
        .attr("transform", "translate(0,500)");


    y6_labels.call(d3.axisLeft(y6).tickSizeOuter(0))
        .attr("transform", "translate(0,0)");

    var bar6 = svg6.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) { return x6(d.State_Code); })
        // return xScale(d.x0+d.x)- (d.x0==0 ? 0 : xScale(d.x0));
        .attr("y", function (d) { return y6(parseFloat(d.Turnout_Rate)); })
        .attr("width", x6.bandwidth())
        .attr("height", function (d) { return y6(0) - y6(parseFloat(d.Turnout_Rate) - 50); })
        .attr("fill", function (d) { return color6(d.State_Code); })
        .on("mouseover", mouseover6)
        .on("mouseout", mouseout6)
        .attr("id", function (d) { return `rect-${d.State_Code}` });


    // svg6.append("g").call(x6_axis).attr("transform", "translate(0,500");

    bar6.exit().remove();
    y6_desc.exit().remove();
    title6.exit().remove();
    x6_axis_g.exit().remove();
});






