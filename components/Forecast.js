import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet } from 'react-native';
import moment from 'moment';

import icons from '../services/Icon';

export default class Forecast extends React.Component {
    static propTypes = {
        temperature: PropTypes.number,
        humidity: PropTypes.number,
        wind: PropTypes.number,
        pressure: PropTypes.number,
        icon: PropTypes.string,
        daysFromToday: PropTypes.number
    }

    render() {
        const dayName = moment().add(this.props.daysFromToday, 'd').format('ddd');

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.textInfoSmall}>{dayName}</Text>

                <Image source={icons[this.props.icon]}
                    style={{ width: 60, height: 60 }} />

                <Text style={styles.textInfoLarge}>{this.props.temperature}&deg;C</Text>
                <Text style={styles.textInfoSmall}>Hum: {this.props.humidity}%</Text>
                <Text style={styles.textInfoSmall}>Pres: {this.props.pressure}hPa</Text>
                <Text style={styles.textInfoSmall}>Wind: {this.props.wind}m/s</Text>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInfoLarge: {
        color: 'white',
        textAlign: 'left',
        fontSize: 15,
        marginBottom: 15
    },
    textInfoSmall: {
        color: 'white',
        textAlign: 'left',
        fontSize: 12.5,
        margin: 2
    },
});
