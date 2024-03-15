import React from 'react';
import { Button } from 'react-bootstrap';

const WeatherBtn = ({ cities, selectedCity, handleCityChange }) => {
	return (
		<div className='btn-container'>
			{' '}
			<Button
				variant={selectedCity == null ? 'success' : 'warning'}
				onClick={() => handleCityChange('current')}>
				Current Location
			</Button>
			{cities.map((city) => (
				<Button
					variant={selectedCity === city ? 'success' : 'warning'}
					onClick={() => handleCityChange(city)}>
					{city.toUpperCase()}
				</Button>
			))}
		</div>
	);
};

export default WeatherBtn;
