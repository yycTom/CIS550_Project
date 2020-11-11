import React, { Component } from 'react'
import PageNavbar from "./PageNavbar";

export default class Home extends Component {
    render() {
        return (
            <div>
                <PageNavbar active="home"/>
                <h1 style= {{color:'white'}}>This is Home page</h1>
            </div>
        )
    }
}
