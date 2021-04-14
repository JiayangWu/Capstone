

var svg3 = d3.select("#graph5")
    .append("svg")
    .attr("width", 1400)
    .attr("height", 500 * 2)
    // .attr("left", 500)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
let countRef3 = svg3.append("g");


var x3 = d3.scaleBand()
    .range([0, 1100])
    // .attr("transform", "translate(0,500)")
    .padding(0.5);

var x_axis = d3.axisBottom()
    .scale(x3);

// # https://colourco.de
let color3 = d3.scaleOrdinal()
    .range(d3.quantize(d3.interpolateHcl("#9AA6DD", "#ded79b"), 50));

let y_labels = svg3.append("g");

var y3 = d3.scaleLinear()
    .range([500, 0])

// svg3.append("text")
//     .attr("transform", `translate(${(width - margin.left - margin.right) / 2},
// ${(height - margin.top - margin.bottom) + 60})`)       // HINT: Place this at the bottom middle edge of the graph - use translate(x, y) that we discussed earlier
//     .style("text-anchor", "middle")
//     .style("font-size", 18)
//     .text("Publisher");

let y3_desc = svg3.append("text");
let x3_desc = svg3.append("text");

let tooltip3 = d3.select("body")
    .append("div")
    .attr("class", "tooltip3")
    .style("opacity", 0);

let x3_publishers = svg3.append("g");

let mouseover3 = function (d) {
    let color_span = `<span style="color: ${color3(parseInt(d.Tweets_Cnt))}; font-size: 18px; font-weight:bold;">`;
    let html = `${d.State_Code}<br/>
                Tweets Count:<br/>
                ${color_span}${d.Tweets_Cnt}</span>`;

    // Show the tooltip and set the position relative to the event X and Y location
    tooltip3.html(html)
        .style("left", `${(d3.event.pageX) + 30}px`)
        .style("top", `${(d3.event.pageY) - 100}px`)
        .style("box-shadow", `3px 3px 7px ${color3(parseInt(d.Tweets_Cnt))}`)
        .style("background-color", "#ffffff")
        .transition()
        .duration(400)
        .style("opacity", 0.9)

    svg3.select(`#rect-${d.State_Code}`).attr("fill", function (d) {
        return darkenColor(color3(parseInt(d.Tweets_Cnt)), 0.5);
    });
}

let mouseout3 = function (d) {
    // Set opacity back to 0 to hide
    tooltip3.transition()
        .duration(300)
        .style("opacity", 0);
    svg3.select(`#rect-${d.State_Code}`).attr("fill", function (d) {
        return color3(parseInt(d.Tweets_Cnt));
    });
};

d3.csv("./data/full_dataset.csv").then(function (data3) {
    svg3.selectAll("rect").remove();
    // svg3.selectAll("text").remove();
    // x.domain([0, data3[0].Global_Sales])
    x3.domain(data3.map(function (d) { return d.State_Code }));
    y3.domain([0, d3.max(data3, function (d) { return parseInt(d.Tweets_Cnt) })]);

    // y-label
    y3_desc.attr("transform", `translate(-50, ${(height - margin.top - margin.bottom) / 2 + 80})rotate(-90)`)       // HINT: Place this at the center left edge of the graph - use translate(x, y) that we discussed earlier
        .style("text-anchor", "middle")
        .style("font-size", 18)
        .text("Tweets Counts in Each State");

    // Add chart title
    // x3_desc.attr("transform", `translate(${(width - margin.left - margin.right) / 2}, ${-25})`)      // HINT: Place this at the top middle edge of the graph - use translate(x, y) that we discussed earlier
    //     .style("text-anchor", "middle")
    //     .style("font-size", 18)
    //     .text("Tweets Count VS State Code");

    // x-label
    x3_publishers
        // .attr("transform", "translate(0, 30)")
        .call(x_axis)
        // .selectAll("text")
        // 
        .style("text-anchor", "end").attr("transform", "translate(0,500)");


    y_labels.call(d3.axisLeft(y3).tickSizeOuter(0))
        .attr("transform", "translate(0,0)");

    var bar3 = svg3.selectAll("rect")
        .data(data3)
        .enter()
        .append("rect")
        .attr("x", function (d) { return x3(d.State_Code); })
        // return xScale(d.x0+d.x)- (d.x0==0 ? 0 : xScale(d.x0));
        .attr("y", function (d) { return y3(parseInt(d.Tweets_Cnt)); })
        .attr("width", x3.bandwidth())
        .attr("height", function (d) { return y3(0) - y3(parseInt(d.Tweets_Cnt)); })
        .attr("fill", function (d) { return color3(parseInt(d.Tweets_Cnt)); })
        .on("mouseover", mouseover3)
        .on("mouseout", mouseout3)
        .attr("id", function (d) { return `rect-${d.State_Code}` });


    // svg3.append("g").call(x3_publishers).attr("transform", "translate(0,500");

    bar3.exit().remove();
    y3_desc.exit().remove();
    x3_desc.exit().remove();
    x3_publishers.exit().remove();
});






