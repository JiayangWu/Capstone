

var svg3 = d3.select("#graph3")
    .append("svg")
    .attr("width", graph_1_width)
    .attr("height", 500)
    .attr("left", 500)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
let countRef3 = svg3.append("g");

const all_genres = ['Sports', 'Misc', 'Racing', 'Strategy', 'Platform', 'Action', 'Shooter', 'RolePlaying', 'Puzzle', 'Adventure', 'Simulation', 'Fighting']

d3.select("#selectButton3")
    .selectAll('myOptions')
    .data(all_genres)
    .enter()
    .append('option')
    .text(function (d) { return d; })
    .attr("value", function (d) { return d; })

// ['Sports', 'Misc', 'Racing', 'Strategy', 'Platform', 'Action', 'Shooter', 
// 'RolePlaying', 'Puzzle', 'Adventure', 'Simulation', 'Fighting']
function type(d) {
    // used for importing json data
    d.Sports = Number(d.Sports);
    d.Misc = Number(d.Misc);
    d.Racing = Number(d.Racing);
    d.Strategy = Number(d.Strategy);
    d.Platform = Number(d.Platform);
    d.RolePlaying = Number(d.RolePlaying);
    d.Action = Number(d.Action);
    d.Shooter = Number(d.Shooter);
    d.Puzzle = Number(d.Puzzle);
    d.Adventure = Number(d.Adventure);
    d.Simulation = Number(d.Simulation);
    d.Fighting = Number(d.Fighting);
    return d;
}

var x3 = d3.scaleBand()
    .range([0, width - `${margin.left}` - `${margin.right}`])
    .padding(0.2);

let color3 = d3.scaleOrdinal()
    .range(d3.quantize(d3.interpolateHcl("#66a0e2", "#81c2c3"), 5));

let y_labels = svg3.append("g");

var label_line = d3.line()
    .x(function (d) { return x(d.publisher); })
    .y(function (d) { return y(d.sales); });

var y3 = d3.scaleLinear()
    .range([height - `${margin.top}` - `${margin.bottom}`, 0])

svg3.append("text")
    .attr("transform", `translate(${(width - margin.left - margin.right) / 2},
${(height - margin.top - margin.bottom) + 60})`)       // HINT: Place this at the bottom middle edge of the graph - use translate(x, y) that we discussed earlier
    .style("text-anchor", "middle")
    .style("font-size", 18)
    .text("Publisher");

let y3_desc = svg3.append("text");
let x3_desc = svg3.append("text");

let x3_publishers = svg3.append("g");
function update3(genre) {

    d3.json("genre.json", type).then(data3 => {
        data3 = data3[genre];
        // console.log(data3);

        svg3.selectAll("rect").remove();
        // svg3.selectAll("text").remove();
        // x.domain([0, data3[0].Global_Sales])
        x3.domain(data3.map(function (d) { return d.publisher }));
        y3.domain([0, d3.max(data3, function (d) { return d.sales })]);

        // Add x-axis label

        // Add y-axis label

        y3_desc.attr("transform", `translate(-40, ${(height - margin.top - margin.bottom) / 2})rotate(-90)`)       // HINT: Place this at the center left edge of the graph - use translate(x, y) that we discussed earlier
            .style("text-anchor", "middle")
            .style("font-size", 18)

            .text(genre + " Games Sales(in Millions)");

        // Add chart title

        x3_desc.attr("transform", `translate(${(width - margin.left - margin.right) / 2}, ${-25})`)      // HINT: Place this at the top middle edge of the graph - use translate(x, y) that we discussed earlier
            .style("text-anchor", "middle")
            .style("font-size", 18)
            .text("Top 5 Best Publishers of " + genre + " Games(1980-2020)");

        // x-label
        x3_publishers
            .attr("transform", "translate(0, 232)")
            .call(d3.axisBottom(x3))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-30)")
            .style("text-anchor", "end");


        y_labels.call(d3.axisLeft(y3).tickSizeOuter(0))
            .attr("transform", "translate(0,-18)");

        var bar3 = svg3.selectAll("rect")
            .data(data3)
            .enter()
            .append("rect")
            .attr("x", function (d) { return x3(d.publisher); })
            .attr("y", function (d) { return y3(d.sales); })
            .attr("width", x3.bandwidth())
            .attr("height", function (d) { return 232 - y3(d.sales); })
            .attr("fill", "#66a0e2");

        bar3.exit().remove();
        y3_desc.exit().remove();
        x3_desc.exit().remove();
        x3_publishers.exit().remove();
    });
}

update3("Sports");
d3.select("#selectButton3").on("change", function (d) {
    // get new value from the select button
    const genre_value = d3.select(this).property("value");
    console.log(genre_value);
    update3(genre_value);
})





