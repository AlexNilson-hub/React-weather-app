import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";

//Ключ API для погоды. https://home.openweathermap.org/api_keys
const API_KEY = "62ca90993f8642bb7b92a892de0b88d5";


class App extends React.Component {
    state ={
        temp: undefined,
        city: undefined,
        country: undefined,
        sunset: undefined,
        pressure: undefined,
        error: undefined
    }
    gettingWeather = async (e) =>{
        e.preventDefault();
        const city = e.target.elements.city.value;
        //Проверим что форма пустая и не будет ошибки
        if(city){
            const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            const data = await api_url.json();
            //Отобразим правильно время и дату
            let sunset = data.sys.sunset;
            let date = new Date();
            date.setTime(sunset);
            let sunset_date = date.getHours() + ':' +date.getMinutes() + ':'+date.getSeconds();

            this.setState({
                temp: data.main.temp,
                city: data.name,
                country: data.sys.country,
                pressure: data.main.pressure,
                sunset: sunset_date,
                error: undefined
            });
        }else {
            this.setState({
                temp: undefined,
                city: undefined,
                country: undefined,
                pressure: undefined,
                sunset: undefined,
                error: "Введите название города!"
            });
        }

    }

    render() {
        return (
            <div className="wrapper">
                <div className="main">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-7 info">
                                <Info/>
                            </div>
                            <div className="col-sm-7 form">
                                <Form weatherMethod={this.gettingWeather}/>
                                <Weather
                                    temp={this.state.temp}
                                    city={this.state.city}
                                    country={this.state.country}
                                    pressure={this.state.pressure}
                                    sunset={this.state.sunset}
                                    error={this.state.error}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;












// import logo from './logo.svg';
// import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;
