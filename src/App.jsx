import React, { useEffect, useState } from 'react'
import "./index.css"
import getIcon from './Switchicon'

const App = () => {

  const [state, setState] = useState(true);
  const[change, setChange] = useState("");
  const[location, setLocation] = useState(null);
  const[currentData, setCurrentData] = useState(null);
  const[time, setTime] = useState(null);
  const[hours, setHours] = useState(null);
  const[display, setDisplay] = useState();

  const handleChange = (e)=>{
    setChange(e.target.value)
    setDisplay(true)
  }

  useEffect(()=>{
      const findData = async () =>{
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${change}&limit=1&appid=3cb7568d2de1615d52850688d119a6a0`
      const response = await fetch(url);
      const detail = () =>{
        response.json().then((user)=>{
          setLocation(user[0]);
          // if(state===true){
          //   setDisplay(user[0])
          // }else(null)
            const weatherInfo = async () =>{
              const api = `https://api.openweathermap.org/data/2.5/weather?lat=${user[0].lat}&lon=${user[0].lon}&units=metric&appid=3cb7568d2de1615d52850688d119a6a0`
              const res = await fetch(api);
              const feedback = () =>{
                res.json().then((info)=>{
                  setCurrentData(info);
                  if(info!==undefined){
                    const date = new Date();
                    const localtime = date.getTime();
                    const localOffset = date.getTimezoneOffset() * 60000;
                    const utc = localtime + localOffset;
                    const finaltime = utc + (1000 * info.timezone);
                    const nd = new Date(finaltime);
                    setTime(nd);
                    setHours(nd.getHours());
                  }else(null)
                })
              }
              feedback();
            }
            weatherInfo();
        })
      }
      detail();
    }
    findData();

    if(location===undefined){
      setCurrentData(undefined);
    }

  },[state]);

  const submitTask = () => {
    setState(!state);
    setTimeout(()=>{
      setChange("")
    },0);
  }

  return (
    <>
      <div className='container'>
        <div className='app-container'>
          <div className='searchbar'>
            <input type='text' value={change} onChange={handleChange} placeholder='Search for location'></input>
            <button type='submit'><ion-icon name="search-outline" onClick={submitTask}></ion-icon></button>
          </div>
           
          <div className='weather-details'>
          {!currentData ? <h1 className='noresponse'>No data found</h1> : (
            <>
            <div className='day_and_date'>
              {time !== null ? (
                <>
                <p className='today'>Today</p>
                <p className='currentdate'>{time.toDateString()}</p>
                </>
                ) : null}
            </div>
              <div className='weather-info'>
              <p className='condition'>{currentData.weather[0].main}</p>
              <img src={getIcon(currentData.weather[0].main,currentData.weather[0].description,hours)} alt='weathericon'/>
              <p className='description'>{`${currentData.weather[0].description[0].toUpperCase()}${currentData.weather[0].description.slice(1)}`}</p>
              <div className='currentinfo'>
                <h1 className='temperature'>{Math.round(currentData.main.temp)}°<span style={{fontSize:"30px", fontWeight: "bolder", color: "#29879C"}}>C</span></h1>
              </div>
            </div>
            <div className='extrainfo'>
                <div className='extra'>
                  <h4>Wind</h4>
                  <p>{currentData.wind.speed}km/h</p>
                </div>
                <div className='extra'>
                  <h4>Humidity</h4>
                  <p>{currentData.main.humidity}%</p>
                </div>
                <div className='extra'>
                  <h4>Feels like</h4>
                  <p>{Math.round(currentData.main.feels_like)}°c</p>
                </div>
            </div>
            </>
            )}

            { !location ? null :(
            <>
            <div className='location'>
              <ion-icon name="location-outline"></ion-icon>
              <p className='locationtxt'>{location.name}, {location.state}, {location.country}</p>
            </div>  
            </>
            )}

          </div>
        </div>
      </div>
    </>
  )
}

export default App