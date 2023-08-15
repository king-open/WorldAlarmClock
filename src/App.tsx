import { useEffect, useState } from 'react';
import './App.scss';

interface City {
  name: string;
  timeZone: string;
  time: string;
}

function App() {
  const [cities, setCities] = useState<City[]>([
    { name: 'New York', timeZone: 'America/New_York', time: '' },
    { name: 'London', timeZone: 'Europe/London', time: '' },
     { name: 'Australia', timeZone: 'Asia/Tokyo', time: '' },
  ]);

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const updatedCities = cities.map(city => ({
        ...city,
        time: now.toLocaleString('en-US', { timeZone: city.timeZone }),
      }));
      setCities(updatedCities);
    };

    updateTimes();
    const intervalId = setInterval(updateTimes, 1000);

    return () => clearInterval(intervalId);
  }, [cities]);

  return (
    <div className="world-clock-alarm">
      <h1>World Clock Alarm</h1>
      <div className="clock">
        {cities.map((city, index) => (
          <div className="clock-item" key={index}>
            <div className="city">{city.name}</div>
            <div className="time">{city.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
