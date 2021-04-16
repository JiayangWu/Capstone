

var svg5 = d3.select("#graph5")
    .append("svg")
    .attr("width", 1400)
    .attr("height", 500 * 2)
    // .attr("left", 500)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
// .attr("transform", (2, 30));
let countRef5 = svg5.append("g");


var x5 = d3.scaleBand()
    .range([0, 1000])
    // .attr("transform", "translate(0,500)")
    .padding(0.5);

var x_axis = d3.axisBottom()
    .scale(x5);

// # https://colourco.de
let color5 = d3.scaleOrdinal()
    .range(d3.quantize(d3.interpolateHcl("#9AA6DD", "#ded79b"), 51));

let y5_labels = svg5.append("g");

var y5 = d3.scaleLinear()
    .range([500, 0])

let y5_desc = svg5.append("text");
let title5 = svg5.append("text");
let x5_desc = svg5.append("text");

let tooltip5 = d3.select("body")
    .append("div")
    .attr("class", "tooltip3")
    .style("opacity", 0);

let x5_axis = svg5.append("g");

let mouseover5 = function (d) {
    let color_span = `<span style="color: ${darkenColor(color5(d.State_Code), 1.1)}; font-size: 18px; font-weight:bold;">`;
    let html = `${d.State_Code}<br/>
                Tweets Count:<br/>
                ${color_span}${d.Tweets_Cnt}</span>`;
    // console.log(color5(d.State_Code));
    // console.log(parseInt(d.Tweets_Cnt));
    // console.log(color5(d.State_Code));
    // Show the tooltip and set the position relative to the event X and Y location
    tooltip5.html(html)
        .style("left", `${(d3.event.pageX) + 50}px`)
        .style("top", `${(d3.event.pageY) - 100}px`)
        .style("box-shadow", `5px 5px 7px ${color5(d.State_Code)}`)
        .style("background-color", "#ffffff")
        .transition()
        .duration(400)
        .style("opacity", 0.9)

    svg5.select(`#rect-${d.State_Code}`).attr("fill", function (d) {
        return darkenColor(color5(d.State_Code), 0.5);
    });
}

let mouseout5 = function (d) {
    // Set opacity back to 0 to hide
    tooltip5.transition()
        .duration(500)
        .style("opacity", 0);
    svg5.select(`#rect-${d.State_Code}`).attr("fill", function (d) {
        return color5(d.State_Code);
    });
};

d3.csv("./data/full_dataset.csv").then(function (data5) {
    svg5.selectAll("rect").remove();

    x5.domain(data5.map(function (d) { return d.State_Code }));
    y5.domain([0, d3.max(data5, function (d) { return parseInt(d.Tweets_Cnt) })]);

    // Add y-axis description
    y5_desc.attr("transform", `translate(-60, ${(height - margin.top - margin.bottom) / 2 + 80})rotate(-90)`)       // HINT: Place this at the center left edge of the graph - use translate(x, y) that we discussed earlier
        .style("text-anchor", "middle")
        .style("font-size", 18)
        .text("Tweets Counts in Each State");

    // Add chart title
    title5.attr("transform", `translate(500, -25)`)      // HINT: Place this at the top middle edge of the graph - use translate(x, y) that we discussed earlier
        .style("text-anchor", "middle")
        .style("font-size", 18)
        .text("Tweets Count VS State Code");

    // Add x-axis description
    x5_desc.style("font-size", 18)
        .text("State Code").attr("transform", `translate(450, 550)`);

    // Create x-axis
    x5_axis
        .call(x_axis)
        .style("text-anchor", "end")
        .attr("transform", "translate(0,500)")
        .selectAll("text")
        .attr("transform", "translate(6, 0)");


    y5_labels.call(d3.axisLeft(y5).tickSizeOuter(0))
        .attr("transform", "translate(0,0)");

    var bar5 = svg5.selectAll("rect")
        .data(data5)
        .enter()
        .append("rect")
        .attr("x", function (d) { return x5(d.State_Code); })
        // return xScale(d.x0+d.x)- (d.x0==0 ? 0 : xScale(d.x0));
        .attr("y", function (d) { return y5(parseInt(d.Tweets_Cnt)); })
        .attr("width", x5.bandwidth())
        .attr("height", function (d) { return y5(0) - y5(parseInt(d.Tweets_Cnt)); })
        .attr("fill", function (d) { return color5(d.State_Code); })
        .on("mouseover", mouseover5)
        .on("mouseout", mouseout5)
        .attr("id", function (d) { return `rect-${d.State_Code}` });


    // svg5.append("g").call(x5_axis).attr("transform", "translate(0,500");

    bar5.exit().remove();
    y5_desc.exit().remove();
    title5.exit().remove();
    x5_axis.exit().remove();
});






