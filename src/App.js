import {useState, useEffect} from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
import axios from 'axios';
import './App.css';


function App() {
  const [data, setSensdata] = useState(null);

  useEffect(() => {
    axios.get('https://api.thingspeak.com/channels/1835714/feeds.json?api_key=UG41IELRYIJHDTJR&results=2')
      .then(response => {
        setSensdata(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  
  // console.log(sendata.feeds[0]);
  return (
    <div className="App">
      {data && (
        <div>
          <h2>Gauge for {data.channel.field1}</h2>
          <ReactSpeedometer
            maxValue={100} // Adjust max value based on your data
            value={parseInt(data.feeds[0].field1)} // Assuming field1 holds the gauge value
            needleColor="green"
            startColor="blue"
            segments={10}
            endColor="red"
            needleTransitionDuration={4000}
            needleTransition="easeElastic"
            textColor="black"
          />
          <h2>Gauge for {data.channel.field2}</h2>
          <ReactSpeedometer
            maxValue={100} // Adjust max value based on your data
            value={parseInt(data.feeds[0].field2)} // Assuming field2 holds the gauge value
            needleColor="blue"
            startColor="green"
            segments={10}
            endColor="red"
            needleTransitionDuration={4000}
            needleTransition="easeElastic"
            textColor="black"
          />
          {/* Add more gauges for additional fields if needed */}
        </div>
      )}
    </div>
  );
}

export default App;
