import axios from 'axios';

const CancelToken = axios.CancelToken;

const mapResult = (res) => {
    const { temp, pressure, humidity } = res.main;
    const { speed: wind } = res.wind;
    const { icon } = res.weather[0];

    return {
        temp: Math.round(temp),
        pressure: Math.round(pressure),
        humidity: Math.round(humidity),
        wind: Math.round(wind),
        icon
    };
};

class WeatherApi {
    static endpoint = 'https://api.openweathermap.org/data/2.5';
    static apiKey = '41fae9dcd05e0fcbf176197ce26531e2';

    pending = {
        current: {},
        forecast: {},
    }

    cancel() {
        const { current, forecast } = this.pending;
        current.cancel && current.cancel();
        forecast.cancel && forecast.cancel();
    }

    async getCurrent(cityName) {
        const url = `${WeatherApi.endpoint}/weather?q=${cityName}&units=metric&appid=${WeatherApi.apiKey}`;
        const source = CancelToken.source();

        const res = (await axios.get(url, { cancelToken: source.token })).data;

        this.pending.current = source;

        return mapResult(res);
    }

    async getForecast(cityName) {
        const url = `${WeatherApi.endpoint}/forecast?q=${cityName}&units=metric&appid=${WeatherApi.apiKey}`;
        const source = CancelToken.source();

        const res = (await axios.get(url, { cancelToken: source.token })).data;

        this.pending.forecast = source;

        return res.list.map(mapResult);
    }
}

export default new WeatherApi();
