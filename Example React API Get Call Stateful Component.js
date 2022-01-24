import React, { Component } from  'react';
import axios from 'axios' // To get axios, run "npm i axios" in a terminal within the project
axios.defaults.headers.common = {'Authorization': `Bearer ${process.env.REACT_APP_NEWS_API_KEY}`} // Put your API key/token here. Keep the token in the .env file in the root of your project. Don't forget to add '.env' to your .gitignore file!
export default axios

// Depending on how you want to structure the app, you could make this component into two very similar ones. One that renders just a headline and one that renders just weather. 

//I don't know the specifics of the API so this is all just example code.

export default class News extends Component {
    constructor () {
        super();

        this.state = { // Here is where you will store the data you want to render
            localHeadline: "",
            localWeather: "",
        }
    }
    componentDidMount() {
        console.log('News component mounted!')
        axios.get('<https://some/api/url>').then(res => {
            console.log('Api response', res) // Look through this log and see how the data is structured
            console.log('Specific data', res.data.results.orem) // This is an example log that could get nested data for Orem. This is how you'd work through the layers of JSON
            this.setState({
                localHeadline: res.data.results.orem.headline[0],
                sunsetData: res.data.results.orem.weather,
            })
            this.formatData() // This is an optional function (defined below) that can be used to further format the data, in case you need to change the capitalization of text or other small issues. You can also do formatting here instead of another function, but I think it's better to leave 'componentDidMount' clean
        })
    }

    formatData() {
        const formattedHeadline = this.state.localHeadline.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ') // Capitalize the first letter of each word in the headline
        const formattedWeather = this.state.localWeather * 9 / 5 + 32; // Convert celsius degree to fahrenheit

        this.setState({ // You can change the data held within "state" by using this special function anywhere after the state "constructor"
            localHeadline: formattedHeadline,
            localWeather: formattedWeather
        })
    }

    render () {
        console.log('this.state', this.state) // Check to see if your data in state is what you are expecting
        // Use className below for CSS (assigns that class to the div)
        return(
            // Render the data using React's special html syntax
            <div>
                <div className='headline'>{this.state.localHeadline}</div>
                <div className='weather'>{this.state.localWeather}</div>
            </div>
        )
    }
}