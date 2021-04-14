
console.log(margin.left);
var svg7 = d3.select("#graph7")
    .append("svg")
    .attr("width", 1400)
    .attr("height", 500 * 2)
    // .attr("left", 500)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

var x7 = d3.scaleLinear()
    .range([0, 1100]);
// .attr("transform", "translate(0,500)")
// .padding(0.5);

var x7_axis = d3.axisBottom()
    .scale(x7);

// # https://colourco.de
let color7 = d3.scaleOrdinal()
    .range(d3.quantize(d3.interpolateHcl("#ded79b", "#9AA6DD"), 51));

var y7 = d3.scaleLinear()
    .range([500, 0])

let y7_desc = svg7.append("text");
let title7 = svg7.append("text");
let x7_desc = svg7.append("text");
let y7_labels = svg7.append("g");

let tooltip7 = d3.select("body")
    .append("div")
    .attr("class", "tooltip7")
    .style("opacity", 0);

let x7_axis_g = svg7.append("g");



let mouseout7 = function (d) {
    // Set opacity back to 0 to hide
    tooltip7.transition()
        .duration(500)
        .style("opacity", 0);
    svg7.select(`#rect-${d.State_Code}`).attr("fill", function (d) {
        return color7(d.State_Code);
    });
};

function filterData(data, comparator) {
    return data.sort(comparator).slice(2, 49);
}

let regression = d3.regressionLinear();

function update7(x_variable = this.value) {
    console.log(x_variable);
    let mouseover7 = function (d) {
        let color_span = `<span style="color: ${darkenColor(color7(d.State_Code), 1.1)}; font-size: 18px; font-weight:bold;">`;
        let html = `${d.State_Code}<br/>
                Turnout Rate and ` + x_variable + `:<br/>
                ${color_span}${d.Turnout_Rate}%<br/>
                ${d[x_variable]}</span>`;

        tooltip7.html(html)
            .style("left", `${(d3.event.pageX) + 50}px`)
            .style("top", `${(d3.event.pageY) - 100}px`)
            .style("box-shadow", `5px 5px 7px ${color7(d.State_Code)}`)
            .style("background-color", "#ffffff")
            .transition()
            .duration(400)
            .style("opacity", 0.9)

        svg7.select(`#rect-${d.State_Code}`).attr("fill", function (d) {
            return darkenColor(color7(d.State_Code), 0.8);
        });
    }
    console.log(x_variable);
    d3.csv("./data/full_dataset.csv").then(function (data) {
        svg7.selectAll("circle").remove();

        // console.log(data);
        data = filterData(data, function (a, b) {
            return parseInt(b[x_variable]) - parseInt(a[x_variable])
        });
        // console.log(data);

        // x7.domain(data.map(function (d) { return d.State_Code }));
        x7.domain([0, d3.max(data, function (d) { return parseFloat(d[x_variable]) })]);
        y7.domain([50, d3.max(data, function (d) { return parseFloat(d.Turnout_Rate) })]);

        // Add y-axis description
        y7_desc.attr("transform", `translate(-60, ${(height - margin.top - margin.bottom) / 2 + 80})rotate(-90)`)       // HINT: Place this at the center left edge of the graph - use translate(x, y) that we discussed earlier
            .style("text-anchor", "middle")
            .style("font-size", 18)
            .text("Turnout Rate");

        // Add chart title
        title7.attr("transform", `translate(500, -25)`)      // HINT: Place this at the top middle edge of the graph - use translate(x, y) that we discussed earlier
            .style("text-anchor", "middle")
            .style("font-size", 18)
            .text("Turnout Rate VS " + x_variable);

        // Add x-axis description
        x7_desc.style("font-size", 18)
            .text(x_variable)
            .attr("transform", `translate(500, 550)`);

        // Create x-axis
        x7_axis_g
            .call(x7_axis)
            .style("text-anchor", "end")
            .attr("transform", "translate(0,500)");


        y7_labels.call(d3.axisLeft(y7).tickSizeOuter(0))
            .attr("transform", "translate(0,0)");

        var bar7 = svg7.selectAll("circle")
            .data(data);
        bar7
            .enter()
            .append("circle")
            .on("mouseover", mouseover7)
            .on("mouseout", mouseout7)
            .transition()
            .delay(function (d, i) { return (i * 3) })
            .duration(1500)
            .attr("cx", function (d) { return x7(parseFloat(d[x_variable])); })
            .attr("cy", function (d) { return y7(parseFloat(d.Turnout_Rate)); })
            .attr("r", 8)
            // .attr("width", x7.bandwidth())
            // .attr("height", function (d) { return y7(0) - y7(parseFloat(d.Turnout_Rate)); })
            .attr("fill", function (d) { return color7(d.State_Code); })

            .attr("id", function (d) { return `rect-${d.State_Code}` });
        // regression.data(data).x(d => d.Turnout_Rate).y(d => d[x_variable]);

        bar7.exit().remove();
        y7_desc.exit().remove();
        title7.exit().remove();
        x7_axis_g.exit().remove();
    });

}

let x_variable = "Likes";
update7(x_variable)
d3.selectAll("input")
    .on("change", update7);




