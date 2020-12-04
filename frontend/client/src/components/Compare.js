import React, { Component } from 'react'
import PageNavbar from "./PageNavbar";

export default class Compare extends Component {
    constructor(props) {
        super()
        this.state = {
            country1 : 'Please select a country',
            country2 : '',
            countryList : [],
            covidInfo1:[], // each ele is a list which contains country, date, confirmed, death
            covidInfo2:[],
            otherInfo1:[],// contains country, med_age, life_expectancy, gdp
            otherInfo2:[],
            genderInfo1 : [], 
            genderInfo2 : [], // contains country, female_percent, male_percent
            
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleCompare = this.handleCompare.bind(this)
    }

    componentDidMount(){
        fetch("http://localhost:8081/compare", {match : "GET"})
        .then((res)=>res.json())
        .then((results)=>{
            var updatedCountryList = []
            for (var i = 0; i < results.length; i++) {
                updatedCountryList.push(results[i].country)
            }
            this.setState({
                countryList : updatedCountryList
            })
        })
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name] : value
        })
    }

    handleCompare() {
        fetch("http://localhost:8081/compare/" + this.state.country1 + "/" + this.state.country2, {match : "GET"})
        .then((res)=>res.json())
        .then((results)=>{
            var updatedCovidInfo1 = []
            var updatedCovidInfo2 = []
            var updatedOtherInfo1 = []
            var updatedOtherInfo2 = []
            var updatedGenderInfo1 = []
            var updatedGenderInfo2 = []
            for (var i = 0; i < results[0].length; i++) {
                var tmpList = []
                tmpList.push(results[0][i].country)
                tmpList.push(results[0][i].date)
                tmpList.push(results[0][i].confirmed)
                tmpList.push(results[0][i].death)
                updatedCovidInfo1.push(tmpList)
            }
            for (i = 0; i < results[1].length; i++) {
                var tmpList = []
                tmpList.push(results[1][i].country)
                tmpList.push(results[1][i].date)
                tmpList.push(results[1][i].confirmed)
                tmpList.push(results[1][i].death)
                updatedCovidInfo2.push(tmpList)
            }
            updatedOtherInfo1.push(results[2][0].country)
            updatedOtherInfo1.push(results[2][0].med_age)
            updatedOtherInfo1.push(results[2][0].life_expectancy)
            updatedOtherInfo1.push(results[2][0].gdp)

            updatedOtherInfo2.push(results[3][0].country)
            updatedOtherInfo2.push(results[3][0].med_age)
            updatedOtherInfo2.push(results[3][0].life_expectancy)
            updatedOtherInfo2.push(results[3][0].gdp)

            updatedGenderInfo1.push(results[4][0].country)
            updatedGenderInfo1.push(results[4][0].female_percent)
            updatedGenderInfo1.push(results[4][0].male_percent)

            updatedGenderInfo2.push(results[5][0].country)
            updatedGenderInfo2.push(results[5][0].female_percent)
            updatedGenderInfo2.push(results[5][0].male_percent)

            this.setState({
                covidInfo1 : updatedCovidInfo1,
                covidInfo2 : updatedCovidInfo2,
                otherInfo1 : updatedOtherInfo1,
                otherInfo2 : updatedOtherInfo2,
                genderInfo1 : updatedGenderInfo1,
                genderInfo2 : updatedOtherInfo2
            }) 
        })
    }

    render() {
        return (
            <div>
                <PageNavbar active="compare"/>
                <div>
                    <select name="country1" value={this.state.country1} onChange={this.handleChange}>
                        <option>
                            {"Please select a country"}
                        </option>
                        {this.state.countryList.map((ele, idx) => 
                            <option value={ele} key={"countryList1" + idx}>
                                {ele}
                            </option>
                        )}
                    </select>
                    <br/>
                    <br/>
                    <br/>
                    <select name="country2" value={this.state.country2} onChange={this.handleChange}>
                        <option>
                            {"Please select a country"}
                        </option>
                        {this.state.countryList.map((ele, idx) => 
                            <option value={ele} key={"countryList2" + idx}>
                                {ele}
                            </option>
                        )}
                    </select>
                    <br/>
                    <br/>
                    <br/>
                    <button onClick={this.handleCompare}>Compare</button>
                    <br/>
                    <br/>
                    <br/>
                    <h2>Info about the first country</h2>
                    <h4>Info about COVID19</h4>
                    {
                            this.state.covidInfo1.map((ele, idx) => 
                            <div>
                                {"Date: " + ele[1] + " Confirmed: " + ele[2] + " Death: " + ele[3]}
                                <br/>
                            </div>
                            )
                    }
                    <h4>Info about median_age, life_expectancy, gdp</h4>
                    {
                        
                       this.state.otherInfo1.length === 0 ? null:
                        <div>
                            {"Meidan age: " + this.state.otherInfo1[1] + " life expectancy: " + this.state.otherInfo1[2] + " GDP: " + this.state.otherInfo1[3]}
                            <br/>
                        </div>
                        
                    }
                    <h4>Info about female_percent, male_percent</h4>
                    {
                        this.state.genderInfo1.length === 0 ? null:
                        <div>
                            {"Female percent: " + this.state.genderInfo1[1] + " Male percent: " + this.state.genderInfo1[2]}
                            <br/>
                        </div>
                    }


                    <br/>
                    <br/>
                    <br/>
                    <h2>Info about the second country</h2>
                    <h4>Info about COVID19</h4>
                    {
                            this.state.covidInfo2.map((ele, idx) => 
                            <div>
                                {"Date: " + ele[1] + " Confirmed: " + ele[2] + " Death: " + ele[3]}
                                <br/>
                            </div>
                            )
                    }
                    <h4>Info about median_age, life_expectancy, gdp</h4>
                    {
                        this.state.otherInfo2.length === 0 ? null:
                        <div>
                            {"Meidan age: " + this.state.otherInfo2[1] + " life expectancy: " + this.state.otherInfo2[2] + " GDP: " + this.state.otherInfo2[3]}
                            <br/>
                        </div>
                    }
                    
                    <h4>Info about female_percent, male_percent</h4>
                    {
                        this.state.genderInfo2.length === 0 ? null:
                        <div>
                            {"Female percent: " + this.state.genderInfo2[1] + " Male percent: " + this.state.genderInfo2[2]}
                            <br/>
                        </div>
                    }
                </div>
            </div>
        )
    }
}
