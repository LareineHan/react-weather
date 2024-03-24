import { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { Container } from 'react-bootstrap';
import WeatherBox from './component/WeatherBox';
import WeatherBtn from './component/WeatherBtn';
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
			getLocalTime(data);
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
			getLocalTime(data);
			setWeather(data);
			setLoading(false);
		} catch (error) {
			setAPIError(error.message);
			setLoading(false);
			console.log(error);
		}
	};

	const getLocalTime = async (data) => {
		const timezoneOffsetSeconds = data.timezone;
		const currentTimeUTC = new Date();
		const localTime = new Date(
			currentTimeUTC.getTime() + timezoneOffsetSeconds * 1000 // 1000 means
		);

		// Get day of the week
		const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		const dayOfWeek = days[localTime.getDay()];
		const hours = ('0' + localTime.getHours()).slice(-2); //
		const minutes = ('0' + localTime.getMinutes()).slice(-2);
		// Set local time and day for the city
		// Get local time without seconds
		const localTimeWithoutSeconds = localTime.toLocaleTimeString([], {
			hour12: true,
			hour: 'numeric',
			minute: '2-digit',
			timeZone: 'UTC',
		});

		// Set local time and day for the city
		data.localTime = `${dayOfWeek} ${localTimeWithoutSeconds}`;
		// data.localTime = `${dayOfWeek} ${hours}:${minutes} //
		//  ${localTime.toLocaleTimeString([], {
		// 		timeZone: 'UTC',
		// 	})}`; //
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
			<Container className='vh-100'>
				{loading ? (
					<div className='container'>
						<ClipLoader color='#f86c6b' loading={loading} size={150} />
					</div>
				) : !apiError ? (
					<div className='container'>
						<WeatherBox weather={weather} localTime={weather.localTime} />

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
