import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet } from 'react-native';
import moment from 'moment';

export default class Forecast extends React.Component {
    static propTypes = {
        temperature: PropTypes.number,
        humidity: PropTypes.number,
        wind: PropTypes.number,
        pressure: PropTypes.number,
        icon: PropTypes.string
    }

    render() {
        const today = moment();

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={{ uri: "http://files.softicons.com/download/web-icons/android-weather-icons-by-bharath-prabhuswamy/png/512x512/Slight%20Drizzle.png" }}
                    style={{ width: 60, height: 60 }} />

                <Text>{this.props.temperature}&deg;C</Text>
                <Text>Hum: {this.props.humidity}%</Text>
                <Text>Pres: {this.props.pressure}hPa</Text>
                <Text>Hum: {this.props.wind}m/s</Text>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInfo: {
        color: 'white',
        textAlign: 'left',
        fontSize: 17.5
    },
});