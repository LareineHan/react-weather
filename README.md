# My Weather App

Welcome to **My Weather App**! This project was developed as part of my programming journey. It allows users to check the current weather conditions for their location or any city they choose.

## UI

![Weather App Screenshot](src/img/screenshot_weatherapp.png?raw=true "Weather App")

## Features

- **Current Location Weather**: Automatically fetches weather data based on the user's current location.
- **City Buttons**: Quick access to weather data for major cities (Paris, New York, London, Tokyo, Seoul, Dubai).

## Getting Started

1. Clone this repository to your local machine.
2. Install the necessary dependencies using `npm install`.
3. Obtain an API key from [OpenWeatherMap](https://openweathermap.org/) (sign up if you haven't already).
4. Create a `.env` file in the root directory and add your API key:

    ```
    REACT_APP_API_KEY=your_api_key_here
    ```

5. Run the app using `npm start`.

## Usage

1. **Current Location Weather**:
    - When you open the app, it will automatically fetch weather data for your current location.
    - Allow location access when prompted.

2. **City Buttons**:
    - Click on the city buttons (Paris, New York, London, Tokyo, Seoul, Dubai) to quickly view weather information for these major cities.

## Technologies Used

- React
- OpenWeatherMap API
- Geolocation API

## Contributing

Contributions are welcome! If you find any issues or have suggestions, feel free to create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

