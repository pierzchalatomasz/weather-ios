const mapResult = (res) => {
    const { temp, pressure, humidity } = res.main;
    const { speed: wind } = res.wind;

    return {
        temp: Math.round(temp), 
        pressure: Math.round(pressure),
        humidity: Math.round(humidity),
        wind: Math.round(wind)
    };
};

class WeatherApi {
    static endpoint = 'https://api.openweathermap.org/data/2.5';
    static apiKey = '41fae9dcd05e0fcbf176197ce26531e2';

    async getCurrent(cityName) {
        const res = await (await fetch(
            `${WeatherApi.endpoint}/weather?q=${cityName}&units=metric&appid=${WeatherApi.apiKey}`
        )).json();

        return mapResult(res);
    }

    async getForecast(cityName) {
        const res = await (await fetch(
            `${WeatherApi.endpoint}/forecast?q=${cityName}&units=metric&appid=${WeatherApi.apiKey}`
        )).json();

        return res.list.map(mapResult);
    }
}

export default new WeatherApi();