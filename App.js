import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SearchBar } from 'react-native-elements';

import MainWeather from './components/MainWeather';
import Forecast from './components/Forecast';
import weatherService from './services/Weather';

export default class App extends React.Component {
  state = {
    currentWeather: {},
    forecast: []
  }

  async componentWillMount() {
    const currentWeather = await weatherService.getCurrent('Gliwice');
    const forecast = await weatherService.getForecast('Gliwice');

    this.setState({ currentWeather, forecast })
  }

  render() {
    const { currentWeather, forecast } = this.state;

    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        <SearchBar style={{ flex: 1 }} placeholder="Search city" />

        <View style={styles.container}>
          <View style={{ flex: 2, width: '100%' }}>
            <MainWeather temperature={currentWeather.temp} pressure={currentWeather.pressure}
              wind={currentWeather.wind} humidity={currentWeather.humidity} />
          </View>

          {forecast.length > 0 &&
            <View style={{ flex: 1, flexDirection: 'row' }} >
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Forecast temperature={forecast[0].temp} pressure={forecast[0].pressure}
                  wind={forecast[0].wind} humidity={forecast[0].humidity} />
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Forecast temperature={forecast[1].temp} pressure={forecast[1].pressure}
                  wind={forecast[1].wind} humidity={forecast[1].humidity} />
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Forecast temperature={forecast[2].temp} pressure={forecast[2].pressure}
                  wind={forecast[2].wind} humidity={forecast[2].humidity} />
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