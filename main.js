// Add your JavaScript code here
const MAX_WIDTH = Math.max(1080, window.innerWidth);
const MAX_HEIGHT = 720;
const margin = { top: 40, right: 100, bottom: 40, left: 175 };

// Assumes the same graph width, height dimensions as the example dashboard. Feel free to change these if you'd like
let graph_1_width = (MAX_WIDTH / 2) - 10, graph_1_height = 250;
let graph_2_width = (MAX_WIDTH / 2) - 10, graph_2_height = 275;
let graph_3_width = MAX_WIDTH / 2, graph_3_height = 575;

console.log("hello");

// Graph1
var svg = d3.select("#graph1")
    .append("svg")
    .attr("width", graph_1_width)
    .attr("height", 320)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

const all_years = ['1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'];

d3.select("#selectButton1")
    .selectAll('myOptions')
    .data(all_years)
    .enter()
    .append('option')
    .text(function (d) { return d; }) // text showed in the menu
    .attr("value", function (d) { return parseInt(d); }) // corresponding value returned by the button

d3.select("#selectButton2")
    .selectAll('myOptions')
    .data(all_years)
    .enter()
    .append('option')
    .text(function (d) { return d; }) // text showed in the menu
    .attr("value", function (d) { return parseInt(d); }) // corresponding value returned by the button

// var data = d3.csv("./data/video_games.csv");
function update(year1, year2) {

    function checkYear(year) {
        // Keep valid data
        return year >= year1 && year <= year2;
    }

    d3.csv("./data/video_games.csv").then(function (data) {
        var dataFilter = data.filter(function (d) {
            return checkYear(parseInt(d.Year));
        })
        var topKdata = dataFilter.slice(0, 10);

        console.log(year1, year2);
        console.log(topKdata);
    });

    // console.log("dasdasdsa", data.length);
    // for (let i = 0; i < data.length; i++) {
    //     console.log(data[i].Year, year1, year2);
    //     if (checkYear(parseInt(data[i].Year))) {

    //         dataFilter.push(data[i]);
    //     }
    // }


}

var g1_s1_year_value = 1980;
var g1_s2_year_value = 1980;
d3.select("#selectButton1").on("change", function (d) {
    // get new value from the select button
    g1_s1_year_value = d3.select(this).property("value");
    // run the updateChart function with this selected option
    update(g1_s1_year_value, g1_s2_year_value);
})

d3.select("#selectButton2").on("change", function (d) {
    // get new value from the select button
    g1_s2_year_value = d3.select(this).property("value");
    // run the updateChart function with this selected option
    update(g1_s1_year_value, g1_s2_year_value);
})


// read data from .csv file

