import SearchBox from "./SearchBox"
import InfoBox from "./InfoBox" 
import { useState } from "react"
export default function WeatherApp()
{
    const [weatherInfo,setWeatherInfo]=useState({});

    let updateInfo=(newInfo)=>{
        setWeatherInfo(newInfo);
    }
    return(
        <>
            <h2 style={{textAlign:"center"}}>Weather App</h2>
            <SearchBox updateInfo={updateInfo}/>
            <InfoBox info={weatherInfo}/>
        </>
    )
}