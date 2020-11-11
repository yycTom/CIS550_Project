import React, { Component } from 'react'
import PageNavbar from "./PageNavbar";
import {Link, BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import COVID19_world_map from "./COVID19_world_map"
export default class Home extends Component {

    constructor(props){
        super()
        this.state = {
            columnList : ["COVID19 world map", "Compare two countries", "Explore more", "First case and death"]
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {
        
        var columnName = event.target.id
        for (var i = 0; i < this.state.columnList.length; i++) {
            if (columnName == this.state.columnList[i]) {
                console.log(event.target.id)
                return <Link to = {"/covid19_world_map"}> Link</Link>
            }
        }
    }

    render() {
        return (
            <div>
                <PageNavbar active="home"/>
                <div>
                    <h2>COVID19 Pandemic</h2>
                     <p>
                        Coronaviruses are important human and animal pathogens. At the end of 2019, 
                        a novel coronavirus was identified as the cause of a cluster of pneumonia cases in Wuhan, 
                        a city in the Hubei Province of China. It rapidly spread, resulting in an epidemic throughout China, 
                        followed by a global pandemic. In February 2020, the World Health Organization designated the disease COVID-19, 
                        which stands for coronavirus disease 2019 
                    </p>
                </div>
            <div>
              
                <div>
                    <Link to={'/covid19_world_map'} >{this.state.columnList[0]}</Link>
                </div>
                

                <div>
                    <Link to={'/compare'} >{this.state.columnList[1]}</Link>
                </div>

                <div>
                    <Link to={'/explore'} >{this.state.columnList[2]}</Link>
                </div>

                <div>
                    <Link to={'/first_case_death'} >{this.state.columnList[3]}</Link>
                </div>
            </div>

            </div>
        )
    }
}
