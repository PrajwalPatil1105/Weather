import { useState } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState("")
  const [value,setvalue] = useState("")
  const [date, setdate] = useState()
  const [imgs, serimgs] = useState("/wea.png")

  const timer = setInterval(() => {
    setdate(new Date().toLocaleString());
  }, 1000);

  const key = ((e)=>{
    if(e.key==="Enter"){
      act();
    }
  })



     async function act(){
      try {
        let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=f10dc1d75fc84234ba562811242010&q=${city}&aqi=yes`);
        if (!response.ok) {
          throw new Error("City not found");
        }
        let maindata = await response.json();
        setvalue(maindata);
      } catch (error) {
        alert("Enter a correct city name");
        setvalue(null); 
      }
    }
    
    
  return (
    <>
      <div className='hero'>
      <div className='inputsection'>
      <input className='input' type="text" onKeyDown={key}  value={city} placeholder='Enter City Name'  onChange={(e) => setCity(e.target.value)} />
      <button onClick={act}>Get</button>
      </div>
    {value?(
        <div className='data'>
        <p className='date'>{date}</p>
        <h2 className='name'>{value.location.name}</h2>
        <p className='region'>{value.location.region}</p>
        <p className='condition'>{value.current.condition.text}</p>
        <img style={{width:"130px", height:"130px"}} src={value.current.condition.icon} alt="nothing" />
        <h1>{value.current.temp_c}&deg;C</h1>
        <p style={{fontSize:"12px"}}>Last Updated:    {value.current.last_updated}</p>
        </div>
        ):(
          <div>
          <h3 className='first'>Get Your Weather Data Here</h3>
          <img style={{width:"150px", height:"150px", marginTop:"250px"}} src={imgs} alt="" srcset="" />
          </div>
        )}
      </div>
    </>
  )
}

export default App
