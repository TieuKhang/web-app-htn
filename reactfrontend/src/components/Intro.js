import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import '../App.css'

class Intro extends Component {
    render() {
        return(
            <div className = "App-header">
                <h1>Welcome to GroceryBased App</h1>
                <p>Description: </p>
                <button className = "Button"><Link to="/camera">Take a photo</Link></button>
                <button className = "Button"><Link to="/uplimg">Upload a photo</Link></button>
                <button className = "Button"><Link to="/form">Type in information</Link></button>
                <button className = "Button"><Link to="/logo">Your grocery shopping lists</Link></button>
            </div>
        );
    }
}

export default Intro;