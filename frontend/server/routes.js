var config = require("./db-config.js");
var mysql = require("mysql");

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* ---- COVID19_world_map initial ---- */
function covid19_world_map(req, res) {
  var query = `select country, sum(confirmed) as confirmed, sum(death) as death, sum(recovered) as recovered from COVID where date = '2020-10-03' group by country; 
                select * from LatLng`;
  connection.query(query, [1, 2], function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows)
    }
  });    
}

/* ---- COVID19_world_map search date ---- */
function getSpecificDate(req, res) {
  var date = req.params.date
  var query = `select country, sum(confirmed) as confirmed, sum(death) as death, sum(recovered) as recovered from COVID where date = '${date}' group by country`;       
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows)
    }
  });  
}

function getCountryList (req, res) {
  var query = `select distinct country from Country`
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows)
    }
  });  
}

/* ---- compare search two countries ---- */
function getCompareCountries(req, res) {
  var country1 = req.params.country1
  var country2 = req.params.country2
  // first query is to output country1, country2 name and death, confirmed in each country
  // second query is to output country1, country2 name and med_age, life_expectancy, gdp
  // second is to output country1, country2 name, female_percent, male_percent 
  var query = `select country, date, confirmed, death from COVID where country = '${country1}';
                 select country, date, confirmed, death from COVID where country = '${country2}';
                 select country, med_age, life_expectancy, gdp from Country where country = '${country1}';
                 select country, med_age, life_expectancy, gdp from Country where country = '${country2}';
                 select country, female_percent, male_percent from Case_Gender where country = '${country1}';
                 select country, female_percent, male_percent from Case_Gender where country = '${country2}';`
  connection.query(query, [1, 2, 3, 4, 5, 6], function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows)
    }
  });   
}

/* ---- Q1b (Dashboard) ---- */
function getTopInGenre(req, res) {
  var genreName = req.params.genre;

  var query = `select m.title, m.rating, m.vote_count from Movies m where 
  m.id in (select g.movie_id from Genres g where g.genre = '${genreName}') order by m.rating desc, m.vote_count desc limit 10`;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/* ---- Q2 (Recommendations) ---- */
function getRecs(req, res) {
  var query = `with tmp1 as (select g.genre from Genres g where g.movie_id in (select m.id from Movies m where m.title = '${req.params.recommendationMovieTitle}')),
tmp3 as 
(select m.id from Movies m 
where (select count(*) from tmp1 inner join (select g.genre from Genres g where g.movie_id = m.id) as tmp2 on tmp1.genre = tmp2.genre) = (select count(*) from tmp1))
select m.title, m.id, m.rating, m.vote_count from Movies m, tmp3 t where m.id=t.id and (m.id not in (select m.id from Movies m where m.title = '${req.params.recommendationMovieTitle}')) order by rating desc, vote_count desc limit 5;`;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/* ---- (Best Genres) ---- */
function getDecades(req, res) {
  var query = `
    SELECT DISTINCT (FLOOR(year/10)*10) AS decade
    FROM (
      SELECT DISTINCT release_year as year
      FROM Movies
      ORDER BY release_year
    ) y
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/* ---- Q3 (Best Genres) ---- */
function bestGenresPerDecade(req, res) {
  var startYear = req.params.decade;
  var endYear = startYear.substr(0, 3) + 9;
  var query = `with tmp as (select id, rating from Movies where release_year >= '${startYear}' and release_year <= '${endYear}'),
tmp2 as (select t.id, t.rating, g.genre from tmp t, Genres g where t.id = g.movie_id),
tmp3 as (select tmp2.genre, avg(tmp2.rating) as avg_rating from tmp2 group by tmp2.genre),
tmp4 as (select distinct genre from Genres),
tmp5 as (select genre as genre_dup, avg_rating from tmp3),
tmp6 as (select * from tmp4 left join tmp5 on tmp4.genre=tmp5.genre_dup union select * from tmp4 right join tmp5 on tmp4.genre=tmp5.genre_dup),
tmp7 as (select genre, avg_rating from tmp6)
select genre, coalesce(avg_rating, 0) as avg_rating from tmp7 order by avg_rating desc, genre asc; `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/* ---- Q4 (Bonus part) ---- */
function getRandomMovies(req, res) {
  var query = `select * from Movies order by rand() limit 10`;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

// The exported functions, which can be accessed in index.js.
module.exports = {
  covid19_world_map: covid19_world_map,
  getSpecificDate : getSpecificDate,
  getCountryList : getCountryList,
  getCompareCountries : getCompareCountries,


  getTopInGenre: getTopInGenre,
  getRecs: getRecs,
  getDecades: getDecades,
  bestGenresPerDecade: bestGenresPerDecade,
  getRandomMovies: getRandomMovies,
  
};
