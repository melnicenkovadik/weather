// @ts-ignore
import ReactWeather from "react-open-weather";
import "react-open-weather/lib/css/ReactWeather.css";
import {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import {Params, useNavigate, useParams} from "react-router-dom";

export default function App() {
    const {city}: Params = useParams()
    const [place, setPlace] = useState<string>(city && city?.length > 2 ? city : "Kyiv");
    const navigate = useNavigate()
    const refReactWeather = useRef<HTMLDivElement>(null)

    const setCityName = (e: ChangeEvent<HTMLInputElement>) => {
        setPlace(e.target.value);
    }
    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        navigate(`${place}`, {replace: true})
    }

    function resetHandler() {
        setPlace('')
    }

    return (
        <div className="App">
            <form onSubmit={onSubmitHandler}>
                <div className='search'>
                    <input type="text" value={place} onChange={setCityName}/>
                    <button
                        className='reset-btn'
                        type="reset"
                        onClick={resetHandler}>
                        Reset
                    </button>
                </div>
                {
                    city && city?.length > 2 && (
                        <div ref={refReactWeather}>
                            <ReactWeather
                                forecast="5days"
                                apikey={process.env.REACT_APP_WEATHER_API_KEY}
                                type="city"
                                city={city}
                                units="metric"
                            />
                        </div>
                    )
                }

            </form>
        </div>

    )
        ;
}