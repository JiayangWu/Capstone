var svg8 = d3.select("#graph8")
    .append("svg")
    .attr("width", 1400)
    .attr("height", 500 * 2)
    .append("g");
// .attr("tr")

var path = d3.geoAlbersUsa();

let tooltip8 = d3.select("body")
    .append("div")
    .attr("class", "tooltip3")
    .style("opacity", 0);



d3.csv("./data/chi2.csv").then(function (data) {

    var state2Winners = {};
    data.forEach(element => {
        // console.log({"Tweets_winner": element.Tweets_Winner, "Real_winner": element.Election_Winner });
        state2Winners[element.State_Name] = { "Tweets_winner": element.Tweets_Winner, "Real_winner": element.Election_Winner };
    });

    d3.json("../us-states.json").then((us) => {
        console.log(state2Winners);
        let mouseover8 = function (d) {
            let state_name = d.properties.name;
            let html = `${state_name}`;
            tooltip8.html(html)
                .style("left", `${(d3.event.pageX) + 50}px`)
                .style("top", `${(d3.event.pageY) - 100}px`)
                .style("box-shadow", `5px 5px 7px ${color_map(d)}`)
                .style("background-color", "#ffffff")
                .transition()
                .duration(400)
                .style("opacity", 0.9)

            // svg8.select(`#rect-${d.id}`).attr("fill", function (d) {
            //     return darkenColor(color_map(d), 0.5);
            // });
        }

        let mouseout8 = function (d) {
            tooltip8.transition()
                .duration(500)
                .style("opacity", 0);
            svg8.select(`#rect-${d.id}`).attr("fill", function (d) {
                return color_map(d);
            });
        }

        let color_map = function (d) {

            var t_bb = textures.lines() // Tweets: Biden, election: Biden
                .orientation("diagonal")
                .size(40)
                .strokeWidth(26)
                .stroke("#2b4a93")
                .background("white");

            // Tweets: Trump, election: Biden
            var t_tb = textures.circles()
                .heavier()
                // .stroke("#FFFFFF")
                // .fill("#FFFFFF")
                .background("#2b4a93");

            // Tweets: Biden, election: Trump
            var t_bt = textures.lines()
                .orientation("diagonal")
                .size(40)
                .strokeWidth(26)
                .stroke("#C13739")
                .background("white");

            // Tweets: Trump, election: Trump
            var t_tt = textures.circles()
                .heavier()
                .background("#C13739");

            svg8.call(t_bb);
            svg8.call(t_tb);
            svg8.call(t_tt);
            svg8.call(t_bt);
            if (d.id < "60") {
                let state_name = d.properties.name;
                // console.log(state_name, state2Winners[state_name]["Real_winner"], state2Winners[state_name]["Tweets_Winner"]);
                if (state2Winners[state_name]["Real_winner"] == "Biden" &&
                    state2Winners[state_name]["Tweets_winner"] == "Biden") {
                    // console.log(state_name, t_bb.url);
                    return t_bb.url(); // blue
                }
                else if (state2Winners[state_name]["Real_winner"] == "Biden" &&
                    state2Winners[state_name]["Tweets_winner"] == "Trump") {
                    return t_tb.url();
                }
                else if (state2Winners[state_name]["Real_winner"] == "Trump" &&
                    state2Winners[state_name]["Tweets_winner"] == "Biden") {
                    return t_bt.url();
                }
                else {
                    return t_tt.url(); // red
                }
            }

        }
        // console.log(topojson.feature(us, us.objects.states).features);






        var map_data = topojson.feature(us, us.objects.states).features;




        svg8.append("g")
            .selectAll("path")
            .data(map_data)
            .enter().append("path")
            .attr("fill", color_map)
            .on("mouseover", mouseover8)
            .on("mouseout", mouseout8)
            .attr("d", d3.geoPath()
                .projection(path)
            )
            .attr("id", function (d) { return `rect-${d.id}` })
            .style("stroke", "#FFFFFF")
            .attr("transform", "translate(100, 20)");

        svg8.append("circle")
            .attr("cx", 360)
            .attr("cy", 548)
            .attr("r", 6)
            .style("fill", "#2b4a93")

        svg8
            .append("circle")
            .attr("cx", 360)
            .attr("cy", 578)
            .attr("r", 6)
            .style("fill", "#C13739")

        svg8.append("text")
            .attr("x", 390)
            .attr("y", 550)
            .text("States where Biden is the election winner")
            .style("font-size", "15px")
            .attr("alignment-baseline", "middle")

        svg8.append("text")
            .attr("x", 390)
            .attr("y", 580)
            .text("States where Trump is the election winner")
            .style("font-size", "15px")
            .attr("alignment-baseline", "middle")
    });
});

