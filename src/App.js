import React from 'react';
import './App.css';

import 'weather-icons/css/weather-icons.css';
import Form from './app_component/Form.js';
import Titles from './app_component/Titles';
import Weather from './app_component/Weather';

// api call api.openweathermap.org/data/2.5/weather?q=London
const API_key = "02dbfcbaf254b14cbaf049108d3575ec";

class App extends React.Component {
    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined
    }
    getWeather = async(e) =>{
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
                
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${API_key}`);

        const data = await api_call.json();

        if (city && country) {

            console.log(data);

            this.setState({
                temperature: data.main.temp,
                city: data.name,
                country: data.sys.country,
                humidity: data.main.humidity,
                description: data.weather[0].description,
                error: ""
            });
        }
        else {
            this.setState({
                temperature: undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,
                description: undefined,
                error: "Please enter the values."
            })
        }
                
    };
    render() {
        return(
            <div>
                <div className="wrapper">
                    <div className="main">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-5 title-container">
                                    <Titles />
                                </div>
                                <div className="col-sm-7 form-container">
                                    <Form getWeather={this.getWeather} />
                                    <Weather
                                        temperature={this.state.temperature}
                                        city={this.state.city}
                                        country={this.state.country}
                                        humidity={this.state.humidity}
                                        description={this.state.description}
                                        error={this.state.error}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        );
    }
}


                

export default App;
