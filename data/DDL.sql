CREATE TABLE COVID ( 
    country varchar(20), 
    province varchar(50), 
    date date, 
    longitude float(20), 
    latitude float(20), 
    confirmed int(11),
    death int(11),
    recovered int(11),
    PRIMARY KEY(country, date, longitude, latitude),
    FOREIGN KEY(country) REFERENCES Country(country)
);

CREATE TABLE Air_Traffic (
    airport varchar(20),
    date date,
    country varchar(20),
    state varchar(20),
    city varchar(20),
    baseline_percent float(24),
    PRIMARY KEY(airport, date),
    FOREIGN KEY(country) REFERENCES Country(country)
);

CREATE TABLE Case_Gender (
    country varchar(20),
    female_percent float(24),
    male_percent float(24),
    PRIMARY KEY(country),
    FOREIGN KEY(country) REFERENCES Country(country)
);

CREATE TABLE Country (
    country varchar(20),
    med_age float(24),
    life_expectancy float(24),
    gdp float(24),
    PRIMARY KEY(country)
);

CREATE TABLE Happiness (
    country varchar(20),
    year int(11),
    score float(24),
    PRIMARY KEY(country, year),
    FOREIGN KEY(country) REFERENCES Country(country)
);

CREATE TABLE First_Case_First_Dead (
    continent varchar(20),
    country varchar(20),
    date_of_first_case date,
    last_visited_country varchar(100),
    confirmed_case_at_first_day int(11),
    age_of_first_case varchar(20),
    date_of_first_death varchar(50),
    age_of_first_death varchar(20),
    PRIMARY KEY(country),
    FOREIGN KEY(country) REFERENCES Country(country) 
);
