// Add your JavaScript code here
const MAX_WIDTH = Math.max(1080, window.innerWidth);
const MAX_HEIGHT = 720;
const margin = { top: 40, right: 100, bottom: 40, left: 175 };

const width = 540;
const height = 330;

// Assumes the same graph width, height dimensions as the example dashboard. Feel free to change these if you'd like
let graph_1_width = (MAX_WIDTH / 2) - 10, graph_1_height = 250;
let graph_2_width = (MAX_WIDTH / 2) - 10, graph_2_height = 275;
let graph_3_width = MAX_WIDTH / 2, graph_3_height = 575;

console.log("hello");

// Graph1
var svg1 = d3.select("#graph1")
    .append("svg")
    .attr("width", graph_1_width)
    .attr("height", 320)
    .attr("left", 500)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

let countRef = svg1.append("g");

// all valid years
const all_years = ['1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016'];

// button for year1
d3.select("#selectButton1")
    .selectAll('myOptions')
    .data(all_years)
    .enter()
    .append('option')
    .text(function (d) { return d; }) // text showed in the menu
    .attr("value", function (d) { return parseInt(d); }) // corresponding value returned by the button

// button for year2
d3.select("#selectButton2")
    .selectAll('myOptions')
    .data(all_years)
    .enter()
    .append('option')
    .text(function (d) { return d; }) // text showed in the menu
    .attr("value", function (d) { return parseInt(d); }) // corresponding value returned by the button

let x = d3.scaleLinear()
    .range([0, width - `${margin.left}` - `${margin.right}`]);

let y = d3.scaleBand()
    .range([0, height - `${margin.top}` - `${margin.bottom}`])
    .padding(0.1);  // Improves readability

let y_axis_label = svg1.append("g").attr("id", "y1_label");

let color = d3.scaleOrdinal()
    .range(d3.quantize(d3.interpolateHcl("#66a0e2", "#81c2c3"), 10));

svg1.append("text")
    .attr("transform", `translate(${(width - margin.left - margin.right) / 2},
${(height - margin.top - margin.bottom) + 25})`)       // HINT: Place this at the bottom middle edge of the graph - use translate(x, y) that we discussed earlier
    .style("text-anchor", "middle")
    .style("font-size", 18)
    .text("Global Sells Counts(In Millions)");

// TODO: Add y-axis label
svg1.append("text")
    .attr("transform", `translate(-150, ${(height - margin.top - margin.bottom) / 2})`)       // HINT: Place this at the center left edge of the graph - use translate(x, y) that we discussed earlier
    .style("text-anchor", "middle")
    .style("font-size", 18)
    .text("Game");

let chart1_title = svg1.append("text");
function update(year1, year2) {
    // svg1.selectAll("rect").remove();
    // svg1.selectAll("text").remove();

    /* properly set the title in the chart of Q1,
       if only 1 year, return "in 20xx",
       otherwise, return "from 19xx to 20xx"
    */
    var chart1_title_string;
    if (year1 == year2) {
        chart1_title_string = " in " + year1;
    }
    else {
        chart1_title_string = " from " + year1 + " to " + year2;
    }
    
    // TODO: Add chart title
    chart1_title
        .attr("transform", `translate(${(width - margin.left - margin.right) / 2}, ${-10})`)      // HINT: Place this at the top middle edge of the graph - use translate(x, y) that we discussed earlier
        .style("text-anchor", "middle")
        .style("font-size", 18)
        .text("Top 10 Best Game Sellers" + chart1_title_string);

    function checkYear(year) {
        // Keep valid data
        return year >= year1 && year <= year2;
    }

    d3.csv("./data/video_games.csv").then(function (data) {
        var dataFilter = data.filter(function (d) {
            return checkYear(parseFloat(d.Year));
        })
        data = dataFilter.slice(0, 10);

        console.log(year1, year2);
        console.log(data);
        let counts = countRef.selectAll("text").data(data);

        x.domain([0, data[0].Global_Sales])

        y.domain(data.map(function (d) { return d.Name }))

        y_axis_label.call(d3.axisLeft(y).tickSize(0).tickPadding(10));

        let bars = svg1.selectAll("rect").data(data);

        color.domain(data.map(function (d) { return d.Name }))

        bars.enter()
            .append("rect")
            .on("mouseover", mouseover_barplot)
            .on("mouseout", mouseout_barplot)
            .merge(bars)
            .attr("fill", function (d) { return color(d.Name) }) // Here, we are using functin(d) { ... } to return fill colors based on the data point d
            .attr("x", x(0))
            .attr("y", function (d) { return y(d.Name) })               // HINT: Use function(d) { return ...; } to apply styles based on the data point (d)
            .attr("width", function (d) { return x(d.Global_Sales) })
            .attr("height", y.bandwidth())
            .attr("id", function (d) { return `rect-${d.Rank}` });

        counts.enter()
            .append("text")
            .merge(counts)
            .attr("x", function (d) { return x(d.Global_Sales) + 10 })       // HINT: Add a small offset to the right edge of the bar, found by x(d.count)
            .attr("y", function (d) { return y(d.Name) + 18 })       // HINT: Add a small offset to the top edge of the bar, found by y(d.artist)
            .style("text-anchor", "start")
            .text(function (d) { return d.Global_Sales });           // HINT: Get the count of the artist

        bars.exit().remove();
        counts.exit().remove();
    });
}

var g1_s1_year_value = 1980;
var g1_s2_year_value = 1980;

update(1980, 1980);

d3.select("#selectButton1").on("change", function (d) {
    // get new value from the select button
    g1_s1_year_value = d3.select(this).property("value");
    // run the updateChart function with this selected option
    if (g1_s1_year_value > g1_s2_year_value) {
        window.alert("Please select valid time range!");
    }
    update(g1_s1_year_value, g1_s2_year_value);
})

d3.select("#selectButton2").on("change", function (d) {
    // get new value from the select button
    g1_s2_year_value = d3.select(this).property("value");
    // run the updateChart function with this selected option
    if (g1_s1_year_value > g1_s2_year_value) {
        window.alert("Please select valid time range!");
    }
    update(g1_s1_year_value, g1_s2_year_value);
})
/**
 * Returns a darker shade of a given color
 */
function darkenColor(color, percentage) {
    return d3.hsl(color).darker(percentage);
}

let mouseover_barplot = function (d) {
    // console.log("mouseover!");
    // console.log(d);
    // console.log(color(d.Global_Sales));
    svg1.select(`#rect-${d.Rank}`).attr("fill", function (d) {
        return darkenColor(color(d.Name), 0.5);
    });
};

// Restore bar fill to original color on mouseout
let mouseout_barplot = function (d) {
    svg1.select(`#rect-${d.Rank}`).attr("fill", function (d) {
        return color(d.Name)
    });
};



