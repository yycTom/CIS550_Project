import React, { Component } from 'react'
import PageNavbar from "./PageNavbar";

export default class COVID19_world_map extends Component {
    render() {
        return (
            <div>
                <PageNavbar active="covid19_world_map"/>
                <div>
                <h1 style= {{color:'white'}}>  This is map </h1>
                </div>
            </div>
        )
    }
}
