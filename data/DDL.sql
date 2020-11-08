CREATE TABLE COVID ( 
    country varchar(20), 
    province varchar(20), 
    date datetime, 
    longitude char(2), 
    latitude char(3), 
    confirmed int(11)
    death int(11),
    recovered int(11),
    PRIMARY KEY(country, province, date),
    FOREIGN KEY(country) REFERENCES Country(country)
);

CREATE TABLE Air_Traffic (
    airport varchar(20),
    date datetime,
    country varchar(20),
    state varchar(20),
    city varchar(20),
    baseline_percent varchar(20),
    PRIMARY KEY(airport, date),
    FOREIGN KEY(country) REFERENCES Country(country)
);

CREATE TABLE Case_Gender (
    country varchar(20),
    female_percent int(11),
    male_percent int(11),
    PRIMARY KEY(country),
    FOREIGN KEY(country) REFERENCES Country(country)
);

CREATE TABLE Country (
    country varchar(20),
    med_age int(11),
    life_expectancy int(11),
    gdp int(11),
    PRIMARY KEY(country)
);

CREATE TABLE Happiness (
    country varchar(20),
    year int(11),
    score int(11),
    PRIMARY KEY(country, year),
    FOREIGN KEY(country) REFERENCES Country(country)
)