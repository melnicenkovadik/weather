// @ts-ignore
import ReactWeather from 'react-open-weather';
import 'react-open-weather/lib/css/ReactWeather.css';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Params, useNavigate, useParams } from 'react-router-dom';

enum CONSTANTS {
  UMBRELLA = 'Rain',
  JACKETS = 10,
}

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
        const range = document.querySelectorAll('.rw-range');
        desc.forEach(n => {
          if (n.textContent === CONSTANTS.UMBRELLA) {
            n.textContent = 'Best day to sell an umbrella';
          }
        });
        const jacketsTmp: number[] = [];
        range.forEach(n => {
          if (n.textContent && n.textContent.includes('/')) {
            jacketsTmp.push(+n.textContent.trim().split('/')[1].substring(0, 3));
          }
        });
        const maxJacketsIdx = jacketsTmp.indexOf(Math.min(...jacketsTmp));
        range.forEach((n, idx) => {
          if (
            idx === maxJacketsIdx &&
            n.textContent &&
            n.textContent.includes('/') + n?.textContent.trim().split('/')[1].substring(0, 3) <
              CONSTANTS.JACKETS
          ) {
            n.textContent =
              n && n.textContent
                ? `${n.textContent}
                Best day to sell a jacket`
                : 'Best day to sell a jacket';
          } else {
            n.textContent = n && n.textContent ? n.textContent : '';
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
