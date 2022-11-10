// @ts-ignore
import ReactWeather from 'react-open-weather';
import 'react-open-weather/lib/css/ReactWeather.css';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Params, useNavigate, useParams } from 'react-router-dom';

export default function App() {
  const { city }: Params = useParams();
  const [place, setPlace] = useState<string>(city && city?.length > 2 ? city : 'Kyiv');
  const [timer, setTimer] = useState(false);
  const navigate = useNavigate();
  const refReactWeather = useRef(null);

  const setCityName = (e: ChangeEvent<HTMLInputElement>) => {
    setPlace(e.target.value);
  };
  const onSubmitHandler = () => {
    navigate(`${place}`, { replace: true });
  };

  function resetHandler() {
    setPlace('');
  }

  useEffect(() => {
    setTimeout(() => {
      setTimer(true);
    }, 0);
    if (timer && refReactWeather.current !== null) {
      // @ts-ignore
      const text = refReactWeather?.current?.textContent;
      if (text.includes('Rain') || text.includes('Clouds')) {
        const desc = document.querySelectorAll('.rw-desc');
        desc.forEach(n => {
          if (n.textContent === 'Rain') {
            n.textContent = 'Best day to sell an umbrella';
          }
          if (n.textContent === 'Clouds') {
            n.textContent = 'Best day to sell a jacket';
          }
        });
      }
    }
  });

  return (
    <div className="App">
      <form onSubmit={onSubmitHandler}>
        <div className="search">
          <input type="text" value={place} onChange={setCityName} />
          <button className="reset-btn" type="reset" onClick={resetHandler}>
            Reset
          </button>
        </div>

        <div ref={timer ? refReactWeather : undefined}>
          <ReactWeather
            forecast="5days"
            apikey={process.env.REACT_APP_WEATHER_API_KEY}
            type="city"
            city={city}
            units="metric"
          />
        </div>
      </form>
    </div>
  );
}
