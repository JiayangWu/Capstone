var svg8 = d3.select("#graph8")
    .append("svg")
    .attr("width", 1400)
    .attr("height", 500 * 2)
    .append("g");
// .attr("tr")

var path = d3.geoAlbersUsa();

let tooltip8 = d3.select("body")
    .append("div")
    .attr("class", "tooltip9")
    .style("opacity", 0);

d3.csv("./data/chi2.csv").then(function (data) {
    var state2Winners = {};
    data.forEach(element => {
        state2Winners[element.State_Name] = { "Tweets_winner": element.Tweets_Winner, "Real_winner": element.Election_Winner };
    });

    d3.json("../us-states.json").then((us) => {
        let mouseover8 = function (d) {
            let state_name = d.properties.name;
            let html = `${state_name}`;
            tooltip8.html(html)
                .style("left", `${(d3.event.pageX) + 50}px`)
                .style("top", `${(d3.event.pageY) - 100}px`)
                .style("box-shadow", `2px 2px 2px #A8ACC7`)
                .style("background-color", "#ffffff")
                .transition()
                .duration(400)
                .style("opacity", 0.9)

            svg8.select(`#rect-${d.id}`).attr("fill", function (d) {
                return color_map(d, true);
            });
        }

        let mouseout8 = function (d) {
            tooltip8.transition()
                .duration(500)
                .style("opacity", 0);
            svg8.select(`#rect-${d.id}`).attr("fill", function (d) {
                return color_map(d, false);
            });
        }

        let color_map = function (d, darken) {
            // Tweets: Biden, election: Biden
            var t_bb = textures.circles()
                .heavier()
                .fill("white")
                .background("#2b4a93");

            // Tweets: Trump, election: Biden
            var t_tb = textures.lines()
                .orientation("diagonal")
                .size(40)
                .strokeWidth(26)
                .stroke("#2b4a93")
                .background("#FFFFFF");

            // Tweets: Biden, election: Trump
            var t_bt = textures.circles()
                .heavier()
                .fill("white")
                .background("#C13739");

            // Tweets: Trump, election: Trump
            var t_tt = textures.lines()
                .orientation("diagonal")
                .size(40)
                .strokeWidth(26)
                .stroke("#C13739")
                .background("#FFFFFF");

            if (d.id < "60") { // only deal with 50 states + dc
                let state_name = d.properties.name;
                if (state2Winners[state_name]["Real_winner"] == "Biden" &&
                    state2Winners[state_name]["Tweets_winner"] == "Biden") {

                    if (darken) {
                        t_bb = t_bb.background(darkenColor("#2b4a93", 0.8));
                    }
                    svg8.call(t_bb);
                    return t_bb.url(); // blue
                }
                else if (state2Winners[state_name]["Real_winner"] == "Biden" &&
                    state2Winners[state_name]["Tweets_winner"] == "Trump") {
                    if (darken) {
                        t_tb.stroke(darkenColor("#2b4a93", 0.8));
                    }
                    svg8.call(t_tb);
                    return t_tb.url();
                }
                else if (state2Winners[state_name]["Real_winner"] == "Trump" &&
                    state2Winners[state_name]["Tweets_winner"] == "Biden") {
                    if (darken) {
                        t_bt = t_bt.background(darkenColor("#C13739", 0.8));
                    }
                    svg8.call(t_bt);
                    return t_bt.url();
                }
                else {
                    if (darken) {
                        t_tt = t_tt.stroke(darkenColor("#C13739", 0.8));
                    }
                    svg8.call(t_tt);
                    return t_tt.url();
                }
            }

        }
        var map_data = topojson.feature(us, us.objects.states).features;
        svg8.append("g")
            .selectAll("path")
            .data(map_data)
            .enter().append("path")
            .attr("fill", function (d) { return color_map(d, false); })
            .on("mouseover", mouseover8)
            .on("mouseout", mouseout8)
            .attr("d", d3.geoPath()
                .projection(path)
            )
            .attr("id", function (d) { return `rect-${d.id}` })
            .style("stroke", "#FFFFFF")
            .attr("transform", "translate(100, 20)");

        // color legends below
        svg8.append("rect")
            .attr("width", 15)
            .attr("height", 15)
            .attr("transform", "translate(260, 542)")
            .style("fill", "#2b4a93")

        svg8.append("rect")
            .attr("width", 15)
            .attr("height", 15)
            .attr("transform", "translate(260, 572)")
            .style("fill", "#C13739")

        svg8.append("text")
            .attr("x", 290)
            .attr("y", 550)
            .text("States where Biden is the election winner")
            .style("font-size", "15px")
            .attr("alignment-baseline", "middle")

        svg8.append("text")
            .attr("x", 290)
            .attr("y", 580)
            .text("States where Trump is the election winner")
            .style("font-size", "15px")
            .attr("alignment-baseline", "middle")

        // pattern legend below
        var t_tweet_trump =
            textures.lines()
                .orientation("diagonal")
                .size(40)
                .strokeWidth(26)
                .stroke("#000000")
                .background("#FFFFFF");

        var t_tweet_biden = textures.circles()
            .heavier()
            .fill("white")
            .background("#000000");

        svg8.call(t_tweet_trump);
        svg8.call(t_tweet_biden);

        svg8.append("rect").attr("width", 15)
            .attr("height", 15)
            .attr("transform", "translate(600, 572)")
            .style("fill", t_tweet_trump.url());

        svg8.append("rect").attr("width", 15)
            .attr("height", 15)
            .attr("transform", "translate(600, 542)")
            .style("fill", t_tweet_biden.url());

        svg8.append("text")
            .attr("x", 630)
            .attr("y", 550)
            .text("States where Biden is the Tweets winner")
            .style("font-size", "15px")
            .attr("alignment-baseline", "middle")

        svg8.append("text")
            .attr("x", 630)
            .attr("y", 580)
            .text("States where Trump is the Tweets winner")
            .style("font-size", "15px")
            .attr("alignment-baseline", "middle")
    });
});

