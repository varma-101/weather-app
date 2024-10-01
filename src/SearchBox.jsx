import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import './SearchBox.css';
import { useState } from 'react';
export default function SearchBox({updateInfo})
{
    let [city,setCity]=useState("");
    let [error,setError]=useState(false);
    const API_URL="https://api.openweathermap.org/data/2.5/weather?";
    const API_KEY="89bd033d0758b80e13c5bf4c3efc2e43";

    let getWeatherInfo=async()=>{
        try{
            let res=await fetch(`${API_URL}q=${city}&appid=${API_KEY}&units=metric`);
            let response=await res.json();
        
            let result={
                city: city,
                feelsLike: response.main.feels_like,
                temp: response.main.temp,
                temp_min: response.main.temp_min,
                temp_max: response.main.temp_max,
                weather: response.weather[0].main,
                description: response.weather[0].description,
                humidity: response.main.humidity,
            }
            console.dir(result);
            return result;
        }catch(err)
        {
            throw new err;
        }
    }

    let handleChange=(event)=>{
        setCity(event.target.value);
    }

    let handleSubmit=async (event)=>{
        setError(false);
        try{
            event.preventDefault();
            console.log(city);
            let newInfo=await getWeatherInfo();
            updateInfo(newInfo);
            setCity("");
        }catch(err)
        {
            setError(true);
        }
    }
    return(
        <>
            <div className='searchbox'>
                <form onSubmit={handleSubmit}>
                    <TextField id="city" label="City Name" variant="outlined" required value={city} onChange={handleChange}/>
                    <br /><br />
                    <Button variant="contained" endIcon={<SearchIcon/>} type='submit'>
                        Search
                    </Button>
                    <br />
                </form>
                {error&&<p style={{color:"red"}}>No Such place exists in our Api</p>}
            </div>
        </>
    )
}