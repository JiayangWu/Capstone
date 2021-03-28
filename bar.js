

var svg3 = d3.select("#graph3")
    .append("svg")
    .attr("width", graph_1_width)
    .attr("height", 320)
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
    .text(function (d) { return d; }) // text showed in the menu
    .attr("value", function (d) { return parseInt(d); }) // corresponding value returned by the button

svg3.append("text")
    .attr("transform", `translate(${(width - margin.left - margin.right) / 2},
${(height - margin.top - margin.bottom) + 15})`)       // HINT: Place this at the bottom middle edge of the graph - use translate(x, y) that we discussed earlier
    .style("text-anchor", "middle")
    .text("Publisher");

// TODO: Add y-axis label
svg3.append("text")
    .attr("transform", `translate(-150, ${(height - margin.top - margin.bottom) / 2})`)       // HINT: Place this at the center left edge of the graph - use translate(x, y) that we discussed earlier
    .style("text-anchor", "middle")
    .text("Genre Sales");

// TODO: Add chart title
svg3.append("text")
    .attr("transform", `translate(${(width - margin.left - margin.right) / 2}, ${-10})`)      // HINT: Place this at the top middle edge of the graph - use translate(x, y) that we discussed earlier
    .style("text-anchor", "middle")
    .style("font-size", 15)
    .text("Top 5 Publisher per Genre");

// ['Sports', 'Misc', 'Racing', 'Strategy', 'Platform', 'Action', 'Shooter', 
// 'RolePlaying', 'Puzzle', 'Adventure', 'Simulation', 'Fighting']
function type(d) {
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
function update(genre) {

    d3.json("genre.json", type).then(data => {
        data = data[genre];
        console.log(data);

        // let counts = countRef3.selectAll("text").data(data);

        // x.domain([0, data[0].Global_Sales])

        // y.domain(data.map(function (d) { return d.Name }))

        // y_axis_label.call(d3.axisLeft(y).tickSize(0).tickPadding(10));

        // let bars = svg3.selectAll("rect").data(data);

        // color.domain(data.map(function (d) { return d.Name }))

        // bars.enter()
        //     .append("rect")
        //     .on("mouseover", mouseover_barplot)
        //     .on("mouseout", mouseout_barplot)
        //     .merge(bars)
        //     .attr("fill", function (d) { return color(d.Name) }) // Here, we are using functin(d) { ... } to return fill colors based on the data point d
        //     .attr("x", x(0))
        //     .attr("y", function (d) { return y(d.Name) })               // HINT: Use function(d) { return ...; } to apply styles based on the data point (d)
        //     .attr("width", function (d) { return x(d.Global_Sales) })
        //     .attr("height", y.bandwidth())
        //     .attr("id", function (d) { return `rect-${d.Rank}` });

        // counts.enter()
        //     .append("text")
        //     .merge(counts)
        //     .attr("x", function (d) { return x(d.Global_Sales) + 10 })       // HINT: Add a small offset to the right edge of the bar, found by x(d.count)
        //     .attr("y", function (d) { return y(d.Name) + 18 })       // HINT: Add a small offset to the top edge of the bar, found by y(d.artist)
        //     .style("text-anchor", "start")
        //     .text(function (d) { return d.Global_Sales });           // HINT: Get the count of the artist


    });
}

update("Action");





