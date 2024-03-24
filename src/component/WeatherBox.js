import React from 'react';

const WeatherBox = ({ weather, localTime }) => {
	console.log(weather);
	const celToFar = (far) => {
		return far * 1.8 + 32;
	};
	return (
		<div className='weather-box'>
			<h1 className='city'>{weather?.name || 'Data is not available'}</h1>
			<h2 className='time'>{localTime}</h2>
			<h2 className='temp'>
				{weather?.main.temp}°C ({celToFar(weather?.main.temp).toPrecision(3)}°F)
			</h2>
			<h2 className='description'>{weather?.weather[0].description}</h2>
		</div>
	);
};

export default WeatherBox;
