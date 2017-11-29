import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SearchBar } from 'react-native-elements';

import MainWeather from './components/MainWeather';
import Forecast from './components/Forecast';
import weatherService from './services/Weather';

export default class App extends React.Component {
  state = {
    city: 'Gliwice',
    currentWeather: {},
    forecast: []
  }

  async componentWillMount() {
    this.changeCity(this.state.city);
  }

  async changeCity(city) {
    if (!city) {
      return;
    }

    try {
      const currentWeather = await weatherService.getCurrent(city);
      const forecast = await weatherService.getForecast(city);

      this.setState({ city, currentWeather, forecast });
    } catch (e) { }
  }

  render() {
    const { currentWeather, forecast } = this.state;

    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        <SearchBar style={{ flex: 1 }} placeholder={this.state.city || 'Search city'}
          onChangeText={this.changeCity.bind(this)} />

        <View style={styles.container}>
          <View style={{ flex: 2, width: '100%' }}>
            <MainWeather temperature={currentWeather.temp} pressure={currentWeather.pressure}
              wind={currentWeather.wind} humidity={currentWeather.humidity} icon={currentWeather.icon} />
          </View>

          {forecast.length > 0 &&
            <View style={{ flex: 1, flexDirection: 'row' }} >
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Forecast temperature={forecast[0].temp} pressure={forecast[0].pressure}
                  wind={forecast[0].wind} humidity={forecast[0].humidity} icon={forecast[0].icon}
                  daysFromToday={1} />
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Forecast temperature={forecast[1].temp} pressure={forecast[1].pressure}
                  wind={forecast[1].wind} humidity={forecast[1].humidity} icon={forecast[1].icon}
                  daysFromToday={2} />
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Forecast temperature={forecast[2].temp} pressure={forecast[2].pressure}
                  wind={forecast[2].wind} humidity={forecast[2].humidity} icon={forecast[2].icon}
                  daysFromToday={3} />
              </View>
            </View>
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#444',
    alignItems: 'center',
    justifyContent: 'center'
  },
});