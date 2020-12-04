const bodyParser = require("body-parser");
const express = require("express");
var routes = require("./routes.js");
const cors = require("cors");

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// for COVID19_world_map
app.get("/covid19_world_map", routes.covid19_world_map);

app.get("/covid19_world_map/:date", routes.getSpecificDate);

app.get("/compare", routes.getCountryList)

app.get("/compare/:country1/:country2", routes.getCompareCountries);
/* ---- Q1b (Dashboard) ---- */
app.get("/genres/:genre", routes.getTopInGenre); // Hint: Replace () => {} with the appropriate route handler.

/* ---- Q2 (Recommendations) ---- */
app.get("/recommendations/:recommendationMovieTitle", routes.getRecs);
/* ---- (Best Genre) ---- */
app.get("/decades", routes.getDecades);

/* ---- Q3b (Best Genre) ---- */
app.get("/decades/:decade", routes.bestGenresPerDecade);

/* ---- Q4 (Bonus part) ---- */
app.get("/posters", routes.getRandomMovies);

app.listen(8081, () => {
  console.log(`Server listening on PORT 8081`);
});
