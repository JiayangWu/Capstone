# Code README
Our web application can be accessed by [this link](https://capstoneee.herokuapp.com/index.html).

### Design Decisions ###
We built the website by [D3.JS](https://d3js.or), [Bootstrap](https://getbootstrap.com), [TopoJson](https://github.com/topojson/topojson) and [Textures.JS](https://riccardoscalco.it/textures/). 

Then we deployed our code on [Heroku](http://heroku.com). 



### Instructions ###
To run the code locally, you can run `python3 -m http.server 8000` in the same dir with the `index.html`.

#### Repo Structures ####

we designed five web pages to demonstrate our project.

- `index.html`: the home page.
- `about.html`: the background page.
- `single.html`: Pearson Correlation.
- `multi.html`: Multiple regression.
- `ch2.html`: Chi-Squared test.


To present our visualization, we have several .JS files.

- `main.js`
- `map.js`
- `scatter.js`
- `bar-turnout.js`
- `bar-tweets_cnt.js`


Other files include:
- `data`: this dir stores our dataset.
- `index.php`: this file is used for deployment on heroku.
- `us-states.json`: for creating US map.
- `icon.png`: this is the icon for our website.
- `css`: for bootstrap.
- `main.css`: for css.
