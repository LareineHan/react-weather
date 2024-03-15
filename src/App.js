import { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { Container } from 'react-bootstrap';
import WeatherBox from './component/WeatherBox';
import WeatherBtn from './component/WeatherBtn';
// import REACT_APP_WEATHER_API_KEY from './key';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const cities = ['paris', 'new york', 'london', 'tokyo', 'seoul', 'dubai'];
const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
	const [weather, setWeather] = useState(null);
	const [city, setCity] = useState(null);
	const [loading, setLoading] = useState(false);
	const [apiError, setAPIError] = useState('');
	const getWeatherByCurrentLocation = async (lat, lon) => {
		try {
			let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
			let response = await fetch(url);
			let data = await response.json();
			setWeather(data);
			setLoading(false);
		} catch (error) {
			setAPIError(error.message);
			setLoading(false);
		}
	};

	const getCurrentLocation = () => {
		navigator.geolocation.getCurrentPosition((position) => {
			const { latitude, longitude } = position.coords;
			getWeatherByCurrentLocation(latitude, longitude);
		});
	};

	const getWeatherByCity = async () => {
		try {
			let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
			let response = await fetch(url);
			let data = await response.json();
			setWeather(data);
			setLoading(false);
		} catch (error) {
			setAPIError(error.message);
			setLoading(false);
			console.log(error);
		}
	};

	useEffect(() => {
		if (city === null) {
			setLoading(true);
			getCurrentLocation();
		} else {
			setLoading(true);
			getWeatherByCity();
		}
		// eslint-disable-next-line
	}, [city]);

	const handleCityChange = (city) => {
		if (city === 'current') {
			setCity(null);
		} else {
			setCity(city);
		}
	};

	return (
		<>
			{' '}
			<Container className='vh-100'>
				{loading ? (
					<div className='container'>
						<ClipLoader color='#f86c6b' loading={loading} size={150} />
					</div>
				) : !apiError ? (
					<div className='container'>
						<WeatherBox weather={weather} />
						<WeatherBtn
							cities={cities}
							handleCityChange={handleCityChange}
							selectedCity={city}
						/>
					</div>
				) : (
					apiError
				)}
			</Container>
		</>
	);
}

export default App;
